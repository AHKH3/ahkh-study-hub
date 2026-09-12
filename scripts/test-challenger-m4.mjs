import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

async function runChallenge() {
  console.log('================================================================');
  console.log('  CHALLENGER M4: Empirical Attribution & Constitutional Audit');
  console.log('================================================================\n');

  let totalChecks = 0;
  let passedChecks = 0;
  const failures = [];

  function assert(condition, message, details = {}) {
    totalChecks++;
    if (condition) {
      passedChecks++;
      console.log(`  [PASS] ${message}`);
    } else {
      failures.push({ message, ...details });
      console.error(`  [FAIL] ${message}`);
      if (Object.keys(details).length > 0) {
        console.error('         Details:', JSON.stringify(details, null, 2));
      }
    }
  }

  const viteServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    // -------------------------------------------------------------
    // PART 1: SOURCE DATA ATTRIBUTION INTEGRITY (37/37 LESSONS)
    // -------------------------------------------------------------
    console.log('\n[1/5] Auditing Raw Lesson Data (src/data/courses.ts and lessons/*.ts)...');
    
    const { COURSES } = await viteServer.ssrLoadModule('./src/data/courses.ts');
    assert(Array.isArray(COURSES) && COURSES.length > 0, 'COURSES dataset is valid array');
    const course = COURSES[0];
    const allLessons = course.modules.flatMap(m => m.lessons);
    assert(allLessons.length === 37, `Course has exactly 37 lessons (found ${allLessons.length})`);

    const lessonsDir = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'lessons');
    const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts'));
    assert(lessonFiles.length === 37, `Granular lessons directory contains 37 files (found ${lessonFiles.length})`);

    let sourceAttributionMissingInCourses = 0;
    let sourceAttributionMissingInFiles = 0;
    let invalidUrlsInCourses = 0;
    let invalidUrlsInFiles = 0;

    for (const l of allLessons) {
      let validUrl = false;
      try {
        const u = new URL(l.originalSourceUrl);
        validUrl = u.protocol === 'http:' || u.protocol === 'https:';
      } catch (e) {
        validUrl = false;
      }
      if (!validUrl) {
        invalidUrlsInCourses++;
        console.error(`Invalid URL in lesson ${l.id} (${l.slug}): ${l.originalSourceUrl}`);
      }

      const html = l.contentHtml || '';
      const hasFooter = html.includes('border-t') && (
        html.includes('Source Citation') || 
        html.includes('Derivative Study Companion') || 
        html.includes('Source:') || 
        html.includes('Original Source') || 
        html.includes('View original publication') || 
        html.includes('<footer') || 
        html.includes('↗')
      );
      if (!hasFooter) {
        sourceAttributionMissingInCourses++;
        console.error(`Missing attribution footer in courses.ts lesson ${l.id} (${l.slug})`);
      }
    }

    assert(invalidUrlsInCourses === 0, 'All 37 lessons in courses.ts have valid HTTP/HTTPS originalSourceUrl');
    assert(sourceAttributionMissingInCourses === 0, 'All 37 lessons in courses.ts contain Source Attribution Footer in contentHtml');

    for (const file of lessonFiles) {
      const filePath = path.join(lessonsDir, file);
      const mod = await viteServer.ssrLoadModule(`./src/data/courses/springboard-ux/lessons/${file}`);
      const lesson = mod.LESSON || mod.default;
      assert(!!lesson, `Lesson export exists in ${file}`);

      let validUrl = false;
      try {
        const u = new URL(lesson.originalSourceUrl);
        validUrl = u.protocol === 'http:' || u.protocol === 'https:';
      } catch (e) {
        validUrl = false;
      }
      if (!validUrl) {
        invalidUrlsInFiles++;
        console.error(`Invalid URL in file ${file}: ${lesson.originalSourceUrl}`);
      }

      const html = lesson.contentHtml || '';
      const hasFooter = html.includes('border-t') && (
        html.includes('Source Citation') || 
        html.includes('Derivative Study Companion') || 
        html.includes('Source:') || 
        html.includes('Original Source') || 
        html.includes('View original publication') || 
        html.includes('<footer') || 
        html.includes('↗')
      );
      if (!hasFooter) {
        sourceAttributionMissingInFiles++;
        console.error(`Missing attribution footer in file ${file}`);
      }
    }

    assert(invalidUrlsInFiles === 0, 'All 37 granular lesson files have valid HTTP/HTTPS originalSourceUrl');
    assert(sourceAttributionMissingInFiles === 0, 'All 37 granular lesson files contain Source Attribution Footer in contentHtml');

    // -------------------------------------------------------------
    // PART 2: COMPILED DIST/ AUDIT FOR 37 LESSONS
    // -------------------------------------------------------------
    console.log('\n[2/5] Auditing Compiled dist/ HTML for All 37 Lessons...');
    const distCourseDir = path.join(DIST, 'courses', 'springboard-ux');
    assert(fs.existsSync(distCourseDir), 'dist/courses/springboard-ux exists');

    const distLessonDirs = fs.readdirSync(distCourseDir).filter(item => {
      const p = path.join(distCourseDir, item);
      return fs.statSync(p).isDirectory();
    });
    assert(distLessonDirs.length === 37, `Exactly 37 compiled lesson folders in dist/ (found ${distLessonDirs.length})`);

    let distMissingFooters = 0;
    let distMalformedUrls = 0;
    let distExternalLinksMissingTarget = 0;

    for (const slug of distLessonDirs) {
      const htmlPath = path.join(distCourseDir, slug, 'index.html');
      assert(fs.existsSync(htmlPath), `dist index.html exists for ${slug}`);
      const html = fs.readFileSync(htmlPath, 'utf8');

      const hasFooter = html.includes('Source Citation') || html.includes('Source:') || html.includes('Original Source') || (html.includes('border-t') && html.includes('↗'));
      if (!hasFooter) {
        distMissingFooters++;
        console.error(`Missing footer in dist page: ${slug}`);
      }

      const hrefMatches = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)];
      for (const m of hrefMatches) {
        const url = m[1];
        try {
          const parsed = new URL(url);
          if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname.includes('.')) {
            distMalformedUrls++;
            console.error(`Malformed external URL in ${slug}: ${url}`);
          }
        } catch (e) {
          distMalformedUrls++;
          console.error(`Invalid URL in ${slug}: ${url}`);
        }
      }

      const attrLinks = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
      for (const m of attrLinks) {
        const fullTag = m[0];
        if (m[2].includes('↗') || m[2].includes('original source') || m[2].includes('original lecture')) {
          if (!fullTag.includes('target="_blank"')) {
            distExternalLinksMissingTarget++;
            console.error(`Attribution link missing target="_blank" in ${slug}: ${fullTag}`);
          }
          if (!fullTag.includes('rel="noopener noreferrer"')) {
            distExternalLinksMissingTarget++;
            console.error(`Attribution link missing rel="noopener noreferrer" in ${slug}: ${fullTag}`);
          }
        }
      }
    }

    assert(distMissingFooters === 0, 'All 37 compiled lesson HTML pages contain Source Attribution Footer');
    assert(distMalformedUrls === 0, 'Zero malformed external URLs across all 37 compiled lesson pages');
    assert(distExternalLinksMissingTarget === 0, 'All attribution links have target="_blank" and rel="noopener noreferrer"');

    // -------------------------------------------------------------
    // PART 3: DETAILED INSPECTION OF sb-6-1, sb-7-1, sb-8-1
    // -------------------------------------------------------------
    console.log('\n[3/5] Deep-Dive Inspection of sb-6-1, sb-7-1, sb-8-1 in dist/ ...');
    
    // sb-6-1: ui-design-fundamentals-and-color
    const sb61Html = fs.readFileSync(path.join(distCourseDir, 'ui-design-fundamentals-and-color', 'index.html'), 'utf8');
    assert(sb61Html.includes('Stefano Peschiera'), 'sb-6-1 cites author Stefano Peschiera');
    assert(sb61Html.includes('https://dribbble.com/stories/2018/12/19/choosing-colors-for-web-design-a-practical-ui-color-application-guide'), 'sb-6-1 contains valid Dribbble source URL');
    assert(sb61Html.includes('Source Citation'), 'sb-6-1 has Source Citation kicker');
    assert(sb61Html.includes('border-t border-ink-border/80'), 'sb-6-1 footer has canonical top divider border');
    assert(sb61Html.includes('text-teal-700 dark:text-teal-400'), 'sb-6-1 kicker has canonical teal hue');
    const sb61ReadingColIdx = sb61Html.indexOf('id="center-reading-column"');
    const sb61FooterIdx = sb61Html.indexOf('Adapted for sovereign study from <em>Choosing Colors for Web Design');
    const sb61ClosingMainIdx = sb61Html.indexOf('</main>');
    assert(sb61ReadingColIdx !== -1 && sb61FooterIdx > sb61ReadingColIdx && sb61FooterIdx < sb61ClosingMainIdx, 'sb-6-1 footer is correctly nested inside #center-reading-column');

    // sb-7-1: moderated-usability-testing-and-the-five-act-interview
    const sb71Html = fs.readFileSync(path.join(distCourseDir, 'moderated-usability-testing-and-the-five-act-interview', 'index.html'), 'utf8');
    assert(sb71Html.includes('Michael Margolis'), 'sb-7-1 cites author Michael Margolis');
    assert(sb71Html.includes('https://www.youtube.com/watch?v=U9ZG19XTbd4'), 'sb-7-1 contains valid YouTube source URL');
    assert(sb71Html.includes('Source Citation'), 'sb-7-1 has Source Citation kicker');
    assert(sb71Html.includes('Watch original lecture'), 'sb-7-1 has contextual video lecture action label');
    const sb71ReadingColIdx = sb71Html.indexOf('id="center-reading-column"');
    const sb71FooterIdx = sb71Html.indexOf('Adapted for sovereign study from <em>The Five-Act Interview Protocol');
    const sb71ClosingMainIdx = sb71Html.indexOf('</main>');
    assert(sb71ReadingColIdx !== -1 && sb71FooterIdx > sb71ReadingColIdx && sb71FooterIdx < sb71ClosingMainIdx, 'sb-7-1 footer is correctly nested inside #center-reading-column');

    // sb-8-1: breaking-into-ux-and-career-strategy
    const sb81Html = fs.readFileSync(path.join(distCourseDir, 'breaking-into-ux-and-career-strategy', 'index.html'), 'utf8');
    assert(sb81Html.includes('Springboard Design Mentorship Board'), 'sb-8-1 cites Springboard Design Mentorship Board');
    assert(sb81Html.includes('https://www.springboard.com/blog/design/ux-design-portfolio-guide/'), 'sb-8-1 contains valid Springboard blog source URL');
    assert(sb81Html.includes('Source Citation'), 'sb-8-1 has Source Citation kicker');
    const sb81ReadingColIdx = sb81Html.indexOf('id="center-reading-column"');
    const sb81FooterIdx = sb81Html.indexOf('Adapted for sovereign study from <em>UX Design Portfolio Guide');
    const sb81ClosingMainIdx = sb81Html.indexOf('</main>');
    assert(sb81ReadingColIdx !== -1 && sb81FooterIdx > sb81ReadingColIdx && sb81FooterIdx < sb81ClosingMainIdx, 'sb-8-1 footer is correctly nested inside #center-reading-column');

    for (const [name, content] of [['sb-6-1', sb61Html], ['sb-7-1', sb71Html], ['sb-8-1', sb81Html]]) {
      const fullSectionClose = content.match(/<div class="mt-16 pt-8 border-t[\s\S]*?<\/div>\s*<\/section>/);
      assert(!!fullSectionClose, `${name} footer cleanly precedes closing </section>`);
      const footerOnlyMatch = content.match(/<div class="mt-16 pt-8 border-t[\s\S]*?<\/div>(?=\s*<\/section>)/);
      assert(!!footerOnlyMatch, `${name} footer container extracted cleanly`);
      const openingTags = (footerOnlyMatch[0].match(/<[a-z0-9]+/gi) || []).length;
      const closingTags = (footerOnlyMatch[0].match(/<\/[a-z0-9]+/gi) || []).length;
      assert(openingTags === closingTags, `${name} footer tag opening/closing count is perfectly balanced (${openingTags} == ${closingTags})`);
    }

    // -------------------------------------------------------------
    // PART 4: ADVERSARIAL CONSTITUTIONAL AUDIT (ALL 42 DIST PAGES)
    // -------------------------------------------------------------
    console.log('\n[4/5] Adversarial Constitutional Audit Across ALL dist/ Pages...');
    
    const allDistHtmlFiles = [];
    function collectHtml(dir) {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) collectHtml(full);
        else if (full.endsWith('.html')) allDistHtmlFiles.push(full);
      }
    }
    collectHtml(DIST);
    assert(allDistHtmlFiles.length === 42, `Exactly 42 HTML pages found across dist/ (found ${allDistHtmlFiles.length})`);

    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const hoverMotionRegex = /\b(?:hover|group-hover):-?(?:translate|scale)\b/;
    const allowedSvgTags = new Set(['svg', 'path', 'line', 'polyline', 'polygon', 'circle', 'rect', 'g']);
    const openingTagRegex = /<([a-zA-Z0-9-]+)\b([^>]*?)>/g;

    let emojiViolations = 0;
    let doubleSlashViolations = 0;
    let wholeElementHoverViolations = 0;

    for (const f of allDistHtmlFiles) {
      const rel = path.relative(DIST, f);
      const html = fs.readFileSync(f, 'utf8');

      if (emojiRegex.test(html)) {
        emojiViolations++;
        console.error(`[EMOJI DETECTED] in ${rel}`);
      }

      const cleanText = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/https?:\/\/[^\s"'<>]+/gi, '');
      
      const slashMatch = cleanText.match(/>\s*\/\/\s*[A-Za-z]/) || cleanText.match(/\/\/\s*[A-Z]{3,}/);
      if (slashMatch) {
        doubleSlashViolations++;
        console.error(`[DOUBLE SLASH DETECTED] in ${rel}: ${slashMatch[0]}`);
      }

      let tagMatch;
      openingTagRegex.lastIndex = 0;
      while ((tagMatch = openingTagRegex.exec(html)) !== null) {
        const tagName = tagMatch[1].toLowerCase();
        const tagAttrs = tagMatch[2];
        const classMatch = tagAttrs.match(/\bclass="([^"]*)"/);
        if (classMatch && hoverMotionRegex.test(classMatch[1])) {
          if (!allowedSvgTags.has(tagName)) {
            wholeElementHoverViolations++;
            console.error(`[WHOLE ELEMENT HOVER MOVEMENT] in ${rel}: <${tagName} class="${classMatch[1]}">`);
          }
        }
      }
    }

    assert(emojiViolations === 0, `Zero emoji violations found across all 42 pages (found ${emojiViolations})`);
    assert(doubleSlashViolations === 0, `Zero double-slash slop violations in UI text across all 42 pages (found ${doubleSlashViolations})`);
    assert(wholeElementHoverViolations === 0, `Zero whole-element hover translations or scaling across all 42 pages (found ${wholeElementHoverViolations})`);

    // -------------------------------------------------------------
    // PART 5: CANONICAL EDITORIAL COMPONENTS & DOCS VERIFICATION
    // -------------------------------------------------------------
    console.log('\n[5/5] Auditing Canonical Astro Editorial Components & Documentation...');
    const editorialDir = path.join(ROOT, 'src', 'components', 'editorial');
    assert(fs.existsSync(editorialDir), 'src/components/editorial directory exists');

    const expectedFiles = [
      'Axiom.astro',
      'KeyPrinciple.astro',
      'SocraticCallout.astro',
      'DataMatrix.astro',
      'SourceAttribution.astro',
      'index.ts'
    ];
    for (const comp of expectedFiles) {
      const p = path.join(editorialDir, comp);
      assert(fs.existsSync(p), `Editorial component ${comp} exists`);
      const src = fs.readFileSync(p, 'utf8');
      assert(src.length > 50, `${comp} has substantive content`);
      assert(!src.includes('transition-all'), `${comp} obeys ADR-031 motion lock (no transition-all)`);
    }

    const docPath = path.join(ROOT, 'docs', 'EDITORIAL_FRAMEWORK.md');
    assert(fs.existsSync(docPath), 'docs/EDITORIAL_FRAMEWORK.md exists');
    const docText = fs.readFileSync(docPath, 'utf8');
    assert(docText.includes('Pullout Axiom'), 'Doc describes Pullout Axiom');
    assert(docText.includes('Key Principle'), 'Doc describes Key Principle');
    assert(docText.includes('Socratic Callout'), 'Doc describes Socratic Callout');
    assert(docText.includes('Comparative Data Matrix'), 'Doc describes Comparative Data Matrix');
    assert(docText.includes('Source Attribution Footer'), 'Doc describes Source Attribution Footer');
    assert(docText.includes('ADR-030'), 'Doc cites Seven Signal Hues ADR-030');
    assert(docText.includes('ADR-017'), 'Doc cites hover motion ban ADR-017');
    assert(docText.includes('#FFFFFF'), 'Doc mandates pure white canvas #FFFFFF');

  } finally {
    await viteServer.close();
  }

  console.log('\n================================================================');
  console.log(`  SUMMARY: ${passedChecks}/${totalChecks} checks passed.`);
  if (failures.length === 0) {
    console.log('  VERDICT: APPROVED. All empirical challenges passed cleanly!');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error(`  VERDICT: REQUEST_CHANGES. ${failures.length} failures detected!`);
    console.log('================================================================');
    process.exit(1);
  }
}

runChallenge().catch(e => {
  console.error('Fatal error in challenger harness:', e);
  process.exit(1);
});
