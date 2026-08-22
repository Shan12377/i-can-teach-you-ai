#!/usr/bin/env node
// One-shot: add a "Related reading" section to every blog post in blogData.ts,
// using descriptive anchors mapped from the CONTENT-TRIAGE cluster plan.
//
// Idempotent: skips any post that already contains "## Related reading".
// If a post ends with the shared "Ready to learn more" CTA block, the section
// is inserted just above it so the CTA stays last.
//
// Run once: node scripts/add-internal-links.mjs
// ponytail: plain regex + fs. blogData.ts is ~1900 lines, still trivial.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'src/pages/blog/blogData.ts');

// Descriptive anchor text used when OTHER posts link to this one.
// Keep them phrase-length, not sentence-length; never "click here" / "read more".
const ANCHOR = {
  'hipaa-conscious-ai-workflows-healthcare':      'the two-layer architecture that keeps PHI out of your automation lane',
  'n8n-aws-baa-healthcare-automation':            'why running n8n on AWS under a signed BAA matters',
  'google-workspace-hipaa-clinical-lane-setup':   'how to set up Google Workspace as your HIPAA clinical lane',
  'ai-meal-analysis-healthcare-compliance':       'building an AI meal analysis feature that stays inside educator scope',
  'apple-app-store-health-app-compliance':        'the App Store approval path for a HIPAA-adjacent health app',
  'ftc-compliance-health-content-creators':       'what FTC compliance actually requires for health content creators',
  'chatgpt-healthcare-professionals-safe-use':    'what ChatGPT is actually safe to use for in clinical work',
  'vibe-coding-healthcare-professionals':         'a practical vibe-coding starting point for healthcare professionals',
  'vibe-coding-healthcare-patient-tools':         'how to build your own patient-facing tools without a dev team',
  'vibe-coding-tutorial-beginners-2026':          'the beginner vibe-coding tutorial: shipping a real app without writing code',
  'best-vibe-coding-tools-2026-cursor-bolt-claude':'the head-to-head on Cursor, Bolt, Replit, and Claude Code',
  'build-health-app-without-coding-claude':       'how a full HIPAA-conscious health app got built with Claude Code',
  'claude-code-exam-prep-cca-f-guide':            'the complete CCA-F exam study guide',
  'claude-code-absolute-beginners-guide':         'Claude Code for absolute beginners',
  'claude-code-vs-cursor-2026':                   'Claude Code vs Cursor in 2026',
  'my-automation-stack-pharmd-builds-with-ai':    'the full five-tool automation stack behind this business',
  'google-apps-script-pharmacy-decoder-backend':  'using Google Apps Script as the entire backend for Pharmacy Decoder',
  'blood-pressure-tracking-app-architecture':     'the architecture decisions behind the blood pressure tracker',
  'supplement-protocol-builder-n8n':              'building a supplement protocol generator with n8n and OpenAI',
  'n8n-intake-routing-health-practice':           'the n8n intake router pattern for a health practice',
  'stripe-setup-health-educator-platform':        'the complete Stripe setup for a health education platform',
  'how-to-use-gemini-for-business-2026':          'a practical guide to using Gemini in a business workflow',
  'notebooklm-business-vs-studying':              'NotebookLM for business vs. for studying — which mode fits your work',
  'gemini-healthcare-professionals-limits':       'what Gemini can and cannot do for a healthcare professional',
  'chatgpt-vs-gemini-vs-perplexity-2026':         'the head-to-head between ChatGPT, Gemini, and Perplexity',
  'perplexity-ai-research-healthcare':            'why healthcare professionals are switching to Perplexity for research',
  'best-ai-tools-small-business-owners-2026':     'the ranked list of AI tools worth paying for as a small business owner',
  'ai-workshops-schools-hospitals-guide':         'the playbook for bringing AI workshops into your school or hospital',
  'teaching-ai-literacy-healthcare-students':     'what schools are actually doing about AI literacy for healthcare students',
};

// For each source post: three cluster siblings (or cross-cluster where it fits
// the reader's next question better) and one money-page anchor.
const LINKS = {
  // ---------- Cluster 1 — HIPAA & compliance ----------
  'hipaa-conscious-ai-workflows-healthcare': {
    siblings: [
      'google-workspace-hipaa-clinical-lane-setup',
      'n8n-aws-baa-healthcare-automation',
      'ftc-compliance-health-content-creators',
    ],
    money: { href: '/services', text: 'a done-for-you compliant AI workflow built for your practice' },
  },
  'n8n-aws-baa-healthcare-automation': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'n8n-intake-routing-health-practice',
      'google-workspace-hipaa-clinical-lane-setup',
    ],
    money: { href: '/services', text: 'a scoped n8n build for your health practice' },
  },
  'google-workspace-hipaa-clinical-lane-setup': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'n8n-aws-baa-healthcare-automation',
      'apple-app-store-health-app-compliance',
    ],
    money: { href: '/services', text: 'a full compliance-first workflow audit and build' },
  },
  'ai-meal-analysis-healthcare-compliance': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'supplement-protocol-builder-n8n',
      'ftc-compliance-health-content-creators',
    ],
    money: { href: '/services', text: 'a custom AI feature built to stay inside educator scope' },
  },
  'apple-app-store-health-app-compliance': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'google-workspace-hipaa-clinical-lane-setup',
      'build-health-app-without-coding-claude',
    ],
    money: { href: '/services', text: 'a build engagement for a HIPAA-conscious health app' },
  },
  'ftc-compliance-health-content-creators': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'ai-meal-analysis-healthcare-compliance',
      'chatgpt-healthcare-professionals-safe-use',
    ],
    money: { href: '/services', text: 'a compliance review of your existing content and workflows' },
  },
  'chatgpt-healthcare-professionals-safe-use': {
    siblings: [
      'hipaa-conscious-ai-workflows-healthcare',
      'gemini-healthcare-professionals-limits',
      'perplexity-ai-research-healthcare',
    ],
    money: { href: '/services', text: 'a 1-on-1 session to set up a safe AI stack in your practice' },
  },

  // ---------- Cluster 2 — Vibe coding ----------
  'vibe-coding-healthcare-professionals': {
    siblings: [
      'vibe-coding-healthcare-patient-tools',
      'build-health-app-without-coding-claude',
      'claude-code-absolute-beginners-guide',
    ],
    money: { href: '/services', text: 'a custom build session where the tool gets built with you' },
  },
  'vibe-coding-healthcare-patient-tools': {
    siblings: [
      'vibe-coding-healthcare-professionals',
      'build-health-app-without-coding-claude',
      'blood-pressure-tracking-app-architecture',
    ],
    money: { href: '/services', text: 'a patient tool built for your practice from scratch' },
  },
  'vibe-coding-tutorial-beginners-2026': {
    siblings: [
      'claude-code-absolute-beginners-guide',
      'best-vibe-coding-tools-2026-cursor-bolt-claude',
      'build-health-app-without-coding-claude',
    ],
    money: { href: '/exam-prep', text: 'the Claude Code Associate Foundations exam prep pack' },
  },
  'best-vibe-coding-tools-2026-cursor-bolt-claude': {
    siblings: [
      'claude-code-vs-cursor-2026',
      'claude-code-absolute-beginners-guide',
      'vibe-coding-tutorial-beginners-2026',
    ],
    money: { href: '/exam-prep', text: 'the 207-question CCA-F exam prep for Claude Code' },
  },
  'build-health-app-without-coding-claude': {
    siblings: [
      'vibe-coding-healthcare-professionals',
      'claude-code-absolute-beginners-guide',
      'hipaa-conscious-ai-workflows-healthcare',
    ],
    money: { href: '/services', text: 'a built-for-you HIPAA-conscious app engagement' },
  },

  // ---------- Cluster 3 — Claude Code & certification ----------
  'claude-code-exam-prep-cca-f-guide': {
    siblings: [
      'claude-code-absolute-beginners-guide',
      'claude-code-vs-cursor-2026',
      'vibe-coding-tutorial-beginners-2026',
    ],
    money: { href: '/exam-prep', text: 'the 207 practice questions with official-doc citations' },
  },
  'claude-code-absolute-beginners-guide': {
    siblings: [
      'claude-code-exam-prep-cca-f-guide',
      'claude-code-vs-cursor-2026',
      'vibe-coding-tutorial-beginners-2026',
    ],
    money: { href: '/exam-prep', text: 'the CCA-F exam prep pack once you are past the basics' },
  },
  'claude-code-vs-cursor-2026': {
    siblings: [
      'best-vibe-coding-tools-2026-cursor-bolt-claude',
      'claude-code-exam-prep-cca-f-guide',
      'claude-code-absolute-beginners-guide',
    ],
    money: { href: '/exam-prep', text: 'the Claude Code certification prep pack' },
  },

  // ---------- Cluster 4 — Building in public ----------
  'my-automation-stack-pharmd-builds-with-ai': {
    siblings: [
      'n8n-aws-baa-healthcare-automation',
      'google-apps-script-pharmacy-decoder-backend',
      'n8n-intake-routing-health-practice',
    ],
    money: { href: '/services', text: 'a discovery call to build your own version of this stack' },
  },
  'google-apps-script-pharmacy-decoder-backend': {
    siblings: [
      'my-automation-stack-pharmd-builds-with-ai',
      'stripe-setup-health-educator-platform',
      'n8n-intake-routing-health-practice',
    ],
    money: { href: '/services', text: 'a lean-backend build for your own product' },
  },
  'blood-pressure-tracking-app-architecture': {
    siblings: [
      'supplement-protocol-builder-n8n',
      'build-health-app-without-coding-claude',
      'hipaa-conscious-ai-workflows-healthcare',
    ],
    money: { href: '/services', text: 'a custom tracker or intake tool for your practice' },
  },
  'supplement-protocol-builder-n8n': {
    siblings: [
      'ai-meal-analysis-healthcare-compliance',
      'n8n-intake-routing-health-practice',
      'hipaa-conscious-ai-workflows-healthcare',
    ],
    money: { href: '/services', text: 'a purpose-built protocol tool for your educator workflow' },
  },
  'n8n-intake-routing-health-practice': {
    siblings: [
      'n8n-aws-baa-healthcare-automation',
      'hipaa-conscious-ai-workflows-healthcare',
      'my-automation-stack-pharmd-builds-with-ai',
    ],
    money: { href: '/services', text: 'a scoped intake-router build for your practice' },
  },
  'stripe-setup-health-educator-platform': {
    siblings: [
      'google-apps-script-pharmacy-decoder-backend',
      'my-automation-stack-pharmd-builds-with-ai',
      'apple-app-store-health-app-compliance',
    ],
    money: { href: '/services', text: 'a full payment and platform setup for your health business' },
  },

  // ---------- Cluster 5 — Generic AI tools ----------
  'how-to-use-gemini-for-business-2026': {
    siblings: [
      'gemini-healthcare-professionals-limits',
      'chatgpt-vs-gemini-vs-perplexity-2026',
      'notebooklm-business-vs-studying',
    ],
    money: { href: '/services', text: 'a 1-on-1 session to set up your AI stack for real work' },
  },
  'notebooklm-business-vs-studying': {
    siblings: [
      'how-to-use-gemini-for-business-2026',
      'perplexity-ai-research-healthcare',
      'best-ai-tools-small-business-owners-2026',
    ],
    money: { href: '/services', text: 'a working session to build your own research workflow' },
  },
  'gemini-healthcare-professionals-limits': {
    siblings: [
      'chatgpt-healthcare-professionals-safe-use',
      'perplexity-ai-research-healthcare',
      'chatgpt-vs-gemini-vs-perplexity-2026',
    ],
    money: { href: '/services', text: 'a 1-on-1 to build a compliant AI stack for your practice' },
  },
  'chatgpt-vs-gemini-vs-perplexity-2026': {
    siblings: [
      'chatgpt-healthcare-professionals-safe-use',
      'gemini-healthcare-professionals-limits',
      'perplexity-ai-research-healthcare',
    ],
    money: { href: '/services', text: 'a working session to pick the right tool for your workflow' },
  },
  'perplexity-ai-research-healthcare': {
    siblings: [
      'gemini-healthcare-professionals-limits',
      'chatgpt-healthcare-professionals-safe-use',
      'notebooklm-business-vs-studying',
    ],
    money: { href: '/services', text: 'a research-workflow session for your clinical or educator work' },
  },
  'best-ai-tools-small-business-owners-2026': {
    siblings: [
      'how-to-use-gemini-for-business-2026',
      'notebooklm-business-vs-studying',
      'chatgpt-vs-gemini-vs-perplexity-2026',
    ],
    money: { href: '/services', text: 'a 1-on-1 session to set up your AI stack end to end' },
  },

  // ---------- Cluster 6 — Teaching & workshops ----------
  'ai-workshops-schools-hospitals-guide': {
    siblings: [
      'teaching-ai-literacy-healthcare-students',
      'chatgpt-healthcare-professionals-safe-use',
      'hipaa-conscious-ai-workflows-healthcare',
    ],
    money: { href: '/services', text: 'book a workshop for your school, hospital, or department' },
  },
  'teaching-ai-literacy-healthcare-students': {
    siblings: [
      'ai-workshops-schools-hospitals-guide',
      'chatgpt-healthcare-professionals-safe-use',
      'gemini-healthcare-professionals-limits',
    ],
    money: { href: '/services', text: 'a scoped curriculum built for your program' },
  },
};

function buildBlock(slug) {
  const plan = LINKS[slug];
  if (!plan) return null;
  const lines = ['', '## Related reading', ''];
  for (const s of plan.siblings) {
    if (!ANCHOR[s]) throw new Error('missing anchor for ' + s);
    lines.push(`- Read [${ANCHOR[s]}](/blog/${s}).`);
  }
  lines.push(`- Ready to work together? [${plan.money.text}](${plan.money.href}).`);
  return lines.join('\n') + '\n';
}

async function main() {
  let src = await readFile(FILE, 'utf-8');
  const CTA_TAG = '> **Ready to learn more or bring this to your team?**';
  let injected = 0;
  let skipped = 0;

  for (const slug of Object.keys(LINKS)) {
    // Grab this post's content block. Match content up to the closing template
    // literal — an UNESCAPED backtick followed by `,\n`. Escaped `\`` inside the
    // content (e.g. inline code like \`@\`) must not terminate the match.
    const re = new RegExp(
      `(slug:\\s*'${slug}',[\\s\\S]+?content:\\s*\`)([\\s\\S]+?)((?<!\\\\)\`\\s*,\\s*\\n)`
    );
    const m = src.match(re);
    if (!m) { console.warn(`SKIP (not found): ${slug}`); continue; }

    const [, head, content, tail] = m;
    if (content.includes('## Related reading')) { skipped++; continue; }

    const block = buildBlock(slug);
    let newContent;
    if (content.includes(CTA_TAG)) {
      // insert block before the shared CTA block
      newContent = content.replace(CTA_TAG, block + '\n' + CTA_TAG);
    } else {
      newContent = content.replace(/\s*$/, '\n' + block);
    }
    src = src.replace(m[0], head + newContent + tail);
    injected++;
  }

  await writeFile(FILE, src, 'utf-8');
  console.log(`Related-reading blocks: injected ${injected}, already present ${skipped}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
