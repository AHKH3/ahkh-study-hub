# Project: AHKH Study Hub Performance & Editorial Framework

## Architecture
- Astro 5 Static Site Generation (SSG) with ClientRouter view transitions and hover prefetching.
- 3-Tier Granular Data Architecture:
  - Catalog (`src/data/catalog.ts`) for Library Index (`src/pages/index.astro`).
  - Syllabus (`src/data/courses/<slug>/syllabus.ts`) for Course Overview (`src/pages/courses/[course]/index.astro`).
  - Granular Lessons (`src/data/courses/<slug>/lessons/<slug>.ts`) loaded via `import.meta.glob` for Lesson Reader (`src/pages/courses/[course]/[slug].astro`).
  - Dedicated Transcripts (`src/data/transcripts/<youtubeId>.json`) loaded on demand.
  - Minimal route props: passing lightweight course shell tokens (`{ id, slug, title, theme }`) instead of full course payload.
- Reader DOM Engine:
  - Lifecycle cleanup via `astro:before-swap` (AbortController, YouTube iframe teardown, sync interval cleanup, observer disconnection).
  - RAF-batched gutter note cascading to eliminate layout thrashing ($O(N^2) \to O(N)$).
  - Scroll restoration guard against premature clamping and temporary disablement of `scroll-smooth` during programmatic restore.
  - Mobile touch selection support (`touchend`, `selectionchange`).
- Standardized Editorial Component Library:
  - Reusable Astro components under `src/components/editorial/`: `Axiom.astro`, `KeyPrinciple.astro`, `SocraticCallout.astro`, `DataMatrix.astro`, `SourceAttribution.astro`.
  - Missing attribution footers added to lessons `sb-6-1`, `sb-7-1`, `sb-8-1`.
  - Strict compliance with `DESIGN.md` and `AGENTS.md`: pure white canvas `#FFFFFF`, seven signal hues text-only, zero emojis, zero `//`, zero whole-element hover movement.

## Feature Inventory
Every feature from the Survey phase appears here with its assigned milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Data Splitting (3-Tier Model) | Extract `courses.ts` into `catalog.ts`, `syllabus.ts`, and per-lesson `lessons/<slug>.ts` | M1 | Survey (Explorer 2) |
| 2 | Transcript Splitting | Extract monolithic `transcripts.json` into per-video `transcripts/<youtubeId>.json` | M1 | Survey (Explorer 2) |
| 3 | Props Minimization | Pass minimal course shell token to `[slug].astro` `getStaticPaths` reducing in-memory footprint by 97% | M1 | Survey (Explorer 2) |
| 4 | ClientRouter Prefetching | Configure `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` in `astro.config.mjs` and add `data-astro-prefetch="hover"` | M2 | Survey (Explorer 1) |
| 5 | Script Lifecycle Hardening | Guard `astro:page-load` listeners in `courses/[course]/index.astro` and `index.astro` with AbortController | M2 | Survey (Explorer 1) |
| 6 | Reader Self-Boot Guard | Add fallback self-initialization check in `reader.js` to eliminate dynamic script injection race condition | M2 | Survey (Explorer 1) |
| 7 | Reader Teardown on Route Swap | Implement `astro:before-swap` listener in `reader.js` to abort controllers, clear intervals, and destroy player | M3 | Survey (Explorer 3) |
| 8 | Highlight Gutter Batching | Eliminate quadratic reflows in `cascadeGutterNotes()` by separating read/write passes into `requestAnimationFrame` | M3 | Survey (Explorer 3) |
| 9 | Robust Scroll Restoration | Guard scroll restore against premature font/image clamping and disable `scroll-smooth` during instant restore | M3 | Survey (Explorer 3) |
| 10 | Mobile Highlight Popover | Add `touchend` and `selectionchange` listeners for reliable mobile text highlight popover | M3 | Survey (Explorer 3) |
| 11 | Editorial Astro Components | Build 5 canonical Astro components under `src/components/editorial/` (Axiom, KeyPrinciple, SocraticCallout, DataMatrix, SourceAttribution) | M4 | Survey (Explorer 3) |
| 12 | Lesson Attributions Repair | Inject missing standardized attribution footers in lessons `sb-6-1`, `sb-7-1`, and `sb-8-1` | M4 | Survey (Explorer 3) |
| 13 | Editorial Documentation | Author `docs/EDITORIAL_FRAMEWORK.md` codifying components, usage guidelines, and constitution guardrails | M4 | Survey (Explorer 3) |
| 14 | Scratch File Pruning | Prune unreferenced `extracted_full_pdf.txt` from repository root | M5 | Survey (Explorer 1) |
| 15 | Verification Suite & Build Pass | Ensure `npm run verify` and `npm run build` pass with zero errors, zero broken routes | M5 | Survey (Explorer 1) |
| 16 | Git Commit Discipline | Commit all changes upon successful build per AGENTS.md constitution | M5 | Constitution |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Data Splitting & Lazy Bundles | Split `courses.ts` & `transcripts.json`, update page loaders and props | none | DONE |
| 2 | M2: Navigation & Prefetching | Enable prefetch, link prefetching, and lifecycle listener guards | M1 | DONE |
| 3 | M3: Reader DOM & LocalStorage Tuning | Teardown hooks, batch gutter notes, fix scroll restore & mobile touch | M1 | DONE |
| 4 | M4: Standardized Editorial Framework | 5 Astro editorial components, fix footers, author documentation | M1 | DONE |
| 5 | M5: Web-Only Streamlining & Final Verification | Prune scratch files, E2E test verification, full build & verification suite, git commit | M2, M3, M4, E2E | DONE |

## Interface Contracts
### Data Tier ↔ Page Routes
- `src/data/catalog.ts`: Exports `CATALOG_COURSES: CourseCatalogSummary[]` (minimal metadata for `/`).
- `src/data/courses/<course>/syllabus.ts`: Exports `SYLLABUS: CourseSyllabus` (module structure, lesson titles, slugs, durations, without contentHtml).
- `src/data/courses/<course>/lessons/<slug>.ts`: Exports `LESSON: LessonDetail` (metadata + `contentHtml`).
- `src/data/loader.ts`: Provides helper functions:
  - `getCatalog(): CourseCatalogSummary[]`
  - `getSyllabus(courseSlug: string): CourseSyllabus | null`
  - `getLesson(courseSlug: string, lessonSlug: string): Promise<LessonDetail | null>`
  - `getTranscript(youtubeId: string): Promise<TranscriptCue[] | null>`

### Editorial Components API
- `<Axiom quote={string} author={string} role?: string />`
- `<KeyPrinciple title={string} items: string[] />`
- `<SocraticCallout prompt={string} inquiry={string} />`
- `<DataMatrix headers: string[], rows: string[][] />`
- `<SourceAttribution sourceTitle={string} sourceUrl={string} author?: string />`

## Code Layout
- `src/data/`
  - `catalog.ts` (Tier 1)
  - `loader.ts` (centralized typed accessors)
  - `courses/springboard-ux/`
    - `syllabus.ts` (Tier 2)
    - `lessons/*.ts` (Tier 3)
  - `transcripts/*.json` (per-video transcripts)
- `src/components/editorial/`
  - `Axiom.astro`
  - `KeyPrinciple.astro`
  - `SocraticCallout.astro`
  - `DataMatrix.astro`
  - `SourceAttribution.astro`
- `src/pages/`
  - `index.astro`
  - `courses/[course]/index.astro`
  - `courses/[course]/[slug].astro`
- `public/scripts/reader.js`
- `docs/`
  - `EDITORIAL_FRAMEWORK.md`
