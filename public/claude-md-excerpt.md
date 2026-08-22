# How this site is built

Every page on icanteachyouai.com is generated and maintained with Claude Code from one instruction file. This is a short excerpt of the rules that file gives Claude. The full version covers testing, security, and deployment; these are the ones that shape what you see.

## Read first, always

Before doing anything, read the instruction file and the design system. Look at the files that already exist. If anything is unclear, ask. Do not guess.

## Define before you build

State in plain English what the feature does and what "done" looks like. Wait for confirmation. No code before scope is agreed.

## One change at a time

Do exactly what was asked. Do not refactor surrounding code. Do not add features that seemed helpful.

## Content is visible by default

No text is hidden behind JavaScript. Animations enhance the page; they never gate it. If a visitor has reduced motion turned on, nothing moves and nothing is missing.

## Every page is real HTML

Every route is prerendered at build time so search engines, screen readers, and slow connections get the full page, not an empty shell waiting for a script.

## Two lanes, never merged

This site and its automations handle no protected health information. Anything clinical lives in a separate, manually reviewed lane and never touches this code.

## Test before saying done

The build must pass. The page must work in a real browser at phone and desktop sizes. Never say "done" if it has not been tested.

## Write plainly

No filler phrases. No jargon for its own sake. Write like a clinician explaining something to a colleague.

These are the first rules we write together in the program. A good instruction file is most of what separates a toy from a product.
