# BRIEFING — 2026-09-12T07:20:00Z

## Mission
Investigate reader lifecycle teardown in public/scripts/reader.js across Astro ClientRouter navigations and formulate an exact teardown implementation plan.

## 🔒 My Identity
- Archetype: teamwork_preview_explorer
- Roles: explorer, synthesizer
- Working directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1
- Original parent: a20ecc4b-a066-44a5-85db-965e272afde4
- Milestone: M3-1

## 🔒 Key Constraints
- Read-only investigation — do NOT implement / modify application source code
- Strictly comply with project constitution and AGENTS.md
- Report path: report.md and handoff.md in working directory
- Send findings back via send_message to caller (a20ecc4b-a066-44a5-85db-965e272afde4)

## Current Parent
- Conversation ID: a20ecc4b-a066-44a5-85db-965e272afde4
- Updated: 2026-09-12T07:20:00Z

## Investigation State
- **Explored paths**:
  - `public/scripts/reader.js` (complete audit of all listeners, timers, observers, lifecycle hooks)
  - `src/layouts/BaseLayout.astro` (readerLib inclusion, astro:before-swap, ClientRouter setup)
  - `src/pages/courses/[course]/[slug].astro` (inline boot script, study-desk dataset attributes)
  - `src/pages/index.astro` and `src/pages/courses/[course]/index.astro` (comparison before-swap implementations)
  - `tests/e2e/tier2-boundaries.test.mjs`, `tests/e2e/tier3-combinations.test.mjs`, `scripts/test-challenger-m2.mjs`
- **Key findings**:
  - `public/scripts/reader.js` contains 0 handlers for `astro:before-swap`.
  - When navigating to non-reader pages (`/`, `/courses/[course]`), `#study-desk` is absent, so `__ahkhBootReader` never runs.
  - As a direct consequence, `window.__ahkhReaderAbort.abort()` is never called, leaving 14+ `window` and `document` event listeners, the 250ms YouTube sync interval (`window.__ahkhYtTimer`), the player instance (`window.__ahkhYtPlayer`), and an `IntersectionObserver` running indefinitely.
  - Empirically confirmed via virtual browser tests: `window.__ahkhReaderAbort.signal.aborted` remains `false` on `/`, and all 5 window listeners persist.
  - Formulated and verified 5-point implementation plan for builder agent.
- **Unexplored areas**: None within this sub-milestone scope.

## Key Decisions Made
- Formulated exact session-persistent `document.addEventListener('astro:before-swap', ...)` listener for `reader.js`.
- Bound `IntersectionObserver` to `window.__ahkhVideoObserver` and hooked to `__ahkhSignal.addEventListener('abort', ...)`.
- Empirically verified that the proposed fix drops lingering window listeners to 0 immediately upon route swap.

## Artifact Index
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md` — Detailed technical report with code diffs
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\handoff.md` — 5-component handoff report
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\progress.md` — Liveness and progress log
