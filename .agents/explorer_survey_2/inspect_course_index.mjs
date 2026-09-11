import fs from 'node:fs';

const html = fs.readFileSync('dist/courses/springboard-ux/index.html', 'utf8');

console.log('Total file length:', html.length);

const mIdx = html.indexOf('class="space-y-6"');
console.log('modules container start:', mIdx);
const mEnd = html.indexOf('</main>', mIdx);
console.log('modules container end:', mEnd);
console.log('modules container length:', mEnd - mIdx);

// Look at inline scripts
const sIdx = html.indexOf('<script is:inline>');
if (sIdx !== -1) {
  console.log('inline script length:', html.length - sIdx);
}
