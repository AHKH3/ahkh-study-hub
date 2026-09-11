const path = require('node:path');
const createJITI = require('jiti');

const jiti = createJITI(__filename);
const { COURSES } = jiti(path.resolve(__dirname, '../../src/data/courses.ts'));

const course = COURSES[0];

// 1. Catalog entry
const catalogEntry = {
  id: course.id,
  slug: course.slug,
  title: course.title,
  category: course.category,
  duration: course.duration,
  progressPercent: course.progressPercent,
  totalModules: course.modules.length,
  totalSources: course.modules.reduce((s, m) => s + m.lessons.length, 0),
  status: course.status,
  theme: course.theme,
  lessonSlugs: course.modules.flatMap(m => m.lessons.map(l => l.slug)),
};

const catalogStr = JSON.stringify([catalogEntry], null, 2);
console.log('--- Catalog Index Size ---');
console.log(`catalog.json size: ${catalogStr.length} bytes (${(catalogStr.length / 1024).toFixed(2)} KB)`);

// 2. Syllabus entry
const syllabusModules = course.modules.map(m => ({
  id: m.id,
  number: m.number,
  title: m.title,
  description: m.description,
  lessons: m.lessons.map(l => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    unitNumber: l.unitNumber,
    lessonNumber: l.lessonNumber,
    type: l.type,
    readTime: l.readTime,
    originalSourceLabel: l.originalSourceLabel,
  })),
}));

const syllabus = {
  id: course.id,
  slug: course.slug,
  title: course.title,
  subtitle: course.subtitle,
  description: course.description,
  category: course.category,
  updatedAt: course.updatedAt,
  duration: course.duration,
  progressPercent: course.progressPercent,
  status: course.status,
  theme: course.theme,
  modules: syllabusModules,
};

const syllabusStr = JSON.stringify(syllabus, null, 2);
console.log('\n--- Syllabus Size ---');
console.log(`syllabus.json size: ${syllabusStr.length} bytes (${(syllabusStr.length / 1024).toFixed(2)} KB)`);

// 3. Lessons breakdown
console.log('\n--- Lessons Size Breakdown ---');
let totalLessonBytes = 0;
const lessonSizes = [];
course.modules.forEach(m => {
  m.lessons.forEach(l => {
    const lessonData = {
      id: l.id,
      slug: l.slug,
      title: l.title,
      module: l.module,
      unitNumber: l.unitNumber,
      lessonNumber: l.lessonNumber,
      type: l.type,
      readTime: l.readTime,
      originalSourceUrl: l.originalSourceUrl,
      originalSourceLabel: l.originalSourceLabel,
      youtubeId: l.youtubeId,
      summaryQuote: l.summaryQuote,
      outline: l.outline,
      videoTimestamps: l.videoTimestamps,
      contentHtml: l.contentHtml,
    };
    const s = JSON.stringify(lessonData, null, 2);
    totalLessonBytes += s.length;
    lessonSizes.push({ slug: l.slug, bytes: s.length });
  });
});

console.log(`Total size of 37 lesson JSON files: ${totalLessonBytes} bytes (${(totalLessonBytes / 1024).toFixed(2)} KB)`);
console.log(`Average lesson file: ${(totalLessonBytes / 37 / 1024).toFixed(2)} KB`);
lessonSizes.sort((a, b) => b.bytes - a.bytes);
console.log(`Largest lesson file: ${lessonSizes[0].slug} = ${(lessonSizes[0].bytes / 1024).toFixed(2)} KB`);
console.log(`Smallest lesson file: ${lessonSizes[lessonSizes.length - 1].slug} = ${(lessonSizes[lessonSizes.length - 1].bytes / 1024).toFixed(2)} KB`);
