# DESIGN.md — AHKH Study Hub Design System

## 1. Visual Identity & Mode
- **Mode:** `Read` (Deep, focused reading) + `Operate` (Course roadmap & study tools).
- **Aesthetic:** Soft Monochrome & Swiss Editorial. Quiet, tactile, restrained.
- **Rule of Framing:** Pages never stretch to fill the full monitor width. Contained centered measures (`max-w-3xl`) with generous breathing gutters preserve bookish dignity.

## 2. Color Worlds

### Global Soft Monochrome (The Sanctuary Canvas)
- `bg-canvas`: `#FFFFFF` (Pure Crisp White)
- `bg-card`: `#FFFFFF` / dark: `#181816`
- `border-subtle`: `#E8E6E1` / dark: `#262523`
- `text-ink`: `#22211F` (Muted carbon, never stark #000)
- `text-muted`: `#73716C`
- `text-faint`: `#A8A6A1`

### The Four Ornamental Accent Colors (Decorative Badges & Status Only)
The site's primary aesthetic is strictly **Soft Monochrome & Swiss Editorial** (carbon ink, warm paper, subtle rules). The four colors below are **strictly ornamental and decorative accents** (small status chips, indicator dots, or discrete metadata badges) and MUST NEVER dominate or be used as whole-page theme colors, heading colors, or large background fills:
- **Emerald (الأخضر):** `text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800` — زينة للشارات النشطة (Active / Foundational).
- **Blue (الأزرق):** `text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800` — زينة للشارات الجديدة (New / Architectural).
- **Purple (البنفسجي):** `text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800` — زينة لشارات الاستكشاف (Explored / Marginalia).
- **Pink (الوردي):** `text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800` — زينة لشارات الإتمام (Completed / Mastery).

> **قاعدة الانضباط والوقار التحريري (Restraint & Anti-Slop Rule):**
> 1. الموقع بالكامل مبني على السكينة والهدوء الأحادي (Soft Monochrome: حبر وورق فقط).
> 2. يُمنع منعاً باتاً تلوين العناوين أو الأزرار أو الإطارات أو خلفيات التبويبات بالبنفسجي أو بأي لون فاقع (تجنب الـ AI Slop).
> 3. الألوان الأربعة مجرد لمسات زينة طفيفة (نقاط 6px أو رقاقات وسوم صغيرة جداً).
> 4. يُحظر استخدام اللون البرتقالي (Terracotta) في أي مكان خارج مساق Springboard UX.

### Course DNA (Single Highlight Color per Course)
- **Springboard UX Curriculum:**
  - `course-accent`: `#B35334` (Burnt Terracotta — scoped strictly to Springboard UX course files only)
  - `highlight-single`: `rgba(235, 130, 95, 0.28)`
  - `sidenote-border`: `#C86F52`

## 3. Typography & Editorial Rules

### Permanent Rule: Course Listing Purity
- In the Library course listing (`/`), ALL course descriptions and subtitles are strictly removed.
- Course name is expressive enough, accompanied solely by structural metadata: module count, source count, duration, and the status badge.
- For textual descriptions and curriculum details, the user clicks into the individual course page.

### Absolute Ban on Emojis
- Zero emojis across the entire project. All interfaces rely exclusively on dignified typography and clean geometric SVG icons.

### Typography Architecture
- **Editorial Longform:** `Newsreader` / `Lora`
  - High legibility, graceful italics, generous line height (`1.75`), contained reading width (`68ch` / `720px`).
- **Marginalia / Sidenotes:** `Newsreader Italic` / `Geist Sans`
  - Small size (`0.85rem`), muted tone, sits in the outer right margin aligned with the paragraph.
- **UI Structure & Meta:** `Geist Sans` / `Inter`
  - Navigation, roadmaps, buttons, timestamps, badges.
- **Precision Data:** `JetBrains Mono`
  - Lesson numbers, video timestamps, shortcut hints.

## 4. Mechanical Specifications for Study Reader

### 1. Top Fixed Progress Line
- Position: `fixed top-0 left-0 w-full h-[3px] z-50`
- Shows resource scroll progress in the course accent color.
- Permanent: Never disappears during scrolling.

### 2. Smart Auto-Hiding Header
- Position: `fixed top-[3px] left-0 w-full z-40`
- Behavior:
  - Scroll down: slides up (`transform: translateY(-100%)`).
  - Scroll up: slides down smoothly (`transform: translateY(0)`).
- Header Components:
  `[ Back to Journey ]  [ Outline (TOC) ]  --- [ Lesson Title ] ---  [ Aa Display ]  [ Highlights ]`

### 3. Floating Action Popover on Text Selection & Highlight Click
- When user selects text or clicks an existing highlight:
  A clean, discreet floating popover appears directly above the text:
  - `[ Highlight ]` (or `[ Remove ]` if already highlighted)
  - `[ Note ]`
  - `[ Copy Quote ]`

### 4. Marginalia (Sidenotes in the Margin Gutters)
- Since the reading canvas is contained, desktop screens provide a spacious right gutter.
- Notes added to highlights render as **Marginalia (Sidenotes)** anchored vertically adjacent to the highlighted text block.
- Hovering or clicking a sidenote subtly pulses the highlighted text in the article, and vice versa.

### 5. Dual Collapsible Sidebars
- **Left Sidebar (Outline only):** Displays document headings (H2, H3) for quick section jumping.
- **Right Sidebar (Highlights only):** Collapsible panel aggregating all highlights and notes for the current lesson with jump-to-source click.
- Collapsing both creates instant Zen distraction-free reading.

### 6. Readwise-Compatible Export (Commonplace)
- Standard CSV schema conforming to Readwise Import format:
  `Highlight, Title, Author, URL, Note, Location, Date`
- Also supports clean Markdown export.
