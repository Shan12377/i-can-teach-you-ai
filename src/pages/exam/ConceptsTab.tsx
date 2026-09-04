import { useState } from 'react';
import styles from './Exam.module.css';
import type { DomainConcept } from './types';
import { DOMAIN_COLOR_VAR, DOMAIN_COLOR_BG_VAR, DOMAIN_COLOR_BORDER_VAR } from './types';

interface ConceptsTabProps {
  domains: DomainConcept[];
}

export default function ConceptsTab({ domains }: ConceptsTabProps) {
  const [open, setOpen] = useState<string | null>(domains[0]?.num ?? null);

  return (
    <div>
      <h1 className={styles.reviewH1}>Domain Concepts</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        Click any domain to expand. Covers context engineering, transport selection, model selection, the hooks event model, and HITL
        patterns. Some sections go beyond the published blueprint and are marked where they do.
      </p>
      <div className={styles.domainGrid}>
        {domains.map((d) => {
          const isOpen = open === d.num;
          return (
            <div key={d.num} className={styles.domainCard}>
              <button
                className={styles.domainHeader}
                onClick={() => setOpen(isOpen ? null : d.num)}
                aria-expanded={isOpen}
              >
                <span
                  className={styles.domainNum}
                  style={{
                    color: DOMAIN_COLOR_VAR[d.color] ?? 'var(--accent2)',
                    background: DOMAIN_COLOR_BG_VAR[d.color] ?? 'var(--accent-bg)',
                    border: `1px solid ${DOMAIN_COLOR_BORDER_VAR[d.color] ?? 'var(--accent-border)'}`,
                  }}
                >
                  {d.num}
                </span>
                <span className={styles.domainTitle}>{d.title}</span>
                <span className={styles.domainWeight}>{d.weight}</span>
                <span className={`${styles.domainArrow} ${isOpen ? styles.domainArrowOpen : ''}`}>&#9656;</span>
              </button>
              {isOpen && (
                <div className={styles.domainBody}>
                  <p className={styles.domainDesc}>{d.desc}</p>
                  <div className={styles.kvList}>
                    {d.keys.map((k) => (
                      <div key={k.term} className={styles.kvItem}>
                        <span className={styles.kvDot} />
                        {/* Developer-authored content from our own encrypted question bank, never user input. */}
                        <span className={styles.kvText}>
                          <strong>{k.term}</strong>{' '}
                          <span dangerouslySetInnerHTML={{ __html: k.detail }} />
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.memoryBox}>
                    <div className={styles.boxLabel}>Memory hook</div>
                    {d.memory}
                  </div>
                  <div className={styles.examTip}>
                    <div className={styles.boxLabel}>Exam trap</div>
                    {d.examTrap}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
