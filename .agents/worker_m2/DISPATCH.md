## 2026-09-11T17:44:39Z

You are an implementation worker (Identity: teamwork_preview_worker) for Milestone 2: Instant Client-Side Navigation & Zero-Flicker Transitions.
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m2
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m2\handoff.md and send a message via send_message to your parent.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
Read the technical survey findings at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_1\report.md

WRITE OWNERSHIP:
You exclusively own and may modify:
- `astro.config.mjs`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/courses/[course]/index.astro`
- `src/pages/courses/[course]/[slug].astro`
- `public/scripts/reader.js` (only for the self-boot race condition check)

OBJECTIVES:
1. ClientRouter & Prefetching Configuration:
   - In `astro.config.mjs`, enable prefetching with `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`.
   - In `src/pages/index.astro`, `src/pages/courses/[course]/index.astro`, and `src/pages/courses/[course]/[slug].astro`, add `data-astro-prefetch="hover"` to course links, lesson links, and previous/next navigation links to guarantee instant (<100ms) page swaps.
2. Script Lifecycle Hardening:
   - In `src/pages/courses/[course]/index.astro`, guard `astro:page-load` listeners (e.g. `initModuleAccordions`) with an `AbortController` (aborting on `astro:before-swap`) or an idempotency guard to prevent listener stacking across multiple navigations.
   - In `src/pages/index.astro`, ensure the library progress listener cannot double-register or stack.
3. Reader Self-Boot Guard:
   - In `public/scripts/reader.js`, add a fallback self-boot check at the end of the file so that if `#study-desk` is present and unbooted, `__ahkhBootReader` is immediately called, eliminating the dynamic script load race condition.
4. Verification & Testing:
   - Run `npm test` (verify all E2E tests pass)
   - Run `npm run verify` (verify all 11 constitutional checks pass)
   - Run `npm run build` (verify static compilation of all 42 pages)
   Document commands and output in your handoff report.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

When finished, write your handoff to c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m2\handoff.md and notify your parent via send_message.
