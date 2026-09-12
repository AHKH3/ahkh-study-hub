# Original User Request

## 2026-09-11T17:10:35Z

Make AHKH Study Hub an ultra-fast, publication-grade web application by eliminating all page-load latency, implementing instant seamless transitions, optimizing data and reader performance, and establishing a unified editorial formatting framework for all lesson content.

Working directory: C:/Users/abdel/dev/ahkh-study-hub
Integrity mode: development

## Requirements

### R1. Instant Client-Side Navigation & Zero-Flicker Transitions
Implement client-side routing and instant page transitions across the entire platform (Library Index, Course Overviews, and Lesson Reader) using Astro ClientRouter / View Transitions with prefetching, eliminating full-page reloads, blank flashes, and scroll jump.

### R2. Data Splitting & Lazy-Loaded Course Bundles
Refactor data loading so that individual courses and lessons do not evaluate or bundle the monolithic courses.ts and transcripts.json datasets upfront; ensure data is split and loaded on demand to minimize memory overhead and time-to-interactive.

### R3. Reader DOM Engine & Local Storage High-Performance Tuning
Optimize the reader page rendering, continuous scroll restoration, and highlight management (localStorage) to guarantee instant lesson opens and zero-stutter interactions even on long, content-rich chapters.

### R4. Standardized Lesson Content Formatting Framework
Establish and codify a clear, repeatable editorial formatting framework for all lessons based on the platform's core design system (Pullout Axiom, Key Principle Card, Socratic Callout, Comparative Matrix, and Source Attribution Footer), maintaining strict verbatim text preservation, zero emojis, zero artificial slop, and pure Swiss typography.

### R5. Web-Only Streamlining & Build Verification
Streamline the application exclusively for modern web browsers, removing any non-web overhead while ensuring full compliance with project constitution guardrails (pure white canvas #FFFFFF, seven signal hues, low-contrast tactile states) with flawless static compilation.

## Acceptance Criteria

### Navigation & Transition Speed
- [ ] Transitioning between Library Index, Course Syllabi, and Lesson pages feels instantaneous (<100ms perceived) without white flashes or full-page browser reloads.
- [ ] Browser history navigation (Back/Forward) instantly restores view states and reading position.

### Bundle & Data Optimization
- [ ] Large course datasets are split or dynamically imported so lesson pages avoid loading monolithic data bloat.
- [ ] Initial bundle size and parsing times for lesson routes are significantly reduced.

### Reader & Feature Responsiveness
- [ ] Opening any lesson renders the text, restored scroll depth, and saved highlights without visual stutter or layout shift.
- [ ] Text highlighting and reading progress updates persist smoothly to local storage with immediate visual feedback.

### Editorial Framework & Design Purity
- [ ] A concrete, documented editorial guideline and reusable component pattern is defined for formatting lesson text.
- [ ] Strict compliance with AGENTS.md and DESIGN.md: pure white canvas #FFFFFF, zinc borders, zero emojis, zero double-slashes (//), text-only signal hues, and zero hover element translations.

### Build & Verification Integrity
- [ ] npm run verify and npm run build complete cleanly with zero errors, zero broken routes, and zero TypeScript issues.

## Follow-up — 2026-09-12T07:02:00Z

استأنف العمل فوراً من حيث توقفت. راجع .agents/orchestrator_1/handoff.md واستكمل باقي المراحل M3 و M4 و M5.
