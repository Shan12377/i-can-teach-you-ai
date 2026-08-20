import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Exam.module.css';
import s from '../styles/shared.module.css';

const EXAM_ACCESS_TOKEN_KEY = 'examAccessToken';
const SIMULATION_SIZE = 50;

interface ExamQuestion {
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

const DOMAIN_LABELS: Record<string, string> = {
  D1: 'D1 · Agentic AI Architecture',
  D2: 'D2 · Tool Design & MCP',
  D3: 'D3 · Claude Code',
  D4: 'D4 · Prompt Engineering',
  D5: 'D5 · Context Management',
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

type LoadState = 'checking' | 'denied' | 'error' | 'ready';
type Mode = 'menu' | 'review' | 'simulation';

export default function ExamPage() {
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState<LoadState>('checking');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [mode, setMode] = useState<Mode>('menu');

  useEffect(() => {
    const token = localStorage.getItem(EXAM_ACCESS_TOKEN_KEY);
    if (!token) {
      navigate('/exam-prep', { replace: true });
      return;
    }

    let cancelled = false;
    fetch('/api/exam-questions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) {
          localStorage.removeItem(EXAM_ACCESS_TOKEN_KEY);
          setLoadState('denied');
          return;
        }
        if (!res.ok) {
          setLoadState('error');
          return;
        }
        const data: ExamQuestion[] = await res.json();
        setQuestions(data);
        setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (loadState === 'checking') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>Verifying access...</p>
        </div>
      </div>
    );
  }

  if (loadState === 'denied') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>
            Your access link has expired or is invalid.{' '}
            <Link to="/exam-prep" className={styles.statusLink}>Return to Exam Prep</Link>
          </p>
        </div>
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>
            Something went wrong loading the exam content. Email{' '}
            <a href="mailto:hello@icanteachyouai.com" className={styles.statusLink}>hello@icanteachyouai.com</a>{' '}
            and we will get you sorted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={s.wrapWide}>
        {mode === 'menu' && <ExamMenu onSelect={setMode} total={questions.length} />}
        {mode === 'review' && <ReviewMode questions={questions} onExit={() => setMode('menu')} />}
        {mode === 'simulation' && <SimulationMode questions={questions} onExit={() => setMode('menu')} />}
      </div>
    </div>
  );
}

function ExamMenu({ onSelect, total }: { onSelect: (mode: Mode) => void; total: number }) {
  return (
    <div className={styles.menu}>
      <span className={s.kickerGold}>CCA-F Exam Prep</span>
      <h1 className={styles.menuH1}>{total} Practice Questions</h1>
      <p className={styles.menuSub}>Pick a mode. Both pull from the full question bank.</p>
      <div className={styles.menuGrid}>
        <button className={styles.menuCard} onClick={() => onSelect('review')}>
          <span className={styles.menuCardTitle}>Practice by Domain</span>
          <span className={styles.menuCardDesc}>
            Browse all {total} questions, filter by domain and difficulty, reveal the answer and full explanation
            for each one at your own pace.
          </span>
        </button>
        <button className={styles.menuCard} onClick={() => onSelect('simulation')}>
          <span className={styles.menuCardTitle}>Timed Practice Exam</span>
          <span className={styles.menuCardDesc}>
            A {SIMULATION_SIZE}-question randomized simulation with a running timer. Answer everything, submit, and
            get a full score breakdown by domain.
          </span>
        </button>
      </div>
    </div>
  );
}

function ReviewMode({ questions, onExit }: { questions: ExamQuestion[]; onExit: () => void }) {
  const [domain, setDomain] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<string>('All');
  const [revealed, setRevealed] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    return questions.filter(
      (q) =>
        (domain === 'All' || q.domain === domain) &&
        (difficulty === 'All' || q.difficulty === difficulty)
    );
  }, [questions, domain, difficulty]);

  return (
    <div className={styles.review}>
      <button className={styles.backLink} onClick={onExit}>&larr; Back to modes</button>
      <h1 className={styles.reviewH1}>Practice by Domain</h1>

      <div className={styles.filterRow}>
        <select className={s.select} value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="All">All Domains</option>
          {Object.entries(DOMAIN_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <select className={s.select} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="All">All Difficulties</option>
          <option value="standard">Standard</option>
          <option value="hard">Hard</option>
        </select>
        <span className={styles.filterCount}>{filtered.length} questions</span>
      </div>

      <div className={styles.reviewList}>
        {filtered.map((q) => {
          const selected = revealed[q.id];
          const hasAnswered = selected !== undefined;
          return (
            <div key={q.id} className={styles.reviewQ}>
              <div className={styles.reviewQMeta}>
                <span className={`${s.pill} ${s.pillTeal}`}>{DOMAIN_LABELS[q.domain] ?? q.domain}</span>
                {q.difficulty === 'hard' && <span className={`${s.pill} ${s.pillAmber}`}>Hard</span>}
                <span className={styles.reviewQScenario}>{q.scenario}</span>
              </div>
              <p className={styles.reviewQText}>{q.question}</p>
              <div className={styles.reviewQOptions}>
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correctIndex;
                  const isPicked = selected === i;
                  const cls = !hasAnswered
                    ? styles.reviewQOption
                    : isCorrect
                      ? `${styles.reviewQOption} ${styles.reviewQOptionCorrect}`
                      : isPicked
                        ? `${styles.reviewQOption} ${styles.reviewQOptionWrong}`
                        : styles.reviewQOption;
                  return (
                    <button
                      key={i}
                      className={cls}
                      disabled={hasAnswered}
                      onClick={() => setRevealed((prev) => ({ ...prev, [q.id]: i }))}
                    >
                      <span className={styles.reviewQLetter}>{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {hasAnswered && (
                <div className={styles.reviewQExplain}>
                  {/* Developer-authored content from our own encrypted question bank, never user input. */}
                  <p dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  <p className={styles.reviewQWhy} dangerouslySetInnerHTML={{ __html: q.distractorNotes }} />
                  <a href={q.source} target="_blank" rel="noopener noreferrer" className={styles.reviewQSource}>
                    View source documentation &rarr;
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimulationMode({ questions, onExit }: { questions: ExamQuestion[]; onExit: () => void }) {
  const [pool] = useState<ExamQuestion[]>(() => shuffle(questions).slice(0, SIMULATION_SIZE));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    const byDomain: Record<string, { correct: number; total: number }> = {};
    for (const q of pool) {
      byDomain[q.domain] ??= { correct: 0, total: 0 };
      byDomain[q.domain].total += 1;
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
        byDomain[q.domain].correct += 1;
      }
    }
    return { correct, total: pool.length, byDomain };
  }, [submitted, pool, answers]);

  if (submitted && score) {
    return (
      <div className={styles.simResults}>
        <button className={styles.backLink} onClick={onExit}>&larr; Back to modes</button>
        <h1 className={styles.reviewH1}>Exam Results</h1>
        <div className={styles.scoreCard}>
          <span className={styles.scoreBig}>{Math.round((score.correct / score.total) * 100)}%</span>
          <span className={styles.scoreSub}>{score.correct} of {score.total} correct &middot; {formatElapsed(elapsed)}</span>
        </div>
        <div className={styles.domainBreakdown}>
          {Object.entries(score.byDomain).map(([domain, d]) => (
            <div key={domain} className={styles.domainRow}>
              <span>{DOMAIN_LABELS[domain] ?? domain}</span>
              <span>{d.correct}/{d.total}</span>
            </div>
          ))}
        </div>
        <ReviewMode
          questions={pool.map((q) => ({ ...q }))}
          onExit={onExit}
        />
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className={styles.simulation}>
      <div className={styles.simHeader}>
        <button className={styles.backLink} onClick={onExit}>&larr; Back to modes</button>
        <span className={styles.simTimer}>{formatElapsed(elapsed)}</span>
      </div>
      <h1 className={styles.reviewH1}>Timed Practice Exam</h1>
      <p className={styles.menuSub}>{answeredCount} of {pool.length} answered</p>

      <div className={styles.reviewList}>
        {pool.map((q, idx) => (
          <div key={q.id} className={styles.reviewQ}>
            <div className={styles.reviewQMeta}>
              <span className={styles.reviewQNumber}>{idx + 1}</span>
              <span className={`${s.pill} ${s.pillTeal}`}>{DOMAIN_LABELS[q.domain] ?? q.domain}</span>
            </div>
            <p className={styles.reviewQText}>{q.question}</p>
            <div className={styles.reviewQOptions}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={
                    answers[q.id] === i
                      ? `${styles.reviewQOption} ${styles.reviewQOptionSelected}`
                      : styles.reviewQOption
                  }
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                >
                  <span className={styles.reviewQLetter}>{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${s.btnGold} ${s.btnLg}`}
        disabled={answeredCount < pool.length}
        onClick={() => setSubmitted(true)}
      >
        {answeredCount < pool.length ? `Answer all questions to submit (${answeredCount}/${pool.length})` : 'Submit Exam'}
      </button>
    </div>
  );
}
