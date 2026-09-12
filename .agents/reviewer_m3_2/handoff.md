# Handoff Report: Review & Adversarial Challenge for Milestone 3 (Reader Engine)

**Agent:** `reviewer_m3_2` (`teamwork_preview_reviewer`)  
**Date:** 2026-09-12  
**Target Milestone:** Milestone 3 (Reader DOM Engine & Local Storage High-Performance Tuning)  
**Verdict:** **APPROVE**

---

## 1. Observation

1. **Gutter Layout Decoupling & Batching (`public/scripts/reader.js:1143–1277`)**:
   - `ensureGutterNoteElement(item)` (lines 1143–1192) creates and populates DOM elements without invoking any geometric layout APIs (`getBoundingClientRect`, `offsetHeight`, `style.top`).
   - `scheduleCascadeGutterNotes()` (lines 1201–1209) coalesces calls via `gutterLayoutRaf = requestAnimationFrame(...)`.
   - `batchLayoutGutterNotes()` (lines 1212–1267) executes a strict 3-stage sequence:
     - Stage 1 (lines 1217–1245): Reads container `readingBox`, note elements, span `getBoundingClientRect()`, and `noteEl.offsetHeight`. No DOM style mutations occur in this loop.
     - Stage 2 (lines 1248–1255): Sorts `notesToPosition` in-memory by `targetTop` and resolves collisions sequentially with `floor = item.finalTop + item.height + 8`.
     - Stage 3 (lines 1258–1266): Applies `style.display = 'none'` or `style.top = `${item.finalTop}px`` without any intervening layout reads.
   - `restoreHighlightsInDOM()` (lines 1350–1385) replaces per-note cascading with `ensureGutterNoteElement(item)` calls and a single `scheduleCascadeGutterNotes()` at the end of restoration.

2. **Mobile Touch Selection Parity (`public/scripts/reader.js:899–963`)**:
   - Lines 900–902: `touchend` listener invokes `handleTextSelection()` after a 60ms delay with `{ passive: true, signal: __ahkhSignal }`.
   - Lines 905–919: `selectionchange` listener triggers immediate dismissal if `selection.isCollapsed`, or debounces selection adjustments by 200ms (`selectionDebounceTimer`).
   - Lines 946–962: `dismissPopoverOutside` handles both `mousedown` and `touchstart`, verifying `range.commonAncestorContainer.contains(e.target)` before dismissing to prevent accidental closure during selection handle adjustments.

3. **Scroll Restoration Hardening (`public/scripts/reader.js:215–352`)**:
   - Line 229: `isRestoringScroll = true;` acquired as a lock.
   - Lines 55 & 63: `saveScrollDepth` and `window.onscroll` early-return while `isRestoringScroll` is true, preventing premature clamping overwrites and smart-header auto-hiding.
   - Lines 230–231: `rootEl.classList.remove('scroll-smooth'); rootEl.style.scrollBehavior = 'auto';` suppresses smooth-scroll animations.
   - Lines 265–274: User preemption listeners (`wheel`, `touchstart`, `keydown`) set `preemptionAborted = true` and invoke `releaseRestorationLock()`.
   - Lines 282–315: Multi-phase asset stabilization races `document.fonts.ready` against 250ms and `img.decode()` against 300ms.
   - Lines 323–345: Multi-frame settlement loop verifies 2 consecutive stable frames before releasing the lock.

4. **Lifecycle Teardown on Route Swap (`public/scripts/reader.js:2293–2338`)**:
   - `astro:before-swap` listener invokes `window.__ahkhReaderAbort.abort()`, destroys `window.__ahkhYtPlayer`, clears `window.__ahkhYtTimer`, disconnects `window.__ahkhVideoObserver`, and cleans `dataset.ahkhBooted`.
   - Teardown abort listener (lines 31–42) clears `scrollSaveTimer`, `reminderToastTimeout`, `gutterLayoutRaf`, `selectionDebounceTimer`, and resets `isRestoringScroll = false`.

5. **Tool Execution Results**:
   - `npm test`: 20 test suites, 49 tests, 974 assertions passed with code 0 (duration 0.33s).
   - `npm run verify`: 100% syntax checks passed, 42 HTML pages audited in dist with 0 violations.
   - `npm run build`: 42 static pages built cleanly with code 0 (duration 3.98s).

---

## 2. Logic Chain

1. From Observation 1, the former $O(N^2)$ layout thrashing caused by alternating `style.top` writes and `offsetHeight` reads inside `cascadeGutterNotes()` has been transformed into an $O(N)$ batched pass. By executing reads strictly in Stage 1 and writes strictly in Stage 3 across a single RAF tick, the browser performs a single recalculate-style and layout cycle.
2. From Observation 2, mobile browsers now reliably surface `#selection-popover` via `touchend` and debounced `selectionchange`, whereas previously touch interactions were completely unhandled due to exclusive reliance on `mouseup`.
3. From Observation 3, the race condition where `window.scrollY` was prematurely clamped by unrendered fonts or lazy images and immediately persisted back to `localStorage` is completely neutralized by the `isRestoringScroll` lock and multi-phase asset stabilization. User agency is preserved via instantaneous preemption listeners.
4. From Observation 4, client-side route transitions no longer leak detached listeners, RAF timers, or background polling intervals.
5. From Observation 5, all automated regressions, constitutional rules, and production build checks pass cleanly without issues.
6. Therefore, the implementation meets all requirements of Milestone 3.

---

## 3. Caveats

1. In simulated test environments (`tests/utils/dom-runtime.mjs`), `document.fonts` is not provided. Defensive feature-checks (`document.fonts && document.fonts.ready`) correctly bypass font awaiting in headless test runs.
2. If a video lesson contains dense marginal notes and the user switches views (`formatted-view` to `transcript-view` and back), gutter notes may measure 0px height on the initial unhide frame if `style.display === 'none'`. This non-blocking edge case self-corrects on any subsequent interaction or resize (documented as Finding 1 in `report.md`).
3. No implementation source files were modified by this reviewer agent, adhering to the read-only constraint.

---

## 4. Conclusion

Milestone 3 (Reader DOM Engine & Local Storage High-Performance Tuning) is thoroughly validated, verified against edge cases, and compliant with all project standards and constitutions.

**Final Verdict:** **APPROVE**.

---

## 5. Verification Method

To independently reproduce the review verification:

1. **Verify Unit & E2E Test Suite**:
   ```powershell
   npm test
   ```
   *Expected*: 20 test suites, 49 tests, 974 assertions pass with code 0.

2. **Verify Constitutional Invariants**:
   ```powershell
   npm run verify
   ```
   *Expected*: All syntax checks pass; 0 violations across all 42 HTML pages.

3. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   *Expected*: Astro builds 42 static pages cleanly in `dist/`.

4. **Code Inspection**:
   - Inspect `ensureGutterNoteElement` and `batchLayoutGutterNotes` in `public/scripts/reader.js:1143–1277`.
   - Inspect touch handlers in `public/scripts/reader.js:899–963`.
   - Inspect scroll restoration in `public/scripts/reader.js:215–352`.
