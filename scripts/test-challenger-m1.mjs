import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createServer } from 'vite';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function unescapeHtml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function runAdversarialChallenge() {
  console.log('================================================================');
  console.log('  CHALLENGER M1: Empirical Parity & SSG Output Verification');
  console.log('================================================================\n');

  const server = await createServer({ server: { middlewareMode: true } });

  let totalChecks = 0;
  let passedChecks = 0;
  let failures = [];

  function assert(condition, message, details = {}) {
    totalChecks++;
    if (condition) {
      passedChecks++;
    } else {
      failures.push({ message, ...details });
      console.error(`  [FAIL] ${message}`);
      if (Object.keys(details).length > 0) {
        console.error('         Details:', JSON.stringify(details));
      }
    }
  }

  try {
    // -------------------------------------------------------------
    // 1. DATA SOURCE VERIFICATION (Git Baseline vs Current courses.ts)
    // -------------------------------------------------------------
    console.log('[1/5] Verifying Baseline Integrity (courses.ts vs 6320031~1)...');
    const gitCourses = execSync('git show 6320031~1:src/data/courses.ts', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const currentCoursesFile = fs.readFileSync(path.join(ROOT, 'src', 'data', 'courses.ts'), 'utf8');

    // Load current courses.ts in Vite
    const { COURSES } = await server.ssrLoadModule('./src/data/courses.ts');
    assert(Array.isArray(COURSES) && COURSES.length === 1, 'COURSES array loaded from src/data/courses.ts');
    const originalCourse = COURSES[0];
    const allOriginalLessons = originalCourse.modules.flatMap(m => m.lessons);
    assert(allOriginalLessons.length === 37, `Expected 37 lessons in COURSES, found ${allOriginalLessons.length}`);

    // Verify git baseline had same 37 lesson slugs and IDs
    const gitLessonIdMatches = [...gitCourses.matchAll(/id:\s*'(sb-\d+-\d+)'/g)].map(m => m[1]);
    const currentLessonIdMatches = [...currentCoursesFile.matchAll(/id:\s*'(sb-\d+-\d+)'/g)].map(m => m[1]);
    assert(
      JSON.stringify(gitLessonIdMatches) === JSON.stringify(currentLessonIdMatches),
      'Lesson ID list in git pre-split commit exactly matches current courses.ts',
      { gitCount: gitLessonIdMatches.length, currentCount: currentLessonIdMatches.length }
    );

    // -------------------------------------------------------------
    // 2. 37-LESSON GRANULAR FIDELITY & MISSING FIELDS CHECK
    // -------------------------------------------------------------
    console.log('\n[2/5] Comparing all 37 lessons between courses.ts and split files...');
    const { getLesson, getAllSyllabi, getCatalog } = await server.ssrLoadModule('./src/data/loader.ts');

    for (const [idx, orig] of allOriginalLessons.entries()) {
      const slug = orig.slug;
      const lessonFilePath = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'lessons', `${slug}.ts`);
      
      assert(fs.existsSync(lessonFilePath), `Lesson file exists: ${slug}.ts`);

      let splitMod;
      try {
        splitMod = await server.ssrLoadModule(`./src/data/courses/springboard-ux/lessons/${slug}.ts`);
      } catch (err) {
        assert(false, `Failed to load module for ${slug}: ${err.message}`);
        continue;
      }

      const split = splitMod.LESSON || splitMod.default;
      assert(!!split, `Export LESSON exists in ${slug}.ts`);

      const loaded = await getLesson('springboard-ux', slug);
      assert(!!loaded, `loader.getLesson("springboard-ux", "${slug}") returns non-null`);

      // Compare all scalar fields
      const scalarFields = [
        'id', 'slug', 'title', 'module', 'unitNumber', 'lessonNumber',
        'type', 'readTime', 'originalSourceUrl', 'originalSourceLabel',
        'youtubeId', 'summaryQuote'
      ];

      for (const field of scalarFields) {
        if (orig[field] !== undefined || split[field] !== undefined) {
          assert(
            orig[field] === split[field],
            `[${orig.id}] Field '${field}' matches between courses.ts and split`,
            { field, orig: orig[field], split: split[field] }
          );
          assert(
            orig[field] === loaded[field],
            `[${orig.id}] Field '${field}' matches loader output`,
            { field, orig: orig[field], loaded: loaded[field] }
          );
        }
      }

      // Explicit Check for required/optional fields
      assert(typeof split.summaryQuote === 'string' && split.summaryQuote.length > 0, `[${orig.id}] summaryQuote is non-empty string`);
      assert(Array.isArray(split.outline) && split.outline.length > 0, `[${orig.id}] outline is non-empty array`);

      // Deep compare outline
      assert(
        JSON.stringify(orig.outline) === JSON.stringify(split.outline),
        `[${orig.id}] outline deep equality`,
        { origLen: orig.outline?.length, splitLen: split.outline?.length }
      );
      assert(
        JSON.stringify(orig.outline) === JSON.stringify(loaded.outline),
        `[${orig.id}] outline deep equality in loader`
      );

      // Deep compare videoTimestamps
      if (orig.videoTimestamps !== undefined) {
        assert(Array.isArray(split.videoTimestamps), `[${orig.id}] videoTimestamps exists in split as array`);
        assert(
          JSON.stringify(orig.videoTimestamps) === JSON.stringify(split.videoTimestamps),
          `[${orig.id}] videoTimestamps deep equality`,
          { origCount: orig.videoTimestamps.length, splitCount: split.videoTimestamps?.length }
        );
        assert(
          JSON.stringify(orig.videoTimestamps) === JSON.stringify(loaded.videoTimestamps),
          `[${orig.id}] videoTimestamps deep equality in loader`
        );
      } else {
        assert(split.videoTimestamps === undefined, `[${orig.id}] videoTimestamps is correctly undefined in non-video lesson`);
      }

      // Compare contentHtml
      assert(typeof split.contentHtml === 'string' && split.contentHtml.length > 0, `[${orig.id}] contentHtml is non-empty`);
      const origHtmlHash = sha256(orig.contentHtml);
      const splitHtmlHash = sha256(split.contentHtml);
      const loadedHtmlHash = sha256(loaded.contentHtml);

      assert(
        orig.contentHtml.length === split.contentHtml.length,
        `[${orig.id}] contentHtml length matches (${orig.contentHtml.length} chars)`,
        { origLen: orig.contentHtml.length, splitLen: split.contentHtml.length }
      );

      assert(
        origHtmlHash === splitHtmlHash,
        `[${orig.id}] contentHtml SHA256 matches exactly`,
        { origHash: origHtmlHash, splitHash: splitHtmlHash }
      );

      assert(
        origHtmlHash === loadedHtmlHash,
        `[${orig.id}] contentHtml SHA256 matches loader`,
        { origHash: origHtmlHash, loadedHash: loadedHtmlHash }
      );

      // Verify no extra or missing keys
      const origKeys = Object.keys(orig).sort();
      const splitKeys = Object.keys(split).sort();
      assert(
        JSON.stringify(origKeys) === JSON.stringify(splitKeys),
        `[${orig.id}] keys set matches exactly`,
        { origKeys, splitKeys }
      );
    }

    // -------------------------------------------------------------
    // 3. TRANSCRIPT SPLITTING & PARITY CHECK
    // -------------------------------------------------------------
    console.log('\n[3/5] Verifying 16 Transcripts parity...');
    const monolithicTranscriptsPath = path.join(ROOT, 'src', 'data', 'transcripts.json');
    assert(fs.existsSync(monolithicTranscriptsPath), 'transcripts.json exists');
    const monolithicTranscripts = JSON.parse(fs.readFileSync(monolithicTranscriptsPath, 'utf8'));

    const { getTranscript, getVideoTranscript } = await server.ssrLoadModule('./src/data/loader.ts');

    const transcriptVideoIds = Object.keys(monolithicTranscripts);
    assert(transcriptVideoIds.length === 16, `Expected 16 video transcripts, found ${transcriptVideoIds.length}`);

    for (const yid of transcriptVideoIds) {
      const singlePath = path.join(ROOT, 'src', 'data', 'transcripts', `${yid}.json`);
      assert(fs.existsSync(singlePath), `Single transcript JSON exists: transcripts/${yid}.json`);

      const singleData = JSON.parse(fs.readFileSync(singlePath, 'utf8'));
      const origData = monolithicTranscripts[yid];

      assert(
        JSON.stringify(origData) === JSON.stringify(singleData),
        `Transcript ${yid} exact JSON parity`,
        { origCues: origData.segments?.length, splitCues: singleData.segments?.length }
      );

      // Check loader functions
      const loadedCues = await getTranscript(yid);
      assert(Array.isArray(loadedCues) && loadedCues.length === origData.segments.length, `getTranscript("${yid}") returns cues array`);
      assert(
        JSON.stringify(origData.segments) === JSON.stringify(loadedCues),
        `getTranscript("${yid}") cues match exactly`
      );

      const loadedVideoTranscript = await getVideoTranscript(yid);
      assert(
        JSON.stringify(origData) === JSON.stringify(loadedVideoTranscript),
        `getVideoTranscript("${yid}") matches entire record`
      );
    }

    // -------------------------------------------------------------
    // 4. SYLLABUS & CATALOG DATA CHECK
    // -------------------------------------------------------------
    console.log('\n[4/5] Verifying Syllabus & Catalog contracts...');
    const syllabusPath = path.join(ROOT, 'src', 'data', 'courses', 'springboard-ux', 'syllabus.ts');
    assert(fs.existsSync(syllabusPath), 'syllabus.ts exists');
    const { SYLLABUS } = await server.ssrLoadModule('./src/data/courses/springboard-ux/syllabus.ts');

    assert(SYLLABUS.id === originalCourse.id, 'Syllabus ID matches');
    assert(SYLLABUS.slug === originalCourse.slug, 'Syllabus slug matches');
    assert(SYLLABUS.title === originalCourse.title, 'Syllabus title matches');
    assert(SYLLABUS.modules.length === originalCourse.modules.length, 'Syllabus module count matches');

    // Verify syllabus lessons DO NOT have heavy contentHtml or outline
    for (const mod of SYLLABUS.modules) {
      for (const les of mod.lessons) {
        assert(les.contentHtml === undefined, `Syllabus lesson ${les.id} must NOT have contentHtml`);
        assert(les.outline === undefined, `Syllabus lesson ${les.id} must NOT have outline`);
      }
    }

    // Verify Catalog
    const catalogPath = path.join(ROOT, 'src', 'data', 'catalog.ts');
    assert(fs.existsSync(catalogPath), 'catalog.ts exists');
    const { CATALOG_COURSES } = await server.ssrLoadModule('./src/data/catalog.ts');
    assert(Array.isArray(CATALOG_COURSES) && CATALOG_COURSES.length === 1, 'CATALOG_COURSES has 1 course');
    const catalog0 = CATALOG_COURSES[0];
    assert(catalog0.id === originalCourse.id, 'Catalog course ID matches');
    assert(catalog0.modules === undefined, 'Catalog summary must NOT contain modules array');

    // -------------------------------------------------------------
    // 5. SSG DIST HTML OUTPUT VERIFICATION
    // -------------------------------------------------------------
    console.log('\n[5/5] Verifying SSG output in dist/courses/springboard-ux/*/index.html...');
    const distDir = path.join(ROOT, 'dist', 'courses', 'springboard-ux');
    assert(fs.existsSync(distDir), 'dist/courses/springboard-ux directory exists');

    for (const orig of allOriginalLessons) {
      const slug = orig.slug;
      const htmlFile = path.join(distDir, slug, 'index.html');
      assert(fs.existsSync(htmlFile), `HTML file exists for lesson: ${slug}/index.html`);

      const rawHtml = fs.readFileSync(htmlFile, 'utf8');
      const html = unescapeHtml(rawHtml);
      assert(rawHtml.length > 5000, `HTML size > 5000 bytes (actual: ${rawHtml.length} bytes) for ${slug}`);
      assert(rawHtml.includes('</html>'), `HTML has closing </html> tag (no truncation) for ${slug}`);

      // Verify Title
      assert(html.includes(orig.title), `HTML contains lesson title: "${orig.title.slice(0, 30)}..." in ${slug}`);

      // Verify summary quote (escaped or verbatim)
      const cleanQuotePart = orig.summaryQuote.slice(0, 30).trim();
      assert(html.includes(cleanQuotePart), `HTML contains summaryQuote snippet for ${slug}`);

      // Verify all outline headings exist in HTML
      if (orig.outline && orig.outline.length > 0) {
        for (const out of orig.outline) {
          // Check for heading title or slug id
          assert(
            html.includes(out.id) || html.includes(out.title) || rawHtml.includes(out.id),
            `HTML contains outline heading "${out.title}" or id "${out.id}" for ${slug}`
          );
        }
      }

      // If video, verify video player and cues
      if (orig.youtubeId) {
        assert(
          html.includes('id="video-player"') || html.includes('id="transcript-view"') || html.includes('aspect-video'),
          `Video lesson ${slug} contains video container/player`
        );
        assert(
          html.includes('data-timestamp='),
          `Video lesson ${slug} contains data-timestamp cues`
        );
      }

      // Check for common error strings in generated HTML
      assert(!html.includes('undefined') || !html.includes('>undefined<'), `No literal ">undefined<" in ${slug}`);
      assert(!html.includes('[object Object]'), `No "[object Object]" rendered in ${slug}`);
      assert(!html.includes('NaN'), `No literal NaN rendered in ${slug}`);
    }

  } finally {
    await server.close();
  }

  console.log('\n================================================================');
  console.log(`  VERIFICATION RESULTS: ${passedChecks} / ${totalChecks} checks PASSED`);
  if (failures.length > 0) {
    console.error(`  FAILURES DETECTED: ${failures.length}`);
    console.log('================================================================\n');
    process.exit(1);
  } else {
    console.log('  SUCCESS: All empirical checks passed with 100% parity!');
    console.log('================================================================\n');
  }
}

runAdversarialChallenge().catch(e => {
  console.error('Fatal error in challenger test:', e);
  process.exit(1);
});
