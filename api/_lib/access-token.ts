import { createHmac, timingSafeEqual } from 'node:crypto';

const TOKEN_TTL_MS = 10 * 365 * 24 * 60 * 60 * 1000; // 10 years, matches "lifetime access"

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function issueAccessToken(sessionId: string, secret: string): string {
  const payload = JSON.stringify({ sessionId, exp: Date.now() + TOKEN_TTL_MS });
  const encodedPayload = Buffer.from(payload, 'utf-8').toString('base64url');
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string, secret: string): boolean {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  const expectedSignature = sign(encodedPayload, secret);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}
