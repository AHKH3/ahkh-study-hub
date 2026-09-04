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

---

## ADR-006: Unification of Platform Design System & Cancellation of Per-Course Divergence
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: An earlier concept explored generating a separate, bespoke design system for each curriculum. Upon strategic architectural evaluation, divergent styling across courses introduces unnecessary maintenance friction, visual fragmentation, and dilutes the cohesive identity of the platform.
- **Decision**: Cancel per-course design divergences. Standardize 100% of engineering and design effort on establishing, perfecting, and deepening a single unified, publication-grade Global Design System across all courses, pages, reader surfaces, and editorial components.
- **Consequences**:
  1. A cohesive, instantly recognizable literary aesthetic for the entire platform.
  2. A rock-solid, reusable universal component library (Pullout Quotes, Synthesis Cards, Socratic Callouts, Comparison Matrices, Timelines).
  3. Seamless course ingestion without having to invent or maintain bespoke CSS palettes for each track.
  4. Complete typographic harmony and shared reading ergonomics across all materials.

---

## ADR-007: Serverless Peer-to-Peer Live Collaborative Study Sanctuary & Active Presence Pods
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: Learners require real-time collaborative study (co-reading) without screensharing latency or video distraction. The platform must support live multiplayer mouse cursors, instant highlight/sidenote synchronization, and in-room communication without adding any dedicated server or central database.
- **Decision**:
  1. Implement WebRTC DataChannels over decentralized Nostr relays via `trystero` for zero-server, direct encrypted browser-to-browser communication.
  2. Normalize cursor coordinates as relative container ratios (`xRatio`, `yRatio`) to ensure perfect visual alignment across mismatched screen resolutions and responsive layouts with 60fps GPU acceleration.
  3. Restrict live study rooms to intimate duos or trios (2-3 participants maximum) to foster deep accountability and preserve network performance.
  4. Eliminate empty rooms ("The Empty Room Problem") by displaying only active, currently online peers in the `/live` lobby.
  5. Structure the companion system via cryptographic device pairing (public keys / permanent room tokens) and persist chat history locally so companions never start from an empty screen.
  6. Enforce a dignified Sanctuary Etiquette header in the chat prioritizing scholarly discourse and directing casual socialization off-platform, with philosophical pseudonyms (e.g., *Socratic Scholar*, *Stoic Inquirer*) generated by default.
- **Consequences**: Zero server hosting costs, zero database maintenance, 100% encrypted direct peer-to-peer data transmission, and a distraction-free collaborative study environment.

---

## ADR-008: Sovereign Local-First Hybrid Architecture (Tauri Desktop App & Browser File System Persistence)
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: Ephemeral browser storage (`localStorage`) is volatile and prone to accidental data loss when users clear browser cache, use private windows, or switch between different browsers. Power users and developers demand permanent, local-first data ownership without manual export/import friction or developer/CLI overhead.
- **Decision**:
  1. Adopt a dual-surface hybrid architecture:
     - **Tauri Desktop Application**: Provide a lightweight (5-10 MB), zero-config native desktop executable that embeds a native SQLite database on the local filesystem (`~/.ahkh/study.db`), completely immune to browser cache clearing or browser switching.
     - **Web Browser Version**: Maintain the static web deployment on GitHub Pages with native File System Access (and Origin Private File System fallback), allowing web users to designate a local study file on their disk with a single click.
  2. Maintain 100% P2P protocol interoperability: A learner studying on the desktop app can connect directly via WebRTC with a partner studying on a web browser without friction.
- **Consequences**:
  1. Absolute data permanence and immunity against cache wipes.
  2. Zero backend server costs or authentication infrastructure required.
  3. Frictionless, one-click experience for ordinary users alongside full sovereignty for power developers.

---

## ADR-009: Minimum Necessary Paraphrasing for Copyright Safety & Derivative Attribution
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: External courses ingested into AHKH Study Hub originate from commercial platforms, universities, or independent creators. Ingesting verbatim copyrighted transcripts, articles, or proprietary syllabi poses intellectual property risks for an open, static platform hosted on public web infrastructure.
- **Decision**:
  1. **Minimum Necessary Paraphrasing for Legal Safety**: Rephrase ingested lesson prose with the precise minimal threshold required to ensure legal safety under copyright law (preserving the foundational principles, heuristics, mental models, and technical substance while discarding proprietary literary expression).
  2. **Distinct Title Architecture**: Rewrite course, module, and lesson titles into distinct, descriptive, and scholarly designations rather than mirroring commercial proprietary titles 1:1.
  3. **Mandatory Derivative Attribution Footer**: Every lesson must include a dignified attribution card/footer explicitly stating that the material is derived from and inspired by the original course and instructor/platform, linking to official source materials where applicable.
  4. **Strict Anti-AI-Slop Standard**: Rewritten text must adhere to publication-grade human editorial standards (via the globally installed `avoid-ai-writing` skill and Anthropic clear-writing principles): zero machine filler, no throat-clearing openers, no hollow significance inflation, and strict elimination of LLM clichés ("delve", "tapestry", "it's not X it's Y").
- **Consequences**:
  1. Complete legal safety and defense against copyright or intellectual property infringement claims.
  2. Transparent, ethical attribution honoring original authors.
  3. High-density, dignified educational literature free from repetitive AI slop.

---

## ADR-010: Unified Swiss Editorial Design System & AI Slop Elimination
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: The user identified visual noise, token discrepancies across `DESIGN.md` and `tailwind.config.mjs`, artificial AI-generated gimmicks (such as typewriter H1 title animations and blur cascades), bulky colored badges, and repetitive quotes cluttering roadmap cards.
- **Decision**:
  1. **Slop & Gimmick Elimination**: Completely removed fake typewriter cursor scripts (`playEditorialTypewriter`), noisy curtain cascades, radial pulse keyframes, and the homepage marketing callout ("The Sanctuary Standard").
  2. **Badge & Eyebrow Distillation**: Replaced bulky colored pill badges with minimal, high-contrast typographic status indicators (`• Active`, `• New`, `• Explored`, `• Completed`), and eliminated the "Total Courses: 04" eyebrow tag.
  3. **Course Roadmap Scannability**: Removed redundant summary quotes and loud red/amber/grey format badges from roadmap lists, streamlining lessons to clean number, title, format notation (`Video · 18 min`), and study link.
  4. **Token Harmonization & Dark Mode Parity**: Synchronized surface, paper, ink, and accent tokens across `DESIGN.md`, `tailwind.config.mjs`, and `src/styles/global.css`, ensuring 100% dark mode support across all course routes.
- **Consequences**:
  1. Instant, crisp page rendering with zero animation lag.
  2. Dignified, publication-grade Swiss Modernist reading aesthetic.
  3. Perfect token consistency between documentation and code.

---

## ADR-011: Strict Ban on Eyebrows, Helper Micro-Copy, and Default Orange Theme
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: AI coding agents routinely introduce extraneous structural labels ("Curriculum Roadmap", "Course Structure"), patronizing helper text ("Click any lesson below to begin reading"), and default warm terracotta/orange accents that conflict with the clean Swiss Modernist aesthetic and user requirements.
- **Decision**:
  1. **Eyebrow & Helper Copy Ban**: Strictly prohibit decorative section eyebrows, intermediate titles, and instructional micro-copy across all course indices, reader surfaces, and hub pages.
  2. **Monochrome First**: Standardize all reader highlights, borders, and default interactions on tactile carbon ink (`#1C1B19` light / `#F4F4F5` dark) with subtle graphite/chalk highlight veils, purging all default orange/terracotta overrides.
  3. **Repository Guardrails**: Enshrine these prohibitions as non-negotiable Invariant Guardrails in `AGENTS.md` and `DESIGN.md`.
- **Consequences**:
  1. Complete protection against future AI agent drift or re-introduction of visual clutter.
  2. Austere, intentional typographic hierarchy where content speaks directly for itself.

---

## ADR-012: Extensible Tone-Calibrated Domain & Metadata Color System
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: A pure black, white, and grey palette caused "monochrome blindness", where all metadata metrics, categories, and content types appeared in an undifferentiated grey smudge, forcing the user to read every word to locate key signals.
- **Decision**:
  1. **Strict Calibrated Tone Rule**: Do not restrict the UI to 4 colors; support the entire color spectrum for distinct domains (AI in Fuchsia, Systems in Sky Blue, Design in Teal, Cognition in Purple, Typography in Amber, Philosophy in Rose, etc.), while strictly enforcing uniform 600–700 light / 400 dark tones.
  2. **Pure Typographic Application**: Colors are applied exclusively to small metadata text classes (`font-mono text-xs` / `font-sans text-xs`) and format keywords (`Video`, `Article`, `PDF`). Zero background color modifications; zero colored boxes or pills.
  3. **Central Utility**: Implemented `src/utils/categoryColors.ts` as the single source of truth for domain and format color mappings.
- **Consequences**:
  1. Instant, effortless visual scanning across curricula and lesson lists.
  2. Complete preservation of the dignified, clean Swiss paper/carbon canvas.
  3. Seamless extensibility for new educational tracks and domains.

---

## ADR-013: Constitutional Mandate for Pure White Canvas (#FFFFFF) & Clean Off-White Surfaces (#FAFAFA)
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: AI agents repeatedly introduced warm ivory (`#FDFCFA`) and beige tints (`#F7F5F0`) into `tailwind.config.mjs` and `src/styles/global.css`, violating user demands for a crisp, sterile, pure white background.
- **Decision**:
  1. **Strict Pure White Canvas**: In Light Mode, the page canvas background is permanently mandated to be 100% pure white (`#FFFFFF`). Zero ivory, zero cream, zero yellowish tint.
  2. **Clean Off-White Surfaces**: Structural UI surfaces (Header, Sidebars, Drawers) are standardized on modern neutral off-white (`#FAFAFA` / Zinc-50) framed by neutral zinc-200 dividers (`#E4E4E7`).
  3. **Repository Guardrail Enforcement**: Codified into `AGENTS.md` as an Invariant Guardrail with zero tolerance for regression.
- **Consequences**:
  1. Complete elimination of dirty or yellowish background hues.
  2. High-contrast, publication-grade reading environment.
  3. Permanent immunity against AI agents overwriting `#FFFFFF`.

---

## ADR-014: Elimination of High-Contrast Inverted UI Elements & Overlays
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: Several interactive controls (the floating selection popover, sidebar toggle buttons when open, reading comfort segmented controls, and undo toast) used harsh, solid jet-black backgrounds (`bg-ink`) or heavy dark outlines (`border-ink`). This produced abrupt visual shock and high-contrast blemishes against pure white surfaces.
- **Decision**:
  1. **Tactile Low-Contrast Active Buttons**: Prohibit `bg-ink` on button active states. Active states utilize soft recessed neutral fills (`bg-paper-200/90` light / `dark:bg-dark-border/80` dark) with standard neutral zinc borders (`border-ink-border`).
  2. **Soft Floating Overlays**: Floating menus and toasts float on crisp white paper (`bg-white` light / `dark:bg-dark-card` dark) with soft, featherweight drop shadows (`shadow-lg shadow-black/5`) and neutral zinc borders.
  3. **Soft Calibrated Removal Action**: Replaced aggressive solid red blocks (`bg-red-600 text-white`) with gentle tone-calibrated rose (`text-rose-700 bg-rose-50 border-rose-200/80` light / `dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50`).
- **Consequences**:
  1. Elimination of visual harshness and distracting black blocks during reading.
  2. Cohesive, calm Swiss editorial experience where interactive overlays feel integral to the paper medium.


