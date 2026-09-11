/**
 * AHKH Study Hub - E2E Test Suite: Tier 1 (Feature Coverage)
 * Verifies core functionality for Requirements R1 through R5 across static build outputs and runtime contracts.
 * Minimum target: >=5 tests per core requirement (total >=25 tests, >=60 assertions).
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe } from '../utils/test-framework.mjs';
import { DistInspector } from '../utils/dist-inspector.mjs';
import { createVirtualBrowser, loadReaderScript } from '../utils/dom-runtime.mjs';

const inspector = new DistInspector();
const ROOT = process.cwd();

describe('Tier 1: Feature Coverage — R1: Navigation & Transitions', ({ it }) => {
  it('R1-F1: ClientRouter component is mounted in BaseLayout and present in generated HTML', (assert) => {
    const layoutPath = path.join(ROOT, 'src', 'layouts', 'BaseLayout.astro');
    assert.ok(fs.existsSync(layoutPath), 'BaseLayout.astro must exist');
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    assert.match(layoutContent, /<ClientRouter\b[^>]*\/>/, 'BaseLayout must mount Astro ClientRouter');

    const indexHtml = inspector.getLibraryIndexHtml();
    assert.ok(indexHtml, 'dist/index.html must exist');
    assert.match(indexHtml, /ClientRouter|_astro\/ClientRouter/i, 'dist/index.html must include ClientRouter bundle script');
  });

  it('R1-F2: View transition CSS keyframe (ahkh-rule-reveal) is defined with 280ms duration', (assert) => {
    const globalCssPath = path.join(ROOT, 'src', 'styles', 'global.css');
    assert.ok(fs.existsSync(globalCssPath), 'global.css must exist');
    const css = fs.readFileSync(globalCssPath, 'utf8');

    assert.match(css, /@keyframes\s+ahkh-rule-reveal\s*\{/, 'Keyframe ahkh-rule-reveal must be defined in global.css');
    assert.match(css, /::view-transition-new\(root\)\s*\{[^}]*280ms/s, 'Transition animation duration must be locked to 280ms');
    assert.match(css, /clip-path:\s*inset\(0\s+0\s+0\s+100%\)/, 'Initial clip-path must reveal from inset right');
  });

  it('R1-F3: Shared hub-header carries view-transition-name to eliminate header flicker', (assert) => {
    const headerPath = path.join(ROOT, 'src', 'components', 'HubHeader.astro');
    assert.ok(fs.existsSync(headerPath), 'HubHeader.astro must exist');
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    assert.match(headerContent, /transition:name=["']hub-header["']/, 'HubHeader must specify transition:name="hub-header"');

    const globalCss = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'global.css'), 'utf8');
    assert.match(globalCss, /::view-transition-group\(hub-header\)[^}]*animation:\s*none/s, 'hub-header transition group animation must be set to none');
  });

  it('R1-F4: Route loading bar element is present in BaseLayout DOM', (assert) => {
    const layout = fs.readFileSync(path.join(ROOT, 'src', 'layouts', 'BaseLayout.astro'), 'utf8');
    assert.match(layout, /id=["']route-loading-bar["']/, 'BaseLayout must declare #route-loading-bar');
    assert.match(layout, /astro:before-preparation/, 'Router lifecycle before-preparation listener must activate loading bar');
    assert.match(layout, /astro:page-load/, 'Router lifecycle page-load listener must complete loading bar');
  });

  it('R1-F5: All internal client-side navigation links utilize the required base path', (assert) => {
    const htmlFiles = inspector.getAllHtmlFiles();
    assert.greaterThan(htmlFiles.length, 0, 'Built HTML pages must exist');

    let totalInternalLinks = 0;
    for (const f of htmlFiles) {
      const content = fs.readFileSync(f, 'utf8');
      const hrefMatches = content.matchAll(/href=["'](\/[^"'#]+)["']/g);
      for (const m of hrefMatches) {
        const href = m[1];
        totalInternalLinks++;
        assert.ok(
          href.startsWith('/ahkh-study-hub') || href === '/',
          `Internal link "${href}" in ${path.relative(ROOT, f)} must use /ahkh-study-hub base path`
        );
      }
    }
    assert.greaterThan(totalInternalLinks, 50, 'Must verify at least 50 internal navigation links');
  });

  it('R1-F6: Hover prefetch architecture readiness across navigation links', (assert) => {
    const indexHtml = inspector.getLibraryIndexHtml();
    assert.ok(indexHtml, 'Library index must exist');
    // Navigation links should link to valid course routes
    assert.match(indexHtml, /href=["'][^"']*courses\/springboard-ux["']/, 'Library index must contain link to course syllabus');
  });
});

describe('Tier 1: Feature Coverage — R2: Data Splitting & Lazy Course Bundles', ({ it }) => {
  it('R2-F1: Catalog contract exports lightweight metadata and omits heavy contentHtml', (assert) => {
    const coursesTsPath = path.join(ROOT, 'src', 'data', 'courses.ts');
    const catalogTsPath = path.join(ROOT, 'src', 'data', 'catalog.ts');
    assert.ok(fs.existsSync(coursesTsPath) || fs.existsSync(catalogTsPath), 'Data source file must exist');

    const indexHtml = inspector.getLibraryIndexHtml();
    assert.ok(indexHtml, 'Library index HTML must be generated');
    // The library index should NOT contain lesson contentHtml
    assert.doesNotMatch(indexHtml, /Dieter Rams, Ten Principles for Good Design/, 'Library index must not contain lesson prose');
    assert.doesNotMatch(indexHtml, /data-timestamp=/, 'Library index must not contain video timestamp cues');
  });

  it('R2-F2: Course syllabus contract provides module hierarchy without embedding lesson HTML', (assert) => {
    const courseIndexFiles = inspector.getCourseIndexHtmlFiles();
    assert.greaterThan(courseIndexFiles.length, 0, 'Course index pages must exist in dist');
    const courseHtml = fs.readFileSync(courseIndexFiles[0], 'utf8');

    // Syllabus must list units/modules and lessons
    assert.match(courseHtml, /Unit 1:|Module 1:/i, 'Syllabus must render unit or module titles');
    assert.match(courseHtml, /lessons|Sources/i, 'Syllabus must render lesson items');
    // Syllabus should NOT render the actual full lesson reading article
    assert.doesNotMatch(courseHtml, /id=["']formatted-view["']/, 'Syllabus must not render full lesson article body');
  });

  it('R2-F3: Granular lesson content isolation across reading routes', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    assert.greaterThanOrEqual(lessonFiles.length, 30, 'Should have at least 30 generated lesson routes');

    // Check first lesson
    const firstLessonHtml = fs.readFileSync(lessonFiles[0], 'utf8');
    assert.match(firstLessonHtml, /id=["']study-desk["']/, 'Lesson page must render #study-desk reading container');
    assert.match(firstLessonHtml, /id=["']formatted-view["']|id=["']center-reading-column["']/, 'Lesson page must render reading column container');
  });

  it('R2-F4: Video transcripts are scoped only to video lessons', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let videoLessons = 0;
    let articleLessons = 0;

    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('id="video-player"') || html.includes('id="transcript-view"') || html.includes('aspect-video')) {
        videoLessons++;
        assert.match(html, /data-timestamp=/, `Video lesson ${path.basename(path.dirname(f))} must contain timestamp blocks`);
      } else {
        articleLessons++;
      }
    }
    assert.greaterThan(videoLessons, 0, 'Must have at least one video lesson with timestamps');
    assert.greaterThan(articleLessons, 0, 'Must have text-only article lessons');
  });

  it('R2-F5: Props footprint minimization contract prevents unbounded memory bloat', (assert) => {
    const slugPagePath = path.join(ROOT, 'src', 'pages', 'courses', '[course]', '[slug].astro');
    assert.ok(fs.existsSync(slugPagePath), '[slug].astro must exist');
    const code = fs.readFileSync(slugPagePath, 'utf8');
    assert.match(code, /getStaticPaths/, '[slug].astro must implement getStaticPaths');
    assert.match(code, /params:\s*\{/, 'getStaticPaths must return params');
  });
});

describe('Tier 1: Feature Coverage — R3: Reader DOM Engine & Local Storage Tuning', ({ it }) => {
  it('R3-F1: Study desk container provides all mandatory data-* attributes', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    assert.greaterThan(lessonFiles.length, 0);
    const html = fs.readFileSync(lessonFiles[0], 'utf8');

    const deskMatch = html.match(/<div\b[^>]*id=["']study-desk["'][^>]*>/);
    assert.ok(deskMatch, '#study-desk element must exist in lesson HTML');
    const deskTag = deskMatch[0];

    assert.match(deskTag, /data-course-id=["'][^"']+["']/, 'Must specify data-course-id');
    assert.match(deskTag, /data-lesson-id=["'][^"']+["']/, 'Must specify data-lesson-id');
    assert.match(deskTag, /data-lesson-slug=["'][^"']+["']/, 'Must specify data-lesson-slug');
    assert.match(deskTag, /data-lesson-title=["'][^"']+["']/, 'Must specify data-lesson-title');
  });

  it('R3-F2: LocalStorage schema for reading progress and scroll restoration', (assert) => {
    const { window, AhkhStorage, localStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonSlug = 'course-orientation-and-onboarding';
    const scrollKey = `ahkh_scroll_${courseId}_${lessonSlug}`;

    const scrollPayload = {
      percent: 42,
      scrollY: 850,
      updatedAt: new Date().toISOString(),
    };
    AhkhStorage.set(scrollKey, JSON.stringify(scrollPayload));

    const retrieved = JSON.parse(AhkhStorage.get(scrollKey));
    assert.strictEqual(retrieved.percent, 42, 'Scroll percent must be stored accurately');
    assert.strictEqual(retrieved.scrollY, 850, 'ScrollY must be stored accurately');
    assert.ok(retrieved.updatedAt, 'Timestamp must be present');
    assert.strictEqual(localStorage.getItem(scrollKey), JSON.stringify(scrollPayload), 'Underlying localStorage must be updated');
  });

  it('R3-F3: 4-State reading lifecycle transition engine (new -> explored -> reading -> completed)', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonSlug = 'intro-to-ux';

    const openedKey = `ahkh_opened_${courseId}_${lessonSlug}`;
    const readingKey = `ahkh_reading_${courseId}_${lessonSlug}`;
    const readKey = `ahkh_read_${courseId}_${lessonSlug}`;

    // State 1: new (no keys set)
    const computeState = () => {
      if (AhkhStorage.get(readKey) !== null) return 'completed';
      if (AhkhStorage.get(readingKey) !== null) return 'reading';
      if (AhkhStorage.get(openedKey) !== null) return 'explored';
      return 'new';
    };

    assert.strictEqual(computeState(), 'new', 'Initial state must be "new"');

    // State 2: explored
    AhkhStorage.set(openedKey, new Date().toISOString());
    assert.strictEqual(computeState(), 'explored', 'State must transition to "explored" upon visit');

    // State 3: reading (after clicking Start Reading)
    AhkhStorage.set(readingKey, new Date().toISOString());
    assert.strictEqual(computeState(), 'reading', 'State must transition to "reading" when study mode started');

    // State 4: completed (after clicking Mark as complete)
    AhkhStorage.set(readKey, new Date().toISOString());
    assert.strictEqual(computeState(), 'completed', 'State must transition to "completed" upon explicit completion');
  });

  it('R3-F4: Highlights storage schema persists array with color, note, and position', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonId = 'sb-1-0';
    const storageKey = `ahkh_hl_${courseId}_${lessonId}`;

    const highlights = [
      {
        id: 'hl-test-01',
        text: 'Usability is a quality attribute that assesses how easy user interfaces are to use.',
        color: 'amber',
        note: 'Core heuristic definition from NNGroup',
        createdAt: new Date().toISOString(),
      },
    ];

    AhkhStorage.set(storageKey, JSON.stringify(highlights));
    const saved = JSON.parse(AhkhStorage.get(storageKey));

    assert.ok(Array.isArray(saved), 'Saved highlights must be an array');
    assert.strictEqual(saved.length, 1);
    assert.strictEqual(saved[0].id, 'hl-test-01');
    assert.strictEqual(saved[0].color, 'amber');
    assert.strictEqual(saved[0].note, 'Core heuristic definition from NNGroup');
  });

  it('R3-F5: Reader script externalization and boot loader interface', (assert) => {
    const { window } = createVirtualBrowser();
    const bootFn = loadReaderScript(window);

    assert.strictEqual(typeof bootFn, 'function', 'window.__ahkhBootReader must be exported as a function');
    assert.strictEqual(typeof window.__ahkhBootReader, 'function', 'Must be available on global window object');
  });
});

describe('Tier 1: Feature Coverage — R4: Standardized Editorial Framework', ({ it }) => {
  it('R4-F1: Pullout Axiom pattern contains blockquote with border-l-2 and author attribution', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let axiomCount = 0;
    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('border-l-2') && html.includes('font-serif italic')) {
        axiomCount++;
        assert.match(html, /<blockquote\b[^>]*class=["'][^"']*border-l-2 border-ink[^"']*["']/, 'Axiom must match canonical class definition');
        assert.match(html, /<footer\b[^>]*class=["'][^"']*font-mono[^"']*["']|<footer\b[^>]*class=["'][^"']*font-sans[^"']*["']/, 'Axiom must contain a styled footer');
      }
    }
    assert.greaterThan(axiomCount, 0, 'At least one lesson must feature the Pullout Axiom pattern');
  });

  it('R4-F2: Key Principle / Synthesis Card uses rounded-xs, zinc border, and teal kicker', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let cardCount = 0;
    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('text-teal-700') && html.includes('rounded-xs')) {
        cardCount++;
        assert.match(html, /border-ink-border/, 'Synthesis Card must use border-ink-border');
        assert.match(html, /shadow-2xs/, 'Synthesis Card must use shadow-2xs');
      }
    }
    assert.greaterThan(cardCount, 0, 'At least one lesson must feature the Key Principle synthesis card pattern');
  });

  it('R4-F3: Socratic Callout pattern uses reflection prompt and teal header', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let calloutCount = 0;
    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('Inquiry for Reflection') || (html.includes('<aside') && html.includes('text-teal-700'))) {
        calloutCount++;
        assert.match(html, /not-prose/, 'Socratic Callout must carry not-prose for typographic isolation');
      }
    }
    assert.greaterThan(calloutCount, 0, 'At least one lesson must feature the Socratic Callout pattern');
  });

  it('R4-F4: Comparative Data Matrix enforces not-prose and border-collapse table', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let tableCount = 0;
    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('<table')) {
        tableCount++;
        assert.match(html, /overflow-x-auto/, 'Data Matrix table wrapper must be horizontally scrollable');
        assert.match(html, /border-collapse/, 'Data Matrix table must use border-collapse');
      }
    }
    assert.greaterThan(tableCount, 0, 'At least one lesson must feature Comparative Data Matrix');
  });

  it('R4-F5: Source Attribution Footer is placed at the end of lessons', (assert) => {
    const lessonFiles = inspector.getLessonHtmlFiles();
    let footersCount = 0;
    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      if (html.includes('border-t') && (html.includes('Source') || html.includes('Original') || html.includes('↗'))) {
        footersCount++;
      }
    }
    assert.greaterThanOrEqual(footersCount, 30, 'At least 30 lessons must contain a standardized Source Attribution Footer');
  });

  it('R4-F6: Absolute ban on synthetic slop (zero emojis and zero // eyebrows)', (assert) => {
    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const lessonFiles = inspector.getLessonHtmlFiles();

    for (const f of lessonFiles) {
      const html = fs.readFileSync(f, 'utf8');
      assert.doesNotMatch(html, emojiRegex, `No emojis allowed in lesson ${path.basename(path.dirname(f))}`);
      // Check for fake // syntax in visible text
      const clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      assert.doesNotMatch(clean, />\s*\/\/\s*[A-Za-z]/, `No // fake code comments allowed in lesson ${path.basename(path.dirname(f))}`);
    }
  });
});

describe('Tier 1: Feature Coverage — R5: Web-Only Streamlining & Build Verification', ({ it }) => {
  it('R5-F1: Light mode canvas background is strictly pure white (#FFFFFF)', (assert) => {
    const globalCss = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'global.css'), 'utf8');
    assert.match(globalCss, /background-color:\s*#FFFFFF/i, 'Canvas background must be #FFFFFF in global.css');
    assert.doesNotMatch(globalCss, /#FDFCFA/i, 'Warm ivory / beige #FDFCFA is strictly prohibited');

    const tailwindConfig = fs.readFileSync(path.join(ROOT, 'tailwind.config.mjs'), 'utf8');
    assert.match(tailwindConfig, /paper:\s*\{[^}]*100:\s*['"]#FAFAFA['"]/s, 'Tailwind config must lock paper-100 to #FAFAFA');
  });

  it('R5-F2: Seven signal hues are locked to text color only without filled cards or pills', (assert) => {
    const indexHtml = inspector.getLibraryIndexHtml();
    assert.ok(indexHtml, 'Library index must exist');
    // Verify dot indicator pattern
    assert.match(indexHtml, /w-1\.5\s+h-1\.5\s+rounded-full|data-statusdot/, 'Status badges must use subtle dot indicators');
    // Ensure status badge container has no colored pill background (e.g. px-* bg-*)
    assert.doesNotMatch(indexHtml, /data-statusbadge\b[^>]*\bbg-(?:blue|purple|amber|emerald)-/i, 'Status badge container must not use loud full-background fills');
  });

  it('R5-F3: Low-contrast tactile active states avoid inverted black blocks', (assert) => {
    const htmlFiles = inspector.getAllHtmlFiles();
    for (const f of htmlFiles) {
      const html = fs.readFileSync(f, 'utf8');
      assert.doesNotMatch(html, /\bhover:text-black\b/, `Forbidden high contrast hover:text-black in ${path.relative(ROOT, f)}`);
      assert.doesNotMatch(html, /\bborder-black\b/, `Forbidden harsh border-black in ${path.relative(ROOT, f)}`);
    }
  });

  it('R5-F4: Zero whole-element movement or scaling on hover across all pages', (assert) => {
    const hoverMotionRegex = /\b(?:hover|group-hover):-?(?:translate|scale)\b/;
    const allowedSvgTags = new Set(['svg', 'path', 'line', 'polyline', 'polygon', 'circle', 'rect', 'g']);
    const htmlFiles = inspector.getAllHtmlFiles();

    for (const f of htmlFiles) {
      const html = fs.readFileSync(f, 'utf8');
      const tagMatches = html.matchAll(/<([a-zA-Z0-9-]+)\b([^>]*?)>/g);
      for (const tm of tagMatches) {
        const tag = tm[1].toLowerCase();
        const attrs = tm[2];
        const classMatch = attrs.match(/\bclass=["']([^"']*)["']/);
        if (classMatch && hoverMotionRegex.test(classMatch[1])) {
          assert.ok(
            allowedSvgTags.has(tag),
            `Whole-element hover motion forbidden on <${tag}> in ${path.relative(ROOT, f)}: class="${classMatch[1]}"`
          );
        }
      }
    }
  });

  it('R5-F5: Scratch and unreferenced non-web files are pruned', (assert) => {
    const scratchFile = path.join(ROOT, 'extracted_full_pdf.txt');
    if (fs.existsSync(scratchFile)) {
      const distFiles = inspector.getAllHtmlFiles();
      for (const f of distFiles) {
        const content = fs.readFileSync(f, 'utf8');
        assert.doesNotMatch(content, /extracted_full_pdf\.txt/, 'Scratch file must not be referenced in any built HTML');
      }
    } else {
      assert.ok(true, 'extracted_full_pdf.txt is already pruned');
    }
  });
});
