import type {
  CourseCatalogSummary,
  CourseSyllabus,
  LessonDetail,
  TranscriptCue,
  VideoTranscript,
} from './types';
import { CATALOG_COURSES } from './catalog';

// Eagerly glob all syllabi (metadata only, ~16 KB per course)
const syllabusModules = import.meta.glob<{
  SYLLABUS: CourseSyllabus;
  default?: CourseSyllabus;
}>('./courses/*/syllabus.ts', { eager: true });

// Lazily glob all lesson modules on-demand
const lessonModules = import.meta.glob<{
  LESSON: LessonDetail;
  default?: LessonDetail;
}>('./courses/*/lessons/*.ts');

// Lazily glob all video transcript JSON files on-demand
const transcriptModules = import.meta.glob<VideoTranscript>('./transcripts/*.json', {
  import: 'default',
});

/**
 * Tier 1: Library Index Level Catalog (synchronous, ~2 KB)
 */
export function getCatalog(): CourseCatalogSummary[] {
  return CATALOG_COURSES;
}

/**
 * Tier 2: Single Course Syllabus (synchronous eager, ~16.8 KB)
 */
export function getSyllabus(courseSlug: string): CourseSyllabus | null {
  const key = `./courses/${courseSlug}/syllabus.ts`;
  const mod = syllabusModules[key];
  if (!mod) return null;
  return mod.SYLLABUS ?? mod.default ?? null;
}

/**
 * Tier 2: All Course Syllabi (synchronous eager)
 */
export function getAllSyllabi(): CourseSyllabus[] {
  return Object.values(syllabusModules)
    .map((mod) => mod.SYLLABUS ?? mod.default)
    .filter((s): s is CourseSyllabus => Boolean(s));
}

/**
 * Tier 3: Granular Lesson Reader Level (lazy on-demand Promise, ~8.8 KB)
 */
export async function getLesson(
  courseSlug: string,
  lessonSlug: string
): Promise<LessonDetail | null> {
  const key = `./courses/${courseSlug}/lessons/${lessonSlug}.ts`;
  const loader = lessonModules[key];
  if (!loader) {
    return null;
  }
  const mod = await loader();
  return mod.LESSON ?? mod.default ?? null;
}

/**
 * Loads the full transcript metadata and cues for a single video on demand.
 * Returns null if no transcript exists for this YouTube ID.
 */
export async function getVideoTranscript(youtubeId: string): Promise<VideoTranscript | null> {
  if (!youtubeId) return null;
  const key = `./transcripts/${youtubeId}.json`;
  const loader = transcriptModules[key];
  if (!loader) return null;
  const mod = await loader();
  return (mod as any)?.default ?? mod;
}

/**
 * Loads the timed transcript cue segments for a single video on demand.
 * Directly consumable by the reader template.
 */
export async function getTranscript(youtubeId: string): Promise<TranscriptCue[] | null> {
  const transcript = await getVideoTranscript(youtubeId);
  return transcript?.segments?.length ? transcript.segments : null;
}
