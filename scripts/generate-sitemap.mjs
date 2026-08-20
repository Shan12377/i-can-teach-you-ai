// Generates public/sitemap.xml from static routes plus blog slugs in blogData.ts.
// Runs as part of npm run build. New blog posts are picked up automatically.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://www.icanteachyouai.com';

// path per static route, used to look up a real lastmod via git history
const staticRoutes = {
  '/': 'src/pages/LandingPage.tsx',
  '/about': 'src/pages/AboutPage.tsx',
  '/products': 'src/pages/ProductsPage.tsx',
  '/exam-prep': 'src/pages/ExamPrepPage.tsx',
  '/blog': 'src/pages/blog/BlogIndexPage.tsx',
  '/services': 'src/pages/ServicesPage.tsx',
  '/waitlist': 'src/pages/intake/WaitlistPage.tsx',
  '/terms': 'src/pages/legal/TermsPage.tsx',
  '/privacy': 'src/pages/legal/PrivacyPage.tsx',
};

function gitLastModified(relPath) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%aI', '--', relPath], { cwd: root })
      .toString()
      .trim();
    return iso ? iso.slice(0, 10) : null;
  } catch {
    return null;
  }
}

// ponytail: regex over blogData.ts instead of importing TS; swap for a TS import if slugs ever move
const blogData = readFileSync(join(root, 'src/pages/blog/blogData.ts'), 'utf8');
const posts = [...blogData.matchAll(/slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g)].map(m => ({
  slug: m[1],
  date: m[2],
}));

function toIsoDate(dateStr) {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

const staticEntries = Object.entries(staticRoutes).map(([path, file]) => ({
  path,
  lastmod: gitLastModified(file),
}));
const blogEntries = posts.map(p => ({ path: `/blog/${p.slug}`, lastmod: toIsoDate(p.date) }));
const urls = [...staticEntries, ...blogEntries];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u =>
      `  <url><loc>${SITE_URL}${u.path}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs (${posts.length} blog posts)`);
const slugs = posts.map(p => p.slug);

// Self-check
if (slugs.length === 0) {
  console.error('No blog slugs found. Check the regex against blogData.ts.');
  process.exit(1);
}
