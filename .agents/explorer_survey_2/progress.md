# Progress: R2 Data Splitting & Lazy-Loaded Course Bundles

Last visited: 2026-09-11T17:20:15Z

## Status
- [x] Initialized DISPATCH.md and BRIEFING.md
- [x] Investigate `src/data/courses.ts` and data structure schemas
  - Identified: 345.68 KB file, 5,329 lines. 79.3% (267.55 KB) is raw `contentHtml` across 37 lessons.
- [x] Search for all references to `courses.ts` and `transcripts.json` across the codebase
  - Identified 3 page consumers (`index.astro`, `[course]/index.astro`, `[course]/[slug].astro`), 1 utility type import (`courseStats.ts`), and 1 script (`fetch-transcripts.mjs`).
- [x] Analyze `src/pages/index.astro`, `src/pages/courses/[course]/index.astro`, `src/pages/courses/[course]/[slug].astro`
  - Profiled exact property accesses for each page.
  - Proved `index.astro` needs 0% of lesson content (only ~2 KB catalog metadata).
  - Proved `[course]/index.astro` needs 0% of lesson `contentHtml` (only ~17 KB syllabus structure).
  - Proved `[slug].astro` needs only 1 lesson's content (~8.8 KB) + minimal course shell tokens (~150 bytes), yet currently receives 345 KB course + 97 KB transcripts per page in props.
- [x] Measure file sizes and build bundle/static generation characteristics
  - Audited dist output (45 files, 3.78 MB total).
  - Discovered 128 KB transcript DOM expansion in video lessons.
- [x] Assess Astro SSG behavior: `getStaticPaths` vs page props vs client script bundling
  - Proved no client JS bundle bloat currently exists, but catastrophic memory multiplication (12.8 MB props array) in `getStaticPaths`.
- [x] Design concrete data splitting architecture (per-course metadata, per-lesson content, type safety)
  - Designed 3-tier model (Catalog 2.1 KB -> Syllabus 16.8 KB -> Granular Lessons 8.8 KB).
  - Validated dynamic loading via `import.meta.glob` with 100% type safety.
  - Verified programmatic extraction via `jiti` with 0 missing fields.
- [x] Compile final comprehensive report to `report.md`
- [x] Write `handoff.md`
- [x] Send completion message to parent
