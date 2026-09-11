import fs from 'node:fs';

const lines = fs.readFileSync('src/pages/courses/[course]/[slug].astro', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('course.modules')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
