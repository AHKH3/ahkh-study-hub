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
}

console.log(`--- Summary ---`);
console.log(`Pages audited: ${files.length}`);
console.log(`Link errors: ${linkErrors}`);
console.log(`Emoji violations: ${emojiErrors}`);
console.log(`Double slash violations: ${slashSlashErrors}`);
console.log(`High-contrast violations: ${contrastErrors}`);
console.log(`Hover motion violations: ${motionErrors}`);
console.log(`Type system violations: ${fontErrors}`);

if (linkErrors === 0 && emojiErrors === 0 && slashSlashErrors === 0 && contrastErrors === 0 && motionErrors === 0 && fontErrors === 0) {
  console.log('SUCCESS: All generated pages comply 100% with constitutional standards!');
  process.exit(0);
} else {
  process.exit(1);
}
