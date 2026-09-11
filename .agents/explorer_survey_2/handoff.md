# Handoff Report: R2 Data Splitting & Lazy-Loaded Course Bundles

**Agent Identity:** teamwork_preview_explorer (Survey Explorer 2)  
**Parent Conversation ID:** 76dabf93-dcc7-483c-9a17-34ca24201b84  
**Date:** 2026-09-11  
**Handoff Type:** Hard (Task Complete)  

---

## 1. Observation

1. **`src/data/courses.ts` Size & Composition:**
   - File size: 345,565 bytes (337.47 KB) across 5,329 lines of TypeScript code.
   - Contains 1 course (`springboard-ux`), 8 modules, 37 lessons.
   - Inlined `contentHtml` across 37 lessons totals 273,967 bytes (267.55 KB), representing **79.28%** of the file's total bytes.
   - Non-HTML metadata, structure, and TypeScript types total 71,598 bytes (69.92 KB).
2. **`src/data/transcripts.json` Size & Composition:**
   - File size: 96,968 bytes (94.70 KB).
   - Contains 16 YouTube video caption tracks with 563 total cue objects.
   - Largest transcripts: `U9ZG19XTbd4` (10.35 KB), `ebzQXHIMZu0` (9.52 KB), `qwCEZ1lRkHo` (6.70 KB).
3. **Route Data Over-fetching:**
   - `src/pages/index.astro` (line 4: `import { COURSES ... }`) consumes only course-level metadata and lesson slugs for `data-lessons` (~2.08 KB required; 99.4% unused).
   - `src/pages/courses/[course]/index.astro` (line 4: `import { COURSES ... }`) consumes course metadata, module titles, and lesson titles/durations (~16.77 KB required; 95.1% unused). It accesses zero bytes of `contentHtml`.
   - `src/pages/courses/[course]/[slug].astro` (lines 3–4: `import { COURSES ... }` and `import TRANSCRIPTS ...`) passes the entire monolithic `course` object (holding all 37 lessons and all 267.55 KB of `contentHtml`) to `props.course` across all 37 route paths generated in `getStaticPaths`. Across 37 routes, this creates ~12.8 MB of in-memory duplicate props references.
   - In `[slug].astro`, `course.modules` is only used inside `getStaticPaths` on line 13 to flatten the lesson list; the page template uses only `{ id, slug, title, theme }` (~150 bytes).
4. **HTML Output & ClientRouter DOM Bloat:**
   - In `dist/courses/springboard-ux/how-do-you-break-into-ux-design/index.html` (192,212 bytes), 127,982 bytes (66.59%) is taken up by 102 server-rendered transcript cue blocks and inline SVGs under `#transcript-view`, which is `hidden` by default.
   - Total static build output (`npm run build`) generates 45 files totaling 3,777.13 KB.

---

## 2. Logic Chain

1. **Premise 1:** In an editorial study hub, lesson prose (`contentHtml`) is only displayed when viewing an individual lesson reader route (`[slug].astro`).
2. **Premise 2:** Neither `index.astro` nor `[course]/index.astro` renders `contentHtml`, yet both currently load the full 345 KB `courses.ts` into memory during static evaluation.
3. **Premise 3:** In `[slug].astro`, `getStaticPaths` passes the full `course` object (with all 37 lessons and all 267 KB of `contentHtml`) in `props.course` to every single lesson page, resulting in an O(N * M) in-memory data multiplication (~12.8 MB for 37 lessons).
4. **Premise 4:** In `[slug].astro`, `import TRANSCRIPTS from '../../../data/transcripts.json'` unconditionally loads all 16 video transcripts (97 KB) for every lesson, including the 21 non-video lessons.
5. **Inference:** Separating the monolithic dataset into:
   - Tier 1: `catalog.ts` (~2.08 KB)
   - Tier 2: `syllabus.ts` (~16.77 KB)
   - Tier 3: `lessons/<slug>.ts` (~8.77 KB per lesson)
   - Dedicated Transcripts: `transcripts/<youtubeId>.json` (~3–10 KB per video)
   and passing only minimal course tokens (`{ id, slug, title, theme }`, ~150 bytes) to `props.course` in `[slug].astro` reduces route data over-fetching by **95%–99.4%**, cuts `getStaticPaths` in-memory props from 12.8 MB to ~0.33 MB (**-97.4%**), and decouples authoring files into clean 1-file-per-lesson modules.

---

## 3. Caveats

1. **Client Runtime vs SSG:** In Astro static mode, server-side imports in frontmatter are not automatically bundled into client `.js` assets unless explicitly imported in a client `<script>` or framework component. Therefore, the primary gains of R2 are in **build-time Node memory**, **Vite HMR dev latency**, **props payload minimization**, **architectural safety against accidental client bundling**, and **decoupled authoring ergonomics**.
2. **Astro ClientRouter Wire Transfer:** ClientRouter operates by fetching `.html` files over HTTP. The 128 KB transcript DOM expansion on video lessons affects HTML wire size during client transitions. While data splitting optimizes the data sources, reducing the HTML DOM size of hidden transcript cues requires a component/template optimization (e.g. SVG symbol reuse or lazy tab rendering).
3. **Automated Migration Script:** The migration script was verified using `jiti` in read-only mode. In the implementation phase, writing the split files to disk and updating the three page files must be followed by `npm run build` and `npm run verify`.

---

## 4. Conclusion

- Monolithic data architecture in `courses.ts` (345.68 KB) and `transcripts.json` (96.97 KB) is technically verified as a primary source of build-time memory overhead, props bloat, and developer friction.
- Data splitting into a 3-tier model (Catalog ~2.1 KB -> Syllabus ~16.8 KB -> Granular Lessons ~8.8 KB) using Vite's `import.meta.glob` is 100% technically viable, preserves strict TypeScript typing, and requires changing only 3 page files (`index.astro`, `[course]/index.astro`, `[course]/[slug].astro`) plus `fetch-transcripts.mjs`.
- A complete architecture blueprint, TypeScript interfaces, loader implementation, and route refactor snippets have been authored in `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md`.

---

## 5. Verification Method

1. **Inspect Report:**
   Read `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md`.
2. **Verify Extraction Viability:**
   Run `node .agents/explorer_survey_2/test_jiti.cjs` to confirm programmatic extraction of all 37 lessons from `courses.ts` with zero missing fields.
3. **Verify Size Breakdown Simulation:**
   Run `node .agents/explorer_survey_2/simulate_split.cjs` to verify the exact mathematical sizes:
   - Catalog: 2,133 bytes
   - Syllabus: 17,176 bytes
   - Total Lessons: 332,137 bytes (37 files, avg 8.77 KB)
4. **Verify Current Build Status:**
   Run `npm run build` and `npm run verify` to confirm baseline health.
