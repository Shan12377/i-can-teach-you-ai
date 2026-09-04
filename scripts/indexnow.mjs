// Pings IndexNow with every URL in the sitemap. One call notifies Bing, Yandex,
// Seznam, Naver and the other participating engines at once. No account needed:
// ownership is proved by the key file served at /<key>.txt.
// Usage: node scripts/indexnow.mjs            (all sitemap URLs)
//        node scripts/indexnow.mjs /some-path (just these paths)
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEY = '32499b17d76e274c7faec9eb3068994a';
const HOST = 'www.icanteachyouai.com';
const SITE = `https://${HOST}`;

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map(p => (p.startsWith('http') ? p : SITE + (p.startsWith('/') ? p : `/${p}`)))
  : [...readFileSync(join(root, 'public/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (urlList.length === 0) {
  console.error('No URLs to submit.');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

// 200 and 202 both mean accepted. 403 means the key file is not reachable yet.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
