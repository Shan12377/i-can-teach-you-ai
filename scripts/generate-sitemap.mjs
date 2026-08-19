// Generates public/sitemap.xml from static routes plus blog slugs in blogData.ts.
// Runs as part of npm run build. New blog posts are picked up automatically.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://www.icanteachyouai.com';

const staticRoutes = ['/', '/about', '/products', '/exam-prep', '/blog', '/services', '/waitlist', '/terms', '/privacy'];

// ponytail: regex over blogData.ts instead of importing TS; swap for a TS import if slugs ever move
const blogData = readFileSync(join(root, 'src/pages/blog/blogData.ts'), 'utf8');
const slugs = [...blogData.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

const urls = [...staticRoutes, ...slugs.map(s => `/blog/${s}`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs (${slugs.length} blog posts)`);

// Self-check
if (slugs.length === 0) {
  console.error('No blog slugs found. Check the regex against blogData.ts.');
  process.exit(1);
}
