import { subscribeToSendFox } from './_lib/sendfox.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGINS = ['https://icanteachyouai.com', 'https://www.icanteachyouai.com'];

export async function POST(req: Request): Promise<Response> {
  // This endpoint triggers an outbound SendFox confirmation email to
  // whatever address is posted, so an open, unauthenticated version of it
  // is an email-bombing vector against third parties, not just list spam.
  // Restrict it to requests actually coming from our own site.
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  if (!ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
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

  const ok = await subscribeToSendFox(email.trim().toLowerCase());
  return Response.json({ ok });
}
