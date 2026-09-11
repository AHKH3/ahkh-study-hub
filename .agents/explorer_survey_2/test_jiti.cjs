const path = require('node:path');
const createJITI = require('jiti');

const jiti = createJITI(__filename);
const { COURSES } = jiti(path.resolve(__dirname, '../../src/data/courses.ts'));

console.log('Successfully loaded courses via jiti!');
console.log('Courses count:', COURSES.length);
const c = COURSES[0];
console.log('Course 1:', c.id, c.title);
console.log('Total modules:', c.modules.length);
const totalLessons = c.modules.reduce((s, m) => s + m.lessons.length, 0);
console.log('Total lessons:', totalLessons);

// Verify that every lesson has expected fields
let missingHtml = 0;
c.modules.forEach(m => {
  m.lessons.forEach(l => {
    if (!l.contentHtml) missingHtml++;
  });
});
console.log('Missing HTML count:', missingHtml);
