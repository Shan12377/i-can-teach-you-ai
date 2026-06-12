import { useState } from 'react';
import styles from './Intake.module.css';
import s from '../../styles/shared.module.css';

const interests = [
  'Learning AI from the beginning',
  'Using AI in my healthcare work',
  'Building my own AI-powered tool or offer',
  'Creating content faster with AI',
  'Using AI for business systems and workflows',
  'HIPAA-conscious automation',
  'Claude Code and vibe coding',
  'Joining a community of healthcare professionals using AI',
];

export default function WaitlistQuestionsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [background, setBackground] = useState('');
  const [challenge, setChallenge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = sessionStorage.getItem('waitlist_email') || '';
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionType: 'waitlist_questions',
            email,
            interests: selected,
            background,
            challenge,
            timestamp: new Date().toISOString(),
            source: 'ictai_waitlist_step2',
          }),
        });
      } catch {
        // Non-blocking
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.centeredWrap}>
          <div className={styles.successIcon}>&#10003;</div>
          <h1 className={styles.pageH1}>You are on the list.</h1>
          <p className={styles.pageSubtitle}>
            Thank you for sharing a bit about yourself. You will hear from Dr. Hunter
            before the public launch with early access details and any live session invitations.
          </p>
          <p className={styles.formNote} style={{ marginTop: '24px' }}>
            In the meantime, read the blog for free content on HIPAA-conscious AI workflows,
            Claude Code certification prep, and vibe coding for healthcare professionals.
          </p>
          <a href="/blog" className={`${s.btnPrimary}`} style={{ marginTop: '24px', display: 'inline-flex' }}>
            Read the Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.centeredWrap}>
        <div className={styles.stepIndicator}>
          <span className={styles.stepDone}>1</span>
          <span className={styles.stepDivider} />
          <span className={styles.stepActive}>2</span>
        </div>
        <h1 className={styles.pageH1}>
          Tell us a little about yourself.
        </h1>
        <p className={styles.pageSubtitle}>
          Optional but helpful. This helps shape the program around what people actually need.
        </p>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={s.fieldGroup}>
              <label className={s.label}>What do you most want help with? (pick any)</label>
              <div className={styles.interestGrid}>
                {interests.map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`${styles.interestBtn} ${selected.includes(item) ? styles.interestBtnActive : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="background" className={s.label}>
                What is your background? (optional)
              </label>
              <select
                id="background"
                value={background}
                onChange={e => setBackground(e.target.value)}
                className={s.select}
              >
                <option value="">Select one</option>
                <option value="pharmacist">Pharmacist / PharmD</option>
                <option value="physician">Physician / MD / DO</option>
                <option value="nurse">Nurse / NP / PA</option>
                <option value="allied_health">Allied Health Professional</option>
                <option value="health_educator">Health Educator / Coach</option>
                <option value="healthcare_admin">Healthcare Administrator</option>
                <option value="other_healthcare">Other Healthcare</option>
                <option value="non_healthcare">Not in Healthcare</option>
              </select>
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="challenge" className={s.label}>
                What is your biggest challenge with AI right now? (optional)
              </label>
              <textarea
                id="challenge"
                value={challenge}
                onChange={e => setChallenge(e.target.value)}
                placeholder="e.g. I do not know where to start, or I am worried about compliance..."
                className={s.textarea}
                rows={3}
              />
            </div>

            <button
              type="submit"
              className={`${s.btnGold} ${s.btnLg}`}
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? 'Submitting...' : 'Complete My Registration'}
            </button>
            <p className={styles.formNote}>
              All fields on this page are optional. Your email is already saved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
