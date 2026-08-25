import styles from './Exam.module.css';
import type { CheatSheetSection } from './types';

interface CheatSheetTabProps {
  sections: CheatSheetSection[];
}

export default function CheatSheetTab({ sections }: CheatSheetTabProps) {
  return (
    <div>
      <h1 className={styles.reviewH1}>Master Cheat Sheet</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        {sections.length} sections covering every critical flag, file path, decision rule, and terminology the
        exam tests.
      </p>
      <div className={styles.csGrid}>
        {sections.map((section) => (
          <div key={section.title} className={styles.csSection}>
            <div className={styles.csHead}>
              <h3>{section.title}</h3>
            </div>
            {section.rows.map((row) => (
              <div key={row.term} className={styles.csRow}>
                <span className={styles.csTerm}>{row.term}</span>
                {/* Developer-authored content from our own encrypted question bank, never user input. */}
                <span className={styles.csDef} dangerouslySetInnerHTML={{ __html: row.detail }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
