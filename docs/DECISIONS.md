# Architectural Decision Records (ADR)

This file records the key architectural and design decisions made in the development of **AHKH Study Hub**.

---

## ADR-001: Selection of Astro Static Site Generation (SSG)
- **Date**: 2026-09-03
- **Status**: Accepted
- **Context**: The user requires an offline-capable, lightning-fast, zero-maintenance web platform for reading and studying curricula. The platform must be hostable for free on GitHub Pages.
- **Decision**: Use Astro 5 in `output: 'static'` mode with `@astrojs/tailwind`.
- **Consequences**: Zero server dependencies, instantaneous page loads, zero database maintenance, and straightforward static deployments.

---

## ADR-002: Pure Monochrome Aesthetic & Elimination of Beige/Warm Backgrounds
- **Date**: 2026-09-03
- **Status**: Accepted
- **Context**: Initial designs experimented with warm cream/beige tones (`#FBFBFA`). The user explicitly demanded pure black-and-white (`#FFFFFF` background, solid black `#09090B` text) with zero artificial tints on the main site.
- **Decision**: Standardize all platform surfaces on pure `#FFFFFF` canvas, `#09090B` ink, and `#E4E4E7` zinc borders. Course-specific accent colors are restricted to internal reader highlights and journey roadmaps.
- **Consequences**: High visual contrast (WCAG AAA > 12:1), clinical editorial clarity, and total alignment with user requirements.

---

## ADR-003: Absolute Ban on Emojis
- **Date**: 2026-09-03
- **Status**: Accepted
- **Context**: The user strictly prohibited emojis across the entire project to maintain academic and editorial dignity.
- **Decision**: Ban all Unicode emojis from the UI and codebase. Use accessible inline SVG icons exclusively for all interactive affordances (search, bookmarks, outline, arrows, clear).
- **Consequences**: Dignified appearance matching fine print typography; complete cross-platform rendering consistency.

---

## ADR-004: Course Listing Purity (Zero Descriptions in Library)
- **Date**: 2026-09-03
- **Status**: Accepted
- **Context**: Standard SaaS cards clutter listings with generic, repetitive AI-generated descriptions. The user established the rule: "The course name is expressive enough, along with its module count, source count, and duration. For textual summaries, the user enters the course page."
- **Decision**: Completely strip all subtitles and descriptions from course rows on the Library page (`src/pages/index.astro`).
- **Consequences**: Clean, scannable editorial monograph index with low cognitive load and zero AI slop.

---

## ADR-005: Local-First Storage Architecture
- **Date**: 2026-09-03
- **Status**: Accepted
- **Context**: Learners want full ownership over their highlights and marginalia without paywalls, signups, or tracking cookies.
- **Decision**: Store all study artifacts in browser `localStorage` using structured keys (`ahkh_hl_${courseId}_${lessonId}`) and provide 1-click Readwise CSV & Markdown export.
- **Consequences**: 100% privacy, instant client-side read/write with zero latency, zero backend overhead.
