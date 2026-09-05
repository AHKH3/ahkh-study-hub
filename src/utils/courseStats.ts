import type { Course } from '../data/courses';

export function countLessons(course: Course): number {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}

export function studyMinutes(course: Course): number {
  return course.modules.reduce(
    (sum, mod) =>
      sum +
      mod.lessons.reduce((lessonSum, lesson) => {
        const match = /(\d+)/.exec(lesson.readTime);
        return lessonSum + (match ? parseInt(match[1], 10) : 0);
      }, 0),
    0
  );
}

export function formatDuration(totalMin: number): string {
  if (totalMin >= 60) {
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h} hrs${m ? ` ${m} min` : ''}`;
  }
  return `${totalMin} min`;
}

export type LessonState = 'new' | 'explored' | 'reading' | 'completed';

export interface LessonScrollData {
  percent: number;
  scrollY: number;
  updatedAt: string;
}

export function openedKey(courseId: string, lessonSlug: string): string {
  return `ahkh_opened_${courseId}_${lessonSlug}`;
}

export function readingKey(courseId: string, lessonSlug: string): string {
  return `ahkh_reading_${courseId}_${lessonSlug}`;
}

export function readKey(courseId: string, lessonSlug: string): string {
  return `ahkh_read_${courseId}_${lessonSlug}`;
}

export function scrollKey(courseId: string, lessonSlug: string): string {
  return `ahkh_scroll_${courseId}_${lessonSlug}`;
}

export const LESSON_STATE_META: Record<LessonState, {
  label: string;
  textClass: string;
  dotClass: string;
  bgLineClass: string;
}> = {
  new: {
    label: 'New',
    textClass: 'text-blue-700 dark:text-blue-400',
    dotClass: 'bg-blue-600 dark:bg-blue-400',
    bgLineClass: 'bg-blue-600 dark:bg-blue-400',
  },
  explored: {
    label: 'Exploring',
    textClass: 'text-purple-700 dark:text-purple-400',
    dotClass: 'bg-purple-600 dark:bg-purple-400',
    bgLineClass: 'bg-purple-600 dark:bg-purple-400',
  },
  reading: {
    label: 'Reading',
    textClass: 'text-amber-700 dark:text-amber-400',
    dotClass: 'bg-amber-600 dark:bg-amber-400',
    bgLineClass: 'bg-amber-600 dark:bg-amber-400',
  },
  completed: {
    label: 'Completed',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    dotClass: 'bg-emerald-600 dark:bg-emerald-400',
    bgLineClass: 'bg-emerald-600 dark:bg-emerald-400',
  },
};

export function getLessonState(courseId: string, lessonSlug: string): LessonState {
  if (typeof localStorage === 'undefined') return 'new';
  try {
    if (localStorage.getItem(readKey(courseId, lessonSlug)) !== null) return 'completed';
    if (localStorage.getItem(readingKey(courseId, lessonSlug)) !== null) return 'reading';
    if (localStorage.getItem(openedKey(courseId, lessonSlug)) !== null) return 'explored';
  } catch (e) {}
  return 'new';
}

export function courseProgress(course: Course): { read: number; total: number; percent: number } {
  const total = countLessons(course);
  if (typeof localStorage === 'undefined') {
    return { read: 0, total, percent: 0 };
  }
  let read = 0;
  try {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (localStorage.getItem(readKey(course.id, lesson.slug)) !== null) {
          read += 1;
        }
      }
    }
  } catch (e) {}
  const percent = total ? Math.round((read / total) * 100) : 0;
  return { read, total, percent };
}
