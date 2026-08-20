import Stripe from 'stripe';
import { issueAccessToken } from './_lib/access-token.js';

const CCA_F_PRICE_ID = 'price_1U6Isi2dkBth0O3OfzXETNAL';
const MAX_TOKEN_ISSUANCES = 5;

export async function POST(req: Request): Promise<Response> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const tokenSecret = process.env.EXAM_TOKEN_SECRET;
  if (!stripeSecretKey || !tokenSecret) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  let sessionId: unknown;
  try {
    const body = await req.json();
    sessionId = body?.sessionId;
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return Response.json({ error: 'Invalid session ID' }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecretKey);

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
  } catch {
    return Response.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.payment_status !== 'paid') {
    return Response.json({ error: 'Payment not completed' }, { status: 402 });
  }

  const purchasedCorrectProduct = session.line_items?.data.some(
    (item) => item.price?.id === CCA_F_PRICE_ID
  );
  if (!purchasedCorrectProduct) {
    return Response.json({ error: 'Session does not match this product' }, { status: 403 });
  }

  // Cap token re-issuance per purchase using the PaymentIntent's own metadata as a
  // lightweight counter. Bounds how many devices a single leaked session_id/URL can
  // unlock without needing a separate database.
  const paymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
  if (paymentIntentId) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const issuedCount = Number(paymentIntent.metadata.examTokenIssuances ?? '0');
    if (issuedCount >= MAX_TOKEN_ISSUANCES) {
      return Response.json({ error: 'Access limit reached for this purchase' }, { status: 429 });
    }
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { examTokenIssuances: String(issuedCount + 1) },
    });
  }

  const token = issueAccessToken(sessionId, tokenSecret);
  return Response.json({ token });
}
