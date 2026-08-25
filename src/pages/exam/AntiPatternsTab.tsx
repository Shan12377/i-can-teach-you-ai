import styles from './Exam.module.css';
import type { AntiPattern } from './types';
import { DOMAIN_LABELS } from './types';

interface AntiPatternsTabProps {
  antiPatterns: AntiPattern[];
}

export default function AntiPatternsTab({ antiPatterns }: AntiPatternsTabProps) {
  return (
    <div>
      <h1 className={styles.reviewH1}>Anti-Pattern Cheat Sheet</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        {antiPatterns.length} real exam distractors. For each one: the wrong approach, the correct approach, and
        why the trap is tempting.
      </p>
      <div className={styles.apGrid}>
        {antiPatterns.map((ap) => (
          <div key={ap.title} className={styles.apCard}>
            <div className={styles.apHead}>
              <span className={styles.reviewQScenario}>{DOMAIN_LABELS[ap.domain] ?? ap.domain}</span>
              <span className={styles.apTitle}>{ap.title}</span>
              <span
                className={`${styles.apSeverity} ${ap.severity === 'critical' ? styles.apSeverityCritical : styles.apSeverityHigh}`}
              >
                {ap.severity}
              </span>
            </div>
            <div className={styles.apBody}>
              <div className={styles.apWrong}>
                <div className={styles.apLabel}>Wrong approach</div>
                {ap.wrong}
              </div>
              <div className={styles.apRight}>
                <div className={styles.apLabel}>Correct approach</div>
                {/* Developer-authored content from our own encrypted question bank, never user input. */}
                <span dangerouslySetInnerHTML={{ __html: ap.right }} />
              </div>
            </div>
            <div className={styles.apNote}>{ap.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
