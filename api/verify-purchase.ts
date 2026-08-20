import Stripe from 'stripe';
import { issueAccessToken } from './_lib/access-token.js';

const CCA_F_PRICE_ID = 'price_1U6Isi2dkBth0O3OfzXETNAL';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

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

  const token = issueAccessToken(sessionId, tokenSecret);
  return Response.json({ token });
}
