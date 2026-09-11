// Let's test dynamic import speed in Node
import fs from 'node:fs';

console.log('Testing modular loading...');
// In Node.js / Vite, dynamic imports are asynchronous:
// const lesson = await import(`./lessons/springboard-ux/${slug}.js`);
// Or using a lookup map:
// const lessonLoaders = {
//   'the-anatomy-of-product-experience': () => import('./lessons/...'),
// };
