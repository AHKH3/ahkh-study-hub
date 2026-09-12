# BRIEFING — 2026-09-12T07:07:40Z

## Mission
Investigate scroll restoration mechanics, document height stabilization, and smooth-scroll interaction in public/scripts/reader.js and src/layouts/BaseLayout.astro to formulate an authoritative fix.

## 🔒 My Identity
- Archetype: explorer
- Roles: teamwork_preview_explorer
- Working directory: c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3
- Original parent: a20ecc4b-a066-44a5-85db-965e272afde4
- Milestone: M3 (Reader DOM Engine & Local Storage High-Performance Tuning)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Base URL awareness: /ahkh-study-hub
- Zero emojis, zero slashes (//) in UI/code/content
- Strictly pure white canvas (#FFFFFF), Swiss Modernist Monochrome, seven signal hues
- Write reports to .agents/explorer_m3_3/

## Current Parent
- Conversation ID: a20ecc4b-a066-44a5-85db-965e272afde4
- Updated: not yet

## Investigation State
- **Explored paths**: `public/scripts/reader.js`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/data/courses/springboard-ux/lessons/*.ts`, `src/components/AhkhStorage.astro`, `src/components/AhkhSyncBridge.astro`
- **Key findings**:
  1. `restoreSavedScrollPosition` uses a single RAF before images and fonts load, causing browser clamping to premature document heights.
  2. Clamping fires a native scroll event that triggers `saveScrollDepth`, overwriting localStorage with truncated scroll positions (corrupting data).
  3. Restoring scroll from 0 produces a positive scroll delta > 4, causing the smart header to collapse on page open.
  4. Global `scroll-smooth` on `html` and in `global.css` causes unwanted rolling animations and View Transitions tearing.
  5. Multi-phase adaptive stabilization architecture with lock acquisition (`isRestoringScroll`), temporary smooth-scroll suppression, `document.fonts.ready` / `img.decode()` synchronization, and settled verification loop cleanly resolves all defects.
- **Unexplored areas**: None; investigation complete.

## Key Decisions Made
- Formulated multi-phase adaptive stabilization architecture with user preemption hooks.
- Documented complete technical report in `report.md` and 5-component handoff in `handoff.md`.

## Artifact Index
- c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3\report.md — Technical investigation report
- c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m3_3\handoff.md — 5-component handoff report
