# AHKH Study Hub — Project Definition & Specifications

AHKH Study Hub is an offline-ready / static editorial study sanctuary and learning-journey platform, designed as a permanent, high-craft, open alternative to Readwise Reader.

## Core Value Proposition

1. **Text-First Content Re-architecture (Strict Fidelity):**
   - Ingests articles, video transcripts, and extracted PDF texts.
   - Absolute preservation of verbatim source text: zero summarizing, zero alteration, zero unauthorized omission.
   - Re-architects raw content into publication-grade editorial typography with structured sections, pull quotes, and callouts.

2. **Site Architecture & Primary Surfaces:**
   - **`/` (The Library / المكتبة):**
     - Contained layout (`max-w-3xl`), never stretches edge-to-edge.
     - Soft monochrome aesthetic (warm charcoal on quiet cotton paper).
     - Standard clean top header with brand and navigation (`Library`, `Manifesto`, `Commonplace`).
     - **Layout:** The Editorial Monograph Index (clean horizontal rows showing course number, title, progress indicator, and status).
     - **Strict Rule (Course Listing Purity):** In the Library course listing, ALL course descriptions and subtitles are strictly removed. The course title is expressive enough along with structural metadata: module count, source count, duration, and status badge. For textual summaries and descriptions, the learner must click into the dedicated course page.
     - **Course Status Taxonomy & Color Standards:**
       - `Active` (نشط): Green / Emerald (`text-emerald-700 bg-emerald-50 border-emerald-200`)
       - `New` (جديد): Blue (`text-blue-700 bg-blue-50 border-blue-200`)
       - `Explored` (مستكشف): Purple (`text-purple-700 bg-purple-50 border-purple-200`)
       - `Completed` (تم): Pink (`text-pink-700 bg-pink-50 border-pink-200`)
     - **Absolute Ban on Emojis:** Zero emojis in the entire project. Clean SVG icons and dignified typography only.
   - **`/manifesto` (About & Philosophy / بيان المشروع):**
     - The mission, methodology, synthesis ethics, and Readwise Reader alternative rationale.
   - **`/commonplace` (All Highlights Archive & Readwise Exporter / مستودع التظليلات والتصدير):**
     - Global searchable archive of all local highlights across all courses.
     - **Readwise Export:** Direct download of highlights in standard Readwise-compatible CSV format (`Highlight`, `Title`, `Author`, `URL`, `Note`, `Date`) + Markdown.
   - **`/courses/[course]` (The Course Journey / خريطة الكورس):**
     - Visual learning journey / vertical roadmap with connecting line between milestones and lessons.
   - **`/courses/[course]/[lesson]` (The Study Reader / قارئ الدراسة):**
     - **Top Progress Bar:** Fixed at `top: 0` above the header, permanently visible.
     - **Smart Header:** Hides on scroll down, reappears on scroll up. Houses back button, left sidebar toggle, display settings, right sidebar toggle.
     - **Left Sidebar:** Table of Contents / Headings outline for internal navigation.
     - **Right Sidebar & Marginalia (Sidenotes):**
       - Sidenotes displayed in the right margin gutter directly adjacent/aligned to their corresponding highlighted text on desktop screens (Tufte/Editorial style).
       - Right collapsible sidebar aggregates all highlights and notes with jump-to-source click.
     - **Floating Popover on Text Selection / Highlight Click:**
       - Sleek minimal popover: [Highlight / Remove Highlight] · [Add / Edit Note] · [Copy Quote with Citation].
     - **YouTube Sync:** Embedded video at top with auto-scrolling, synchronized transcript highlighting.

3. **Tech Stack:**
   - Astro + Tailwind CSS (Static export, blazing performance, 0 JS bloat).

