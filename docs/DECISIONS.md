# Architectural Decision Records (ADR)

This file records the key architectural and design decisions made in the development of **AHKH Study Hub**.


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

---

## ADR-015: Build-Time Automatic YouTube Transcript Ingestion
- **Date**: 2026-09-04
- **Status**: Accepted
- **Context**: Video lessons rendered only the formatted study version; no verbatim lecture script existed anywhere on-site, and hand-copying transcripts does not scale as new videos get embedded.
- **Decision**:
  1. `scripts/fetch-transcripts.mjs` auto-discovers every `youtubeId` in `src/data/courses.ts`, downloads the video's public caption track via YouTube's Innertube player endpoint plus timedtext (plain Node fetch — no CORS limits, no OAuth, no third-party service), and bakes verbatim cues into `src/data/transcripts.json`.
  2. The study reader renders a `Formatted / Original script` toggle for video lessons; both views share the same timestamp-sync engine and click-to-seek, and the choice persists in `localStorage`.
  3. Ingestion runs automatically before every build via the `prebuild` npm hook (`npm run transcripts` for manual runs with `--refresh` / `--ids=` options), never fails the build (exit code always 0), and videos without published captions keep an honest pending fallback.
- **Consequences**:
  1. Any newly embedded YouTube video receives its verbatim transcript automatically on the next build with zero authoring effort.
  2. Zero runtime network calls, zero servers, zero API keys — the static/local-first architecture is fully preserved.
  3. Transcript text is never hand-edited into lesson data, eliminating fabrication risk.

---

## ADR-016: Universal Prohibition of High-Contrast UI Elements, Harsh Text Jumps & Heavy Outlines
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: The user explicitly prohibited high-contrast UI designs, stark text color jumps on hover (e.g. `text-black`, `text-white`), rigid heavy borders (`border-ink`, `border-black`), and high-contrast boxed cards across the reader and platform. Such elements create visual harshness, disrupt the reading flow, and contradict the calm, publication-grade Swiss editorial sanctuary.
- **Decision**:
  1. **Strict Prohibition of High-Contrast Jumps**: Ban `text-black`, `text-white`, `border-black`, `border-ink`, `bg-black`, and `bg-ink` on interactive surfaces, cards, buttons, and navigation blocks.
  2. **Low-Contrast Quiet Editorial Surfaces**: Standardize all cards and navigation components on subtle neutral surfaces (`bg-transparent` or `bg-paper-50/50`), delicate borders (`border-ink-border/40` or `border-ink-border/60`), and restrained ink typography (`text-ink/85` transitioning quietly to `text-ink` without pitch-black jumps).
  3. **Automated Verification Enforcement**: Add an automated constitutional check in `scripts/verify-dist.mjs` that scans all built HTML pages in `dist/` and fails the build if any forbidden high-contrast class patterns are detected.
- **Consequences**:
  1. Complete elimination of visual glare and high-contrast distraction across the reading experience.
  2. A serene, quiet, publication-grade typographical environment.
  3. Invariant CI-level enforcement preventing regressions.

---

## ADR-017: Universal Prohibition of Whole-Element Movement on Hover
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: The user observed unexpected card movement (`hover:-translate-y-[1px]` and hover shadow lift) when hovering over course rows in the Library index (`/`). Whole-element movement (cards, buttons, containers, or articles shifting physical position on hover) directly violates the Swiss Modernist editorial philosophy of the platform, creating visual restlessness, motion fatigue, and gimmicky SaaS aesthetic.
- **Decision**:
  1. **Strict Prohibition of Whole-Element Motion on Hover**: Ban `hover:translate-`, `hover:-translate-`, `hover:scale-`, and all displacement transforms on entire cards, buttons, containers, articles, and interactive surfaces.
  2. **Calm, Grounded Paper Interaction**: Interactive containers and cards must remain physically stationary on hover, communicating affordance exclusively through subtle neutral background washes (`hover:bg-paper-50 dark:hover:bg-dark-card/40`) and typographic accents (`group-hover:underline`), with zero physical translation or simulated drop shadow lift.
  3. **Directional Micro-Interactions Permitted on SVG Icons Exclusively**: Positional translation on hover is permitted exclusively on nested directional SVG icons (such as an arrow chevron nudging slightly to indicate wayfinding: `group-hover:translate-x-1` / `group-hover:-translate-x-0.5`). The enclosing button, link, or card must stay completely stationary.
  4. **Automated Verification Enforcement**: Codified Check 5 into `scripts/verify-dist.mjs` to inspect all built HTML pages in `dist/` and fail the build if any non-SVG element contains hover translation or scale classes.
- **Consequences**:
  1. Anchored, bookish dignity matching fine print monographs.
  2. Complete elimination of floating or moving cards across library indices and navigation surfaces.
  3. Clear architectural boundary between container stability and icon-level wayfinding micro-interactions.
  4. Permanent automated CI protection against future regressions.

---

## ADR-018: Intentional Reading Lifecycle, Explicit Completion & State-Calibrated Scroll Progress
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: Previously, reading completion was implicitly recorded whenever a user scrolled past 90% depth or viewed short lessons. The user mandated an intentional study philosophy: reaching the bottom of a page does not signify study completion. Entering study mode requires an intentional start, completion requires an explicit user click at the bottom, and browsing without starting constitutes an exploratory visit.
- **Decision**:
  1. **Strict Removal of Auto-Completion**: Eliminated all implicit completion mechanisms (scroll-depth triggers and short-lesson auto-marks). Completion occurs strictly when the user clicks the explicit completion toggle (`#complete-lesson-btn`) at the conclusion of the lesson.
  2. **Four-Tier Study Lifecycle**:
     - `new` (Blue): Unopened lesson (`text-blue-700 dark:text-blue-400`, `bg-blue-600 dark:bg-blue-400`).
     - `explored` (Purple): Opened and browsed without clicking "Start Reading" (`text-purple-700 dark:text-purple-400`, `bg-purple-600 dark:bg-purple-400`).
     - `reading` (Amber): Explicit study mode initiated by clicking "Start Reading" (`text-amber-700 dark:text-amber-400`, `bg-amber-600 dark:bg-amber-400`). Records start timestamp.
     - `completed` (Emerald): Deliberately marked complete via bottom button (`text-emerald-700 dark:text-emerald-400`, `bg-emerald-600 dark:bg-emerald-400`).
  3. **Local Storage Schema**:
     - `ahkh_opened_${courseId}_${slug}`: ISO timestamp of exploratory visit.
     - `ahkh_reading_${courseId}_${slug}`: ISO timestamp when "Start reading" was clicked.
     - `ahkh_read_${courseId}_${slug}`: ISO timestamp when "Mark as complete" was clicked.
     - `ahkh_scroll_${courseId}_${slug}`: JSON object `{ percent: number, scrollY: number, updatedAt: string }`.
  4. **Exploratory Highlighting Reminder**: Highlighting text while in `explored` state is preserved with full fidelity, but triggers a calm, non-blocking reminder toast noting that reading mode has not yet been initiated.
  5. **Scroll Depth Tracking & Automatic Restoration**: Vertical scroll position and reading depth percentage are saved continuously and automatically restored upon navigating to any lesson.
  6. **Calibrated Curriculum Progress Affordances**:
     - Course page lesson cards display a subtle bottom hairline progress bar (`h-[2.5px]`) dynamically filled to the user's scroll percentage and colored according to the lesson's active lifecycle state.
     - Collapsible module accordions feature aggregate progress bars, completion counters, and state-reactive styling.
     - The Library index (`/`) and course header dynamically compute and display real-time status badges.
- **Consequences**:
   1. Reading progress reflects genuine human intent rather than incidental scrolling.
   2. High-fidelity scroll position restoration makes long-form study seamless across sessions.
   3. Clear pedagogical visual hierarchy across courses and modules without jarring high-contrast elements.

---

## ADR-019: Desktop Execution of ADR-008 (Windows-First Tauri Shell, Continuous Sync, Deferred P2P)
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: ADR-008 accepted a sovereign hybrid architecture but shipped zero implementation: persistence lived only in volatile browser `localStorage` across roughly one hundred touchpoints in six surfaces. The owner directed full hybrid execution now, Windows first with other systems later, continuous synchronization rather than one-time import, and explicit deferral of live P2P collaboration (ADR-007).
- **Decision**:
  1. **Unified storage entry point**: `src/utils/storage.ts` for TypeScript surfaces and a `window.AhkhStorage` browser global (`src/components/AhkhStorage.astro`, rendered in `BaseLayout`) for all inline reader scripts, with write hooks for mirror synchronization. Live behavior stays identical to previous `localStorage` semantics.
  2. **Continuous sync bridge** (`src/components/AhkhSyncBridge.astro`): versioned JSON snapshots of every `ahkh_*` key with per-key timestamps, last-write-wins reconciliation per lesson, debounced background push, pull on visibility return and ClientRouter navigation, first-run automatic import from any durable mirror.
  3. **Tauri v2 desktop shell** (`src-tauri/`): native SQLite mirror at `~/.ahkh/study.db` through two stable commands (`ahkh_load_snapshot`, `ahkh_store_snapshot`), Windows bundle targets NSIS and MSI, existing Astro `dist/` output reused as the frontend with zero visual changes.
  4. **Web durability**: automatic OPFS snapshot (`ahkh-study.json`) plus a one-click designated study file in the Commonplace Book for browsers supporting File System Access.
  5. **Scope boundaries**: P2P live rooms stay deferred; the designated file handle persists per session with OPFS as the durable fallback; building the desktop installer additionally requires a stable Rust toolchain plus VS Build Tools on Windows.
- **Consequences**:
  1. Study artifacts survive cache clears and browser switches on both desktop and web.
  2. The static GitHub Pages deployment keeps byte-identical behavior with no new runtime dependencies.
  3. Future backends plug behind the same adapter without touching reader code.

---

## ADR-020: Desktop Release Pipeline (Signed Auto-Updates, Public Downloads, Tag-Driven CI)
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: The desktop shell needed signed in-place updates, a public download surface, and unattended builds per release without disturbing the existing web `v*` release flow.
- **Decision**:
  1. **Passwordless-by-choice signing**: updater keypair generated locally with a random stored password (owner chose no memorized password); private key plus password live only in `C:\Users\abdel\.tauri\` and as the `TAURI_SIGNING_PRIVATE_KEY` secrets in GitHub; public key baked into `src-tauri/tauri.conf.json` with the updater dialog enabled.
  2. **Public downloads page** (`/downloads`): latest `app-v*` release baked at build time by `scripts/fetch-releases.mjs`, quiet older-version rows, empty state before the first release, linked from the main header.
  3. **Tag-driven CI** (`.github/workflows/desktop.yml`): `app-v*` tags build NSIS plus MSI on `windows-latest` via `tauri-action`, verify tag-to-version parity, and publish signed updater artifacts; macOS and Linux rows slot into the same matrix later.
  4. **One-command releases**: `node scripts/desktop-release.mjs <patch|minor|major>` bumps, syncs `tauri.conf.json` and `Cargo.toml` via `scripts/sync-desktop-version.mjs`, commits, tags, and pushes from a clean tree.
  5. **Local toolchain note**: on this machine the managed Git `usr\bin\link.exe` shadows the MSVC linker, so local builds run through a vcvars-initialized wrapper; CI runners are unaffected.
- **Consequences**:
  1. Installed apps update themselves in place with signature verification; the downloads page stays fresh with zero manual edits.
  2. Web and desktop versions share one `package.json` version with enforced parity at release time.
  3. First `app-v*` release must be smoke-checked for `latest.json` presence before announcing.

---

## ADR-021: Root Base for the Desktop Frontend Bundle
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: The first local desktop build launched with unstyled content and broken images: the web frontend is built with the `/ahkh-study-hub` GitHub Pages subpath, which does not resolve inside the Tauri custom-protocol webview.
- **Decision**:
  1. `astro.config.mjs` reads its base from `AHKH_BASE`, defaulting to `/ahkh-study-hub` for web.
  2. `scripts/build-desktop.mjs` (`npm run build:desktop`) builds with `AHKH_BASE=/`, and `src-tauri/tauri.conf.json` uses it as its `beforeBuildCommand`; CI inherits the same path automatically.
  3. All internal links keep using `path()`, which already adapts to `BASE_URL`, so one codebase serves both surfaces.
- **Consequences**:
  1. Desktop bundles resolve CSS, scripts, and images with zero `/ahkh-study-hub` leaks (verified: zero matches in desktop `dist/`).
  2. Web builds and constitutional `verify-dist` checks are unaffected.

---

## ADR-022: Sovereign Desktop Surfaces (Hidden Manifesto and Downloads, In-App Update Check, Bespoke Frame)
- **Date**: 2026-09-05
- **Status**: Accepted
- **Context**: The desktop app is an installed reader, not a marketing site: the Manifesto mission page and the web Downloads page have no role inside it, while the OS default window chrome contradicts the sanctuary aesthetic. The owner directed hiding both pages in the app, replacing Downloads with an update check, and shipping a bespoke frame, inviting objection on the Manifesto removal.
- **Decision**:
  1. **Host flag**: the first head script marks `document.documentElement.dataset.ahkhHost` as `tauri` or `web`; all surface differences key off CSS rules so one codebase serves both hosts with zero web impact.
  2. **Hidden in app only**: Manifesto and Downloads nav links hide under the Tauri host, and the Downloads route redirects to the library inside the app. Both pages stay fully live on the web.
  3. **Update button**: a quiet header button, visible only in the app, invokes the signed updater check and reports Checking, Updating (built-in dialog takes over), Up to date, or Unavailable without ever leaving the reader.
  4. **Bespoke frame** (`src/components/AppFrame.astro`): the OS window runs undecorated while a 40px paper bar carries the brand mark, drag region, and tactile minimize, maximize-or-restore, and close controls wired to the Tauri window API.
- **Consequences**:
  1. The installed app reads as a calm native citizen; the website keeps its complete sanctuary including Manifesto and Downloads.
  2. Update verification completes on the first published `app-v*` release alongside the `latest.json` checklist.
  3. Recorded dissent: hiding the Manifesto removes the mission statement from desktop users and splits the product narrative; accepted by the owner regardless.

---

## ADR-023: Desktop (Tauri) Freeze — Web-Only Surface Until Course Completion
- **Date**: 2026-09-06
- **Status**: Accepted
- **Context**: The owner redirected the project to a personal study tool until the Springboard course ends (2026-09-19). The desktop shell doubles maintenance (dual-base builds, signing, release pipeline) with zero study benefit now.
- **Decision**:
  1. desktop CI kept off the remote (no desktop workflow exists on origin, local file excluded from pushes): no CI builds, no `app-v*` releases until further notice.
  2. `src-tauri/`, desktop scripts, and Tauri npm scripts stay in the repo untouched: no builds, no fixes, no version bumps.
  3. GitHub Pages web build is the only live surface (desktop + mobile browsers).
  4. Revisit only after 2026-09-19 and only on the owner's explicit order.
- **Consequences**:
  1. Zero desktop maintenance cost during the study period.
  2. The `/downloads` page remains as-is (bakes releases at build time; empty state when no releases exist).
  3. Web/desktop version-parity checks are dormant while frozen.

---

## ADR-024: Content/Code Isolation — One File Per Lesson, Monolith Deprecation
- **Date**: 2026-09-08
- **Status**: Accepted
- **Context**: All course content lives in a single `src/data/courses.ts` (342KB, 5338 lines for one course of ~38 lessons), with lesson HTML embedded as TypeScript string literals. One unescaped backtick breaks the entire site build; diffs are unreviewable; parallel agent work guarantees merge conflicts; scaling to many courses multiplies a multi-MB single file.
- **Decision**:
  1. Every lesson becomes its own content file under `src/content/courses/<course>/<module>/` (Astro Content Collections), with a small `course.json` carrying course-level metadata only.
  2. `src/data/courses.ts` is deprecated as a content store and becomes (during migration) a read bridge at most; agents never author content inside code files again.
  3. Agents may write under `src/content/**` only; `src/pages`, `src/layouts`, `src/components`, and data schemas are off-limits to content-production work.
- **Consequences**:
  1. One lesson edit = one file diff; parallel agent ingestion without conflicts.
  2. No TypeScript escaping hazards in prose; content failures are per-file, not site-wide.
  3. A pre-build validation script becomes the acceptance gate (frontmatter completeness, unique slugs, slop bans) before `npm run build`.

---

## ADR-025: No Database Layer — Git Is the Source of Truth, Direct Static Publish
- **Date**: 2026-09-08
- **Status**: Accepted
- **Context**: The output is static (`output: 'static'` on GitHub Pages): no server, no dynamic queries, no user accounts. The sole editor is an AI agent with repo access. A local database (SQLite or otherwise) plus an export/sync step was evaluated.
- **Decision**:
  1. No runtime or authoring database. Content collections (Markdown/MDX files) are the local data store; git history is the change log.
  2. Content is added directly to the repo and published to GitHub Pages by the standard static build. No intermediate publish/export pipeline.
  3. A database-backed CMS UI is explicitly out of scope unless a non-technical human editor role appears in the future.
- **Consequences**:
  1. Zero sync/export machinery to break; every lesson addition is a reviewable pull-request-sized diff.
  2. The real scaling lever is page weight and build minutes, not storage (addressed in ADR-027).

---

## ADR-026: MDX Lessons + Editorial Component Library + Per-Lesson Folder With Co-Located Images
- **Date**: 2026-09-08
- **Status**: Accepted
- **Context**: Raw-Markdown lessons force the agent to paste Tailwind class strings per lesson to reach the `DESIGN.md` editorial look. The live audit (2026-09-08) proved the drift: 147 light-mode `text-*-800` tone violations, unmapped hues (`indigo`, `orange`, `red`), and banned `bg-*-50` fills inside lessons — all shipping silently. Lessons also need per-lesson images with mandatory caption attribution, lazy loading, responsive sizing, and base-aware paths.
- **Decision**:
  1. Lessons are MDX (`.mdx`) using a single editorial component library (`Axiom`, `SynthesisCard`, `SocraticCallout`, `DataMatrix`, `SourceFooter`, `LessonImage`, …) defined once; the agent writes meaning and props, never class strings.
  2. Each lesson is a folder (`<slug>/index.mdx`) with its images co-located (`./fig-1.png`); moving or deleting a lesson moves or deletes its assets with it — no orphans.
  3. `LessonImage` enforces the image contract centrally: optimized formats (webp), max width cap, `loading="lazy"` below the fold, and mandatory caption/attribution.
  4. Requires adding the Astro MDX integration; JSX errors fail the build loudly instead of shipping silent visual drift.
- **Consequences**:
  1. Global redesign = editing one component file, not hundreds of lessons.
  2. Image weight budget and attribution become structurally enforced, not agent-disciplined.

---

## ADR-027: Reader Weight Extraction — Shared Script, Per-Page Data Attributes, Immediate Lane
- **Date**: 2026-09-08
- **Status**: Accepted
- **Context**: Measured 2026-09-08: `[slug].astro` is 2963 lines / 141KB containing one `is:inline` script of ~2050 lines (~86KB) duplicated verbatim into every lesson HTML (only 7 `define:vars` differ per page). Result: 38 lessons produce a 13.44MB `dist` at ~200–275KB per page; 1000 lessons at the same weight would approach ~350MB of deploy payload against GitHub Pages soft limits.
- **Decision**:
  1. Extract the reader script to one shared built file (`src/scripts/reader.*`); per-lesson variables pass via `data-*` attributes on the page (~300 bytes per page instead of 86KB).
  2. Shared JS loads once and caches across lesson navigations; set a per-page weight budget as part of the framework.
  3. This is **immediate-lane work** (no framework dependency): it touches code only, not content or the production pipeline.
- **Consequences**:
  1. Expected page weight drops from ~250KB toward sub-100KB; 1000-lesson deploy projection drops from ~350MB toward ~100MB.
  2. Visitor runtime is unaffected in kind (one page loads at a time); build minutes still grow linearly with page count and need watching.

---

## ADR-028: Content Production Framework — Scope and Prerequisites
- **Date**: 2026-09-08
- **Status**: Accepted (scope); framework design itself pending
- **Context**: The owner will task an agent with "add this source to my library," and everything the agent does from that moment on must be governed by one designed framework — not ad-hoc instructions per lesson.
- **Decision**: The framework MUST specify:
  1. Source reproduction policy (verbatim vs. minimum-necessary paraphrase per ADR-009, title architecture, attribution footer).
  2. Writing and display formats (MDX usage, which editorial component for which content shape, frontmatter schema).
  3. Image policy per lesson: reuse original assets vs. regenerate (proprietary/low-fidelity rule), illustrative additions, and one unified image-design style derived from owner-supplied reference images.
  4. Color usage rules and icon rules for content surfaces (prerequisite: resolve the audit findings — tone invariant enforcement, mapped-hue discipline, background-fill ban, status-badge exception).
- **Consequences**:
  1. No bulk ingestion work starts until the framework is designed; see execution lanes below.

---

## ADR-029: Migrate vs. Regenerate Existing Lessons From Scratch- **Date**: 2026-09-08
- **Status**: Proposed (deferred to owner, after framework design)
- **Context**: The owner raised the option of deleting all current lessons and re-producing them under the new framework instead of migrating `courses.ts` content.
- **Decision**: Undecided. Migration preserves finished study state (Springboard course in progress until 2026-09-19); regeneration guarantees framework purity at the cost of redoing ~38 lessons.
- **Consequences**: No deletion or regeneration happens without an explicit owner order.

---

## Execution Lanes (2026-09-08): Do Now vs. Framework-Gated
- **Do now (no framework dependency)**:
  1. ADR-027 reader script extraction + `data-*` vars + weight measurement.
  2. Add tone-calibration and mapped-hue checks to `scripts/verify-dist.mjs` (close the audit gap; no new content involved).
- **Framework-gated (design first, then execute)**:
  1. One-off splitter: `courses.ts` → per-lesson MDX folders (or regeneration per ADR-029).
  2. `[slug].astro` / `[course]/index.astro` migration to Content Collections.
  3. Editorial component library + `LessonImage` + image style and weight budget.
  4. Color and icon usage rules for content; pre-build validation gate.

---

## ADR-030: Seven Signal Hues, Icon Law & Badge Discipline (Design-System Scope)
- **Date**: 2026-09-08
- **Status**: Accepted
- **Context**: Live audit proved hue reuse across three semantic axes (amber = typography domain + PDF format + reading state; rose = philosophy + video; purple = cognition + explored), 147 light-mode `text-*-800` tone violations, banned `bg-*-50` fills in lessons, 44 ad-hoc `indigo` uses, colored icons with no governing rule (amber book on Start Reading, 10 rainbow icons in manifesto), and a self-contradicting spec (`DESIGN.md` Socratic example uses banned `text-teal-800`). This ADR belongs to the design system (broader than, and binding on, the content framework per ADR-028).
- **Decision**:
  1. **Seven hues, one meaning each** (text-only, 600–700 light / 400 dark): Blue = NEW badge; Purple = EXPLORED badge; Amber = READING badge + reading progress; Emerald = COMPLETED + success confirmations; Rose = VIDEO keyword + video chrome + destructive; Sky = ARTICLE keyword + info; Teal = Socratic inquiry header.
  2. **Banned outright**: `indigo`, `orange`, `red` (remap to zinc or the owning hue), and light grades `800/900/950` everywhere.
  3. **Domain quarantine**: domain hues live in exactly one position — the category kicker line. Never in badges, titles, icons, or callouts.
  4. **Icon law**: icons inherit text color; colored only when sitting on an already-colored signal, matching it exactly. Start Reading button becomes text-only (no icon); manifesto section icons go monochrome; copy-check keeps emerald with a fixed missing `dark:` variant.
  5. **Badge discipline**: dot + mono text only (ADR-010 over the `AGENTS.md` pill wording); `bg-*-*` banned entirely and verified in CI.
  6. **Spec repair**: `DESIGN.md` Socratic example corrected to `text-teal-700`; `categoryColors.ts` remains the single source of truth.
- **Consequences**:
  1. No lesson or page can invent a color meaning; violations fail the build (new `verify-dist` color checks, immediate lane).
  2. Existing lesson drift (147 tone breaks, indigo system, fills) is cleaned during the ADR-026 migration.

---

## ADR-031: Design-Token Locks — Radius, Shadow, Motion, Borders, Layers, Spacing (Design-System Scope)
- **Date**: 2026-09-08
- **Status**: Accepted (owner-delegated lock-in)
- **Context**: Audit 2026-09-08 proved phantom tokens: `rounded-xs` (~188 uses), `rounded-2xs`, and `shadow-2xs` (×23) do not exist in Tailwind v3, so the built CSS contains none of them — the whole site renders sharp corners and shadowless buttons while the code requests otherwise. Plus unregulated durations (150/200/300/700), `transition-all` overreach, dead `ahkh-shimmer`/`ahkh-rule-reveal` keyframes, four border opacities, undeclared z-layers, ad-hoc paddings, one `text-4xl` orphan, and `font-ui` leaking into lesson content (×27).
- **Decision**:
  1. **Radius (real tokens)**: `2xs: 1px`, `xs: 2px` defined in `tailwind.config.mjs`; `full` for dots only. Bare `rounded` and `rounded-xl/sm/md/lg` banned in content (→ `rounded-xs`); `max-w-[270px]` → `max-w-xs`. No other radii.
  2. **Shadow**: `2xs: 0 1px 2px rgb(0 0 0 / 0.05)` for tactile buttons; `lg` exclusively for floating overlays (ADR-014). No other shadows.
  3. **Motion**: `150` micro-interactions, `300` spatial (drawer/header), `700` progress-fill exception only; `ease-out` only; `transition-all` banned (→ `transition-colors`/`transform` as appropriate); dead keyframes deleted.
  4. **Borders**: cards solid `border-ink-border`; section dividers `/60`; chrome/header rules `/80`; `/70` normalized to `/60`.
  5. **Layers**: `z-30` sticky headers, `z-40` menus/dropdowns, `z-50` progress bar + popover + toast. Nothing else.
  6. **Spacing**: canonical card `p-6` (`p-5 sm:p-6` responsive pair allowed), section rhythm `my-8`, page `py-12`; spacing from the Tailwind scale only, arbitrary brackets banned.
  7. **Type clean-up**: `text-4xl` orphan → `3xl`; lesson micro-labels `font-ui` → `font-mono` (data voice per role rule).
  8. **Enforcement**: every lock above gets a `verify-dist.mjs` check; phantom-token regression is caught by asserting the tokens exist in built CSS.
- **Consequences**:
  1. The `rounded-xs`/`shadow-2xs` classes already written across ~200 sites come alive with zero markup churn (token definition, not class migration).
  2. Motion, borders, layers, and spacing stop drifting per-file; new violations fail the build.
