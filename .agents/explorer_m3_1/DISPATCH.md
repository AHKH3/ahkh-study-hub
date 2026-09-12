## 2026-09-12T07:03:40Z

Read ORIGINAL_REQUEST.md at: c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Your context file is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\context.md
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1

Objective:
Investigate lifecycle teardown in public/scripts/reader.js across Astro ClientRouter page navigations (especially when navigating away to non-reader pages like /, /courses/springboard-ux, etc.).
1. Inspect how reader.js initializes and handles astro:page-load and astro:before-swap.
2. Verify why listeners and timers leak on navigation to non-reader pages.
3. Formulate the exact implementation plan for astro:before-swap listener to abort window.__ahkhReaderAbort, destroy window.__ahkhYtPlayer, clear window.__ahkhYtTimer, and disconnect any IntersectionObserver instances.
4. Output your technical report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md and handoff.md. Report back via send_message when done.
