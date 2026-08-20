import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { verifyAccessToken } from './_lib/access-token.js';

const encryptedDataPath = fileURLToPath(new URL('./_data/exam-questions.enc.json', import.meta.url));

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const tokenSecret = process.env.EXAM_TOKEN_SECRET;
  const contentKey = process.env.EXAM_CONTENT_KEY;
  if (!tokenSecret || !contentKey) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token || !verifyAccessToken(token, tokenSecret)) {
    return Response.json({ error: 'Invalid or expired access token' }, { status: 401 });
  }

  try {
    const encrypted = JSON.parse(await readFile(encryptedDataPath, 'utf-8'));
    const key = Buffer.from(contentKey, 'base64');
    const iv = Buffer.from(encrypted.iv, 'base64');
    const authTag = Buffer.from(encrypted.authTag, 'base64');
    const ciphertext = Buffer.from(encrypted.ciphertext, 'base64');

    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf-8');

    return new Response(plaintext, {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch {
    return Response.json({ error: 'Could not load exam content' }, { status: 500 });
  }
}
