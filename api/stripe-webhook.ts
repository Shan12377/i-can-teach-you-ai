import Stripe from 'stripe';
import { CCA_F_PRICE_ID } from './_lib/exam-purchase.js';
import { notifyN8n } from './_lib/n8n.js';

export async function POST(req: Request): Promise<Response> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  const rawBody = await req.text();
  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return Response.json({ received: true });
  }

  const sessionSummary = event.data.object as Stripe.Checkout.Session;
  if (sessionSummary.payment_status !== 'paid') {
    return Response.json({ received: true });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionSummary.id, {
    expand: ['line_items'],
  });

  const lineItem = session.line_items?.data[0];
  const isExamPrep = lineItem?.price?.id === CCA_F_PRICE_ID;

  await notifyN8n({
    submissionType: 'ictai_purchase',
    email: session.customer_details?.email ?? 'unknown',
    productName: lineItem?.description ?? 'Unknown product',
    amount: ((session.amount_total ?? 0) / 100).toFixed(2),
    sessionId: session.id,
    accessUrl: isExamPrep
      ? `https://icanteachyouai.com/checkout/success?session_id=${session.id}`
      : '',
  });

  return Response.json({ received: true });
}
