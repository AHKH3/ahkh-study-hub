# AHKH Study Hub — Unified Global Design System

This document is the authoritative design system specification for **AHKH Study Hub**.

All pages, curricula, study reader surfaces, editorial components, and UI elements across the entire platform adhere strictly to this single, cohesive, publication-grade design system.

---

## 1. Core Philosophy & Design Identity

- **Mode:** `Read` (Deep, focused, contemplative reading sanctuary) + `Operate` (Course roadmap navigation, local marginalia).
- **Aesthetic:** **Swiss Modernist Editorial & Soft Monochrome** (disciplined typographic rhythm, high legibility, generous whitespace, tactile paper surfaces).
- **The Rule of Framing:** Content surfaces never stretch to fill the full monitor width. Contained measures (`max-w-reading` at 68ch as the unified default measure for main content, and `max-w-hub` at 960px for top navigation headers) preserve bookish dignity.
- **Verbatim Text Sacredness:** Design exists solely to elevate and clarify thought. The underlying source text is never summarized, truncated, or altered by algorithms.
- **Local Sovereignty:** All highlights, marginalia, and notes persist strictly in browser `localStorage` (`ahkh_hl_${courseId}_${lessonId}`). Zero telemetry, zero cloud trackers.

---

## 2. The Impeccable Craft Floor (Anti-Patterns & Slop Elimination)

1. **Zero Emojis & Zero Double-Slashes (`//`):** Strictly zero emojis and zero decorative double-slashes (`//`) across the entire project. All interfaces rely exclusively on clean, bespoke inline SVG icons and dignified typographical punctuation (`—`, `•`). Never use fake code comments in prose.
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
7. **Zero Whole-Element Hover Displacement (ADR-017):**
   - Never move, translate, or scale entire cards, buttons, containers, or article rows on hover (strictly no `hover:translate-`, `hover:-translate-`, `hover:scale-`).
   - Whole elements remain physically stationary, calm, and grounded on the paper surface without floating drop shadows or lift effects.
   - Positional translation on hover is permitted exclusively on nested directional SVG icon elements (such as an arrow chevron nudging slightly: `group-hover:translate-x-1` / `group-hover:-translate-x-0.5`).
   - Card and row hover affordance is communicated purely via subtle neutral background washes (`hover:bg-paper-50 dark:hover:bg-dark-card/40`) and text decoration (`group-hover:underline`).

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
- **User-selected highlight colors:** readers pick amber marker (default), graphite, emerald, sky, rose, violet, or midnight inverse via popover swatches; every option ships tone-calibrated light/dark pairs over soft translucent washes (midnight is solid inverted); one class sets `--hl-bg`/`--hl-rule`, cascading the same voice to the span wash, the gutter rail, and the sidebar quote border; the choice persists per highlight (`color`) with the last-used default (`ahkh_hl_color`).

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

## 4. Typography Hierarchy & Type Discipline

The platform uses exactly **three systemic font voices** — no other family may appear in chrome or default content:

| Voice | Family | Role |
|---|---|---|
| Reading & body | `Merriweather` (default; reader-switchable, see §6) | Lesson prose, descriptions, display H1 titles |
| Interface & structure | `Geist Sans` | Buttons, nav, footer, structural headings (H2–H4), controls |
| Precision data | `JetBrains Mono` | Timestamps, counters, kickers, badges, code |

- **Single loading source:** fonts load once via `<link>` in `BaseLayout.astro`. Never add `@import` font URLs in CSS.
- **Reader options are the only exception:** Source Serif 4, Literata, Lora, Newsreader, and Geist Sans remain user-selectable reading typefaces in the Display popover (§6.4). They never leak into chrome or components.
- **Role rule:** chrome (buttons/nav/footer) is always Geist; data (numbers/badges/kickers) is always Mono; prose and display headings follow the reader font. A button inside a Mono row keeps `font-ui` explicitly — controls never inherit data fonts.
- **Scale lock:** sizes are Tailwind `xs/sm/base/lg/xl/2xl/3xl/4xl(/5xl for display H1)` plus `10px` (badge counters only) and `11px` (micro-labels only). Banned: `text-[9px]`, `text-[13px]`, `text-[15px]`, weights `thin/extralight/extrabold/black`.
- **Weight lock:** chrome caps at `medium`; card/section headings are `semibold`; lesson H4 titles are `semibold`; stat numerals may be `bold`; prose stays regular with `light` reserved for Lead intros.
- **Tracking lock:** all uppercase micro-labels and kickers use `tracking-widest`; display H1 uses `tracking-tight`; prose uses `leading-relaxed`.
- **Enforcement:** `scripts/verify-dist.mjs` (Check 7) fails the build on any banned family, size, weight, or tracking token.

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
  <div class="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-ink-muted dark:text-dark-muted mb-2">
    <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
    <span>Key Principle 01</span>
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
<aside class="my-8 p-5 sm:p-6 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose space-y-2">
  <div class="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-2">
    Inquiry for Reflection
  </div>
  <p class="font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink">
    How would your primary user's mental model break if you swapped the global navigation from horizontal tabs to a left hierarchical drawer?
  </p>
</aside>
```

### 5.4. The Comparative Data Matrix
Used for comparing contrasting paradigms, heuristics, pros/cons, or evolutionary phases.
```html
<div class="my-8 overflow-x-auto not-prose">
  <table class="w-full text-left text-sm font-sans border-collapse border-t border-b border-ink-border dark:border-dark-border">
    <thead>
      <tr class="border-b border-ink-border dark:border-dark-border">
        <th class="py-3 pr-4 font-semibold text-ink dark:text-dark-ink">Dimension</th>
        <th class="py-3 px-4 font-semibold text-ink dark:text-dark-ink">Generative Inquiry</th>
        <th class="py-3 pl-4 font-semibold text-ink dark:text-dark-ink">Evaluative Usability</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60 text-ink/85 dark:text-dark-ink/85 font-serif">
      <tr>
        <td class="py-3 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted font-sans">Primary Goal</td>
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
<div class="mt-12 pt-6 border-t border-ink-border/60 dark:border-dark-border flex items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted not-prose">
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
8. **Intentional Lesson Lifecycle (ADR-018):** Four distinct states: `new` (blue dot / unread), `explored` (purple dot / opened without starting reading), `reading` (amber dot / user clicked "Start Reading", recording start timestamp), and `completed` (emerald dot / user explicitly clicked "Mark as complete" at the bottom). Zero implicit completion via scroll depth. Scroll depth and vertical position are continuously saved to `localStorage` and faithfully restored on page load.

---

## 7. Applied Lesson Patterns Inventory (Observed & Canonical)

Recipes below are extracted verbatim from the shipped lessons in `src/data/courses.ts`. All future lessons must reuse these exact recipes instead of inventing new ones. Every recipe ships with both `light` and `dark:` variants; washes never exceed the stated opacity caps.

1. **The Pullout Axiom (Blockquote):** `my-8 sm:my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed`, closed by a dignified footer (`mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wide`) carrying author/source attribution (e.g., `— Dieter Rams`). Reserved for foundational axioms only, max 1–2 per lesson.
2. **Swiss Editorial Synthesis Cards:** `p-5 sm:p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs not-prose`. Information scent is carried by the top metadata kicker (`font-mono text-xs font-bold uppercase tracking-wider text-{hue}-800 dark:text-{hue}-400`), never by thick side-tab borders on rounded corners.
3. **Tinted Compare Pair:** `bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xs p-5` versus `bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 rounded-xs p-5`. Reserved strictly for before/after or contrast pairs, never for generic emphasis.
4. **Stat / Step / Stage Grids:** `grid ... not-prose text-center` with cells `p-4 sm:p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs`. Numbers are rendered in prominent monospace (`font-mono text-xs sm:text-sm font-bold text-{hue}-800 dark:text-{hue}-400 mb-1`), with zero top-border stripes.
5. **Transcript Timestamp Blocks (required for every video lesson):** `data-timestamp="{seconds}"` on `my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all`. When active during playback, the container receives `yt-active-paragraph` (`border-rose-600 shadow-[0_0_0_1px_#E11D48]`). Without these blocks the YouTube transcript-sync engine has no targets and the lesson ships silent.
6. **Attribution Footer:** `mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted` with the source label plus an original-link button.
7. **Prose Isolation Rule:** Every non-prose block inside `contentHtml` carries `not-prose`; the reader renders content inside a prose container, so a missing `not-prose` leaks typography styles into cards and grids.

---

## 8. Programmatic Wireframes, Synthetic UI Models & Visual Asset Guidelines

Agents have unlimited creative and technical capabilities to produce visual models, UI prototypes, and architectural diagrams:

### 8.1. Programmatic Wireframe Components (Pure CSS/HTML)
When illustrating layout wireframes, card sorting, or interaction patterns, build clean, responsive wireframes directly using Tailwind classes:
- **Wireframe Viewport Frame:** A minimal device frame with subtle neutral zinc borders (`border border-ink-border bg-white dark:bg-dark-card p-4 rounded-xs shadow-2xs`).
- **Placeholder Blocks (Wireframe Skeletons):** Use neutral tinted blocks (`bg-paper-200 dark:bg-dark-border/60`) with dashed or solid 1px borders to represent images, search inputs, and button hit targets.
- **Annotated Callouts:** Floating numeric badges (`w-6 h-6 rounded-full bg-ink text-paper-50 font-mono text-xs`) pointing to specific interface zones.

### 8.2. Synthetic Image Generation Protocol
- If a lesson requires visual demonstration (e.g. 3D device ergonomics, realistic mobile interfaces, conceptual illustrations) and no authentic public screenshot exists:
  - Generate a crisp, publication-grade asset using the `generate_image` tool.
  - Save generated assets to `public/images/lessons/[lesson-id]/` with descriptive filenames.
  - Embed with dignified figure captions: `<p class="text-xs sm:text-sm font-sans font-medium text-ink-muted mt-2.5 text-center">Figure X: Descriptive analytical explanation</p>`.

### 8.3. Anti-Marketing & Sovereign Academic Purity
- Lessons must read as authoritative, timeless textbooks.
- Strip away all platform marketing ("Sign up now", "Enroll in our bootcamp", "Springboard community features").
- Attribution is strictly bibliographic: author, original publication year/title, and an external reference link placed in the quiet `Attribution footer` at the bottom of the page.
