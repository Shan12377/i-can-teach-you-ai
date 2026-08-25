import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExamPrep.module.css';
import s from '../styles/shared.module.css';
import { recoverExamAccess } from '../lib/examAccess';

function RecoverAccess() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'sent'>('idle');
  const [message, setMessage] = useState('');

  if (!open) {
    return (
      <button type="button" className={styles.recoverToggle} onClick={() => setOpen(true)}>
        Already purchased? Recover access
      </button>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await recoverExamAccess(email);
    setStatus(result.ok ? 'sent' : 'error');
    setMessage(result.message);
  };

  if (status === 'sent') {
    return <p className={styles.recoverForm}>{message}</p>;
  }

  return (
    <form className={styles.recoverForm} onSubmit={handleSubmit}>
      <label className={styles.recoverLabel} htmlFor="recover-email">
        Enter the email you purchased with
      </label>
      <div className={styles.recoverRow}>
        <input
          id="recover-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={s.input}
        />
        <button type="submit" className={s.btnOutline} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Recover'}
        </button>
      </div>
      {status === 'error' && <p className={styles.recoverError}>{message}</p>}
    </form>
  );
}

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
              Built by a PharmD who has designed real certification exam questions before, and ships
              production software with Claude Code.
            </p>
          </div>
          <div className={styles.headerCard}>
            <div className={styles.headerCardPrice}>$37</div>
            <p className={styles.headerCardNote}>One-time purchase. Instant access.</p>
            <Link to="/checkout" className={`${s.btnGold} ${styles.headerCardCta}`}>
              Get Instant Access
            </Link>
            <div className={styles.headerCardFeatures}>
              {[
                '207 practice questions',
                'All 5 CCA-F domains',
                'Official doc citations',
                '24 anti-patterns, 70 flashcards',
                'Timed exam, cheat sheet, notes',
                'Downloadable PDF study guide',
              ].map(f => (
                <div key={f} className={styles.headerCardFeature}>
                  <span className={styles.headerCardFeatureCheck}>&#10003;</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <RecoverAccess />
          </div>
        </div>

        {/* Pain: what most prep resources get wrong */}
        <div className={styles.painSection}>
          <h2 className={styles.painH2}>6 things most CCA-F prep resources get wrong</h2>
          <p className={styles.painIntro}>
            Every fact in this bank is checked against the official Anthropic documentation. These six show up
            wrong across most competing study material, and each one is a real point lost on exam day.
          </p>
          <div className={styles.painList}>
            {[
              {
                title: 'Wrong CLAUDE.md project path',
                detail: <>Most resources say project memory lives at <code>.claude/CLAUDE.md</code>. The real path is <code>./CLAUDE.md</code>, in the project root. The <code>.claude/</code> folder is for settings, rules, and commands, not CLAUDE.md.</>,
              },
              {
                title: 'SSE listed as a current MCP transport',
                detail: <>SSE was deprecated in the MCP spec. The current transports are stdio and Streamable HTTP. Any resource still recommending SSE for new work is teaching you to fail a transport question.</>,
              },
              {
                title: 'Only 3 tool_choice values taught',
                detail: <>There are four: <code>auto</code>, <code>any</code>, forced (<code>{'{type:"tool",name:"X"}'}</code>), and <code>none</code>. Missing <code>none</code> costs you on any text-only-turn question.</>,
              },
              {
                title: 'Hooks configured in CLAUDE.md',
                detail: <>Hooks belong in <code>settings.json</code>, either <code>~/.claude/settings.json</code> (user) or <code>.claude/settings.json</code> (project). CLAUDE.md is natural-language context; settings.json is parsed configuration.</>,
              },
              {
                title: 'Only 2 stop_reason values taught',
                detail: <>There are three: <code>tool_use</code>, <code>end_turn</code>, and <code>pause_turn</code>. When <code>pause_turn</code> fires, the iteration limit was hit mid-work, Claude is not finished, and you must re-send.</>,
              },
              {
                title: 'One prompt caching threshold for every model',
                detail: <>The minimum is 1,024 tokens for Opus and Sonnet, but 2,048 tokens for Haiku 3.5. The blanket "1,024 rule" that circulates everywhere is only correct for the Opus/Sonnet tier.</>,
              },
            ].map((item, i) => (
              <div key={item.title} className={styles.painItem}>
                <span className={styles.painNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={styles.painTitle}>{item.title}</p>
                  <p className={styles.painDetail}>{item.detail}</p>
                </div>
                <span className={styles.painBadge}>Fixed</span>
              </div>
            ))}
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
                q: 'Your agentic loop code checks: if (response.content[0].type === \'text\') { break; }. In production, it sometimes stops mid-task. What is the root cause?',
                options: [
                  'The model is returning text when it should be calling tools',
                  'Claude can return text blocks AND tool_use blocks in the same response, the code breaks on any text, missing the tool_use blocks',
                  'The max_tokens limit is being hit before tool calls are emitted',
                  'The system prompt needs clearer instructions about when to use tools',
                ],
                correct: 1,
                explanation: 'Claude can legitimately return both text content and tool_use blocks in the same response. Checking content[0].type == \'text\' breaks the loop prematurely, abandoning the pending tool calls. Always check stop_reason.',
              },
              {
                q: 'A new developer cloned the repo but Claude Code doesn\'t follow the team\'s coding standards. The lead developer has the standards defined in ~/.claude/CLAUDE.md. What is the problem?',
                options: [
                  'The file uses an unsupported format',
                  'User-level CLAUDE.md is personal and not shared via version control',
                  'The developer needs to run \'claude sync\' to pull configuration',
                  'CLAUDE.md configuration only applies to the machine where it was created',
                ],
                correct: 1,
                explanation: 'User-level config (~/.claude/CLAUDE.md) is personal, it lives outside the repository and is never shared via git. Team-wide conventions must be in project root ./CLAUDE.md, committed to the repository.',
              },
              {
                q: 'Claude keeps fabricating values for a \'tax_id\' field when extracting from documents that don\'t contain tax IDs. What schema change prevents this?',
                options: [
                  'Add a validation rule blocking values that don\'t match the EIN format',
                  'Set a default value of \'N/A\' for the tax_id field',
                  'Make the tax_id field optional/nullable in the JSON schema',
                  'Add \'do not invent tax IDs\' to the extraction system prompt',
                ],
                correct: 2,
                explanation: 'Making fields optional/nullable signals to Claude that the field may legitimately be absent. When a field is required, Claude is forced to provide something, leading to fabrication.',
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
          <h2 className={styles.domainsH2}>All Five CCA-F Domains Covered</h2>
          <div className={styles.domainsGrid}>
            {[
              { name: 'Agentic Architecture & Orchestration', pct: 27, q: 50 },
              { name: 'Tool Design & MCP Integration', pct: 18, q: 33 },
              { name: 'Claude Code Configuration & Workflows', pct: 20, q: 38 },
              { name: 'Prompt Engineering & Structured Output', pct: 20, q: 44 },
              { name: 'Context Management & Reliability', pct: 15, q: 42 },
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
