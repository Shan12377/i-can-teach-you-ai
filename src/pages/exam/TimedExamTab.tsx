import { useEffect, useMemo, useState } from 'react';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import type { ExamQuestion } from './types';
import { DOMAIN_LABELS } from './types';
import QuestionCard from './QuestionCard';

const SIMULATION_SIZE = 60;

interface TimedExamTabProps {
  questions: ExamQuestion[];
}

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

export default function TimedExamTab({ questions }: TimedExamTabProps) {
  const [pool, setPool] = useState<ExamQuestion[]>(() => shuffle(questions).slice(0, SIMULATION_SIZE));
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

  function restart() {
    setPool(shuffle(questions).slice(0, SIMULATION_SIZE));
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
  }

  if (submitted && score) {
    return (
      <div className={styles.simResults}>
        <h1 className={styles.reviewH1}>Exam Results</h1>
        <div className={styles.scoreCard}>
          <span className={styles.scoreBig}>{Math.round((score.correct / score.total) * 100)}%</span>
          <span className={styles.scoreSub}>{score.correct} of {score.total} correct &middot; {formatElapsed(elapsed)}</span>
          <span className={styles.scoreSub}>
            Percent correct on this practice set. The real exam reports a scaled score from 100 to 1,000 with a
            pass mark of 720, which is not a straight percentage.
          </span>
        </div>
        <div className={styles.domainBreakdown}>
          {Object.entries(score.byDomain).map(([domain, d]) => (
            <div key={domain} className={styles.domainRow}>
              <span>{DOMAIN_LABELS[domain] ?? domain}</span>
              <span>{d.correct}/{d.total}</span>
            </div>
          ))}
        </div>
        <button className={`${s.btnGold} ${styles.simResultsRetry}`} onClick={restart}>Try Again</button>
        <div className={styles.reviewList}>
          {pool.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              selected={answers[q.id]}
              onSelect={() => {}}
              revealOnAnswer
            />
          ))}
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className={styles.simulation}>
      <div className={styles.simHeader}>
        <h1 className={styles.reviewH1}>Timed Practice Exam</h1>
        <span className={styles.simTimer}>{formatElapsed(elapsed)}</span>
      </div>
      <p className={styles.menuSub}>{answeredCount} of {pool.length} answered</p>

      <div className={styles.reviewList}>
        {pool.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            selected={answers[q.id]}
            onSelect={(i) => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
            revealOnAnswer={false}
          />
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
