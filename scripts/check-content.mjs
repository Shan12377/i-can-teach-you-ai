// Cross-surface consistency check for the exam content bank.
//
// The bank has five surfaces that can state the same fact: questions, domains,
// cheatSheet, flashcards and antiPatterns. Every accuracy pass so far has fixed
// one surface and missed the others, shipping a product that contradicts itself.
// This fails the build when a retired claim reappears anywhere.
//
// Adding a rule: when you correct a fact, add the OLD wording here as a banned
// pattern, with an `allow` for the places that legitimately quote it in order to
// refute it.
import { readFileSync, existsSync } from 'node:fs';

// The bank itself is gitignored (it is the paid product). This checker is tracked,
// so it skips cleanly on a checkout that has no content/ directory.
const bank = new URL('../content/exam-prep-source/questions-clean.json', import.meta.url);
if (!existsSync(bank)) {
  console.log('No content/exam-prep-source/questions-clean.json here, skipping content checks.');
  process.exit(0);
}
const data = JSON.parse(readFileSync(bank, 'utf-8'));

const BANNED = [
  { name: 'Streamable HTTP called bidirectional',
    re: /Streamable HTTP[^.]{0,80}bidirectional/i },
  { name: '4-5 tool target stated without the 30-50 documented figure',
    re: /(target|aim for)\s*<?\/?strong>?\s*4[- ]?(5|to 5) tools/i,
    allow: /30 to 50|30-50/ },
  { name: 'cache breakeven stated as 2-3 reads',
    re: /breakeven[^.]{0,40}2[- ]?(3|to 3) reads/i,
    allow: /does not match|is wrong/ },
  { name: 'never cache user messages',
    re: /never cache[^.]{0,30}user message/i,
    allow: /is wrong|backwards/ },
  { name: '/memory described as showing what loaded',
    re: /\/memory[^.]{0,60}(currently loaded|which .{0,20}files are loaded)/i,
    allow: /does not tell you|\/context/ },
  { name: 'Sonnet described as the default for most production work',
    re: /Sonnet[^.]{0,20}:?\s*most production tasks/i },
  { name: 'cheapest model in the coordinator seat',
    re: /Haiku for coordinator/i,
    allow: /inversion|inverted/ },
  { name: 'zone model of the context window',
    re: /Zone [1-4]\b|context.{0,10}zone structure/i },
  { name: 'CWM / Context-Aware LLM Management',
    re: /\bCWM\b|Context-Aware LLM Management/i,
    allow: /not an Anthropic term|which is not published|Removed the CWM/ },
  { name: 'em dash', re: /—/ },
];

function* walk(node, path = '') {
  if (typeof node === 'string') yield [path, node];
  else if (Array.isArray(node)) for (const [i, v] of node.entries()) yield* walk(v, `${path}[${i}]`);
  else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) yield* walk(v, `${path}.${k}`);
}

const failures = [];
for (const [path, text] of walk(data)) {
  if (path.startsWith('.meta.changelog')) continue; // the changelog records what was fixed
  for (const rule of BANNED) {
    if (rule.re.test(text) && !(rule.allow && rule.allow.test(text))) {
      failures.push(`${rule.name}\n    at ${path}\n    ${text.slice(0, 160)}`);
    }
  }
}

// structural invariants
const q = data.questions;
const ids = q.map((x) => x.id);
if (new Set(ids).size !== ids.length) failures.push('duplicate question ids');
if (data.meta.questionCount !== q.length) failures.push(`meta.questionCount ${data.meta.questionCount} != ${q.length} questions`);
for (const x of q) {
  const key = x.correctIndices ?? [x.correctIndex];
  if (!key.every((k) => k >= 0 && k < x.options.length)) failures.push(`${x.id}: answer index out of range`);
  if (new Set(key).size !== key.length) failures.push(`${x.id}: duplicate answer index`);
  if (x.correctIndices) {
    if (x.correctIndex !== x.correctIndices[0]) failures.push(`${x.id}: correctIndex does not match correctIndices[0]`);
    const m = /Select the (TWO|THREE|FOUR)/.exec(x.question);
    const want = { TWO: 2, THREE: 3, FOUR: 4 }[m?.[1]];
    if (!m) failures.push(`${x.id}: multiple-response item does not state how many to select`);
    else if (want !== x.correctIndices.length) failures.push(`${x.id}: stem says ${m[1]} but key has ${x.correctIndices.length}`);
  }
  if (!x.source) failures.push(`${x.id}: no source`);
}
for (const [i, s] of data.cheatSheet.entries())
  for (const [j, r] of s.rows.entries())
    if (!r.source || !r.status) failures.push(`cheatSheet[${i}].rows[${j}] (${r.term}): missing source or status`);

if (failures.length) {
  console.error(`\nFAILED: ${failures.length} consistency problem(s)\n`);
  for (const f of failures) console.error('  ' + f + '\n');
  process.exit(1);
}
console.log(`OK: ${q.length} questions, ${data.cheatSheet.reduce((n, s) => n + s.rows.length, 0)} cheat sheet rows, ${data.flashcards.length} flashcards, ${data.antiPatterns.length} anti-patterns. No contradictions.`);
