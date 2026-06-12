import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './SiteLayout.module.css';

export default function SiteLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/blog', label: 'Blog' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo} onClick={closeMobile}>
            I Can Teach You <span className={styles.logoAi}>AI</span>
          </Link>
          <div className={styles.navLinks}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.navLink} ${location.pathname.startsWith(link.to) ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className={styles.navRight}>
            <Link to="/waitlist" className={styles.navCta}>
              Join Waitlist
            </Link>
          </div>
          <button
            className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuBtnOpen : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.mobileNavLink} ${location.pathname.startsWith(link.to) ? styles.mobileNavLinkActive : ''}`}
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/waitlist" className={styles.mobileNavCta} onClick={closeMobile}>
            Join Waitlist
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                I Can Teach You <span className={styles.logoAi}>AI</span>
              </div>
              <p className={styles.footerTagline}>
                AI education for healthcare professionals. Built by a PharmD who builds.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <p className={styles.footerColTitle}>Learn</p>
                <Link to="/blog" className={styles.footerLink}>Blog</Link>
                <Link to="/exam-prep" className={styles.footerLink}>Claude Code Exam Prep</Link>
                <Link to="/products" className={styles.footerLink}>All Products</Link>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerColTitle}>Connect</p>
                <Link to="/waitlist" className={styles.footerLink}>Join Waitlist</Link>
                <Link to="/services" className={styles.footerLink}>Services</Link>
                <Link to="/about" className={styles.footerLink}>About Dr. Hunter</Link>
                <a href="mailto:hello@icanteachyouai.com" className={styles.footerLink}>
                  hello@icanteachyouai.com
                </a>
                <a href="https://www.drshallandahunter.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  drshallandahunter.com
                </a>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerColTitle}>Legal</p>
                <Link to="/terms" className={styles.footerLink}>Terms of Service</Link>
                <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              &copy; {new Date().getFullYear()} I Can Teach You AI &middot; Dr. Shallanda Hunter, PharmD
            </p>
            <p className={styles.footerDisclaimer}>
              Educational content only. Not medical advice. See{' '}
              <Link to="/terms" className={styles.footerDisclaimerLink}>Terms</Link> for full details.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
