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
              Dr. Shallanda Hunter started building with AI years before it was a headline, and hasn't stopped.
              From{' '}
              <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer">
                the first site she ever built with AI
              </a>
              {' '}through Hunter's Holistic Health, DeIDGuard, Pharmacy Decoder, and now I Can Teach You AI,
              each one shipped without a traditional development team.
            </p>
            <p className={styles.bioPara}>
              Her approach to teaching comes from the same place as her approach to building: she designs the
              way she'd want to learn. Pharmacy Decoder's 340 practice questions, mapped across all four NABP
              domains, are built the way a real exam is built, not just recall, but the reasoning an exam
              actually rewards. That same instinct for what makes people pass shapes every course and
              workshop taught at I Can Teach You AI.
            </p>
            <p className={styles.bioPara}>
              Her clinical training shapes everything she builds. Understanding drug interactions, lab
              interpretation, and patient safety protocols is what separates compliant AI systems from
              the ones that get flagged. That perspective is baked into every course, every workshop,
              and every workflow she teaches.
            </p>
            <p className={styles.bioPara}>
              The curriculum here is not theoretical. Every workflow, every compliance decision, and every
              build pattern covered in this program has been tested on real, live systems:{' '}
              <a href="https://www.huntersholistichealth.com" target="_blank" rel="noopener noreferrer">
                huntersholistichealth.com
              </a>
              ,{' '}
              <a href="https://pharmacydecoder.com" target="_blank" rel="noopener noreferrer">
                pharmacydecoder.com
              </a>
              , and DeIDGuard, and documented at{' '}
              <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer">
                drshallandahunter.com
              </a>. When the healthcare work needs a break, that same build instinct goes toward Yaadmoji,
              a Jamaican Patois sticker app, and Yaad Dominoes, a real-rules Jamaican dominoes game.
            </p>

            <div className={styles.credentialGrid}>
              {[
                { label: 'Credential', value: 'Doctor of Pharmacy (PharmD)' },
                { label: 'Specialty', value: 'Functional Medicine Education' },
                { label: 'AI Focus', value: 'HIPAA-Conscious Workflows, Vibe Coding, Claude Code' },
                { label: 'Live Platform', value: 'huntersholistichealth.com' },
                { label: 'Live Platform', value: 'pharmacydecoder.com' },
                { label: 'Main Site', value: 'drshallandahunter.com' },
              ].map(c => (
                <div key={`${c.label}-${c.value}`} className={styles.credentialItem}>
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
