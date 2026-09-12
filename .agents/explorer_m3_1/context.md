# Explorer M3-1 Context: Reader Lifecycle & Teardown

## Identity
- Role: Explorer (teamwork_preview_explorer)
- Directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1

## Objective
Investigate lifecycle teardown in `public/scripts/reader.js` across Astro ClientRouter page navigations (especially when navigating away to non-reader pages like `/`, `/courses/springboard-ux`, etc.).

## Key References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_3\report.md`
- `c:\Users\abdel\dev\ahkh-study-hub\public\scripts\reader.js`

## Task
1. Inspect how `reader.js` initializes and handles `astro:page-load` and `astro:before-swap`.
2. Verify why listeners and timers leak on navigation to non-reader pages.
3. Formulate the exact implementation plan for `astro:before-swap` listener to abort `window.__ahkhReaderAbort`, destroy `window.__ahkhYtPlayer`, clear `window.__ahkhYtTimer`, and disconnect any `IntersectionObserver` instances.
4. Output your report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md` and `handoff.md`.
