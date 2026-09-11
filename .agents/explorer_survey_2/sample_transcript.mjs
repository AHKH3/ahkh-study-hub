import fs from 'node:fs';

const transcripts = JSON.parse(fs.readFileSync('src/data/transcripts.json', 'utf8'));
const firstKey = Object.keys(transcripts)[0];
console.log('Sample key:', firstKey);
console.log('Sample data structure:', JSON.stringify(transcripts[firstKey], null, 2).slice(0, 350) + '...');
