# Worker M3-1 Context: Reader DOM Engine & Local Storage Tuning

## Identity
- Role: Worker (`teamwork_preview_worker`)
- Working Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m3_1`
- Target Milestone: Milestone 3 (Reader DOM Engine & Local Storage High-Performance Tuning)

## Mandatory References
- Authoritative User Request: `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- Project Document: `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- Explorer Reports:
  - `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md` (Lifecycle teardown blueprint)
  - `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_2\report.md` (RAF batching & touch selection blueprint)
  - `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3\report.md` (Scroll restoration & height stabilization blueprint)

## Files Owned Exclusively
- `public/scripts/reader.js`
- `src/layouts/BaseLayout.astro` (if needed for scroll-smooth coordination)

## Mandatory Tasks
1. **Lifecycle Teardown on `astro:before-swap`**:
   - In `public/scripts/reader.js`, add a global `document.addEventListener('astro:before-swap', ...)` listener that:
     - Aborts `window.__ahkhReaderAbort` if active, and resets it to `null`.
     - Destroys `window.__ahkhYtPlayer` safely and sets to `null`.
     - Clears `window.__ahkhYtTimer` and sets to `null`.
     - Disconnects `window.__ahkhVideoObserver` (the IntersectionObserver on `#video-scroll-sentinel`).
     - Clears any pending debounce or toast timers.
     - Resets desk element `dataset.ahkhBooted` flag so re-entry re-initializes cleanly.
   - Ensure all event listeners in `reader.js` are bound with `{ signal: __ahkhSignal }`, including highlight span click listeners.

2. **Gutter Note Layout Thrashing Elimination ($O(N^2) \to O(N)$ RAF Batching)**:
   - Refactor `renderGutterNote` and `cascadeGutterNotes`:
     - Decouple DOM element creation/population from layout measurement and cascading.
     - Schedule layout calculations via `requestAnimationFrame` (`scheduleCascadeGutterNotes()`).
     - Implement 3-stage batched layout (`batchLayoutGutterNotes()`):
       - Stage 1: Batch reads (`readingBox`, `spanBox` rects, `note.offsetHeight` values) in a single pass.
       - Stage 2: In-memory sorting and collision avoidance math with 8px margin.
       - Stage 3: Batch writes (`style.display`, `style.top`) in a single pass with zero intervening DOM reads.
     - Throttle window `resize` handler to `requestAnimationFrame`.

3. **Mobile Touch Selection Support**:
   - Add `touchend` listener to trigger text selection handling with ~60ms settling delay for mobile drag handles.
   - Add `selectionchange` listener: immediately hide popover if selection is collapsed, and debounce (150-200ms) when active.
   - Add `touchstart` listener to dismiss selection popover on taps outside reading text and popover container.

4. **Programmatic Scroll Restoration Hardening**:
   - Introduce an `isRestoringScroll` lock flag to suppress premature `saveScrollDepth()` overwrites during restoration.
   - Suppress `scroll-smooth` on `document.documentElement` during instant scroll restore (`classList.remove('scroll-smooth')`) and restore it after settling.
   - Implement multi-phase adaptive stabilization: immediate provisional jump + async asset readiness race (`document.fonts.ready`, image decoding) before finalizing restored scroll depth.
   - Support user-intent preemption: if user interacts (`wheel`, `touchstart`, `keydown`), immediately cancel restoration and release lock.

5. **Build & Test Verification**:
   - Run `npm test` and verify that all 20 suites (49 tests, 970 assertions) pass.
   - Run `npm run verify` and verify that all 11 constitutional checks pass.
   - Run `npm run build` and verify that all 42 static routes compile with zero errors.

## Mandatory Invariant Guardrails
- Strictly ZERO emojis and ZERO double-slashes (`//`) anywhere in code, comments, or strings.
- Pure White Canvas: `#FFFFFF` in Light Mode. Never `#FDFCFA`, ivory, or cream.
- Seven Signal Hues: text-only, calibrated grades. Zero colored background pills.
- Universal Prohibition of Whole-Element Movement on Hover (ADR-017).

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Deliverables
- Fully working implementation in `public/scripts/reader.js` (and `src/layouts/BaseLayout.astro` if modified).
- Handoff report in `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m3_1\handoff.md` with:
  - Observation & Logic Chain
  - Files modified
  - Verification results (`npm test`, `npm run verify`, `npm run build`)
- Send completion message to parent orchestrator.
