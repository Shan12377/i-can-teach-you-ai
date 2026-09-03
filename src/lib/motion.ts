import { useEffect, useRef, useState } from 'react';

// Motion helpers for the site. Rules (CLAUDE.md 4a.3 and 4a.4):
// content is visible by default, reveal styling only applies when <html> has the js class,
// a 2.5 second fallback reveals everything, and prefers-reduced-motion disables all of it.

export const REVEAL_ATTR = 'data-reveal';
const REVEAL_DONE = 'data-reveal-in';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Observes every [data-reveal] element inside `root` and marks it revealed once it enters view.
export function useRevealRoot<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(`[${REVEAL_ATTR}]`));
    const revealAll = () => targets.forEach(el => el.setAttribute(REVEAL_DONE, ''));

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute(REVEAL_DONE, '');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach(el => observer.observe(el));
    const fallback = window.setTimeout(revealAll, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}

// Counts from 0 to `target` once the element scrolls into view. Server render and
// reduced motion both show the final value immediately, so the number is always real.
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setValue(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
