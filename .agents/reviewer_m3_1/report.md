# Review & Adversarial Quality Report: Milestone 3 Lifecycle Teardown & Memory Leak Prevention

**Reviewer:** `reviewer_m3_1` (`teamwork_preview_reviewer` / critic)  
**Target:** `public/scripts/reader.js` (Commit: `59a7902`)  
**Scope:** Reader lifecycle teardown on route navigation, AbortController signal propagation, YouTube player & observer destruction, and memory leak prevention.  
**Date:** 2026-09-12T07:19:30Z  
**Verdict:** **APPROVE**  

---

## 1. Executive Summary

A comprehensive quality and adversarial review was conducted on the lifecycle teardown and memory management implementation within `public/scripts/reader.js`. The target implementation thoroughly addresses the lifecycle leak issues previously identified in Milestone 3:
1. It registers a session-persistent `astro:before-swap` listener that cleanly aborts `window.__ahkhReaderAbort`, destroys `window.__ahkhYtPlayer`, clears `window.__ahkhYtTimer`, disconnects `window.__ahkhVideoObserver`, resets state flags, and unbinds `#study-desk`.
2. Every document-, window-, and element-level event listener registered during the reader's lifecycle properly receives `{ signal: __ahkhSignal }` or is an intentional session-level listener.
3. Teardown resilience is reinforced by double-layered defensive teardown: teardown executes both proactively during `astro:before-swap` and preemptively at the start of `window.__ahkhBootReader`.
4. All static builds (`npm run build`), test suites (`npm test`: 20 suites, 49 tests, 974 assertions), and constitutional verifications (`npm run verify`: 42 pages audited) pass with zero errors.

---

## 2. Quality Review

### Verdict
**APPROVE**

### Findings

#### [Minor] P3 Observation 1: Direct Property Assignment on Gutter Elements
- **Location**: `public/scripts/reader.js:1185` (`gutterEl.onclick = (e) => { ... }`)
- **Observation**: `ensureGutterNoteElement` assigns click handling via `gutterEl.onclick` property rather than `addEventListener('click', handler, { signal: __ahkhSignal })`.
- **Impact Assessment**: Because `gutterEl` is a DOM child of `#marginalia-gutter` (which is removed from DOM upon ClientRouter page swap), the property assignment does not leak on window or document. Furthermore, this pattern inherently deduplicates handlers when `ensureGutterNoteElement` is re-called on existing elements.
- **Recommendation**: Acceptable as-is; optional future polish could pass `{ signal: __ahkhSignal }` if unified event listener syntax is desired across all DOM elements.

#### [Minor] P3 Observation 2: Guarding Delayed YouTube API Readiness Callbacks
- **Location**: `public/scripts/reader.js:1667-1669` (`window.onYouTubeIframeAPIReady = function() { setupPlayer(); };`)
- **Observation**: If a user on a slow network visits a video lesson and navigates away before `https://www.youtube.com/iframe_api` finishes loading, the global `onYouTubeIframeAPIReady` callback could invoke `setupPlayer()` after route departure.
- **Impact Assessment**: Inside `setupPlayer()`, `new window.YT.Player('youtube-player', ...)` looks for element `#youtube-player`. On non-video pages or index pages, `#youtube-player` does not exist in DOM, rendering it a harmless no-op. If another video lesson was loaded, `onYouTubeIframeAPIReady` is overridden by the new lesson's boot.
- **Recommendation**: Optional future defense: add `if (__ahkhSignal.aborted) return;` at the top of `setupPlayer()`.

---

## 3. Verified Claims

1. **`astro:before-swap` Clean Teardown**:
   - `window.__ahkhReaderAbort.abort()` is called, setting `__ahkhReaderAbort = null`.
   - `window.__ahkhYtPlayer.destroy()` is called defensively inside `try...catch`, setting `__ahkhYtPlayer = null`.
   - `clearInterval(window.__ahkhYtTimer)` is called, setting `__ahkhYtTimer = null`.
   - `window.__ahkhVideoObserver.disconnect()` is called defensively inside `try...catch`, setting `__ahkhVideoObserver = null`.
   - Verified via code inspection of `public/scripts/reader.js:2296-2335` and runtime simulation in `tests/e2e/tier3-combinations.test.mjs:50-96` (`T3-C2`).

2. **Abort Signal Propagation**:
   - `__ahkhSignal` is passed to all 70+ event listeners across `window`, `document`, and interactive UI elements (scroll, resize, selection, keydown, touch, popover, lightbox, tabs, sidebars, timestamp buttons, and highlight spans).
   - In particular, highlight span click handlers in `createHighlightFromSelection` (line 1001) and `restoreHighlightsInDOM` (line 1378) explicitly receive `{ signal: __ahkhSignal }`.
   - Verified via code inspection and AST pattern search.

3. **Multi-Phase Preemption & Cancellation**:
   - Aborting `__ahkhSignal` immediately cancels pending RAF (`gutterLayoutRaf`), clears debounced scroll save timer (`scrollSaveTimer`), clears selection debounce (`selectionDebounceTimer`), and clears toast timeout (`reminderToastTimeout`).
   - Verified via lines 31-49 of `public/scripts/reader.js`.

4. **Test Suite Integrity**:
   - `npm test`: 20 suites, 49 tests, 974 assertions passing with code 0 in 0.32s.
   - `npm run verify`: 42 pages audited, 0 link errors, 0 emoji violations, 0 double slashes, 100% constitutional compliance with code 0.
   - `npm run build`: 42 static HTML routes compiled with code 0 in 3.79s.

---

## 4. Adversarial Challenge & Stress-Testing

**Overall Risk Assessment**: **LOW**

### Challenge 1: Rapid Navigation Interruption during Multi-Phase Scroll Stabilization
- **Assumption Challenged**: Can asynchronous scroll restoration (which awaits `document.fonts.ready` and image decoding with up to 300ms ceiling) execute or corrupt storage if the user rapidly navigates away during the wait?
- **Attack Scenario**: User enters lesson, scroll restoration begins Phase 2 (awaiting font/image promises), and user clicks a link to another page within 50ms.
- **Evaluation & Result**:
  - `astro:before-swap` fires, triggering `window.__ahkhReaderAbort.abort()`.
  - In `restoreSavedScrollPosition`, every continuation checks `if (__ahkhSignal.aborted || preemptionAborted) return;`.
  - When `waitForGeometryStabilization()` resolves, `__ahkhSignal.aborted` is `true`, immediately halting execution.
  - `isRestoringScroll` is reset to `false` in the signal abort handler, preventing lock lingering.
  - **Verdict**: PASS. Robust preemption prevents stale mutations.

### Challenge 2: Teardown Exception Isolation
- **Assumption Challenged**: If destroying the YouTube player or disconnecting the IntersectionObserver throws a runtime error, does it abort the remaining teardown operations?
- **Attack Scenario**: Corrupted YouTube iframe causes `ytPlayer.destroy()` to throw.
- **Evaluation & Result**:
  - Each individual teardown stage in `astro:before-swap` is wrapped in its own independent `try { ... } catch (e) {}` block.
  - An exception in `ytPlayer.destroy()` does not block `clearInterval(window.__ahkhYtTimer)`, `window.__ahkhVideoObserver.disconnect()`, or clearing `window.__ahkhReaderAbort`.
  - **Verdict**: PASS. Fault isolation guarantees teardown completion.

### Challenge 3: Double-Boot Re-entrance & Stale Globals
- **Assumption Challenged**: What happens if Astro fires navigation events unexpectedly or if cold load triggers both inline boot and `astro:page-load`?
- **Attack Scenario**: Simultaneous or sequential boot calls on the same element.
- **Evaluation & Result**:
  - `bootDeskEl.dataset.ahkhBooted` prevents duplicate execution on the same desk element.
  - When switching lessons, `window.__ahkhBootReader` defensively repeats teardown of `__ahkhYtPlayer`, `__ahkhYtTimer`, `__ahkhVideoObserver`, and aborts `__ahkhReaderAbort` before creating new ones.
  - **Verdict**: PASS. Idempotent boot guard prevents listener duplication.

---

## 5. Integrity Verification

- **Hardcoded test results**: None. All assertions in `tests/e2e/` evaluate real virtual browser and DOM states.
- **Dummy / facade implementations**: None. Reader teardown, batch layout, and event signals are fully implemented with real DOM operations.
- **Bypasses / shortcuts**: None.
- **Fabricated verification outputs**: None. Tool outputs directly confirm all 20 test suites, build, and verify pass.

---

## 6. Final Recommendation

Milestone 3's reader lifecycle teardown and memory leak prevention in `public/scripts/reader.js` is verified as robust, production-grade, and compliant with all project constitutions. **APPROVE**.
