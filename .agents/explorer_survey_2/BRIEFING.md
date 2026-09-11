# BRIEFING — 2026-09-11T17:20:00Z

## Mission
Investigate and map the full technical scope for R2 (Data Splitting & Lazy-Loaded Course Bundles), analyzing courses.ts, transcripts.json, getStaticPaths vs runtime/page props, and formulating a granular per-course/per-lesson data splitting architecture.

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2
- Original parent: 76dabf93-dcc7-483c-9a17-34ca24201b84
- Milestone: Survey & Mapping (R2: Data Splitting & Lazy-Loaded Course Bundles)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Zero modification of source files
- Adhere to project constitution (AGENTS.md, DESIGN.md)
- Report written to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md
- Maintain progress.md heartbeat

## Current Parent
- Conversation ID: 76dabf93-dcc7-483c-9a17-34ca24201b84
- Updated: 2026-09-11T17:20:00Z

## Investigation State
- **Explored paths**: `src/data/courses.ts`, `src/data/transcripts.json`, `src/pages/index.astro`, `src/pages/courses/[course]/index.astro`, `src/pages/courses/[course]/[slug].astro`, `src/utils/courseStats.ts`, `scripts/fetch-transcripts.mjs`, `dist/` HTML and asset bundles.
- **Key findings**:
  - `courses.ts` is 345.68 KB (5,329 lines); 79.28% (267.55 KB) is raw `contentHtml` across 37 lessons.
  - `transcripts.json` is 96.97 KB (16 video transcripts, 563 cues).
  - `index.astro` requires only ~2.08 KB of catalog data (99.4% unused).
  - `[course]/index.astro` requires only ~16.77 KB of syllabus data (95.1% unused, 100% of `contentHtml` unused).
  - `[slug].astro` passes the entire 345 KB `course` object to `props.course` across all 37 paths, generating ~12.8 MB of duplicate in-memory props payload during static build.
  - Video lesson HTML output expands transcripts into 128 KB of hidden DOM nodes (66.6% of HTML file).
  - Splitting into 3 tiers (`catalog.ts`, `syllabus.ts`, `lessons/<slug>.ts`, and `transcripts/<id>.json`) via Vite `import.meta.glob` reduces route data over-fetching by 95%–99.4% and drops props memory footprint by 97.4%.
- **Unexplored areas**: None within R2 scope; complete technical blueprint is established.

## Key Decisions Made
- Formulated 3-Tier Layered Data Model (Catalog -> Syllabus -> Granular Lessons + Per-video Transcripts).
- Standardized loader pattern on Vite's native `import.meta.glob` with strict TypeScript types.
- Validated programmatic extraction script via `jiti` with 100% data fidelity.
- Completed comprehensive investigation report in `report.md` and handoff report in `handoff.md`.

## Artifact Index
- report.md — comprehensive technical analysis and architecture proposal
- handoff.md — 5-component structured handoff report
- progress.md — task progress and liveness heartbeat
- DISPATCH.md — dispatch message log
