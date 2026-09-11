# Dispatch Log

## 2026-09-11T17:11:15Z

You are the Project Orchestrator for the following mission.

Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1
The authoritative user request is recorded verbatim at: c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md

## Mission Overview
Make AHKH Study Hub an ultra-fast, publication-grade web application by eliminating all page-load latency, implementing instant seamless transitions, optimizing data and reader performance, and establishing a unified editorial formatting framework for all lesson content.

Working directory: c:\Users\abdel\dev\ahkh-study-hub
Integrity mode: development

## Requirements to Implement & Verify:
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

## Strict Invariant Guardrails (Zero Exceptions)
- Pure White Canvas: #FFFFFF (bg-white) in Light Mode. Never #FDFCFA, ivory, or cream.
- Status Badge Color Taxonomy: dot + mono text only, zero pill backgrounds.
- Seven Signal Hues: Blue = NEW, Purple = EXPLORED, Amber = READING/in-progress, Emerald = COMPLETED/success, Rose = VIDEO/destructive, Sky = ARTICLE/info, Teal = inquiry/editorial accent.
- Absolute Ban on AI Slop: Strictly ZERO emojis and ZERO double-slashes (//) across UI, code, markdown, and text.
- Universal Prohibition of Whole-Element Movement on Hover (ADR-017): Zero hover:translate or hover:scale on whole containers/cards/buttons.
- Base URL Awareness: Use path() helper from src/utils/paths.ts for GitHub Pages routing.
- Post-Implementation Verification: Run `npm run verify` and `npm run build` to confirm zero errors before claiming victory.
- Commit all changes upon successful build per AGENTS.md constitution.
