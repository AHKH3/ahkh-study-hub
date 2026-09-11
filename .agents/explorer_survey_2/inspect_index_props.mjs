import fs from 'node:fs';

const indexAstro = fs.readFileSync('src/pages/index.astro', 'utf8');

const courseRefs = new Set();
for (const m of indexAstro.matchAll(/\bcourse\.([a-zA-Z0-9_]+)/g)) {
  courseRefs.add(m[1]);
}
console.log('course properties accessed in index.astro:');
console.log([...courseRefs]);

const modRefs = new Set();
for (const m of indexAstro.matchAll(/\bm\.([a-zA-Z0-9_]+)/g)) {
  modRefs.add(m[1]);
}
console.log('\nmod properties accessed in index.astro:');
console.log([...modRefs]);

const lessonRefs = new Set();
for (const m of indexAstro.matchAll(/\bl\.([a-zA-Z0-9_]+)/g)) {
  lessonRefs.add(m[1]);
}
console.log('\nlesson properties accessed in index.astro:');
console.log([...lessonRefs]);
