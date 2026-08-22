// Lints src/pages/blog/blogData.ts for structural and copy-quality issues.
// Run standalone: npm run check:blog
// Also wired into npm run build - a failure here blocks the build.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const filePath = join(root, 'src/pages/blog/blogData.ts');
const source = readFileSync(filePath, 'utf8');

const REQUIRED_FIELDS = ['slug', 'title', 'excerpt', 'category', 'date', 'readTime', 'content'];
const MAX_EXCERPT_LENGTH = 155;
const BANNED_PHRASES = ['delve into', 'leverage', 'unlock your potential', 'elevate', 'seamless'];
const EM_DASH = '—';

function lineNumberAt(index) {
  return source.slice(0, index).split('\n').length;
}

// Split the file into per-post chunks using each `slug:` occurrence as a boundary.
// A post's fields always start with slug, so slicing between consecutive slug
// matches captures exactly one post's worth of source (title through content).
const slugMatches = [...source.matchAll(/slug:\s*'([^']*)'/g)];

if (slugMatches.length === 0) {
  console.error('check-blog: no posts found (no `slug:` matches). Check the regex against blogData.ts.');
  process.exit(1);
}

const posts = slugMatches.map((m, i) => {
  const start = m.index;
  const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : source.length;
  return { slug: m[1], chunk: source.slice(start, end), line: lineNumberAt(start) };
});

function extractStringField(chunk, field) {
  const m = chunk.match(new RegExp(`${field}:\\s*'((?:\\\\'|[^'])*)'`));
  return m ? m[1].replace(/\\'/g, "'") : null;
}

function extractContentField(chunk) {
  // content is a template literal; escaped backticks (\`) inside code blocks
  // must not be mistaken for the closing delimiter.
  const m = chunk.match(/content:\s*`((?:\\`|[^`])*)`/);
  return m ? m[1] : null;
}

const errors = [];
const warnings = [];

// Duplicate slug check
const seenSlugs = new Map();
for (const post of posts) {
  if (seenSlugs.has(post.slug)) {
    errors.push(`Duplicate slug "${post.slug}" (line ${seenSlugs.get(post.slug)} and line ${post.line})`);
  } else {
    seenSlugs.set(post.slug, post.line);
  }
}

for (const post of posts) {
  const fields = {
    slug: post.slug,
    title: extractStringField(post.chunk, 'title'),
    excerpt: extractStringField(post.chunk, 'excerpt'),
    category: extractStringField(post.chunk, 'category'),
    date: extractStringField(post.chunk, 'date'),
    readTime: extractStringField(post.chunk, 'readTime'),
    content: extractContentField(post.chunk),
  };

  const label = fields.title ? `"${fields.title}" (${post.slug}, line ${post.line})` : `${post.slug} (line ${post.line})`;

  // Missing required fields
  for (const field of REQUIRED_FIELDS) {
    if (!fields[field] || fields[field].trim() === '') {
      errors.push(`${label}: missing or empty required field "${field}"`);
    }
  }

  // Excerpt length (used as the meta description in blogSeo.ts)
  if (fields.excerpt && fields.excerpt.length > MAX_EXCERPT_LENGTH) {
    warnings.push(`${label}: excerpt is ${fields.excerpt.length} chars, over the ${MAX_EXCERPT_LENGTH} limit for meta description`);
  }

  // Em dash check (title, excerpt, content)
  for (const [fieldName, value] of [['title', fields.title], ['excerpt', fields.excerpt], ['content', fields.content]]) {
    if (value && value.includes(EM_DASH)) {
      const count = value.split(EM_DASH).length - 1;
      errors.push(`${label}: field "${fieldName}" contains ${count} em dash${count > 1 ? 'es' : ''}`);
    }
  }

  // Banned filler phrases (title, excerpt, content)
  for (const [fieldName, value] of [['title', fields.title], ['excerpt', fields.excerpt], ['content', fields.content]]) {
    if (!value) continue;
    const lower = value.toLowerCase();
    for (const phrase of BANNED_PHRASES) {
      if (lower.includes(phrase)) {
        warnings.push(`${label}: field "${fieldName}" contains banned phrase "${phrase}"`);
      }
    }
  }
}

console.log(`check-blog: checked ${posts.length} posts.`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('\ncheck-blog: no errors.');
