import fs from 'node:fs';

const html = fs.readFileSync('dist/courses/springboard-ux/how-do-you-break-into-ux-design/index.html', 'utf8');

console.log('Total file length:', html.length);

// Look for transcript-view
const tIdx = html.indexOf('id="transcript-view"');
console.log('transcript-view start:', tIdx);
if (tIdx !== -1) {
  const tEnd = html.indexOf('<footer', tIdx);
  console.log('transcript-view end:', tEnd);
  console.log('transcript-view length:', tEnd - tIdx);
}

// Look for formatted-view
const fIdx = html.indexOf('id="formatted-view"');
console.log('formatted-view start:', fIdx);
if (fIdx !== -1) {
  const fEnd = html.indexOf('id="transcript-view"', fIdx);
  console.log('formatted-view end:', fEnd);
  console.log('formatted-view length:', fEnd - fIdx);
}

// Look for left-sidebar
const lIdx = html.indexOf('id="left-sidebar"');
if (lIdx !== -1) {
  const lEnd = html.indexOf('id="center-reading-column"', lIdx);
  console.log('left-sidebar length:', lEnd - lIdx);
}

// Look for header
const hIdx = html.indexOf('id="smart-header"');
if (hIdx !== -1) {
  const hEnd = html.indexOf('id="display-settings-menu"', hIdx);
  console.log('smart-header length:', hEnd - hIdx);
}

// Look for display-settings-menu
const dIdx = html.indexOf('id="display-settings-menu"');
if (dIdx !== -1) {
  const dEnd = html.indexOf('id="sidebar-backdrop"', dIdx);
  console.log('display-settings-menu length:', dEnd - dIdx);
}

// Look for right-sidebar
const rIdx = html.indexOf('id="right-sidebar"');
if (rIdx !== -1) {
  const rEnd = html.indexOf('id="selection-popover"', rIdx);
  console.log('right-sidebar length:', rEnd - rIdx);
}

// Look for selection-popover to end of body
const pIdx = html.indexOf('id="selection-popover"');
if (pIdx !== -1) {
  console.log('popovers and modals length:', html.length - pIdx);
}
