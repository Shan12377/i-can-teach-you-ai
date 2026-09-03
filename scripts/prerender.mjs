// Prerenders every content route to a real static HTML file after the normal Vite build.
// Uses react-router's StaticRouter + renderToString (src/entry-server.tsx) so no framework
// migration or unsupported peer-dependency combo is needed.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrOutDir = join(root, 'dist-server');

console.log('Building SSR bundle...');
execFileSync('npx', ['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist-server'], {
  cwd: root,
  stdio: 'inherit',
});

const { render, ROUTE_META, SITE_URL, SITE_NAME, BLOG_POSTS, getBlogPostSeo } = await import(
  join(ssrOutDir, 'entry-server.js')
);

// Routes that get real prerendered content and real SEO metadata (ROUTE_META already
// marks the transactional ones noindex). /exam is excluded: it's the one route behind a
// lazy()/Suspense boundary, which renderToString can't resolve synchronously - it's also
// gated/personalized content with nothing meaningful to prerender anyway.
const staticRoutes = [
  '/', '/about', '/products', '/exam-prep', '/blog', '/services', '/healthcare-ai-workshops',
  '/waitlist', '/waitlist/questions', '/checkout', '/checkout/success', '/terms', '/privacy',
];
const blogRoutes = BLOG_POSTS.map(p => `/blog/${p.slug}`);
const routes = [...staticRoutes, ...blogRoutes];

const shellRoutes = ['/exam'];

// Each lazy route's CSS lives in its own asset file that the prerendered HTML never
// referenced, so those pages arrived unstyled until their JS chunk loaded. Read the
// build manifest and inline the right CSS into each route's static HTML.
const routeModules = {
  '/about': 'src/pages/AboutPage.tsx',
  '/products': 'src/pages/ProductsPage.tsx',
  '/exam-prep': 'src/pages/ExamPrepPage.tsx',
  '/blog': 'src/pages/blog/BlogIndexPage.tsx',
  '/services': 'src/pages/ServicesPage.tsx',
  '/healthcare-ai-workshops': 'src/pages/WorkshopsPage.tsx',
  '/waitlist': 'src/pages/intake/WaitlistPage.tsx',
  '/waitlist/questions': 'src/pages/intake/WaitlistQuestionsPage.tsx',
  '/checkout': 'src/pages/CheckoutPage.tsx',
  '/checkout/success': 'src/pages/CheckoutSuccessPage.tsx',
  '/terms': 'src/pages/legal/TermsPage.tsx',
  '/privacy': 'src/pages/legal/PrivacyPage.tsx',
  '/exam': 'src/pages/exam/ExamPage.tsx',
};
const blogPostModule = 'src/pages/blog/BlogPostPage.tsx';

let manifest = {};
try {
  manifest = JSON.parse(readFileSync(join(distDir, '.vite', 'manifest.json'), 'utf-8'));
} catch {
  console.warn('No build manifest found; route CSS will not be inlined.');
}

// Walks a manifest entry and its imports so a route picks up CSS from shared chunks too.
function cssForModule(moduleId, seen = new Set()) {
  const entry = manifest[moduleId];
  if (!entry || seen.has(moduleId)) return [];
  seen.add(moduleId);
  const files = [...(entry.css ?? [])];
  for (const imported of entry.imports ?? []) files.push(...cssForModule(imported, seen));
  return files;
}

function routeCssTag(path) {
  const moduleId = path.startsWith('/blog/') && path !== '/blog' ? blogPostModule : routeModules[path];
  if (!moduleId) return '';
  const files = [...new Set(cssForModule(moduleId))];
  if (files.length === 0) return '';
  const css = files
    .map(file => readFileSync(join(distDir, file), 'utf-8'))
    .join('\n')
    .replace(/<\/style/gi, '<\\/style');
  return `<style data-route-css>${css}</style>`;
}

const builtTemplate = readFileSync(join(distDir, 'index.html'), 'utf-8');
const template = builtTemplate.replace(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
  (tag, href) => {
    if (!href.startsWith('/assets/index-')) return tag;
    const css = readFileSync(join(distDir, href.slice(1)), 'utf-8');
    return `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`;
  }
);

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function resolveSeo(path) {
  if (path.startsWith('/blog/') && path !== '/blog') {
    const slug = path.replace('/blog/', '');
    const post = BLOG_POSTS.find(p => p.slug === slug);
    return post ? getBlogPostSeo(post) : null;
  }
  return ROUTE_META[path] ?? null;
}

function buildHtml(path, appHtml) {
  const seo = resolveSeo(path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const cssTag = routeCssTag(path);
  if (cssTag) html = html.replace('</head>', `  ${cssTag}\n  </head>`);

  if (seo) {
    const url = SITE_URL + seo.path;
    const title = escapeHtml(seo.title);
    const description = escapeHtml(seo.description);

    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`
    );
    html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
    html = html.replace(
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="${seo.type ?? 'website'}" />`
    );
    html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
    html = html.replace(
      /<meta name="robots" content="[^"]*" \/>/,
      `<meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`
    );

    const twitterTags = `  <meta name="twitter:title" content="${title}" />\n  <meta name="twitter:description" content="${description}" />\n`;
    html = html.replace('</head>', `${twitterTags}  </head>`);

    if (seo.jsonLd) {
      const script = `  <script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>\n`;
      html = html.replace('</head>', `${script}  </head>`);
    }
  }

  return html;
}

function outputPathFor(route) {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.slice(1), 'index.html');
}

console.log(`Prerendering ${routes.length} routes...`);
let byteTotal = 0;
for (const route of routes) {
  const appHtml = render(route);
  const html = buildHtml(route, appHtml);
  const outPath = outputPathFor(route);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  byteTotal += html.length;
}
console.log(`Prerendered ${routes.length} routes, ${Math.round(byteTotal / 1024)} KiB total.`);

// Real 404 page - same SPA shell, marked noindex, written to 404.html so static hosting
// (Vercel) serves it with an actual 404 status for unmatched paths once the blanket
// SPA rewrite is removed from vercel.json.
const notFoundHtml = template
  .replace('<title>AI Training for Healthcare Professionals | I Can Teach You AI</title>', '<title>Page Not Found | I Can Teach You AI</title>')
  .replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
writeFileSync(join(distDir, '404.html'), notFoundHtml);

// Shell-only routes: real files must exist for Vercel's static file serving to resolve
// clean URLs, but content is the plain SPA shell (client hydration renders the real page).
// Still gets title/noindex from ROUTE_META since that part doesn't require actually
// rendering the route tree.
for (const route of shellRoutes) {
  const seo = resolveSeo(route);
  let html = template;
  if (seo) {
    html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
    if (seo.noindex) {
      html = html.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
    }
  }
  const shellCss = routeCssTag(route);
  if (shellCss) html = html.replace('</head>', `  ${shellCss}\n  </head>`);
  const outPath = outputPathFor(route);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

rmSync(ssrOutDir, { recursive: true, force: true });
console.log('Done.');
