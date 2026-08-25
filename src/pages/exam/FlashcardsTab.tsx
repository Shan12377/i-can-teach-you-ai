import { useMemo, useState } from 'react';
import styles from './Exam.module.css';
import s from '../../styles/shared.module.css';
import type { Flashcard } from './types';

interface FlashcardsTabProps {
  flashcards: Flashcard[];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function FlashcardsTab({ flashcards }: FlashcardsTabProps) {
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const card of flashcards) seen.add(card.category);
    return Array.from(seen);
  }, [flashcards]);

  const [deck, setDeck] = useState<string>('all');
  const [order, setOrder] = useState<Flashcard[]>(() => flashcards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [review, setReview] = useState<Set<string>>(new Set());

  const pool = useMemo(
    () => (deck === 'all' ? order : order.filter((c) => c.category === deck)),
    [order, deck]
  );

  const card = pool[index];
  const cardKey = card ? `${card.category}::${card.question}` : '';

  function selectDeck(next: string) {
    setDeck(next);
    setIndex(0);
    setFlipped(false);
  }

  function goNext() {
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  function mark(kind: 'known' | 'review') {
    if (!card) return;
    if (kind === 'known') {
      setKnown((prev) => new Set(prev).add(cardKey));
      setReview((prev) => {
        const next = new Set(prev);
        next.delete(cardKey);
        return next;
      });
    } else {
      setReview((prev) => new Set(prev).add(cardKey));
    }
    goNext();
  }

  function reset() {
    setOrder(flashcards);
    setDeck('all');
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setReview(new Set());
  }

  function doShuffle() {
    setOrder(shuffle(flashcards));
    setIndex(0);
    setFlipped(false);
  }

  const done = index >= pool.length;
  const masteredPct = pool.length ? Math.round((known.size / pool.length) * 100) : 0;

  return (
    <div>
      <h1 className={styles.reviewH1}>Flashcard Drill</h1>
      <p className={`${styles.menuSub} ${styles.tabIntroSmall}`}>
        {flashcards.length} cards across all topics. Tap to reveal. Mark "Know It" or "Still Learning" to track
        progress.
      </p>

      <div className={styles.fcFilterRow}>
        <button className={`${styles.fcFilt} ${deck === 'all' ? styles.fcFiltOn : ''}`} onClick={() => selectDeck('all')}>
          All ({flashcards.length})
        </button>
        {categories.map((cat) => (
          <button key={cat} className={`${styles.fcFilt} ${deck === cat ? styles.fcFiltOn : ''}`} onClick={() => selectDeck(cat)}>
            {cat}
          </button>
        ))}
        <div className={styles.fcFilterSpacer}>
          <button className={styles.fcFilt} onClick={doShuffle}>&#8635; Shuffle</button>
          <button className={styles.fcFilt} onClick={reset}>Reset</button>
        </div>
      </div>

      <div className={styles.fcStatRow}>
        <div className={`${styles.fcStat} ${styles.fcStatKnown}`}>
          <div className={styles.fcStatNumber}>{known.size}</div>
          <div className={styles.fcStatLabel}>Know It</div>
        </div>
        <div className={`${styles.fcStat} ${styles.fcStatReview}`}>
          <div className={styles.fcStatNumber}>{review.size}</div>
          <div className={styles.fcStatLabel}>Review</div>
        </div>
        <div className={styles.fcStat}>
          <div className={styles.fcStatNumber}>{Math.max(pool.length - index, 0)}</div>
          <div className={styles.fcStatLabel}>Left</div>
        </div>
        <div className={styles.fcStat}>
          <div className={styles.fcStatNumber}>{masteredPct}%</div>
          <div className={styles.fcStatLabel}>Mastered</div>
        </div>
      </div>

      {done || !card ? (
        <div className={styles.fcDone}>
          <div className={styles.fcDoneEmoji}>&#127881;</div>
          <div className={styles.fcDoneTitle}>Deck complete!</div>
          <div className={styles.fcDoneSub}>
            {known.size} known &middot; {review.size} to review
          </div>
          <div className={styles.fcDoneActions}>
            {review.size > 0 && (
              <button
                className={s.btnGold}
                onClick={() => {
                  setOrder(flashcards.filter((c) => review.has(`${c.category}::${c.question}`)));
                  setDeck('all');
                  setIndex(0);
                  setFlipped(false);
                }}
              >
                Drill Review Pile
              </button>
            )}
            <button className={s.btnOutline} onClick={reset}>Start Over</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.fcCardWrap} onClick={() => setFlipped((f) => !f)}>
            <div className={`${styles.fcCard} ${flipped ? styles.fcCardFlipped : ''}`}>
              <div className={`${styles.fcFace} ${styles.fcFront}`}>
                <div className={styles.fcCategory}>{card.category}</div>
                <div className={styles.fcQuestion}>{card.question}</div>
                <div className={styles.fcHint}>Tap to reveal &darr;</div>
              </div>
              <div className={`${styles.fcFace} ${styles.fcBack}`}>
                {/* Developer-authored content from our own encrypted question bank, never user input. */}
                <div className={styles.fcAnswer} dangerouslySetInnerHTML={{ __html: card.answer }} />
              </div>
            </div>
          </div>
          {flipped && (
            <div className={styles.fcActions}>
              <button className={`${styles.fcActionBtn} ${styles.fcActionReview}`} onClick={() => mark('review')}>
                &#10007; Still Learning
              </button>
              <button className={`${styles.fcActionBtn} ${styles.fcActionKnown}`} onClick={() => mark('known')}>
                &#10003; Know It
              </button>
            </div>
          )}
          <div className={styles.fcCounter}>{index + 1} / {pool.length}</div>
        </>
      )}
    </div>
  );
}
