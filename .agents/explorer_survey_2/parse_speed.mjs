import fs from 'node:fs';
import { performance } from 'node:perf_hooks';

console.log('Testing parsing speed of courses.ts...');
const content = fs.readFileSync('src/data/courses.ts', 'utf8');

const t0 = performance.now();
// Count tokens and inspect structure
let lines = content.split('\n');
const t1 = performance.now();

console.log(`Loaded and split ${lines.length} lines in ${(t1 - t0).toFixed(2)}ms`);
console.log(`Total memory size of string: ${(content.length / 1024).toFixed(2)} KB`);
