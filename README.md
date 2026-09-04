<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="public/logo.png">
    <img src="public/logo-dark.png" alt="AHKH Study Hub Logo" width="220" />
  </picture>
  
  # AHKH Study Hub
  
  **The Sovereign Editorial Study Sanctuary & Living Curriculum Reader**  
  *Transforming dense educational curricula into enduring, readable literature through the art of HTML & CSS.*

  [![Deploy to GitHub Pages](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/deploy.yml)
  [![Automated Release](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/release.yml/badge.svg)](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/release.yml)
  [![Static Site](https://img.shields.io/badge/Astro-5.x-BC52EE.svg?logo=astro&logoColor=white)](https://astro.build)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-222222.svg?logo=github&logoColor=white)](https://ahkh3.github.io/ahkh-study-hub/)

  [**Live Website**](https://ahkh3.github.io/ahkh-study-hub/) · [**Architecture Docs**](docs/ARCHITECTURE.md) · [**Decisions Log**](docs/DECISIONS.md) · [**Project Specs**](docs/PROJECT.md) · [**Course Design System Spec**](docs/COURSE_DESIGN_SYSTEM_SPEC.md)
</div>

---

## Overview & Philosophy

**AHKH Study Hub** is a sovereign, local-first static study platform and reader companion engineered as a permanent, high-craft open alternative to subscription services like *Readwise Reader*.

The core mission of the project is to **rescue intellectual thought from the drought of monotonous text, raw video transcripts, and rigid PDFs**, re-architecting them into publication-grade editorial literature using the expressive power, flexibility, and elegance of **HTML & CSS** (structured cards, commanding pull quotes, contextual callouts, and responsive data grids).

### The Invariant Principles
1. **Verbatim Text Fidelity:** Source texts, articles, and video transcripts are preserved exactly as articulated by their original authors. Absolute zero algorithmic summarizing, AI omission, or distortion. We re-engineer the vessel, never the substance.
2. **Pure Monochrome Dignity:** A quiet, clinical aesthetic founded on pure white canvas (`#FFFFFF`), solid carbon black ink (`#09090B`), and neutral zinc borders (`#E4E4E7`). Zero artificial gradients, neon glows, or distracting visual noise.
3. **Absolute Ban on Emojis:** The interface relies exclusively on geometric inline SVG icons and refined typographic symbols. Emojis are strictly banned from all surfaces.
4. **Local Sovereignty (Local-First):** Highlights, marginal notes, and reading progress reside entirely in browser `localStorage`. No accounts, no cloud databases, no tracking.
5. **One-Click Readwise Export:** Direct export of all captured passages and marginalia in official RFC 4180 Readwise CSV schema and universal Markdown.

---

## Core Features

### 1. The Editorial Monograph Index (`/`)
- Pure monograph table displaying curricula without marketing fluff or repetitive subtitles.
- Strict Course Listing Purity: displays only the course title, module count, source count, estimated duration, progress bar, and status pill.
- Semantic, high-legibility status chips:
  - `Active`: Emerald Green (`text-emerald-700 bg-emerald-50 border-emerald-200`)
  - `New`: Royal Blue (`text-blue-700 bg-blue-50 border-blue-200`)
  - `Explored`: Purple (`text-purple-700 bg-purple-50 border-purple-200`)
  - `Completed`: Rose Pink (`text-pink-700 bg-pink-50 border-pink-200`)

### 2. The Comprehensive Study Reader (`/courses/[course]/[slug]`)
- **Permanent Top Progress Bar:** Fixed 3px line at `top: 0` filled with the course's signature accent color.
- **Smart Auto-Hiding Header:** Glides out of view on scroll-down to preserve focus; reappears instantly on scroll-up.
- **Collapsible Dual Sidebars:**
  - *Left Sidebar:* Structured Table of Contents (Outline) with anchor jump navigation.
  - *Right Sidebar:* Live feed of all highlights and marginal notes in the active lesson.
- **Zen Mode:** A single click collapses both sidebars simultaneously, expanding the reading canvas to center with zero peripheral distraction.
- **Media Player & Transcript Sync:** Embedded video lessons synchronized with interactive text timestamps; clicking any timestamp scrubs the video player directly.

### 3. Highlighting & Marginalia Engine
- **Floating Action Popover:** Appears on text selection with single-click actions:
  - `Highlight` or `Remove Highlight`
  - `Add/Edit Sidenote`
  - `Copy Quote with Full Academic Citation`
- **Gutter Marginalia:** Sidenotes render directly in the desktop right margin gutter alongside their corresponding highlighted paragraph.
- **Interactive Highlight Pulse:** Clicking any highlight entry in the right sidebar or commonplace smooth-scrolls to the passage and triggers a gentle illumination pulse.

### 4. The Commonplace Book (`/commonplace`)
- Central repository aggregating all captured highlights and notes across all courses.
- Instant search with keyboard shortcut `/`.
- Dynamic course-specific filter tabs.
- One-click export to **Readwise CSV** (RFC 4180 compliant) and **Markdown**.

### 5. Automated CI/CD & Semantic Releases
- **Automated Deployment:** GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.
- **Semantic Release Automation:** GitHub Actions workflow (`.github/workflows/release.yml`) generates GitHub releases and changelogs on version tags.

---

## Technology Stack

- **Core Engine:** [Astro 5.x](https://astro.build) (Static Site Generation — SSG)
- **Styling:** [Tailwind CSS 3.x](https://tailwindcss.com) with `@tailwindcss/typography`
- **Typography:** Newsreader (Serif), Inter (Sans-serif), JetBrains Mono (Monospace)
- **Icons:** Pure accessible inline SVG (Zero font dependencies, zero emojis)
- **Persistence:** Browser `localStorage` API
- **Hosting & CI/CD:** GitHub Pages & GitHub Actions

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v22.12.0 or newer
- npm v10 or newer

### Local Installation & Development
```bash
# 1. Clone repository
git clone https://github.com/AHKH3/ahkh-study-hub.git
cd ahkh-study-hub

# 2. Install dependencies with legacy peer resolution
npm install --legacy-peer-deps

# 3. Start local development server
npm run dev
```

Visit `http://localhost:4321/ahkh-study-hub/` in your browser.

### Verification & Production Build
```bash
# Type check and build static distribution
npm run build

# Preview production build locally
npm run preview
```

---

## Creating Releases

### Option A: Via Git Tag
```bash
git tag v1.1.0
git push origin v1.1.0
```
GitHub Actions will automatically generate the release, compile notes, and publish the release.

### Option B: Via GitHub Actions UI
1. Navigate to the **Actions** tab in the repository.
2. Select **Automated Release**.
3. Click **Run workflow** and choose the semver increment (`patch`, `minor`, or `major`).

---

## Repository Architecture

```
ahkh-study-hub/
├── .github/workflows/
│   ├── deploy.yml            # Automated GitHub Pages CI/CD
│   └── release.yml           # Automated Semantic Release Generator
├── docs/
│   ├── ARCHITECTURE.md       # Full engineering specifications
│   ├── DECISIONS.md          # Architectural Decision Records (ADR)
│   └── PROJECT.md            # Scope, taxonomy, and system invariants
├── public/
│   └── logo.png              # Transparent brand emblem
├── src/
│   ├── components/
│   │   └── HubHeader.astro   # Main navigation header
│   ├── data/
│   │   └── courses.ts        # Course catalog and curricula data
│   ├── layouts/
│   │   └── BaseLayout.astro  # Root HTML shell & meta configuration
│   ├── pages/
│   │   ├── index.astro       # Editorial monograph catalog
│   │   ├── manifesto.astro   # The Architecture of Literature
│   │   ├── commonplace.astro # Highlights treasury & Readwise exporter
│   │   └── courses/          # Course journey and study reader pages
│   ├── styles/
│   │   └── global.css        # Typography, marginalia, and layout styles
│   └── utils/
│       └── paths.ts          # Base-aware URL resolver for GitHub Pages
├── astro.config.mjs          # Astro configuration (site & base)
├── tailwind.config.mjs       # Theme tokens and monochrome palette
└── package.json              # Project scripts and dependencies
```

---

## License & Ownership

Designed and engineered for sovereign personal scholarship and freely published for universal public access.
