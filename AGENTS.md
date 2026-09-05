<!-- CONSTITUTION:START -->
# دستور مجلد الشغل — إلزامي على كل وكيل

هذا المشروع تابع لدستور مجلد الشغل. المرجع الأعلى: `C:/Users/abdel/dev/AGENTS.md` — اقرأه فورًا (هوية المستخدم، القواعد الكاملة، فهرس المشاريع). أي تعليمات محلية هنا لا تخالفه.

## قواعد إلزامية (Guardrails)

1. قبل تنفيذ أي ميزة أو تغيير كبير: اقرأ `docs/PROJECT.md` أو `README.md` وحدّد هل الطلب داخل النطاق المعلن.
2. طلب خارج النطاق: أوضحه للمستخدم (وقت/تعقيد/خطر كسر الموجود) ولا تنفّذ شيئًا قبل تأكيد صريح.
3. ممنوع إضافة ميزات "مساعدة" غير مطلوبة أو تعديل مجالات محظورة/مجمّدة.
4. إذا أصرّ المستخدم: سجّل القرار في `docs/DECISIONS.md` (تاريخ + طلب + قرار + تأثير) وكـ ADR في الجراف (`manage_adr`) ثم أعد الفهرسة.
5. لا تعدّل القرارات المسجلة أو تعريف النطاق أو الدستور بدون إذن صريح.
6. افهم المشروع عبر جراف الكود (`codebase-memory-mcp`) بدل قراءة كل الملفات: `index_repository` ثم `get_architecture` / `search_graph` / `trace_path`.
<!-- CONSTITUTION:END -->

---

# AHKH Study Hub — Agent Directives & Course Creation Protocols

All AI programming agents (opencode, Claude Code, Cursor, Codex, Antigravity, Gemini CLI) working on this project MUST strictly comply with the following instructions:

## 1. Adding a New Course & The Unified Global Design System
All courses in AHKH Study Hub adhere strictly to the **Unified Global Design System** documented in [`DESIGN.md`](DESIGN.md):
1. **No Per-Course Divergent Styling**: Do NOT invent competing design systems, random color themes, or divergent layouts for individual courses. All courses, roadmap journeys, and study readers share the single, publication-grade Soft Monochrome & Swiss Editorial design system.
2. **Universal Editorial Component Library**: Format lesson content exclusively using the standardized editorial components detailed in `DESIGN.md`:
   - **The Pullout Axiom** (Commanding blockquote with author attribution).
   - **The Key Principle / Synthesis Card** (Clean paper card for core takeaways).
   - **The Socratic Callout** (Study inquiry & reflection container).
   - **The Comparative Data Matrix** (Minimal grid for contrasts and heuristics).
   - **The Source Attribution Footer** (External publication citation link).
3. **Course Ingestion**: Register new courses, modules, and lessons in [`src/data/courses.ts`](src/data/courses.ts).

## 2. Invariant Guardrails (Zero Exceptions)
- **Course Listing Purity in `/` (The Library Index)**:
  - NEVER add descriptions or subtitles to course cards in `src/pages/index.astro`.
  - The card must ONLY display: course number, category tag (in its calibrated domain color), title, module count, source count, duration, progress bar, and status badge.
  - Textual overviews and module summaries belong exclusively inside the course's dedicated page (`/courses/[course]/index.astro`).
- **Course Page & Reader Purity (Zero Redundant Eyebrows & Helper Copy)**:
  - NEVER add superfluous section headers, redundant eyebrows, or decorative micro-copy (e.g., `Curriculum Roadmap`, `Course Structure`, `Click any lesson to start reading`, `Table of Contents` eyebrows).
  - The content, module lists, and lesson entries must speak for themselves directly without AI-generated scaffolding or meta-commentary labels.
- **Canvas Purity & Neutral Surfaces (Pure White #FFFFFF & Clean Off-White #FAFAFA)**:
  - The canvas background in Light Mode is MANDATED to be 100% PURE WHITE (`#FFFFFF`, `bg-white`).
  - NEVER use `#FDFCFA`, warm ivory, cream, or beige tints for the background.
  - Secondary structural surfaces (Header, Sidebars, Drawers) use Clean Modern Off-White (`#FAFAFA` / `bg-paper-100`) separated by neutral zinc-200 rules (`#E4E4E7`, zero yellow tint).
  - Any AI agent that changes the canvas to warm ivory or beige is in direct violation of project constitution.
- **Color Accent & Theme Discipline (The Calibrated Tone Invariant)**:
  - The default canvas is strictly Swiss Modernist Monochrome (`#18181B` carbon ink / `#FFFFFF` pure white canvas).
  - To eliminate monochrome blindness, small metadata text (`font-mono text-xs` / `font-sans text-xs` for domains, format keywords `Video`/`Article`/`PDF`, and metrics) uses the **Extensible Tone-Calibrated Color System** (`src/utils/categoryColors.ts`).
  - Strict tone rule: Calibrated 600–700 hues in light mode, calibrated 400 hues in dark mode. Pure text color only; zero colored background cards or pills.
  - Never hardcode or inject orange/terracotta as a default or universal course theme.
- **Status Badge Color Taxonomy**:
  - `active`: Emerald (`text-emerald-700 bg-emerald-50 border-emerald-200`, dot `bg-emerald-600 dark:bg-emerald-400`)
  - `new`: Blue (`text-blue-700 bg-blue-50 border-blue-200`, dot `bg-blue-600 dark:bg-blue-400`)
  - `explored`: Purple (`text-purple-700 bg-purple-50 border-purple-200`, dot `bg-purple-600 dark:bg-purple-400`)
  - `completed`: Slate (`text-slate-600 dark:text-slate-400`, dot `bg-slate-500 dark:bg-slate-400`)
- **Absolute Ban on AI Slop & Synthetic Crutches (Zero Slashes `//` & Zero Emojis)**:
  - Strictly ZERO emojis and ZERO double-slashes (`//`) in the codebase, UI, lesson text, badges, cards, or markdown files.
  - Never use `//` or programming syntax as a fake "technical" or "editorial" costume.
  - Never use kickers or eyebrows above headings; per the Impeccable Craft Floor, the heading carries its own weight.
  - Use clean, bespoke inline SVG icons and dignified typographical punctuation (`—`, `•`) exclusively.
- **Verbatim Text Preservation**: Content from articles, video transcripts, or PDFs must be ingested with 100% fidelity. Never summarize, truncate, or rewrite text unless explicitly instructed by the user.
- **Local Sovereignty**: All reader highlights and marginal notes persist exclusively in browser `localStorage` under `ahkh_hl_${courseId}_${lessonId}`. Never add remote servers, databases, or tracking telemetry.
- **Low-Contrast Tactile Active States & Overlays (Universal Prohibition of High-Contrast Harshness)**: Never invert active buttons, segmented controls, floating menus, or selection popovers into solid jet-black blocks (`bg-ink`, `bg-black`) or heavy black borders (`border-ink`, `border-black`). Never use stark hover text color jumps (`text-black`, `text-white`). Active states on light surfaces must use subtle recessed neutral fills (`bg-paper-200/90` or `bg-white` with `shadow-2xs`) and maintain standard neutral zinc borders (`border-ink-border`). All cards, navigation affordances, and interactive surfaces must remain low-contrast, serene, and calm, integrating peacefully into the paper medium.
- **Universal Prohibition of Whole-Element Movement on Hover (ADR-017)**: Entire elements (cards, buttons, containers, articles, rows) must NEVER physically move, translate, or scale on hover (`hover:translate-`, `hover:-translate-`, `hover:scale-`). Movement is permitted exclusively as directional micro-interactions on nested SVG icon elements (e.g., an arrow chevron nudging slightly on link hover: `group-hover:translate-x-1` / `group-hover:-translate-x-0.5`). Cards, buttons, and rows communicate hover affordance purely via subtle low-contrast background washes (`hover:bg-paper-50 dark:hover:bg-dark-card/40`) and text decoration (`group-hover:underline`), remaining firmly grounded on the paper canvas with zero hover elevation shadows.
- **Intentional Reading Lifecycle & Explicit Completion (ADR-018)**:
  - Lessons adhere to a strict 4-state lifecycle: `new` (blue dot), `explored` (purple dot), `reading` (amber dot), `completed` (emerald dot).
  - NEVER trigger reading completion implicitly via scroll depth (such as reaching 90% or the page bottom) or short lesson length. Completion requires an explicit user action on the bottom completion button.
  - Entering study mode requires clicking "Start Reading", which records the start timestamp and switches the state to `reading`. Highlighting while in `explored` state preserves the highlight but triggers a polite reminder toast.
  - Continuous vertical scroll position and depth percentage must be stored locally (`ahkh_scroll_...`) and faithfully restored upon opening any lesson.
- **Base URL Awareness**: All internal links and static assets must wrap their paths with `path()` from `src/utils/paths.ts` to ensure flawless routing on GitHub Pages (`/ahkh-study-hub`).

## 3. Visual Reproduction, Synthetic Assets & Course Source Protocol (دستور إعادة إنتاج الدروس والأصول البصرية)
All agents creating or updating courses and lessons must follow these mandatory asset and reproduction standards:
1. **Public & Real-World UI Screenshots**:
   - For real-world production applications (e.g. Instagram, Apple iOS, Google, Figma interfaces), use clean public reference screenshots with clear caption attributions.
2. **Proprietary, Uncertain or Low-Fidelity Assets**:
   - NEVER leave broken image links, blurry low-res scans, or empty placeholder boxes.
   - If an original diagram or image is proprietary, low-resolution, or of uncertain provenance, re-create an equivalent high-fidelity visual asset using either:
     - The `generate_image` tool for visual illustrations and realistic interface renders.
     - Pure programmatic code (HTML5 canvas, responsive CSS/Tailwind components, or inline SVG) for wireframes, sitemaps, data matrices, and architectural schemas.
3. **Autonomous Pedagogical Elevation**:
   - Do not restrict yourself to what is solely on paper or text. You have full programmatic agency. Proactively generate expressive, informative visual illustrations and interactive wireframe models whenever they elevate conceptual understanding for the learner.
4. **Absolute Ban on Promotional Clutter & Marketing Fluff**:
   - The platform is a sovereign, publication-grade academic library.
   - NEVER copy or generate commercial marketing copy, promotional banners, academy sales pitches, or repetitive vendor slogans.
   - Mention the original source strictly as a quiet, dignified academic citation in the standardized **Source Attribution Footer** at the bottom of the lesson ("من باب العلم بالشيء").
5. **Curriculum Scope & Syllabus Integrity**:
   - Never artificially compress or abandon resources from an approved syllabus matrix. All sources in the curriculum index must be either directly authored as dedicated lessons or systematically structured into coherent, comprehensive sequential modules without discarding topics.

## 4. Post-Implementation Verification
- Always execute `npm run build` to confirm zero TypeScript, Vite, or Astro compilation errors before reporting completion.
