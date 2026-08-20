/**
 * Fire-and-forget POST to the existing n8n intake webhook. Errors are logged,
 * never thrown, so an n8n outage never blocks the Stripe webhook ack or the
 * recover-access response.
 */
export async function notifyN8n(payload: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('n8n notify failed', error);
  }
}
