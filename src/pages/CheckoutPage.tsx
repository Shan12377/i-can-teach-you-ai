import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Checkout.module.css';

const PRODUCTS: Record<string, { name: string; price: string; description: string; features: string[] }> = {
  'cca-f-exam-prep': {
    name: 'CCA-F Exam Prep',
    price: '$37',
    description: '207 practice questions for the Claude Code Associate Foundations exam. All six domains covered with full explanations and documentation citations.',
    features: [
      '207 practice questions across all 6 domains',
      'Full explanations for every answer',
      'Documentation citations for each question',
      'Domain-by-domain performance tracking',
      'Anti-patterns and cheat sheet included',
      'Lifetime access, no subscription',
    ],
  },
  'hhh-monthly': {
    name: 'HHH Monthly Access',
    price: '$19.99/mo',
    description: 'Monthly access to the Hunters Holistic Health education platform.',
    features: [
      'Daily log and progress tracking',
      'Blood pressure trend charts',
      'AI Meal Guard (10 analyses/day)',
      'ROOTS Protocol curriculum',
      'Supplement log and tracker',
      'Weekly grade report card',
    ],
  },
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product') || 'cca-f-exam-prep';
  const product = PRODUCTS[productId] || PRODUCTS['cca-f-exam-prep'];
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // TODO: Replace with actual Stripe Checkout session creation
    // 1. POST to /api/create-checkout-session with { productId }
    // 2. Redirect to session.url
    // Example:
    // const res = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId }),
    // });
    // const { url } = await res.json();
    // window.location.href = url;
    alert('Stripe integration coming soon. See CLAUDE.md for connection instructions.');
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
          {/* Order Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <span className={styles.summaryKicker}>Order Summary</span>
              <h2 className={styles.summaryTitle}>{product.name}</h2>
              <p className={styles.summaryDesc}>{product.description}</p>
            </div>

            <div className={styles.summaryFeatures}>
              {product.features.map((f, i) => (
                <div key={i} className={styles.summaryFeature}>
                  <span className={styles.checkmark}>&#10003;</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.summaryPrice}>{product.price}</span>
            </div>

            <div className={styles.summaryDisclaimer}>
              Educational content only. Not affiliated with Anthropic. Results depend on individual study effort. See our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </div>
          </div>

          {/* Checkout Form */}
          <div className={styles.checkout}>
            <div className={styles.checkoutHeader}>
              <span className={styles.checkoutKicker}>Secure Checkout</span>
              <div className={styles.securityBadges}>
                <span className={styles.badge}>256-bit SSL</span>
                <span className={styles.badge}>Stripe Payments</span>
                <span className={styles.badge}>7-day Refund</span>
              </div>
            </div>

            <div className={styles.stripeNotice}>
              <div className={styles.stripeIcon}>&#9679;</div>
              <div>
                <div className={styles.stripeTitle}>Powered by Stripe</div>
                <div className={styles.stripeSubtitle}>Your payment information is processed securely by Stripe. We never store your card details.</div>
              </div>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Redirecting to Stripe...' : `Pay ${product.price} Securely`}
            </button>

            <div className={styles.checkoutFooter}>
              <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
              <span>|</span>
              <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <span>|</span>
              <a href="mailto:hello@icanteachyouai.com" className={styles.legalLink}>Support</a>
            </div>
          </div>
        </div>
    </div>
  );
}
