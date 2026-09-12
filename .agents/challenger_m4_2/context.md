# Challenger M4-2 Context: Curriculum Attribution & Dist Audit Challenge

## Identity
- Role: Challenger (`teamwork_preview_challenger`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m4_2`
- Milestone: Milestone 4 (Standardized Lesson Content Formatting Framework)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m4_1\handoff.md`
- `src/data/courses/springboard-ux/lessons/`
- `src/data/courses.ts`
- `dist/`

## Task
1. Author an empirical verification script to inspect all 37 lessons across both raw data and compiled `dist/` HTML pages:
   - Verify that 37/37 lessons contain a valid source attribution footer.
   - Verify that all external citation URLs are valid, properly formed URLs.
   - Verify that the injected footers in `sb-6-1`, `sb-7-1`, and `sb-8-1` render seamlessly inside the reading column.
2. Adversarial Constitutional Audit across all lessons:
   - Check for emojis (must be 0).
   - Check for double-slashes `//` (must be 0 in UI text).
   - Check for whole-element hover translations (`hover:translate-`, `hover:scale-` must be 0).
3. Run `npm test` and `npm run verify`.
4. Output your report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m4_2\report.md` and `handoff.md`. Clearly state verdict: APPROVE or REQUEST_CHANGES. Report back via send_message.
