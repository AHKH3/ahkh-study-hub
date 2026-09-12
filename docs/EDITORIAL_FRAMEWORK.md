# AHKH Study Hub — Standardized Lesson Content Formatting Framework

This document establishes and codifies the authoritative editorial formatting framework for all course lesson content in **AHKH Study Hub**.

All curriculum modules, lessons, reading surfaces, and editorial components adhere strictly to this single, publication-grade Swiss Modernist and Soft Monochrome design system.

---

## 1. Core Editorial Philosophy

1. **Read & Operate Dual Sanctuary**:
   - The platform exists to provide a distraction-free, contemplative reading environment (*Read*) paired with ergonomic navigation and local study tools (*Operate*).
2. **Verbatim Text Sacredness**:
   - Content from articles, video lectures, and primary sources is preserved with 100% fidelity.
   - Summarization, algorithmic truncations, artificial paraphrasing, or machine fluff are strictly prohibited.
3. **Local Sovereignty**:
   - Learner notes, highlights, and reading positions persist exclusively in client-side browser `localStorage` (`ahkh_hl_${courseId}_${lessonId}` and `ahkh_scroll_${courseId}_${lessonSlug}`).
   - Zero external tracking, zero cloud dependencies, zero telemetry.
4. **Swiss Modernist Typographic Discipline**:
   - Typographic scale, margin rhythm, and minimal 1px neutral rules organize content without heavy borders or container bloat.

---

## 2. The 5 Canonical Editorial Components

The platform provides 5 canonical editorial components under `src/components/editorial/`, usable in Astro templates, MDX files, or as raw HTML strings embedded in `contentHtml`.

```
src/components/editorial/
├── Axiom.astro
├── KeyPrinciple.astro
├── SocraticCallout.astro
├── DataMatrix.astro
├── SourceAttribution.astro
└── index.ts
```

---

### 2.1. The Pullout Axiom (`Axiom.astro`)

#### Purpose
Used for foundational principles, defining philosophical quotes, or core thesis statements from the original author. Maximum 1 to 2 axioms per lesson.

#### Component Props (`Axiom.astro`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `quote` | `string` | `undefined` | The commanding quote text (without wrapping quotation marks). |
| `author` | `string` | *required* | Original author of the statement. |
| `source` | `string` | `undefined` | Title of the publication, book, or talk. |
| `role` | `string` | `undefined` | Author title, position, or organization. |
| `class` | `string` | `''` | Additional Tailwind utility classes. |

#### Astro Usage Example
```astro
---
import { Axiom } from '@/components/editorial';
---

<Axiom
  quote="Good design does not begin with graphics or code. It begins with curiosity about how real people live, where they struggle, and how a thoughtful tool can make their day easier."
  author="Dieter Rams"
  source="Ten Principles for Good Design"
/>
```

#### Raw HTML Template Snippet
```html
<blockquote class="my-8 sm:my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
  <p>"Good design does not begin with graphics or code. It begins with curiosity about how real people live, where they struggle, and how a thoughtful tool can make their day easier."</p>
  <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
    &mdash; Dieter Rams, Ten Principles for Good Design
  </footer>
</blockquote>
```

#### Canonical Rules
- **No icons in footer**: The quote footer relies solely on em-dash `&mdash;` typography and uppercase monospace lettering.
- **Left rule**: 2px solid ink rule (`border-l-2 border-ink dark:border-dark-ink`).
- **Typography**: Body is `font-serif italic text-lg sm:text-xl`; attribution is `font-mono uppercase tracking-widest`.

---

### 2.2. The Key Principle / Synthesis Card (`KeyPrinciple.astro`)

#### Purpose
Highlights a critical heuristic, mental model, law, or synthesis takeaway for the student.

#### Component Props (`KeyPrinciple.astro`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `kicker` | `string` | `'Key Principle'` | Monospace uppercase category kicker. |
| `title` | `string` | *required* | Primary principle heading. |
| `body` | `string` | `undefined` | Core explanatory takeaway text. |
| `items` | `string[]` | `undefined` | Optional bulleted list of supporting points. |
| `class` | `string` | `''` | Additional utility classes. |

#### Astro Usage Example
```astro
---
import { KeyPrinciple } from '@/components/editorial';
---

<KeyPrinciple
  kicker="Key Principle 01"
  title="Recognition Over Recall"
  body="Minimize the user's memory load by making elements, actions, and options clearly visible across surfaces."
/>
```

#### Raw HTML Template Snippet
```html
<div class="my-8 p-5 sm:p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs not-prose">
  <div class="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
    <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
    <span>Key Principle 01</span>
  </div>
  <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">
    Recognition Over Recall
  </h4>
  <p class="font-serif text-sm leading-relaxed text-ink/85 dark:text-dark-ink/85">
    Minimize the user's memory load by making elements, actions, and options clearly visible across surfaces.
  </p>
</div>
```

#### Canonical Rules
- **Prose isolation**: Must carry `not-prose` to isolate layout typography from Tailwind typography cascades.
- **Surface**: Pure white paper (`bg-white dark:bg-dark-card`) with `rounded-xs` (2px) radius, `border-ink-border`, and `shadow-2xs`.
- **Kicker color**: Kicker strictly uses the single teal editorial accent (`text-teal-700 dark:text-teal-400`). Zero colored background fills.

---

### 2.3. The Socratic Callout (`SocraticCallout.astro`)

#### Purpose
Provides reflective inquiry prompts, self-examination challenges, and Socratic checks for the student to ponder before proceeding.

#### Component Props (`SocraticCallout.astro`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `kicker` | `string` | `'Inquiry for Reflection'` | Monospace uppercase kicker. |
| `prompt` | `string` | `undefined` | Primary reflection question or challenge. |
| `inquiry` | `string` | `undefined` | Alternate prop alias for `prompt`. |
| `class` | `string` | `''` | Additional utility classes. |

#### Astro Usage Example
```astro
---
import { SocraticCallout } from '@/components/editorial';
---

<SocraticCallout
  prompt="How would your primary user's mental model break if you swapped global navigation from horizontal tabs to a left hierarchical drawer?"
/>
```

#### Raw HTML Template Snippet
```html
<aside class="my-8 p-5 sm:p-6 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose space-y-2">
  <div class="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-2">
    Inquiry for Reflection
  </div>
  <p class="font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink">
    How would your primary user's mental model break if you swapped global navigation from horizontal tabs to a left hierarchical drawer?
  </p>
</aside>
```

#### Canonical Rules
- **Semantic aside**: Uses semantic `<aside>` element.
- **Background**: Soft neutral off-white (`bg-paper-100 dark:bg-dark-card`), with neutral zinc border (`border-ink-border dark:border-dark-border`).
- **Heading**: Strictly `text-teal-700 dark:text-teal-400 font-mono font-bold uppercase tracking-wider text-xs`.
- **Body**: `font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink`.

---

### 2.4. The Comparative Data Matrix (`DataMatrix.astro`)

#### Purpose
Used for structured comparative analysis: contrasting design paradigms, comparing research methods, rating heuristics, or displaying dimensional tradeoffs.

#### Component Props (`DataMatrix.astro`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `headers` | `string[]` | `[]` | Array of column header labels. |
| `rows` | `(string \| number)[][]` | `[]` | 2D array of matrix row data cells. |
| `caption` | `string` | `undefined` | Optional monospace caption. |
| `class` | `string` | `''` | Additional utility classes. |

#### Astro Usage Example
```astro
---
import { DataMatrix } from '@/components/editorial';
---

<DataMatrix
  headers={['Dimension', 'Generative Inquiry', 'Evaluative Usability']}
  rows={[
    ['Primary Goal', 'Discover unmet user needs and mental models', 'Validate task completion and error rates'],
    ['Timing', 'Early Discovery phase before concepts exist', 'Late Prototype phase before engineering build'],
    ['Typical Sample', '5 to 8 contextual interviews', '5 targeted think-aloud usability sessions']
  ]}
/>
```

#### Raw HTML Template Snippet
```html
<div class="my-8 overflow-x-auto not-prose">
  <table class="w-full text-left text-sm font-sans border-collapse border-t border-b border-ink-border dark:border-dark-border">
    <thead>
      <tr class="border-b border-ink-border dark:border-dark-border text-xs sm:text-sm font-mono uppercase tracking-widest font-bold text-ink dark:text-dark-ink">
        <th class="py-3.5 pr-4">Dimension</th>
        <th class="py-3.5 px-4">Generative Inquiry</th>
        <th class="py-3.5 pl-4">Evaluative Usability</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60 text-ink/85 dark:text-dark-ink/85 font-serif">
      <tr>
        <td class="py-3.5 pr-4 font-mono text-xs text-ink-muted dark:text-dark-muted font-sans">Primary Goal</td>
        <td class="py-3.5 px-4">Discover unmet user needs and mental models</td>
        <td class="py-3.5 pl-4">Validate task completion and error rates</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Canonical Rules
- **Horizontal scroll**: Outer wrapper must carry `overflow-x-auto not-prose` to prevent table clipping on mobile viewports.
- **Borders**: Minimal top and bottom 1px rules (`border-t border-b border-ink-border dark:border-dark-border`).
- **Headers**: Uppercase monospace (`font-mono uppercase tracking-widest font-bold`).
- **Row dividers**: Subdued divider lines (`divide-y divide-ink-border/60 dark:divide-dark-border/60`).
- **Data cells**: Row index/dimension labels use monospace muted typography (`font-mono text-xs text-ink-muted`); descriptive content uses `font-serif text-sm`.

---

### 2.5. The Source Attribution Footer (`SourceAttribution.astro`)

#### Purpose
Placed at the conclusion of every lesson to provide academic provenance, citing the original publication or video lecture and offering an external link.

#### Component Props (`SourceAttribution.astro`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `sourceTitle` | `string` | *required* | Original title of the article, book, or video. |
| `sourceUrl` | `string` | *required* | Canonical URL to the original source. |
| `author` | `string` | `undefined` | Original author name. |
| `organization` | `string` | `undefined` | Publishing organization or publication house. |
| `buttonText` | `string` | `'Read original source'` | Action button label. |
| `kicker` | `string` | `'Source Citation'` | Monospace uppercase kicker. |
| `class` | `string` | `''` | Additional utility classes. |

#### Astro Usage Example
```astro
---
import { SourceAttribution } from '@/components/editorial';
---

<SourceAttribution
  sourceTitle="Choosing Colors for Web Design: A Practical UI Color Application Guide"
  sourceUrl="https://dribbble.com/stories/2018/12/19/choosing-colors-for-web-design-a-practical-ui-color-application-guide"
  author="Stefano Peschiera"
  organization="Dribbble"
  buttonText="Read original source"
/>
```

#### Raw HTML Template Snippet
```html
<div class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted gap-4">
  <div>
    <span class="font-mono uppercase font-bold text-teal-700 dark:text-teal-400 block mb-0.5">Source Citation</span>
    <span>Adapted for sovereign study from <em>[Title of Work]</em> by <strong>[Author]</strong> ([Organization]).</span>
  </div>
  <a 
    href="[URL]" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="font-mono text-xs border border-ink-border/80 dark:border-dark-border px-3 py-1.5 rounded-xs bg-paper-50 dark:bg-dark-card text-ink dark:text-dark-ink hover:bg-paper-100 dark:hover:bg-dark-surface shrink-0 flex items-center gap-1 transition-colors"
  >
    <span>Read original source</span>
    <span>↗</span>
  </a>
</div>
```

#### Canonical Rules
- **Placement**: Located at the end of the lesson content, immediately preceding the reader pagination footer.
- **Kicker**: Always `text-teal-700 dark:text-teal-400 font-mono uppercase font-bold block mb-0.5`.
- **Action Button**: Clean paper card (`bg-paper-50 dark:bg-dark-card`), `rounded-xs` (2px), low-contrast border (`border-ink-border/80`), and standard external arrow (`↗` or `&nearr;`).
- **Hover behavior**: Grounded background wash only (`hover:bg-paper-100 dark:hover:bg-dark-surface`); zero translation or elevation shadow on hover.

---

## 3. Video Transcript Timestamp Sync Blocks

For video lectures, paragraph transcript units maintain interactive synchronization hooks with the YouTube player:

```html
<div data-timestamp="124" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
  <p class="font-serif text-sm sm:text-base leading-relaxed text-ink dark:text-dark-ink">
    Transcript lecture segment content verbatim as spoken by the instructor...
  </p>
</div>
```

When active during playback, the reader engine dynamically applies the `yt-active-paragraph` class (`border-rose-600 shadow-[0_0_0_1px_#E11D48]`).

---

## 4. Constitutional Invariants & Guardrails

All editorial components and lesson markup must strictly honor the following platform invariants (defined in `AGENTS.md`, `DESIGN.md`, and project ADRs):

### 4.1. Pure White Canvas Discipline
- **Light Mode Canvas**: 100% PURE SNOW WHITE (`#FFFFFF` / `bg-white`).
- Warm ivory, cream, or beige tints (e.g., `#FDFCFA`) are strictly prohibited.
- **Secondary Surfaces**: Clean modern off-white (`#FAFAFA` / `bg-paper-100` / `bg-paper-50`) separated by neutral zinc-200 rules (`#E4E4E7` / `border-ink-border`).

### 4.2. The Seven Signal Hues (ADR-030)
Exactly seven calibrated hues exist. Each has ONE locked semantic meaning applied as **text color only** (`600–700` light / `400` dark). Zero background fills anywhere:

| Color Token | Semantic Role | Light Mode Class | Dark Mode Class |
|---|---|---|---|
| **Blue** | State: NEW | `text-blue-700` | `dark:text-blue-400` |
| **Purple** | State: EXPLORED | `text-purple-700` | `dark:text-purple-400` |
| **Amber** | State: READING + progress | `text-amber-700` | `dark:text-amber-400` |
| **Emerald** | State: COMPLETED + success | `text-emerald-700` | `dark:text-emerald-400` |
| **Rose** | Format: VIDEO + destructive | `text-rose-700` | `dark:text-rose-400` |
| **Sky** | Format: ARTICLE + info | `text-sky-700` | `dark:text-sky-400` |
| **Teal** | Socratic inquiry + editorial accent | `text-teal-700` | `dark:text-teal-400` |

- **Banned**: `indigo`, `orange`, `red`, light grades `800/900/950`, and any `bg-*-*` hue fills (sole exception: literal artifact depictions marked with `data-allow-fill` per §7.8).

### 4.3. Absolute Ban on Synthetic Slop
- **Zero Emojis**: Strictly forbidden anywhere in the repository, UI markup, or prose content.
- **Zero Double-Slashes (`//`)**: Never use `//` or programming syntax as pseudo-technical or decorative section kickers.
- **Typographical Punctuation**: Use bespoke inline SVG icons or typographical marks (`—`, `•`) exclusively.

### 4.4. Zero Whole-Element Hover Displacement (ADR-017)
- Entire containers, cards, buttons, or table rows must **never** physically translate or scale on hover (`hover:translate-`, `hover:-translate-`, `hover:scale-`).
- Directional translation is permitted exclusively on nested SVG icons (e.g. `group-hover:translate-x-1`).
- Surfaces communicate hover state purely through subtle background washes (`hover:bg-paper-50 dark:hover:bg-dark-card/40`) and text decoration.

### 4.5. Low-Contrast Tactile Active States & Overlays
- Active controls, toggles, and menus must **never** invert into solid jet-black blocks (`bg-ink`) or heavy black borders (`border-ink`).
- Active states utilize subtle recessed neutral backgrounds (`bg-paper-200/90` or `bg-white` with `shadow-2xs`).
- Floating menus, popovers, and toasts float on white/off-white paper with gentle drop shadows (`shadow-lg`).

### 4.6. Token, Motion, Border & Spacing Locks (ADR-031)
- **Radii**: `rounded-xs` (2px), `rounded-2xs` (1px), `rounded-full` (dots) only.
- **Shadows**: `shadow-2xs` (tactile buttons/cards), `shadow-lg` (floating overlays) only.
- **Motion**: `duration-150` (micro), `duration-300` (spatial), `duration-700` (progress) only; `ease-out` only; `transition-all` is banned.
- **Borders**: Cards `border-ink-border`; dividers `/60`; header rules `/80`.

---

## 5. Migration Guide for Existing & Future Lessons

When adding or updating lessons in `src/data/courses/<course>/lessons/<slug>.ts`:

1. **Verify Metadata**:
   - Ensure `id`, `slug`, `title`, `module`, `unitNumber`, `lessonNumber`, `type`, `readTime`, `originalSourceUrl`, and `originalSourceLabel` are populated accurately.
2. **Structure the Content**:
   - Wrap in `<section class="lesson-section space-y-6">`.
   - Open with an evocative lead paragraph (`text-xl font-serif font-light leading-relaxed`).
   - Use numbered `<h2>` headings matching the outline array.
   - Employ `Axiom` for 1–2 foundational author quotes.
   - Use `KeyPrinciple` for core heuristics and takeaways.
   - Use `SocraticCallout` for reflective exercises.
   - Use `DataMatrix` for contrasting paradigms or multi-dimensional comparisons.
3. **Attach Source Attribution Footer**:
   - Every lesson must conclude with the canonical Source Attribution block preceding the closing `</section>` tag.
4. **Run Verification**:
   - Execute `npm test` to verify unit and E2E requirements.
   - Execute `npm run verify` to run script syntax audits and constitutional dist audits.
   - Execute `npm run build` to ensure 100% static compilation pass.
