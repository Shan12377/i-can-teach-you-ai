import { subscribeToSendFox } from './_lib/sendfox.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request): Promise<Response> {
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
