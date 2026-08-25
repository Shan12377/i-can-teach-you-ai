import { useState } from 'react';
import styles from './Exam.module.css';
import type { ExamQuestion } from './types';
import { DOMAIN_LABELS } from './types';
import { reportExamQuestion } from '../../lib/examFeedback';

interface QuestionCardProps {
  question: ExamQuestion;
  index?: number;
  selected: number | undefined;
  onSelect: (index: number) => void;
  /** When true, options are locked after answering and the explanation reveals. */
  revealOnAnswer: boolean;
}

export default function QuestionCard({ question, index, selected, onSelect, revealOnAnswer }: QuestionCardProps) {
  const hasAnswered = selected !== undefined;
  const showExplanation = revealOnAnswer && hasAnswered;
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
        <span className={styles.reviewQScenario}>{question.scenario}</span>
      </div>
      <p className={styles.reviewQText}>{question.question}</p>
      <div className={styles.reviewQOptions}>
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isPicked = selected === i;
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
              onClick={() => onSelect(i)}
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
