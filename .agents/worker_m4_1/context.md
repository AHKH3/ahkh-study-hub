# Worker M4-1 Context: Standardized Editorial Framework & Components

## Identity
- Role: Worker (`teamwork_preview_worker`)
- Working Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m4_1`
- Target Milestone: Milestone 4 (Standardized Lesson Content Formatting Framework)

## Mandatory References
- Authoritative User Request: `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- Project Document: `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- Explorer Survey 3: `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_3\report.md` (§4 has canonical templates and specifications)
- Constitutional Guardrails: `c:\Users\abdel\dev\ahkh-study-hub\AGENTS.md` and `DESIGN.md`

## Files Owned Exclusively
- `src/components/editorial/Axiom.astro`
- `src/components/editorial/KeyPrinciple.astro`
- `src/components/editorial/SocraticCallout.astro`
- `src/components/editorial/DataMatrix.astro`
- `src/components/editorial/SourceAttribution.astro`
- `src/data/courses/springboard-ux/lessons/sb-6-1.ts`
- `src/data/courses/springboard-ux/lessons/sb-7-1.ts`
- `src/data/courses/springboard-ux/lessons/sb-8-1.ts`
- `docs/EDITORIAL_FRAMEWORK.md`

## Mandatory Tasks
1. **Create the 5 Standardized Editorial Astro Components** in `src/components/editorial/`:
   - **`Axiom.astro`**:
     - Props: `quote: string`, `author: string`, `source?: string`.
     - Styling: `<blockquote>` with `my-8 sm:my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4`.
     - Footer: `mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase`. Uses em-dash `&mdash;` typography. Zero icons.
   - **`KeyPrinciple.astro`**:
     - Props: `kicker?: string` (default: "Key Principle"), `title: string`, `body?: string`. Slot support for custom content.
     - Styling: `div` with `my-8 p-5 sm:p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs not-prose`.
     - Kicker: `text-teal-700 dark:text-teal-400 font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-2`.
   - **`SocraticCallout.astro`**:
     - Props: `kicker?: string` (default: "Inquiry for Reflection"), `prompt?: string`. Slot support for custom content.
     - Styling: `<aside class="my-8 p-5 sm:p-6 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose space-y-2">`.
     - Kicker: strictly `text-teal-700 dark:text-teal-400 font-mono font-bold uppercase tracking-wider text-xs`. Serif body.
   - **`DataMatrix.astro`**:
     - Props: `headers: string[]`, `rows: string[][]`, `caption?: string`.
     - Styling: Wrapped in `<div class="my-8 overflow-x-auto not-prose">`. Minimal border table with `border-t border-b border-ink-border dark:border-dark-border`, `font-mono uppercase tracking-widest font-bold text-xs sm:text-sm` headers, `divide-y divide-ink-border/60 dark:divide-dark-border/60 font-serif` rows.
   - **`SourceAttribution.astro`**:
     - Props: `sourceTitle: string`, `sourceUrl: string`, `author?: string`, `organization?: string`.
     - Styling: Placed at end of content before reader nav footer. Teal kicker `Source Citation`, `Adapted for sovereign study from [sourceTitle] by [author/organization]`. External link with `&nearr;` (`↗`), `border border-ink-border/80 rounded-xs bg-paper-50 hover:bg-paper-100 transition-colors`.

2. **Repair Missing Attribution Footers in Lessons `sb-6-1`, `sb-7-1`, and `sb-8-1`**:
   - Inspect `src/data/courses/springboard-ux/lessons/sb-6-1.ts`, `sb-7-1.ts`, and `sb-8-1.ts`.
   - Append the standardized HTML Source Attribution block at the conclusion of `contentHtml` in each of these three lessons, matching the curriculum source mapping and canonical template from Explorer Survey 3 §4.1.

3. **Author `docs/EDITORIAL_FRAMEWORK.md`**:
   - Complete architectural guide documenting:
     - The 5 standardized editorial components (API, Props, Astro usage, HTML snippet for content strings).
     - Strict constitutional constraints (pure white canvas `#FFFFFF`, seven signal hues text-only, zero emojis, zero double-slashes `//`, zero whole-element hover translation).
     - Migration guide for lessons.

4. **Verify Build & Integrity**:
   - Run `npm test` to verify all test suites pass.
   - Run `npm run verify` to verify all constitutional checks pass.
   - Run `npm run build` to confirm all 42 static pages compile cleanly.
   - Create local git commit per constitution.

## Mandatory Invariant Guardrails
- Strictly ZERO emojis and ZERO double-slashes (`//`) anywhere in code, comments, or strings.
- Pure White Canvas: `#FFFFFF` in Light Mode. Never `#FDFCFA`, ivory, or cream.
- Seven Signal Hues: text-only, calibrated grades. Zero colored background pills.
- Universal Prohibition of Whole-Element Movement on Hover (ADR-017).

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
