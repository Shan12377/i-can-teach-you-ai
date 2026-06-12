import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import s from '../styles/shared.module.css';
import { BLOG_POSTS } from './blog/blogData';

const features = [
  {
    kicker: 'HIPAA-Conscious Workflows',
    title: 'Build AI systems that survive a compliance review',
    body: 'Most AI workflow tutorials skip the part where your setup violates federal law. Every workflow covered here is built with the two-layer architecture that keeps PHI out of the wrong places.',
    tag: 'Healthcare Professionals',
  },
  {
    kicker: 'Vibe Coding',
    title: 'Ship real apps without a traditional development background',
    body: 'Claude Code, Cursor, and the right CLAUDE.md file can take you from idea to deployed app faster than hiring a developer. The catch is knowing what to tell it and what rules to set.',
    tag: 'Builders',
  },
  {
    kicker: 'Claude Code Certification',
    title: 'Pass the CCA-F exam on your first attempt',
    body: '207 practice questions, every answer linked to the official Anthropic doc it came from. No guessing what is accurate. Built by someone who has used Claude Code in production.',
    tag: 'Exam Prep',
  },
  {
    kicker: 'AI in Your Practice',
    title: 'Automate the admin without touching patient data',
    body: 'Intake routing, appointment follow-ups, supplement protocol builders, and pre-session briefs. All of it running through n8n without a single piece of PHI leaving the covered lane.',
    tag: 'Automation',
  },
];

const stats = [
  { n: '207', label: 'Practice Questions' },
  { n: '13+', label: 'Blog Posts' },
  { n: 'PharmD', label: 'Credential' },
  { n: '0', label: 'PHI Violations' },
];

export default function LandingPage() {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={s.wrapWide}>
          <div className={styles.heroBadge}>
            <span className={s.pulseDot} />
            <span>Early access waitlist now open</span>
          </div>
          <h1 className={styles.heroH1}>
            AI education built for{' '}
            <span className={styles.heroAccent}>healthcare professionals</span>{' '}
            who want to build.
          </h1>
          <p className={styles.heroSub}>
            HIPAA-conscious workflows. Claude Code certification prep. Vibe coding for non-developers.
            Taught by a PharmD who built a functional medicine platform with AI and zero traditional development.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/waitlist" className={`${s.btnGold} ${s.btnLg}`}>
              Join the Waitlist
            </Link>
            <Link to="/blog" className={`${s.btnOutline} ${s.btnLg}`}>
              Read the Blog
            </Link>
          </div>
          <div className={styles.heroStats}>
            {stats.map(stat => (
              <div key={stat.label} className={styles.heroStat}>
                <span className={styles.heroStatN}>{stat.n}</span>
                <span className={styles.heroStatL}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className={styles.proofBar}>
        <div className={s.wrapWide}>
          <p className={styles.proofText}>
            Built by{' '}
            <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer" className={styles.proofLink}>
              Dr. Shallanda Hunter, PharmD
            </a>
            {' '}&middot; Functional Medicine Educator &middot; AI Implementation Guide &middot; Product Builder
          </p>
        </div>
      </div>

      {/* Features */}
      <section className={styles.features}>
        <div className={s.wrapWide}>
          <span className={s.kicker}>What You Will Learn</span>
          <h2 className={styles.sectionH}>
            The AI curriculum that actually applies to your work
          </h2>
          <p className={styles.sectionP}>
            Not generic AI tutorials. Not another ChatGPT prompt list. This is built around the real workflows,
            compliance requirements, and tools that matter in healthcare.
          </p>
          <div className={styles.featuresGrid}>
            {features.map(f => (
              <div key={f.kicker} className={styles.featureCard}>
                <span className={s.pillAccent + ' ' + s.pill}>{f.kicker}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
                <span className={styles.featureTag}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of work */}
      <section className={styles.proof}>
        <div className={s.wrapWide}>
          <div className={styles.proofGrid}>
            <div className={styles.proofContent}>
              <span className={s.kickerGold}>Proof of Work</span>
              <h2 className={styles.sectionH}>
                Built a full HIPAA-conscious health platform. With AI. Without a developer.
              </h2>
              <p className={styles.sectionP}>
                Hunters Holistic Health is a live, deployed functional medicine education platform built entirely
                using Claude Code and vibe coding techniques. It includes a blood pressure tracker, AI meal analysis,
                daily logging, and a secure educator dashboard.
              </p>
              <p className={styles.sectionP}>
                The same n8n automation workflows covered in this curriculum are running in production right now.
                The architecture, the compliance decisions, and the build process are all documented and teachable.
              </p>
              <a
                href="https://www.huntersholistichealth.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btnOutline}`}
              >
                See the live platform
              </a>
            </div>
            <div className={styles.proofCard}>
              <div className={styles.proofCardHeader}>
                <span className={s.pill + ' ' + s.pillGreen}>Live in Production</span>
                <span className={styles.proofCardDomain}>huntersholistichealth.com</span>
              </div>
              <div className={styles.proofCardItems}>
                {[
                  'PWA built with Vite + React + TypeScript',
                  'Supabase for non-PHI data storage',
                  'n8n automation for intake routing',
                  'Google Workspace clinical lane for PHI',
                  'AI Meal Guard via OpenAI proxy',
                  'Blood pressure trend tracker with Chart.js',
                  'Educator dashboard with client roster',
                  'Full Terms of Service and Privacy Policy',
                ].map(item => (
                  <div key={item} className={styles.proofCardItem}>
                    <span className={styles.proofCardCheck}>&#10003;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured blog posts */}
      <section className={styles.blogPreview}>
        <div className={s.wrapWide}>
          <div className={styles.blogPreviewHeader}>
            <div>
              <span className={s.kicker}>From the Blog</span>
              <h2 className={styles.sectionH}>Latest writing</h2>
            </div>
            <Link to="/blog" className={s.btnGhost}>
              View all posts &rarr;
            </Link>
          </div>
          <div className={styles.blogGrid}>
            {featuredPosts.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.blogCard}>
                <div className={styles.blogCardMeta}>
                  <span className={`${s.pill} ${s.pillAccent}`}>{post.category}</span>
                  <span className={styles.blogCardDate}>{post.date}</span>
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                <span className={styles.blogCardReadMore}>Read post &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className={styles.waitlistCta}>
        <div className={s.wrap}>
          <span className={s.kickerGold}>Early Access</span>
          <h2 className={styles.ctaH}>
            Be first when the program launches.
          </h2>
          <p className={styles.ctaP}>
            Join the waitlist for early access, launch pricing, and invitations to live sessions.
            No spam. No pressure. Fully in your control.
          </p>
          <Link to="/waitlist" className={`${s.btnGold} ${s.btnLg}`}>
            Save My Spot
          </Link>
          <p className={styles.ctaSub}>
            Already using AI in your practice?{' '}
            <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer">
              See the full work at drshallandahunter.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
