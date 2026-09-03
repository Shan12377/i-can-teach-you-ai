import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import styles from './Workshops.module.css';
import s from '../styles/shared.module.css';
import { WORKSHOP_FAQ } from '../lib/faq';
import { useRevealRoot } from '../lib/motion';

const LAST_UPDATED = 'September 3, 2026';

const formats = [
  {
    name: 'Half day',
    length: '3 hours',
    best: 'A department, a cohort, a single program',
    covers: 'AI literacy, the PHI boundary, two hands-on tool sessions, policy template',
  },
  {
    name: 'Full day',
    length: '6 hours',
    best: 'A health system, a school, a multi-department team',
    covers: 'Everything in the half day, plus workflow mapping, automation build, and a live Q and A clinic',
  },
  {
    name: 'Custom series',
    length: 'Scoped per engagement',
    best: 'Rolling staff training or a semester course',
    covers: 'Sequenced sessions, specialty curriculum, follow-up office hours',
  },
];

const audiences = [
  ['Hospitals and health systems', 'Department heads, clinical educators, and administrative staff who need one shared rule for what AI may touch.'],
  ['Pharmacy programs', 'Faculty and students working through medication use, pharmacy law, and board prep with AI as a study and practice tool.'],
  ['Nursing schools', 'Educators building documentation, care planning, and simulation content without exposing patient data.'],
  ['Practices and clinics', 'Small teams that want intake, scheduling, and follow-up automated on the administrative side of the line.'],
];

const outcomes = [
  'The Two-Layer Architecture: a rule your staff can apply on the spot to separate administrative AI from clinical data',
  'Prompt patterns mapped to clinical reasoning frameworks your team already uses, including SBAR',
  'Hands-on practice with ChatGPT, Claude, Claude Code, NotebookLM, Perplexity, and Gemini for Workspace',
  'PHI boundary training for consumer-tier AI tools, including which vendors will sign a BAA and which will not',
  'A take-home AI policy template your organization can edit and adopt',
  'A written follow-up summary for every attendee',
];

const agenda = [
  ['Where AI already fits', 'Map the workflows your staff repeats every week and separate the ones AI can safely touch from the ones it cannot.'],
  ['Draw the boundary', 'The Two-Layer Architecture, applied to your actual systems. What counts as PHI, what a BAA changes, where consumer tools stop.'],
  ['Hands on the tools', 'Attendees work in the tools, not slides. Prompting, document analysis, study material generation, and output inspection.'],
  ['Build one real thing', 'A working automation or study workflow, built live, that the team can keep using after the session ends.'],
  ['Policy and next steps', 'Walk out with the policy template filled in far enough to circulate, plus the questions to ask any AI vendor.'],
];

export default function WorkshopsPage() {
  const root = useRevealRoot<HTMLDivElement>();

  return (
    <main className={styles.page} ref={root}>
      <section className={styles.hero}>
        <div className={s.wrap}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span>
            <Link to="/services">Services</Link><span aria-hidden="true">/</span>
            <span>Healthcare AI Workshops</span>
          </nav>
          <span className={s.kickerGold}>For hospitals, schools, and healthcare teams</span>
          <h1 className={styles.h1}>Healthcare AI workshops, taught by a PharmD who ships.</h1>

          <p className={styles.answer}>
            A healthcare AI workshop is a half-day or full-day hands-on training that teaches clinical and
            administrative staff to use AI tools safely, without exposing protected health information.
            Dr. Shallanda Hunter, PharmD, teaches the boundary, the tools, and one working automation your
            team keeps after the session.
          </p>

          <div className={styles.heroActions}>
            <a href="mailto:hello@icanteachyouai.com?subject=Healthcare%20AI%20workshop%20inquiry" className={`${s.btnGold} ${s.btnLg}`}>
              Request a workshop quote <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link to="/services" className={`${s.btnOutline} ${s.btnLg}`}>See all services</Link>
          </div>
          <p className={styles.updated}>Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>Who these AI workshops are for</h2>
          <p className={styles.lead} data-reveal>
            Every session is built for people with no coding background. Attendees leave able to direct AI
            tools and to say, out loud and correctly, which of their workflows an AI tool may touch.
          </p>
          <div className={styles.audienceGrid}>
            {audiences.map(([name, detail], i) => (
              <article key={name} className={styles.audienceCard} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>What attendees walk away with</h2>
          <ul className={styles.outcomes}>
            {outcomes.map((item, i) => (
              <li key={item} data-reveal style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
                <Check size={17} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>How long is a healthcare AI workshop?</h2>
          <p className={styles.lead} data-reveal>
            Three formats. Half day runs 3 hours, full day runs 6 hours, and a custom series is scoped per
            engagement. All three are available virtually or in person.
          </p>
          <div className={styles.tableWrap} data-reveal>
            <table className={styles.table}>
              <caption className={styles.srOnly}>Workshop formats, length, best fit, and what each covers</caption>
              <thead>
                <tr><th scope="col">Format</th><th scope="col">Length</th><th scope="col">Best for</th><th scope="col">What it covers</th></tr>
              </thead>
              <tbody>
                {formats.map(f => (
                  <tr key={f.name}>
                    <th scope="row">{f.name}</th>
                    <td>{f.length}</td>
                    <td>{f.best}</td>
                    <td>{f.covers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>What happens during the workshop</h2>
          <ol className={styles.agenda}>
            {agenda.map(([title, detail], i) => (
              <li key={title} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <span className={styles.agendaNum}>{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>Why a pharmacist teaches this instead of an engineer</h2>
          <p className={styles.lead} data-reveal>
            Dr. Shallanda Hunter is a licensed pharmacist who holds a PharmD, an MBA, and a CFNMP
            certification, and who builds and maintains live healthcare software using the same AI tools she
            teaches. Hunter&apos;s Holistic Health, Pharmacy Decoder, DeIDGuard, and a Claude Code
            certification prep product are all running in production. The compliance judgment in these
            workshops comes from clinical training, and the build judgment comes from shipping.
          </p>
          <p className={styles.lead} data-reveal>
            <Link to="/about" className={styles.inlineLink}>Read Dr. Hunter&apos;s full background</Link>, or
            open the <Link to="/" className={styles.inlineLink}>proof of work on the homepage</Link> and
            inspect the products directly.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} id="faq">
        <div className={s.wrap}>
          <h2 className={styles.h2} data-reveal>Healthcare AI workshop questions</h2>
          <div className={styles.faq}>
            {WORKSHOP_FAQ.map((item, i) => (
              <details key={item.q} className={styles.faqItem} data-reveal style={{ ['--reveal-delay' as string]: `${i * 50}ms` }}>
                <summary><h3>{item.q}</h3></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={s.wrap}>
          <h2 className={styles.ctaTitle}>Book a workshop for your team</h2>
          <p className={styles.ctaSub}>
            Send your organization, audience size, and preferred dates. You get a written quote within two
            business days.
          </p>
          <a href="mailto:hello@icanteachyouai.com?subject=Healthcare%20AI%20workshop%20inquiry" className={`${s.btnGold} ${s.btnLg}`}>
            hello@icanteachyouai.com
          </a>
        </div>
      </section>
    </main>
  );
}
