# Handoff Report: Milestone 1 Data Splitting (Tier 1 & Tier 2 Contracts)

**Author:** teamwork_preview_explorer (Milestone 1 Exploration Agent)  
**Recipient:** Orchestrator / Implementer Agent  
**Date:** 2026-09-11  
**Scope:** Milestone 1: Data Splitting (Tier 1 Catalog, Tier 2 Syllabus, Type System, Page Route Consumers)

---

## 1. Observation

1. **Monolithic Dataset Metrics:**
   - File path: `c:\Users\abdel\dev\ahkh-study-hub\src\data\courses.ts`
   - Total size: 345,565 bytes (337.47 KB) across 5,329 lines of TypeScript.
   - Raw HTML weight: `contentHtml` across 37 lessons accounts for 273,967 bytes (267.55 KB) or 79.28% of the file.
   - Non-HTML metadata and module structure accounts for only 71,598 bytes (69.92 KB).

2. **Route 1 Data Consumption (`src/pages/index.astro`):**
   - Line 4: `import { COURSES, type CourseStatus } from '../data/courses';`
   - Properties accessed:
     - `course.id` (line 53)
     - `course.slug` (line 54)
     - `course.category` (line 65)
     - `course.title` (line 70)
     - `course.status` (line 51)
     - `course.modules.length` (line 81)
     - `countLessons(course)` (line 83)
     - `course.duration` (line 87)
     - `course.progressPercent` (line 101, 104)
     - `course.modules.flatMap((m) => m.lessons.map((l) => l.slug)).join(',')` (line 53)
   - Zero bytes of `contentHtml`, `outline`, `summaryQuote`, `videoTimestamps`, or `originalSourceUrl` are rendered.
   - Total payload needed: ~2.1 KB out of 345.68 KB (99.4% unused).

3. **Route 2 Data Consumption (`src/pages/courses/[course]/index.astro`):**
   - Line 4: `import { COURSES } from '../../../data/courses';`
   - Lines 9–14:
     ```ts
     export function getStaticPaths() {
       return COURSES.map((course) => ({
         params: { course: course.slug },
         props: { course },
       }));
     }
     ```
   - Properties accessed:
     - Course level: `id`, `slug`, `title`, `description`, `category`, `duration`, `progressPercent`, `status`.
     - Module level: `mod.id`, `mod.number`, `mod.title`, `mod.lessons.length`.
     - Lesson level: `lesson.slug`, `lesson.title`, `lesson.type`, `lesson.readTime`, `lesson.originalSourceLabel`.
   - Zero bytes of `contentHtml`, `outline`, `summaryQuote`, or `videoTimestamps` are accessed or rendered.
   - Entire 345.68 KB course object (including all 267.55 KB of `contentHtml`) is currently passed into `Astro.props.course`.

4. **Utility Consumption (`src/utils/courseStats.ts`):**
   - Line 1: `import type { Course } from '../data/courses';`
   - Line 4: `countLessons(course: Course): number` only accesses `course.modules` and `mod.lessons.length`.
   - Line 8: `studyMinutes(course: Course): number` only accesses `mod.lessons[].readTime`.
   - Line 94: `courseProgress(course: Course)` only accesses `course.id` and `lesson.slug`.
   - Neither function requires `contentHtml`.

5. **Build & Verification Baseline:**
   - Command: `npm run build`
   - Verbatim result:
     ```
     [build] ✓ Completed in 3.53s.
     [build] 42 page(s) built in 3.71s
     [build] Complete!
     ```
   - Command: `npm run verify`
   - Verbatim result:
     ```
     FINAL: all syntax checks passed
     Pages audited: 42
     Link errors: 0; Emoji violations: 0; Double slash violations: 0;
     High-contrast violations: 0; Hover motion violations: 0;
     SUCCESS: All generated pages comply 100% with constitutional standards!
     ```

---

## 2. Logic Chain

1. **Step 1: Over-fetching Root Cause**  
   From Observation 1 & 2, `src/pages/index.astro` imports `courses.ts` which forces Node/Vite to parse 345.68 KB of text, of which 267.55 KB is HTML that `index.astro` never uses. Extracting the required 10 properties into `src/data/catalog.ts` (`CATALOG_COURSES: CourseCatalogSummary[]`) reduces data parsed on the index route to 2.12 KB, eliminating 99.4% of evaluated data.

2. **Step 2: Progress Attribute Compatibility in Library Index**  
   From Observation 2, `index.astro` sets `data-lessons={course.modules.flatMap((m) => m.lessons.map((l) => l.slug)).join(',')}` for the client-side `refreshLibraryProgress()` script. By pre-computing `lessonSlugs: string[]` inside `CourseCatalogSummary`, `index.astro` sets `data-lessons={course.lessonSlugs.join(',')}`, which produces identical HTML output and avoids traversing modules and lessons.

3. **Step 3: Syllabus Route Props Optimization**  
   From Observation 3, `courses/[course]/index.astro` only needs module hierarchy, lesson titles, types, durations, and source labels. Extracting `SYLLABUS: CourseSyllabus` in `src/data/courses/springboard-ux/syllabus.ts` provides all 8 units and 37 lessons in 19.63 KB (a 94.3% reduction from 345.68 KB) with 0 bytes of `contentHtml`.

4. **Step 4: Type Covariance & Non-Breaking Evolution**  
   From Observation 4, `courseStats.ts` accepts `Course`. If `Lesson extends LessonSummary`, TypeScript's array covariance ensures that `Module<Lesson>[]` is assignable to `Module<LessonSummary>[]`, and `Course` satisfies `CourseSyllabus`. Updating `courseStats.ts` parameter types from `Course` to `CourseSyllabus` allows both monolithic courses and granular syllabi to be processed without compile errors.

5. **Step 5: Dynamic Route Scalability**  
   Using Vite's native `import.meta.glob<{ SYLLABUS: CourseSyllabus }>('../../../data/courses/*/syllabus.ts', { eager: true })` inside `getStaticPaths` in `src/pages/courses/[course]/index.astro` allows any number of courses to be automatically discovered without manual route mapping.

---

## 3. Caveats

1. **Milestone 1 Scope Boundary:**  
   This investigation addresses Tier 1 (`catalog.ts`) and Tier 2 (`syllabus.ts`). Tier 3 (`lessons/<slug>.ts`) and individual transcript JSON splitting are designated for subsequent tasks or sub-tasks of Milestone 1. However, the interfaces in `src/data/types.ts` are fully designed to support Tier 3 (`Lesson` and `LessonDetail`).
2. **Re-exporting Legacy Types:**  
   To prevent build breakages if any file still imports `from '../data/courses'`, `src/data/courses.ts` must re-export all types from `src/data/types.ts`.
3. **Hardcoded `totalSources` vs `countLessons`:**  
   In `courses.ts`, `totalSources` was hardcoded to 60, but the index card rendered `countLessons(course)` which evaluated to 37. In `catalog.ts`, `totalSources` is set to 37 to match the actual number of lessons rendered.

---

## 4. Conclusion

1. Implement `src/data/types.ts` as the single authoritative source of truth for `CourseCatalogSummary`, `CourseSyllabus`, `LessonSummary`, `ModuleSummary`, `Course`, and `Lesson`.
2. Implement `src/data/catalog.ts` exporting `CATALOG_COURSES: CourseCatalogSummary[]` (2.12 KB).
3. Implement `src/data/courses/springboard-ux/syllabus.ts` exporting `SYLLABUS: CourseSyllabus` (19.63 KB).
4. Update `src/pages/index.astro` to import `CATALOG_COURSES` and render `{course.totalModules}`, `{course.totalSources}`, and `course.lessonSlugs.join(',')`.
5. Update `src/pages/courses/[course]/index.astro` to discover syllabi via `import.meta.glob` and pass `CourseSyllabus` in `Astro.props`.
6. Update `src/utils/courseStats.ts` to accept `CourseSyllabus`.

Detailed file implementations and exact unified diffs are authored in `c:\Users\abdel\dev\ahkh-study-hub\.agents\explorer_m1_1\report.md`.

---

## 5. Verification Method

1. **Type Checking & Static Build:**
   ```bash
   npm run build
   ```
   *Expected:* Builds 42 pages in ~3.5s with zero TypeScript compilation errors.
2. **Constitutional Standards & DOM Audit:**
   ```bash
   npm run verify
   ```
   *Expected:* 0 link errors, 0 emoji violations, 0 double-slash violations, 0 high-contrast violations, 0 hover motion violations.
3. **Inspect Output HTML for Exact Attribute Fidelity:**
   Inspect `dist/index.html` and `dist/courses/springboard-ux/index.html` to confirm that `data-lessons`, `data-course-id`, unit headings, lesson titles, and duration metrics match the pre-migration output with 100% precision.
4. **Invalidation Conditions:**
   - Any TypeScript compile error in `index.astro`, `[course]/index.astro`, or `courseStats.ts`.
   - Any difference in rendered lesson slugs or unit numbers.
   - Any lingering `contentHtml` strings inside `catalog.ts` or `syllabus.ts`.
