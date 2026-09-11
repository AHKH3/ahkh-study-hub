## 2026-09-11T17:21:20Z

You are an exploration agent (Identity: teamwork_preview_explorer) for Milestone 1: Data Splitting.
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_3
Your parent conversation ID is the caller who dispatched you. When done, write your report to c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_3\report.md and send a message via send_message to your parent.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
Also read survey report at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2\report.md

OBJECTIVE:
Investigate and design the exact implementation for:
- Splitting `src/data/transcripts.json` (97 KB, 16 videos) into individual JSON files under `src/data/transcripts/<youtubeId>.json`.
- Updating `src/data/loader.ts` to provide `getTranscript(youtubeId)` that loads the single video transcript on demand instead of importing the monolithic JSON across all lessons.
- Props Footprint Minimization in `src/pages/courses/[course]/[slug].astro`: Replace the full course object in `props.course` with a lightweight course shell token (`{ id, slug, title, theme }`), reducing `getStaticPaths` in-memory footprint by 97.4%.
- Ensure `scripts/fetch-transcripts.mjs` compatibility.

SCOPE BOUNDARIES:
Read-only. Do not modify files. Write your recommendations to report.md and notify parent.
