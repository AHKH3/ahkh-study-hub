# AHKH Study Hub — Project Definition & Specifications

AHKH Study Hub is a sovereign, local-first static study platform and reader companion engineered as a permanent, high-craft open alternative to subscription services like Readwise Reader.

---

## Core Value Proposition

### 1. Text-First Content Re-architecture (Strict Fidelity)
- Ingests articles, video transcripts, and extracted PDF texts.
- **Absolute Preservation of Verbatim Text:** Zero algorithmic summarizing, zero alteration, zero unauthorized omission.
- Re-architects raw content into publication-grade editorial typography with structured sections, pull quotes, and callouts.

### 2. Primary Surfaces & Interface Architecture
- **`/` (The Library):**
  - Contained layout (`max-w-3xl`), never stretching edge-to-edge.
  - Soft monochrome aesthetic (carbon ink on pure crisp white paper).
  - Standard clean top header with brand and navigation (`Library`, `Manifesto`, `Commonplace`).
  - **Layout:** The Editorial Monograph Index (clean horizontal rows showing course number, title, progress indicator, duration, and status).
  - **Strict Rule (Course Listing Purity):** In the Library course listing, all course descriptions and subtitles are strictly removed. The course title is expressive enough along with structural metadata: module count, source count, duration, and status badge. For textual summaries and descriptions, the learner clicks into the dedicated course page.
  - **Course Status Taxonomy & Color Standards:**
    - `Active`: Green / Emerald (`text-emerald-700 bg-emerald-50 border-emerald-200`)
    - `New`: Blue (`text-blue-700 bg-blue-50 border-blue-200`)
    - `Explored`: Purple (`text-purple-700 bg-purple-50 border-purple-200`)
    - `Completed`: Pink (`text-pink-700 bg-pink-50 border-pink-200`)
  - **Absolute Ban on Emojis:** Zero emojis across the entire project. Clean inline SVG icons and dignified typography exclusively.

- **`/manifesto` (The Architecture of Literature):**
  - Articulates the core mission: rescuing thought from monotonous, dead text walls and transforming them into engaging literature through HTML and CSS.

- **`/commonplace` (The Commonplace Book):**
  - Global searchable archive of all local highlights and notes across all curricula.
  - Keyboard search shortcut `/`.
  - **Readwise Export:** Direct download of highlights in official Readwise-compatible CSV format (`Highlight`, `Book Title`, `Book Author`, `URL`, `Note`, `Location`, `Date`) and Markdown.

- **`/courses/[course]` (The Course Journey):**
  - Visual learning journey with connected vertical roadmap linking milestones and lessons.

- **`/courses/[course]/[slug]` (The Study Reader):**
  - **Top Progress Bar:** Fixed at `top: 0` (3px), permanently visible with course signature accent color.
  - **Smart Auto-Hiding Header:** Hides on scroll-down, reappears on scroll-up.
  - **Left Sidebar:** Collapsible Table of Contents outline.
  - **Right Sidebar & Marginalia:**
    - Sidenotes render directly in the desktop right margin gutter alongside the highlighted paragraph.
    - Right collapsible sidebar aggregates all lesson highlights and notes with jump-to-source navigation.
  - **Floating Action Popover:** Appears on text selection: `[Highlight / Remove]` · `[Add/Edit Sidenote]` · `[Copy Quote with Citation]`.
  - **Media Player & Transcript Sync:** Embedded video lessons with interactive timestamps synchronized to article transcript blocks.

### 3. Technology Stack
- Astro 7.x + Tailwind CSS 3.x (Static SSG, zero runtime JS bloat, high performance).

### 4. Course Creation & Unified Design System Standard
All courses, learning roadmaps, and study readers adhere strictly to the **Unified Global Design System** documented in [`DESIGN.md`](../DESIGN.md).
- Rather than fragmenting the platform with divergent styling per course, all courses share the cohesive Soft Monochrome & Swiss Editorial design language.
- When creating or importing a new course, format its articles using the Universal Editorial Component Library (Axiom Pullout Quotes, Synthesis Cards, Socratic Callouts, and Data Matrices).
- Strictly maintain Course Listing Purity in the Library index (no descriptions or subtitles), verbatim text fidelity, and zero emojis.
