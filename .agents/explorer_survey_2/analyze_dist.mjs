import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const files = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.html') || full.endsWith('.js') || full.endsWith('.css')) files.push(full);
  }
}
walk(distDir);

console.log('--- Dist File Analysis ---');
let totalSize = 0;
let htmlSizes = [];
let jsSizes = [];
let cssSizes = [];

for (const f of files) {
  const size = fs.statSync(f).size;
  totalSize += size;
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (f.endsWith('.html')) htmlSizes.push({ path: rel, size });
  else if (f.endsWith('.js')) jsSizes.push({ path: rel, size });
  else if (f.endsWith('.css')) cssSizes.push({ path: rel, size });
}

console.log(`Total static output: ${(totalSize / 1024).toFixed(2)} KB across ${files.length} files\n`);

console.log('--- JavaScript Assets ---');
jsSizes.forEach(j => console.log(`  ${j.path}: ${(j.size / 1024).toFixed(2)} KB (${j.size} bytes)`));

console.log('\n--- CSS Assets ---');
cssSizes.forEach(c => console.log(`  ${c.path}: ${(c.size / 1024).toFixed(2)} KB (${c.size} bytes)`));

htmlSizes.sort((a, b) => b.size - a.size);
console.log('\n--- Top 10 Largest HTML Pages ---');
htmlSizes.slice(0, 10).forEach(h => console.log(`  ${h.path}: ${(h.size / 1024).toFixed(2)} KB (${h.size} bytes)`));

console.log('\n--- Key Summary Pages ---');
['index.html', 'manifesto/index.html', 'commonplace/index.html', 'courses/springboard-ux/index.html'].forEach(p => {
  const found = htmlSizes.find(h => h.path === p);
  if (found) console.log(`  ${found.path}: ${(found.size / 1024).toFixed(2)} KB (${found.size} bytes)`);
});

const lessonPages = htmlSizes.filter(h => h.path.startsWith('courses/springboard-ux/') && h.path !== 'courses/springboard-ux/index.html');
const totalLessonHtml = lessonPages.reduce((acc, l) => acc + l.size, 0);
console.log(`\nLesson pages count: ${lessonPages.length}`);
console.log(`Total lesson HTML size: ${(totalLessonHtml / 1024).toFixed(2)} KB`);
console.log(`Average lesson HTML size: ${(totalLessonHtml / lessonPages.length / 1024).toFixed(2)} KB`);
