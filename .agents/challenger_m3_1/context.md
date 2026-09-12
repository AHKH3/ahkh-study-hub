# Challenger M3-1 Context: Lifecycle Stress-Testing & Route Swap Verification

## Identity
- Role: Challenger (`teamwork_preview_challenger`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m3_1`
- Milestone: Milestone 3 (Reader DOM Engine & Local Storage High-Performance Tuning)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m3_1\handoff.md`
- `c:\Users\abdel\dev\ahkh-study-hub\public\scripts\reader.js`
- `c:\Users\abdel\dev\ahkh-study-hub\tests\utils\dom-runtime.mjs`

## Task
1. Write an empirical test script or harness that simulates 50 rapid navigation cycles between lesson pages and non-reader pages (`/`, `/courses/springboard-ux`).
2. Verify that upon `astro:before-swap`:
   - `window.__ahkhReaderAbort` is aborted and nulled.
   - `window.__ahkhYtPlayer` is destroyed and nulled.
   - `window.__ahkhYtTimer` is cleared and nulled.
   - `window.__ahkhVideoObserver` is disconnected.
   - Window and document listeners attached by reader.js are 0 on non-reader pages.
3. Run `npm test` and your empirical harness.
4. Output your detailed empirical challenge report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m3_1\report.md` and `handoff.md`. Clearly state verdict: APPROVE or REQUEST_CHANGES. Report back via send_message.
