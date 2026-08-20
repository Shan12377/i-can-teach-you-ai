import Stripe from 'stripe';
import { CCA_F_PRICE_ID, issueTokenForSession } from './_lib/exam-purchase.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SESSIONS_SCANNED = 500;

export async function POST(req: Request): Promise<Response> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const tokenSecret = process.env.EXAM_TOKEN_SECRET;
  if (!stripeSecretKey || !tokenSecret) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  let email: unknown;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Enter a valid email address' }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  const stripe = new Stripe(stripeSecretKey);

  // Checkout Sessions can't be listed by email directly, so page through recent
  // sessions and match in memory. Bounded to keep this fast; fine for current
  // purchase volume, would need real pagination/indexing at higher scale.
  let matchingSession: Stripe.Checkout.Session | undefined;
  let startingAfter: string | undefined;
  let scanned = 0;

  while (!matchingSession && scanned < MAX_SESSIONS_SCANNED) {
    const page = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after: startingAfter,
      expand: ['data.line_items'],
    });

    matchingSession = page.data.find(
      (s) =>
        s.payment_status === 'paid' &&
        s.customer_details?.email?.toLowerCase() === normalizedEmail &&
        s.line_items?.data.some((item) => item.price?.id === CCA_F_PRICE_ID)
    );

    scanned += page.data.length;
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  if (!matchingSession) {
    return Response.json(
      { error: 'No completed CCA-F Exam Prep purchase found for that email' },
      { status: 404 }
    );
  }

  const result = await issueTokenForSession(stripe, matchingSession, tokenSecret);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ token: result.token, sessionId: matchingSession.id });
}
