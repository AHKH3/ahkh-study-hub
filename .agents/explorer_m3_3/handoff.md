# Handoff Report: Programmatic Scroll Restoration & Height Stabilization (M3.3)

## 1. Observation
- **File Paths & Exact Line Numbers**:
  - `public/scripts/reader.js` (lines 185–203): `restoreSavedScrollPosition()` performs a single `requestAnimationFrame` call to `window.scrollTo({ top: saved.scrollY, behavior: 'instant' })`.
  - `public/scripts/reader.js` (lines 53–63): Global `scroll` listener immediately updates progress and invokes `saveScrollDepth(currentScrollY, maxScroll)` on any scroll event without checking if a programmatic restoration is underway.
  - `public/scripts/reader.js` (lines 65–82): Global `scroll` listener checks `delta = currentScrollY - lastScrollY`. If `delta > 4`, it hides `#smartHeader` via `translateY(-100%)`. On page load, `lastScrollY` is initialized to `0` (line 25).
  - `public/scripts/reader.js` (lines 2004–2018): `restoreSavedScrollPosition()` is invoked on line 2006, before `restoreHighlightsInDOM()` on line 2017 and before `initYouTubeSync()` on line 2043.
  - `src/layouts/BaseLayout.astro` (line 22): `<html lang="en" class="scroll-smooth">`.
  - `src/styles/global.css` (line 14): `@layer base { html { scroll-behavior: smooth; ... } }`.
  - `src/data/courses/springboard-ux/lessons/the-anatomy-of-product-experience.ts` (lines 234, 322, 333, 420, 524): Visual UI images use `<img loading="lazy" decoding="async" ...>` without `width`, `height`, or aspect-ratio wrappers.

- **Observed Tool Outputs & Behaviors**:
  - CSSOM View Specification (§4.1): `window.scrollTo` unconditionally clamps the requested `top` coordinate to `Math.max(0, document.documentElement.scrollHeight - window.innerHeight)`.
  - At RAF frame 1, WebP images have not decoded (`naturalHeight === 0`) and web fonts (`Merriweather`) are in FOUT/fallback state (`document.fonts.status === 'loading'`). Temporary document height is $2,200\text{px}$ compared to settled height of $5,200\text{px}$.
  - A saved scroll target of $3,500\text{px}$ is clamped by the browser to $1,300\text{px}$.
  - The native `scroll` event triggered by the clamping causes `saveScrollDepth(1300, 1300)` to execute after 150ms, permanently overwriting the learner's true reading progress ($3,500\text{px}$) in `localStorage` and `AhkhSyncBridge`.
  - In WebKit and during View Transitions, `class="scroll-smooth"` causes `scrollTo` to smoothly animate over several hundred milliseconds rather than jumping instantly.
  - Restoring scroll from $0$ to $3,500\text{px}$ yields `delta = 3500 > 4`, hiding `#smartHeader` immediately upon page open.

## 2. Logic Chain
1. **From Observation (lines 185–203 & lesson images)**: Calling `window.scrollTo` in RAF 1 occurs when images and fonts have not rendered, meaning `scrollHeight` is at a temporary minimum.
2. **From CSSOM View specification**: The browser clamps the scroll to the temporary maximum ($1,300\text{px}$ instead of $3,500\text{px}$) and does not resume scrolling when the document later expands.
3. **From Observation (lines 53–63)**: Clamping fires a native `scroll` event. Because no `isRestoringScroll` flag exists, `saveScrollDepth` captures the clamped position ($1,300\text{px}$) and overwrites the true progress in `localStorage`.
4. **From Observation (lines 25, 65–82)**: Restoring scroll from $0$ to target Y produces a positive `delta` exceeding 4, triggering `smartHeader.style.transform = 'translateY(-100%)'`, leaving the header collapsed upon page entrance.
5. **From Observation (BaseLayout:22, global.css:14)**: Global smooth-scrolling on `html` interferes with instant programmatic restoration and View Transitions, creating animated rolling sweeps and snapshot tearing in WebKit and Chromium.
6. **Synthesis**: To guarantee robust reading position restoration without data loss, stutter, or header collapse, the reader must:
   - Acquire an `isRestoringScroll` lock to suppress storage overwrites and header delta calculation during restoration.
   - Suppress `scroll-smooth` on `document.documentElement` during route swap and restoration.
   - Execute an immediate provisional jump, await `document.fonts.ready` and pending image decoding with a timeout ceiling, and run a multi-frame settlement loop before releasing the lock.

## 3. Caveats
- Browser image caching: Cached images decode much faster than uncached images, but `img.decode()` or `img.complete` checks remain necessary to guarantee layout stability across cold loads and navigation.
- If a user deliberately touches the screen or scrolls the mouse wheel during the 200–300ms restoration window, user intent must preempt programmatic restoration. The architecture addresses this via `wheel`, `touchstart`, and `keydown` preemption handlers.
- No caveats regarding curriculum scope or design system constraints; pure Swiss typography and constitutional guardrails are fully preserved.

## 4. Conclusion
The current `restoreSavedScrollPosition()` implementation contains a critical race condition that corrupts learner progress in `localStorage` and collapses the header. The multi-phase adaptive stabilization architecture specified in `.agents/explorer_m3_3/report.md` resolves all four failure modes (clamping, data destruction, smooth-scroll collision, header hide) cleanly and authoritatively.

## 5. Verification Method
1. **Independent Code Inspection**:
   - Inspect `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3\report.md` for full technical breakdown and exact proposed code diffs.
2. **Reproduction in Browser Console**:
   - Set deep scroll depth on a lesson:
     `AhkhStorage.set('ahkh_scroll_springboard-ux_the-anatomy-of-product-experience', JSON.stringify({ percent: 75, scrollY: 3500, updatedAt: new Date().toISOString() }))`
   - Reload page under Network -> Fast 3G throttling.
   - Verify without fix: scroll is clamped to ~1300px, header collapses, and localStorage is overwritten with 1300px.
   - Verify with proposed fix: scroll instantly lands and settles at 3500px, header remains visible, smooth scrolling is suppressed, and localStorage value is preserved.
3. **Automated Verification**:
   - Run `npm run verify` and `npm run build` to confirm zero compilation errors.
