# icanteachyouai.com: Homepage Design Spec v2

Referenced from CLAUDE.md Section 4. Safe to commit (no pricing strategy, no targets, no positioning rationale).

The reference build is `icanteachyouai-homepage-prototype-v2.html`. Keep it outside the repo (it is a design reference, not source) and open it in the browser while Claude Code works.

---

## 1. What "done" looks like

`LandingPage.tsx` matches the prototype's layout, hierarchy, and motion, using only the tokens in `src/styles/tokens.css`, CSS Modules, and the fonts in BRAND-GUIDE (Syne 800 for headings, DM Sans for body, DM Mono for labels and code). Nothing is hardcoded. No new dependencies. Every rule in CLAUDE.md Section 4 and 4a passes.

## 2. Tokens

Use the names already in `tokens.css`. If any of these are missing, add them there and nowhere else:

- background `#09090e`, card `#111118`, a second card tone `#15151e`, line `#22222e`
- text `#ECECF1`, secondary text `#B4B4C2`, muted `#7C7C8E`
- gold `#c8a74b` (primary, CTAs, rail, accents), gold-soft `rgba(200,167,75,.14)` (final CTA section background)
- teal `#0B9E8E` (live status only)
- purple `#7c6fff` (terminal prompt, cursor, stack labels, code borders only)
- `--term-h: 330px` (reserved terminal height to prevent layout shift)

## 3. Sections, in order, with tone

| # | Section | Background | Notes |
|---|---|---|---|
| 1 | Hero | bg + faint grid mask | Two column asymmetric. Left: eyebrow, H1 with second sentence in gold and an underline that draws in at 0.9s, lead, one primary CTA (Exam Prep) and one ghost (Waitlist), and the "built with Claude Code" note. Right: the Rx terminal and the 4 up product strip. |
| 2 | Proof of work | bg | One featured card (HHH) at 1.35fr spanning three rows with a real screenshot; three cards stacked right. Hover lifts 4px and turns border gold. Teal pulse on live dots, gold on "in testing". |
| 2b | Also built, for fun | bg | A single compact row under the proof grid, visually lighter (smaller cards, no pulse, no featured slot). Two items: Yaadmoji (Jamaican Patois sticker, emoji, and soundbite app) and Beat Di Table (Jamaican dominoes, cut throat and partners). One honest line each, a link, the stack in mono. Eyebrow reads "Also built, for fun." These prove the skill is general; they never sit in the healthcare grid. Beat Di Table needs a real domain before it appears here; use the vercel.app link nowhere on the site. GLPRoot is not listed anywhere. |
| 3 | Stack | card | Vertical gold rail with five pinned rows. Left column tool name plus a purple mono role label; right column one sentence. Order is real (the order she reaches for them). |
| 4 | Curriculum | bg | 2x2 cells. Mono audience tag. Border turns teal on hover. |
| 5 | This site is the lesson | card | Two columns: copy left, a `pre` block with the public CLAUDE.md excerpt right, purple left border. |
| 6 | Final CTA | gold-soft | "Start with the exam. Stay for the build." Same two buttons as hero. |
| 7 | Footer | bg | Links to `/claude-md-excerpt`, Privacy, Terms. |

## 4. The Rx terminal (signature)

- Title bar is a prescription label: `Rx for / Your practice`, `Sig / claude-code + n8n. PHI stays in the covered lane.`, large gold Rx symbol.
- Body types a scripted Claude Code session (copy the `lines` array from the prototype), loops after 6s. Prompt and cursor purple, success lines teal, warnings gold, comments muted.
- Fixed height `var(--term-h)`, `overflow: hidden`. Zero CLS.
- On `prefers-reduced-motion: reduce`, render the full transcript statically.
- In React: the typing loop must live in a `useEffect` with cleanup (`clearTimeout` on unmount), or it leaks on route change.
- Desktop only: `rotate(-0.6deg)`. Mobile: none.

## 5. Motion rules

- Reveal class is applied only when `<html>` has class `js`. Add that class in `main.tsx` before `createRoot`, not in an inline script.
- `IntersectionObserver`, fire once, `rootMargin: 0 0 -8%`, disconnect on unmount.
- 2.5 second fallback that marks everything revealed.
- Allowed animations: terminal typing, cursor blink, live dot pulse, H1 underline draw, card hover lift, nav border on scroll. Nothing else.
- All of the above are disabled by `prefers-reduced-motion`.

## 6. Copy rules for this page

- No em dashes anywhere, including the terminal script and alt text.
- No "leverage", "seamless", "unlock", "elevate", "delve".
- Product statuses are honest: DeIDGuard is "in testing" until it has a public URL.
- The footer CLAUDE.md link goes to a curated public excerpt, never to the repo file.

## 7. The prompt to give Claude Code

> Read CLAUDE.md, BRAND-GUIDE.md, and docs/DESIGN-SPEC.md. Open the prototype I have in the browser at the URL I give you and study it at 375px and 1280px. Then, following Rule 2, tell me in plain English what you will change in LandingPage.tsx and LandingPage.module.css, which tokens you will add to tokens.css, and what "done" looks like. Wait for my approval before writing code.

After approval:

> Build it. Match the prototype's layout and motion, use tokens.css for every color and font, CSS Modules only, no inline layout styles, no new packages. When finished, run npm run build, run the webapp-testing browser at 375px and 1280px, screenshot both, and run the CLAUDE.md audit in docs/AUDIT-PROMPT.md. Report every failure before you say done.
