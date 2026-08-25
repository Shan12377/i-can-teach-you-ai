const TOKEN_KEY = 'examAccessToken';
const SESSION_ID_KEY = 'examSessionId';

export function storeExamAccess(token: string, sessionId: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_ID_KEY, sessionId);
}

export function getExamAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getExamSessionId(): string | null {
  return localStorage.getItem(SESSION_ID_KEY);
}

export function clearExamAccess(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_ID_KEY);
}

export interface VerifyPurchaseResult {
  token: string | null;
  error: string | null;
}

export async function verifyExamPurchase(sessionId: string): Promise<VerifyPurchaseResult> {
  const res = await fetch('/api/verify-purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return { token: null, error: data?.error ?? 'Something went wrong verifying your purchase.' };
  }
  const token = typeof data?.token === 'string' ? data.token : null;
  return { token, error: token ? null : 'Something went wrong verifying your purchase.' };
}

export interface RecoverAccessResult {
  ok: boolean;
  message: string;
}

// Never returns a token: the backend only ever emails the access link to the
// purchasing address, so this just triggers that send (or silently no-ops if
// the email doesn't match a purchase, without revealing which happened).
export async function recoverExamAccess(email: string): Promise<RecoverAccessResult> {
  const res = await fetch('/api/recover-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return { ok: false, message: data?.error ?? 'Something went wrong' };
  }
  return { ok: true, message: data.message };
}
