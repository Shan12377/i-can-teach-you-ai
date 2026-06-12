import { Link } from 'react-router-dom';
import styles from './ExamPrep.module.css';
import s from '../styles/shared.module.css';

export default function ExamPrepPage() {
  return (
    <div className={styles.page}>
      <div className={s.wrapWide}>
        <div className={styles.header}>
          <div>
            <span className={s.kicker}>Exam Prep</span>
            <h1 className={styles.pageH1}>
              Claude Code Associate Foundations (CCA-F)
            </h1>
            <p className={styles.pageSubtitle}>
              207 practice questions. Every answer sourced from official Anthropic documentation.
              Built by a PharmD who uses Claude Code in production healthcare applications.
            </p>
          </div>
          <div className={styles.headerCard}>
            <div className={styles.headerCardPrice}>$37</div>
            <p className={styles.headerCardNote}>One-time purchase. Instant access.</p>
            <Link to="/checkout" className={`${s.btnGold}`} style={{ display: 'block', textAlign: 'center' }}>
              Get Instant Access
            </Link>
            <div className={styles.headerCardFeatures}>
              {[
                '207 practice questions',
                'All 6 CCA-F domains',
                'Official doc citations',
                'Anti-patterns guide',
                'Cheat sheet included',
              ].map(f => (
                <div key={f} className={styles.headerCardFeature}>
                  <span style={{ color: 'var(--green)' }}>&#10003;</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview section */}
        <div className={styles.previewSection}>
          <div className={styles.previewHeader}>
            <span className={s.pill + ' ' + s.pillAccent}>Free Preview</span>
            <h2 className={styles.previewH2}>Sample Questions</h2>
          </div>
          <div className={styles.sampleQuestions}>
            {[
              {
                q: 'Which CLAUDE.md section most directly reduces hallucination in long agentic tasks?',
                options: ['Project overview', 'Behavior rules', 'Environment setup', 'File structure'],
                correct: 1,
                explanation: 'Explicit behavior rules constrain the model\'s action space and reduce drift during multi-step tasks.',
              },
              {
                q: 'What is the primary purpose of the /compact command in Claude Code?',
                options: [
                  'Compress code files to reduce token usage',
                  'Summarize conversation history to free up context window space',
                  'Minify JavaScript output',
                  'Archive completed tasks',
                ],
                correct: 1,
                explanation: 'The /compact command summarizes the conversation history, freeing up context window space for continued work.',
              },
              {
                q: 'When should you use the TodoWrite tool in Claude Code?',
                options: [
                  'Only for tasks longer than 10 steps',
                  'For any task involving file creation',
                  'For multi-step tasks to track progress and maintain state',
                  'Only when explicitly requested by the user',
                ],
                correct: 2,
                explanation: 'TodoWrite is used for multi-step tasks to maintain state and track progress across the task lifecycle.',
              },
            ].map((q, i) => (
              <div key={i} className={styles.sampleQ}>
                <p className={styles.sampleQText}>{i + 1}. {q.q}</p>
                <div className={styles.sampleQOptions}>
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`${styles.sampleQOption} ${j === q.correct ? styles.sampleQCorrect : ''}`}
                    >
                      <span className={styles.sampleQLetter}>{String.fromCharCode(65 + j)}</span>
                      <span>{opt}</span>
                      {j === q.correct && <span className={styles.sampleQBadge}>Correct</span>}
                    </div>
                  ))}
                </div>
                <p className={styles.sampleQExplanation}>{q.explanation}</p>
              </div>
            ))}
          </div>
          <div className={styles.previewCta}>
            <p className={styles.previewCtaText}>
              204 more questions like these, organized by domain, with full explanations.
            </p>
            <Link to="/checkout" className={`${s.btnGold} ${s.btnLg}`}>
              Get Full Access for $37
            </Link>
          </div>
        </div>

        {/* Domain breakdown */}
        <div className={styles.domains}>
          <h2 className={styles.domainsH2}>All Six CCA-F Domains Covered</h2>
          <div className={styles.domainsGrid}>
            {[
              { name: 'Core Concepts', pct: 22, q: 45 },
              { name: 'CLAUDE.md Mastery', pct: 18, q: 37 },
              { name: 'Agentic Workflows', pct: 20, q: 41 },
              { name: 'Safety and Compliance', pct: 15, q: 31 },
              { name: 'Tool Use and Integration', pct: 15, q: 31 },
              { name: 'Advanced Patterns', pct: 10, q: 22 },
            ].map(d => (
              <div key={d.name} className={styles.domainItem}>
                <div className={styles.domainHeader}>
                  <span className={styles.domainName}>{d.name}</span>
                  <span className={styles.domainQ}>{d.q} questions</span>
                </div>
                <div className={styles.domainBar}>
                  <div className={styles.domainBarFill} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
