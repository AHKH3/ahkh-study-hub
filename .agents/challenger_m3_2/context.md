# Challenger M3-2 Context: Gutter Reflow Benchmarking & Scroll Stress Verification

## Identity
- Role: Challenger (`teamwork_preview_challenger`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m3_2`
- Milestone: Milestone 3 (Reader DOM Engine & Local Storage High-Performance Tuning)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m3_1\handoff.md`
- `c:\Users\abdel\dev\ahkh-study-hub\public\scripts\reader.js`
- `c:\Users\abdel\dev\ahkh-study-hub\tests\utils\dom-runtime.mjs`

## Task
1. Empirically benchmark `restoreHighlightsInDOM` with 30 synthetic highlights and notes:
   - Verify that DOM reads and writes are batched and do not interleave inside the loop.
   - Verify layout calculation runs once in a batched RAF pass.
2. Empirically stress-test scroll restoration:
   - Simulate a saved scroll position on a long page where initial document height is clamped.
   - Verify `isRestoringScroll` lock prevents `localStorage` and `AhkhSyncBridge` from being overwritten with clamped values.
   - Verify user interaction (`wheel`, `keydown`, `touchstart`) cleanly preempts restoration.
3. Run `npm test` and your empirical benchmarks.
4. Output your detailed report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m3_2\report.md` and `handoff.md`. Clearly state verdict: APPROVE or REQUEST_CHANGES. Report back via send_message.
