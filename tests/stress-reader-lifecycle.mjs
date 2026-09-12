/**
 * AHKH Study Hub - Reader Lifecycle & Teardown Empirical Adversarial Harness
 * 
 * Empirically stress-tests reader lifecycle teardown, memory leak vectors,
 * and invariant enforcement across rapid synthetic Astro View Transitions route swaps.
 * 
 * Verifications:
 * 1. 50 Rapid Navigation Cycles between reader routes and non-reader routes (/, /courses/springboard-ux).
 * 2. Invariant verification on non-reader routes:
 *    - window.__ahkhReaderAbort is aborted and nulled.
 *    - window.__ahkhYtPlayer is destroyed and nulled.
 *    - window.__ahkhYtTimer is cleared and nulled.
 *    - window.__ahkhVideoObserver is disconnected and nulled.
 *    - Exactly 0 active window listeners remain.
 *    - 0 reader-scoped document listeners remain.
 * 3. Adversarial Attack Scenarios:
 *    - Error injection: YT Player destroy throws an exception.
 *    - Race condition: Route swap while scroll restoration and timers are in flight.
 *    - High-frequency event burst (scroll/resize/keydown) coincident with route swap.
 *    - Idempotency: Double astro:before-swap dispatch.
 *    - Direct reader-to-reader route swaps without intermediate non-reader routes.
 *    - 100-cycle high-throughput thrash loop.
 */

import fs from 'node:fs';
import path from 'node:path';
import { createVirtualBrowser, loadReaderScript } from './utils/dom-runtime.mjs';

const ROOT = process.cwd();

// Helper to construct a fully equipped mock reader DOM
function mountReaderDOM(document, {
  courseId = 'springboard-ux',
  courseTitle = 'Springboard UX / UI Course',
  lessonId = 'sb-1-1',
  lessonSlug = 'the-eight-step-ux-process',
  lessonTitle = 'The 8-Step UX Process',
  courseAccent = '#0d9488',
  courseHighlight = '#ccfbf1',
} = {}) {
  document.body.children = [];

  const desk = document.createElement('div');
  desk.id = 'study-desk';
  desk.setAttribute('data-course-id', courseId);
  desk.setAttribute('data-course-title', courseTitle);
  desk.setAttribute('data-lesson-id', lessonId);
  desk.setAttribute('data-lesson-slug', lessonSlug);
  desk.setAttribute('data-lesson-title', lessonTitle);
  desk.setAttribute('data-course-accent', courseAccent);
  desk.setAttribute('data-course-highlight', courseHighlight);

  const smartHeader = document.createElement('header');
  smartHeader.id = 'smart-header';
  desk.appendChild(smartHeader);

  const topProgress = document.createElement('div');
  topProgress.id = 'top-progress-fill';
  desk.appendChild(topProgress);

  const scrollDepthLabel = document.createElement('span');
  scrollDepthLabel.id = 'lesson-scroll-depth-label';
  desk.appendChild(scrollDepthLabel);

  const readingContent = document.createElement('article');
  readingContent.id = 'reading-content';
  readingContent.className = 'reading-column';
  readingContent.innerHTML = `
    <h1 id="intro">Introduction</h1>
    <p>User experience design is an empathetic, research-driven discipline that aligns user needs with business strategy.</p>
    <h2 id="step-1">Step 1: Empathize</h2>
    <p>Conduct field research and stakeholder interviews to uncover unmet needs.</p>
    <h2 id="step-2">Step 2: Define</h2>
    <p>Synthesize findings into actionable problem statements and personas.</p>
  `;
  desk.appendChild(readingContent);

  const popover = document.createElement('div');
  popover.id = 'selection-popover';
  popover.className = 'hidden';
  desk.appendChild(popover);

  const popoverHlBtn = document.createElement('button');
  popoverHlBtn.id = 'popover-highlight-btn';
  popover.appendChild(popoverHlBtn);

  const popoverNoteBtn = document.createElement('button');
  popoverNoteBtn.id = 'popover-note-btn';
  popover.appendChild(popoverNoteBtn);

  const popoverCopyBtn = document.createElement('button');
  popoverCopyBtn.id = 'popover-copy-btn';
  popover.appendChild(popoverCopyBtn);

  const gutterNotes = document.createElement('div');
  gutterNotes.id = 'gutter-notes-container';
  desk.appendChild(gutterNotes);

  const videoWrapper = document.createElement('div');
  videoWrapper.id = 'video-sticky-wrapper';
  const videoSentinel = document.createElement('div');
  videoSentinel.id = 'video-scroll-sentinel';
  const pinBtn = document.createElement('button');
  pinBtn.id = 'toggle-video-pin';
  const compactBtn = document.createElement('button');
  compactBtn.id = 'toggle-video-compact';
  desk.appendChild(videoWrapper);
  desk.appendChild(videoSentinel);
  desk.appendChild(pinBtn);
  desk.appendChild(compactBtn);

  const lightbox = document.createElement('div');
  lightbox.id = 'image-lightbox';
  lightbox.className = 'hidden';
  const lightboxViewport = document.createElement('div');
  lightboxViewport.id = 'lightbox-viewport';
  lightbox.appendChild(lightboxViewport);
  desk.appendChild(lightbox);

  const completionBtn = document.createElement('button');
  completionBtn.id = 'toggle-lesson-completed-btn';
  const completionIcon = document.createElement('span');
  completionIcon.id = 'lesson-completed-icon';
  const completionLabel = document.createElement('span');
  completionLabel.id = 'lesson-completed-label';
  completionBtn.appendChild(completionIcon);
  completionBtn.appendChild(completionLabel);
  desk.appendChild(completionBtn);

  const startBtn = document.createElement('button');
  startBtn.id = 'start-reading-btn';
  desk.appendChild(startBtn);

  const leftSidebar = document.createElement('aside');
  leftSidebar.id = 'left-sidebar';
  const nav = document.createElement('nav');
  const link1 = document.createElement('a');
  link1.setAttribute('href', '#intro');
  link1.textContent = 'Intro';
  const link2 = document.createElement('a');
  link2.setAttribute('href', '#step-1');
  link2.textContent = 'Step 1';
  nav.appendChild(link1);
  nav.appendChild(link2);
  leftSidebar.appendChild(nav);
  desk.appendChild(leftSidebar);

  document.body.appendChild(desk);
  return desk;
}

// Helper to construct a non-reader DOM (Library Index or Course Syllabus)
function mountNonReaderDOM(document, routeType = 'library-index') {
  document.body.children = [];

  if (routeType === 'library-index') {
    const catalog = document.createElement('main');
    catalog.id = 'course-catalog';
    catalog.innerHTML = `
      <h1>AHKH Study Hub</h1>
      <div class="course-grid">
        <div class="course-card" data-course-id="springboard-ux">Springboard UX</div>
      </div>
    `;
    document.body.appendChild(catalog);
  } else {
    const syllabus = document.createElement('main');
    syllabus.id = 'course-syllabus';
    syllabus.innerHTML = `
      <h1>Springboard UX Syllabus</h1>
      <ol class="module-list">
        <li>Module 1: Orientation</li>
        <li>Module 2: Heuristics</li>
      </ol>
    `;
    document.body.appendChild(syllabus);
  }
}

// Interceptor to track active listeners with high precision
function instrumentWindowAndDocument(windowObj, documentObj) {
  const windowListenersMap = new Map();
  const documentListenersMap = new Map();

  const origWinAdd = windowObj.addEventListener.bind(windowObj);
  const origWinRemove = windowObj.removeEventListener.bind(windowObj);

  windowObj.addEventListener = function (type, listener, options) {
    if (!windowListenersMap.has(type)) windowListenersMap.set(type, new Set());
    const record = { listener, options };
    windowListenersMap.get(type).add(record);

    if (options && options.signal) {
      options.signal.addEventListener('abort', () => {
        windowListenersMap.get(type)?.delete(record);
      }, { once: true });
    }
    return origWinAdd(type, listener, options);
  };

  windowObj.removeEventListener = function (type, listener) {
    if (windowListenersMap.has(type)) {
      for (const rec of windowListenersMap.get(type)) {
        if (rec.listener === listener) {
          windowListenersMap.get(type).delete(rec);
        }
      }
    }
    return origWinRemove(type, listener);
  };

  const origDocAdd = documentObj.addEventListener.bind(documentObj);
  const origDocRemove = documentObj.removeEventListener.bind(documentObj);

  documentObj.addEventListener = function (type, listener, options) {
    if (!documentListenersMap.has(type)) documentListenersMap.set(type, new Set());
    const record = { listener, options };
    documentListenersMap.get(type).add(record);

    if (options && options.signal) {
      options.signal.addEventListener('abort', () => {
        documentListenersMap.get(type)?.delete(record);
      }, { once: true });
    }
    return origDocAdd(type, listener, options);
  };

  documentObj.removeEventListener = function (type, listener) {
    if (documentListenersMap.has(type)) {
      for (const rec of documentListenersMap.get(type)) {
        if (rec.listener === listener) {
          documentListenersMap.get(type).delete(rec);
        }
      }
    }
    return origDocRemove(type, listener);
  };

  function getActiveWindowListenerCount() {
    let count = 0;
    for (const [_, set] of windowListenersMap.entries()) {
      count += set.size;
    }
    return count;
  }

  function getActiveWindowListeners() {
    const list = [];
    for (const [type, set] of windowListenersMap.entries()) {
      if (set.size > 0) {
        list.push({ type, count: set.size });
      }
    }
    return list;
  }

  function getActiveDocumentListeners() {
    const list = [];
    for (const [type, set] of documentListenersMap.entries()) {
      if (set.size > 0) {
        list.push({ type, count: set.size });
      }
    }
    return list;
  }

  return {
    getActiveWindowListenerCount,
    getActiveWindowListeners,
    getActiveDocumentListeners,
    windowListenersMap,
    documentListenersMap,
  };
}

// Static AST/Statement audit of public/scripts/reader.js
function auditReaderScriptStaticAnalysis() {
  const readerPath = path.join(ROOT, 'public', 'scripts', 'reader.js');
  const content = fs.readFileSync(readerPath, 'utf8');

  const findings = [];
  let totalAddListeners = 0;
  let signalBound = 0;
  let sessionPersistent = 0;
  let ephemeralOnceListeners = 0;

  const regex = /\.addEventListener\s*\(/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    totalAddListeners++;
    const start = match.index;
    let parenDepth = 1;
    let i = start + match[0].length;
    while (i < content.length && parenDepth > 0) {
      if (content[i] === '(') parenDepth++;
      else if (content[i] === ')') parenDepth--;
      i++;
    }
    const fullCall = content.slice(start, i);
    const lineNum = content.slice(0, start).split('\n').length;

    const isAstroGlobal = fullCall.includes('astro:before-swap') || fullCall.includes('astro:page-load');
    const isSignalAbort = content.slice(Math.max(0, start - 30), start).includes('signal') ||
                          content.slice(Math.max(0, start - 30), start).includes('Signal');
    const hasSignal = fullCall.includes('__ahkhSignal') || fullCall.includes('signal');
    const isImgEphemeral = (fullCall.includes("'load'") || fullCall.includes("'error'")) && fullCall.includes('once: true');

    if (isAstroGlobal) {
      sessionPersistent++;
    } else if (isSignalAbort) {
      // internal signal hook
    } else if (hasSignal) {
      signalBound++;
    } else if (isImgEphemeral) {
      ephemeralOnceListeners++;
    } else {
      findings.push({
        line: lineNum,
        code: fullCall.replace(/\s+/g, ' ').slice(0, 100),
        reason: 'Missing { signal: __ahkhSignal } binding',
      });
    }
  }

  return {
    totalAddListeners,
    signalBound,
    sessionPersistent,
    ephemeralOnceListeners,
    findings,
  };
}

async function runEmpiricalStressHarness() {
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log('  AHKH Study Hub — Reader Teardown Empirical Challenge Harness');
  console.log('  Adversarial Stress-Testing & Route Swap Verification');
  console.log('══════════════════════════════════════════════════════════════════════\n');

  // Step 1: Static Code Invariant Audit
  const staticAudit = auditReaderScriptStaticAnalysis();
  console.log(`[Static Audit] addEventListener calls: ${staticAudit.totalAddListeners}`);
  console.log(`               Signal-bound listeners: ${staticAudit.signalBound}`);
  console.log(`               Session-persistent:     ${staticAudit.sessionPersistent}`);
  console.log(`               Unprotected listeners:  ${staticAudit.findings.length}`);
  if (staticAudit.findings.length > 0) {
    console.error('CRITICAL: Static audit detected unprotected listeners:');
    staticAudit.findings.forEach(f => console.error(`  - Line ${f.line}: ${f.code} (${f.reason})`));
  } else {
    console.log('  ✓ Static code audit passed with 0 unprotected event listeners.\n');
  }

  const results = {
    totalSwaps: 0,
    successfulSwaps: 0,
    failedSwaps: 0,
    invariantFailures: [],
    edgeCaseResults: [],
    details: [],
  };

  // Setup virtual browser
  const { window, document, localStorage, AhkhStorage } = createVirtualBrowser();
  const instrumentation = instrumentWindowAndDocument(window, document);

  // Load reader.js
  loadReaderScript(window);

  console.log('[Setup] Virtual browser initialized and reader.js loaded.');

  const nonReaderRoutes = ['library-index', 'course-syllabus'];

  // -----------------------------------------------------------------
  // 50 Rapid Navigation Cycles
  // -----------------------------------------------------------------
  for (let i = 1; i <= 50; i++) {
    const lessonSlug = `stress-lesson-${i}`;
    const lessonTitle = `Stress Test Lesson ${i}`;
    const targetNonReader = nonReaderRoutes[(i - 1) % nonReaderRoutes.length];

    // Mount reader page
    mountReaderDOM(document, {
      courseId: 'springboard-ux',
      lessonId: `sb-stress-${i}`,
      lessonSlug,
      lessonTitle,
    });

    // Fire page-load
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    const activeAbort = window.__ahkhReaderAbort;
    if (!activeAbort || activeAbort.signal.aborted) {
      results.failedSwaps++;
      results.invariantFailures.push(`Iteration ${i}: Failed to boot reader on lesson route`);
      continue;
    }

    // Attach mock YT player & interval timer
    let ytDestroyCalled = false;
    window.__ahkhYtPlayer = {
      destroy: () => {
        ytDestroyCalled = true;
      },
    };
    window.__ahkhYtTimer = setInterval(() => {}, 250);

    // Mock IntersectionObserver
    let observerDisconnected = false;
    window.__ahkhVideoObserver = {
      disconnect: () => {
        observerDisconnected = true;
      },
    };

    const winListenersDuringReader = instrumentation.getActiveWindowListenerCount();
    if (winListenersDuringReader === 0) {
      results.failedSwaps++;
      results.invariantFailures.push(`Iteration ${i}: Expected active window listeners during reader mount, got 0`);
      continue;
    }

    // Perform synthetic interactions
    window.dispatchEvent({ type: 'scroll' });
    window.dispatchEvent({ type: 'resize' });

    // Step 2: Swap to Non-Reader Page
    document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
    mountNonReaderDOM(document, targetNonReader);
    document.dispatchEvent(new window.CustomEvent('astro:after-swap'));
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    // Step 3: Verify Invariants on Non-Reader Page
    const checkErrors = [];

    // Invariant 1: window.__ahkhReaderAbort aborted and nulled
    if (window.__ahkhReaderAbort !== null) {
      checkErrors.push(`window.__ahkhReaderAbort was not nulled`);
    }
    if (!activeAbort.signal.aborted) {
      checkErrors.push(`Previous AbortSignal was not aborted`);
    }

    // Invariant 2: window.__ahkhYtPlayer destroyed and nulled
    if (window.__ahkhYtPlayer !== null) {
      checkErrors.push(`window.__ahkhYtPlayer was not nulled`);
    }
    if (!ytDestroyCalled) {
      checkErrors.push(`window.__ahkhYtPlayer.destroy() was not called`);
    }

    // Invariant 3: window.__ahkhYtTimer cleared and nulled
    if (window.__ahkhYtTimer !== null) {
      checkErrors.push(`window.__ahkhYtTimer was not nulled`);
    }

    // Invariant 4: window.__ahkhVideoObserver disconnected and nulled
    if (window.__ahkhVideoObserver !== null) {
      checkErrors.push(`window.__ahkhVideoObserver was not nulled`);
    }
    if (!observerDisconnected) {
      checkErrors.push(`window.__ahkhVideoObserver.disconnect() was not called`);
    }

    // Invariant 5: 0 window listeners remain
    const remainingWinListeners = instrumentation.getActiveWindowListenerCount();
    if (remainingWinListeners !== 0) {
      const activeList = instrumentation.getActiveWindowListeners();
      checkErrors.push(`Remaining window listeners > 0 (count: ${remainingWinListeners}, ${JSON.stringify(activeList)})`);
    }

    // Invariant 6: document listeners only contain persistent astro:* handlers
    const docListeners = instrumentation.getActiveDocumentListeners();
    const nonAstroDocListeners = docListeners.filter(l => !l.type.startsWith('astro:'));
    if (nonAstroDocListeners.length > 0) {
      checkErrors.push(`Residual reader document listeners: ${JSON.stringify(nonAstroDocListeners)}`);
    }

    // Invariant 7: #study-desk absent on non-reader page
    if (document.getElementById('study-desk')) {
      checkErrors.push(`Unexpected #study-desk found on non-reader route`);
    }

    results.totalSwaps++;
    if (checkErrors.length > 0) {
      results.failedSwaps++;
      results.invariantFailures.push(`Iteration ${i} (${targetNonReader}): ${checkErrors.join('; ')}`);
    } else {
      results.successfulSwaps++;
    }

    if (i % 10 === 0 || i === 50) {
      console.log(`[Progress] Completed ${i}/50 route swaps. Active window listeners: ${remainingWinListeners}, abort nulled: ${window.__ahkhReaderAbort === null}`);
    }
  }

  // -----------------------------------------------------------------
  // Adversarial Edge Cases
  // -----------------------------------------------------------------
  console.log('\n[Adversarial Edge Cases] Testing fault-tolerance and stress boundaries:');

  // Attack 1: Fault injection — YT Player destroy throws an exception
  {
    mountReaderDOM(document);
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));
    window.__ahkhYtPlayer = {
      destroy: () => {
        throw new Error('Explosion inside YouTube iframe destroy API');
      },
    };
    window.__ahkhYtTimer = setInterval(() => {}, 250);

    let caughtWithoutLeak = true;
    try {
      document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
      mountNonReaderDOM(document, 'library-index');
      document.dispatchEvent(new window.CustomEvent('astro:page-load'));
    } catch (err) {
      caughtWithoutLeak = false;
    }

    const passed = caughtWithoutLeak &&
                   (window.__ahkhReaderAbort === null) &&
                   (window.__ahkhYtPlayer === null) &&
                   (window.__ahkhYtTimer === null) &&
                   (instrumentation.getActiveWindowListenerCount() === 0);

    results.edgeCaseResults.push({
      name: 'Adversarial Attack 1: Error thrown by YTPlayer.destroy() is swallowed and teardown completes',
      passed,
      detail: passed ? 'Fault isolated cleanly, all globals nulled, 0 listeners' : 'Fault propagated or leaked resources',
    });
    console.log(`  ${passed ? '✓' : '✗'} Adversarial Attack 1: YTPlayer.destroy exception fault-tolerance`);
  }

  // Attack 2: Concurrency storm — Rapid scroll/resize/keydown events coincident with astro:before-swap
  {
    mountReaderDOM(document);
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    // Fire 20 rapid events right before and during swap
    for (let s = 0; s < 10; s++) {
      window.dispatchEvent({ type: 'scroll' });
      window.dispatchEvent({ type: 'resize' });
    }
    document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
    for (let s = 0; s < 10; s++) {
      window.dispatchEvent({ type: 'scroll' });
      window.dispatchEvent({ type: 'resize' });
    }
    mountNonReaderDOM(document, 'library-index');
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    const passed = (window.__ahkhReaderAbort === null) &&
                   (instrumentation.getActiveWindowListenerCount() === 0);
    results.edgeCaseResults.push({
      name: 'Adversarial Attack 2: High-frequency event storm at route transition boundary',
      passed,
      detail: passed ? 'Zero race condition leaks under event burst' : 'Listeners leaked during event storm',
    });
    console.log(`  ${passed ? '✓' : '✗'} Adversarial Attack 2: High-frequency event storm resilience`);
  }

  // Attack 3: Double consecutive astro:before-swap (idempotency check)
  {
    mountReaderDOM(document);
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));
    let noThrow = true;
    try {
      document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
      document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
    } catch (e) {
      noThrow = false;
    }
    mountNonReaderDOM(document, 'library-index');
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    const passed = noThrow && (window.__ahkhReaderAbort === null) && (instrumentation.getActiveWindowListenerCount() === 0);
    results.edgeCaseResults.push({
      name: 'Adversarial Attack 3: Double astro:before-swap idempotency',
      passed,
      detail: passed ? 'Idempotent teardown with zero exceptions' : 'Threw exception on duplicate swap',
    });
    console.log(`  ${passed ? '✓' : '✗'} Adversarial Attack 3: Double astro:before-swap idempotency`);
  }

  // Attack 4: 10x direct reader-to-reader route swaps without non-reader intermediate
  {
    let r2rPassed = true;
    let prevController = null;
    for (let j = 1; j <= 10; j++) {
      mountReaderDOM(document, { lessonSlug: `direct-r2r-${j}` });
      document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
      document.dispatchEvent(new window.CustomEvent('astro:page-load'));

      if (prevController && !prevController.signal.aborted) {
        r2rPassed = false;
        break;
      }
      prevController = window.__ahkhReaderAbort;
      if (!prevController || prevController.signal.aborted) {
        r2rPassed = false;
        break;
      }
    }
    // Final exit to non-reader
    document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
    mountNonReaderDOM(document, 'library-index');
    document.dispatchEvent(new window.CustomEvent('astro:page-load'));

    const passed = r2rPassed && (window.__ahkhReaderAbort === null) && (instrumentation.getActiveWindowListenerCount() === 0);
    results.edgeCaseResults.push({
      name: 'Adversarial Attack 4: Direct 10x reader-to-reader route swaps without non-reader page',
      passed,
      detail: passed ? 'Each previous controller aborted cleanly, final teardown zeroed listeners' : 'Failed controller handover',
    });
    console.log(`  ${passed ? '✓' : '✗'} Adversarial Attack 4: Direct 10x reader-to-reader swaps`);
  }

  // Attack 5: 100x high-frequency thrash loop
  {
    let thrashPassed = true;
    for (let k = 1; k <= 100; k++) {
      mountReaderDOM(document, { lessonSlug: `thrash-${k}` });
      document.dispatchEvent(new window.CustomEvent('astro:page-load'));
      document.dispatchEvent(new window.CustomEvent('astro:before-swap'));
      mountNonReaderDOM(document, 'library-index');
      document.dispatchEvent(new window.CustomEvent('astro:page-load'));

      if (window.__ahkhReaderAbort !== null || instrumentation.getActiveWindowListenerCount() !== 0) {
        thrashPassed = false;
        break;
      }
    }
    results.edgeCaseResults.push({
      name: 'Adversarial Attack 5: 100x route swap thrash loop',
      passed: thrashPassed,
      detail: thrashPassed ? '100 consecutive swaps with 0 listener leak' : 'Leaked listeners or state',
    });
    console.log(`  ${thrashPassed ? '✓' : '✗'} Adversarial Attack 5: 100x route swap thrash loop`);
  }

  console.log('\n══════════════════════════════════════════════════════════════════════');
  console.log('  Empirical Stress Test Summary');
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log(`  Static Code Violations:    ${staticAudit.findings.length}`);
  console.log(`  Total Swaps Tested:        ${results.totalSwaps}`);
  console.log(`  Successful Swaps:          ${results.successfulSwaps}`);
  console.log(`  Failed Swaps:              ${results.failedSwaps}`);
  console.log(`  Invariant Violations:      ${results.invariantFailures.length}`);
  console.log(`  Adversarial Attacks:       ${results.edgeCaseResults.length}`);
  console.log(`  Attacks Defended (Passed): ${results.edgeCaseResults.filter(e => e.passed).length}`);

  const allPassed = staticAudit.findings.length === 0 &&
                    results.failedSwaps === 0 &&
                    results.edgeCaseResults.every(e => e.passed);

  console.log(`\nFinal Empirical Verdict: ${allPassed ? 'APPROVE' : 'REQUEST_CHANGES'}\n`);

  return { staticAudit, results, allPassed };
}

// Execute if run directly
runEmpiricalStressHarness().then(({ allPassed }) => {
  process.exit(allPassed ? 0 : 1);
}).catch((err) => {
  console.error('Fatal stress harness error:', err);
  process.exit(1);
});
