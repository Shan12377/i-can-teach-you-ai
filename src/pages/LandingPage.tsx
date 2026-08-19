import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import s from '../styles/shared.module.css';
import { BLOG_POSTS } from './blog/blogData';

const stack = [
  {
    tool: 'Claude Code',
    role: 'Primary build tool',
    detail: 'Built two full production apps without a dev team. CLAUDE.md is the secret weapon.',
    color: 'var(--accent)',
  },
  {
    tool: 'n8n (AWS)',
    role: 'HIPAA-lane automation',
    detail: 'Self-hosted on AWS with a signed BAA. Runs intake routing, email alerts, and webhook flows for HHH.',
    color: 'var(--teal)',
  },
  {
    tool: 'n8n (Oracle Cloud)',
    role: 'Client and teaching automation',
    detail: '12 months free on Oracle Cloud free tier. Used for non-clinical builds and teaching demos.',
    color: 'var(--amber)',
  },
  {
    tool: 'Google Apps Script',
    role: 'Pharmacy Decoder backend',
    detail: 'Powers OTP verification, student activation logging, and Google Sheets integration for the exam prep app.',
    color: 'var(--green)',
  },
  {
    tool: 'Make',
    role: 'Personal automations',
    detail: 'Telegram bots, Notion integrations, morning briefings, and cycle-aware health tracking.',
    color: 'var(--gold)',
  },
];

const builds = [
  {
    name: 'Hunter\'s Holistic Health',
    url: 'https://www.huntersholistichealth.com',
    desc: 'Functional medicine education platform with BP tracker, AI Meal Guard, daily logging, educator dashboard, and Stripe billing.',
    stack: 'React, Supabase, n8n, Vercel, Chart.js',
    status: 'Live',
  },
  {
    name: 'Pharmacy Decoder',
    url: 'https://pharmacydecoder.com',
    desc: '340 UMPJE practice questions across all 4 NABP domains. School access system with OTP verification.',
    stack: 'Vanilla JS, Google Apps Script, Airtable, Vercel',
    status: 'Live',
  },
  {
    name: 'DeIDGuard',
    url: null,
    desc: 'Chrome extension for HIPAA de-identification. Detects and masks PHI in browser-based workflows.',
    stack: 'Chrome Extension API, JavaScript',
    status: 'Built',
  },
  {
    name: 'CCA-F Exam Prep',
    url: '/exam-prep',
    desc: '207 practice questions for the Claude Code Associate Foundations certification. Every answer sourced from official Anthropic docs.',
    stack: 'React, TypeScript',
    status: 'Live',
  },
];

const features = [
  {
    kicker: 'HIPAA-Conscious Workflows',
    title: 'Build AI systems that survive a compliance review',
    body: 'Most AI workflow tutorials skip the compliance layer. Every workflow here uses the two-layer architecture that keeps PHI out of the wrong places.',
    tag: 'Healthcare Professionals',
  },
  {
    kicker: 'Vibe Coding',
    title: 'Ship real apps without a traditional dev background',
    body: 'Claude Code and a solid CLAUDE.md file can take you from idea to deployed app faster than hiring a developer. The catch is knowing what to tell it.',
    tag: 'Builders',
  },
  {
    kicker: 'Claude Code Certification',
    title: 'Pass the CCA-F exam on your first attempt',
    body: '207 practice questions, every answer linked to the official Anthropic doc it came from. Built by someone who uses Claude Code in production.',
    tag: 'Exam Prep',
  },
  {
    kicker: 'AI in Your Practice',
    title: 'Automate the admin without touching patient data',
    body: 'Intake routing, appointment follow-ups, supplement protocol builders. All running through n8n without a single piece of PHI leaving the covered lane.',
    tag: 'Automation',
  },
];

export default function LandingPage() {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={s.wrapWide}>
          <div className={styles.heroIntro}>
            <span className={styles.heroCred}>Dr. Shallanda Hunter, PharmD</span>
            <span className={styles.heroDot}>&middot;</span>
            <span className={styles.heroRole}>Functional Medicine Educator</span>
            <span className={styles.heroDot}>&middot;</span>
            <span className={styles.heroRole}>Builder</span>
          </div>
          <h1 className={styles.heroH1}>
            I build healthcare apps with AI.<br />
            <span className={styles.heroAccent}>I can teach you how.</span>
          </h1>
          <p className={styles.heroSub}>
            Not generic AI tutorials. I built two production platforms, a Chrome extension,
            and an exam prep product using Claude Code, n8n, and vibe coding.
            No dev team. No CS degree. PharmD who builds.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/waitlist" className={`${s.btnGold} ${s.btnLg}`}>
              Join the Waitlist
            </Link>
            <Link to="/blog" className={`${s.btnOutline} ${s.btnLg}`}>
              Read the Blog
            </Link>
            <Link to="/exam-prep" className={`${s.btnOutline} ${s.btnLg}`}>
              CCA-F Exam Prep
            </Link>
          </div>
        </div>
      </section>

      {/* What I've Built */}
      <section className={styles.builds}>
        <div className={s.wrapWide}>
          <span className={s.kickerGold}>Proof of Work</span>
          <h2 className={styles.sectionH}>
            These are live. Not concepts. Not mockups.
          </h2>
          <div className={styles.buildsGrid}>
            {builds.map(b => (
              <div key={b.name} className={styles.buildCard}>
                <div className={styles.buildCardTop}>
                  <h3 className={styles.buildName}>{b.name}</h3>
                  <span className={`${styles.buildStatus} ${b.status === 'Live' ? styles.buildStatusLive : ''}`}>
                    {b.status === 'Live' && <span className={styles.buildDot} />}
                    {b.status}
                  </span>
                </div>
                <p className={styles.buildDesc}>{b.desc}</p>
                <span className={styles.buildStack}>{b.stack}</span>
                {b.url && (
                  b.url.startsWith('/') ? (
                    <Link to={b.url} className={styles.buildLink}>View &rarr;</Link>
                  ) : (
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className={styles.buildLink}>
                      Visit &rarr;
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Stack */}
      <section className={styles.stackSection}>
        <div className={s.wrapWide}>
          <span className={s.kicker}>My Stack</span>
          <h2 className={styles.sectionH}>
            The tools behind every build
          </h2>
          <p className={styles.sectionP}>
            Five tools. Two production apps. Zero traditional development experience required.
            Each one chosen for a specific reason, and each one teachable.
          </p>
          <div className={styles.stackList}>
            {stack.map((t, i) => (
              <div key={t.tool} className={styles.stackRow}>
                <span className={styles.stackIndex}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.stackToolCol}>
                  <span className={styles.stackIndicator} style={{ background: t.color }} />
                  <span className={styles.stackTool}>{t.tool}</span>
                  <span className={styles.stackRole}>{t.role}</span>
                </div>
                <p className={styles.stackDetail}>{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className={styles.features}>
        <div className={s.wrapWide}>
          <span className={s.kicker}>What You Will Learn</span>
          <h2 className={styles.sectionH}>
            The AI curriculum that actually applies to your work
          </h2>
          <div className={styles.featuresGrid}>
            {features.map((f, idx) => (
              <div key={f.kicker} className={styles.featureCard}>
                <span className={(idx === 0 ? s.pillGold : s.pillAccent) + ' ' + s.pill}>{f.kicker}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
                <span className={styles.featureTag}>{f.tag}</span>
              </div>
            ))}
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
            No spam. No pressure.
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
