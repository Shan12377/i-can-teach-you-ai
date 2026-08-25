import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';
import { verifyAccessToken } from './_lib/access-token.js';
import { isSessionRefunded } from './_lib/exam-purchase.js';

const encryptedDataPath = fileURLToPath(new URL('./_data/study-guide.enc.json', import.meta.url));

export async function GET(req: Request): Promise<Response> {
  const tokenSecret = process.env.EXAM_TOKEN_SECRET;
  const contentKey = process.env.EXAM_CONTENT_KEY;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!tokenSecret || !contentKey || !stripeSecretKey) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const payload = token ? verifyAccessToken(token, tokenSecret) : null;
  if (!payload) {
    return Response.json({ error: 'Invalid or expired access token' }, { status: 401 });
  }

  const stripe = new Stripe(stripeSecretKey);
  if (await isSessionRefunded(stripe, payload.sessionId)) {
    return Response.json({ error: 'This purchase has been refunded' }, { status: 403 });
  }

  try {
    const encrypted = JSON.parse(await readFile(encryptedDataPath, 'utf-8'));
    const key = Buffer.from(contentKey, 'base64');
    const iv = Buffer.from(encrypted.iv, 'base64');
    const authTag = Buffer.from(encrypted.authTag, 'base64');
    const ciphertext = Buffer.from(encrypted.ciphertext, 'base64');

    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return new Response(plaintext, {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': 'attachment; filename="CCA-F-Study-Guide.pdf"',
      },
    });
  } catch {
    return Response.json({ error: 'Could not load study guide' }, { status: 500 });
  }
}
