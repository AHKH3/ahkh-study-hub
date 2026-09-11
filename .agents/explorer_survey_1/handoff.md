# Handoff Report: Survey of R1 & R5

**Agent:** `teamwork_preview_explorer` (explorer_survey_1)  
**Recipient:** `parent` (ID: `76dabf93-dcc7-483c-9a17-34ca24201b84`)  
**Type:** Hard Handoff (Investigation Complete)  
**Date:** 2026-09-11  

---

## 1. Observation

1. **Astro ClientRouter Presence**:
   - `src/layouts/BaseLayout.astro:3`: `import { ClientRouter } from 'astro:transitions';`
   - `src/layouts/BaseLayout.astro:36`: `<ClientRouter fallback="animate" />`
   - `src/styles/global.css:556-578`: Keyframe `ahkh-rule-reveal` defines a 280ms cubic-bezier horizontal clip wipe on `::view-transition-new(root)`. `::view-transition-group(hub-header)` has `animation: none`.
2. **Zero Prefetching**:
   - `astro.config.mjs:1-9`: No `prefetch` configuration.
   - Grep for `data-astro-prefetch` across `src/`: 0 occurrences.
   - `node_modules/astro/dist/types/public/config.d.ts:1903-1960`: In Astro 5, `<ClientRouter />` enables the prefetch runtime, but only prefetches links with `data-astro-prefetch` unless `prefetch: { prefetchAll: true }` is enabled in `astro.config.mjs`.
3. **Script Lifecycle & Event Registration**:
   - `src/pages/courses/[course]/index.astro:400`: `document.addEventListener('astro:page-load', initModuleAccordions);` is called in an inline script on every visit without an `AbortController` or guard flag.
   - `src/pages/index.astro:186-189`: `document.addEventListener('astro:page-load', refreshLibraryProgress)` is guarded with `window.__ahkhLibBoot`, remaining active for every subsequent page transition.
   - `src/layouts/BaseLayout.astro:42`: `{readerLib && <script is:inline src={path('/scripts/reader.js')}></script>}` conditionally injects `reader.js` on reader routes.
   - `public/scripts/reader.js:2057-2062`: `reader.js` registers `document.addEventListener('astro:page-load', ...)` to boot, but if `reader.js` finishes loading after `astro:page-load` fires during a client swap, the inline boot in `[slug].astro:909` failed at parse time and `astro:page-load` has already passed.
4. **Scroll Restoration**:
   - `node_modules/astro/dist/transitions/router.js:35-42`: Astro ClientRouter natively records `(scrollX, scrollY)` in `history.state` and sets `history.scrollRestoration = "manual"`. On history traversal (`popstate`), it restores `scrollTo(historyState.scrollX, historyState.scrollY)`.
   - `public/scripts/reader.js:185-203`: Custom `restoreSavedScrollPosition()` reads `ahkh_scroll_${courseId}_${lessonSlug}` from `localStorage` and restores it in `requestAnimationFrame`.
5. **Build & Constitution Verification**:
   - `npm run build` completed cleanly in 6.54s, generating 42 static HTML routes in `dist/`.
   - `npm run verify` passed all 11 checks (zero emojis, zero `//`, zero broken base paths, zero high-contrast dark blocks, zero whole-element translations, 100% compliance with seven signal hues).
   - `src/utils/paths.ts` wraps 100% of internal links with `path(...)`.
   - `extracted_full_pdf.txt` in repository root is an unreferenced 10.7KB scratch file.

---

## 2. Logic Chain

1. **Why Navigation Feels Less Than Instant (<100ms)**:
   - Because prefetching is not enabled globally or on links, clicking an `<a>` tag forces Astro's router to fetch the target HTML over the network or local server via `fetchHTML()` before `doSwap()` can proceed.
   - Adding `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` in `astro.config.mjs` and `data-astro-prefetch="hover"` on navigation anchors will ensure HTML documents are already in browser cache before the click finishes, eliminating latency.
2. **Why Stacking Listeners Matter for SPA Longevity**:
   - Because `initModuleAccordions` in `courses/[course]/index.astro` is re-added to `document` on every visit, browsing back and forth between course pages and lessons will cause multiple accordion handlers to trigger on every future page load.
   - Wrapping page-level listeners in `AbortController` (as done in `manifesto.astro` line 369 and `commonplace.astro` line 246) ensures zero listener leaks.
3. **Why Reader Boot Race Condition Occurs**:
   - Moving from `/` to a lesson causes Astro to inject `<script is:inline src="/scripts/reader.js">`.
   - If network or disk delay prevents `reader.js` from executing synchronously before the inline `[slug].astro` snippet runs, `window.__ahkhBootReader` is undefined at snippet time.
   - Adding an immediate execution check at the end of `reader.js` guarantees it self-initializes if `#study-desk` is present and unbooted.

---

## 3. Caveats

1. **Scope Boundary Honored**: As a read-only explorer, no application code files have been modified.
2. **Data Splitting (R2)**: Refactoring `courses.ts` and `transcripts.json` is scoped to peer tasks, though prefetching speed directly benefits once lesson HTML bundles are smaller.
3. **Browser Speculation Rules**: Astro 5 supports experimental `clientPrerender` via the Speculation Rules API. This is not strictly necessary for sub-100ms transitions and requires Chromium support, so standard hover-based prefetching is recommended.

---

## 4. Conclusion

The technical architecture for R1 and R5 is clear, scoped, and immediately actionable:
1. Enable `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` in `astro.config.mjs` and add `data-astro-prefetch="hover"` to key navigation links.
2. Harden script lifecycles in `courses/[course]/index.astro` and `index.astro` with `AbortController` or one-time registration guards.
3. Add a fallback self-boot check in `public/scripts/reader.js` to eliminate the dynamic script race condition.
4. Prune `extracted_full_pdf.txt` from repository root.

---

## 5. Verification Method

To independently verify all findings:
1. **Prefetch Audit**:
   `rg "data-astro-prefetch" src/` -> Returns 0 results.
   `rg "prefetch" astro.config.mjs` -> Returns 0 results.
2. **Listener Audit**:
   `rg "addEventListener\('astro:page-load'" src/` -> Inspect lines in `courses/[course]/index.astro:400` and `index.astro:188`.
3. **Build & Test**:
   Run `npm run build` -> Confirms 42 pages built cleanly.
   Run `npm run verify` -> Confirms all 11 constitutional checks pass with 0 errors.
4. **Report File**:
   Inspect `c:/Users/abdel/dev/ahkh-study-hub/.agents/explorer_survey_1/report.md`.
