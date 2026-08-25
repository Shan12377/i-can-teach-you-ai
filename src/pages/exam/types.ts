export interface ExamQuestion {
  id: string;
  domain: string;
  scenario: string;
  difficulty: 'standard' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  distractorNotes: string;
  source: string;
}

export interface AntiPattern {
  title: string;
  severity: 'critical' | 'high';
  domain: string;
  wrong: string;
  right: string;
  note: string;
}

export interface DomainKeyPoint {
  term: string;
  detail: string;
}

export interface DomainConcept {
  num: string;
  title: string;
  weight: string;
  color: string;
  desc: string;
  keys: DomainKeyPoint[];
  memory: string;
  examTrap: string;
}

export interface CheatSheetRow {
  term: string;
  detail: string;
}

export interface CheatSheetSection {
  title: string;
  rows: CheatSheetRow[];
}

export interface Flashcard {
  category: string;
  question: string;
  answer: string;
}

export interface ExamContent {
  questions: ExamQuestion[];
  antiPatterns: AntiPattern[];
  domains: DomainConcept[];
  cheatSheet: CheatSheetSection[];
  flashcards: Flashcard[];
}

export const DOMAIN_LABELS: Record<string, string> = {
  D1: 'D1 · Agentic AI Architecture',
  D2: 'D2 · Tool Design & MCP',
  D3: 'D3 · Claude Code',
  D4: 'D4 · Prompt Engineering',
  D5: 'D5 · Context Management',
};

export const DOMAIN_COLOR_VAR: Record<string, string> = {
  accent: 'var(--accent2)',
  teal: 'var(--teal2)',
  amber: 'var(--gold)',
  coral: 'var(--coral)',
  green: 'var(--teal2)',
};

export const DOMAIN_COLOR_BG_VAR: Record<string, string> = {
  accent: 'var(--accent-bg)',
  teal: 'var(--teal-bg)',
  amber: 'var(--gold-bg)',
  coral: 'var(--coral-bg)',
  green: 'var(--teal-bg)',
};

export const DOMAIN_COLOR_BORDER_VAR: Record<string, string> = {
  accent: 'var(--accent-border)',
  teal: 'var(--teal-border)',
  amber: 'var(--gold-border)',
  coral: 'var(--coral-border)',
  green: 'var(--teal-border)',
};
