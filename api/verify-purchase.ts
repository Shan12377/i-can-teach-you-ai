import Stripe from 'stripe';
import { issueTokenForSession } from './_lib/exam-purchase.js';

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

  const result = await issueTokenForSession(stripe, session, tokenSecret);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ token: result.token });
}
