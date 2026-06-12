import { Link } from 'react-router-dom';
import styles from './Checkout.module.css';
import s from '../styles/shared.module.css';

export default function CheckoutSuccessPage() {
  return (
    <div className={styles.page}>
      <div className={styles.successWrap}>
        <div className={styles.successCheck}>&#10003;</div>
        <h1 className={styles.successTitle}>Payment Confirmed</h1>
        <p className={styles.successText}>
          Thank you for your purchase. A receipt has been sent to your email address. You can access your content below.
        </p>
        <div className={styles.successBtns}>
          <Link to="/exam-prep" className={`${s.btnGold}`}>
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
