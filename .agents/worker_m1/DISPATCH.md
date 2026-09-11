## 2026-09-11T17:31:38Z
You are an implementation worker (Identity: teamwork_preview_worker) for Milestone 1: Data Splitting & Lazy-Loaded Course Bundles.
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m1
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m1\handoff.md and send a message via send_message to your parent.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
Read the complete Explorer findings and blueprints at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_1\report.md
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_2\report.md
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_3\report.md

WRITE OWNERSHIP:
You exclusively own and may modify or create:
- `src/data/types.ts`
- `src/data/catalog.ts`
- `src/data/courses/springboard-ux/syllabus.ts`
- `src/data/courses/springboard-ux/lessons/*.ts`
- `src/data/transcripts/*.json`
- `src/data/loader.ts`
- `src/data/courses.ts` (re-export or maintain backward compatibility)
- `src/pages/index.astro`
- `src/pages/courses/[course]/index.astro`
- `src/pages/courses/[course]/[slug].astro`
- `scripts/fetch-transcripts.mjs`
- `src/utils/courseStats.ts` (if needed for type compatibility)

OBJECTIVES:
1. Implement the 3-Tier Data Architecture:
   - Create `src/data/types.ts` with minimal types (`CourseCatalogSummary`, `LessonSummary`, `ModuleSummary`, `CourseSyllabus`, `CourseShellToken`).
   - Create `src/data/catalog.ts` containing `CATALOG_COURSES`.
   - Create `src/data/courses/springboard-ux/syllabus.ts` containing `SYLLABUS` (modules, lesson metadata without contentHtml).
   - Extract all 37 lessons from `src/data/courses.ts` into `src/data/courses/springboard-ux/lessons/<slug>.ts` with 100% text and dynamic path preservation (`path('/images/lessons/...')`).
   - Split `src/data/transcripts.json` into individual `src/data/transcripts/<youtubeId>.json` files (while keeping `transcripts.json` backward compatible).
   - Implement `src/data/loader.ts` using Vite's `import.meta.glob` for lazy on-demand lesson and transcript retrieval, alongside synchronous syllabus queries.
2. Refactor Page Routes to use Minimal Data:
   - `src/pages/index.astro`: import `CATALOG_COURSES`, eliminate full module iterations.
   - `src/pages/courses/[course]/index.astro`: use syllabus loader, eliminate `contentHtml` from props.
   - `src/pages/courses/[course]/[slug].astro`: pass lightweight `CourseShellToken` to `props.course` in `getStaticPaths`, load transcripts on-demand in frontmatter.
3. Update `scripts/fetch-transcripts.mjs` to write granular transcript files.
4. Verify with Build & Test:
   - Run `npm test` (E2E test suite)
   - Run `npm run verify` (constitutional checks)
   - Run `npm run build` (Astro static compilation for all 42 pages)
   Document commands and output in your handoff report.
