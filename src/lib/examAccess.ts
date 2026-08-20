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

export async function verifyExamPurchase(sessionId: string): Promise<string | null> {
  const res = await fetch('/api/verify-purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data?.token === 'string' ? data.token : null;
}
