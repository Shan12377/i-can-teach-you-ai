import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import { clearExamAccess, getExamAccessToken, getExamSessionId, storeExamAccess, verifyExamPurchase } from '../../lib/examAccess';
import type { ExamContent } from './types';
import HomeTab from './HomeTab';
import AntiPatternsTab from './AntiPatternsTab';
import ConceptsTab from './ConceptsTab';
import QuizTab from './QuizTab';
import TimedExamTab from './TimedExamTab';
import CheatSheetTab from './CheatSheetTab';
import FlashcardsTab from './FlashcardsTab';
import NotesTab from './NotesTab';
import FeedbackTab from './FeedbackTab';

type LoadState = 'checking' | 'denied' | 'error' | 'ready';

type Tab = 'home' | 'antipatterns' | 'concepts' | 'quiz' | 'timed' | 'cheatsheet' | 'flashcards' | 'notes' | 'feedback';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'antipatterns', label: 'Anti-Patterns' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'quiz', label: 'Practice Quiz' },
  { id: 'timed', label: 'Timed Exam' },
  { id: 'cheatsheet', label: 'Cheat Sheet' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'notes', label: 'My Notes' },
  { id: 'feedback', label: 'Feedback' },
];

export default function ExamPage() {
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState<LoadState>('checking');
  const [content, setContent] = useState<ExamContent | null>(null);
  const [tab, setTab] = useState<Tab>('home');

  useEffect(() => {
    const token = getExamAccessToken();
    if (!token) {
      navigate('/exam-prep', { replace: true });
      return;
    }

    let cancelled = false;

    async function fetchContent(withToken: string): Promise<Response> {
      return fetch('/api/exam-questions', {
        headers: { Authorization: `Bearer ${withToken}` },
      });
    }

    async function load() {
      let res = await fetchContent(token!);

      // Token expired: silently re-verify against the stored Stripe session
      // rather than immediately booting a legitimate returning customer.
      if (res.status === 401) {
        const sessionId = getExamSessionId();
        const refreshedToken = sessionId ? await verifyExamPurchase(sessionId) : null;
        if (refreshedToken) {
          storeExamAccess(refreshedToken, sessionId!);
          res = await fetchContent(refreshedToken);
        }
      }

      if (cancelled) return;

      if (res.status === 401) {
        clearExamAccess();
        setLoadState('denied');
        return;
      }
      if (!res.ok) {
        setLoadState('error');
        return;
      }
      const data: ExamContent = await res.json();
      setContent(data);
      setLoadState('ready');
    }

    load().catch(() => {
      if (!cancelled) setLoadState('error');
    });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (loadState === 'checking') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>Verifying access...</p>
        </div>
      </div>
    );
  }

  if (loadState === 'denied') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>
            Your access link has expired or is invalid.{' '}
            <Link to="/exam-prep" className={styles.statusLink}>Return to Exam Prep</Link>
          </p>
        </div>
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className={styles.page}>
        <div className={s.wrapWide}>
          <p className={styles.statusText}>
            Something went wrong loading the exam content. Email{' '}
            <a href="mailto:hello@icanteachyouai.com" className={styles.statusLink}>hello@icanteachyouai.com</a>{' '}
            and we will get you sorted.
          </p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className={styles.page}>
      <div className={styles.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={s.wrapWide}>
        <div className={styles.tabContent}>
          {tab === 'home' && <HomeTab content={content} onNavigate={setTab} />}
          {tab === 'antipatterns' && <AntiPatternsTab antiPatterns={content.antiPatterns} />}
          {tab === 'concepts' && <ConceptsTab domains={content.domains} />}
          {tab === 'quiz' && <QuizTab questions={content.questions} />}
          {tab === 'timed' && <TimedExamTab questions={content.questions} />}
          {tab === 'cheatsheet' && <CheatSheetTab sections={content.cheatSheet} />}
          {tab === 'flashcards' && <FlashcardsTab flashcards={content.flashcards} />}
          {tab === 'notes' && <NotesTab />}
          {tab === 'feedback' && <FeedbackTab />}
        </div>
      </div>
    </div>
  );
}
