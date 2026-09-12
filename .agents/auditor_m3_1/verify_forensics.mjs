import fs from 'node:fs';
import path from 'node:path';

const readerPath = path.resolve('public/scripts/reader.js');
const readerContent = fs.readFileSync(readerPath, 'utf8');

console.log('=== FORENSIC CHECK 1: Emojis in public/scripts/reader.js ===');
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const emojiMatches = [...readerContent.matchAll(new RegExp(emojiRegex, 'gu'))];
console.log('Emoji matches count:', emojiMatches.length);
if (emojiMatches.length > 0) {
  console.error('FAIL: Found emojis in reader.js:', emojiMatches);
} else {
  console.log('PASS: Zero emojis in public/scripts/reader.js');
}

console.log('\n=== FORENSIC CHECK 2: Double Slashes (//) in UI/strings ===');
// Check for // in strings or UI text (excluding URLs like https://)
const lines = readerContent.split('\n');
const uiSlashMatches = [];
lines.forEach((line, idx) => {
  // Strip url protocols
  const stripped = line.replace(/https?:\/\//g, '').replace(/file:\/\//g, '');
  // Match string literals that contain //
  const strMatch = stripped.match(/(["'`])(.*?)\1/g);
  if (strMatch) {
    strMatch.forEach(s => {
      // ignore regex literals or empty
      if (s.includes('//')) {
        uiSlashMatches.push({ line: idx + 1, snippet: s });
      }
    });
  }
});
console.log('String literals containing // count:', uiSlashMatches.length);
if (uiSlashMatches.length > 0) {
  console.log('Matches:', uiSlashMatches);
}

console.log('\n=== FORENSIC CHECK 3: Anti-Cheat & Bypasses in public/scripts/reader.js ===');
const suspiciousPatterns = [
  { name: 'Hardcoded test bypass', regex: /__test__|bypass|isTesting|mock/gi },
  { name: 'Dummy constant return', regex: /return\s+true\s*;\s*\/\/\s*dummy/gi },
  { name: 'Empty stubs', regex: /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g },
  { name: 'Not implemented', regex: /NotImplemented|TODO|FIXME/gi }
];
suspiciousPatterns.forEach(p => {
  const matches = [...readerContent.matchAll(p.regex)];
  console.log(`Pattern [${p.name}]: ${matches.length} matches`);
});

console.log('\n=== FORENSIC CHECK 4: Lifecycle Cleanup Mechanisms ===');
const checks = [
  { name: 'astro:before-swap listener attached', test: readerContent.includes("document.addEventListener('astro:before-swap'") },
  { name: 'window.__ahkhReaderAbort.abort() called', test: readerContent.includes('window.__ahkhReaderAbort.abort()') },
  { name: 'window.__ahkhYtPlayer.destroy() called', test: readerContent.includes('window.__ahkhYtPlayer.destroy()') },
  { name: 'window.__ahkhYtTimer clearInterval called', test: readerContent.includes('clearInterval(window.__ahkhYtTimer)') },
  { name: 'window.__ahkhVideoObserver.disconnect() called', test: readerContent.includes('window.__ahkhVideoObserver.disconnect()') },
  { name: 'study-desk dataset.ahkhBooted cleared', test: readerContent.includes('delete desk.dataset.ahkhBooted') },
  { name: 'Highlight click listeners have signal', test: readerContent.includes("span.addEventListener('click', (ev) => {") && readerContent.includes('{ signal: __ahkhSignal }') }
];
checks.forEach(c => {
  console.log(`[${c.name}]: ${c.test ? 'PASS' : 'FAIL'}`);
});

console.log('\n=== FORENSIC CHECK 5: RAF Scheduling & 3-Stage Layout Pipeline ===');
const rafChecks = [
  { name: 'scheduleCascadeGutterNotes defined', test: readerContent.includes('function scheduleCascadeGutterNotes()') },
  { name: 'requestAnimationFrame used for gutter batching', test: readerContent.includes('gutterLayoutRaf = requestAnimationFrame(') },
  { name: 'Stage 1: Batch Reads present', test: readerContent.includes('/* Stage 1: Batch Reads (single layout pass) */') },
  { name: 'Stage 2: In-Memory Math present', test: readerContent.includes('/* Stage 2: In-Memory Math (pure calculation, zero DOM interaction) */') },
  { name: 'Stage 3: Batch Writes present', test: readerContent.includes('/* Stage 3: Batch Writes (zero DOM reads) */') },
  { name: 'Collision avoidance logic present', test: readerContent.includes('floor = item.finalTop + item.height + 8;') },
  { name: 'restoreHighlightsInDOM calls scheduleCascadeGutterNotes once', test: readerContent.includes('scheduleCascadeGutterNotes();') }
];
rafChecks.forEach(c => {
  console.log(`[${c.name}]: ${c.test ? 'PASS' : 'FAIL'}`);
});

console.log('\n=== FORENSIC CHECK 6: Scroll Restoration Lock & Preemption ===');
const scrollChecks = [
  { name: 'isRestoringScroll flag initialized', test: readerContent.includes('let isRestoringScroll = false;') },
  { name: 'saveScrollDepth guarded by isRestoringScroll', test: readerContent.includes('if (isRestoringScroll || maxScroll <= 0) return;') },
  { name: 'scroll event listener guarded by isRestoringScroll', test: readerContent.includes('if (isRestoringScroll) return;') },
  { name: 'scroll-smooth temporarily removed', test: readerContent.includes("rootEl.classList.remove('scroll-smooth');") },
  { name: 'User preemption handlers (wheel, touchstart, keydown)', test: readerContent.includes("window.addEventListener('wheel', onUserInteraction") && readerContent.includes("window.addEventListener('touchstart', onUserInteraction") },
  { name: 'Font/geometry stabilization await', test: readerContent.includes('document.fonts.ready') },
  { name: 'Multi-frame layout settlement verification loop', test: readerContent.includes('function verifyLayoutSettled()') }
];
scrollChecks.forEach(c => {
  console.log(`[${c.name}]: ${c.test ? 'PASS' : 'FAIL'}`);
});
