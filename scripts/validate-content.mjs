// Constitutional content gate: syllabus entries must match authored lesson files.
// Fails the build on any drift (type/readTime/label/url/youtubeId/title),
// duplicate youtubeIds, missing transcript JSON, or catalog slug mismatch.
// Usage: node scripts/validate-content.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FIELDS = ['title', 'type', 'readTime', 'originalSourceLabel', 'originalSourceUrl', 'youtubeId'];
let errors = 0;
const fail = (msg) => { errors++; console.error('CONTENT-DRIFT: ' + msg); };

function extractFields(src) {
  const out = {};
  for (const f of FIELDS) {
    const m = src.match(new RegExp(`^\\s*${f}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'm'));
    out[f] = m ? m[1] : null;
  }
  return out;
}

const coursesDir = join(root, 'src/data/courses');
for (const course of readdirSync(coursesDir)) {
  const syllabusPath = join(coursesDir, course, 'syllabus.ts');
  const lessonsDir = join(coursesDir, course, 'lessons');
  if (!existsSync(syllabusPath) || !existsSync(lessonsDir)) continue;

  const files = {};
  for (const name of readdirSync(lessonsDir).filter((n) => n.endsWith('.ts'))) {
    const src = readFileSync(join(lessonsDir, name), 'utf8');
    const slugM = src.match(/^\s*slug:\s*'([^']+)'/m);
    if (slugM) files[slugM[1]] = extractFields(src);
  }

  const syllabus = readFileSync(syllabusPath, 'utf8');
  const seenYt = new Map();
  for (const m of syllabus.matchAll(/slug:\s*'([^']+)'/g)) {
    const slug = m[1];
    if (slug === course) continue;
    const f = files[slug];
    if (!f) { fail(`${course}/${slug}: syllabus entry has no lesson file`); continue; }
    const start = syllabus.indexOf(`slug: '${slug}'`);
    const blockStart = syllabus.lastIndexOf('{', start);
    let blockEnd = syllabus.indexOf('},', start);
    if (blockEnd === -1) { fail(`${course}/${slug}: cannot parse syllabus entry`); continue; }
    const block = syllabus.slice(blockStart, blockEnd + 2);
    for (const field of FIELDS) {
      const em = block.match(new RegExp(`\\n\\s*${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
      const entryVal = em ? em[1] : null;
      if (entryVal !== f[field]) {
        fail(`${course}/${slug}: ${field} diverges (syllabus=${JSON.stringify(entryVal)} file=${JSON.stringify(f[field])})`);
      }
    }
    const yt = f.youtubeId;
    if (yt) {
      if (seenYt.has(yt)) fail(`${course}/${slug}: duplicate youtubeId ${yt} (also ${seenYt.get(yt)})`);
      else seenYt.set(yt, slug);
      if (!existsSync(join(root, 'src/data/transcripts', `${yt}.json`))) {
        fail(`${course}/${slug}: missing transcript src/data/transcripts/${yt}.json`);
      }
    }
  }
  for (const slug of Object.keys(files)) {
    if (!syllabus.includes(`slug: '${slug}'`)) fail(`${course}/${slug}: lesson file has no syllabus entry`);
  }
}

// catalog slugs must cover every lesson file
const catalog = readFileSync(join(root, 'src/data/catalog.ts'), 'utf8');
for (const course of readdirSync(coursesDir)) {
  const lessonsDir = join(coursesDir, course, 'lessons');
  if (!existsSync(lessonsDir)) continue;
  for (const name of readdirSync(lessonsDir).filter((n) => n.endsWith('.ts'))) {
    const src = readFileSync(join(lessonsDir, name), 'utf8');
    const slugM = src.match(/^\s*slug:\s*'([^']+)'/m);
    if (slugM && !catalog.includes(`'${slugM[1]}'`)) fail(`catalog missing lesson slug ${slugM[1]}`);
  }
}

if (errors) {
  console.error(`VALIDATE-CONTENT: ${errors} error(s) — run node scripts/sync-syllabus-from-lessons.mjs to repair, then review the diff.`);
  process.exit(1);
}
console.log('VALIDATE-CONTENT: syllabus, lessons, transcripts and catalog are consistent.');
