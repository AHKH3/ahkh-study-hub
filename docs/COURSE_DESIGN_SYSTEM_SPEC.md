# Course Design System Specification & Foundry Guide

This document establishes the **Meta-Design System Framework** for **AHKH Study Hub**.

It serves as the definitive engineering and design charter for any AI model or designer tasked with creating a bespoke, publication-grade design system for a new course.

---

## 1. The Core Paradigm: A Sovereign Shell with Living Canvases

In AHKH Study Hub, every curriculum is treated as an independent literary publication. Rather than forcing all knowledge into a homogeneous SaaS layout:

> **The Global Sanctuary Shell is Fixed; The Course Reading Canvas is Alive.**

### 1.1. The Sovereign Shell (Non-Negotiable Global Chrome)
The structural frame surrounding the reading experience remains uniform across all courses to maintain familiarity, keyboard ergonomics, and local-first reliability:
- **Global Header (`HubHeader.astro`):** Top brand emblem, universal navigation tabs (`Library`, `Manifesto`, `Commonplace`), active highlight badge.
- **Top Progress Bar:** Fixed 3px track at `top: 0`, dynamically filled with the course's signature accent color.
- **Smart Auto-Hiding Controls:** Header hides smoothly on scroll-down (>60px) and reappears on scroll-up.
- **Dual Collapsible Sidebars:** Left Outline (TOC) and Right Highlights Drawer.
- **Zen Mode Toggle:** Simultaneous collapse of both sidebars, centering the reading canvas at `max-w-reading` (~68ch).
- **Local-First Engine:** All highlights and marginalia persist strictly to `localStorage` under `ahkh_hl_${courseId}_${lessonId}`.
- **Universal Rule:** Absolute zero emojis across all interfaces. Use geometric inline SVG icons exclusively.

### 1.2. The Living Canvas (Bespoke to Each Course)
From the Course Journey Roadmap (`/courses/[course]`) down to every individual lesson reader (`/courses/[course]/[slug]`), the main content surface transforms to embody the aesthetic soul of that specific discipline:
- **Typographic Voice:** Headings, body prose, drop caps, and marginal notes.
- **Color DNA:** Signature accent hue, highlight selection tint, card backgrounds, and rule colors.
- **Roadmap Architecture:** Custom milestone connectors, node glyphs, and progress card treatments.
- **Editorial Formats:** Custom pullout quotes, synthesis cards, Socratic callouts, and data matrices tailored to the subject matter.

---

## 2. Invariant Design Guardrails

Every AI model designing a new course system must respect these four foundational boundaries:

1. **Verbatim Text Fidelity:** Source text, articles, and video transcripts are sacred. The design dresses, structures, and elevates the text—it NEVER summarizes, shortens, or rewrites authorial substance.
2. **Reading Ergonomics:** 
   - Optimal reading width: `max-w-reading` (65ch to 70ch / ~720px).
   - Generous line height: `leading-[1.75]` to `leading-[1.85]` for body prose.
   - Fluid responsive rhythm: seamless scaling between mobile viewports and wide desktop displays.
3. **Restraint & Anti-Slop (No Artificial Neon / No Rainbows):**
   - Background canvas must remain clean, quiet, and bookish (pure white `#FFFFFF` or subtle off-white paper tint such as `#FCFBF9`).
   - Accent colors must be intentional, grounded in physical pigments (e.g. Ochre, Burnt Terracotta, Prussian Blue, Forest Spruce, Indigo, Slate).
   - Zero neon gradients, zero bouncy animations, zero floating bubbles.
4. **Absolute Prohibition of Emojis:**
   - No emojis in lesson headers, badges, button labels, or callout cards.
   - Use clean SVG icons, typographic symbols (`&mdash;`, `&bull;`, `//`, `*`), or minimal numeral markers.

---

## 3. Creative Canvas: Areas of Model Ingenuity

This framework intentionally leaves wide creative latitude for the AI model to interpret the user's inspiration (painting, architectural school, philosophical era, or vibe). The model is expected to invent:

### 3.1. Typographic Pairing Strategy
The model selects or recommends an authoritative Google Font / Web Font pairing that evokes the discipline:
- *Philosophy & Humanities:* High-contrast Venetian or Transitional Serifs (e.g., *Cinzel*, *Playfair Display*, *Newsreader*, *Cormorant Garamond*).
- *Engineering & Systems:* Disciplined Modernist Sans or Structural Monospace (e.g., *Space Grotesk*, *Inter*, *JetBrains Mono*, *DM Sans*).
- *Art & Typography:* Geometric Constructivist or Swiss Grid fonts (e.g., *Syne*, *Plus Jakarta Sans*, *Epilogue*).
- *History & Classical Studies:* Academic Book Art Serifs (e.g., *EB Garamond*, *Lora*, *Spectral*).

### 3.2. Bespoke Editorial Content Archetypes
Raw text should never be dumped as unstyled paragraphs. The model designs **3 to 5 custom HTML/CSS content archetypes** tailored to the course's pedagogy:

1. **The Axiom / Pullout Quote:**
   - *Example Treatment A (Classical):* Oversized italic quote with a solid 2px left border in the course accent.
   - *Example Treatment B (Constructivist):* Centered quote with top-and-bottom hairline rules and a bold Roman numeral label.
   - *Example Treatment C (Monastic):* Indented blockquote framed in a subtle paper tint card with a custom quotation mark glyph.
2. **The Synthesis / Key Principle Card:**
   - A dedicated card summarizing critical takeaways or definitions. The model defines the border style (solid, dashed, double), background tint, corner radius, and badge placement.
3. **The Comparative Matrix / Data Grid:**
   - Responsive, clean table formatting for contrasts, methodologies, or taxonomy breakdowns.
4. **The Socratic Callout / Reflection Box:**
   - A dedicated container for deep study reflections, critical analysis questions, or practical exercises.
5. **The Source Attribution Anchor:**
   - An elegant footnote or source badge indicating where the article or video originated, accompanied by a clean external-link SVG icon.

---

## 4. The Technical Implementation Contract

When generating a course design system, the model must output four concrete technical artifacts:

### Artifact 1: TypeScript Course Theme Object (`src/data/courses.ts`)
```typescript
export interface CourseDesignSystem {
  id: string;                    // Unique slug (e.g. "systems-architecture")
  name: string;                  // Display name of design system
  inspiration: string;           // Aesthetic reference (e.g. "Bauhaus Constructivism & Dieter Rams Grid")
  palette: {
    accent: string;              // Hex code for primary accent (e.g. "#1E3A8A")
    secondary: string;           // Complementary hue (e.g. "#3B82F6")
    highlight: string;           // CSS rgba string for text selection (e.g. "rgba(59, 130, 246, 0.25)")
    sidenoteBorder: string;      // Hex or rgba for marginalia border (e.g. "#2563EB")
    paperBg?: string;            // Optional subtle canvas tint (default: "#FFFFFF")
    cardBg: string;              // Background for content cards (e.g. "#F8FAFC")
    border: string;              // Subtle divider border (e.g. "#E2E8F0")
  };
  typography: {
    headingFont: string;         // Name of heading font family
    bodyFont: string;            // Name of body font family
    fontImportUrl?: string;      // Google Fonts <link> or @import URL
    fontSizeScale?: 'compact' | 'classic' | 'spacious';
    lineHeight?: string;         // e.g. "1.8"
  };
  motifs: {
    borderRadius: string;        // e.g. "0px" (sharp), "2px" (subtle), "6px" (soft)
    dividerStyle: string;        // e.g. "solid", "dashed", "double"
    quoteStyle: 'bordered-left' | 'callout-box' | 'centered-large' | 'bracketed';
  };
}
```

### Artifact 2: CSS Custom Properties Injection
The model provides the CSS variables block injected into the reading canvas:
```css
.course-theme-[course-slug] {
  --course-accent: #1E3A8A;
  --course-secondary: #3B82F6;
  --course-highlight: rgba(59, 130, 246, 0.25);
  --course-sidenote-border: #2563EB;
  --course-card-bg: #F8FAFC;
  --course-border: #E2E8F0;
  --course-heading-font: 'Cinzel', serif;
  --course-body-font: 'Lora', serif;
  --course-radius: 2px;
}
```

### Artifact 3: Interactive Pulse Animation Keyframe
Each course gets its own signature pulse keyframe that illuminates highlighted text when clicked from the right sidebar:
```css
@keyframes highlight-pulse-[course-slug] {
  0% { box-shadow: 0 0 0 0 rgba(30, 58, 138, 0.5); filter: brightness(1); }
  50% { box-shadow: 0 0 0 6px rgba(30, 58, 138, 0.2); filter: brightness(1.2); }
  100% { box-shadow: 0 0 0 0 rgba(30, 58, 138, 0); filter: brightness(1); }
}
```

### Artifact 4: The 3–5 HTML Content Component Archetypes
Ready-to-use HTML code snippets demonstrating how the course's lessons should format quotes, cards, matrices, and callouts.

---

## 5. Master Prompt Template for Future AI Models

Whenever the user presents a new course concept, image, or design inspiration, they can invoke this exact protocol:

```markdown
You are the Course Design System Architect for AHKH Study Hub.

I have a new course:
- Title: [Course Title]
- Domain / Subject: [e.g. Cognitive Psychology / High-Performance Go Systems / Islamic Calligraphy]
- Design Inspiration: [Attach an image, painting, or describe the aesthetic vision: e.g. "Japanese Wabi-Sabi ink wash", "Dieter Rams Braun minimalist grid", "Renaissance Venetian manuscript"]

Complying with `docs/COURSE_DESIGN_SYSTEM_SPEC.md`, generate:
1. THE PALETTE & COLOR DNA (Accent, selection tint, card background, border).
2. TYPOGRAPHY ARCHITECTURE (Heading font, body font, font imports, measure, leading).
3. THE 4 CUSTOM EDITORIAL COMPONENT ARCHETYPES (Pullout Quote, Key Principle Card, Socratic Callout, Data Matrix with exact HTML/Tailwind markup).
4. THE COMPLETE TYPESCRIPT `CourseDesignSystem` OBJECT ready to insert into `src/data/courses.ts`.
5. ROADMAP MILESTONE STYLING (Node markers, connecting line color, milestone card aesthetics).

Remember the invariants: Zero emojis, pure high-contrast serenity, and complete verbatim text fidelity.
```

---

## 6. Living Reference Exemplars

### Exemplar 1: Springboard UX Career Track
- **Inspiration:** Human-Centered Ergonomics & Industrial Design Clay Modeling.
- **Accent Hue:** Burnt Terracotta (`#B35334`).
- **Highlight Tint:** `rgba(224, 118, 85, 0.28)`.
- **Typography:** `Newsreader` (Italic quotes) + `Inter` (UI structure) + `JetBrains Mono` (Usability metrics).
- **Core Archetypes:**
  - *Usability Heuristic Callout:* Thin terracotta left border with monospace heuristic tag.
  - *Interview Synthesis Card:* Subtle paper card with quote marks and participant attribution.

### Exemplar 2: Swiss Typography & Book Arts
- **Inspiration:** Josef Müller-Brockmann & The International Typographic Style (Zurich, 1957).
- **Accent Hue:** Swiss Carmine Red (`#D90429`) / Deep Slate (`#1A1A1A`).
- **Highlight Tint:** `rgba(217, 4, 41, 0.2)`.
- **Typography:** Clean geometric Grotesk (`Plus Jakarta Sans` / `Inter`) + `JetBrains Mono`.
- **Core Archetypes:**
  - *Constructivist Pullout:* Centered text bracketed between 2px horizontal rules.
  - *Grid Axiom Box:* 0px border radius, crisp 1px solid border, uppercase micro-labeling.
