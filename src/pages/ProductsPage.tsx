import { Link } from 'react-router-dom';
import styles from './Products.module.css';
import s from '../styles/shared.module.css';

const products = [
  {
    badge: 'Available Now',
    badgeType: 'green',
    title: 'Claude Code Associate Foundations (CCA-F) Exam Prep',
    description:
      'The most thorough CCA-F exam prep available. 207 practice questions across all six domains, every answer linked to the official Anthropic documentation. Built by someone who uses Claude Code in production healthcare applications.',
    price: '$37',
    priceNote: 'One-time purchase',
    features: [
      '207 practice questions',
      'All six CCA-F domains covered',
      'Every answer sourced from official Anthropic docs',
      'Anti-patterns and common exam traps',
      'Quick-reference cheat sheet',
      'Domain-by-domain performance breakdown',
    ],
    cta: 'Get Exam Prep',
    ctaLink: '/exam-prep',
    ctaStyle: 'gold',
  },
  {
    badge: 'Coming Soon',
    badgeType: 'accent',
    title: 'HIPAA-Conscious AI Workflows for Healthcare Professionals',
    description:
      'The complete course on building AI automation systems that can survive a compliance review. Covers the two-layer architecture, n8n setup, Google Workspace clinical lane, FTC compliance, and the exact build patterns used in a live production platform.',
    price: 'Waitlist',
    priceNote: 'Early access pricing available',
    features: [
      'The two-layer PHI architecture explained',
      'n8n workflow setup from scratch',
      'Google Workspace BAA and clinical lane setup',
      'FTC compliance for supplement and health content',
      'Vibe coding with Claude Code for non-developers',
      'Live production examples from huntersholistichealth.com',
    ],
    cta: 'Join Waitlist',
    ctaLink: '/waitlist',
    ctaStyle: 'outline',
  },
];

export default function ProductsPage() {
  return (
    <div className={styles.page}>
      <div className={s.wrapWide}>
        <span className={s.kicker}>Products</span>
        <h1 className={styles.pageH1}>Tools and courses built for real work</h1>
        <p className={styles.pageSubtitle}>
          Not generic AI content. Built around the specific compliance requirements, tools, and workflows
          that matter in healthcare.
        </p>

        <div className={styles.productsGrid}>
          {products.map(product => (
            <div key={product.title} className={styles.productCard}>
              <div className={styles.productCardHeader}>
                <span className={`${s.pill} ${product.badgeType === 'green' ? s.pillGreen : s.pillAccent}`}>
                  {product.badge}
                </span>
                <span className={styles.productPrice}>
                  {product.price}
                  <span className={styles.productPriceNote}>{product.priceNote}</span>
                </span>
              </div>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productDesc}>{product.description}</p>
              <div className={styles.productFeatures}>
                {product.features.map(f => (
                  <div key={f} className={styles.productFeatureItem}>
                    <span className={styles.productFeatureCheck}>&#10003;</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                to={product.ctaLink}
                className={product.ctaStyle === 'gold' ? `${s.btnGold}` : `${s.btnOutline}`}
                style={{ display: 'inline-flex', marginTop: 'auto' }}
              >
                {product.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
