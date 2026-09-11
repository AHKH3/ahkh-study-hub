import fs from 'node:fs';

// Let's test how fast a split data structure would be vs monolithic
const startMono = performance.now();
const monoContent = fs.readFileSync('src/data/courses.ts', 'utf8');
const endMono = performance.now();
console.log(`Reading monolithic courses.ts took ${(endMono - startMono).toFixed(2)}ms`);

// Simulate splitting into:
// 1. Catalog summary (for index.astro)
// 2. Syllabus (for [course]/index.astro)
// 3. Lessons (for [slug].astro)

// Let's inspect the types needed
console.log('TypeScript types verification...');
