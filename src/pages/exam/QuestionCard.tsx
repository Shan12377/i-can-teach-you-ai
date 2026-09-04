import { useState } from 'react';
import styles from './Exam.module.css';
import type { ExamQuestion } from './types';
import { DOMAIN_LABELS } from './types';
import { reportExamQuestion } from '../../lib/examFeedback';

interface QuestionCardProps {
  question: ExamQuestion;
  index?: number;
  /** Indices the candidate has picked. Single-response items hold at most one. */
  selected: number[] | undefined;
  onSelect: (next: number[]) => void;
  /** When true, options are locked after answering and the explanation reveals. */
  revealOnAnswer: boolean;
}

export default function QuestionCard({ question, index, selected, onSelect, revealOnAnswer }: QuestionCardProps) {
  const answerKey = question.correctIndices ?? [question.correctIndex];
  const required = answerKey.length;
  const isMulti = required > 1;
  const picks = selected ?? [];
  // A multiple-response item is only answered once the candidate has picked the
  // number of responses the item asks for.
  const hasAnswered = picks.length === required;
  const showExplanation = revealOnAnswer && hasAnswered;

  function toggle(i: number) {
    if (!isMulti) return onSelect([i]);
    if (picks.includes(i)) return onSelect(picks.filter((p) => p !== i));
    if (picks.length >= required) return;
    onSelect([...picks, i]);
  }
  const [reportOpen, setReportOpen] = useState(false);
  const [reportNote, setReportNote] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function submitReport() {
    if (!reportNote.trim()) return;
    setReportStatus('sending');
    await reportExamQuestion({ questionId: question.id, note: reportNote.trim() });
    setReportStatus('sent');
  }

  return (
    <div className={styles.reviewQ}>
      <div className={styles.reviewQMeta}>
        {index !== undefined && <span className={styles.reviewQNumber}>{index + 1}</span>}
        <span className={styles.pillDomain}>{DOMAIN_LABELS[question.domain] ?? question.domain}</span>
        {question.difficulty === 'hard' && <span className={styles.pillHard}>Hard</span>}
        {isMulti && <span className={styles.pillMulti}>Select {required}</span>}
        <span className={styles.reviewQScenario}>{question.scenario}</span>
      </div>
      <p className={styles.reviewQText}>{question.question}</p>
      <div className={styles.reviewQOptions}>
        {question.options.map((opt, i) => {
          const isCorrect = answerKey.includes(i);
          const isPicked = picks.includes(i);
          let cls = styles.reviewQOption;
          if (showExplanation) {
            if (isCorrect) cls = `${styles.reviewQOption} ${styles.reviewQOptionCorrect}`;
            else if (isPicked) cls = `${styles.reviewQOption} ${styles.reviewQOptionWrong}`;
          } else if (isPicked) {
            cls = `${styles.reviewQOption} ${styles.reviewQOptionSelected}`;
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={revealOnAnswer && hasAnswered}
              onClick={() => toggle(i)}
            >
              <span className={styles.reviewQLetter}>{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className={styles.reviewQExplain}>
          {/* Developer-authored content from our own encrypted question bank, never user input. */}
          <p dangerouslySetInnerHTML={{ __html: question.explanation }} />
          <p className={styles.reviewQWhy} dangerouslySetInnerHTML={{ __html: question.distractorNotes }} />
          {question.revised && (
            <p className={styles.reviewQRevised}>
              Updated {question.revised.date}: {question.revised.note}
            </p>
          )}
          <a href={question.source} target="_blank" rel="noopener noreferrer" className={styles.reviewQSource}>
            View source documentation &rarr;
          </a>
          {reportStatus === 'sent' ? (
            <span className={`${styles.reportBtn} ${styles.reportBtnDone}`}>&#10003; Reported</span>
          ) : reportOpen ? (
            <div className={styles.reportInline}>
              <input
                className={`${styles.feedbackInput} ${styles.reportInlineInput}`}
                placeholder="What looks wrong about this question?"
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
              />
              <button
                className={styles.reportBtn}
                disabled={reportStatus === 'sending' || !reportNote.trim()}
                onClick={submitReport}
              >
                {reportStatus === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </div>
          ) : (
            <button className={styles.reportBtn} onClick={() => setReportOpen(true)}>
              &#9873; Report an issue
            </button>
          )}
        </div>
      )}
    </div>
  );
}
