# Handoff Report: Gutter Note Layout Thrashing & Mobile Touch Selection Support

**Agent:** `teamwork_preview_explorer` (Explorer M3.2)  
**Date:** 2026-09-12  
**Milestone:** M3 (Reader DOM & LocalStorage Tuning) — Items 8 & 10  
**Handoff Type:** Hard (Task complete)  
**Target Path:** `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_2\handoff.md`  

---

## 1. Observation

Direct observations from source inspection of `public/scripts/reader.js`:

1. **Quadratic Layout Thrashing in `cascadeGutterNotes()`**:
   - In `public/scripts/reader.js:1015–1025`:
     ```javascript
     function cascadeGutterNotes() {
       const notes = Array.from(document.querySelectorAll('.marginalia-gutter-note'))
         .filter((n) => n.isConnected && n.style.display !== 'none')
         .sort((a, b) => parseFloat(a.style.top || '0') - parseFloat(b.style.top || '0'));
       let floor = 0;
       notes.forEach((n) => {
         const top = Math.max(parseFloat(n.style.top || '0'), floor);
         n.style.top = `${top}px`;
         floor = top + (n.offsetHeight || 0) + 8;
       });
     }
     ```
     At line 1022, `n.style.top` is written (dirties style/layout). At line 1023, `n.offsetHeight` is read immediately, forcing a synchronous reflow for every single note in the array.
2. **Repeated Sequential Invocations During Rehydration**:
   - In `public/scripts/reader.js:1121–1158` (`restoreHighlightsInDOM()`):
     `highlights.forEach(item => { ... if (item.note) renderGutterNote(item); ... });`
   - In `public/scripts/reader.js:984–989` (`renderGutterNote(item)`):
     `const readingBox = getReadingContent().getBoundingClientRect();` (line 984, layout read)
     `const spanBox = span.getBoundingClientRect();` (line 985, layout read)
     `gutterEl.style.top = `${topPos}px`;` (line 987, layout write)
     `cascadeGutterNotes();` (line 988, inner loop over all notes in DOM)
     `gutterEl.innerHTML = ...;` (line 990, DOM write)
   - For $N$ highlights with notes, `renderGutterNote` is invoked $N$ times. Each invocation triggers an inner cascade loop over all notes currently attached.
3. **Empty Note Element Measurement**:
   - In `renderGutterNote`, `cascadeGutterNotes()` is called at line 988, whereas `gutterEl.innerHTML = ...` is set at line 990. Freshly created notes have their height read when `innerHTML` is empty (0px or padding only), producing misaligned floor offsets.
4. **Touch Device Event Void**:
   - In `public/scripts/reader.js:744–745`:
     ```javascript
     document.addEventListener('mouseup', handleTextSelection, { signal: __ahkhSignal });
     document.addEventListener('keyup', handleTextSelection, { signal: __ahkhSignal });
     ```
   - Only `mouseup` and `keyup` trigger `handleTextSelection`. Mobile touch drag releases (`touchend`) and mobile selection range adjustments (`selectionchange`) are completely unlistened to, preventing `#selection-popover` from displaying on touch devices.

---

## 2. Logic Chain

1. **Step 1 (Complexity Derivation)**:
   - From Observation 1, each invocation of `cascadeGutterNotes()` on $k$ notes forces $k$ synchronous reflows due to alternating `n.style.top` (write) and `n.offsetHeight` (read).
   - From Observation 2, `restoreHighlightsInDOM()` invokes `renderGutterNote()` $N$ times sequentially.
   - At iteration $i$, there are $i$ notes in DOM. Therefore, iteration $i$ causes $i$ synchronous reflows.
   - Summing across all $N$ notes yields $\sum_{i=1}^N i = \frac{N(N+1)}{2} = O(N^2)$ forced synchronous reflows.
   - On a lesson with 20 saved notes, opening the lesson blocks the main thread with 210 synchronous layout passes before the page can respond to user input.
2. **Step 2 (Decoupled RAF Architecture)**:
   - By decoupling DOM node creation (`ensureGutterNoteElement`) from geometric layout, all $N$ DOM elements and their `innerHTML` can be constructed upfront in $O(N)$ with zero layout reads.
   - By scheduling layout measurement via a single `requestAnimationFrame` (`batchLayoutGutterNotes`), multiple layout calls coalesce into one frame.
   - Within `batchLayoutGutterNotes`, separating reads (`getBoundingClientRect()`, `offsetHeight`) into Phase 1, calculations into Phase 2, and writes (`style.top`, `style.display`) into Phase 3 ensures that all reads occur against a clean layout tree, collapsing the total reflow count from $O(N^2)$ down to $O(1)$.
3. **Step 3 (Touch Event Parity)**:
   - From Observation 4, mobile devices do not dispatch mouse events when selecting text.
   - Adding `touchend` with a 60ms settling delay allows iOS Safari and Android Chrome to finalize selection bounding boxes.
   - Adding `selectionchange` with a 200ms debounce allows smooth grabber dragging without popover jitter, while immediate dismissal on collapsed selection ensures the popover disappears cleanly when the user taps away.

---

## 3. Caveats

- Gutter marginalia is intentionally hidden on screens $< 1280\text{px}$ width via CSS (`@media (max-width: 1279px) { .marginalia-gutter-note { display: none !important; } }`). Mobile touch users interact with notes via the inline highlight options popover and the `#note-dialog` modal, not the desktop gutter.
- While the batch layout pass reduces reflows to $O(1)$, on extremely long lessons with 100+ highlights, DOM text search in `findRangeForTextInElement` remains CPU-bound. However, text search does not trigger layout reflows and is fast in memory.

---

## 4. Conclusion

The layout thrashing in `public/scripts/reader.js` and the lack of mobile touch selection support are fully diagnosed with exact root causes and locations identified. The proposed decoupled architecture:
1. Eliminates the $O(N^2)$ reflow bottleneck during lesson load, transcript view toggle, and window resize, replacing it with a single, coalesced $O(1)$ RAF pass.
2. Resolves the sizing inversion bug where empty note containers were measured before content injection.
3. Provides complete touch device selection parity across iOS Safari and Android Chrome via `touchend`, debounced `selectionchange`, and touch dismiss listeners.

A full technical report and replacement blueprint is available at:  
`c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_2\report.md`

---

## 5. Verification Method

To independently verify these findings:
1. **Source Code Inspection**:
   - Inspect `public/scripts/reader.js` at lines 744–745, 956–1049, 1121–1158, and 1829–1830.
2. **Layout Thrashing Reproduction**:
   - Open any lesson in Chrome DevTools with CPU throttling enabled (4x slowdown).
   - In console, inject 20 sample highlights with notes into `AhkhStorage.set('ahkh_hl_springboard-ux_sb-1-0', ...)` and reload.
   - Record a Performance profile: note the repeated "Forced reflow" warnings inside `cascadeGutterNotes`.
3. **Mobile Touch Selection Reproduction**:
   - In Chrome DevTools, toggle Device Mode (iPhone or Pixel).
   - Attempt to select text in `#formatted-view`.
   - Observe that `#selection-popover` never appears because `mouseup` is never fired by touch grabbers.
4. **Post-Implementation Test**:
   - Run `npm run build` to confirm zero syntax or bundling regressions.
