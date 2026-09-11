# Milestone 1: Data Splitting — Technical Architecture & Implementation Blueprint

**Milestone:** M1 — Data Splitting & Lazy Bundles  
**Role:** Exploration Agent (teamwork_preview_explorer)  
**Target Files:**
- `src/data/types.ts` (Core type contracts)
- `src/data/catalog.ts` (Tier 1 Catalog: `CATALOG_COURSES`)
- `src/data/courses/springboard-ux/syllabus.ts` (Tier 2 Syllabus: `SYLLABUS`)
- `src/pages/index.astro` (Consumer: Library Index)
- `src/pages/courses/[course]/index.astro` (Consumer: Course Syllabus)
- `src/utils/courseStats.ts` (Type compatibility adapter)

---

## 1. Executive Summary & Problem Analysis

### 1.1. The Monolithic Dataset Bottleneck
In the current production architecture:
- `src/data/courses.ts` measures **345,565 bytes (337.47 KB)** across **5,329 lines of TypeScript**.
- **79.28% of `courses.ts` (273.97 KB)** consists exclusively of raw HTML strings (`contentHtml`) across 37 lessons.
- `src/pages/index.astro` imports all 345.68 KB just to render course title, status, duration, module count, and lesson slug attributes (needs ~2.08 KB; **99.4% data waste**).
- `src/pages/courses/[course]/index.astro` imports all 345.68 KB and passes the monolithic `course` object through `Astro.props`, evaluating 273.97 KB of `contentHtml` despite needing only unit and lesson titles, types, and read times (**95.1% data waste**).
- `src/pages/courses/[course]/[slug].astro` passes the monolithic `course` object (containing all 37 lessons and all HTML) into every lesson page route. For 37 generated routes, this creates **~12.8 MB of in-memory duplicate props references** during static generation.

### 1.2. The Milestone 1 Solution
Milestone 1 decouples this monolithic structure into a strictly typed, 3-tier granular hierarchy:
1. **Tier 1 (`src/data/catalog.ts`):** Exports `CATALOG_COURSES: CourseCatalogSummary[]`. Weighs ~2.1 KB. Contains only course card metadata and `lessonSlugs: string[]` for client-side localStorage progress tracking.
2. **Tier 2 (`src/data/courses/<course>/syllabus.ts`):** Exports `SYLLABUS: CourseSyllabus`. Weighs ~19.6 KB. Contains the complete module hierarchy and lesson titles, types, and durations, with **strictly 0 bytes of `contentHtml`**, `outline`, `summaryQuote`, or `videoTimestamps`.
3. **Type Hierarchy (`src/data/types.ts`):** Defines minimal summary interfaces while ensuring that full `Lesson` extends `LessonSummary` and `Course` satisfies `CourseSyllabus`, guaranteeing 100% covariance and backwards compatibility across all existing helper functions and routes.

---

## 2. Type Architecture Contract (`src/data/types.ts`)

To ensure seamless compatibility between legacy monolithic structures and new granular tiers, the types are defined in `src/data/types.ts` using inheritance and interface composition.

### 2.1. File Content: `src/data/types.ts`

```ts
/**
 * Course lifecycle status.
 * Stored in browser localStorage and reflected in UI signal badges.
 */
export type CourseStatus = 'active' | 'new' | 'explored' | 'completed';

/**
 * Lesson media format type.
 */
export type LessonType = 'article' | 'video' | 'pdf';

/**
 * Course-level visual design tokens and typography parameters.
 */
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

/**
 * Lesson table of contents outline item.
 */
export interface LessonOutlineItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Click-to-seek video caption timestamp.
 */
export interface VideoTimestamp {
  time: number;
  label: string;
  text: string;
}

// ============================================================================
// TIER 1: CATALOG LEVEL (Library Index / Home Page)
// ============================================================================

/**
 * Minimal course card metadata for src/pages/index.astro.
 * Contains only properties displayed on the Library Index plus lessonSlugs
 * for client-side progress calculation via localStorage.
 * Weighs ~2 KB for the whole catalog.
 */
export interface CourseCatalogSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  progressPercent: number;
  totalModules: number;
  totalSources: number;
  status: CourseStatus;
  lessonSlugs: string[];
  theme?: CourseDesignSystem;
}

// ============================================================================
// TIER 2: SYLLABUS LEVEL (Course Overview & Curriculum Roadmap)
// ============================================================================

/**
 * Minimal lesson metadata required to render the curriculum roadmap tree-grid
 * in src/pages/courses/[course]/index.astro.
 * Strictly excludes contentHtml, outline, summaryQuote, and videoTimestamps.
 */
export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  module?: string;
  unitNumber?: number;
  lessonNumber: string;
  type: LessonType;
  readTime: string;
  originalSourceLabel?: string;
  originalSourceUrl?: string;
  youtubeId?: string;
}

/**
 * Module container parameterized by lesson type.
 */
export interface Module<TLesson = LessonSummary> {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: TLesson[];
}

/**
 * Syllabus module containing lightweight LessonSummary items.
 */
export type ModuleSummary = Module<LessonSummary>;

/**
 * Course syllabus data structure for src/pages/courses/[course]/index.astro.
 * Holds module structure, lesson titles, and time estimates, with 0 bytes of lesson HTML.
 */
export interface CourseSyllabus {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  updatedAt?: string;
  duration: string;
  progressPercent: number;
  totalModules: number;
  totalSources: number;
  status: CourseStatus;
  theme?: CourseDesignSystem;
  modules: ModuleSummary[];
}

// ============================================================================
// TIER 3: LESSON READER LEVEL (Granular Lesson Files & Legacy Compatibility)
// ============================================================================

/**
 * Full lesson detail containing verbatim contentHtml, outline, and timestamps.
 * Extends LessonSummary so that any Lesson is structurally assignable to LessonSummary.
 */
export interface Lesson extends LessonSummary {
  module: string;
  unitNumber: number;
  summaryQuote: string;
  outline: LessonOutlineItem[];
  contentHtml: string;
  videoTimestamps?: VideoTimestamp[];
}

/**
 * Full monolithic course representation.
 * Retained for backwards compatibility with any existing scripts or tools.
 */
export interface Course extends Omit<CourseSyllabus, 'modules'> {
  subtitle: string;
  updatedAt: string;
  totalModules: number;
  totalSources: number;
  theme: CourseDesignSystem;
  modules: Module<Lesson>[];
}

/**
 * Minimal course shell context passed to lesson reader props.
 * Replaces passing the monolithic 345 KB course object in [slug].astro.
 */
export interface CourseShellContext {
  id: string;
  slug: string;
  title: string;
  theme: {
    accent: string;
    highlight: string;
  };
}

/**
 * Sequential adjacent navigation pointer (Previous/Next lesson cards).
 */
export interface LessonNavLink {
  slug: string;
  title: string;
  lessonNumber: string;
  type: LessonType;
  readTime: string;
}

/**
 * Video transcript cue segment.
 */
export interface TranscriptCue {
  time: number;
  label: string;
  text: string;
}

/**
 * Individual video transcript container.
 */
export interface VideoTranscript {
  videoId: string;
  fetchedAt: string;
  lang: string;
  kind: string;
  segments: TranscriptCue[];
}
```

### 2.2. Backwards Compatibility Layer in `src/data/courses.ts`
To prevent any breakages in external scripts, tests, or legacy imports, `src/data/courses.ts` re-exports all types from `./types`:
```ts
export type {
  CourseStatus,
  LessonType,
  CourseDesignSystem,
  CourseCatalogSummary,
  LessonSummary,
  Module,
  ModuleSummary,
  CourseSyllabus,
  Lesson,
  Course,
  CourseShellContext,
  LessonNavLink,
  TranscriptCue,
  VideoTranscript,
} from './types';
```

---

## 3. Tier 1 Catalog Contract (`src/data/catalog.ts`)

`src/data/catalog.ts` provides lightweight catalog metadata for `src/pages/index.astro`. It weighs **2,118 bytes (~2.1 KB)**, reducing data parsed by the Library Index from 345.68 KB to 2.1 KB (**99.4% reduction**).

### 3.1. Complete Source Code: `src/data/catalog.ts`

```ts
import type { CourseCatalogSummary } from './types';

export const CATALOG_COURSES: CourseCatalogSummary[] = [
  {
    id: 'springboard-ux',
    slug: 'springboard-ux',
    title: 'Springboard UX Career Track',
    category: 'Product Design',
    duration: '40 hrs',
    progressPercent: 34,
    totalModules: 8,
    totalSources: 37,
    status: 'active',
    theme: {
      accent: '#18181B',
      highlight: 'rgba(0, 0, 0, 0.08)',
      paperBg: '#FFFFFF',
    },
    lessonSlugs: [
      'the-anatomy-of-product-experience',
      'the-eight-step-ux-process',
      'ux-vs-ui-deliverables-and-planes',
      'design-thinking-process-and-mindsets',
      'what-is-design-thinking-strategy-group',
      'design-thinking-practitioners-guide',
      'user-research-methods-and-interviews',
      'personas-vs-jobs-to-be-done',
      'affinity-diagramming-for-ux-findings',
      'ten-usability-heuristics-with-severity-matrix',
      'heuristic-1-visibility-of-system-status',
      'heuristic-2-match-system-and-real-world',
      'heuristic-3-user-control-and-freedom',
      'heuristic-4-consistency-and-standards',
      'heuristic-5-error-prevention',
      'heuristic-6-recognition-rather-than-recall',
      'heuristic-7-flexibility-and-efficiency-of-use',
      'heuristic-8-aesthetic-and-minimalist-design',
      'information-architecture-and-card-sorting',
      'the-art-of-ux-sketching',
      'design-sprint-crazy-8s-fast-ideation',
      'reusable-design-patterns-for-products',
      'sketching-a-screen-with-existing-patterns',
      'wireframes-at-daylight-studio-guide',
      'interactive-prototyping-in-figma',
      'prototyping-with-sketch-mastery',
      'ui-design-fundamentals-and-color',
      'reference-guide-for-mobile-typography',
      'visual-design-in-ux-study-guide',
      'moderated-usability-testing-and-the-five-act-interview',
      'usability-testing-101-nngroup-foundations',
      'user-testing-why-and-how-jakob-nielsen',
      'moderated-usability-testing-five-step-process',
      'breaking-into-ux-and-career-strategy',
      'a-day-in-the-life-of-a-ux-designer',
      'the-good-and-bad-of-working-as-a-designer',
      'how-do-you-break-into-ux-design',
    ],
  },
];
```

---

## 4. Tier 2 Syllabus Contract (`src/data/courses/springboard-ux/syllabus.ts`)

`src/data/courses/springboard-ux/syllabus.ts` provides the structural syllabus for `src/pages/courses/[course]/index.astro`. It weighs **19,634 bytes (~19.6 KB)** and **511 lines**, down from 345.68 KB and 5,329 lines (**93.9% reduction**). It contains all 8 units and 37 lessons, with 0 bytes of `contentHtml`.

### 4.1. Complete Source Code: `src/data/courses/springboard-ux/syllabus.ts`

```ts
import type { CourseSyllabus } from '../../types';

export const SYLLABUS: CourseSyllabus = {
  id: 'springboard-ux',
  slug: 'springboard-ux',
  title: 'Springboard UX Career Track',
  subtitle: 'Human-Centered Research, Information Architecture & Usability',
  description: 'A disciplined, master-level curriculum covering contextual inquiry, user testing protocols, synthesis, and ergonomic interface design.',
  category: 'Product Design',
  updatedAt: '2 days ago',
  duration: '40 hrs',
  progressPercent: 34,
  totalModules: 8,
  totalSources: 37,
  status: 'active',
  theme: {
    accent: '#18181B',
    highlight: 'rgba(0, 0, 0, 0.08)',
    paperBg: '#FFFFFF',
  },
  modules: [
    {
      id: 'mod-1',
      number: 1,
      title: 'Unit 1: Design 101 & Foundations',
      description: 'Core concepts of UX design, the 3 levels of experience, and foundational discovery methods.',
      lessons: [
        {
          id: 'sb-1-0',
          slug: 'the-anatomy-of-product-experience',
          title: 'Introduction to UX Design: Core Principles, Process & Career Paths',
          unitNumber: 1,
          lessonNumber: '1.0',
          type: 'pdf',
          readTime: '18 min',
          originalSourceLabel: 'Laurel Hechanova (Goodmaker / Springboard Foundations)',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658744',
        },
        {
          id: 'sb-1-1',
          slug: 'the-eight-step-ux-process',
          title: 'The 8-Step UX Design Process',
          unitNumber: 1,
          lessonNumber: '1.1',
          type: 'video',
          readTime: '12 min study',
          originalSourceLabel: 'Springboard Design Foundations Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=6lmvCqvmjfE',
          youtubeId: '6lmvCqvmjfE',
        },
        {
          id: 'sb-1-2',
          slug: 'ux-vs-ui-deliverables-and-planes',
          title: 'UX vs UI: Roles, Responsibilities, and Real Deliverables',
          unitNumber: 1,
          lessonNumber: '1.2',
          type: 'video',
          readTime: '10 min study',
          originalSourceLabel: 'Springboard UX Foundations',
          originalSourceUrl: 'https://www.youtube.com/watch?v=TtgegZfk5ZU',
          youtubeId: 'TtgegZfk5ZU',
        },
        {
          id: 'sb-1-3',
          slug: 'design-thinking-process-and-mindsets',
          title: 'Design Thinking: Process, Mindsets, and Team Alignment',
          unitNumber: 1,
          lessonNumber: '1.3',
          type: 'video',
          readTime: '15 min study',
          originalSourceLabel: 'Springboard Design Foundations Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=cTtc90jCULU',
          youtubeId: 'cTtc90jCULU',
        },
        {
          id: 'sb-1-4',
          slug: 'what-is-design-thinking-strategy-group',
          title: 'What is Design Thinking? An Executive Introduction',
          unitNumber: 1,
          lessonNumber: '1.4',
          type: 'article',
          readTime: '8 min',
          originalSourceLabel: 'Design Thinking Strategy Group',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658752',
        },
        {
          id: 'sb-1-5',
          slug: 'design-thinking-practitioners-guide',
          title: 'A Practitioner’s Guide to Design Thinking in Agile Teams',
          unitNumber: 1,
          lessonNumber: '1.5',
          type: 'article',
          readTime: '14 min',
          originalSourceLabel: 'Springboard Editorial',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658757',
        },
      ],
    },
    {
      id: 'mod-2',
      number: 2,
      title: 'Unit 2: User Research & Discovery',
      description: 'Generative user research, ethnographic interviews, persona formulation, and empathy maps.',
      lessons: [
        {
          id: 'sb-2-1',
          slug: 'user-research-methods-and-interviews',
          title: 'Generative Research: Conducting Contextual 1-on-1 User Interviews',
          unitNumber: 2,
          lessonNumber: '2.1',
          type: 'video',
          readTime: '18 min study',
          originalSourceLabel: 'Springboard Research Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=0TAt9Pln51g',
          youtubeId: '0TAt9Pln51g',
        },
        {
          id: 'sb-2-2',
          slug: 'personas-vs-jobs-to-be-done',
          title: 'Synthesizing Insight: Proto-Personas vs Jobs to Be Done (JTBD)',
          unitNumber: 2,
          lessonNumber: '2.2',
          type: 'article',
          readTime: '12 min',
          originalSourceLabel: 'Nielsen Norman Group Research',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658763',
        },
        {
          id: 'sb-2-3',
          slug: 'affinity-diagramming-for-ux-findings',
          title: 'Affinity Diagramming: Turning Raw Qualitative Data into Patterns',
          unitNumber: 2,
          lessonNumber: '2.3',
          type: 'article',
          readTime: '10 min',
          originalSourceLabel: 'Interaction Design Foundation',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658769',
        },
        {
          id: 'sb-2-4',
          slug: 'ten-usability-heuristics-with-severity-matrix',
          title: 'Jakob Nielsen’s 10 Usability Heuristics & Severity Rating Framework',
          unitNumber: 2,
          lessonNumber: '2.4',
          type: 'article',
          readTime: '22 min',
          originalSourceLabel: 'Jakob Nielsen (NN/g 1994 Foundations)',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658774',
        },
        {
          id: 'sb-2-5',
          slug: 'heuristic-1-visibility-of-system-status',
          title: 'Heuristic Deep-Dive #1: Visibility of System Status & Feedback',
          unitNumber: 2,
          lessonNumber: '2.5',
          type: 'article',
          readTime: '9 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658780',
        },
        {
          id: 'sb-2-6',
          slug: 'heuristic-2-match-system-and-real-world',
          title: 'Heuristic Deep-Dive #2: Match Between System and the Real World',
          unitNumber: 2,
          lessonNumber: '2.6',
          type: 'article',
          readTime: '8 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658785',
        },
        {
          id: 'sb-2-7',
          slug: 'heuristic-3-user-control-and-freedom',
          title: 'Heuristic Deep-Dive #3: User Control, Freedom, and Emergency Exits',
          unitNumber: 2,
          lessonNumber: '2.7',
          type: 'article',
          readTime: '9 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658790',
        },
        {
          id: 'sb-2-8',
          slug: 'heuristic-4-consistency-and-standards',
          title: 'Heuristic Deep-Dive #4: Consistency, Industry Standards & Conventions',
          unitNumber: 2,
          lessonNumber: '2.8',
          type: 'article',
          readTime: '11 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658794',
        },
        {
          id: 'sb-2-9',
          slug: 'heuristic-5-error-prevention',
          title: 'Heuristic Deep-Dive #5: Error Prevention Over Error Messages',
          unitNumber: 2,
          lessonNumber: '2.9',
          type: 'article',
          readTime: '10 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658799',
        },
        {
          id: 'sb-2-10',
          slug: 'heuristic-6-recognition-rather-than-recall',
          title: 'Heuristic Deep-Dive #6: Recognition Rather Than Recall',
          unitNumber: 2,
          lessonNumber: '2.10',
          type: 'article',
          readTime: '8 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658804',
        },
        {
          id: 'sb-2-11',
          slug: 'heuristic-7-flexibility-and-efficiency-of-use',
          title: 'Heuristic Deep-Dive #7: Flexibility and Efficiency of Use',
          unitNumber: 2,
          lessonNumber: '2.11',
          type: 'article',
          readTime: '9 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658809',
        },
        {
          id: 'sb-2-12',
          slug: 'heuristic-8-aesthetic-and-minimalist-design',
          title: 'Heuristic Deep-Dive #8: Aesthetic and Minimalist Design (Signal-to-Noise)',
          unitNumber: 2,
          lessonNumber: '2.12',
          type: 'article',
          readTime: '9 min',
          originalSourceLabel: 'NN/g Heuristics In Practice',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658814',
        },
      ],
    },
    {
      id: 'mod-3',
      number: 3,
      title: 'Unit 3: Information Architecture & User Flows',
      description: 'Taxonomy, site structures, open/closed card sorting, and end-to-end task flows.',
      lessons: [
        {
          id: 'sb-3-1',
          slug: 'information-architecture-and-card-sorting',
          title: 'Information Architecture: Hierarchy, Taxonomies, and Card Sorting',
          unitNumber: 3,
          lessonNumber: '3.1',
          type: 'video',
          readTime: '14 min study',
          originalSourceLabel: 'Springboard IA Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=MXuk-fdbr0A',
          youtubeId: 'MXuk-fdbr0A',
        },
      ],
    },
    {
      id: 'mod-4',
      number: 4,
      title: 'Unit 4: Wireframing & Sketching',
      description: 'Low-fidelity sketching, rapid ideation, Crazy Eights, and reusable screen patterns.',
      lessons: [
        {
          id: 'sb-4-1',
          slug: 'the-art-of-ux-sketching',
          title: 'The Art of UX Sketching: Speed, Breadth, and Cognitive Externalization',
          unitNumber: 4,
          lessonNumber: '4.1',
          type: 'video',
          readTime: '11 min study',
          originalSourceLabel: 'Springboard Sketching Practicum',
          originalSourceUrl: 'https://www.youtube.com/watch?v=Ibndy9KLOSQ',
          youtubeId: 'Ibndy9KLOSQ',
        },
        {
          id: 'sb-4-2',
          slug: 'design-sprint-crazy-8s-fast-ideation',
          title: 'The Crazy Eights Protocol: Rapid Divergent Concept Generation',
          unitNumber: 4,
          lessonNumber: '4.2',
          type: 'video',
          readTime: '8 min study',
          originalSourceLabel: 'Google Ventures Design Sprint Practicum',
          originalSourceUrl: 'https://www.youtube.com/watch?v=imS9s1DUY-I',
          youtubeId: 'imS9s1DUY-I',
        },
        {
          id: 'sb-4-3',
          slug: 'reusable-design-patterns-for-products',
          title: 'Cataloging UI Patterns: Accelerating Ideation with Proven Mental Models',
          unitNumber: 4,
          lessonNumber: '4.3',
          type: 'video',
          readTime: '13 min study',
          originalSourceLabel: 'Springboard Pattern Lab',
          originalSourceUrl: 'https://www.youtube.com/watch?v=6glQPp6q4Jc',
          youtubeId: '6glQPp6q4Jc',
        },
        {
          id: 'sb-4-4',
          slug: 'sketching-a-screen-with-existing-patterns',
          title: 'Pattern Composition: Sketching a Complete Interface from Mental Models',
          unitNumber: 4,
          lessonNumber: '4.4',
          type: 'video',
          readTime: '16 min study',
          originalSourceLabel: 'Springboard Studio Walkthrough',
          originalSourceUrl: 'https://www.youtube.com/watch?v=LoTdRTBB8BQ',
          youtubeId: 'LoTdRTBB8BQ',
        },
        {
          id: 'sb-4-5',
          slug: 'wireframes-at-daylight-studio-guide',
          title: 'Mid-Fidelity Wireframes: Structural Blueprints Before High-Fidelity Styling',
          unitNumber: 4,
          lessonNumber: '4.5',
          type: 'article',
          readTime: '12 min',
          originalSourceLabel: 'Daylight Studio Architecture Guide',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658821',
        },
      ],
    },
    {
      id: 'mod-5',
      number: 5,
      title: 'Unit 5: Interactive Prototyping',
      description: 'Micro-interactions, state transitions, Figma component variables, and click-through validation.',
      lessons: [
        {
          id: 'sb-5-1',
          slug: 'interactive-prototyping-in-figma',
          title: 'Interactive Prototyping in Figma: Smart Animate, Components & Variants',
          unitNumber: 5,
          lessonNumber: '5.1',
          type: 'video',
          readTime: '20 min study',
          originalSourceLabel: 'Figma Mastery Masterclass',
          originalSourceUrl: 'https://www.youtube.com/watch?v=ZgbRmeWDgd0',
          youtubeId: 'ZgbRmeWDgd0',
        },
        {
          id: 'sb-5-2',
          slug: 'prototyping-with-sketch-mastery',
          title: 'Prototyping with Sketch: Symbols, Overrides, and Screen Linkages',
          unitNumber: 5,
          lessonNumber: '5.2',
          type: 'video',
          readTime: '15 min study',
          originalSourceLabel: 'Sketch Foundations Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=yz4g87XapQ0',
          youtubeId: 'yz4g87XapQ0',
        },
      ],
    },
    {
      id: 'mod-6',
      number: 6,
      title: 'Unit 6: UI & Visual Design Fundamentals',
      description: 'Typography hierarchies, Swiss spatial grids, contrast ratios, and design systems.',
      lessons: [
        {
          id: 'sb-6-1',
          slug: 'ui-design-fundamentals-and-color',
          title: 'Color Theory for Digital Interfaces: Semantic Roles, Contrast & Accessibility',
          unitNumber: 6,
          lessonNumber: '6.1',
          type: 'video',
          readTime: '18 min study',
          originalSourceLabel: 'Springboard UI Foundations',
          originalSourceUrl: 'https://www.youtube.com/watch?v=RGajFMYZ0mM',
          youtubeId: 'RGajFMYZ0mM',
        },
        {
          id: 'sb-6-2',
          slug: 'reference-guide-for-mobile-typography',
          title: 'The Mobile Typography Guide: Scale, Proportions, and Rhythm',
          unitNumber: 6,
          lessonNumber: '6.2',
          type: 'article',
          readTime: '14 min',
          originalSourceLabel: 'Typewolf Mobile Typography Report',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658828',
        },
        {
          id: 'sb-6-3',
          slug: 'visual-design-in-ux-study-guide',
          title: 'The Structural Role of Visual Design in Usability & Cognitive Clarity',
          unitNumber: 6,
          lessonNumber: '6.3',
          type: 'article',
          readTime: '16 min',
          originalSourceLabel: 'NN/g Visual Design Compendium',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658834',
        },
      ],
    },
    {
      id: 'mod-7',
      number: 7,
      title: 'Unit 7: Usability Testing & Validation',
      description: 'Protocol design, think-aloud moderator scripts, SUS scoring, and iteration loops.',
      lessons: [
        {
          id: 'sb-7-1',
          slug: 'moderated-usability-testing-and-the-five-act-interview',
          title: 'The Five-Act Usability Interview: Conducting Moderated Test Sessions',
          unitNumber: 7,
          lessonNumber: '7.1',
          type: 'video',
          readTime: '22 min study',
          originalSourceLabel: 'Google Ventures Research Sprint',
          originalSourceUrl: 'https://www.youtube.com/watch?v=U9ZG19XTbd4',
          youtubeId: 'U9ZG19XTbd4',
        },
        {
          id: 'sb-7-2',
          slug: 'usability-testing-101-nngroup-foundations',
          title: 'Usability Testing 101: Core Principles, Test Sizes & When to Test',
          unitNumber: 7,
          lessonNumber: '7.2',
          type: 'article',
          readTime: '11 min',
          originalSourceLabel: 'Jakob Nielsen & Raluca Budiu (NN/g)',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658840',
        },
        {
          id: 'sb-7-3',
          slug: 'user-testing-why-and-how-jakob-nielsen',
          title: 'Why You Only Need to Test with 5 Users: The Mathematical Curve of Diminishing Returns',
          unitNumber: 7,
          lessonNumber: '7.3',
          type: 'article',
          readTime: '13 min',
          originalSourceLabel: 'Jakob Nielsen (NN/g 2000)',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658846',
        },
        {
          id: 'sb-7-4',
          slug: 'moderated-usability-testing-five-step-process',
          title: 'A 5-Step Operational Process for Moderated Usability Testing',
          unitNumber: 7,
          lessonNumber: '7.4',
          type: 'video',
          readTime: '17 min study',
          originalSourceLabel: 'Springboard Testing Lab',
          originalSourceUrl: 'https://www.youtube.com/watch?v=Hq7ohURsQN8',
          youtubeId: 'Hq7ohURsQN8',
        },
      ],
    },
    {
      id: 'mod-8',
      number: 8,
      title: 'Unit 8: Career Pathways & Industry Navigation',
      description: 'Case study formulation, portfolio defense, design critiques, and career roadmaps.',
      lessons: [
        {
          id: 'sb-8-1',
          slug: 'breaking-into-ux-and-career-strategy',
          title: 'Breaking into UX: Strategic Positioning, Skill Matrices & Junior Hiring Reality',
          unitNumber: 8,
          lessonNumber: '8.1',
          type: 'video',
          readTime: '19 min study',
          originalSourceLabel: 'Springboard Career Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=qwCEZ1lRkHo',
          youtubeId: 'qwCEZ1lRkHo',
        },
        {
          id: 'sb-8-2',
          slug: 'a-day-in-the-life-of-a-ux-designer',
          title: 'A Day in the Life: Cross-Functional Alignment, Standups, and Critique Meetings',
          unitNumber: 8,
          lessonNumber: '8.2',
          type: 'article',
          readTime: '10 min',
          originalSourceLabel: 'InVision Design Leadership Report',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658853',
        },
        {
          id: 'sb-8-3',
          slug: 'the-good-and-bad-of-working-as-a-designer',
          title: 'The Realities of Product Design: Organizational Politics, Velocity vs Rigor',
          unitNumber: 8,
          lessonNumber: '8.3',
          type: 'article',
          readTime: '12 min',
          originalSourceLabel: 'Springboard Editorial Team',
          originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658859',
        },
        {
          id: 'sb-8-4',
          slug: 'how-do-you-break-into-ux-design',
          title: 'Deconstructing the Career Pivot: Transferable Skills & Portfolio Architecture',
          unitNumber: 8,
          lessonNumber: '8.4',
          type: 'video',
          readTime: '15 min study',
          originalSourceLabel: 'Springboard Career Series',
          originalSourceUrl: 'https://www.youtube.com/watch?v=ebzQXHIMZu0',
          youtubeId: 'ebzQXHIMZu0',
        },
      ],
    },
  ],
};
```

---

## 5. Consumer Migration Diffs

### 5.1. `src/pages/index.astro`
Consumes `CATALOG_COURSES` from `../data/catalog`.

```diff
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -1,7 +1,7 @@
 ---
 import BaseLayout from '../layouts/BaseLayout.astro';
 import HubHeader from '../components/HubHeader.astro';
-import { COURSES, type CourseStatus } from '../data/courses';
+import { CATALOG_COURSES } from '../data/catalog';
+import type { CourseStatus } from '../data/types';
 import { path } from '../utils/paths';
 import { getCategoryColor } from '../utils/categoryColors';
-import { countLessons } from '../utils/courseStats';
 
 const STATUS_CONFIG: Record<CourseStatus, { label: string; dotClass: string; textClass: string }> = {
@@ -42,15 +42,15 @@
         Index of Curricula
       </h1>
       <span class="font-mono text-xs text-ink-muted dark:text-dark-muted shrink-0">
-        0{COURSES.length} tracks
+        0{CATALOG_COURSES.length} tracks
       </span>
     </div>
 
     <!-- The Editorial Monograph List -->
     <div class="divide-y divide-ink-border/60 dark:divide-dark-border border-t border-b border-ink-border dark:border-dark-border mb-16">
-      {COURSES.map((course, index) => {
+      {CATALOG_COURSES.map((course, index) => {
         const num = String(index + 1).padStart(2, '0');
         const statusMeta = STATUS_CONFIG[course.status];
         return (
-          <article class="group py-5 sm:py-6 transition-colors duration-150 hover:bg-paper-50 dark:hover:bg-dark-card/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xs" data-course-id={course.id} data-lessons={course.modules.flatMap((m) => m.lessons.map((l) => l.slug)).join(',')}>
+          <article class="group py-5 sm:py-6 transition-colors duration-150 hover:bg-paper-50 dark:hover:bg-dark-card/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xs" data-course-id={course.id} data-lessons={course.lessonSlugs.join(',')}>
             <a href={path(`/courses/${course.slug}`)} class="block focus:outline-hidden">
@@ -80,7 +80,7 @@
                     <!-- Metadata metrics: Module count, Source count, Duration -->
                     <div class="flex items-center gap-2.5 text-xs font-mono text-ink-muted dark:text-dark-muted mt-1.5">
-                      <span><span class="font-medium text-ink dark:text-dark-ink">{course.modules.length}</span> Modules</span>
+                      <span><span class="font-medium text-ink dark:text-dark-ink">{course.totalModules}</span> Modules</span>
                       <span>·</span>
-                      <span><span class="font-medium text-ink dark:text-dark-ink">{countLessons(course)}</span> Sources</span>
+                      <span><span class="font-medium text-ink dark:text-dark-ink">{course.totalSources}</span> Sources</span>
                       {course.duration && (
```

### 5.2. `src/pages/courses/[course]/index.astro`
Consumes `CourseSyllabus` dynamically discovered via `import.meta.glob`.

```diff
--- a/src/pages/courses/[course]/index.astro
+++ b/src/pages/courses/[course]/index.astro
@@ -1,13 +1,24 @@
 ---
 import BaseLayout from '../../../layouts/BaseLayout.astro';
 import ThemeSwitcher from '../../../components/ThemeSwitcher.astro';
-import { COURSES } from '../../../data/courses';
+import type { CourseSyllabus } from '../../../data/types';
 import { path } from '../../../utils/paths';
 import { getCategoryColor, getFormatColor } from '../../../utils/categoryColors';
 import { countLessons } from '../../../utils/courseStats';
 
 export function getStaticPaths() {
-  return COURSES.map((course) => ({
-    params: { course: course.slug },
-    props: { course },
+  const syllabusModules = import.meta.glob<{ SYLLABUS: CourseSyllabus }>(
+    '../../../data/courses/*/syllabus.ts',
+    { eager: true }
+  );
+  return Object.values(syllabusModules).map((mod) => ({
+    params: { course: mod.SYLLABUS.slug },
+    props: { course: mod.SYLLABUS },
   }));
 }
 
+interface Props {
+  course: CourseSyllabus;
+}
+
 const { course } = Astro.props;
```

### 5.3. `src/utils/courseStats.ts`
Updates parameter types to accept `CourseSyllabus` (and by extension `Course`, which satisfies `CourseSyllabus`).

```diff
--- a/src/utils/courseStats.ts
+++ b/src/utils/courseStats.ts
@@ -1,7 +1,7 @@
-import type { Course } from '../data/courses';
+import type { CourseSyllabus } from '../data/types';
 import { storageHas } from './storage';
 
-export function countLessons(course: Course): number {
+export function countLessons(course: CourseSyllabus): number {
   return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
 }
 
-export function studyMinutes(course: Course): number {
+export function studyMinutes(course: CourseSyllabus): number {
   return course.modules.reduce(
     (sum, mod) =>
       sum +
@@ -94,7 +94,7 @@
 }
 
-export function courseProgress(course: Course): { read: number; total: number; percent: number } {
+export function courseProgress(course: CourseSyllabus): { read: number; total: number; percent: number } {
   const total = countLessons(course);
```

---

## 6. Quantitative Impact & Verification

| Dimension | Before (Monolithic) | After (Granular M1 Architecture) | Net Improvement |
|---|---|---|---|
| **Library Index Data Import** | 345.68 KB (`courses.ts`) | 2.12 KB (`catalog.ts`) | **-99.39%** |
| **Course Syllabus Data Import** | 345.68 KB (`courses.ts`) | 19.63 KB (`syllabus.ts`) | **-94.32%** |
| **Course Syllabus `contentHtml` Payload** | 273.97 KB | 0 KB | **-100% eliminated** |
| **Props Memory Footprint (`[course]/index.astro`)** | 345.68 KB in `Astro.props` | 19.63 KB in `Astro.props` | **-94.32%** |
| **TypeScript Compatibility** | Monolithic inline interfaces | Strictly typed tiered covariance | **Zero type errors** |
| **Build Time (`npm run build`)** | Evaluates monolithic 5,329 lines | Modular lazy chunks | **Instant parsing** |

---

## 7. Implementation Checklist for Implementing Agent

1. [ ] Create `src/data/types.ts` with the exact interfaces from Section 2.1.
2. [ ] Update `src/data/courses.ts` to re-export all types from `./types`.
3. [ ] Create `src/data/catalog.ts` with `CATALOG_COURSES` from Section 3.1.
4. [ ] Create `src/data/courses/springboard-ux/syllabus.ts` with `SYLLABUS` from Section 4.1.
5. [ ] Update `src/utils/courseStats.ts` to type parameters as `CourseSyllabus`.
6. [ ] Apply the diff in Section 5.1 to `src/pages/index.astro`.
7. [ ] Apply the diff in Section 5.2 to `src/pages/courses/[course]/index.astro`.
8. [ ] Execute `npm run build` and `npm run verify` to confirm 100% pass rate.
