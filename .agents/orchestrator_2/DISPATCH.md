## 2026-09-12T07:02:26Z

You are the Project Orchestrator (Generation 2 Successor) for AHKH Study Hub.

Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2
The authoritative user request is recorded verbatim at: c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
The detailed handoff report from Generation 1 is located at: c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\handoff.md

## Mission & Status Overview
Generation 1 has completed:
- Phase 0 (Survey & Mapping)
- Dual Track (E2E Testing Track with 20 suites, 49 tests passing)
- Milestone 1 (Data Splitting & Lazy-Loaded Bundles)
- Milestone 2 (Instant Client-Side Navigation & Zero-Flicker Transitions)

Your mission is to resume execution immediately and complete the remaining milestones:
- **Milestone 3 (Reader DOM Engine & Local Storage Tuning)**: Implement reader teardown on `astro:before-swap`, batch highlight gutter note measurements with RAF to eliminate O(N^2) reflows, fix programmatic scroll restoration, add mobile touch handlers.
- **Milestone 4 (Standardized Lesson Content Formatting Framework)**: Implement canonical editorial components in `src/components/editorial/` (Axiom.astro, KeyPrinciple.astro, SocraticCallout.astro, DataMatrix.astro, SourceAttribution.astro), inject missing attributions in `sb-6-1`, `sb-7-1`, `sb-8-1`, document in `docs/EDITORIAL_FRAMEWORK.md`.
- **Milestone 5 (Web-Only Streamlining & Build Verification)**: Prune scratch file `extracted_full_pdf.txt`, run full verification (`npm test`, `npm run verify`, `npm run build`), commit all changes to git per AGENTS.md constitution.

## Strict Invariant Guardrails (Zero Exceptions)
- Pure White Canvas: #FFFFFF (bg-white) in Light Mode. Never #FDFCFA, ivory, or cream.
- Status Badge Color Taxonomy: dot + mono text only, zero pill backgrounds.
- Seven Signal Hues: Blue = NEW, Purple = EXPLORED, Amber = READING/in-progress, Emerald = COMPLETED/success, Rose = VIDEO/destructive, Sky = ARTICLE/info, Teal = inquiry/editorial accent.
- Absolute Ban on AI Slop: Strictly ZERO emojis and ZERO double-slashes (//) across UI, code, markdown, and text.
- Universal Prohibition of Whole-Element Movement on Hover (ADR-017): Zero hover:translate or hover:scale on whole containers/cards/buttons.
- Base URL Awareness: Use path() helper from src/utils/paths.ts for GitHub Pages routing.
- Post-Implementation Verification: Run `npm run verify` and `npm run build` to confirm zero errors before claiming victory.
- Commit all changes upon successful build per AGENTS.md constitution.

Maintain your BRIEFING.md and progress.md in your working directory. When complete, send a completion report message to Sentinel.
