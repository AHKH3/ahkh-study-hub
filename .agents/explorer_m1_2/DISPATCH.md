## 2026-09-11T17:21:20Z

You are an exploration agent (Identity: teamwork_preview_explorer) for Milestone 1: Data Splitting.
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_2
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_2\report.md and send a message via send_message to your parent.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
Also read survey report at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md

OBJECTIVE:
Investigate and design the exact TypeScript code and file contracts for:
- Tier 3 Granular Lessons: Extract all 37 lessons from `src/data/courses.ts` into individual files: `src/data/courses/springboard-ux/lessons/<slug>.ts`.
- Lazy Lesson Loader: Design `src/data/loader.ts` using Vite's `import.meta.glob('./courses/*/lessons/*.ts')` to load individual lessons on demand.
- Route Update: Provide exact code snippets and diffs for how `src/pages/courses/[course]/[slug].astro` will use `getLesson(courseSlug, lessonSlug)` in `getStaticPaths` or frontmatter. Ensure static site generation produces identical HTML.

SCOPE BOUNDARIES:
Read-only. Do not modify files. Write your recommendations to report.md and notify parent.