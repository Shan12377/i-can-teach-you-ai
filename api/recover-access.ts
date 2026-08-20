import Stripe from 'stripe';
import { CCA_F_PRICE_ID } from './_lib/exam-purchase.js';
import { notifyN8n } from './_lib/n8n.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SESSIONS_SCANNED = 200;
const GENERIC_RESPONSE = {
  message: "If that email has a completed CCA-F Exam Prep purchase, we've emailed your access link.",
};

export async function POST(req: Request): Promise<Response> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
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

  // Checkout Sessions can't be listed by email directly (and don't support
  // Stripe's Search API at all), so page through recent sessions and match
  // in memory. Bounded to keep this fast; fine for current purchase volume.
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

  // Deliberately identical response whether or not a match was found: the
  // token is never returned here at all, only ever emailed to the address
  // that actually made the purchase. This closes both the "knowing someone's
  // email grants their access" gap and the email-enumeration side channel.
  if (matchingSession) {
    await notifyN8n({
      submissionType: 'ictai_resend_access',
      email: normalizedEmail,
      accessUrl: `https://icanteachyouai.com/checkout/success?session_id=${matchingSession.id}`,
    });
  }

  return Response.json(GENERIC_RESPONSE);
}
