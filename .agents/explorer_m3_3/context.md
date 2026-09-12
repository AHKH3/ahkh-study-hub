# Explorer M3-3 Context: Programmatic Scroll Restoration & Storage Tuning

## Identity
- Role: Explorer (teamwork_preview_explorer)
- Directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3

## Objective
Investigate scroll restoration mechanics, document height stabilization, and smooth-scroll interaction in `public/scripts/reader.js` and `src/layouts/BaseLayout.astro`.

## Key References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_3\report.md`
- `c:\Users\abdel\dev\ahkh-study-hub\public\scripts\reader.js`
- `c:\Users\abdel\dev\ahkh-study-hub\src\layouts\BaseLayout.astro`

## Task
1. Analyze `restoreSavedScrollPosition` in `reader.js`.
2. Evaluate premature scroll clamping caused by unrendered images/fonts or temporary document heights.
3. Check the effect of `<html class="scroll-smooth">` on instant scroll restoration during page navigation.
4. Formulate the fix: temporarily disable `scroll-smooth` during instant restore, ensure font/height stability checks, and test edge cases.
5. Output your report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3\report.md` and `handoff.md`.
