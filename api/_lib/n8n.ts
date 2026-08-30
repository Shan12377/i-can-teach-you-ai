/**
 * Fire-and-forget POST to the existing n8n intake webhook. Errors are logged,
 * never thrown, so an n8n outage never blocks the Stripe webhook ack or the
 * recover-access response. The boolean result provides safe observability to
 * callers without exposing payload contents.
 */
export async function notifyN8n(payload: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('n8n notify skipped: webhook URL is missing');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
    if (!response.ok) {
      console.error('n8n notify failed with status', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error('n8n notify failed', error);
    return false;
  }
}
