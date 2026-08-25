import { useState } from 'react';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import { submitExamReview } from '../../lib/examFeedback';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function FeedbackTab() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;
    setStatus('sending');
    const ok = await submitExamReview({ rating, comment: comment.trim() });
    if (ok) {
      setStatus('sent');
      setRating(0);
      setComment('');
    } else {
      setStatus('error');
    }
  }

  return (
    <div>
      <h1 className={styles.reviewH1}>Feedback &amp; Reviews</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        Found a question that looks wrong? Use the "Report an issue" button next to that question in Practice
        Quiz. Everything else, general feedback or a review of the exam prep tool, goes here.
      </p>
      <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <div className={styles.feedbackField}>
          <span className={styles.feedbackLabel}>Rating</span>
          <div className={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.ratingStar} ${n <= rating ? styles.ratingStarActive : ''}`}
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >
                &#9733;
              </button>
            ))}
          </div>
        </div>
        <div className={styles.feedbackField}>
          <label className={styles.feedbackLabel} htmlFor="feedback-comment">Your review</label>
          <textarea
            id="feedback-comment"
            className={styles.feedbackTextarea}
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What worked, what didn't, what would make this better?"
            required
          />
        </div>
        <button type="submit" className={s.btnGold} disabled={status === 'sending' || rating === 0 || !comment.trim()}>
          {status === 'sending' ? 'Sending...' : 'Submit Review'}
        </button>
        {status === 'sent' && <p className={styles.feedbackStatus}>Thanks, this was sent.</p>}
        {status === 'error' && <p className={styles.feedbackStatusError}>Something went wrong. Try again in a moment.</p>}
      </form>
    </div>
  );
}
