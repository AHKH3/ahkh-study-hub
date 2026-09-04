# DESIGN.md — AHKH Study Hub Design System

## 1. Visual Identity & Mode
- **Mode:** `Read` (Deep, focused reading) + `Operate` (Course roadmap & study tools).
- **Aesthetic:** Soft Monochrome & Swiss Editorial. Quiet, tactile, restrained.
- **Rule of Framing:** Pages never stretch to fill the full monitor width. Contained centered measures (`max-w-3xl`) with generous breathing gutters preserve bookish dignity.

## 2. Color Worlds

### Global Soft Monochrome (The Sanctuary Canvas)
- `bg-canvas`: `#FFFFFF` (Pure Crisp White)
- `bg-card`: `#FFFFFF`
- `border-subtle`: `#E4E4E7` (Crisp Minimal Zinc Border)
- `text-ink`: `#09090B` (Carbon ink)
- `text-muted`: `#71717A` (Subtle secondary text)
- `text-faint`: `#A1A1AA`

### The Four Ornamental Accent Colors (Decorative Badges & Status Only)
The platform's primary aesthetic is strictly **Soft Monochrome & Swiss Editorial** (carbon ink, clean paper, subtle rules). The four colors below are **strictly ornamental and decorative accents** (small status chips, indicator dots, or discrete metadata badges) and MUST NEVER dominate or be used as whole-page theme colors, heading colors, or large background fills:
- **Emerald:** `text-emerald-700 bg-emerald-50 border-emerald-200` — Status badge for Active courses.
- **Blue:** `text-blue-700 bg-blue-50 border-blue-200` — Status badge for New courses.
- **Purple:** `text-purple-700 bg-purple-50 border-purple-200` — Status badge for Explored courses.
- **Pink:** `text-pink-700 bg-pink-50 border-pink-200` — Status badge for Completed courses.

> **Restraint & Anti-Slop Principles:**
> 1. The entire platform is grounded in monochromatic stillness (pure white canvas and carbon ink).
> 2. Never tint titles, buttons, borders, or tab backgrounds with loud or arbitrary neon colors (avoiding generic AI slop).
> 3. Accent colors are strictly restrained to discrete 6px indicator dots or small rounded pills.
> 4. Burnt Terracotta is strictly scoped to the Springboard UX course theme.

### Course DNA (Single Highlight Color per Course)
- **Springboard UX Curriculum:**
  - `course-accent`: `#B35334` (Burnt Terracotta — scoped strictly to Springboard UX course files only)
  - `highlight-single`: `rgba(235, 130, 95, 0.28)`
  - `sidenote-border`: `#C86F52`

## 3. Typography & Editorial Rules

### Permanent Rule: Course Listing Purity
- In the Library course listing (`/`), ALL course descriptions and subtitles are strictly removed.
- The course title is expressive enough along with structural metadata: module count, source count, duration, and status badge.
- For textual descriptions and curriculum details, the user clicks into the individual course page.

### Absolute Ban on Emojis
- Zero emojis across the entire project. All interfaces rely exclusively on dignified typography and clean geometric SVG icons.

### Typography Architecture
- **Editorial Longform:** `Newsreader` / `Lora`
  - High legibility, graceful italics, generous line height (`1.75`), contained reading width (`68ch` / `720px`).
- **Marginalia / Sidenotes:** `Newsreader Italic` / `Inter`
  - Small size (`0.85rem`), muted tone, positioned in the outer right margin aligned with the paragraph.
- **UI Structure & Meta:** `Inter`
  - Navigation, roadmaps, buttons, timestamps, badges.
- **Precision Data:** `JetBrains Mono`
  - Lesson numbers, video timestamps, shortcut hints.

## 4. Mechanical Specifications for Study Reader

### 1. Top Fixed Progress Line
- Position: `fixed top-0 left-0 w-full h-[3px] z-50`
- Fill: Course accent color (`--course-accent`)
- Behavior: Never scrolls off-screen; indicates exact reading completion percentage.

### 2. Smart Auto-Hiding Header
- Position: `fixed top-[3px] left-0 w-full h-14 z-40`
- Behavior:
  - Scroll down (>60px): Slides up (`translateY(-100%)`).
  - Scroll up: Slides down (`translateY(0)`).
  - Dismisses open menus and popovers on scroll.

### 3. Collapsible Dual Sidebars
- **Left (Outline TOC):** Collapsible drawer listing heading anchors.
- **Right (Highlights & Sidenotes):** Collapsible drawer listing captured passages.
- **Zen Mode:** Collapses both sidebars simultaneously with one click.
