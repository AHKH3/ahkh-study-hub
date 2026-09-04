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
  - The card must ONLY display: course number, title, module count, source count, duration, progress bar, and status badge.
  - Textual overviews and module summaries belong exclusively inside the course's dedicated page (`/courses/[course]/index.astro`).
- **Status Badge Color Taxonomy**:
  - `active`: Emerald (`text-emerald-700 bg-emerald-50 border-emerald-200`)
  - `new`: Blue (`text-blue-700 bg-blue-50 border-blue-200`)
  - `explored`: Purple (`text-purple-700 bg-purple-50 border-purple-200`)
  - `completed`: Pink (`text-pink-700 bg-pink-50 border-pink-200`)
- **Absolute Ban on Emojis**: Zero emojis in the codebase, UI, lesson text, badges, buttons, and markdown files. Use clean inline SVG icons and dignified typographical symbols (`—`, `•`, `//`, `*`) exclusively.
- **Verbatim Text Preservation**: Content from articles, video transcripts, or PDFs must be ingested with 100% fidelity. Never summarize, truncate, or rewrite text unless explicitly instructed by the user.
- **Local Sovereignty**: All reader highlights and marginal notes persist exclusively in browser `localStorage` under `ahkh_hl_${courseId}_${lessonId}`. Never add remote servers, databases, or tracking telemetry.
- **Base URL Awareness**: All internal links and static assets must wrap their paths with `path()` from `src/utils/paths.ts` to ensure flawless routing on GitHub Pages (`/ahkh-study-hub`).

## 3. Post-Implementation Verification
- Always execute `npm run build` to confirm zero TypeScript, Vite, or Astro compilation errors before reporting completion.
