import fs from 'node:fs';

const raw = fs.readFileSync('src/data/courses.ts', 'utf8');

// Measure contentHtml breakdown
const htmlRegex = /contentHtml:\s*`([\s\S]*?)`,\s*(?:videoTimestamps|outline|\})/g;
let totalHtmlLength = 0;
let lessonCount = 0;
const lessonSizes = [];

let match;
while ((match = htmlRegex.exec(raw)) !== null) {
  lessonCount++;
  const len = match[1].length;
  totalHtmlLength += len;
  lessonSizes.push(len);
}

console.log('Total file size:', raw.length, 'bytes');
console.log('Total contentHtml size across', lessonCount, 'lessons:', totalHtmlLength, 'bytes (', (totalHtmlLength / 1024).toFixed(2), 'KB)');
console.log('Percentage of courses.ts that is raw lesson contentHtml:', ((totalHtmlLength / raw.length) * 100).toFixed(1) + '%');
console.log('Average contentHtml per lesson:', (totalHtmlLength / lessonCount / 1024).toFixed(2), 'KB');
console.log('Max lesson contentHtml:', (Math.max(...lessonSizes) / 1024).toFixed(2), 'KB');
console.log('Min lesson contentHtml:', (Math.min(...lessonSizes) / 1024).toFixed(2), 'KB');

const nonHtmlBytes = raw.length - totalHtmlLength;
console.log('Non-contentHtml size (metadata + types + structural JS):', nonHtmlBytes, 'bytes (', (nonHtmlBytes / 1024).toFixed(2), 'KB)');
