## 2026-09-11T17:12:08Z

You are a read-only exploration agent (Identity: teamwork_preview_explorer).
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md and send a message via send_message to your parent with the report summary and file path.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project constitution and guidelines at:
c:\Users\abdel\dev\ahkh-study-hub\AGENTS.md
c:\Users\abdel\dev\ahkh-study-hub\DESIGN.md

OBJECTIVE:
Investigate and map the full technical scope for:
- R2. Data Splitting & Lazy-Loaded Course Bundles:
  Analyze the current data architecture in `src/data/courses.ts`, `transcripts.json`, and related data structures.
  Examine how data is currently loaded across pages:
  - `src/pages/index.astro` (Library Index)
  - `src/pages/courses/[course]/index.astro` (Course Overview)
  - `src/pages/courses/[course]/[lesson].astro` (Lesson Reader)
  Measure or assess the bundle size impact of importing `courses.ts` or monolithic datasets upfront in `getStaticPaths` vs page props vs runtime JS.
  Determine how course metadata, module hierarchies, and lesson contents can be split into granular per-course or per-lesson chunks/modules without breaking static generation or type safety.

SCOPE BOUNDARIES:
Read-only! Do NOT modify any source files. Produce verified findings with file paths, line references, data structure schemas, and concrete splitting architecture proposals.

OUTPUT REQUIREMENTS:
Write your comprehensive analysis to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md. Update your progress.md while working.
Send a completion message to your parent when done.
