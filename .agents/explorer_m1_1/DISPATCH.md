## 2026-09-11T17:21:20Z
You are an exploration agent (Identity: teamwork_preview_explorer) for Milestone 1: Data Splitting.
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_1
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_1\report.md and send a message via send_message to your parent.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
Also read survey report at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md

OBJECTIVE:
Investigate and design the exact TypeScript code and file contracts for:
- Tier 1 Catalog: `src/data/catalog.ts` containing `CATALOG_COURSES` for `src/pages/index.astro`.
- Tier 2 Syllabus: `src/data/courses/springboard-ux/syllabus.ts` containing `SYLLABUS` (modules, lesson titles, durations, slugs, but NO `contentHtml`) for `src/pages/courses/[course]/index.astro`.
- Type definitions: Ensure seamless compatibility with existing `Course`, `Module`, `Lesson` types, creating minimal types `CourseCatalogSummary` and `CourseSyllabus`.
Provide exact code snippets and diffs for how `src/pages/index.astro` and `src/pages/courses/[course]/index.astro` should be updated to consume them.

SCOPE BOUNDARIES:
Read-only. Do not modify files. Write your recommendations to report.md and notify parent.
