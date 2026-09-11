import fs from 'node:fs';

const slugAstro = fs.readFileSync('src/pages/courses/[course]/[slug].astro', 'utf8');

// Find all expressions using course.
const courseRefs = new Set();
for (const m of slugAstro.matchAll(/\bcourse\.([a-zA-Z0-9_]+)/g)) {
  courseRefs.add(m[1]);
}
console.log('course properties accessed in [slug].astro:');
console.log([...courseRefs]);

// Find all expressions using lesson.
const lessonRefs = new Set();
for (const m of slugAstro.matchAll(/\blesson\.([a-zA-Z0-9_]+)/g)) {
  lessonRefs.add(m[1]);
}
console.log('\nlesson properties accessed in [slug].astro:');
console.log([...lessonRefs]);

// Find all expressions using prevLesson.
const prevRefs = new Set();
for (const m of slugAstro.matchAll(/\bprevLesson\.([a-zA-Z0-9_]+)/g)) {
  prevRefs.add(m[1]);
}
console.log('\nprevLesson properties accessed in [slug].astro:');
console.log([...prevRefs]);

// Find all expressions using nextLesson.
const nextRefs = new Set();
for (const m of slugAstro.matchAll(/\bnextLesson\.([a-zA-Z0-9_]+)/g)) {
  nextRefs.add(m[1]);
}
console.log('\nnextLesson properties accessed in [slug].astro:');
console.log([...nextRefs]);
