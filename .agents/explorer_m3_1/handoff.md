# Handoff Report: Reader Lifecycle & Teardown (M3-1)

**Agent:** `teamwork_preview_explorer` (`explorer_m3_1`)  
**Timestamp:** 2026-09-12T07:18:00Z  
**Role:** Explorer & Synthesizer  
**Status:** Task Complete (Hard Handoff)  
**Reference Document:** `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md`

---

## 1. Observation

1. **Absence of `astro:before-swap` in `reader.js`**:
   - In `public/scripts/reader.js`, searching for `astro:before-swap` returns 0 results.
   - Contrast this with `src/pages/index.astro` (line 132), `src/pages/courses/[course]/index.astro` (lines 312, 431), and `src/layouts/BaseLayout.astro` (line 163), which all register explicit `astro:before-swap` listeners to abort controllers and synchronize state.

2. **Boot Guard Behavior**:
   - In `public/scripts/reader.js` (lines 2057–2062):
     ```javascript
     document.addEventListener('astro:page-load', () => {
       try {
         var desk = document.getElementById('study-desk');
         if (desk && window.__ahkhBootReader) window.__ahkhBootReader(Object.assign({}, desk.dataset));
       } catch (e) {}
     });
     ```
   - On non-reader pages (`/`, `/courses/[course]`, `/manifesto`, `/commonplace`), `document.getElementById('study-desk')` returns `null`.

3. **Current Teardown Scope**:
   - The only teardown logic in `public/scripts/reader.js` is inside `window.__ahkhBootReader(vars)` (lines 17–23):
     ```javascript
     try { window.__ahkhYtPlayer?.destroy?.(); } catch (e) {}
     window.__ahkhYtPlayer = null;
     if (window.__ahkhYtTimer) { clearInterval(window.__ahkhYtTimer); window.__ahkhYtTimer = null; }
     if (window.__ahkhReaderAbort) { try { window.__ahkhReaderAbort.abort(); } catch (e) {} }
     window.__ahkhOutlineSpyBound = false;
     window.__ahkhHashChangeBound = false;
     const __ahkhSignal = (window.__ahkhReaderAbort = new AbortController()).signal;
     ```

4. **Observer and Listeners Without Signal / Cleanup**:
   - In `public/scripts/reader.js` (lines 1540–1551):
     ```javascript
     if ('IntersectionObserver' in window) {
       const observer = new IntersectionObserver((entries) => { ... });
       observer.observe(sentinel);
     }
     ```
     `observer` is a local variable; it is never disconnected on navigation or attached to `__ahkhSignal`.
   - In lines 811 and 1146, `span.addEventListener('click', ...)` does not pass `{ signal: __ahkhSignal }`.

5. **Empirical Reproduction Command & Result**:
   - We executed an automated lifecycle test simulating navigation away to `/`:
     ```javascript
     // Mounted reader for lesson 1 -> Removed #study-desk -> Dispatched astro:before-swap -> Dispatched astro:page-load
     ```
   - **Verbatim Result**:
     - `window.__ahkhReaderAbort.signal.aborted === false`
     - Window event listeners remaining on `/`: `['scroll', 'ahkh-theme-change', 'keydown', 'resize', 'hashchange']`
     - 100% of event listeners, YouTube sync interval, and observer persisted on the non-reader route.

---

## 2. Logic Chain

1. `BaseLayout.astro` loads `public/scripts/reader.js` once per session via an inline script tag when `readerLib=true` (reader pages).
2. Astro ClientRouter executes SPA page swaps in-memory without full page reloads, retaining the global JavaScript context, window object, and existing event listeners.
3. When navigating from a lesson route to a non-reader route (`/` or `/courses/[course]`), ClientRouter dispatches `astro:before-swap`, updates the DOM, and dispatches `astro:page-load`.
4. Because `reader.js` has no `astro:before-swap` handler, nothing cleans up during the swap.
5. On the non-reader page, `astro:page-load` fires; `reader.js` checks `document.getElementById('study-desk')`. Because the element is absent on non-reader pages, `window.__ahkhBootReader` is never executed.
6. Because `__ahkhBootReader` is the sole location calling `window.__ahkhReaderAbort.abort()`, the abort controller is never aborted.
7. Therefore, every event listener attached to `window` and `document` with `{ signal: __ahkhSignal }` remains active and continues to respond to events (scrolling, clicking, key presses, resizing) on the non-reader pages.
8. Similarly, `window.__ahkhYtTimer` (`setInterval` polling every 250ms) and `window.__ahkhYtPlayer` continue running in the background indefinitely.
9. Introducing a module-level, session-persistent `document.addEventListener('astro:before-swap', ...)` in `reader.js` guarantees that `window.__ahkhReaderAbort.abort()` is called unconditionally before any DOM swap occurs.
10. Storing the `IntersectionObserver` on `window.__ahkhVideoObserver` and connecting its disconnection to both `__ahkhSignal.addEventListener('abort', ...)` and `astro:before-swap` guarantees total observer cleanup.
11. Empirical testing of this fix confirms that immediately after `astro:before-swap`, 0 window listeners remain and `window.__ahkhReaderAbort` is `null`.

---

## 3. Caveats

1. **Read-Only Scope**: This investigation was performed under strict read-only constraints. No application source code in `public/scripts/reader.js` was modified by this agent; all findings and plans are ready for implementation by the builder agent.
2. **Dynamic Script Load Timing**: `reader.js` is only loaded on pages where `readerLib=true`. If a user lands on `/` first and navigates to other non-reader pages, `reader.js` is not loaded, so there is nothing to tear down. The leak occurs exclusively after visiting at least one lesson.
3. **YouTube Player SDK Asynchrony**: In rare cases where YouTube iframe API is still loading (`YT` global not yet ready), `window.__ahkhYtPlayer?.destroy?.()` safely guards against `undefined`.

---

## 4. Conclusion

The reader lifecycle leak across Astro ClientRouter transitions is completely understood and empirically verified.
The required fix consists of five concise modifications in `public/scripts/reader.js`:
1. **Module-level `astro:before-swap` listener**: Abort `window.__ahkhReaderAbort`, destroy `window.__ahkhYtPlayer`, clear `window.__ahkhYtTimer`, disconnect `window.__ahkhVideoObserver`, and reset `window.__ahkhOutlineSpyBound` and `window.__ahkhHashChangeBound`.
2. **`IntersectionObserver` lifecycle binding**: Store instance in `window.__ahkhVideoObserver` and attach `abort` listener on `__ahkhSignal` to disconnect it.
3. **Defensive cleanup at boot**: Ensure `window.__ahkhVideoObserver` is also disconnected at the top of `window.__ahkhBootReader`.
4. **Debounce timer cancellation on abort**: Clear `scrollSaveTimer` and `reminderToastTimeout` on `__ahkhSignal` abort.
5. **Pass signal to highlight click spans**: Add `{ signal: __ahkhSignal }` to lines 811 and 1146.

Detailed code diffs and implementation details are documented in `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_1\report.md`.

---

## 5. Verification Method

To independently verify the defect and the proposed fix:

1. **Verify Current Leak (Empirical Test)**:
   ```bash
   node -e "
   import('./tests/utils/dom-runtime.mjs').then(({ createVirtualBrowser, loadReaderScript }) => {
     const { window, document } = createVirtualBrowser();
     const desk = document.createElement('div');
     desk.id = 'study-desk';
     document.body.appendChild(desk);
     const bootFn = loadReaderScript(window);
     bootFn({ courseId: 'springboard-ux', lessonId: 'sb-1-0', lessonSlug: 'lesson-1' });
     document.body.removeChild(desk);
     document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
     document.dispatchEvent(new window.CustomEvent('astro:page-load'));
     console.log('Aborted:', window.__ahkhReaderAbort?.signal?.aborted); // false
   });
   "
   ```

2. **Verify Proposed Fix**:
   Execute the simulation script demonstrated in Section 6 of `report.md`. It confirms that:
   - Window listeners drop to `0` immediately after `astro:before-swap`.
   - `window.__ahkhReaderAbort` is reset to `null`.
   - Subsequent lesson navigation rehydrates fresh listeners cleanly.

3. **Repository Verification Suite**:
   ```bash
   npm run verify:scripts
   npm run test:e2e
   npm run build
   ```
