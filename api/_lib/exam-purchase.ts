import type Stripe from 'stripe';
import { issueAccessToken } from './access-token.js';

export const CCA_F_PRICE_ID = 'price_1U6Isi2dkBth0O3OfzXETNAL';
const MAX_TOKEN_ISSUANCES = 5;

export type IssueResult =
  | { ok: true; token: string }
  | { ok: false; status: number; error: string };

/**
 * Given an already-retrieved Checkout Session, confirms it paid for the CCA-F
 * product and issues a signed access token, capping re-issuance per purchase
 * via the underlying PaymentIntent's own metadata (no separate database).
 */
export async function issueTokenForSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  tokenSecret: string
): Promise<IssueResult> {
  if (session.payment_status !== 'paid') {
    return { ok: false, status: 402, error: 'Payment not completed' };
  }

  const lineItems = session.line_items?.data ?? [];
  const purchasedCorrectProduct = lineItems.some((item) => item.price?.id === CCA_F_PRICE_ID);
  if (!purchasedCorrectProduct) {
    return { ok: false, status: 403, error: 'Session does not match this product' };
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
  if (paymentIntentId) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const issuedCount = Number(paymentIntent.metadata.examTokenIssuances ?? '0');
    if (issuedCount >= MAX_TOKEN_ISSUANCES) {
      return { ok: false, status: 429, error: 'Access limit reached for this purchase' };
    }
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { examTokenIssuances: String(issuedCount + 1) },
    });
  }

  return { ok: true, token: issueAccessToken(session.id, tokenSecret) };
}
