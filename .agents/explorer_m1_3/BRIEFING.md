# BRIEFING — 2026-09-11T17:21:35Z

## Mission
Investigate and design the exact implementation plan for Milestone 1: Data Splitting (transcript splitting, loader refactor, props footprint minimization, and script compatibility).

## 🔒 My Identity
- Archetype: explorer
- Roles: teamwork_preview_explorer
- Working directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_3
- Original parent: 76dabf93-dcc7-483c-9a17-34ca24201b84
- Milestone: Milestone 1: Data Splitting

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Splitting src/data/transcripts.json into individual JSON files under src/data/transcripts/<youtubeId>.json
- Updating src/data/loader.ts to provide getTranscript(youtubeId) on demand
- Props Footprint Minimization in src/pages/courses/[course]/[slug].astro
- Ensure scripts/fetch-transcripts.mjs compatibility
- Write report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_3\report.md and notify parent via send_message

## Current Parent
- Conversation ID: 76dabf93-dcc7-483c-9a17-34ca24201b84
- Updated: 2026-09-11T17:26:00Z

## Investigation State
- **Explored paths**:
  - `src/data/transcripts.json` (3,081 lines, 97,070 bytes, 16 videos, 563 cues audited)
  - `src/pages/courses/[course]/[slug].astro` (all 914 lines scanned, exhaustive line-by-line proof of course property usages)
  - `scripts/fetch-transcripts.mjs` (all 231 lines analyzed for discovery, fetch, cache, and write mechanics)
  - `public/scripts/reader.js` (verified DOM-only interaction with `#transcript-view`, zero JSON import)
  - `src/utils/courseStats.ts` (verified Course type imports and usage)
  - `scripts/check-inline-scripts.mjs`, `scripts/verify-dist.mjs`, `package.json`
- **Key findings**:
  1. `src/data/transcripts.json` contains exactly 16 videos with identical schema: `{ videoId, fetchedAt, lang, kind, segments }`.
  2. `[slug].astro` uses only 5 properties of `course`: `id`, `slug`, `title`, `theme.accent`, `theme.highlight`. Replacing `props.course` with `CourseShellToken` eliminates 99.95% of course prop weight and 97.4% of total `getStaticPaths` props memory.
  3. `[slug].astro` top-level unconditional import of `transcripts.json` parses 97 KB for all 37 routes (including 21 article/PDF lessons with no video). Moving to on-demand `getTranscript(lesson.youtubeId)` in frontmatter eliminates 100% of transcript overhead for article lessons and isolates video lessons to their individual ~5.9 KB JSON file.
  4. `scripts/fetch-transcripts.mjs` currently hardcodes single-file discovery (`COURSES_PATH`) and single-file output (`OUT_PATH`). Upgrading `discoverIds()` to scan `src/data/` recursively and saving to `src/data/transcripts/${id}.json` while maintaining `transcripts.json` ensures 100% backward compatibility and zero build friction.
- **Unexplored areas**: None within M1 data splitting scope. All four assigned areas fully investigated.

## Key Decisions Made
- Confirmed `CourseShellToken` contains `{ id, slug, title, theme: { accent, highlight } }` perfectly fulfilling all reader requirements with 0% breaking change.
- Confirmed `getTranscript(youtubeId)` in `loader.ts` should return `Promise<TranscriptCue[] | null>` for seamless frontmatter consumption, while `getVideoTranscript(youtubeId)` returns `Promise<VideoTranscript | null>`.
- Confirmed `fetch-transcripts.mjs` should dual-write to `src/data/transcripts/${id}.json` and `src/data/transcripts.json` to guarantee zero regressions.

## Artifact Index
- report.md — Comprehensive technical investigation and implementation blueprint for Milestone 1
- handoff.md — Standardized 5-component handoff report for downstream implementers

