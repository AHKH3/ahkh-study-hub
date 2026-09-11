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
export interface LessonDetail extends LessonSummary {
  module: string;
  unitNumber: number;
  summaryQuote: string;
  outline: LessonOutlineItem[];
  contentHtml: string;
  videoTimestamps?: VideoTimestamp[];
}

/**
 * Backward-compatibility alias for LessonDetail.
 */
export type Lesson = LessonDetail;

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
export interface CourseShellToken {
  id: string;
  slug: string;
  title: string;
  theme: {
    accent: string;
    highlight: string;
    [key: string]: any;
  };
}

/**
 * Alias for CourseShellToken for backward/forward naming compatibility.
 */
export type CourseShellContext = CourseShellToken;

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
  kind: 'manual' | 'auto';
  segments: TranscriptCue[];
}
