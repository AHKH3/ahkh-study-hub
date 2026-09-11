import fs from 'node:fs';

const transcripts = JSON.parse(fs.readFileSync('src/data/transcripts.json', 'utf8'));

console.log('--- Transcripts Breakdown ---');
const entries = [];
for (const [id, data] of Object.entries(transcripts)) {
  const jsonStr = JSON.stringify(data);
  const segments = data.segments || [];
  entries.push({ id, bytes: jsonStr.length, segments: segments.length });
}

entries.sort((a, b) => b.bytes - a.bytes);
entries.forEach(e => {
  console.log(`  YouTube ID ${e.id}: ${e.segments} cues, ${(e.bytes / 1024).toFixed(2)} KB in JSON`);
});

// Now match with lesson titles in courses.ts
const courses = fs.readFileSync('src/data/courses.ts', 'utf8');
entries.forEach(e => {
  const reg = new RegExp(`youtubeId:\\s*['"]${e.id}['"][\\s\\S]*?title:\\s*['"]([^'"]+)['"]`);
  // Or slug before youtubeId
  const reg2 = new RegExp(`slug:\\s*['"]([^'"]+)['"][\\s\\S]*?youtubeId:\\s*['"]${e.id}['"]`);
  const m = reg2.exec(courses);
  console.log(`    -> Lesson slug: ${m ? m[1] : 'unknown'}`);
});
