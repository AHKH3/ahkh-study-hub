import fs from 'node:fs';

const coursesCode = fs.readFileSync('src/data/courses.ts', 'utf8');

// Let's parse courses.ts by evaluating it or analyzing its structure
// Since courses.ts imports `path` from '../utils/paths', let's check paths.ts
const pathsCode = fs.readFileSync('src/utils/paths.ts', 'utf8');
console.log('paths.ts:', pathsCode.trim());
