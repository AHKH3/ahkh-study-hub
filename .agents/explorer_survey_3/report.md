# Technical Investigation Report: Reader DOM Engine Tuning (R3) & Standardized Lesson Formatting Framework (R4)

**Agent:** `teamwork_preview_explorer` (Explorer Survey 3)  
**Date:** 2026-09-11  
**Scope:** R3 (Reader DOM Engine & Local Storage High-Performance Tuning) & R4 (Standardized Lesson Content Formatting Framework)  
**Repository:** `AHKH Study Hub` (`C:/Users/abdel/dev/ahkh-study-hub`)  
**Status:** Complete Read-Only Investigation  

---

## 1. Executive Summary

AHKH Study Hub features a sophisticated client-side reader architecture with continuous scroll persistence, 7-color text highlighting, interactive marginalia, synchronized YouTube transcript cues, and an intentional 4-state reading lifecycle (ADR-018). However, this investigation reveals several critical runtime bottlenecks:

1. **Severe Event Listener & Timer Leakage on Navigation**: Navigating away from a lesson page to a non-reader page (`/`, `/commonplace`, `/manifesto`, `/courses/[course]`) fails to trigger the `AbortController` teardown in `public/scripts/reader.js`. Global `window` scroll, keydown, and resize listeners, along with a 250ms interval YouTube sync timer, remain permanently active in the background.
2. **Layout Thrashing During Highlight Rehydration**: Restoring saved highlights and gutter sidenotes on lesson mount executes an $O(H \times B)$ DOM text search and triggers alternating geometric reads (`getBoundingClientRect()`, `offsetHeight`) and style writes (`style.top`) in a tight loop inside `cascadeGutterNotes()`, forcing multiple synchronous reflows.
3. **Scroll Restoration Clamping & Visual Jumps**: Restoring scroll depth via `requestAnimationFrame` before layout stability (prior to font and image rendering) clamps scroll position prematurely on long lessons, exacerbated by smooth-scroll conflicts from `<html class="scroll-smooth">`.
4. **Complete Absence of Dedicated Editorial Components**: No Astro components exist in `src/components/` for the 5 mandated editorial components. All 37 lessons store raw HTML strings inside a monolithic 345KB `courses.ts` file, leading to wide formatting drift, missing attribution footers on 3 lessons, and divergent table and quote styles.

---

## 2. Technical Audit: R3. Reader DOM Engine & Local Storage Tuning

### 2.1. Reader Architecture & Boot Orchestration Overview

The reader operates across three key layers:
- **`src/pages/courses/[course]/[slug].astro`**: Statically generates routes via `getStaticPaths()`. Passes per-page metadata (`courseId`, `lessonId`, `lessonSlug`, etc.) via HTML5 `data-*` attributes on the `#study-desk` container. Contains a tiny inline boot script.
- **`src/layouts/BaseLayout.astro`**: Hosts `<ClientRouter fallback="animate" />`, loads font stylesheets, renders `<AhkhStorage />` and `<AhkhSyncBridge />`, and conditionally includes `/scripts/reader.js`.
- **`public/scripts/reader.js`**: Loaded once per session. Defines `window.__ahkhBootReader(vars)`. Manages smart header retreat, scroll depth tracking, highlight restoration, inline and gutter sidenotes, floating selection popover, and YouTube playback synchronization.

### 2.2. Identified Performance Bottlenecks & Diagnostics

#### Defect 1: Event Listener & Timer Leakage Across Navigation to Non-Reader Pages (Critical)
- **Observation**:
  - In `public/scripts/reader.js` (lines 8–23):
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
  - In `public/scripts/reader.js` (lines 2057–2062):
    ```javascript
    document.addEventListener('astro:page-load', () => {
      try {
        var desk = document.getElementById('study-desk');
        if (desk && window.__ahkhBootReader) window.__ahkhBootReader(Object.assign({}, desk.dataset));
      } catch (e) {}
    });
    ```
- **Logic Chain & Impact**:
  1. `__ahkhBootReader` is guarded by `if (desk)`. On non-reader pages (`/`, `/courses/[course]`, `/manifesto`, `/commonplace`), `desk` is `null`.
  2. Therefore, when navigating from a lesson to the Library or Course page, `__ahkhBootReader` never runs.
  3. `window.__ahkhReaderAbort.abort()` is **NEVER called**.
  4. The previous lesson's `window` scroll listener, `window` resize listener, `window` keydown listener (handling `[`, `]`, `z`), and `window.__ahkhYtTimer` (250ms polling interval) continue running on the non-reader pages!
  5. Furthermore, `IntersectionObserver` on `#video-scroll-sentinel` (line 1541) has no disconnect handler attached to `__ahkhSignal`.
- **Prescribed Fix**:
  Add an explicit cleanup listener in `reader.js` for Astro navigation lifecycle:
  ```javascript
  document.addEventListener('astro:before-swap', () => {
    if (window.__ahkhReaderAbort) {
      try { window.__ahkhReaderAbort.abort(); } catch (e) {}
      window.__ahkhReaderAbort = null;
    }
    try { window.__ahkhYtPlayer?.destroy?.(); } catch (e) {}
    window.__ahkhYtPlayer = null;
    if (window.__ahkhYtTimer) {
      clearInterval(window.__ahkhYtTimer);
      window.__ahkhYtTimer = null;
    }
  });
  ```

#### Defect 2: Layout Thrashing During Highlight Rehydration & Gutter Positioning
- **Observation**:
  - `restoreHighlightsInDOM()` (lines 1122–1158) iterates through all saved highlights. For each highlight with a marginal note, it invokes `renderGutterNote(item)`.
  - In `renderGutterNote` (lines 984–989):
    ```javascript
    const readingBox = getReadingContent().getBoundingClientRect(); // READ (Forced reflow)
    const spanBox = span.getBoundingClientRect();                   // READ (Forced reflow)
    const topPos = Math.max(0, spanBox.top - readingBox.top);
    gutterEl.style.top = `${topPos}px`;                             // WRITE (Invalidate layout)
    cascadeGutterNotes();                                           // Nested loop
    ```
  - In `cascadeGutterNotes` (lines 1016–1025):
    ```javascript
    notes.forEach((n) => {
      const top = Math.max(parseFloat(n.style.top || '0'), floor);
      n.style.top = `${top}px`;               // WRITE
      floor = top + (n.offsetHeight || 0) + 8; // READ (Forced reflow)
    });
    ```
- **Logic Chain & Impact**:
  1. For a lesson with $N$ notes, `cascadeGutterNotes()` is called $N$ times sequentially during initialization.
  2. In every call, it iterates over all existing notes, alternating `n.style.top` (write) and `n.offsetHeight` (read).
  3. This generates $O(N^2)$ forced synchronous layout calculations during lesson boot, creating observable frame drops and TTI delays on long lessons.
- **Prescribed Fix**:
  - Decouple gutter note creation from layout cascading.
  - Render all gutter note DOM elements first.
  - Perform a single batch pass for layout measurement and cascading inside a single `requestAnimationFrame` callback.

#### Defect 3: Scroll Restoration Timing, Document Height Clamping & CSS Smooth-Scroll Conflict
- **Observation**:
  - In `restoreSavedScrollPosition()` (lines 185–203):
    ```javascript
    requestAnimationFrame(() => {
      window.scrollTo({ top: saved.scrollY, behavior: 'instant' });
      ...
    });
    ```
  - In `src/layouts/BaseLayout.astro` (line 22):
    `<html lang="en" class="scroll-smooth">`
- **Logic Chain & Impact**:
  1. When opening a long lesson with images or diagrams, `requestAnimationFrame` executes before remote/local WebP images have fully decoded and rendered.
  2. If the initial DOM height before images render is 2,200px, but `saved.scrollY` is 3,500px, the browser clamps the scroll to the temporary maximum (~1,400px).
  3. Once images decode and expand the document height to 6,000px, the user remains stuck at 1,400px instead of their saved 3,500px reading point.
  4. Furthermore, on browsers strictly honoring `<html class="scroll-smooth">`, calling `window.scrollTo` can trigger a visible multi-second scrolling animation instead of an instant position restore.
- **Prescribed Fix**:
  - Temporarily remove `scroll-smooth` during position restoration: `document.documentElement.classList.remove('scroll-smooth')` and restore it after settling.
  - Use `document.fonts.ready` and image readiness checks / `ResizeObserver` on `#center-reading-column` to verify height stabilization before finalizing restored scroll depth.

#### Defect 4: Touch Device Text Selection Affordance Gap
- **Observation**:
  - Text selection popover listeners (lines 744–746):
    ```javascript
    document.addEventListener('mouseup', handleTextSelection, { signal: __ahkhSignal });
    document.addEventListener('keyup', handleTextSelection, { signal: __ahkhSignal });
    ```
- **Logic Chain & Impact**:
  - Mobile Safari and Chromium for Android rely on `touchend` and `selectionchange` events rather than standard mouse events when manipulating native selection grabbers.
  - As a result, selecting text on mobile devices frequently fails to reveal the `#selection-popover`, blocking mobile users from highlighting and taking sidenotes.
- **Prescribed Fix**:
  Bind `touchend` and a debounced `selectionchange` listener to `handleTextSelection`.

### 2.3. LocalStorage & ADR-018 4-State Reading Lifecycle Verification

The reader faithfully implements the four distinct states of ADR-018:
1. `new`: Lesson unopened (`text-blue-700 dark:text-blue-400`, `bg-blue-600 dark:bg-blue-400`).
2. `explored`: Opened and browsed; records `ahkh_opened_${courseId}_${lessonSlug}` (`text-purple-700 dark:text-purple-400`, `bg-purple-600 dark:bg-purple-400`).
3. `reading`: Explicit study mode initiated by clicking "Start Reading"; records start timestamp `ahkh_reading_${courseId}_${lessonSlug}` (`text-amber-700 dark:text-amber-400`, `bg-amber-600 dark:bg-amber-400`).
4. `completed`: Explicitly finished via `#toggle-lesson-completed-btn`; records `ahkh_read_${courseId}_${lessonSlug}` (`text-emerald-700 dark:text-emerald-400`, `bg-emerald-600 dark:bg-emerald-400`).

**Key Integrity Checks**:
- Implicit completion on scroll depth is **strictly prevented** (zero auto-completion logic exists).
- Highlighting while in `explored` state triggers the polite reminder toast `#explored-reminder-toast` without blocking the highlight.
- **Storage Key Naming Audit**:
  - Highlights use `ahkh_hl_${courseId}_${lessonId}` (using `lesson.id`, e.g. `sb-1-0`).
  - Lifecycle & scroll use `ahkh_scroll_${courseId}_${lessonSlug}`, `ahkh_opened_...`, etc. (using `lesson.slug`).
  - Both keys are deterministic and unique. Any future migration must preserve this schema to avoid wiping learner study history.

---

## 3. Technical Audit: R4. Standardized Lesson Content Formatting Framework

### 3.1. Audit of Current Components and Monolithic Structure

- **Monolithic Data File**: All 37 lessons of the Springboard UX curriculum are stored inside `src/data/courses.ts` (5,329 lines, 345,687 bytes), with complete lesson markup embedded as template strings in `contentHtml`.
- **Zero Reusable Editorial Astro Components**: `src/components/` contains only structural utilities (`AhkhStorage.astro`, `AhkhSyncBridge.astro`, `HubHeader.astro`, `ThemeSwitcher.astro`). There are **no component definitions** for Pullout Quotes, Synthesis Cards, Socratic Callouts, Comparative Tables, or Attribution Footers.
- **Formatting Variance Audit Across All 37 Lessons**:
  - **Pullout Axiom**: Found in only 7 of 37 lessons. Formatting varies from `<svg>` icons in footers (`sb-1-0`) to plain em-dash typography (`sb-1-1`).
  - **Socratic Callout**: Found in only 6 of 37 lessons. Header text varies between "Reflection Inquiry" (`<p>`) and "Inquiry for Reflection" (`<div>`).
  - **Comparative Data Matrix**: Found in 8 lessons. Table styling is inconsistent (some use `border-y`, some `border`, some omit font definitions).
  - **Attribution Footer**: Missing entirely in 3 lessons (`sb-6-1`, `sb-7-1`, `sb-8-1`). Across the remaining 34 lessons, 4 divergent layouts exist (ranging from avatar cards to plain text links).

### 3.2. Constitutional Compliance Verification (AGENTS.md & DESIGN.md)

| Rule | Requirement | Audited State in Codebase | Verdict |
|---|---|---|---|
| **Canvas Purity** | Pure White `#FFFFFF` canvas, `#FAFAFA` surfaces | Light canvas strictly `#FFFFFF` (`bg-white`), rules neutral `#E4E4E7` | **100% Compliant** |
| **Zero Emojis** | Ban all Unicode emojis | 0 emojis in `courses.ts`, `reader.js`, or templates | **100% Compliant** |
| **Zero Double Slashes (`//`)** | No `//` in UI text, headings, or prose | 0 occurrences in content (only in `https://` URLs) | **100% Compliant** |
| **Seven Signal Hues (ADR-030)** | Pure text-only (600–700 light / 400 dark); zero bg fills | 17 colored fills exist in `courses.ts`, but ALL 17 carry `data-allow-fill` per §7.8 depiction exception (sticky notes & mock cells) | **100% Compliant** |
| **Tactile Low-Contrast States** | No solid black blocks (`bg-ink`) on active controls | Active controls use `bg-paper-200/90`, overlays use `bg-white` | **100% Compliant** |
| **Hover Movement Ban (ADR-017)**| No whole-element translation/scale on hover | Only nested SVG chevron nudges; elements stay grounded | **100% Compliant** |

---

## 4. Specification: Standardized Editorial Formatting Framework

To enforce complete visual uniformity, eliminate agent drift, and prepare for Content Collections / MDX migration (ADR-024/ADR-026), all lesson content must adhere to this standardized framework:

### 4.1. The 5 Standardized Editorial Components

#### 1. The Pullout Axiom (Blockquote)
- **Role**: Foundational principle, core philosophy, or author thesis statement (maximum 1–2 per lesson).
- **Canonical Snippet**:
  ```html
  <blockquote class="my-8 sm:my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
    <p>"Good design does not begin with graphics or code. It begins with curiosity about how real people live, where they struggle, and how a thoughtful tool can make their day easier."</p>
    <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
      &mdash; Dieter Rams, Ten Principles for Good Design
    </footer>
  </blockquote>
  ```
- **Rules**: Zero icons in the footer; em-dash `&mdash;` typography; font-mono uppercase tracking-widest attribution; pure text color only.

#### 2. The Key Principle / Synthesis Card
- **Role**: Highlighting a critical heuristic, mental model, or takeaway summary.
- **Canonical Snippet**:
  ```html
  <div class="my-8 p-5 sm:p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs not-prose">
    <div class="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
      <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span>Key Principle 01</span>
    </div>
    <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">
      Recognition Over Recall
    </h4>
    <p class="font-serif text-sm leading-relaxed text-ink/85 dark:text-dark-ink/85">
      Minimize the user's memory load by making elements, actions, and options clearly visible across surfaces.
    </p>
  </div>
  ```
- **Rules**: Must carry `not-prose`; kicker uses single editorial accent `text-teal-700 dark:text-teal-400`; border is solid `border-ink-border`; zero colored background fills.

#### 3. The Socratic Callout (Study Inquiry & Reflection)
- **Role**: Self-examination prompt, critical inquiry, or reflection challenge for the learner.
- **Canonical Snippet**:
  ```html
  <aside class="my-8 p-5 sm:p-6 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose space-y-2">
    <div class="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-2">
      Inquiry for Reflection
    </div>
    <p class="font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink">
      How would your primary user's mental model break if you swapped global navigation from horizontal tabs to a left hierarchical drawer?
    </p>
  </aside>
  ```
- **Rules**: Uses semantic `<aside>`; kicker is strictly "Inquiry for Reflection" in `text-teal-700 dark:text-teal-400 font-mono font-bold uppercase tracking-wider`; body is `font-serif`.

#### 4. The Comparative Data Matrix (Table)
- **Role**: Side-by-side contrast of models, heuristics, pros/cons, or phases.
- **Canonical Snippet**:
  ```html
  <div class="my-8 overflow-x-auto not-prose">
    <table class="w-full text-left text-sm font-sans border-collapse border-t border-b border-ink-border dark:border-dark-border">
      <thead>
        <tr class="border-b border-ink-border dark:border-dark-border text-xs sm:text-sm font-mono uppercase tracking-widest font-bold text-ink dark:text-dark-ink">
          <th class="py-3.5 pr-4">Dimension</th>
          <th class="py-3.5 px-4">Generative Inquiry</th>
          <th class="py-3.5 pl-4">Evaluative Usability</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60 text-ink/85 dark:text-dark-ink/85 font-serif">
        <tr>
          <td class="py-3.5 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted font-sans">Primary Goal</td>
          <td class="py-3.5 px-4">Discover unmet user needs and mental models</td>
          <td class="py-3.5 pl-4">Validate task completion and error rates</td>
        </tr>
      </tbody>
    </table>
  </div>
  ```
- **Rules**: Wrapped in `overflow-x-auto not-prose`; top/bottom 1px border; header row is uppercase `font-mono tracking-widest`; body rows divided by `divide-ink-border/60`.

#### 5. The Source Attribution Footer
- **Role**: Academic citation linking to the authoritative original publication or video lecture at the conclusion of every lesson.
- **Canonical Snippet**:
  ```html
  <div class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted gap-4">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 dark:text-teal-400 block mb-0.5">Source Citation</span>
      <span>Adapted for sovereign study from <em>[Title of Work]</em> by <strong>[Author / Organization]</strong>.</span>
    </div>
    <a 
      href="[URL]" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="font-mono text-xs border border-ink-border/80 dark:border-dark-border px-3 py-1.5 rounded-xs bg-paper-50 dark:bg-dark-card text-ink dark:text-dark-ink hover:bg-paper-100 dark:hover:bg-dark-surface shrink-0 flex items-center gap-1 transition-colors"
    >
      <span>Read original source</span>
      <span>&nearr;</span>
    </a>
  </div>
  ```
- **Rules**: Placed at the very end of lesson content before the reader navigation footer; teal kicker; clean bibliographic citation; external link with `&nearr;` (`↗`).

### 4.2. Video Transcript Timestamp Sync Blocks
For all video lessons, paragraph containers must maintain synchronized timestamp hooks:
```html
<div data-timestamp="124" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
  <p class="font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink">
    Lecture segment content...
  </p>
</div>
```
When active, the player engine attaches `yt-active-paragraph` (`bg-paper-50 dark:bg-dark-card border-rose-600 shadow-[0_0_0_1px_#E11D48]`).

---

## 5. Architectural Implementation Roadmap

1. **Reader Teardown & Lifecycle Isolation (Immediate)**:
   - Attach an `astro:before-swap` listener in `public/scripts/reader.js` to unconditionally call `abort()`, destroy `window.__ahkhYtPlayer`, and clear `window.__ahkhYtTimer`.
   - Add `disconnect()` to the `IntersectionObserver` on `#video-scroll-sentinel`.
2. **Batch Layout Rehydration (Immediate)**:
   - Refactor `renderGutterNote` and `cascadeGutterNotes` in `reader.js` so that DOM node injection occurs in a single loop, and layout measurements occur once via `requestAnimationFrame`.
3. **Scroll Restoration Hardening (Immediate)**:
   - Temporarily remove `scroll-smooth` during position restoration to prevent browser scroll lag.
   - Guard against early restoration by verifying height stability.
4. **Editorial Components Framework Implementation (Framework Lane)**:
   - Create dedicated Astro/MDX components in `src/components/editorial/`:
     - `Axiom.astro`
     - `KeyPrinciple.astro`
     - `SocraticCallout.astro`
     - `DataMatrix.astro`
     - `SourceAttribution.astro`
   - Repair the missing footers on lessons `sb-6-1`, `sb-7-1`, and `sb-8-1`.
   - Standardize all 37 lessons to conform to the 5 canonical templates.

---
