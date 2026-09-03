// FAQ content shared by the page UI and the FAQPage JSON-LD in seo.ts, so the
// visible answers and the structured data can never drift apart.
// Answers are written as 40 to 60 word standalone units for AI Overview extraction.

export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    q: 'What is I Can Teach You AI?',
    a: 'I Can Teach You AI is AI training for healthcare professionals, taught by Dr. Shallanda Hunter, PharmD. It offers live workshops for hospitals, pharmacy and nursing programs, one-on-one AI integration sessions, custom workflow builds, and Claude Code exam prep, all grounded in HIPAA-conscious design and products that are already running.',
  },
  {
    q: 'Who teaches the workshops and sessions?',
    a: 'Every workshop and session is taught by Dr. Shallanda Hunter, a licensed pharmacist (PharmD, MBA, CFNMP) who builds and maintains live healthcare software with AI tools, including Hunter\'s Holistic Health, Pharmacy Decoder, DeIDGuard, and a Claude Code certification prep product. You learn from the person who ships.',
  },
  {
    q: 'Do I need a technical background to learn AI here?',
    a: 'No. The training is built for pharmacists, nurses, physicians, educators, and administrators with no coding experience. You learn to direct tools like ChatGPT, Claude, Claude Code, NotebookLM, Perplexity, and n8n, and to recognize which workflows are safe to automate and which must stay with a human.',
  },
  {
    q: 'Is the AI training HIPAA-compliant?',
    a: 'The training teaches the Two-Layer Architecture: administrative and educational work in one lane, protected health information in a separate covered lane. You leave knowing which consumer AI tools can never touch PHI, which vendors sign a BAA, and how to draw that boundary in your own workflows.',
  },
  {
    q: 'How do I book a healthcare AI workshop?',
    a: 'Email hello@icanteachyouai.com with your organization, audience size, and preferred dates. Workshops run virtually or in person as a half day (3 hours) or full day (6 hours), with a custom curriculum for pharmacy, nursing, functional medicine, or hospital administration teams.',
  },
];

export const WORKSHOP_FAQ: FaqItem[] = [
  {
    q: 'How much does a healthcare AI workshop cost?',
    a: 'Workshop pricing depends on format, length, and audience size. Half-day (3 hour) and full-day (6 hour) options are available, virtual or in person, and a custom curriculum is included. Email hello@icanteachyouai.com with your team size and dates for a written quote within two business days.',
  },
  {
    q: 'Who should attend an AI workshop for healthcare teams?',
    a: 'Nurses, pharmacists, physicians, clinical educators, department heads, program directors, and administrators. The content assumes no coding background. Mixed groups work well because the Two-Layer Architecture gives clinical and administrative staff a shared language for deciding what AI may and may not touch.',
  },
  {
    q: 'Which AI tools does the workshop cover?',
    a: 'Hands-on sessions cover ChatGPT, Claude, Claude Code, Codex, NotebookLM, Perplexity, and Gemini for Workspace, plus n8n for automation. Each tool is mapped to a real healthcare workflow, from SBAR-structured prompting to intake routing, and each is checked against the PHI boundary before anyone uses it.',
  },
  {
    q: 'Can the workshop be customized for pharmacy, nursing, or a hospital department?',
    a: 'Yes. Every workshop is built around your specialty and the workflows your staff already runs. Pharmacy programs get medication-use and law examples, nursing programs get documentation and education cases, and hospital departments get administrative automation with a clear PHI boundary.',
  },
  {
    q: 'Is the AI workshop virtual or in person?',
    a: 'Both. Virtual workshops run over Zoom or Google Meet with live tool demonstrations and breakout exercises. In-person workshops are available for organizations in the United States. Both formats include the take-home AI policy template and a follow-up summary for attendees.',
  },
  {
    q: 'What do attendees leave with?',
    a: 'Attendees leave with the Two-Layer Architecture for separating administrative AI from clinical data, prompt patterns mapped to clinical reasoning frameworks such as SBAR, hands-on practice with the major AI tools, PHI boundary training for consumer-tier AI, and an editable AI policy template for the organization.',
  },
];
