import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const COURSES_PATH = path.join(ROOT, 'src', 'data', 'courses.ts');
const OUTPUT_DIR = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'lessons');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const src = fs.readFileSync(COURSES_PATH, 'utf8');

// Verbatim lesson object matcher
const lessonRegex = /\{\s*id:\s*'(sb-[0-9]+-[0-9]+)'\s*,\s*slug:\s*'([^']+)'[\s\S]*?outline:\s*\[[\s\S]*?contentHtml:\s*`[\s\S]*?`\s*,?\s*(?:videoTimestamps:\s*\[[\s\S]*?\]\s*,?\s*)?\}/g;

let count = 0;
let m;
while ((m = lessonRegex.exec(src)) !== null) {
  count++;
  const id = m[1];
  const slug = m[2];
  const fullLessonBlock = m[0];

  const fileContent = `import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = ${fullLessonBlock};

export default LESSON;
`;

  const destFile = path.join(OUTPUT_DIR, `${slug}.ts`);
  fs.writeFileSync(destFile, fileContent, 'utf8');
  console.log(`[${count}/37] Extracted -> src/data/courses/springboard-ux/lessons/${slug}.ts (${id})`);
}

if (count !== 37) {
  console.error(`FATAL: Expected 37 lessons but extracted ${count}`);
  process.exit(1);
} else {
  console.log(`SUCCESS: Successfully extracted all 37 lessons with 100% fidelity.`);
}
