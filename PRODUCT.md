# PRODUCT.md — AHKH Study Hub

## Purpose
A dedicated, zero-maintenance online study hub and reading sanctuary for serious courses and bootcamps, starting with the Springboard UX curriculum. Serves as a bespoke, permanent alternative to Readwise Reader with an editorial reading experience tailored for deep focus and comprehension on both desktop and mobile.

## Users
- **Primary User:** The author/student studying intensive curricula, requiring high legibility, local note-taking, and zero cognitive friction.
- **Secondary Audience:** Public learners accessing high-quality, structured open course companions for free.

## Platform
- `web` (Responsive static site, mobile and desktop).

## Stack
- **Engine:** Astro (Static Output)
- **Styling:** Tailwind CSS + Bespoke Typography Tokens
- **Content Format:** MDX with Content Collections
- **Persistence:** Client-side `localStorage` (Zero server dependencies)

## Mechanism
1. **Faithful Content Re-architecting:** AI ingests diverse course materials (articles, transcripts, extracted PDF texts) and restructures them into magazine/book-grade editorial layouts while strictly preserving verbatim source text.
2. **Library Hub:** Notion-like neutral aesthetic listing all courses, tags, and progress.
3. **Course DNA:** Each course defines its own harmonious typography pair and color atmosphere while conforming to shared editorial ergonomics.
4. **Editorial Reading Suite:**
   - 3-column architecture (Left: Course Syllabus, Center: Focus Reader, Right: Outline & Highlights).
   - Instant Zen Mode (single toggle collapses both sidebars to leave only pure content).
   - Multi-color highlighter with instant `localStorage` persistence.
   - Inline commentary/notes per highlight.
   - Reading progress bar and Markdown export of highlights.

## Brand & Visual Commitments
- **Aesthetic Direction:** Editorial / Architectural / Swiss Modernist.
- **Main Hub:** Neutral Notion-like elegance (monochrome neutrals, subtle borders, high information density without clutter).
- **Typography Philosophy:** Rich serif headlines / long-form editorial bodies (e.g. Newsreader, Instrument Serif, Merriweather) balanced by clean utilitarian sans for UI wayfinding (e.g. Geist, Inter, Plus Jakarta Sans).
- **Purity:** No distracting ads, popups, trackers, or heavy runtime frameworks.

## Constraints & Guardrails
- 100% Static HTML/CSS delivery.
- Zero commercial monetization.
- Absolute preservation of source text integrity during content intake.
