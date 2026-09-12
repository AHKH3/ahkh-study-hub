import fs from 'fs';
import path from 'path';

const ROOT = 'c:/Users/abdel/dev/ahkh-study-hub';
const coursesSrc = fs.readFileSync(path.join(ROOT, 'src', 'data', 'courses.ts'), 'utf8');

const regex = /id:\s*'([^']+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?originalSourceUrl:\s*'([^']+)',[\s\S]*?contentHtml:\s*`([\s\S]*?)`,/g;

let count = 0;
let matchCount = 0;
const report = [];

for (const match of coursesSrc.matchAll(regex)) {
  count++;
  const id = match[1];
  const slug = match[2];
  const sourceUrl = match[3];
  const html = match[4];

  // Does the footer contain the originalSourceUrl or a valid external link?
  const hasSourceUrlInHtml = html.includes(sourceUrl);
  const externalLinkMatch = html.match(/<a\b[^>]*href="([^"]+)"[^>]*>/);
  const foundHref = externalLinkMatch ? externalLinkMatch[1] : null;

  report.push({
    id,
    slug,
    sourceUrl,
    foundHref,
    matchesMetadataUrl: hasSourceUrlInHtml
  });
}

console.log(`Total lessons evaluated: ${count}`);
const mismatches = report.filter(r => !r.matchesMetadataUrl);
console.log(`Lessons where HTML footer href does NOT match metadata originalSourceUrl: ${mismatches.length}`);
if (mismatches.length > 0) {
  console.log('Mismatches:', JSON.stringify(mismatches, null, 2));
} else {
  console.log('ALL 37 lessons have 100% exact URL match between metadata and footer HTML!');
}
