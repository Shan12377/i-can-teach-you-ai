export interface QuestionReportPayload {
  questionId: string;
  note: string;
}

export interface ExamReviewPayload {
  rating: number;
  comment: string;
}

async function postToN8n(body: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl) return false;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'ictai_exam_prep',
        ...body,
      }),
    });
    return true;
  } catch {
    return false;
  }
}

export function reportExamQuestion(payload: QuestionReportPayload): Promise<boolean> {
  return postToN8n({ submissionType: 'exam_question_report', ...payload });
}

export function submitExamReview(payload: ExamReviewPayload): Promise<boolean> {
  return postToN8n({ submissionType: 'exam_review', ...payload });
}
