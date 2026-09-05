import styles from './Exam.module.css';
import type { CheatSheetSection, CheatSheetRow } from './types';

const STATUS_LABEL: Record<string, string> = {
  VERIFIED: 'Documented',
  'EXAM-GUIDE': 'Exam guide',
  PRACTICE: 'Practice',
};

function SourceLine({ row }: { row: CheatSheetRow }) {
  if (!row.source) return null;
  const badge = row.status ? STATUS_LABEL[row.status] ?? row.status : null;
  const isLink = row.source.startsWith('http');
  return (
    <span className={styles.csSource}>
      {badge && <span className={`${styles.csBadge} ${styles['csBadge' + (row.status ?? '').replace('-', '')]}`}>{badge}</span>}
      {isLink ? (
        <a href={row.source} target="_blank" rel="noopener noreferrer">
          {new URL(row.source).hostname.replace('www.', '')}
        </a>
      ) : (
        <span>{row.source}</span>
      )}
    </span>
  );
}

interface CheatSheetTabProps {
  sections: CheatSheetSection[];
}

export default function CheatSheetTab({ sections }: CheatSheetTabProps) {
  return (
    <div>
      <h1 className={styles.reviewH1}>Master Cheat Sheet</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        {sections.length} sections covering every critical flag, file path, decision rule, and term the exam
        tests. Every line carries the source that verifies it. <strong>Documented</strong> means Anthropic or MCP
        documentation states it. <strong>Exam guide</strong> means it comes from the official exam guide and the
        current product may differ. <strong>Practice</strong> means sound professional practice with no first
        party source, so do not treat it as documentation.
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
                <SourceLine row={row} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
