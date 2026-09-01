import { timingSafeEqual } from 'node:crypto';
import { issueAccessToken } from './_lib/access-token.js';

// Sentinel sessionId for owner-bypass tokens: never a real Stripe session
// (those always start with "cs_"), so exam-questions.ts / study-guide.ts can
// recognize it and skip the live Stripe refund check entirely.
export const OWNER_BYPASS_SESSION_ID = 'owner-bypass';

export async function POST(req: Request): Promise<Response> {
  const ownerCode = process.env.EXAM_OWNER_CODE;
  const tokenSecret = process.env.EXAM_TOKEN_SECRET;
  if (!ownerCode || !tokenSecret) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  let code: unknown;
  try {
    const body = await req.json();
    code = body?.code;
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof code !== 'string' || !code) {
    return Response.json({ error: 'Enter the code' }, { status: 400 });
  }

  const provided = Buffer.from(code);
  const expected = Buffer.from(ownerCode);
  const isMatch = provided.length === expected.length && timingSafeEqual(provided, expected);
  if (!isMatch) {
    return Response.json({ error: 'Invalid code' }, { status: 401 });
  }

  const token = issueAccessToken(OWNER_BYPASS_SESSION_ID, tokenSecret);
  return Response.json({ token });
}
