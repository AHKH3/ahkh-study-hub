import fs from 'fs';
import path from 'path';

const ROOT = 'c:/Users/abdel/dev/ahkh-study-hub';
const lessonsDir = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'lessons');

const filesToCheck = [
  'the-anatomy-of-product-experience.ts',
  'the-eight-step-ux-process.ts',
  'ux-vs-ui-deliverables-and-planes.ts',
  'design-thinking-process-and-mindsets.ts',
  'user-research-methods-and-interviews.ts',
  'ten-usability-heuristics-with-severity-matrix.ts',
  'the-art-of-ux-sketching.ts',
  'interactive-prototyping-in-figma.ts'
];

for (const f of filesToCheck) {
  const content = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
  // Find the last 1500 characters before `</section>` or end of contentHtml
  const footerIdx = content.lastIndexOf('border-t');
  console.log(`\n=== FILE: ${f} ===`);
  if (footerIdx === -1) {
    console.log('NO border-t found!');
  } else {
    const snippet = content.slice(footerIdx - 20, Math.min(content.length, footerIdx + 800));
    console.log(snippet.slice(0, 500));
  }
}
