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

export function readKey(courseId: string, lessonSlug: string): string {
  return `ahkh_read_${courseId}_${lessonSlug}`;
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
