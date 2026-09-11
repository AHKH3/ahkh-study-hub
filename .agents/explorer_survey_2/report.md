# Technical Investigation Report: Data Splitting & Lazy-Loaded Course Bundles (R2)

**Agent Identity:** teamwork_preview_explorer (Survey Explorer 2)  
**Date:** 2026-09-11  
**Working Directory:** `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_survey_2`  
**Target Scope:** R2 (Data Splitting & Lazy-Loaded Course Bundles)  

---

## 1. Executive Summary

An exhaustive technical investigation into `src/data/courses.ts`, `src/data/transcripts.json`, and all associated consumers across `src/pages/` was conducted.

### Core Discoveries
1. **Monolithic Dataset Weight:**
   - `src/data/courses.ts` measures **345,565 bytes (337.47 KB)** across **5,329 lines of TypeScript**.
   - **79.3% of `courses.ts` (267.55 KB)** consists exclusively of raw HTML strings (`contentHtml`) across 37 lessons.
   - `src/data/transcripts.json` measures **96,968 bytes (94.70 KB)**, holding 16 video transcripts and 563 cues.
   - Together, the platform currently evaluates **442.53 KB of monolithic static data** in single files.
2. **Extreme Data Over-Fetching Across Routes:**
   - `src/pages/index.astro` (Library Index) imports the entire 345.68 KB `courses.ts`, but needs only **2.08 KB** of course metadata (a **99.4% data waste**).
   - `src/pages/courses/[course]/index.astro` (Course Syllabus) imports the entire 345.68 KB `courses.ts`, but needs only **16.77 KB** of module and lesson titles/durations (a **95.1% data waste**). It uses **zero** bytes of `contentHtml`.
   - `src/pages/courses/[course]/[slug].astro` (Lesson Reader) passes the full monolithic `course` object (containing all 37 lessons and all 267.55 KB of `contentHtml`) to `Astro.props.course` for **every single lesson page**. Across 37 generated routes, the `paths` array returned by `getStaticPaths` generates **~12.8 MB of in-memory duplicate props references**.
   - Furthermore, `[slug].astro` unconditionally imports the entire 94.70 KB `transcripts.json` into module scope, even for the 21 text-only article/PDF lessons that have no video.
3. **HTML DOM & ClientRouter Transition Bloat:**
   - In `how-do-you-break-into-ux-design/index.html` (total 192.20 KB), **127.98 KB (66.6%)** is taken up by 102 server-rendered transcript cue blocks and repetitive inline SVGs under `#transcript-view`, which is `hidden` by default. Every client-side transition via Astro's `ClientRouter` downloads and parses this full payload.
4. **Feasibility of Granular Splitting:**
   - We verified programmatically via `jiti` and Vite `import.meta.glob` that `courses.ts` can be split into a 3-tier model:
     - **Catalog Manifest:** 2.08 KB (99.4% reduction for index).
     - **Course Syllabus Manifest:** 16.77 KB (95.1% reduction for course roadmap).
     - **Granular Lesson Content Files:** Average 8.77 KB per lesson, loaded on demand.
     - **Per-Video Transcripts:** 2–10 KB per video file, loaded on demand.
   - Props passed to each lesson reader page drop from **345 KB to ~150 bytes** for `course` context, eliminating **99.95%** of props memory overhead without breaking TypeScript safety or static generation.

---

## 2. Current Data Architecture & Quantitative Audit

### 2.1. File Profiling: `src/data/courses.ts`

| Metric | Measured Value |
|---|---|
| **Absolute Path** | `c:\Users\abdel\dev\ahkh-study-hub\src\data\courses.ts` |
| **File Size** | 345,565 bytes (337.47 KB) |
| **Line Count** | 5,329 lines |
| **Course Count** | 1 (`springboard-ux`) |
| **Module Count** | 8 modules (`mod-1` through `mod-8`) |
| **Lesson Count** | 37 lessons (`sb-1-0` through `sb-8-4`) |
| **Total `contentHtml` Payload** | 273,967 bytes (267.55 KB) across 37 lessons |
| **`contentHtml` Ratio** | **79.28% of total file size** |
| **Average `contentHtml` per Lesson** | 7.23 KB (min: 1.56 KB, max: 38.06 KB) |
| **Non-HTML Structural Weight** | 71,598 bytes (69.92 KB) |

#### Data Model in `src/data/courses.ts` (lines 3–66)
```ts
export interface Lesson {
  id: string;
  slug: string;
  title: string;
  module: string;
  unitNumber: number;
  lessonNumber: string;
  type: 'article' | 'video' | 'pdf';
  readTime: string;
  originalSourceUrl?: string;
  originalSourceLabel?: string;
  youtubeId?: string;
  summaryQuote: string;
  outline: { id: string; title: string; level: number }[];
  contentHtml: string; // <-- MONOLITHIC PAYLOAD
  videoTimestamps?: { time: number; label: string; text: string }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  updatedAt: string;
  duration: string;
  progressPercent: number;
  totalModules: number;
  totalSources: number;
  status: CourseStatus;
  theme: CourseDesignSystem;
  modules: {
    id: string;
    number: number;
    title: string;
    description: string;
    lessons: Lesson[];
  }[];
}

export const COURSES: Course[] = [ ... ]; // Monolithic 5,329-line array
```

### 2.2. File Profiling: `src/data/transcripts.json`

| Metric | Measured Value |
|---|---|
| **Absolute Path** | `c:\Users\abdel\dev\ahkh-study-hub\src\data\transcripts.json` |
| **File Size** | 96,968 bytes (94.70 KB) |
| **Video Transcripts** | 16 YouTube video caption tracks |
| **Total Cues** | 563 timed speech cues |
| **Top 3 Largest Transcripts** | `U9ZG19XTbd4` (10.35 KB, 60 cues), `ebzQXHIMZu0` (9.52 KB, 102 cues), `qwCEZ1lRkHo` (6.70 KB, 64 cues) |
| **Ingestion Pipeline** | `scripts/fetch-transcripts.mjs` (runs on `prebuild` hook via YouTube Innertube API) |

---

## 3. Route-by-Route Data Consumption Analysis

We mapped all property accesses and evaluated data usage across the three core Astro page routes.

```
+-----------------------------------------------------------------------------------------+
|                                    src/data/courses.ts                                  |
|                                    (345.6 KB, 5,329 lines)                              |
+-----------------------------------------------------------------------------------------+
       |                                      |                                    |
       | import { COURSES }                   | import { COURSES }                 | import { COURSES }
       v                                      v                                    v
+-----------------------+     +-------------------------------+     +-------------------------------+
|  src/pages/index.astro|     | src/pages/courses/[course]/   |     | src/pages/courses/[course]/   |
|     (Library Index)   |     |         index.astro           |     |          [slug].astro         |
+-----------------------+     +-------------------------------+     +-------------------------------+
| Uses ONLY:            |     | Uses ONLY:                    |     | Uses:                         |
| - id, slug, title     |     | - course metadata (title,     |     | - minimal course shell tokens |
| - category, status    |     |   category, theme, duration)  |     |   (title, slug, theme.accent) |
| - duration, progress  |     | - module numbers & titles     |     | - THIS single lesson data     |
| - module & lesson cnt |     | - lesson titles, slugs, types |     | - THIS video's transcript cues|
| - lesson slug list    |     |   readTime, source labels     |     |                               |
|                       |     |                               |     | WASTED IN PROPS:              |
| WASTED: 343.6 KB      |     | WASTED: 328.9 KB              |     | 36 OTHER lessons' HTML        |
| (99.4% unused)        |     | (95.1% unused, 100% HTML)     |     | 15 OTHER video transcripts    |
+-----------------------+     +-------------------------------+     +-------------------------------+
```

### 3.1. Route 1: `src/pages/index.astro` (Library Index)

- **Import Statement (Line 4):** `import { COURSES, type CourseStatus } from '../data/courses';`
- **Audit of Accessed Properties:**
  - `course.id`
  - `course.slug`
  - `course.title`
  - `course.category`
  - `course.status`
  - `course.duration`
  - `course.progressPercent`
  - `course.modules.length`
  - `countLessons(course)` (calculates total lesson count)
  - `course.modules.flatMap(m => m.lessons.map(l => l.slug))` (injected into `data-lessons` attribute on article container)
- **Zero Consumption of Lesson Content:**
  - `index.astro` accesses **zero** bytes of `lesson.contentHtml`.
  - It accesses **zero** lesson outlines, **zero** quotes, **zero** source URLs, and **zero** transcripts.
- **Data Payload Waste:**
  - Requires: ~2.08 KB.
  - Loads: 345.68 KB.
  - **Overhead: 99.4% redundant evaluation.**

### 3.2. Route 2: `src/pages/courses/[course]/index.astro` (Course Overview)

- **Import Statement (Line 4):** `import { COURSES } from '../../../data/courses';`
- **`getStaticPaths` Function (Lines 9–14):**
  ```ts
  export function getStaticPaths() {
    return COURSES.map((course) => ({
      params: { course: course.slug },
      props: { course },
    }));
  }
  ```
- **Audit of Accessed Properties:**
  - Course level: `id`, `slug`, `title`, `description`, `category`, `duration`, `progressPercent`, `status`, `theme`.
  - Module level: `mod.id`, `mod.number`, `mod.title`, `mod.lessons.length`.
  - Lesson level: `lesson.slug`, `lesson.title`, `lesson.type`, `lesson.readTime`, `lesson.originalSourceLabel`.
- **Zero Consumption of Lesson Content:**
  - `[course]/index.astro` accesses **zero** bytes of `lesson.contentHtml`.
  - It accesses **zero** outlines, quotes, or video timestamps.
- **Data Payload Waste:**
  - Requires: ~16.77 KB (Course metadata + module hierarchy + lesson titles/times).
  - Loads & passes via `Astro.props.course`: 345.68 KB.
  - **Overhead: 95.1% redundant evaluation.**

### 3.3. Route 3: `src/pages/courses/[course]/[slug].astro` (Lesson Reader)

- **Import Statements (Lines 3–4):**
  ```ts
  import { COURSES } from '../../../data/courses';
  import TRANSCRIPTS from '../../../data/transcripts.json';
  ```
- **`getStaticPaths` Function (Lines 9–42):**
  ```ts
  export function getStaticPaths() {
    const paths: any[] = [];
    COURSES.forEach((course) => {
      const allLessons: any[] = [];
      course.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
          allLessons.push(lesson);
        });
      });

      allLessons.forEach((lesson, index) => {
        const prevLesson = index > 0 ? {
          slug: allLessons[index - 1].slug,
          title: allLessons[index - 1].title,
          lessonNumber: allLessons[index - 1].lessonNumber,
          type: allLessons[index - 1].type,
          readTime: allLessons[index - 1].readTime,
        } : null;
        const nextLesson = index < allLessons.length - 1 ? {
          slug: allLessons[index + 1].slug,
          title: allLessons[index + 1].title,
          lessonNumber: allLessons[index + 1].lessonNumber,
          type: allLessons[index + 1].type,
          readTime: allLessons[index + 1].readTime,
        } : null;

        paths.push({
          params: { course: course.slug, slug: lesson.slug },
          props: { course, lesson, prevLesson, nextLesson },
        });
      });
    });
    return paths;
  }
  ```
- **The Memory Multiplication Trap in `props`:**
  - `course.modules` is accessed on line 13 **only** to flatten the lessons array inside `getStaticPaths`.
  - In the template (outside `getStaticPaths`), `course` is used **exclusively** for:
    - `course.title` (lines 52, 291)
    - `course.slug` (lines 72, 526, 609)
    - `course.theme.accent` (lines 58, 291)
    - `course.theme.highlight` (line 291)
    - `course.id` (line 291)
  - `course.modules` is **never touched in the reader template**!
  - Yet, `props.course` passes the complete `course` object (with all 8 modules, all 37 lessons, and all 267.55 KB of `contentHtml`) into every one of the 37 lesson routes.
  - Result: 37 route definitions × 345 KB = **12.79 MB of object data** in the `paths` array during build time.
  - If scaled to 10 courses with 40 lessons each (400 lessons), this pattern creates 400 × 3.5 MB = **1.4 GB** of props memory footprint during static build!
- **The Transcript Monolith Trap:**
  - `import TRANSCRIPTS from '../../../data/transcripts.json';` is unconditional at top-of-file.
  - All 94.70 KB of JSON are parsed for every route, including the 21 non-video lessons.

---

## 4. Build Output, Client Runtime & ClientRouter Analysis

### 4.1. Runtime JS vs SSG Output
- In Astro static generation (`output: 'static'`), frontmatter imports (`--- ... ---`) are executed at build time inside Node.js. Astro does not serialize server props or frontmatter imports into client `.js` bundles unless explicitly imported in a client `<script>` or React/Vue component.
- An audit of `dist/_astro/` revealed only two bundles:
  - `ClientRouter.astro_astro_type_script_index_0_lang.*.js`: 15.97 KB
  - `BaseLayout.*.css`: 76.69 KB
  - Plus `public/scripts/reader.js`: 82.93 KB
- **Finding:** Monolithic data is not currently leaking into client JavaScript bundles.
- **Latent Risk:** Any future client feature (e.g., a client-side search modal, a commonplace filter, or a command palette) that mistakenly does `import { COURSES } from '../data/courses'` would immediately bundle all 345.68 KB into client JavaScript. Splitting data enforces an architectural safeguard against this regression.

### 4.2. Astro ClientRouter Wire Payloads & Transcript DOM Bloat
When navigating between pages using Astro `ClientRouter`, the client fetches the destination `.html` file over the network and swaps the document body.

We audited the built HTML files in `dist/` and discovered significant payload weight:

| HTML File | Size (Bytes) | Size (KB) | Primary Weight Driver |
|---|---|---|---|
| `dist/index.html` | 42,115 B | 41.13 KB | Monograph index markup |
| `dist/courses/springboard-ux/index.html` | 180,261 B | 176.04 KB | 37 lesson tree-grid rows & SVGs (133.17 KB) |
| `dist/courses/springboard-ux/the-anatomy-of-product-experience/index.html` | 99,405 B | 97.08 KB | Formatted prose (article) |
| `dist/courses/springboard-ux/how-do-you-break-into-ux-design/index.html` | 192,212 B | 187.71 KB | Verbatim transcript DOM (127.98 KB) |

#### Detailed Dissection of `how-do-you-break-into-ux-design/index.html` (192.20 KB)
- `#smart-header` + `#display-settings-menu`: 13.24 KB
- `#left-sidebar` (TOC): 3.73 KB
- `#formatted-view` (prose): 2.14 KB
- `#transcript-view`: **127.98 KB (66.59% of entire HTML file!)**
- Inline scripts (`AhkhStorage`, `AhkhSync`, reader boot): 19.00 KB
- Other UI, popovers, SVGs: 26.11 KB

**Why did 9.52 KB of transcript JSON expand to 127.98 KB of HTML?**  
Because for 102 transcript cues, line 489 of `[slug].astro` stamps out:
- An outer `<div data-timestamp="..." class="transcript-cue ...">` (15 classes)
- An inner timestamp button with 20 Tailwind classes
- An inline `<svg class="cue-playing-icon ...">` with `<polygon>` elements
- A `<p class="cue-text ...">`
And this entire 128 KB DOM subtree is given `class="... hidden"` on initial load!  
When `ClientRouter` transitions to a video lesson, it must fetch, parse, and attach all 102 hidden DOM nodes before the page can settle.

---

## 5. Proposed Granular Architecture: 3-Tier Layered Data Model

To eliminate memory bloat, optimize build time, and keep wire payloads lean, we propose splitting the monolithic datasets into three discrete, strictly typed layers.

```
src/data/
├── types.ts                                    # Central TypeScript interface contracts
├── catalog.ts                                  # Tier 1: Lightweight Library Catalog (~2 KB)
│
├── courses/                                    # Tier 2: Per-Course Syllabi & Tier 3: Lessons
│   └── springboard-ux/
│       ├── syllabus.ts                         # Course syllabus without contentHtml (~16.8 KB)
│       └── lessons/                            # Individual granular lesson modules
│           ├── the-anatomy-of-product-experience.ts   (~40.9 KB)
│           ├── the-eight-step-ux-process.ts           (~8.1 KB)
│           ├── ... (37 files, avg 8.8 KB)
│           └── how-do-you-break-into-ux-design.ts     (~3.2 KB)
│
├── transcripts/                                # Dedicated Per-Video Transcript Files
│   ├── 6lmvCqvmjfE.json                        (~4.2 KB)
│   ├── ebzQXHIMZu0.json                        (~9.5 KB)
│   └── ... (16 files)
│
└── index.ts                                    # Unified lazy-loading entrypoint & query API
```

### 5.1. TypeScript Interface Contracts (`src/data/types.ts`)

```ts
export type CourseStatus = 'active' | 'new' | 'explored' | 'completed';
export type LessonType = 'article' | 'video' | 'pdf';

export interface CourseDesignSystem {
  accent: string;
  highlight: string;
  paperBg?: string;
  secondary?: string;
  sidenoteBorder?: string;
  cardBg?: string;
  border?: string;
  typography?: {
    headingFont?: string;
    bodyFont?: string;
    fontImportUrl?: string;
    fontSizeScale?: 'compact' | 'classic' | 'spacious';
    lineHeight?: string;
  };
  motifs?: {
    borderRadius?: string;
    dividerStyle?: string;
    quoteStyle?: 'bordered-left' | 'callout-box' | 'centered-large' | 'bracketed';
  };
}

// Tier 1: Library Index Level (Minimalist metadata)
export interface CourseCatalogEntry {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  progressPercent: number;
  totalModules: number;
  totalSources: number;
  status: CourseStatus;
  theme: CourseDesignSystem;
  lessonSlugs: string[]; // For client localStorage reading progress calculation
}

// Tier 2: Course Syllabus Level (Module hierarchy, NO contentHtml)
export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  unitNumber: number;
  lessonNumber: string;
  type: LessonType;
  readTime: string;
  originalSourceLabel?: string;
  youtubeId?: string;
}

export interface ModuleSyllabus {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: LessonSummary[];
}

export interface CourseSyllabus {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  updatedAt: string;
  duration: string;
  progressPercent: number;
  status: CourseStatus;
  theme: CourseDesignSystem;
  modules: ModuleSyllabus[];
}

// Tier 3: Granular Lesson Content Level
export interface LessonOutlineItem {
  id: string;
  title: string;
  level: number;
}

export interface VideoTimestamp {
  time: number;
  label: string;
  text: string;
}

export interface LessonContent extends LessonSummary {
  module: string;
  originalSourceUrl?: string;
  summaryQuote: string;
  outline: LessonOutlineItem[];
  contentHtml: string;
  videoTimestamps?: VideoTimestamp[];
}

// Minimal Course Shell Context for Reader Header/Back-links
export interface CourseShellContext {
  id: string;
  slug: string;
  title: string;
  theme: {
    accent: string;
    highlight: string;
  };
}

// Minimal Adjacent Navigation Pointers
export interface LessonNavLink {
  slug: string;
  title: string;
  lessonNumber: string;
  type: LessonType;
  readTime: string;
}

// Transcript Segments
export interface TranscriptCue {
  time: number;
  label: string;
  text: string;
}

export interface VideoTranscript {
  videoId: string;
  fetchedAt: string;
  lang: string;
  kind: string;
  segments: TranscriptCue[];
}
```

### 5.2. Unified Loader & Query API (`src/data/index.ts`)

Using Vite's native `import.meta.glob`, we can load lesson content and transcripts lazily without loading unnecessary modules into memory:

```ts
import type { 
  CourseCatalogEntry, 
  CourseSyllabus, 
  LessonContent, 
  VideoTranscript 
} from './types';
import { CATALOG } from './catalog';

// Glob all syllabus modules
const syllabusLoaders = import.meta.glob<{ syllabus: CourseSyllabus }>('./courses/*/syllabus.ts');

// Glob all lesson content modules lazily
const lessonLoaders = import.meta.glob<{ lesson: LessonContent }>('./courses/*/lessons/*.ts');

// Glob all transcript JSON files lazily
const transcriptLoaders = import.meta.glob<VideoTranscript>('./transcripts/*.json');

export function getCatalog(): CourseCatalogEntry[] {
  return CATALOG;
}

export async function getAllSyllabi(): Promise<CourseSyllabus[]> {
  const syllabi: CourseSyllabus[] = [];
  for (const path in syllabusLoaders) {
    const mod = await syllabusLoaders[path]();
    syllabi.push(mod.syllabus);
  }
  return syllabi;
}

export async function getCourseSyllabus(courseSlug: string): Promise<CourseSyllabus | null> {
  const key = `./courses/${courseSlug}/syllabus.ts`;
  const loader = syllabusLoaders[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.syllabus;
}

export async function getLessonContent(courseSlug: string, lessonSlug: string): Promise<LessonContent | null> {
  const key = `./courses/${courseSlug}/lessons/${lessonSlug}.ts`;
  const loader = lessonLoaders[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.lesson;
}

export async function getTranscript(youtubeId: string): Promise<VideoTranscript | null> {
  const key = `./transcripts/${youtubeId}.json`;
  const loader = transcriptLoaders[key];
  if (!loader) return null;
  return await loader();
}
```

---

## 6. Route Refactoring Blueprint

### 6.1. `src/pages/index.astro` Refactor

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HubHeader from '../components/HubHeader.astro';
import { getCatalog } from '../data';
import { path } from '../utils/paths';
import { getCategoryColor } from '../utils/categoryColors';

const courses = getCatalog(); // Loads ONLY ~2 KB of catalog data!
---

<BaseLayout title="Library — AHKH Study Hub" description="...">
  <HubHeader activeTab="library" />
  <main class="flex-1 max-w-reading w-full mx-auto px-6 py-12">
    ...
    <div class="divide-y divide-ink-border/60 dark:divide-dark-border ...">
      {courses.map((course, index) => {
        const num = String(index + 1).padStart(2, '0');
        const statusMeta = STATUS_CONFIG[course.status];
        return (
          <article 
            class="..." 
            data-course-id={course.id} 
            data-lessons={course.lessonSlugs.join(',')}
          >
            <a href={path(`/courses/${course.slug}`)} class="block focus:outline-hidden">
              ...
              <div class="flex items-center gap-2.5 text-xs font-mono text-ink-muted dark:text-dark-muted mt-1.5">
                <span><span class="font-medium text-ink dark:text-dark-ink">{course.totalModules}</span> Modules</span>
                <span>·</span>
                <span><span class="font-medium text-ink dark:text-dark-ink">{course.totalSources}</span> Sources</span>
                ...
              </div>
            </a>
          </article>
        );
      })}
    </div>
  </main>
</BaseLayout>
```

### 6.2. `src/pages/courses/[course]/index.astro` Refactor

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import ThemeSwitcher from '../../../components/ThemeSwitcher.astro';
import { getAllSyllabi } from '../../../data';
import { path } from '../../../utils/paths';
import { getCategoryColor, getFormatColor } from '../../../utils/categoryColors';

export async function getStaticPaths() {
  const syllabi = await getAllSyllabi();
  return syllabi.map((course) => ({
    params: { course: course.slug },
    props: { course }, // course is CourseSyllabus (~16.8 KB), ZERO contentHtml!
  }));
}

const { course } = Astro.props;
---
```

### 6.3. `src/pages/courses/[course]/[slug].astro` Refactor

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { getAllSyllabi, getLessonContent, getTranscript } from '../../../data';
import { path } from '../../../utils/paths';
import { getFormatColor } from '../../../utils/categoryColors';
import { PanelLeft, PanelRight, ChevronLeft, Sun, Moon, RotateCcw } from '@lucide/astro';

export async function getStaticPaths() {
  const syllabi = await getAllSyllabi();
  const paths: any[] = [];

  for (const course of syllabi) {
    const allLessons = course.modules.flatMap((mod) => mod.lessons);

    for (let index = 0; index < allLessons.length; index++) {
      const summary = allLessons[index];

      const prevLesson = index > 0 ? {
        slug: allLessons[index - 1].slug,
        title: allLessons[index - 1].title,
        lessonNumber: allLessons[index - 1].lessonNumber,
        type: allLessons[index - 1].type,
        readTime: allLessons[index - 1].readTime,
      } : null;

      const nextLesson = index < allLessons.length - 1 ? {
        slug: allLessons[index + 1].slug,
        title: allLessons[index + 1].title,
        lessonNumber: allLessons[index + 1].lessonNumber,
        type: allLessons[index + 1].type,
        readTime: allLessons[index + 1].readTime,
      } : null;

      // 1. Lazy load ONLY this lesson's contentHtml & outline (~8.8 KB)
      const lesson = await getLessonContent(course.slug, summary.slug);

      // 2. Lazy load ONLY this video's transcript (~4 KB), or null for articles
      const transcript = lesson?.youtubeId ? await getTranscript(lesson.youtubeId) : null;

      paths.push({
        params: { course: course.slug, slug: summary.slug },
        props: {
          // Minimal course context for the reader shell (only ~150 bytes!)
          course: {
            id: course.id,
            slug: course.slug,
            title: course.title,
            theme: {
              accent: course.theme.accent,
              highlight: course.theme.highlight,
            },
          },
          lesson,
          transcriptSegments: transcript?.segments || null,
          prevLesson,
          nextLesson,
        },
      });
    }
  }
  return paths;
}

const { course, lesson, transcriptSegments, prevLesson, nextLesson } = Astro.props;
---
```

---

## 7. Migration Pipeline & Tooling Integration

### 7.1. Automated Data Migration Script
To migrate from the current 5,329-line `courses.ts` into the granular directory structure with 100% data fidelity and zero manual editing, an automated migration script was written and verified using `jiti`.

The migration script:
1. Loads `src/data/courses.ts` via `jiti`.
2. Extracts course metadata and builds `src/data/catalog.ts`.
3. Extracts module hierarchy and builds `src/data/courses/<slug>/syllabus.ts`.
4. Loops over each lesson and writes `src/data/courses/<slug>/lessons/<slug>.ts`, preserving all formatting, HTML, and image paths.
5. Splits `src/data/transcripts.json` into individual `src/data/transcripts/<youtubeId>.json` files.
6. Generates `src/data/index.ts` and `src/data/types.ts`.

### 7.2. Integration with `scripts/fetch-transcripts.mjs`
`scripts/fetch-transcripts.mjs` currently discovers YouTube IDs by regex matching on `COURSES_PATH`:
```js
function discoverIds() {
  const src = readFileSync(COURSES_PATH, 'utf8');
  const ids = new Set();
  for (const m of src.matchAll(/youtubeId\s*:\s*['"]([A-Za-z0-9_-]{11})['"]/g)) {
    ids.add(m[1]);
  }
  return [...ids];
}
```
In the new architecture, `discoverIds()` can recursively scan `src/data/courses/` (or read all `syllabus.ts` files). Instead of writing to a single monolithic `transcripts.json`, it saves each fetched track directly to `src/data/transcripts/${id}.json`. This provides **true incremental caching** where modifying or adding one video transcript touches exactly one file in Git.

### 7.3. Integration with `src/utils/courseStats.ts`
In `src/utils/courseStats.ts`, the functions `countLessons(course)`, `studyMinutes(course)`, and `courseProgress(course)` only access `course.modules` and `mod.lessons[].readTime`/`slug`. By updating their type parameter to `CourseSyllabus`, `courseStats.ts` maintains 100% type safety and zero data bloat.

---

## 8. Quantitative Impact & Scorecard

| Dimension | Before (Monolithic) | After (Split Architecture) | Improvement |
|---|---|---|---|
| **Library Index Data Import** | 345.68 KB (`courses.ts`) | 2.08 KB (`catalog.ts`) | **-99.4%** |
| **Course Page Data Import** | 345.68 KB (`courses.ts`) | 16.77 KB (`syllabus.ts`) | **-95.1%** |
| **Lesson Reader Props (`course`)** | 345.68 KB (all lessons + HTML) | ~0.15 KB (shell tokens only) | **-99.95%** |
| **Lesson Reader Props (`lesson`)** | Monolithic lookup | 8.77 KB (individual lesson) | **Isolated chunk** |
| **Transcript Import (`[slug].astro`)** | 96.97 KB (all 16 videos) | 0 KB (articles) / ~3.8 KB (video) | **-96% to -100%** |
| **`getStaticPaths` In-Memory Props Array** | ~12.8 MB (37 × 345 KB) | ~0.33 MB (37 × ~9 KB) | **-97.4% memory** |
| **HMR / Vite Dev Invalidation Scope** | Editing 1 lesson re-transforms 5,329 lines | Editing 1 lesson re-transforms ~150 lines | **~35x faster HMR** |
| **Git Merge Conflict Surface** | Single 5,329-line file | 37 decoupled modular files | **Zero merge collision** |
| **Scaling with 10 Courses (400 Lessons)** | Monolithic: ~3.5 MB static file, 1.4 GB props | Modular: catalog stays ~20 KB, props stay ~3.6 MB | **O(1) per page** |

---

## 9. Recommendations for Implementation Phase

1. **Step 1: Create Data Directory Structure & Types:**
   Create `src/data/types.ts` containing the tiered interfaces (`CourseCatalogEntry`, `CourseSyllabus`, `LessonContent`, `VideoTranscript`).
2. **Step 2: Automated Ingestion Migration Script:**
   Execute an automated migration script in Node.js (tested via `jiti`) to populate `src/data/catalog.ts`, `src/data/courses/springboard-ux/`, and `src/data/transcripts/`.
3. **Step 3: Update `fetch-transcripts.mjs`:**
   Update `fetch-transcripts.mjs` to write individual JSON files to `src/data/transcripts/` and scan `src/data/courses/` for IDs.
4. **Step 4: Refactor Page Routes:**
   - Update `src/pages/index.astro` to consume `getCatalog()`.
   - Update `src/pages/courses/[course]/index.astro` to consume `getAllSyllabi()` / `getCourseSyllabus()`.
   - Update `src/pages/courses/[course]/[slug].astro` to consume `getLessonContent()` and minimal `course` shell tokens.
5. **Step 5: Run Verification Suite:**
   Run `npm run verify:scripts`, `npm run build`, and `npm run verify:dist` to confirm zero regressions, clean static paths, and pristine Swiss design compliance.
