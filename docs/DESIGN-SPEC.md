# icanteachyouai.com: Founder-Led Homepage Design Spec v3

Referenced from CLAUDE.md Section 4. Safe to commit (no pricing strategy, no targets, no positioning rationale).

The reference build is `icanteachyouai-homepage-prototype-v2.html`. Keep it outside the repo (it is a design reference, not source) and open it in the browser while Claude Code works.

---

## 1. What "done" looks like

`LandingPage.tsx` presents Dr. Shallanda Hunter as a recognizable Healthcare AI Builder and Educator. The first viewport includes her real portrait, PharmD identity, one proof-led primary action, and an animated but accessible build system. Real products appear before teaching offers. Use only tokens in `src/styles/tokens.css`, CSS Modules, and the fonts in BRAND-GUIDE. Nothing is hardcoded. No new dependencies. Every rule in CLAUDE.md Section 4 and 4a passes.

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
| 1 | Hero | bg + faint grid mask | Two column asymmetric. Left: founder-led category, H1 with gold phrase and underline, direct promise, one proof-led primary action, one organization action, and credentials. Right: Dr. Hunter portrait plus the animated current build system. |
| 1b | Authority strip | bg2 | Four concise, verifiable proof signals. Use real product and question counts only. |
| 2 | Proof of work | bg | One featured HHH card with a reviewed public-safe product image, followed by Pharmacy Decoder, DeIDGuard, and CCA-F Exam Prep. Hover lifts 4px and turns border gold. Teal pulse on live dots, gold on testing. |
| 2b | Also built, for fun | bg | A single compact row under the proof grid, visually lighter (smaller cards, no pulse, no featured slot). Two items: Yaadmoji (Jamaican Patois sticker, emoji, and soundbite app) and Beat Di Table (Jamaican dominoes, cut throat and partners). One honest line each, a link, the stack in mono. Eyebrow reads "Also built, for fun." These prove the skill is general; they never sit in the healthcare grid. Beat Di Table needs a real domain before it appears here; use the vercel.app link nowhere on the site. GLPRoot is not listed anywhere. |
| 3 | Build process | card | Four steps from workflow definition to testing. This makes Dr. Hunter's judgment visible. |
| 4 | Teaching | bg | Three audience cards for healthcare professionals, organizations, and builders. |
| 5 | Build library | card | The newest three articles displayed as a compact editorial index. |
| 6 | Final CTA | gold-soft | Organization-first action with the learning list as secondary. |
| 7 | Footer | bg | Links to `/claude-md-excerpt`, Privacy, Terms. |

## 4. The Living Build Lab (signature)

- The signature visual combines Dr. Hunter's real portrait with a three-stage workflow: healthcare problem, AI-assisted build, tested product.
- Gold indicates the brand and primary direction. Purple labels technical build stages. Teal marks a live or tested state.
- The workflow reserves its complete height and never shifts content.
- Movement is limited to a small progress signal, status pulse, portrait halo, and headline underline.
- On `prefers-reduced-motion: reduce`, every element remains visible and the workflow becomes static.

## 5. Motion rules

- Reveal class is applied only when `<html>` has class `js`. Add that class in `main.tsx` before `createRoot`, not in an inline script.
- `IntersectionObserver`, fire once, `rootMargin: 0 0 -8%`, disconnect on unmount.
- 2.5 second fallback that marks everything revealed.
- Allowed animations: workflow progress, live dot pulse, portrait halo, H1 underline draw, card hover lift, nav border on scroll. Nothing else.
- All of the above are disabled by `prefers-reduced-motion`.

## 6. Copy rules for this page

- No em dashes anywhere, including the terminal script and alt text.
- No "leverage", "seamless", "unlock", "elevate", "delve".
- Product statuses are honest: DeIDGuard is "Testing" until it has a public URL.
- A source screenshot is never added directly. Create and inspect a public-safe derivative first.
- Do not use testimonials containing a person's name plus health information.
- The footer CLAUDE.md link goes to a curated public excerpt, never to the repo file.

## 7. The prompt to give Claude Code

> Read CLAUDE.md, BRAND-GUIDE.md, and docs/DESIGN-SPEC.md. Open the prototype I have in the browser at the URL I give you and study it at 375px and 1280px. Then, following Rule 2, tell me in plain English what you will change in LandingPage.tsx and LandingPage.module.css, which tokens you will add to tokens.css, and what "done" looks like. Wait for my approval before writing code.

After approval:

> Build it. Match the prototype's layout and motion, use tokens.css for every color and font, CSS Modules only, no inline layout styles, no new packages. When finished, run npm run build, run the webapp-testing browser at 375px and 1280px, screenshot both, and run the CLAUDE.md audit in docs/AUDIT-PROMPT.md. Report every failure before you say done.
