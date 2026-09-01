import { subscribeToSendFox } from './_lib/sendfox.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGINS = new Set(['https://icanteachyouai.com', 'https://www.icanteachyouai.com']);

// Extracts just the scheme+host+port from a header value for an exact
// allowlist comparison. Never do this with string prefix matching
// (origin.startsWith(allowed)) — "https://icanteachyouai.com.evil.com"
// also starts with an allowed origin string, so a prefix check is
// bypassable by anyone who controls a suffixed hostname.
function originFromHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export async function POST(req: Request): Promise<Response> {
  // This endpoint triggers an outbound SendFox confirmation email to
  // whatever address is posted, so an open, unauthenticated version of it
  // is an email-bombing vector against third parties, not just list spam.
  // Restrict it to requests actually coming from our own site. Origin and
  // Referer are ordinary headers a direct API caller can set to anything,
  // so this stops casual/browser-driven abuse, not a determined attacker
  // scripting requests with a forged Origin — that needs real rate
  // limiting or auth, tracked as the same open item as the waitlist forms.
  const requestOrigin = originFromHeader(req.headers.get('origin')) ?? originFromHeader(req.headers.get('referer'));
  if (!requestOrigin || !ALLOWED_ORIGINS.has(requestOrigin)) {
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
