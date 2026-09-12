import fs from 'node:fs';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'dist');
console.log('Auditing dist directory:', distDir);

const files = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.html')) files.push(full);
  }
}
walk(distDir);
console.log(`Audited ${files.length} HTML pages in dist.`);

let linkErrors = 0;
let emojiErrors = 0;
let slashSlashErrors = 0;
let contrastErrors = 0;
let motionErrors = 0;
let fontErrors = 0;
let colorErrors = 0;
let tokenErrors = 0;

// Emoji regex range
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

// Forbidden high-contrast classes per ADR-014 and ADR-016
const forbiddenHighContrastPatterns = [
  /\bhover:text-black\b/,
  /\bgroup-hover:text-black\b/,
  /\bhover:text-white\b/,
  /\bgroup-hover:text-white\b/,
  /\bborder-black\b/,
];

// ADR-017: Prohibition of whole-element movement/translation/scale on hover.
// Micro-interactions (e.g. directional translation) are permitted exclusively on SVG icon elements.
const hoverMotionRegex = /\b(?:hover|group-hover):-?(?:translate|scale)\b/;
const allowedSvgTags = new Set(['svg', 'path', 'line', 'polyline', 'polygon', 'circle', 'rect', 'g']);
const openingTagRegex = /<([a-zA-Z0-9-]+)\b([^>]*?)>/g;

for (const file of files) {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check 1: Emojis ban
  if (emojiRegex.test(content)) {
    console.error(`[EMOJI DETECTED] in ${relPath}`);
    emojiErrors++;
  }

  // Check 2: Double slash as fake syntax/eyebrow in UI text (e.g. "// MODULE" or "// INDEX")
  const textContent = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  const matchSlash = textContent.match(/>\s*\/\/\s*[A-Za-z]/) || textContent.match(/\/\/\s*[A-Z]{3,}/);
  if (matchSlash) {
    console.error(`[DOUBLE SLASH SLOP] in ${relPath}: ${matchSlash[0]}`);
    slashSlashErrors++;
  }

  // Check 3: Broken root-relative href links without /ahkh-study-hub base
  // Exclude external links (http), anchors (#), mailto, etc.
  const hrefMatches = content.matchAll(/href="([^"#]+)"/g);
  for (const m of hrefMatches) {
    const target = m[1];
    if (target.startsWith('/') && !target.startsWith('/ahkh-study-hub')) {
      console.error(`[BASE PATH MISSING] in ${relPath}: href="${target}"`);
      linkErrors++;
    }
  }

  // Check 4: Universal Low-Contrast Mandate (ADR-014, ADR-016)
  for (const pattern of forbiddenHighContrastPatterns) {
    if (pattern.test(content)) {
      console.error(`[HIGH CONTRAST VIOLATION (ADR-016)] in ${relPath}: matches ${pattern}`);
      contrastErrors++;
    }
  }

  // Check 5: Universal Prohibition of Whole-Element Movement on Hover (ADR-017)
  let tagMatch;
  openingTagRegex.lastIndex = 0;
  while ((tagMatch = openingTagRegex.exec(content)) !== null) {
    const tagName = tagMatch[1].toLowerCase();
    const tagAttrs = tagMatch[2];
    const classMatch = tagAttrs.match(/\bclass="([^"]*)"/);
    if (classMatch && hoverMotionRegex.test(classMatch[1])) {
      if (!allowedSvgTags.has(tagName)) {
        console.error(`[WHOLE-ELEMENT HOVER MOVEMENT VIOLATION (ADR-017)] in ${relPath}: <${tagName}> contains hover translation/scale ("${classMatch[1]}")`);
        motionErrors++;
      }
    }
  }

  // Check 6: External URL Integrity (Catch truncated domains or malformed protocols)
  const extHrefMatches = content.matchAll(/href="(https?:\/\/[^"#\s]+)"/g);
  for (const m of extHrefMatches) {
    const url = m[1];
    try {
      const parsed = new URL(url);
      if (parsed.hostname.startsWith('ww.') || parsed.hostname.startsWith('eadwise') || parsed.hostname.startsWith('xplanet') || parsed.hostname.startsWith('elp.') || parsed.hostname.startsWith('ribbble') || parsed.hostname.startsWith('ontent')) {
        console.error(`[MALFORMED EXTERNAL DOMAIN] in ${relPath}: ${url}`);
        linkErrors++;
      }
    } catch (e) {
      console.error(`[INVALID EXTERNAL URL] in ${relPath}: ${url}`);
      linkErrors++;
    }
  }
  // Check 7: Type System Discipline (3 systemic fonts + locked scale).
  // Bans: dead font families, off-scale arbitrary sizes, non-system weights.
  const forbiddenFontPatterns = [
    /\bPlayfair\b/,
    /family=Inter\b/,
    /\btext-\[9px\]/,
    /\btext-\[13px\]/,
    /\btext-\[15px\]/,
    /\bfont-(thin|extralight|extrabold|black)\b/,
    /tracking-widestst/,
  ];
  for (const pattern of forbiddenFontPatterns) {
    if (pattern.test(content)) {
      console.error(`[TYPE SYSTEM VIOLATION] in ${relPath}: matches ${pattern}`);
      fontErrors++;
    }
  }

  // Check 8: Seven Signal Hues (ADR-030). Banned grades, banned hues, banned fills.
  // Scoped to class attributes so prose words and element IDs can never trip the check.
  // Depiction exception (§7.8): elements explicitly marked data-allow-fill
  // (literal artifact depictions) are exempt from the fill ban — nothing else is.
  const allowedFills = new Set(
    [...content.matchAll(/<[^>]*data-allow-fill[^>]*class="([^"]*)"[^>]*>/g)].map((m) => m[1])
  );
  const classSoup = [...content.matchAll(/class="([^"]*)"/g)]
    .map((m) => m[1])
    .filter((c) => !allowedFills.has(c))
    .join(' ');
  // Sanctioned hover-only destructive fills (remove actions, window close): strip before testing.
  const classTest = classSoup.replace(/(dark:)?hover:bg-rose-(50|950)\S*/g, '');
  const forbiddenColorPatterns = [
    /(dark:)?text-(blue|purple|amber|emerald|rose|sky|teal|fuchsia|cyan|violet)-(800|900|950)\b/,
    /(dark:)?text-(indigo|orange)-[0-9]+\b/,
    /(dark:)?text-red-[0-9]+\b/,
    /(dark:)?(bg|border)-red-[0-9]+\b/,
    /(dark:)?bg-(indigo|orange)-[0-9]+\b/,
    /(dark:)?bg-(blue|purple|amber|emerald|rose|sky|teal|fuchsia|cyan|violet)-(50|100|200|900|950)\b/,
  ];
  for (const pattern of forbiddenColorPatterns) {
    const m = classTest.match(pattern);
    if (m) {
      console.error(`[SEVEN HUES VIOLATION (ADR-030)] in ${relPath}: "${m[0]}"`);
      colorErrors++;
    }
  }

  // Check 9: Token & Motion Locks (ADR-031). Phantom classes, banned motion, rogue layers.
  const forbiddenTokenPatterns = [
    /\btransition-all\b/,
    /\b(animate-in|animate-out|fade-in|fade-out|zoom-in)\b/,
    /\bduration-(200|500|1000)\b/,
    /\bease-(in|in-out|linear)\b/,
    /\brounded-(xl|lg|md)\b/,
    /\brounded(?![-\w])/,
    /\bbg-paper-400\b/,
    /\bz-(10|20|60|70|80|90|100|[0-9]{4,})\b/,
    /\b[mp][xytrbl]?-\[[^\]]+\]/,
    /\bgap-\[[^\]]+\]/,
    /\bmax-w-\[[^\]]+\]/,
  ];
  for (const pattern of forbiddenTokenPatterns) {
    const m = classSoup.match(pattern);
    if (m) {
      console.error(`[TOKEN LOCK VIOLATION (ADR-031)] in ${relPath}: "${m[0]}"`);
      tokenErrors++;
    }
  }
}

console.log(`--- Summary ---`);
console.log(`Pages audited: ${files.length}`);
console.log(`Link errors: ${linkErrors}`);
console.log(`Emoji violations: ${emojiErrors}`);
console.log(`Double slash violations: ${slashSlashErrors}`);
console.log(`High-contrast violations: ${contrastErrors}`);
console.log(`Hover motion violations: ${motionErrors}`);
console.log(`Type system violations: ${fontErrors}`);
console.log(`Seven-hues violations: ${colorErrors}`);
console.log(`Token-lock violations: ${tokenErrors}`);

// Check 10: Phantom-token aliveness (ADR-031) — locked tokens must exist in built CSS.
let cssErrors = 0;
try {
  const astroDir = path.join(distDir, '_astro');
  const cssFiles = fs.existsSync(astroDir) ? fs.readdirSync(astroDir).filter((f) => f.endsWith('.css')) : [];
  const css = cssFiles.map((f) => fs.readFileSync(path.join(astroDir, f), 'utf8')).join('\n');
  for (const token of ['.rounded-xs', '.shadow-2xs']) {
    if (!css.includes(token)) {
      console.error(`[PHANTOM TOKEN (ADR-031)] built CSS is missing "${token}" — tailwind.config.mjs tokens not wired`);
      cssErrors++;
    }
  }
} catch (e) {
  console.error(`[CSS AUDIT FAILURE] ${e.message}`);
  cssErrors++;
}

// Check 11: Reader library externalized (ADR-027) — no lesson page may inline the library.
let readerErrors = 0;
const distReader = path.join(distDir, 'scripts', 'reader.js');
if (!fs.existsSync(distReader)) {
  console.error('[READER LIBRARY MISSING (ADR-027)] dist/scripts/reader.js not found');
  readerErrors++;
}
for (const file of files) {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('window.__ahkhBootReader = function')) {
    console.error(`[READER INLINED (ADR-027)] in ${relPath}: library body must live in /scripts/reader.js`);
    readerErrors++;
  }
  if (relPath.startsWith(`courses${path.sep}`)) {
    const depth = relPath.split(path.sep).length;
    // dist/courses/<course>/index.html is the journey page (no reader); lessons sit one level deeper.
    if (depth > 3 && !content.includes('scripts/reader.js')) {
      console.error(`[READER NOT LOADED (ADR-027)] in ${relPath}: missing /scripts/reader.js reference`);
      readerErrors++;
    }
  }
}
console.log(`CSS token errors: ${cssErrors}`);
console.log(`Reader library errors: ${readerErrors}`);

// Check 12: Page & asset weight budgets — fail before the next 6MB-image
// catastrophe ships silently. Budgets (measured 2026-09-12: heaviest lesson
// 188KB, journey index 179KB, heaviest image 120KB):
//   lesson pages  <= 250KB, index pages <= 300KB, images <= 200KB.
let weightErrors = 0;
const LESSON_BUDGET = 250 * 1024;
const INDEX_BUDGET = 300 * 1024;
const IMAGE_BUDGET = 200 * 1024;
for (const file of files) {
  const relPath = path.relative(distDir, file);
  const size = fs.statSync(file).size;
  const depth = relPath.split(path.sep).length;
  const isLesson = relPath.startsWith(`courses${path.sep}`) && depth > 3;
  const budget = isLesson ? LESSON_BUDGET : INDEX_BUDGET;
  if (size > budget) {
    console.error(`[WEIGHT BUDGET] ${relPath} is ${Math.round(size / 1024)}KB (budget ${Math.round(budget / 1024)}KB) — split content or compress assets`);
    weightErrors++;
  }
}
function walkAssets(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) { walkAssets(full); continue; }
    if (/\.(png|jpe?g|webp|gif|avif|svg|ico)$/i.test(item)) {
      const size = fs.statSync(full).size;
      if (size > IMAGE_BUDGET) {
        console.error(`[WEIGHT BUDGET] ${path.relative(distDir, full)} is ${Math.round(size / 1024)}KB (budget ${Math.round(IMAGE_BUDGET / 1024)}KB) — convert to capped-width WebP with loading="lazy"`);
        weightErrors++;
      }
    }
  }
}
walkAssets(distDir);
console.log(`Weight budget errors: ${weightErrors}`);

if (linkErrors === 0 && emojiErrors === 0 && slashSlashErrors === 0 && contrastErrors === 0 && motionErrors === 0 && fontErrors === 0 && colorErrors === 0 && tokenErrors === 0 && cssErrors === 0 && readerErrors === 0 && weightErrors === 0) {
  console.log('SUCCESS: All generated pages comply 100% with constitutional standards!');
  process.exit(0);
} else {
  process.exit(1);
}
