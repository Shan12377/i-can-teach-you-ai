import { Link } from 'react-router-dom';
import styles from './About.module.css';
import s from '../styles/shared.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={s.wrap}>
        <span className={s.kicker}>About</span>
        <h1 className={styles.pageH1}>
          Dr. Shallanda Hunter, PharmD
        </h1>
        <p className={styles.subtitle}>
          Functional Medicine Educator. AI Implementation Guide. Product Builder.
        </p>

        <div className={styles.bioGrid}>
          <div className={styles.bioContent}>
            <p className={styles.bioPara}>
              Dr. Shallanda Hunter is a PharmD with a background in functional medicine education and a growing
              practice in AI-powered health systems. She built Hunters Holistic Health, a fully deployed
              functional medicine education platform, using Claude Code, n8n automation, and a HIPAA-conscious
              architecture, without a traditional development team.
            </p>
            <p className={styles.bioPara}>
              The experience of building that platform from the ground up, navigating FTC compliance, HIPAA
              architecture decisions, Apple App Store eligibility, and the practical realities of vibe coding,
              is the foundation of everything taught at I Can Teach You AI.
            </p>
            <p className={styles.bioPara}>
              She uses the title PharmD, not RPh, intentionally. PharmD is an academic credential that signals
              clinical depth and scientific rigor without triggering the scope-of-practice constraints of a
              licensed pharmacist operating outside a pharmacy. That distinction matters when you are building
              educational platforms, not dispensing medications.
            </p>
            <p className={styles.bioPara}>
              The curriculum here is not theoretical. Every workflow, every compliance decision, and every
              build pattern covered in this program has been tested in production at{' '}
              <a href="https://www.huntersholistichealth.com" target="_blank" rel="noopener noreferrer">
                huntersholistichealth.com
              </a>
              {' '}and documented at{' '}
              <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer">
                drshallandahunter.com
              </a>.
            </p>

            <div className={styles.credentialGrid}>
              {[
                { label: 'Credential', value: 'Doctor of Pharmacy (PharmD)' },
                { label: 'Specialty', value: 'Functional Medicine Education' },
                { label: 'AI Focus', value: 'HIPAA-Conscious Workflows, Vibe Coding, Claude Code' },
                { label: 'Live Platform', value: 'huntersholistichealth.com' },
                { label: 'Main Site', value: 'drshallandahunter.com' },
              ].map(c => (
                <div key={c.label} className={styles.credentialItem}>
                  <span className={styles.credentialLabel}>{c.label}</span>
                  <span className={styles.credentialValue}>{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bioSidebar}>
            <div className={styles.sideCard}>
              <p className={styles.sideCardTitle}>What I Build</p>
              <div className={styles.sideCardItems}>
                {[
                  'HIPAA-conscious automation workflows',
                  'AI-powered health education platforms',
                  'Claude Code and vibe coding curricula',
                  'n8n intake and routing systems',
                  'Functional medicine educator tools',
                ].map(item => (
                  <div key={item} className={styles.sideCardItem}>
                    <span className={styles.sideCardDot} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sideCard}>
              <p className={styles.sideCardTitle}>Links</p>
              <div className={styles.sideCardItems}>
                <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer" className={styles.sideCardLink}>
                  drshallandahunter.com &rarr;
                </a>
                <a href="https://www.huntersholistichealth.com" target="_blank" rel="noopener noreferrer" className={styles.sideCardLink}>
                  huntersholistichealth.com &rarr;
                </a>
              </div>
            </div>

            <Link to="/waitlist" className={`${s.btnGold}`} style={{ display: 'block', textAlign: 'center' }}>
              Join the Waitlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
