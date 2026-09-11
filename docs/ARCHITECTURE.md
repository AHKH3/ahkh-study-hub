# Architecture of AHKH Study Hub

This document defines the architectural blueprint, data flow, component topology, and engineering contracts governing the **AHKH Study Hub**.

---

## 1. Architectural Philosophy

AHKH Study Hub is a **sovereign, local-first editorial study sanctuary**. It replaces subscription-walled services like Readwise Reader with a self-hosted, offline-capable, magazine-grade reading environment for rigorous academic and professional curricula.

### Fundamental Invariants
1. **Verbatim Text Fidelity**: Source texts, articles, and video transcripts are preserved exactly as articulated by their original authors. No algorithmic summarizing, omission, or hallucinated simplification.
2. **Editorial Dignity & Restraint**: Typography-first visual language. Restrained palette: pure white (`#FFFFFF`) canvas, deep carbon ink (`#09090B`), subtle zinc separators (`#E4E4E7`). No neon gradients, no bounce animations, no intrusive UI overlays.
3. **Absolute Zero Emojis**: System controls and content use geometric inline SVG icons exclusively.
4. **Local Sovereignty**: All user-generated study artifacts (highlights, marginal notes, reading progress) reside exclusively in the client's `localStorage`. No trackers, no databases, no cloud authentication requirements.
5. **Universal Portability**: Instant 1-click export to standard **Readwise CSV** (RFC 4180) and universal **Markdown**.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Core Framework** | [Astro 7.x](https://astro.build/) | Static Site Generation (SSG), zero runtime JS by default, high performance |
| **Styling** | [Tailwind CSS 3.x](https://tailwindcss.com/) | Design tokens, responsive grid, typography plugin |
| **Typography** | Newsreader (Serif), Inter (Sans), JetBrains Mono (Mono) | High-legibility editorial rhythm and hierarchy |
| **Icons** | Custom Inline SVG | Accessible, themeable, zero external icon font bloat |
| **Persistence** | Browser `localStorage` API via the sovereign adapter (`src/utils/storage.ts`, `window.AhkhStorage`) | Local-first highlights, notes, and study state |
| **Desktop Shell** | Tauri v2 + native SQLite (`src-tauri/`, `~/.ahkh/study.db`) | Windows-first sovereign executable (ADR-008, ADR-019) |
| **Sync Bridge** | `window.AhkhSync` snapshot mirror (OPFS + designated file on web) | Continuous last-write-wins durability |
| **Deployment** | GitHub Pages & GitHub Actions | Automated CI/CD pipeline and automated semantic release workflows |

---

## 3. Directory Structure

```
ahkh-study-hub/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # CI/CD: Automated GitHub Pages deployment
│       └── release.yml           # CI/CD: Automated Semantic Releases
├── docs/
│   ├── ARCHITECTURE.md          # This architectural blueprint
│   ├── DECISIONS.md             # Architectural Decision Records (ADRs)
│   └── PROJECT.md               # Scope, guardrails, and project definition
├── public/
│   └── logo.png                 # Transparent, tightly-cropped brand emblem
├── src/
│   ├── components/
│   │   └── HubHeader.astro      # Global navigation header with active badge sync
│   ├── data/
│   │   └── courses.ts           # Curricula catalog, modules, lessons, and timestamps
│   ├── layouts/
│   │   └── BaseLayout.astro     # Root HTML shell, typography tokens, favicon
│   ├── pages/
│   │   ├── index.astro          # The Editorial Monograph Index (Library)
│   │   ├── manifesto.astro      # The Architecture of Literature
│   │   ├── commonplace.astro    # Universal highlights treasury & Readwise exporter
│   │   └── courses/
│   │       └── [course]/
│   │           ├── index.astro  # Vertical learning journey roadmap
│   │           └── [slug].astro # Full Study Reader (Sidebars, Highlighting, Video Sync)
│   ├── styles/
│   │   └── global.css           # Typography rules, marginalia styles, animations
│   └── utils/
│       └── paths.ts             # Base-aware URL resolver for GitHub Pages
├── astro.config.mjs             # Astro SSG build config (site & base)
├── tailwind.config.mjs          # Editorial theme tokens and monochrome palette
└── package.json                 # Scripts, dependencies, metadata
```

---

## 4. Reader Engine Subsystems

The Study Reader (`src/pages/courses/[course]/[slug].astro`) implements four synchronized subsystems:

### 4.1. Spatial Layout & Adaptive Zen Mode
- **Left Sidebar**: Collapsible Table of Contents Outline (`data-collapsed="true"` via high-specificity CSS rules).
- **Central Reading Column**: Bounded at `max-w-reading` (~68ch) to maintain optimal eye-tracking ergonomics.
- **Right Sidebar**: Collapsible Highlights & Notes drawer.
- **Zen Mode**: Single-click toggle collapsing both sidebars simultaneously, centering the reading canvas for distraction-free immersion.

### 4.2. Highlighting & Marginalia Engine
- **Text Selection Detection**: Monitors `window.getSelection()`, computes character offsets, and positions a floating action popover.
- **Persistent Highlighting**: Traverses DOM text nodes via `TreeWalker`, wrapping selected spans in `<span class="ahkh-highlight">` with the course's signature accent tint.
- **Gutter Marginalia**: Sidenotes dynamically render in the desktop right margin gutter alongside the corresponding paragraph.
- **Interactive Pulse Navigation**: Clicking any highlight in the right sidebar or commonplace smoothly scrolls into view and triggers a keyframe glow pulse.

### 4.3. Multimedia Synchronized Player
- Video lessons embed a responsive YouTube frame above the article.
- Audio/video timestamps in the text are interactive: clicking a timestamp scrubs the media player to that exact second, and playing the video auto-scrolls through transcript blocks.

### 4.4. Commonplace Aggregator & Readwise Exporter
- Scans all client storage keys matching `ahkh_hl_${courseId}_*`.
- Formats exports according to the official Readwise CSV schema:
  `Highlight,Book Title,Book Author,URL,Note,Location,Date`.
