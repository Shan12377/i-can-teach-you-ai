import { useState } from 'react';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import type { ExamContent } from './types';
import { getExamAccessToken } from '../../lib/examAccess';

const FAIL_REASONS = [
  {
    title: 'Choosing prompts over programmatic enforcement',
    detail: 'The #1 trap. When a business rule has financial consequences, prompt instructions are probabilistic. The exam always wants hooks or programmatic gates.',
  },
  {
    title: 'Skipping context engineering and prompt caching',
    detail: 'Domain 5 is only 15 percent of the exam, so it is the easiest to under study. Compaction, structured note taking, context rot and cache_control syntax all sit here.',
  },
  {
    title: 'Checking text content as a completion indicator',
    detail: 'If response.content[0].type == "text", Claude might still have a tool_use block. Always use stop_reason, never content type.',
  },
  {
    title: 'Confusing SSE and stdio transports',
    detail: 'A confirmed D2 topic. stdio for local single-client; Streamable HTTP for remote multi-client. Many candidates don’t know the distinction.',
  },
  {
    title: 'Missing the 4D Framework',
    detail: 'Delegation, Description, Discernment, Diligence. It’s in the official Anthropic Academy courses and appears in D4 questions. Most third-party prep tools ignore it.',
  },
  {
    title: 'Routing all workflows to Batch API for cost savings',
    detail: 'The Batch API has no SLA. Any blocking workflow must use the real-time API. Batch is latency-tolerant workloads only.',
  },
  {
    title: 'Assuming subagents inherit context',
    detail: 'Zero automatic memory between agents. Candidates assume shared state exists. It never does. Pass everything explicitly.',
  },
  {
    title: 'Retrying extraction when data is absent',
    detail: 'If the required field isn’t in the document, retrying causes hallucination. Categorize first: absence errors become null, format errors get retried with examples.',
  },
  {
    title: 'Skipping HITL for "pre-authorized" workflows',
    detail: 'Workflow authorization does not equal action-level authorization. High-value irreversible actions need explicit parameter-level confirmation at execution time.',
  },
  {
    title: 'Thinking a larger context window means better attention',
    detail: 'Model selection and context size don’t fix attention dilution. Multi-pass reviews and deliberate context structuring do.',
  },
];

interface HomeTabProps {
  content: ExamContent;
  onNavigate: (tab: 'antipatterns' | 'concepts' | 'cheatsheet' | 'quiz' | 'flashcards' | 'timed') => void;
}

export default function HomeTab({ content, onNavigate }: HomeTabProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'error'>('idle');

  async function downloadStudyGuide() {
    const token = getExamAccessToken();
    if (!token) return;
    setDownloadState('downloading');
    try {
      const res = await fetch('/api/study-guide', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CCAR-F-Study-Guide.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setDownloadState('idle');
    } catch {
      setDownloadState('error');
    }
  }

  const studySteps = [
    { title: 'Anti-Patterns tab first', detail: `Memorize all ${content.antiPatterns.length} patterns. You can eliminate 2-3 wrong answers instantly on most questions.` },
    { title: 'Concepts tab', detail: `Expand all ${content.domains.length} domains. Weight your time by the published blueprint: D1 27 percent, D3 20 percent, D4 20 percent, D2 18 percent, D5 15 percent.` },
    { title: 'Cheat Sheet', detail: `Read all ${content.cheatSheet.length} sections. Print before exam day.` },
    { title: 'Practice Quiz', detail: `Do all ${content.questions.length} questions. Use domain filters. For every wrong answer, re-read the explanation and note why the distractor was tempting.` },
    { title: 'Filter to Hard questions', detail: 'Re-drill only the hardest until you’re consistently right. Hard questions are marked with a badge.' },
    { title: 'Flashcards', detail: `${content.flashcards.length} cards across all categories, including decks for Context Engineering, Prompt Caching, the 4D Framework, Model Selection, HITL, and Hooks.` },
    { title: 'Timed Exam', detail: 'Sixty questions in 120 minutes, matching the real format. Anthropic scores the exam from 100 to 1,000 and sets the pass mark at 720, so aim comfortably clear of it before you book.' },
  ];

  return (
    <div>
      <div className={styles.menu}>
        <span className={`${styles.reviewQScenario} ${styles.homeKicker}`}>CCAR-F Exam Prep</span>
        <h1 className={styles.menuH1}>Pass the CCAR-F Exam on Your First Attempt</h1>
        <p className={styles.menuSub}>
          All five published domains, weighted to the official blueprint, with every answer linked to the
          Anthropic documentation it comes from. An independent study resource, not affiliated with Anthropic.
        </p>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statBlock}>
          <div className={styles.statNumber}>{content.questions.length}</div>
          <div className={styles.statLabel}>Practice Questions</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNumber}>{content.antiPatterns.length}</div>
          <div className={styles.statLabel}>Anti-Patterns</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNumber}>{content.domains.length}</div>
          <div className={styles.statLabel}>Domains Exhausted</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNumber}>720</div>
          <div className={styles.statLabel}>Passing Score (of 1,000)</div>
        </div>
      </div>

      <div className={styles.menuGrid}>
        <button className={styles.menuCard} onClick={() => onNavigate('antipatterns')}>
          <span className={styles.menuCardTitle}>Start: Anti-Patterns &rarr;</span>
          <span className={styles.menuCardDesc}>The fastest way to start eliminating wrong answers.</span>
        </button>
        <button className={styles.menuCard} onClick={() => onNavigate('quiz')}>
          <span className={styles.menuCardTitle}>Jump to Practice Quiz</span>
          <span className={styles.menuCardDesc}>Browse all questions, filter by domain and difficulty.</span>
        </button>
      </div>

      <div className={styles.downloadRow}>
        <button className={s.btnOutline} onClick={downloadStudyGuide} disabled={downloadState === 'downloading'}>
          {downloadState === 'downloading' ? 'Preparing download...' : 'Download Study Guide (PDF)'}
        </button>
        {downloadState === 'error' && (
          <span className={styles.failHeading}>Download failed. Try again or email hello@icanteachyouai.com.</span>
        )}
      </div>

      <div className={`${styles.csSection} ${styles.failSection}`}>
        <div className={styles.csHead}>
          <h3 className={styles.failHeading}>Why People Actually Fail This Exam</h3>
        </div>
        {FAIL_REASONS.map((r) => (
          <div key={r.title} className={styles.csRow}>
            <div className={styles.csDef}>
              <strong>{r.title}</strong> &mdash; {r.detail}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.csSection}>
        <div className={styles.csHead}>
          <h3>Optimized Study Order</h3>
        </div>
        {studySteps.map((step, i) => (
          <div key={step.title} className={styles.csRow}>
            <span className={styles.csTerm}>{i + 1}</span>
            <div className={styles.csDef}>
              <strong>{step.title}</strong> &mdash; {step.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
