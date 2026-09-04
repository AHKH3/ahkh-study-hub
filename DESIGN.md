# AHKH Study Hub — Unified Global Design System

This document is the authoritative design system specification for **AHKH Study Hub**.

All pages, curricula, study reader surfaces, editorial components, and UI elements across the entire platform adhere to this single, cohesive, publication-grade design system.

---

## 1. Core Philosophy & Design Identity

- **Mode:** `Read` (Deep, contemplative study) + `Operate` (Course roadmap, highlighting & marginalia tools).
- **Aesthetic:** **Soft Monochrome & Swiss Editorial**. Quiet, tactile, high-contrast, disciplined.
- **The Rule of Framing:** Content surfaces never stretch to fill the full monitor width. Contained, centered measures (`max-w-reading` at ~68ch / 720px for prose, `max-w-hub` at 1024px for indexes) preserve bookish dignity.
- **Verbatim Text Sacredness:** Design exists to elevate and clarify thought. The underlying source text is never summarized, truncated, or altered by algorithms.
- **Zero Emojis Invariant:** Strictly zero emojis across the entire project. All interfaces rely exclusively on clean, geometric inline SVG icons and dignified typographic punctuation (`—`, `•`, `//`, `*`).

---

## 2. Color System & Surface Tokens

The platform is anchored in an uncompromising dual-theme monochromatic palette designed for maximum legibility and reduced visual fatigue:

### 2.1. Monochromatic Foundation

| Token | Light Mode (Canvas) | Dark Mode (OLED) | Purpose |
|---|---|---|---|
| `bg-canvas` | `#FFFFFF` (Crisp Pure White) | `#000000` (Pure OLED Black) | Base page canvas |
| `bg-card` | `#FAFAFA` (Clean Paper Card) | `#0A0A0A` (Subtle OLED Surface) | Content cards, code boxes, sidebars |
| `border-subtle` | `#E4E4E7` (Zinc-200 Rule) | `#1E1E1E` (Zinc-850 Rule) | Section dividers, card frames, borders |
| `text-ink` | `#09090B` (Carbon Black) | `#F4F4F5` (Bright Off-White) | Primary titles, body copy, headings |
| `text-muted` | `#71717A` (Neutral Zinc) | `#8E8E93` (Subtle Grey) | Secondary metadata, labels, timestamps |
| `text-faint` | `#A1A1AA` (Faint Zinc) | `#52525B` (Dim Grey) | Minor borders, placeholder indicators |

### 2.2. Universal Highlight & Marginalia Accent
- **Highlight Tint:**
  - Light Mode: `rgba(235, 130, 95, 0.24)` (Warm terracotta whisper)
  - Dark Mode: `rgba(235, 130, 95, 0.38)`
- **Sidenote Border:** `#B35334` (Terracotta rule)
- **Pulse Keyframe:** Soft amber radial glow (`rgba(179, 83, 52, 0.4)`) illuminating the passage when selected from the sidebar.

### 2.3. The Four Semantic Status Accents (Metadata Chips Only)
These colors are strictly reserved for discrete status pills and indicator dots on the Library index and course header. They are NEVER used as full-page themes, large background fills, or primary button colors:
- **Active:** `text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800`
- **New:** `text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800`
- **Explored:** `text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800`
- **Completed:** `text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800`

---

## 3. Typography Hierarchy (Universal Across All Courses)

The platform employs a four-tier typographic system:

### 3.1. Longform Editorial Prose (`font-serif`)
- **Typeface:** `Newsreader` / `Lora`
- **Body Styling:** `text-[17px] sm:text-[18px]`, `leading-[1.8]`, `tracking-normal`, `text-ink dark:text-dark-ink`.
- **Optimal Measure:** `max-w-reading` (68 characters per line).
- **Paragraph Spacing:** `mb-6` between prose blocks.

### 3.2. Structural UI, Headings & Roadmaps (`font-sans`)
- **Typeface:** `Inter` / `Geist Sans`
- **Application:** Page headers, course monograph titles, navigation links, buttons, tab switchers, and roadmap milestone titles.
- **Headings:**
  - `H1`: `font-serif text-3xl sm:text-4xl font-normal tracking-tight text-ink dark:text-dark-ink mb-6`
  - `H2`: `font-sans text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-dark-ink mt-10 mb-4`
  - `H3`: `font-sans text-lg font-medium text-ink dark:text-dark-ink mt-8 mb-3`

### 3.3. Marginalia & Sidenotes (`font-serif italic` + `font-sans`)
- **Typeface:** `Newsreader Italic` (prose citations) + `Inter` (micro metadata).
- **Sizing:** `text-[13px]`, `leading-snug`, positioned in the desktop right margin gutter directly adjacent to the highlighted anchor.

### 3.4. Precision Data & Code (`font-mono`)
- **Typeface:** `JetBrains Mono`
- **Application:** Video player timestamps (`04:12`), lesson counters (`LESSON 02.04`), keyboard shortcuts (`/`), and code blocks.

---

## 4. Universal Editorial Component Library

To rescue educational texts from monotonous walls of plain paragraphs, all courses utilize this unified suite of publication-grade components:

### 4.1. The Pullout Axiom (Blockquote)
Used for foundational principles, defining philosophical quotes, or memorable author statements.
```html
<blockquote class="my-8 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-xl sm:text-2xl text-ink/90 dark:text-dark-ink/90 leading-relaxed">
  <p>"Good design is making something intelligible and memorable. Great design is making something memorable and meaningful."</p>
  <footer class="mt-2 text-xs font-sans not-italic text-ink-muted dark:text-dark-muted tracking-wide">
    — Dieter Rams, Ten Principles for Good Design
  </footer>
</blockquote>
```

### 4.2. The Synthesis / Key Principle Card
Used for summarizing critical takeaways, definitions, mental models, or heuristics.
```html
<div class="my-8 p-6 rounded-xs bg-paper-100/70 dark:bg-dark-card border border-ink-border/80 dark:border-dark-border">
  <div class="text-[11px] font-mono uppercase tracking-wider text-ink-muted dark:text-dark-muted mb-2">
    Key Principle // 01
  </div>
  <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">
    Recognition Over Recall
  </h4>
  <p class="font-serif text-sm leading-relaxed text-ink/85 dark:text-dark-ink/85">
    Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.
  </p>
</div>
```

### 4.3. The Socratic Callout (Study Reflection & Inquiry)
Used for critical questions, self-testing, practical exercises, or reflective marginalia.
```html
<aside class="my-8 p-5 border-l-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-xs">
  <div class="text-xs font-sans font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-2">
    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    Inquiry for Reflection
  </div>
  <p class="font-serif text-sm leading-relaxed text-ink/90 dark:text-dark-ink/90">
    How would your primary user's mental model break if you swapped the global navigation from horizontal tabs to a left hierarchical drawer?
  </p>
</aside>
```

### 4.4. The Comparative Data Matrix
Used for comparing contrasting paradigms, heuristics, pros/cons, or evolutionary phases.
```html
<div class="my-8 overflow-x-auto">
  <table class="w-full text-left text-sm font-sans border-collapse">
    <thead>
      <tr class="border-b border-ink/20 dark:border-dark-border">
        <th class="py-3 pr-4 font-semibold text-ink dark:text-dark-ink">Dimension</th>
        <th class="py-3 px-4 font-semibold text-ink dark:text-dark-ink">Generative Inquiry</th>
        <th class="py-3 pl-4 font-semibold text-ink dark:text-dark-ink">Evaluative Usability</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-ink/10 dark:divide-dark-border/60 text-ink/85 dark:text-dark-ink/85">
      <tr>
        <td class="py-3 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted">Primary Goal</td>
        <td class="py-3 px-4">Discover unmet user needs and mental models</td>
        <td class="py-3 pl-4">Validate task completion and error rates</td>
      </tr>
      <tr>
        <td class="py-3 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted">Artifact</td>
        <td class="py-3 px-4">User Journey & Affinity Map</td>
        <td class="py-3 pl-4">System Usability Scale (SUS) Score</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4.5. The Source Attribution Footer
Placed at the end of each lesson to link to the original article or lecture.
```html
<div class="mt-12 pt-6 border-t border-ink-border/60 dark:border-dark-border flex items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted">
  <span>Source: Nielsen Norman Group (Original Publication)</span>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="hover:text-ink dark:hover:text-dark-ink underline underline-offset-4 flex items-center gap-1">
    Read original source
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>
```

---

## 5. Universal Reader Mechanics

All courses share the same rock-solid interaction model:
1. **Top Progress Line:** Fixed at `top: 0` (3px), tracking reading depth in the lesson.
2. **Smart Header:** Smoothly retreats on scroll-down (>60px); glides down on scroll-up.
3. **Dual Collapsible Drawers:** Left Outline TOC for navigation; Right Highlights Drawer for marginalia.
4. **Zen Mode:** Closes both sidebars with one click to isolate the reading measure.
5. **Floating Selection Popover:** Appears on text selection with Highlight, Sidenote, and Copy Citation actions.
6. **Local Persistence:** Zero cloud latency; saved directly in browser `localStorage`.
