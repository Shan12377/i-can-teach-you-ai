const ICTAI_WAITLIST_LIST_ID = 671582;

/**
 * Fire-and-forget add-to-list call to SendFox. Errors are logged, never
 * thrown, so a SendFox outage never blocks the waitlist submission itself
 * (the n8n/Sheets pipeline stays the source of truth either way).
 */
export async function subscribeToSendFox(email: string): Promise<boolean> {
  const apiKey = process.env.SENDFOX_API_KEY;
  if (!apiKey) {
    console.error('SendFox subscribe skipped: API key is missing');
    return false;
  }

  try {
    const response = await fetch('https://api.sendfox.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, lists: [ICTAI_WAITLIST_LIST_ID] }),
    });
    if (!response.ok) {
      console.error('SendFox subscribe failed with status', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error('SendFox subscribe failed', error);
    return false;
  }
}
