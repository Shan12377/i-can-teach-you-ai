import { useMemo, useState } from 'react';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import type { ExamQuestion } from './types';
import { DOMAIN_LABELS } from './types';
import QuestionCard from './QuestionCard';

interface QuizTabProps {
  questions: ExamQuestion[];
}

export default function QuizTab({ questions }: QuizTabProps) {
  const [domain, setDomain] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<string>('All');
  const [revealed, setRevealed] = useState<Record<string, number[]>>({});

  const filtered = useMemo(() => {
    return questions.filter(
      (q) =>
        (domain === 'All' || q.domain === domain) &&
        (difficulty === 'All' || q.difficulty === difficulty)
    );
  }, [questions, domain, difficulty]);

  return (
    <div>
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
        {filtered.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={revealed[q.id]}
            onSelect={(next) => setRevealed((prev) => ({ ...prev, [q.id]: next }))}
            revealOnAnswer
          />
        ))}
      </div>
    </div>
  );
}
