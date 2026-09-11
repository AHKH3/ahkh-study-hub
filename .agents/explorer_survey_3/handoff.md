# Handoff Report: Explorer Survey 3 (R3 & R4)

**Agent:** `teamwork_preview_explorer` (Explorer Survey 3)  
**Parent Conversation ID:** `76dabf93-dcc7-483c-9a17-34ca24201b84`  
**Date:** 2026-09-11  
**Report Artifact:** `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_3\report.md`  

---

## 1. Observation

1. **Event Listener & Timer Leakage in `public/scripts/reader.js`**:
   - `public/scripts/reader.js` lines 14–23:
     ```javascript
     var bootDeskEl = document.getElementById('study-desk');
     if (bootDeskEl && bootDeskEl.dataset.ahkhBooted) return;
     if (bootDeskEl) bootDeskEl.dataset.ahkhBooted = 'true';
     try { window.__ahkhYtPlayer?.destroy?.(); } catch (e) {}
     window.__ahkhYtPlayer = null;
     if (window.__ahkhYtTimer) { clearInterval(window.__ahkhYtTimer); window.__ahkhYtTimer = null; }
     if (window.__ahkhReaderAbort) { try { window.__ahkhReaderAbort.abort(); } catch (e) {} }
     const __ahkhSignal = (window.__ahkhReaderAbort = new AbortController()).signal;
     ```
   - `public/scripts/reader.js` lines 2057–2062:
     ```javascript
     document.addEventListener('astro:page-load', () => {
       try {
         var desk = document.getElementById('study-desk');
         if (desk && window.__ahkhBootReader) window.__ahkhBootReader(Object.assign({}, desk.dataset));
       } catch (e) {}
     });
     ```
   - There is no listener for `astro:before-swap` or handling for when `desk` is null on non-reader routes.
2. **Layout Thrashing in Highlight Gutter Cascading**:
   - `public/scripts/reader.js` lines 984–989: `getReadingContent().getBoundingClientRect()` and `span.getBoundingClientRect()` are called followed immediately by `gutterEl.style.top = ...` and a call to `cascadeGutterNotes()`.
   - Lines 1016–1025: `cascadeGutterNotes()` iterates over all notes, writing `n.style.top` and immediately reading `n.offsetHeight` in the same loop iteration.
3. **Scroll Restoration Timing Conflict**:
   - `public/scripts/reader.js` line 193: `window.scrollTo({ top: saved.scrollY, behavior: 'instant' })` is executed inside a single `requestAnimationFrame` before fonts and remote WebP images settle.
   - `src/layouts/BaseLayout.astro` line 22: `<html lang="en" class="scroll-smooth">` sets global smooth scroll behavior.
4. **Editorial Component Library Status in `src/components/`**:
   - Directory listing of `src/components/` contains only `AhkhStorage.astro`, `AhkhSyncBridge.astro`, `HubHeader.astro`, `ThemeSwitcher.astro`. Zero editorial components exist as reusable Astro/MDX components.
5. **Formatting Variance in `src/data/courses.ts`**:
   - 37 lessons parsed from `src/data/courses.ts` (5,329 lines, 345KB).
   - Only 7 lessons have blockquotes. Only 6 lessons have Socratic inquiry callouts. Only 8 lessons have comparative tables.
   - 3 lessons (`sb-6-1`, `sb-7-1`, `sb-8-1`) have no Attribution Footer at all.
   - 17 colored background fills exist (`bg-amber-50`, `bg-blue-50`, etc.), all with `data-allow-fill` attribute. Zero emojis. Zero UI double-slashes (`//`).

---

## 2. Logic Chain

1. From Observation 1: When a learner navigates from a lesson to `/courses/[course]`, `/`, `/commonplace`, or `/manifesto`, `desk` is `null`, so `__ahkhBootReader` is not invoked. Because `__ahkhReaderAbort.abort()` and `clearInterval(window.__ahkhYtTimer)` live exclusively inside `__ahkhBootReader`, the previous lesson's window listeners and 250ms YouTube timer persist indefinitely across navigation, causing CPU waste and memory leaks.
2. From Observation 2: For each note rendered during `restoreHighlightsInDOM()`, `renderGutterNote()` mutates `style.top` and triggers `cascadeGutterNotes()`, which alternates between reading layout (`offsetHeight`) and writing layout (`style.top`). This produces quadratic layout recalculations ($O(N^2)$ reflows) during lesson initialization, stalling the main thread.
3. From Observation 3: In `restoreSavedScrollPosition()`, calculating `scrollY` and scrolling within the initial RAF runs before images are decoded. If the initial height is less than `saved.scrollY`, the browser clamps the scroll to the temporary page bottom. Additionally, `<html class="scroll-smooth">` can force smooth animation, fighting Astro's ClientRouter scroll restoration.
4. From Observations 4 and 5: Because no standardized component library exists, lesson authors have copied and adapted arbitrary HTML snippets into `courses.ts`. This has caused visual divergence across all 37 lessons and led to omitted footers in 3 lessons, directly violating the single design system mandate of `AGENTS.md` and `DESIGN.md`.

---

## 3. Caveats

1. **Content Migration Dependency**: Standardizing all 37 lessons into the 5 canonical components in `courses.ts` will alter `src/data/courses.ts`. Under ADR-024 and ADR-026, the long-term architectural goal is migrating lessons to individual MDX files (`src/content/courses/<course>/<module>/<slug>/index.mdx`). Implementing the standardized framework today can either be done as Astro components inside `src/components/editorial/` or directly inside `courses.ts` raw HTML.
2. **YouTube IFrame API Initialization**: The YouTube sync engine relies on `https://www.youtube.com/iframe_api`. While the timer is cleared on route teardown, the injected external script remains cached in the browser runtime.

---

## 4. Conclusion

1. **R3 (Reader DOM Engine)** requires three immediate fixes in `public/scripts/reader.js`:
   - Attach an `astro:before-swap` listener to cleanly abort `window.__ahkhReaderAbort`, destroy `window.__ahkhYtPlayer`, clear `window.__ahkhYtTimer`, and disconnect the sentinel observer.
   - Batch gutter note measurements and cascading into a single pass using `requestAnimationFrame`.
   - Temporarily disable `scroll-smooth` during scroll position restoration, and guard against premature clamping before images/fonts settle.
2. **R4 (Editorial Framework)** requires:
   - Establishing the 5 canonical editorial component templates documented in `report.md` Section 4.
   - Adding missing attribution footers to `sb-6-1`, `sb-7-1`, and `sb-8-1`.
   - Providing reusable Astro components in `src/components/editorial/` (`Axiom.astro`, `KeyPrinciple.astro`, `SocraticCallout.astro`, `DataMatrix.astro`, `SourceAttribution.astro`).

---

## 5. Verification Method

1. **Verify Reader Script Syntax**:
   `npm run verify:scripts` (executes `node scripts/check-inline-scripts.mjs`).
2. **Verify Distribution Integrity**:
   `npm run verify:dist` (executes all 10 automated CI checks: zero emojis, zero double-slashes, no hover transforms, token locks, seven signal hues).
3. **Full Production Build**:
   `npm run build` (executes Astro static generation; asserts 0 compile errors).
4. **Memory & Listener Leak Verification**:
   Navigate between `/courses/springboard-ux/sb-1-0` and `/`, inspect `window.__ahkhReaderAbort.signal.aborted === true` and verify zero active intervals for YouTube player sync.
