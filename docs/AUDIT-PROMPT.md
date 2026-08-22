# Audit Prompt

Referenced from CLAUDE.md Section 14. Run this exactly on "run the audit."

---

> Audit this repository and the production site against every rule in CLAUDE.md. For each numbered rule in Sections 2, 4, 4a, and 5, state PASS or FAIL with the file and line (or the curl or Lighthouse output) that proves it. Do not summarize. Do not skip rules. Specifically run: `npm run build` and report the largest chunk in dist/assets; `curl -s https://www.icanteachyouai.com/ | grep -c "I build healthcare apps"`; the same for /about and one blog post; `curl -s -o /dev/null -w "%{http_code}" https://www.icanteachyouai.com/this-does-not-exist`; a grep of src for the em dash character and for hardcoded hex colors in *.module.css; a grep of src for `style={{`; a duplicate slug check on blogData.ts; and Lighthouse mobile on /. Then list any rule in CLAUDE.md that you could not verify and say why. Do not fix anything during the audit.
