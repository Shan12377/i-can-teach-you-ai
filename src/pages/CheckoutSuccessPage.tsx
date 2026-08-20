import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Checkout.module.css';
import s from '../styles/shared.module.css';
import { storeExamAccess, verifyExamPurchase } from '../lib/examAccess';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [examUnlocked, setExamUnlocked] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    verifyExamPurchase(sessionId)
      .then((token) => {
        if (cancelled || !token) return;
        storeExamAccess(token, sessionId);
        setExamUnlocked(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className={styles.page}>
      <div className={styles.successWrap}>
        <div className={styles.successCheck}>&#10003;</div>
        <h1 className={styles.successTitle}>Payment Confirmed</h1>
        <p className={styles.successText}>
          Thank you for your purchase. A receipt has been sent to your email address. You can access your content below.
        </p>
        <div className={styles.successBtns}>
          <Link to={examUnlocked ? '/exam' : '/exam-prep'} className={`${s.btnGold}`}>
            Access Exam Prep
          </Link>
          <Link to="/blog" className={`${s.btnOutline}`}>
            Read the Blog
          </Link>
        </div>
        <p className={styles.successNote}>
          Questions? Email{' '}
          <a href="mailto:hello@icanteachyouai.com" className={styles.successNoteLink}>
            hello@icanteachyouai.com
          </a>
        </p>
      </div>
    </div>
  );
}
