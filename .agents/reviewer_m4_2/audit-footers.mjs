import fs from 'fs';
import path from 'path';

const ROOT = 'c:/Users/abdel/dev/ahkh-study-hub';
const distDir = path.join(ROOT, 'dist', 'courses', 'springboard-ux');

// 1. Audit dist HTML pages
const entries = fs.readdirSync(distDir, { withFileTypes: true });
const lessonDirs = entries.filter(e => e.isDirectory() && e.name !== 'index.html');

console.log('--- DIST AUDIT ---');
console.log('Total lesson directories found in dist:', lessonDirs.length);

let distPass = 0;
let distFail = 0;
const distIssues = [];

for (const dir of lessonDirs) {
  const slug = dir.name;
  const htmlPath = path.join(distDir, slug, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    distFail++;
    distIssues.push({ slug, reason: 'Missing index.html' });
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  const hasBorderT = html.includes('border-t');
  const hasArrow = html.includes('↗');
  const hasLink = /<a\b[^>]*href="https?:\/\/[^"]+"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/i.test(html);
  const hasCitationKicker = html.includes('Source Citation') || html.includes('Original Source') || html.includes('Source:');
  const hasTeal = /text-teal-700/.test(html);

  if (hasBorderT && hasArrow && hasLink && (hasCitationKicker || hasTeal)) {
    distPass++;
  } else {
    distFail++;
    distIssues.push({ slug, hasBorderT, hasArrow, hasLink, hasCitationKicker, hasTeal });
  }
}

console.log(`Dist Audit Result: ${distPass}/${lessonDirs.length} passed, ${distFail} failed.`);
if (distIssues.length > 0) {
  console.log('Dist Issues:', JSON.stringify(distIssues, null, 2));
}

// 2. Audit src/data/courses.ts
console.log('\n--- COURSES.TS AUDIT ---');
const coursesSrc = fs.readFileSync(path.join(ROOT, 'src', 'data', 'courses.ts'), 'utf8');

const lessonMatches = [...coursesSrc.matchAll(/id:\s*'(sb-[0-9]+-[0-9]+)',\s*slug:\s*'([^']+)'[\s\S]*?contentHtml:\s*`([\s\S]*?)`,/g)];
console.log('Total lessons matched in courses.ts:', lessonMatches.length);

let coursesPass = 0;
let coursesFail = 0;
const coursesIssues = [];

for (const m of lessonMatches) {
  const id = m[1];
  const slug = m[2];
  const contentHtml = m[3];

  const hasFooter = contentHtml.includes('mt-16 pt-8 border-t');
  const hasArrow = contentHtml.includes('↗');
  const hasLink = /<a\b[^>]*href="https?:\/\/[^"]+"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/i.test(contentHtml);
  const hasKicker = /Source Citation|Original Source/.test(contentHtml);
  const hasTeal = /text-teal-700/.test(contentHtml);

  if (hasFooter && hasArrow && hasLink && hasKicker && hasTeal) {
    coursesPass++;
  } else {
    coursesFail++;
    coursesIssues.push({ id, slug, hasFooter, hasArrow, hasLink, hasKicker, hasTeal });
  }
}

console.log(`Courses.ts Audit Result: ${coursesPass}/${lessonMatches.length} passed, ${coursesFail} failed.`);
if (coursesIssues.length > 0) {
  console.log('Courses.ts Issues:', JSON.stringify(coursesIssues, null, 2));
}

// 3. Audit src/data/courses/springboard-ux/lessons/*.ts
console.log('\n--- INDIVIDUAL LESSON FILES AUDIT ---');
const lessonsDir = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'lessons');
const lessonTsFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts'));
console.log('Total lesson TS files found:', lessonTsFiles.length);

let tsPass = 0;
let tsFail = 0;
const tsIssues = [];

for (const file of lessonTsFiles) {
  const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
  const hasFooter = content.includes('mt-16 pt-8 border-t');
  const hasArrow = content.includes('↗');
  const hasLink = /<a\b[^>]*href="https?:\/\/[^"]+"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/i.test(content);
  const hasKicker = /Source Citation|Original Source/.test(content);
  const hasTeal = /text-teal-700/.test(content);

  if (hasFooter && hasArrow && hasLink && hasKicker && hasTeal) {
    tsPass++;
  } else {
    tsFail++;
    tsIssues.push({ file, hasFooter, hasArrow, hasLink, hasKicker, hasTeal });
  }
}

console.log(`Lesson TS Files Audit Result: ${tsPass}/${lessonTsFiles.length} passed, ${tsFail} failed.`);
if (tsIssues.length > 0) {
  console.log('TS Issues:', JSON.stringify(tsIssues, null, 2));
}
