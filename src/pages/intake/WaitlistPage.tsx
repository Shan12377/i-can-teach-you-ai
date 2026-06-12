import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Intake.module.css';
import s from '../../styles/shared.module.css';

export default function WaitlistPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');

    // Store email in sessionStorage so Step 2 can access it
    sessionStorage.setItem('waitlist_email', email);

    // Send to n8n webhook (Step 1 — email only)
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionType: 'waitlist_email',
            email,
            timestamp: new Date().toISOString(),
            source: 'ictai_waitlist_step1',
          }),
        });
      } catch {
        // Non-blocking: proceed even if webhook fails
      }
    }

    setLoading(false);
    navigate('/waitlist/questions');
  };

  return (
    <div className={styles.page}>
      <div className={styles.centeredWrap}>
        <div className={styles.badge}>
          <span className={s.pulseDot} />
          <span>Early Access Waitlist</span>
        </div>
        <h1 className={styles.pageH1}>
          Learn AI in a way that makes sense{' '}
          <span className={styles.accentText}>for your work.</span>
        </h1>
        <p className={styles.pageSubtitle}>
          Early access for healthcare professionals who want clear, practical AI education.
          No overwhelm. No fluff. Built around the workflows you already live in.
        </p>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={s.fieldGroup}>
              <label htmlFor="email" className={s.label}>Your Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={s.input}
                required
                autoFocus
              />
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <button
              type="submit"
              className={`${s.btnGold} ${s.btnLg}`}
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? 'Saving...' : 'Save My Spot'}
            </button>
            <p className={styles.formNote}>
              No spam. No pressure. Unsubscribe any time.
            </p>
          </form>
        </div>

        <div className={styles.benefitsList}>
          {[
            'Early access before public launch',
            'First to hear about programs, tools, and resources',
            'Invitations to live sessions',
            'Launch pricing (not available after public launch)',
          ].map(b => (
            <div key={b} className={styles.benefitItem}>
              <span className={styles.benefitCheck}>&#10003;</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
