// One-off repair: align syllabus.ts lesson entries with the authored lesson files.
// Canonical truth = src/data/courses/<course>/lessons/<slug>.ts (rendered pages +
// oEmbed-verified YouTube IDs). The syllabus had drifted (wrong types, readTimes,
// labels and rotated youtubeIds) while cards/nav render from the syllabus.
// Usage: node scripts/sync-syllabus-from-lessons.mjs [--check]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const courseDir = join(root, 'src/data/courses/springboard-ux');
const lessonsDir = join(courseDir, 'lessons');
const syllabusPath = join(courseDir, 'syllabus.ts');
const checkOnly = process.argv.includes('--check');

const FIELDS = ['title', 'type', 'readTime', 'originalSourceLabel', 'originalSourceUrl', 'youtubeId'];

function extractFields(src) {
  const out = {};
  for (const f of FIELDS) {
    const m = src.match(new RegExp(`^\\s*${f}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'm'));
    out[f] = m ? m[1] : null;
  }
  return out;
}

const files = {};
for (const name of readdirSync(lessonsDir).filter((n) => n.endsWith('.ts'))) {
  const src = readFileSync(join(lessonsDir, name), 'utf8');
  const slugM = src.match(/^\s*slug:\s*'([^']+)'/m);
  if (slugM) files[slugM[1]] = extractFields(src);
}

let syllabus = readFileSync(syllabusPath, 'utf8');
let changed = 0;
const problems = [];

// Split syllabus into per-lesson entry blocks by slug markers
for (const [slug, f] of Object.entries(files)) {
  const slugMarker = `slug: '${slug}'`;
  const start = syllabus.indexOf(slugMarker);
  if (start === -1) {
    problems.push(`syllabus missing entry for ${slug}`);
    continue;
  }
  // entry block: from previous '{' ... to next '},\n' after marker
  const blockStart = syllabus.lastIndexOf('{', start);
  let blockEnd = syllabus.indexOf('},', start);
  if (blockEnd === -1) { problems.push(`cannot find end of entry ${slug}`); continue; }
  blockEnd += 2;
  let block = syllabus.slice(blockStart, blockEnd);

  for (const field of FIELDS) {
    const want = f[field];
    const re = new RegExp(`(\\n\\s*${field}:\\s*')((?:[^'\\\\]|\\\\.)*)(',?)`);
    const m = block.match(re);
    if (want === null) {
      if (m) {
        if (!checkOnly) block = block.replace(re, '');
        changed++;
      }
      continue;
    }
    if (!m) {
      // insert youtubeId after originalSourceUrl line when missing
      if (field === 'youtubeId') {
        const anchor = block.match(/(\n\s*originalSourceUrl:\s*'[^']*')/);
        if (anchor) {
          if (!checkOnly) block = block.replace(anchor[0], `${anchor[0]},\n          youtubeId: '${want}'`);
          changed++;
        } else problems.push(`${slug}: no anchor to insert youtubeId`);
      } else problems.push(`${slug}: field ${field} missing in syllabus entry`);
      continue;
    }
    if (m[2] !== want) {
      if (!checkOnly) block = block.replace(re, `$1${want}$3`);
      changed++;
    }
  }
  if (!checkOnly) syllabus = syllabus.slice(0, blockStart) + block + syllabus.slice(blockEnd);
}

// check syllabus entries with no matching file
for (const m of syllabus.matchAll(/slug:\s*'([^']+)'/g)) {
  if (m[1] !== 'springboard-ux' && !files[m[1]]) problems.push(`file missing for syllabus slug ${m[1]}`);
}

if (checkOnly) {
  console.log(`CHECK: ${changed} field drift(s) found, ${problems.length} problem(s)`);
  for (const p of problems) console.log(' - ' + p);
  process.exit(changed || problems.length ? 1 : 0);
}
writeFileSync(syllabusPath, syllabus);
console.log(`SYNCED: ${changed} field(s) updated in syllabus.ts`);
for (const p of problems) console.log('PROBLEM: ' + p);
