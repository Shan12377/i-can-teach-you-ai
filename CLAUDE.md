# I Can Teach You AI - Project Documentation

This is the central documentation for the "I Can Teach You AI" platform. Claude Code (or Cursor) must read and adhere to these rules when working on this project.

## 1. Project Overview

**Brand:** I Can Teach You AI
**Founder:** Dr. Shallanda Hunter, PharmD
**Positioning:** Technical education, AI integration, and workflow automation for healthcare professionals and builders.
**Stack:** Vite + React + TypeScript + CSS Modules. No Tailwind.

## 2. Compliance and Architecture Rules (CRITICAL)

This platform is related to Hunter's Holistic Health but serves a different purpose. However, the same strict compliance rules apply:

1. **HIPAA Hard Stop:** If any proposed feature, form field, or data flow may create, transmit, or store individually identifiable health information (IIHI), STOP immediately and consult Dr. Hunter before writing any code. Do not proceed on your own judgment.
2. **Two-Layer Architecture:** The app and n8n are Lane 1 (non-PHI only). Any clinical or sensitive data must be handled in Lane 2 (Google Workspace clinical lane, manual review only). These two lanes must never merge in code.
3. **Title Rule:** Always use "Functional Medicine Educator" or "PharmD". Never use "health coach" or "RPh".
4. **Data Minimization:** Do not collect date of birth, physical address, or other unnecessary personal information in any form.
5. **No Em Dashes:** Never use the em dash character (`—`) in any text, copy, comments, or documentation. Use periods, commas, or colons instead.
6. **No AI Filler:** Do not use phrases like "delve into", "leverage", "unlock your potential", "elevate", or "seamless". Write clearly and technically.

## 3. Design System Rules

1. **No Tailwind:** Use CSS modules (`*.module.css`) and CSS variables only.
2. **No Inline Layouts:** Do not use inline style objects for layout (flexbox, grid, padding). Use CSS modules. Inline styles are only for dynamic JS values.
3. **Colors:**
   - Background: `#09090e`
   - Card: `#111118`
   - Accent (Purple): `#7c6fff`
   - Gold (HHH connection): `#c8a74b` (No lime green allowed)
   - Teal (HHH connection): `#0B9E8E`
4. **Typography:**
   - Headlines: Syne (800 weight)
   - Body: DM Sans (400-500 weight)
   - Code/Labels: DM Mono

## 4. Environment Setup

To run this project locally:
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your `VITE_N8N_WEBHOOK_URL`
4. Add your `VITE_STRIPE_PUBLIC_KEY`
5. `npm run dev`

## 5. Stripe Integration (To Do)

The `/checkout` page currently has a stub. To wire it up:
1. Create a Stripe account.
2. Create two products: "CCA-F Exam Prep" (One-time, $37) and "HHH Monthly Access" (Recurring, $19.99/mo).
3. Set up a Vercel Serverless Function (`/api/create-checkout-session`) to handle the Stripe secret key securely.
4. Update `CheckoutPage.tsx` to POST to that function.

## 6. n8n Intake Blueprint

This project uses the same n8n architecture as HHH. The webhook URL goes in `.env.local`.

**Waitlist Flow (Two Steps):**
1. `/waitlist` -> Collects email.
2. `/waitlist/questions` -> Collects name, background, goal, biggest problem.
3. Both submit to the n8n webhook with `submissionType: 'ictai_waitlist'`.

**Google Sheet Structure (ICTAI Intake):**
- Tab: `Waitlist`
- Columns: Timestamp, Email, First Name, Last Name, Background, Primary Goal, Biggest Problem

## 7. SEO Blog Writing Skill

When writing new blog posts for `blogData.ts`, follow this SEO framework:

**Structure:**
1. **Title:** Clear, keyword-rich, under 60 characters.
2. **Excerpt:** 1-2 sentences summarizing the value.
3. **Content Format:**
   - Start with a strong hook (no filler).
   - Use `##` and `###` headers logically.
   - Use bolding `**` for key concepts.
   - Use bulleted lists `- ` for readability.
   - Include code blocks ` ``` ` for technical examples.
   - End with a clear takeaway.

**Voice:**
Authoritative, technical, clinical, and direct. You are a PharmD teaching other professionals how to build secure systems. Do not sound like a generic marketer.

**Formatting Note:**
The `BlogPostPage.tsx` component parses a specific markdown-like syntax from `blogData.ts`. It supports headers (`## `), bold text (`**text**`), bullet lists (`- `), and code blocks (` ``` `). Ensure new posts strictly follow this formatting.
