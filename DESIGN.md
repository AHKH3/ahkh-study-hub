# AHKH Study Hub — Unified Global Design System

This document is the authoritative design system specification for **AHKH Study Hub**.

All pages, curricula, study reader surfaces, editorial components, and UI elements across the entire platform adhere strictly to this single, cohesive, publication-grade design system.

---

## 1. Core Philosophy & Design Identity

- **Mode:** `Read` (Deep, focused, contemplative reading sanctuary) + `Operate` (Course roadmap navigation, local marginalia).
- **Aesthetic:** **Swiss Modernist Editorial & Soft Monochrome** (disciplined typographic rhythm, high legibility, generous whitespace, tactile paper surfaces).
- **The Rule of Framing:** Content surfaces never stretch to fill the full monitor width. Contained measures (`max-w-reading` at 68ch for prose, `max-w-hub` at 960px for indexes) preserve bookish dignity.
- **Verbatim Text Sacredness:** Design exists solely to elevate and clarify thought. The underlying source text is never summarized, truncated, or altered by algorithms.
- **Local Sovereignty:** All highlights, marginalia, and notes persist strictly in browser `localStorage` (`ahkh_hl_${courseId}_${lessonId}`). Zero telemetry, zero cloud trackers.

---

## 2. The Impeccable Craft Floor (Anti-Patterns & Slop Elimination)

To protect the reading environment from digital noise and generic "AI slop", the following rules are strictly enforced:

1. **Zero Emojis Invariant:** Strictly zero emojis across the entire project. All interfaces rely exclusively on clean, geometric inline SVG icons and dignified typographic punctuation (`—`, `•`, `//`, `*`).
2. **Zero Gimmicks / Zero Artificial Novelty:**
   - No animated typewriter cursors on headings.
   - No decorative text gradients or chromatic noise.
   - No glowing neon halos, pulse keyframes, or blur effects used as decorative costumes.
3. **No Container Bloat:**
   - Eliminate "cards inside cards" and arbitrary framed boxes.
   - Structure is achieved through typographic scale, margin rhythm, and minimal 1px rules.
4. **Badge & Pill Restraint:**
   - No loud, multi-colored pill badges with heavy borders across course tracks or lesson items.
   - Metadata is expressed through quiet typography, disciplined monospace notation, or subtle indicator dots.
5. **No Marketing Fluff:**
   - Study hubs are focused intellectual sanctuaries. No promotional banner cards, self-congratulatory marketing copy, or SaaS landing-page tropes.
6. **Zero Redundant Eyebrows & Structural Meta-Labels:**
   - Eliminate decorative section eyebrows, intermediate labels, and patronizing helper micro-copy (e.g., `Curriculum Roadmap`, `Course Structure`, `Click any lesson to start reading`, `Explore the modules`).
   - The UI structure must be self-evident through clean visual hierarchy, typographic scale, and direct presentation.

---

## 3. Color Palette & Semantic Surface Tokens

The platform is anchored in an uncompromising dual-theme palette designed for sustained reading comfort:

### 3.1. Neutral Foundation

| Token | Light Mode (Pure White & Off-White) | Dark Mode (OLED / Carbon) | Purpose |
|---|---|---|---|
| `bg-canvas` | `#FFFFFF` (Pure Snow White) | `#09090B` (Deep Carbon) | Base page canvas & main reading background |
| `bg-surface` | `#FAFAFA` (Clean Modern Off-White) | `#121215` (Subtle Elevated Surface) | Navigation bars, headers, and sidebars |
| `bg-card` | `#FFFFFF` (Pure White Card) | `#18181B` (Quiet Dark Card) | Content containers, code blocks |
| `border-subtle` | `#E4E4E7` (Neutral Zinc-200 Rule) | `#27272A` (Muted Zinc Rule) | 1px dividers, card frames (Zero yellow tint) |
| `border-focus` | `#18181B` (Deep Charcoal) | `#F4F4F5` (Bright Off-White) | Active borders, focused controls |
| `text-ink` | `#18181B` (Carbon Ink) | `#F4F4F5` (High-Legibility Light) | Primary headings, body copy |
| `text-muted` | `#71717A` (Neutral Zinc-500) | `#A1A1AA` (Mid-tone Grey) | Secondary metadata, labels |
| `text-faint` | `#A1A1AA` (Subtle Zinc-400) | `#52525B` (Dim Grey) | Inactive icons, subtle indicators |

### 3.2. Universal Highlight & Marginalia Accent (Monochrome Discipline)
The platform avoids loud colored accents by default. Highlights and marginalia follow a disciplined, tactile pencil-and-ink aesthetic:
- **Default Accent Rule:** `border-ink` (`#1C1B19` light / `#F4F4F5` dark)
- **Selection Highlight Tint:**
  - Light Mode: `rgba(0, 0, 0, 0.08)` (Subtle graphite veil with 1.5px baseline ink rule)
  - Dark Mode: `rgba(255, 255, 255, 0.12)` (Subtle chalk veil with 1.5px baseline light rule)
- **Sidenote Gutter Rule:** 2px solid `border-ink` (`#1C1B19` light / `#F4F4F5` dark)
- **User-selected highlight colors:** readers pick graphite (default), amber, emerald, sky, rose, or violet via popover swatches; every option ships tone-calibrated light/dark pairs (600–700-grade hues light / 400 dark over soft translucent washes); the choice persists per highlight (`color`) with the last-used default (`ahkh_hl_color`).

### 3.3. Distilled Status Indicators (Library Index Only)
Status is indicated with minimal typographic indicator dots (`• Label`), never full-width noisy banners:
- **Active:** Emerald dot (`#059669` light / `#34D399` dark)
- **New:** Blue dot (`#2563EB` light / `#60A5FA` dark)
- **Explored:** Purple dot (`#7C3AED` light / `#A78BFA` dark)
- **Completed:** Slate dot (`#64748B` light / `#94A3B8` dark)

### 3.4. Extensible Tone-Calibrated Domain & Metadata Color System (Information Scent)
To eliminate "monochrome blindness" while strictly protecting the quiet paper/carbon canvas, small metadata text (`font-mono text-xs` / `font-sans text-xs`) receives gentle, tone-calibrated typographic color accents:
- **Strict Tone Calibration Invariant**:
  - Light Mode: Calibrated 600–700 hues (`text-{color}-600/700`) for high contrast, soft legibility without harsh neon brightness.
  - Dark Mode: Calibrated 400 hues (`dark:text-{color}-400`) for gentle, glowing clarity against dark surfaces.
  - **Zero Background Changes**: Colors are applied exclusively to text classes (`text-...`). Never wrap metadata in filled colored background cards or pills.
- **Domain / Category Mappings**:
  - **AI & Machine Learning**: Fuchsia / Violet (`text-fuchsia-600 dark:text-fuchsia-400`)
  - **Software & Systems Engineering**: Sky Blue (`text-sky-600 dark:text-sky-400`)
  - **Product Design & UX/HCI**: Teal (`text-teal-600 dark:text-teal-400`)
  - **Cognitive Science & Psychology**: Purple (`text-purple-600 dark:text-purple-400`)
  - **Typography & Book Arts**: Amber (`text-amber-700 dark:text-amber-400`)
  - **Philosophy & Ethics**: Rose (`text-rose-600 dark:text-rose-400`)
  - **Mathematics & Algorithms**: Cyan (`text-cyan-600 dark:text-cyan-400`)
  - **Business & Strategy**: Emerald (`text-emerald-600 dark:text-emerald-400`)
- **Format Keywords**:
  - `Video`: Rose (`text-rose-600 dark:text-rose-400 font-medium`)
  - `Article`: Sky (`text-sky-600 dark:text-sky-400 font-medium`)
  - `PDF`: Amber (`text-amber-700 dark:text-amber-400 font-medium`)
  - `Audio`: Violet (`text-violet-600 dark:text-violet-400 font-medium`)

### 3.5. Tactile Low-Contrast Active States & Overlays (No Inverted Black Blocks)
To preserve the serene editorial quality of the reading sanctuary, active states and overlays must never produce harsh visual contrast:
- **Active Controls & Sidebar Toggles**: Active states must NOT invert into solid black blocks (`bg-ink`) or heavy dark borders (`border-ink`). Instead, they use a soft, tactile recessed background (`bg-paper-200/90` light / `dark:bg-dark-border/80` dark) with normal neutral zinc borders (`border-ink-border`).
- **Floating Overlays & Popovers**: Floating menus (such as the text selection popover, display comfort popover, and undo toast) must float on pure white or subtle off-white paper (`bg-white` light / `dark:bg-dark-card` dark) with gentle drop shadows (`shadow-lg shadow-black/5`) and neutral zinc borders (`border-ink-border`). Never use stark black cards (`bg-ink`) for floating menus.
- **Destructive/Remove Actions**: Removal or destructive states use soft tone-calibrated rose (`text-rose-700 bg-rose-50 border-rose-200/80` light / `dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50`) instead of aggressive solid crimson blocks (`bg-red-600 text-white`).
- **Primary calls-to-action stay solid:** Export, Explore, Return, and Back-to-Library buttons may use solid ink (`bg-ink`); the inversion ban covers active/selected states, segmented controls, floating overlays, and destructive blocks only.

---

## 4. Typography Hierarchy

The platform employs a three-tier typographic system:

### 4.1. Longform Editorial Prose (`font-serif`)
- **Typeface:** `Merriweather` (weights 300/400/700/900 + italics — the canonical body face on every surface, wired as `font-serif` and `--reader-font-family`), fallback to `Georgia`. `Newsreader` remains available only as an opt-in reader preference in the Display popover, never as a default.
- **Body Styling:** `text-[17px] sm:text-[18px]`, `leading-[1.8]`, `tracking-normal`, `text-ink dark:text-dark-ink`.
- **Optimal Measure:** `max-w-reading` (68 characters per line / 680px).
- **Paragraph Spacing:** `margin-bottom: 1.5em` between prose blocks.

### 4.2. Structural UI, Headings & Wayfinding (`font-sans`)
- **Typeface:** `Geist Sans` / `Inter`, fallback to system sans.
- **Application:** Page headers, course monograph titles, navigation links, buttons, tab switchers, and roadmap milestone titles.
- **Headings:**
  - `H1`: `font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink dark:text-dark-ink mb-6`
  - `H2`: `font-sans text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-dark-ink mt-10 mb-4 pb-2 border-b border-subtle`
  - `H3`: `font-sans text-lg font-medium text-ink dark:text-dark-ink mt-8 mb-3`

### 4.3. Precision Data & Code (`font-mono`)
- **Typeface:** `JetBrains Mono`
- **Application:** Video player timestamps (`04:12`), lesson counters (`LESSON 02.04`), keyboard shortcuts (`/`), and code blocks.

---

## 5. Universal Editorial Component Library

All course lessons utilize this standardized suite of publication-grade components:

### 5.1. The Pullout Axiom (Blockquote)
Used for foundational principles, defining philosophical quotes, or author statements.
```html
<blockquote class="my-8 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-xl sm:text-2xl text-ink/90 dark:text-dark-ink/90 leading-relaxed">
  <p>"Good design is making something intelligible and memorable."</p>
  <footer class="mt-2 text-xs font-sans not-italic text-ink-muted dark:text-dark-muted tracking-wide">
    — Dieter Rams, Ten Principles for Good Design
  </footer>
</blockquote>
```

### 5.2. The Synthesis / Key Principle Card
Used for summarizing critical takeaways, definitions, mental models, or heuristics.
```html
<div class="my-8 p-6 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border">
  <div class="text-[11px] font-mono uppercase tracking-wider text-ink-muted dark:text-dark-muted mb-2">
    Key Principle // 01
  </div>
  <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">
    Recognition Over Recall
  </h4>
  <p class="font-serif text-sm leading-relaxed text-ink/85 dark:text-dark-ink/85">
    Minimize the user's memory load by making elements, actions, and options visible.
  </p>
</div>
```

### 5.3. The Socratic Callout (Study Reflection & Inquiry)
Used for critical inquiry, self-testing, and reflective exercises.
```html
<aside class="my-8 p-5 border-l-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-r-xs">
  <div class="text-xs font-sans font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-2">
    Inquiry for Reflection
  </div>
  <p class="font-serif text-sm leading-relaxed text-ink/90 dark:text-dark-ink/90">
    How would your primary user's mental model break if you swapped the global navigation from horizontal tabs to a left hierarchical drawer?
  </p>
</aside>
```

### 5.4. The Comparative Data Matrix
Used for comparing contrasting paradigms, heuristics, pros/cons, or evolutionary phases.
```html
<div class="my-8 overflow-x-auto">
  <table class="w-full text-left text-sm font-sans border-collapse">
    <thead>
      <tr class="border-b border-ink-border dark:border-dark-border">
        <th class="py-3 pr-4 font-semibold text-ink dark:text-dark-ink">Dimension</th>
        <th class="py-3 px-4 font-semibold text-ink dark:text-dark-ink">Generative Inquiry</th>
        <th class="py-3 pl-4 font-semibold text-ink dark:text-dark-ink">Evaluative Usability</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60 text-ink/85 dark:text-dark-ink/85">
      <tr>
        <td class="py-3 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted">Primary Goal</td>
        <td class="py-3 px-4">Discover unmet user needs and mental models</td>
        <td class="py-3 pl-4">Validate task completion and error rates</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 5.5. The Source Attribution Footer
Placed at the end of each lesson to link to the original article or lecture.
```html
<div class="mt-12 pt-6 border-t border-ink-border/60 dark:border-dark-border flex items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted">
  <span>Source: Nielsen Norman Group (Original Publication)</span>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="hover:text-ink dark:hover:text-dark-ink underline underline-offset-4 flex items-center gap-1">
    Read original source ↗
  </a>
</div>
```

---

## 6. Universal Reader Mechanics

All courses share the same interaction model:
1. **Top Progress Line:** Fixed at `top: 0` (3px), tracking reading depth in the lesson.
2. **Smart Header:** Smoothly retreats on scroll-down (>60px); glides down on scroll-up.
3. **Dual Animated Collapsible Drawers:** Left Outline TOC for navigation; Right Highlights Drawer for marginalia, featuring smooth editorial easing.
4. **Display & Comfort Popover:** Tactile typography controls (font size, serif/sans typeface, reading measure, and light/dark theme) persisting locally.
5. **Floating Selection Popover:** Appears on text selection with Highlight, Sidenote, and Copy Citation actions.
6. **Local Persistence:** Instant client-side persistence in browser `localStorage`.
7. **ClientRouter-safe boot:** ClientRouter is always enabled, so every inline script uses a single `astro:page-load` subscription (it fires on initial load and navigation — never pair it with `DOMContentLoaded`). Document/window listeners carry a per-run `AbortController` signal, and the YouTube player handle plus sync timer are mirrored on `window` for teardown, so stale runs can never touch the new document or corrupt another lesson's storage.
8. **Lesson read states:** Unread (muted) / Reading (opened marker, amber tick) / Read (90% scroll depth, emerald tick) via `ahkh_opened_` / `ahkh_read_` keys; course progress counts Read lessons only.

---

## 7. Applied Lesson Patterns Inventory (Observed & Canonical)

Recipes below are extracted verbatim from the 12 shipped Springboard lessons in `src/data/courses.ts`. All future lessons must reuse these exact recipes instead of inventing new ones. Every recipe ships with both `light` and `dark:` variants; washes never exceed the stated opacity caps.

1. **Axiom pullout (amber rail + wash):** `my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs`, closed by a mono footer (`text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-300 font-bold uppercase`) carrying a `// ...` label. Reserved for foundational axioms only, max 1–2 per lesson.
2. **Rail cards:** `p-5 sm:p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-{hue}-500 shadow-2xs`. Observed rail hues: `sky`, `amber`, `purple`, `teal`, `blue`, `rose`, `indigo`. The rail hue follows the §3.4 tone mapping of the card's subject; body text always stays `text-ink`.
3. **Tinted compare pair:** `bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40` versus `bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/40`. Reserved strictly for before/after or contrast pairs, never for generic emphasis.
4. **Stat / step grids:** `grid ... not-prose text-center` with cells `p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border`, optionally topped by `border-t-3 border-t-{hue}-500`.
5. **Transcript timestamp blocks (required for every video lesson):** `data-timestamp="{seconds}"` on `my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all`. Without these blocks the YouTube transcript-sync engine has no targets and the lesson ships silent. Verbatim cues are auto-ingested at build time (`npm run transcripts` → `src/data/transcripts.json`, ADR-015) and rendered under the Original script tab — never hand-copy transcript text into lesson data.
6. **Attribution footer:** `mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4` with the source label plus an original-link button (`font-ui text-xs border ... px-3 py-1.5 rounded-xs bg-paper-50`).
7. **Prose isolation rule:** every non-prose block inside `contentHtml` carries `not-prose`; the reader renders content inside a prose container, so a missing `not-prose` leaks typography styles into cards and grids.
