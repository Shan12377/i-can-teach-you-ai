import { Link } from 'react-router-dom';
import styles from './Services.module.css';

const services = [
  {
    id: 'workshops',
    icon: '🎓',
    kicker: 'For Organizations',
    title: 'AI Workshops',
    subtitle: 'For Schools, Hospitals, and Healthcare Teams',
    description:
      'A half-day or full-day workshop designed specifically for healthcare organizations, nursing schools, pharmacy programs, and hospital systems. Staff leave with a practical, compliant framework for integrating AI into their daily workflows, not just a slide deck about the future.',
    audience: 'Administrators, clinical educators, hospital department heads, academic program directors',
    outcomes: [
      'The Two-Layer Architecture: separating administrative AI from clinical data',
      'Prompt engineering mapped to clinical reasoning frameworks (SBAR)',
      'Hands-on sessions with NotebookLM, Perplexity, and Gemini Workspace',
      'HIPAA and PHI boundary training for consumer-tier AI tools',
      'A take-home AI policy template for your organization',
    ],
    format: 'In-person or virtual. Half-day (3 hours) or full-day (6 hours). Custom curriculum available.',
    cta: 'Book a Workshop',
  },
  {
    id: 'sessions',
    icon: '1:1',
    kicker: 'For Individuals',
    title: '1-on-1 AI Integration Sessions',
    subtitle: 'For Healthcare Professionals and Practice Owners',
    description:
      'A focused 60-minute private session for solo practitioners, health educators, and small practice owners who want to integrate specific AI tools into their workflow. Sessions are practical, not theoretical. You bring a real problem; we build a real solution.',
    audience: 'Pharmacists, functional medicine practitioners, health educators, solo practice owners, entrepreneurs',
    outcomes: [
      'Identify the highest-ROI AI tool for your specific workflow bottleneck',
      'Set up and configure your personal AI stack (Perplexity, Gemini, Claude, n8n)',
      'Build a compliant intake or automation workflow live during the session',
      'Learn the CLAUDE.md framework for vibe coding your own tools',
      'Leave with a written action plan and resource list',
    ],
    format: 'Virtual via Doxy.me. 60 minutes. Follow-up email summary included.',
    cta: 'Book a Session',
  },
  {
    id: 'builds',
    icon: '⚙',
    kicker: 'For Businesses',
    title: 'Custom AI Workflow Build',
    subtitle: 'For Practices and Small Businesses',
    description:
      'A project-based engagement for practices and small businesses that want a custom AI-powered intake system, client portal, or automation workflow built for them. You describe the problem; the system gets built, tested, and handed over with documentation.',
    audience: 'Health practices, wellness businesses, small healthcare organizations, and any business needing a custom n8n or app build',
    outcomes: [
      'Custom n8n intake router (waitlist, support, clinical inquiry, feature requests)',
      'Google Sheets integration with automatic routing and email alerts',
      'Optional: React-based client portal with progress dashboards',
      'Full documentation and CLAUDE.md file for future Claude Code maintenance',
      'Handoff call with walkthrough of every component',
    ],
    format: 'Project-based. Scoped per engagement. Quoted after a 30-minute discovery call.',
    cta: 'Start a Project',
  },
];

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Services</span>
        <h1 className={styles.heroTitle}>
          AI Education and Integration,{' '}
          <span className={styles.accent}>Built for Healthcare</span>
        </h1>
        <p className={styles.heroSub}>
          Whether you need a workshop for your organization, a private session to build your own AI stack, or a custom workflow built for your practice, every engagement is grounded in clinical expertise and compliance-first thinking.
        </p>
        <p className={styles.disclaimer}>
          All sessions and workshops are educational in nature. No clinical advice is provided.
        </p>
      </section>

      <section className={styles.servicesGrid}>
        {services.map((service) => (
          <article key={service.id} className={styles.serviceCard}>
            <div className={styles.cardHeader}>
              <span className={styles.serviceIcon}>{service.icon}</span>
              <span className={styles.cardKicker}>{service.kicker}</span>
            </div>
            <h2 className={styles.serviceTitle}>{service.title}</h2>
            <p className={styles.serviceSubtitle}>{service.subtitle}</p>
            <p className={styles.serviceDesc}>{service.description}</p>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Who This Is For</h3>
              <p className={styles.sectionText}>{service.audience}</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>What You Walk Away With</h3>
              <ul className={styles.outcomeList}>
                {service.outcomes.map((outcome, i) => (
                  <li key={i} className={styles.outcomeItem}>
                    <span className={styles.dot} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Format</h3>
              <p className={styles.sectionText}>{service.format}</p>
            </div>

            <a
              href="mailto:hello@icanteachyouai.com"
              className={styles.ctaButton}
            >
              {service.cta}
            </a>
          </article>
        ))}
      </section>

      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>Common Questions</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Do I need technical experience?</h3>
            <p className={styles.faqA}>
              No. All workshops and sessions are designed for non-technical professionals. The goal is to teach you how to direct AI tools, not how to code them.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Are sessions HIPAA compliant?</h3>
            <p className={styles.faqA}>
              All 1-on-1 sessions are conducted via Doxy.me, a free HIPAA-compliant video platform. No PHI is collected or stored during sessions.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Can you customize a workshop for my specialty?</h3>
            <p className={styles.faqA}>
              Yes. Workshops can be tailored for pharmacy, nursing, functional medicine, or general healthcare administration. Contact us to discuss your specific needs.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>How long does a custom build take?</h3>
            <p className={styles.faqA}>
              Most custom workflow builds are completed within 1 to 2 weeks after the discovery call and scope agreement. Larger app builds are quoted per project.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Not sure which service fits?</h2>
        <p className={styles.ctaSub}>
          Send a message and describe what you are trying to accomplish. We will point you in the right direction.
        </p>
        <a href="mailto:hello@icanteachyouai.com" className={styles.ctaButtonLarge}>
          hello@icanteachyouai.com
        </a>
        <p className={styles.ctaOr}>or</p>
        <Link to="/waitlist" className={styles.ctaSecondary}>
          Join the Waitlist
        </Link>
      </section>
    </main>
  );
}
