import fs from 'node:fs';

const courseIndexAstro = fs.readFileSync('src/pages/courses/[course]/index.astro', 'utf8');

const courseRefs = new Set();
for (const m of courseIndexAstro.matchAll(/\bcourse\.([a-zA-Z0-9_]+)/g)) {
  courseRefs.add(m[1]);
}
console.log('course properties accessed in [course]/index.astro:');
console.log([...courseRefs]);

const modRefs = new Set();
for (const m of courseIndexAstro.matchAll(/\bmod\.([a-zA-Z0-9_]+)/g)) {
  modRefs.add(m[1]);
}
console.log('\nmod properties accessed in [course]/index.astro:');
console.log([...modRefs]);

const lessonRefs = new Set();
for (const m of courseIndexAstro.matchAll(/\blesson\.([a-zA-Z0-9_]+)/g)) {
  lessonRefs.add(m[1]);
}
console.log('\nlesson properties accessed in [course]/index.astro:');
console.log([...lessonRefs]);
