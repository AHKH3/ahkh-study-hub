import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const distDir = path.join(ROOT, 'dist');

async function runEmpiricalChallenge() {
  console.log('================================================================');
  console.log('  CHALLENGER M2: Empirical Prefetch & Link Scope Verification');
  console.log('================================================================\n');

  let totalChecks = 0;
  let passedChecks = 0;
  const failures = [];

  function assert(condition, message, details = {}) {
    totalChecks++;
    if (condition) {
      passedChecks++;
    } else {
      failures.push({ message, ...details });
      console.error(`  [FAIL] ${message}`, Object.keys(details).length ? details : '');
    }
  }

  // 1. Gather all HTML files in dist/
  const htmlFiles = [];
  function walk(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (full.endsWith('.html')) htmlFiles.push(full);
    }
  }
  walk(distDir);

  console.log(`[1] Scanning dist directory... found ${htmlFiles.length} HTML files.`);
  assert(htmlFiles.length === 42, `Exactly 42 HTML files should be compiled in dist (got ${htmlFiles.length})`);

  // Helper to parse static DOM tags (ignoring inline <script> and <style> template strings)
  function parseDomAnchors(html) {
    const domHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    const anchors = [];
    const aRegex = /<a\b([^>]*?)>([\s\S]*?)<\/a>|<a\b([^>]*?)\/?>/gi;
    let match;
    while ((match = aRegex.exec(domHtml)) !== null) {
      const attrsStr = match[1] || match[3] || '';
      const content = match[2] || '';
      const attrs = {};
      const attrRegex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let m;
      while ((m = attrRegex.exec(attrsStr)) !== null) {
        if (m[1].toLowerCase() !== 'a') {
          attrs[m[1]] = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : true));
        }
      }
      anchors.push({
        rawTag: match[0],
        attrsStr,
        attrs,
        content: content.trim(),
        href: attrs.href || '',
        prefetch: attrs['data-astro-prefetch'],
        id: attrs.id,
      });
    }
    return anchors;
  }

  // Tracking counts
  let totalAnchors = 0;
  let totalInternal = 0;
  let totalExternal = 0;
  let totalHash = 0;
  let totalInternalWithHoverPrefetch = 0;
  let totalInternalWithOtherPrefetch = 0;
  let totalExternalWithPrefetch = 0;
  let totalHashWithPrefetch = 0;

  const perFileStats = new Map();

  for (const file of htmlFiles) {
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const anchors = parseDomAnchors(content);

    let internal = 0;
    let external = 0;
    let hash = 0;
    let prefetchHover = 0;

    for (const a of anchors) {
      totalAnchors++;
      const href = a.href;
      const isExternal = /^(https?:|\/\/|mailto:|tel:)/i.test(href);
      const isHash = href.startsWith('#') || href === '';

      if (isExternal) {
        totalExternal++;
        external++;
        if (a.prefetch !== undefined) {
          totalExternalWithPrefetch++;
          assert(false, `External link must not have data-astro-prefetch in ${relPath}`, { tag: a.rawTag });
        }
      } else if (isHash) {
        totalHash++;
        hash++;
        if (a.prefetch !== undefined) {
          totalHashWithPrefetch++;
          assert(false, `Hash link must not have data-astro-prefetch in ${relPath}`, { tag: a.rawTag });
        }
      } else {
        totalInternal++;
        internal++;
        if (a.prefetch === 'hover') {
          totalInternalWithHoverPrefetch++;
          prefetchHover++;
        } else if (a.prefetch !== undefined) {
          totalInternalWithOtherPrefetch++;
        }
      }
    }

    perFileStats.set(relPath, {
      anchors,
      internal,
      external,
      hash,
      prefetchHover,
    });
  }

  console.log('\n--- Link Analysis Summary ---');
  console.log(`Total static DOM anchor tags: ${totalAnchors}`);
  console.log(`Internal links: ${totalInternal}`);
  console.log(`External links: ${totalExternal}`);
  console.log(`Hash/Anchor links: ${totalHash}`);
  console.log(`Internal links with explicit data-astro-prefetch="hover": ${totalInternalWithHoverPrefetch}`);
  console.log(`Internal links with other prefetch: ${totalInternalWithOtherPrefetch}`);
  console.log(`External links with prefetch (MUST BE 0): ${totalExternalWithPrefetch}`);
  console.log(`Hash links with prefetch (MUST BE 0): ${totalHashWithPrefetch}`);

  assert(totalExternalWithPrefetch === 0, 'Zero external links have data-astro-prefetch');
  assert(totalHashWithPrefetch === 0, 'Zero hash links have data-astro-prefetch');

  // 2. Specific Route Checks

  // A. Library Index (index.html)
  console.log('\n[2A] Checking Library Index (index.html)...');
  const indexStats = perFileStats.get('index.html');
  assert(!!indexStats, 'index.html exists in stats');
  if (indexStats) {
    const courseCardLinks = indexStats.anchors.filter((a) => a.href.includes('/courses/'));
    assert(courseCardLinks.length >= 1, `Course cards present on library index (found ${courseCardLinks.length})`);
    for (const card of courseCardLinks) {
      assert(card.prefetch === 'hover', `Course card link ${card.href} has data-astro-prefetch="hover"`);
    }

    // Check manifesto link in body
    const bodyManifestoLink = indexStats.anchors.find((a) => a.href.includes('/manifesto') && a.attrs.class?.includes('font-ui'));
    assert(!!bodyManifestoLink, 'Body manifesto link exists on library index');
    if (bodyManifestoLink) {
      assert(bodyManifestoLink.prefetch === 'hover', 'Body manifesto link has data-astro-prefetch="hover"');
    }
  }

  // B. Course Syllabus Overview (courses/springboard-ux/index.html)
  console.log('\n[2B] Checking Course Syllabus Overview...');
  const syllabusStats = perFileStats.get('courses/springboard-ux/index.html');
  assert(!!syllabusStats, 'courses/springboard-ux/index.html exists in stats');
  if (syllabusStats) {
    // Lesson card links
    const lessonLinks = syllabusStats.anchors.filter((a) => a.href.includes('/courses/springboard-ux/') && !a.href.endsWith('/courses/springboard-ux/'));
    assert(lessonLinks.length === 37, `Syllabus contains all 37 lesson links (found ${lessonLinks.length})`);
    let lessonPrefetchCount = 0;
    for (const l of lessonLinks) {
      if (l.prefetch === 'hover') lessonPrefetchCount++;
    }
    assert(lessonPrefetchCount === 37, `All 37 syllabus lesson links have data-astro-prefetch="hover" (got ${lessonPrefetchCount}/37)`);

    // Return to library links (header + footer)
    const libraryReturnLinks = syllabusStats.anchors.filter((a) => a.href.endsWith('/ahkh-study-hub') || a.href.endsWith('/ahkh-study-hub/'));
    assert(libraryReturnLinks.length >= 2, `Syllabus has return to library links (found ${libraryReturnLinks.length})`);
    for (const rl of libraryReturnLinks) {
      assert(rl.prefetch === 'hover', `Return to library link has data-astro-prefetch="hover"`);
    }
  }

  // C. Lesson Pages (37 lesson HTML files)
  console.log('\n[2C] Checking all 37 Lesson Pages...');
  const lessonFiles = htmlFiles.filter((f) => {
    const rel = path.relative(distDir, f).replace(/\\/g, '/');
    const parts = rel.split('/');
    // Pattern: courses/springboard-ux/<lesson-slug>/index.html
    return parts.length === 4 && parts[0] === 'courses' && parts[1] === 'springboard-ux' && parts[3] === 'index.html';
  });
  assert(lessonFiles.length === 37, `Exactly 37 lesson HTML files found (got ${lessonFiles.length})`);

  let lessonsChecked = 0;
  let totalPrevButtons = 0;
  let totalNextButtons = 0;
  let totalJourneyLinks = 0;
  let lastLessonCommonplaceFound = false;

  for (const lf of lessonFiles) {
    const rel = path.relative(distDir, lf).replace(/\\/g, '/');
    const stats = perFileStats.get(rel);
    assert(!!stats, `Stats exist for lesson ${rel}`);
    if (!stats) continue;

    lessonsChecked++;

    // 1. Course journey back links in smart header & milestone action bar
    const journeyLinks = stats.anchors.filter((a) => a.href.endsWith('/courses/springboard-ux') || a.href.endsWith('/courses/springboard-ux/'));
    assert(journeyLinks.length >= 1, `Lesson ${rel} has at least 1 return to course journey link (found ${journeyLinks.length})`);
    for (const jl of journeyLinks) {
      totalJourneyLinks++;
      assert(jl.prefetch === 'hover', `Journey link in ${rel} has data-astro-prefetch="hover"`);
    }

    // 2. Prev lesson button
    const prevBtn = stats.anchors.find((a) => a.id === 'prev-lesson-card-btn');
    if (prevBtn) {
      totalPrevButtons++;
      assert(prevBtn.prefetch === 'hover', `Prev lesson button in ${rel} has data-astro-prefetch="hover"`);
      assert(prevBtn.href.includes('/courses/springboard-ux/'), `Prev button href points to valid lesson in ${rel}`);
    }

    // 3. Next lesson button
    const nextBtn = stats.anchors.find((a) => a.id === 'next-lesson-card-btn');
    if (nextBtn) {
      totalNextButtons++;
      assert(nextBtn.prefetch === 'hover', `Next lesson button in ${rel} has data-astro-prefetch="hover"`);
      assert(nextBtn.href.includes('/courses/springboard-ux/'), `Next button href points to valid lesson in ${rel}`);
    }

    // 4. Commonplace link on the final lesson
    const commonplaceLink = stats.anchors.find((a) => a.href.includes('/commonplace'));
    if (commonplaceLink) {
      lastLessonCommonplaceFound = true;
      assert(commonplaceLink.prefetch === 'hover', `Commonplace link in ${rel} has data-astro-prefetch="hover"`);
    }
  }

  console.log(`Checked ${lessonsChecked} lesson files.`);
  console.log(`Total Journey links across 37 lessons: ${totalJourneyLinks}`);
  console.log(`Total Prev buttons found across 37 lessons: ${totalPrevButtons} (expected 36)`);
  console.log(`Total Next buttons found across 37 lessons: ${totalNextButtons} (expected 36)`);
  console.log(`Commonplace link on final lesson found: ${lastLessonCommonplaceFound}`);
  assert(totalPrevButtons === 36, 'Exactly 36 lessons have a previous lesson button (first lesson sb-1-0 has none)');
  assert(totalNextButtons === 36, 'Exactly 36 lessons have a next lesson button (last lesson sb-8-4 has none)');
  assert(lastLessonCommonplaceFound, 'Final lesson displays the commonplace review link');

  // 3. Verify Astro prefetch bundling and script inclusion in <head>
  console.log('\n[3] Verifying Astro prefetch runtime script in <head> of all pages...');
  
  let pagesWithClientRouterScript = 0;
  const scriptSrcs = new Set();

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Extract <head>...</head>
    const headMatch = content.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
    assert(!!headMatch, `Page ${rel} must have a <head> tag`);
    if (!headMatch) continue;

    const headContent = headMatch[1];
    // Check script tags in head
    const scriptRegex = /<script\b([^>]*?)>([\s\S]*?)<\/script>/gi;
    let sMatch;
    let hasClientRouter = false;

    while ((sMatch = scriptRegex.exec(headContent)) !== null) {
      const attrsStr = sMatch[1];
      const inlineCode = sMatch[2];
      
      const srcMatch = attrsStr.match(/src=["']([^"']*)["']/);
      if (srcMatch) {
        scriptSrcs.add(srcMatch[1]);
        if (srcMatch[1].includes('ClientRouter') || srcMatch[1].includes('page')) {
          hasClientRouter = true;
        }
      }
      if (attrsStr.includes('ClientRouter') || inlineCode.includes('ClientRouter') || inlineCode.includes('astro:page-load') || inlineCode.includes('prefetch')) {
        hasClientRouter = true;
      }
    }

    if (hasClientRouter || content.includes('ClientRouter')) pagesWithClientRouterScript++;
  }

  console.log(`Pages with ClientRouter script in head or body: ${pagesWithClientRouterScript}/42`);
  assert(pagesWithClientRouterScript === 42, 'All 42 pages include Astro ClientRouter script bundle');

  // Let's examine Astro's generated JS files in _astro/
  const astroAssetsDir = path.join(distDir, '_astro');
  const jsFiles = fs.readdirSync(astroAssetsDir).filter((f) => f.endsWith('.js'));
  console.log(`Found ${jsFiles.length} JS bundles in dist/_astro/`);

  let prefetchBundleFound = false;
  let prefetchHoverLogicFound = false;
  let prefetchAllLogicFound = false;

  for (const jsFile of jsFiles) {
    const jsContent = fs.readFileSync(path.join(astroAssetsDir, jsFile), 'utf8');
    if (jsContent.includes('prefetch') || jsContent.includes('data-astro-prefetch')) {
      prefetchBundleFound = true;
      console.log(`  Found prefetch code in _astro/${jsFile}`);
      if (jsContent.includes('hover') || jsContent.includes('mouseenter') || jsContent.includes('pointerenter') || jsContent.includes('focus')) {
        prefetchHoverLogicFound = true;
      }
      if (jsContent.includes('prefetchAll') || jsContent.includes('defaultStrategy') || jsContent.includes('initPrefetch')) {
        prefetchAllLogicFound = true;
      }
    }
  }

  assert(prefetchBundleFound, 'Astro prefetch runtime bundle exists in dist/_astro/');
  assert(prefetchHoverLogicFound, 'Prefetch hover/interaction handlers found in bundle');
  assert(prefetchAllLogicFound, 'Prefetch config/init logic found in bundle');

  // 4. Check internal link integrity
  console.log('\n[4] Checking internal link integrity (zero 404 targets)...');
  let validInternalHrefs = 0;
  let brokenInternalHrefs = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const stats = perFileStats.get(rel);
    for (const a of stats.anchors) {
      const href = a.href;
      if (/^(https?:|\/\/|mailto:|tel:|#)/i.test(href) || !href) continue;

      // Normalize internal href
      let cleanHref = href.replace(/^https?:\/\/[^\/]+/, '');
      cleanHref = cleanHref.replace(/^\/ahkh-study-hub/, '');
      const [pathname] = cleanHref.split('#')[0].split('?');

      let targetPath;
      if (pathname === '' || pathname === '/') {
        targetPath = path.join(distDir, 'index.html');
      } else {
        const withoutSlash = pathname.replace(/^\//, '').replace(/\/$/, '');
        targetPath = path.join(distDir, withoutSlash, 'index.html');
        if (!fs.existsSync(targetPath)) {
          targetPath = path.join(distDir, `${withoutSlash}.html`);
        }
      }

      if (fs.existsSync(targetPath)) {
        validInternalHrefs++;
      } else {
        brokenInternalHrefs++;
        assert(false, `Broken internal link in ${rel}: ${href} -> resolved to non-existent ${targetPath}`);
      }
    }
  }

  console.log(`Valid internal href targets verified: ${validInternalHrefs}`);
  console.log(`Broken internal href targets: ${brokenInternalHrefs}`);
  assert(brokenInternalHrefs === 0, 'Zero broken internal link targets across all compiled pages');

  console.log('\n================================================================');
  console.log(`  CHALLENGE RESULTS: ${passedChecks}/${totalChecks} checks passed`);
  console.log(`  FAILURES: ${failures.length}`);
  console.log('================================================================\n');

  if (failures.length > 0) {
    console.error('FAILURES SUMMARY:');
    for (const f of failures) {
      console.error(` - ${f.message}`);
    }
    process.exit(1);
  } else {
    console.log('ALL EMPIRICAL CHECKS PASSED WITH ZERO FAILURES!');
    process.exit(0);
  }
}

runEmpiricalChallenge().catch((err) => {
  console.error('Fatal challenge error:', err);
  process.exit(1);
});
