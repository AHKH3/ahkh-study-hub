#!/usr/bin/env node

/**
 * AHKH Study Hub - Challenger M2: Empirical Lifecycle & Event Listener Teardown Verification
 *
 * Requirements verified:
 * 1. Simulate 50 consecutive `astro:page-load` and `astro:before-swap` transition events.
 * 2. Confirm that event listeners on `window` and `document` do not accumulate indefinitely.
 * 3. Verify that `window.__ahkhAccordionAbort.signal.aborted` and `window.__ahkhLibAbort.signal.aborted`
 *    cleanly tear down listeners upon swap.
 * 4. Stress-test rapid transitions, re-navigation idempotency, and cross-course swaps.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();

// ANSI colors for clean reporting
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// =====================================================================
// 1. HIGH-PRECISION EVENT LISTENER TRACKER
// =====================================================================

class ListenerRegistry {
  constructor() {
    this.records = new Map(); // id -> record
    this.nextId = 1;
    this.history = [];
  }

  wrapTarget(target, targetName) {
    const origAdd = target.addEventListener.bind(target);
    const origRemove = target.removeEventListener.bind(target);
    const registry = this;

    target.addEventListener = function (type, listener, options) {
      const id = registry.nextId++;
      const once = typeof options === 'object' && !!options?.once;
      const signal = typeof options === 'object' ? options?.signal : null;

      const record = {
        id,
        targetName,
        type,
        listener,
        options,
        once,
        signal,
        active: true,
        addedAt: Date.now(),
      };
      registry.records.set(id, record);

      let wrappedListener = listener;

      if (once) {
        wrappedListener = function (...args) {
          record.active = false;
          registry.records.delete(id);
          registry.history.push({ action: 'once_consumed', id, type, targetName });
          return listener.apply(this, args);
        };
      }

      if (signal) {
        if (signal.aborted) {
          record.active = false;
          registry.records.delete(id);
          registry.history.push({ action: 'signal_pre_aborted', id, type, targetName });
          return;
        }
        signal.addEventListener(
          'abort',
          () => {
            if (record.active) {
              record.active = false;
              registry.records.delete(id);
              registry.history.push({ action: 'signal_aborted', id, type, targetName });
              origRemove(type, wrappedListener, options);
            }
          },
          { once: true }
        );
      }

      registry.history.push({ action: 'add', id, type, targetName });
      return origAdd(type, wrappedListener, options);
    };

    target.removeEventListener = function (type, listener, options) {
      for (const [id, r] of registry.records.entries()) {
        if (
          r.targetName === targetName &&
          r.type === type &&
          (r.listener === listener || r.wrappedListener === listener)
        ) {
          r.active = false;
          registry.records.delete(id);
          registry.history.push({ action: 'explicit_remove', id, type, targetName });
        }
      }
      return origRemove(type, listener, options);
    };
  }

  getActive(targetName, type) {
    return Array.from(this.records.values()).filter(
      (r) =>
        r.active &&
        (!targetName || r.targetName === targetName) &&
        (!type || r.type === type)
    );
  }

  getActiveCount(targetName, type) {
    return this.getActive(targetName, type).length;
  }
}

// =====================================================================
// 2. DOM & BROWSER MOCK RUNTIME
// =====================================================================

class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.dataset = {};
    this.listeners = new Map();
    this._classListSet = new Set();
    this.style = {
      gridTemplateRows: '',
      opacity: '',
      width: '',
      setProperty: () => {},
      getPropertyValue: () => '',
    };
    this._textContent = '';
    this.id = '';
    this.className = '';
  }

  get classList() {
    const self = this;
    return {
      add(...classes) {
        classes.forEach((c) => c && self._classListSet.add(c));
        self.className = Array.from(self._classListSet).join(' ');
      },
      remove(...classes) {
        classes.forEach((c) => c && self._classListSet.delete(c));
        self.className = Array.from(self._classListSet).join(' ');
      },
      contains(c) {
        return self._classListSet.has(c);
      },
      toggle(c, force) {
        const has = self._classListSet.has(c);
        const next = force !== undefined ? force : !has;
        if (next) self._classListSet.add(c);
        else self._classListSet.delete(c);
        self.className = Array.from(self._classListSet).join(' ');
        return next;
      },
    };
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  setAttribute(name, val) {
    const sVal = String(val);
    this.attributes.set(name, sVal);
    if (name === 'id') this.id = sVal;
    if (name === 'class') {
      this.className = sVal;
      this._classListSet = new Set(sVal.split(/\s+/).filter(Boolean));
    }
    if (name.startsWith('data-')) {
      const prop = name.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
      this.dataset[prop] = sVal;
    }
  }

  removeAttribute(name) {
    this.attributes.delete(name);
    if (name.startsWith('data-')) {
      const prop = name.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
      delete this.dataset[prop];
    }
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  append(...nodes) {
    nodes.forEach((n) => this.appendChild(n));
  }

  get childNodes() {
    return this.children;
  }

  get nodeType() {
    return this.tagName === '#TEXT' ? 3 : 1;
  }

  get textContent() {
    if (this.children.length === 0) return this._textContent;
    return this.children.map((c) => c.textContent).join('');
  }

  set textContent(v) {
    this.children = [];
    this._textContent = String(v);
  }

  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push({ listener, options });
  }

  removeEventListener(type, listener) {
    if (!this.listeners.has(type)) return;
    this.listeners.set(
      type,
      this.listeners.get(type).filter((r) => r.listener !== listener)
    );
  }

  dispatchEvent(event) {
    event.target = this;
    const arr = this.listeners.get(event.type) || [];
    for (const r of [...arr]) {
      r.listener.call(this, event);
    }
    return !event.defaultPrevented;
  }

  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }

  querySelectorAll(sel) {
    const res = [];
    const check = (node) => {
      if (node.matches && node.matches(sel)) res.push(node);
      for (const c of node.children) check(c);
    };
    check(this);
    return res;
  }

  matches(sel) {
    if (sel.startsWith('#')) return this.id === sel.slice(1);
    if (sel.startsWith('.')) return this.classList.contains(sel.slice(1));
    if (sel.startsWith('[') && sel.endsWith(']')) {
      const inner = sel.slice(1, -1);
      const [attr, val] = inner.split('=');
      if (!val) return this.attributes.has(attr);
      return this.getAttribute(attr) === val.replace(/["']/g, '');
    }
    return this.tagName.toLowerCase() === sel.toLowerCase();
  }
}

class MockDocument extends EventTarget {
  constructor() {
    super();
    this.documentElement = new MockElement('html');
    this.body = new MockElement('body');
    this.documentElement.appendChild(this.body);
    this.readyState = 'complete';
  }

  createElement(tag) {
    return new MockElement(tag);
  }

  createTextNode(text) {
    const t = new MockElement('#text');
    t.textContent = text;
    return t;
  }

  getElementById(id) {
    return this.documentElement.querySelector(`#${id}`);
  }

  querySelector(sel) {
    return this.documentElement.querySelector(sel);
  }

  querySelectorAll(sel) {
    return this.documentElement.querySelectorAll(sel);
  }
}

function createTestEnvironment(registry) {
  const document = new MockDocument();
  const windowTarget = new EventTarget();

  const localStorageStore = new Map();
  const localStorage = {
    getItem: (k) => (localStorageStore.has(k) ? localStorageStore.get(k) : null),
    setItem: (k, v) => localStorageStore.set(String(k), String(v)),
    removeItem: (k) => localStorageStore.delete(String(k)),
    clear: () => localStorageStore.clear(),
    key: (i) => Array.from(localStorageStore.keys())[i] || null,
    get length() {
      return localStorageStore.size;
    },
  };

  const AhkhStorage = {
    get: (k) => localStorage.getItem(k),
    set: (k, v) => localStorage.setItem(k, v),
    remove: (k) => localStorage.removeItem(k),
    key: (i) => localStorage.key(i),
    get size() {
      return localStorage.length;
    },
  };

  const win = {
    document,
    localStorage,
    AhkhStorage,
    location: { pathname: '/ahkh-study-hub/' },
    history: { pushState: () => {}, replaceState: () => {} },
    CustomEvent,
    Event,
    AbortController,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    console,
    Math,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Set,
    Map,
    addEventListener: windowTarget.addEventListener.bind(windowTarget),
    removeEventListener: windowTarget.removeEventListener.bind(windowTarget),
    dispatchEvent: windowTarget.dispatchEvent.bind(windowTarget),
  };

  win.window = win;
  win.globalThis = win;

  registry.wrapTarget(document, 'document');
  registry.wrapTarget(win, 'window');

  return { window: win, document, AhkhStorage, localStorage };
}

// =====================================================================
// 3. EXTRACT PRODUCTION INLINE SCRIPTS
// =====================================================================

function extractInlineScripts(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const scripts = [];
  const re = /<script\s+is:inline>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    scripts.push(m[1].trim());
  }
  return scripts;
}

const indexPath = path.join(ROOT, 'src', 'pages', 'index.astro');
const coursePath = path.join(ROOT, 'src', 'pages', 'courses', '[course]', 'index.astro');
const lessonPath = path.join(ROOT, 'src', 'pages', 'courses', '[course]', '[slug].astro');

const indexScripts = extractInlineScripts(indexPath);
const courseScripts = extractInlineScripts(coursePath);
const lessonScripts = extractInlineScripts(lessonPath);

// =====================================================================
// 4. DOM SEEDING HELPERS FOR REALISTIC LIFECYCLE
// =====================================================================

function seedIndexDOM(document) {
  document.body.children = [];
  const article = document.createElement('article');
  article.setAttribute('data-course-id', 'springboard-ux');
  article.setAttribute('data-lessons', 'lesson-1,lesson-2,lesson-3');
  
  const fill = document.createElement('div');
  fill.setAttribute('data-role', 'progress-fill');
  article.appendChild(fill);

  const label = document.createElement('span');
  label.setAttribute('class', 'progress-label');
  article.appendChild(label);

  const badge = document.createElement('span');
  badge.setAttribute('data-statusbadge', 'true');
  const dot = document.createElement('span');
  dot.setAttribute('data-statusdot', 'true');
  badge.appendChild(dot);
  badge.appendChild(document.createTextNode(' New'));
  article.appendChild(badge);

  document.body.appendChild(article);
}

function seedCourseDOM(document, courseSlug = 'springboard-ux') {
  document.body.children = [];

  const toggleAll = document.createElement('button');
  toggleAll.setAttribute('id', 'toggle-all-modules-btn');
  toggleAll.setAttribute('data-action', 'collapse');
  const toggleAllText = document.createElement('span');
  toggleAllText.setAttribute('id', 'toggle-all-text');
  toggleAllText.textContent = 'Collapse all';
  toggleAll.appendChild(toggleAllText);
  document.body.appendChild(toggleAll);

  for (let i = 1; i <= 3; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'module-toggle-btn');
    btn.setAttribute('data-module-id', `mod-${i}`);
    const chevron = document.createElement('span');
    chevron.setAttribute('class', 'chevron-icon rotate-180');
    btn.appendChild(chevron);
    document.body.appendChild(btn);

    const content = document.createElement('div');
    content.setAttribute('id', `module-content-mod-${i}`);
    document.body.appendChild(content);

    const lessonRow = document.createElement('div');
    lessonRow.setAttribute('data-lesson-row', 'true');
    lessonRow.setAttribute('data-lesson-slug', `lesson-${i}`);
    lessonRow.setAttribute('data-course-id', courseSlug);

    const bar = document.createElement('div');
    bar.setAttribute('data-lesson-bar', 'true');
    lessonRow.appendChild(bar);

    const num = document.createElement('span');
    num.setAttribute('data-lesson-num', 'true');
    lessonRow.appendChild(num);

    const title = document.createElement('span');
    title.setAttribute('data-lesson-title', 'true');
    lessonRow.appendChild(title);

    const lBadge = document.createElement('span');
    lBadge.setAttribute('data-lesson-badge', 'true');
    const lDot = document.createElement('span');
    lDot.setAttribute('data-statusdot', 'true');
    lBadge.appendChild(lDot);
    lessonRow.appendChild(lBadge);

    document.body.appendChild(lessonRow);
  }

  const badge = document.createElement('span');
  badge.setAttribute('data-statusbadge', 'true');
  const dot = document.createElement('span');
  dot.setAttribute('data-statusdot', 'true');
  badge.appendChild(dot);
  badge.appendChild(document.createTextNode(' New'));
  document.body.appendChild(badge);

  const fill = document.createElement('div');
  fill.setAttribute('data-role', 'progress-fill');
  document.body.appendChild(fill);

  const label = document.createElement('span');
  label.setAttribute('class', 'progress-label');
  document.body.appendChild(label);
}

function seedLessonDOM(document, courseId = 'springboard-ux', lessonSlug = 'lesson-1') {
  document.body.children = [];
  const desk = document.createElement('div');
  desk.setAttribute('id', 'study-desk');
  desk.setAttribute('data-course-id', courseId);
  desk.setAttribute('data-lesson-slug', lessonSlug);
  desk.setAttribute('data-lesson-id', 'sb-1-0');
  desk.setAttribute('data-lesson-title', 'Test Lesson');
  document.body.appendChild(desk);
}

// =====================================================================
// 5. RUN SCRIPT IN ISOLATED VM CONTEXT
// =====================================================================

function runScriptInContext(code, env) {
  const context = vm.createContext(env.window);
  vm.runInContext(code, context);
}

// =====================================================================
// 6. ADVERSARIAL TEST SUITE
// =====================================================================

async function runAdversarialLifecycleTests() {
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  CHALLENGER M2: Empirical Lifecycle & Event Teardown Stress Suite${colors.reset}`);
  console.log(`${colors.dim}  Adversarial verification of AbortController cleanup across 50 transitions${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = [];

  function assert(condition, message, meta = {}) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
    } else {
      failedAssertions.push({ message, meta });
      console.error(`  ${colors.red}[FAIL] ${message}${colors.reset}`);
      if (Object.keys(meta).length > 0) {
        console.error(`         ${colors.dim}${JSON.stringify(meta)}${colors.reset}`);
      }
    }
  }

  // -------------------------------------------------------------------
  // TEST SUITE 1: 50 CONSECUTIVE PAGE TRANSITIONS (Index <-> Course)
  // -------------------------------------------------------------------
  console.log(`${colors.bold}${colors.magenta}▶ SUITE 1: 50 Consecutive Client-Side Page Transitions${colors.reset}`);

  const registry1 = new ListenerRegistry();
  const env1 = createTestEnvironment(registry1);

  // Initial load: Library Index (Page A)
  env1.window.location.pathname = '/ahkh-study-hub/';
  seedIndexDOM(env1.document);
  runScriptInContext(indexScripts[0], env1);

  assert(
    !!env1.window.__ahkhLibAbort,
    'Initial load: window.__ahkhLibAbort is instantiated on index'
  );
  assert(
    env1.window.__ahkhLibAbort.signal.aborted === false,
    'Initial load: window.__ahkhLibAbort.signal starts active (aborted === false)'
  );
  assert(
    registry1.getActiveCount('document', 'astro:page-load') === 1,
    'Initial load: exactly 1 astro:page-load listener registered on document'
  );
  assert(
    registry1.getActiveCount('document', 'astro:before-swap') === 1,
    'Initial load: exactly 1 astro:before-swap listener registered on document'
  );

  // Trigger initial astro:page-load
  env1.document.dispatchEvent(new CustomEvent('astro:page-load'));

  const initialDocListeners = registry1.getActiveCount('document');
  const initialWinListeners = registry1.getActiveCount('window');
  console.log(`  ${colors.dim}Initial State: document listeners = ${initialDocListeners}, window listeners = ${initialWinListeners}${colors.reset}`);

  const transitionSamples = [];

  // Run 50 transitions: alternating Index -> Course -> Index -> Course ...
  for (let i = 1; i <= 50; i++) {
    const isNavigatingToCourse = i % 2 !== 0;
    const targetPage = isNavigatingToCourse ? 'Course Overview' : 'Library Index';

    // Step A: Astro fires astro:before-swap on document
    const oldLibAbort = env1.window.__ahkhLibAbort;
    const oldAccordionAbort = env1.window.__ahkhAccordionAbort;
    const oldJourneyAbort = env1.window.__ahkhJourneyAbort;

    env1.document.dispatchEvent(
      new CustomEvent('astro:before-swap', {
        detail: {
          from: env1.window.location.pathname,
          to: isNavigatingToCourse ? '/ahkh-study-hub/courses/springboard-ux/' : '/ahkh-study-hub/',
        },
      })
    );

    // Step B: Verify immediate teardown on astro:before-swap
    if (isNavigatingToCourse) {
      // We were on Index, swapping away to Course:
      assert(
        oldLibAbort.signal.aborted === true,
        `Cycle ${i}: window.__ahkhLibAbort.signal.aborted must be TRUE after astro:before-swap`,
        { cycle: i, aborted: oldLibAbort.signal.aborted }
      );
    } else {
      // We were on Course, swapping away to Index:
      assert(
        oldAccordionAbort.signal.aborted === true,
        `Cycle ${i}: window.__ahkhAccordionAbort.signal.aborted must be TRUE after astro:before-swap`,
        { cycle: i, aborted: oldAccordionAbort.signal.aborted }
      );
      assert(
        oldJourneyAbort.signal.aborted === true,
        `Cycle ${i}: window.__ahkhJourneyAbort.signal.aborted must be TRUE after astro:before-swap`,
        { cycle: i, aborted: oldJourneyAbort.signal.aborted }
      );
    }

    // Step C: Verify that the abort signal immediately removed the old page-load listeners
    const preScriptPageLoadCount = registry1.getActiveCount('document', 'astro:page-load');
    assert(
      preScriptPageLoadCount === 0,
      `Cycle ${i}: All astro:page-load listeners must be purged before incoming scripts execute`,
      { cycle: i, remaining: preScriptPageLoadCount }
    );

    // Step D: Swap DOM and update location
    if (isNavigatingToCourse) {
      env1.window.location.pathname = '/ahkh-study-hub/courses/springboard-ux/';
      seedCourseDOM(env1.document, 'springboard-ux');
      // Run course scripts
      runScriptInContext(courseScripts[0], env1); // Accordion
      runScriptInContext(courseScripts[1], env1); // Journey
    } else {
      env1.window.location.pathname = '/ahkh-study-hub/';
      seedIndexDOM(env1.document);
      runScriptInContext(indexScripts[0], env1); // Library
    }

    // Step E: Verify new fresh AbortControllers
    if (isNavigatingToCourse) {
      assert(
        env1.window.__ahkhAccordionAbort !== oldAccordionAbort,
        `Cycle ${i}: Fresh window.__ahkhAccordionAbort created`,
        { cycle: i }
      );
      assert(
        env1.window.__ahkhAccordionAbort.signal.aborted === false,
        `Cycle ${i}: New accordion signal is active`,
        { cycle: i }
      );
      assert(
        env1.window.__ahkhJourneyAbort !== oldJourneyAbort,
        `Cycle ${i}: Fresh window.__ahkhJourneyAbort created`,
        { cycle: i }
      );
      assert(
        env1.window.__ahkhJourneyAbort.signal.aborted === false,
        `Cycle ${i}: New journey signal is active`,
        { cycle: i }
      );
    } else {
      assert(
        env1.window.__ahkhLibAbort !== oldLibAbort,
        `Cycle ${i}: Fresh window.__ahkhLibAbort created`,
        { cycle: i }
      );
      assert(
        env1.window.__ahkhLibAbort.signal.aborted === false,
        `Cycle ${i}: New lib signal is active`,
        { cycle: i }
      );
    }

    // Step F: Astro fires astro:after-swap and astro:page-load
    env1.document.dispatchEvent(new CustomEvent('astro:after-swap'));
    env1.document.dispatchEvent(new CustomEvent('astro:page-load'));

    // Step G: Record active listener snapshot
    const currentDocListeners = registry1.getActiveCount('document');
    const currentWinListeners = registry1.getActiveCount('window');
    const currentPageLoadListeners = registry1.getActiveCount('document', 'astro:page-load');
    const currentBeforeSwapListeners = registry1.getActiveCount('document', 'astro:before-swap');

    transitionSamples.push({
      cycle: i,
      page: targetPage,
      docTotal: currentDocListeners,
      winTotal: currentWinListeners,
      pageLoad: currentPageLoadListeners,
      beforeSwap: currentBeforeSwapListeners,
    });
  }

  // Print sample audit points
  console.log(`  ${colors.dim}Auditing listener stability across cycles:${colors.reset}`);
  [1, 2, 10, 25, 49, 50].forEach((c) => {
    const s = transitionSamples.find((x) => x.cycle === c);
    console.log(`    Cycle ${String(s.cycle).padStart(2)} (${s.page.padEnd(16)}): doc=${s.docTotal} (page-load=${s.pageLoad}, before-swap=${s.beforeSwap}), win=${s.winTotal}`);
  });

  // Verify bounded invariant: cycle 10 vs cycle 50 MUST BE IDENTICAL
  const c10 = transitionSamples.find((x) => x.cycle === 10);
  const c50 = transitionSamples.find((x) => x.cycle === 50);
  assert(
    c10.docTotal === c50.docTotal,
    `Memory stability: document listeners at cycle 10 (${c10.docTotal}) === cycle 50 (${c50.docTotal})`,
    { c10: c10.docTotal, c50: c50.docTotal }
  );
  assert(
    c10.winTotal === c50.winTotal,
    `Memory stability: window listeners at cycle 10 (${c10.winTotal}) === cycle 50 (${c50.winTotal})`,
    { c10: c10.winTotal, c50: c50.winTotal }
  );
  assert(
    c10.pageLoad === c50.pageLoad,
    `Memory stability: astro:page-load listeners at cycle 10 (${c10.pageLoad}) === cycle 50 (${c50.pageLoad})`,
    { c10: c10.pageLoad, c50: c50.pageLoad }
  );
  assert(
    c10.beforeSwap === c50.beforeSwap,
    `Memory stability: astro:before-swap listeners at cycle 10 (${c10.beforeSwap}) === cycle 50 (${c50.beforeSwap})`,
    { c10: c10.beforeSwap, c50: c50.beforeSwap }
  );

  const c9 = transitionSamples.find((x) => x.cycle === 9);
  const c49 = transitionSamples.find((x) => x.cycle === 49);
  assert(
    c9.docTotal === c49.docTotal,
    `Memory stability: Course page document listeners at cycle 9 (${c9.docTotal}) === cycle 49 (${c49.docTotal})`,
    { c9: c9.docTotal, c49: c49.docTotal }
  );

  // -------------------------------------------------------------------
  // TEST SUITE 2: ADVERSARIAL STRESS & CORNER CASES
  // -------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.magenta}▶ SUITE 2: Adversarial Stress & Edge Conditions${colors.reset}`);

  // Test 2A: Re-execution without swap (Idempotency check)
  console.log(`  ${colors.dim}Test 2A: Double execution of inline scripts without navigation swap...${colors.reset}`);
  const registry2A = new ListenerRegistry();
  const env2A = createTestEnvironment(registry2A);
  seedCourseDOM(env2A.document, 'springboard-ux');

  runScriptInContext(courseScripts[0], env2A);
  runScriptInContext(courseScripts[1], env2A);
  const countBeforeSecondRun = registry2A.getActiveCount('document', 'astro:page-load');

  // Re-run scripts directly (as might happen on duplicate script evaluation or soft reload)
  runScriptInContext(courseScripts[0], env2A);
  runScriptInContext(courseScripts[1], env2A);
  const countAfterSecondRun = registry2A.getActiveCount('document', 'astro:page-load');

  assert(
    countBeforeSecondRun === countAfterSecondRun,
    'Idempotency: Re-running scripts without swap aborts previous controllers and maintains constant listener count',
    { before: countBeforeSecondRun, after: countAfterSecondRun }
  );

  // Test 2B: Rapid consecutive astro:before-swap events (Race/Spam protection)
  console.log(`  ${colors.dim}Test 2B: Rapid consecutive astro:before-swap dispatches...${colors.reset}`);
  const registry2B = new ListenerRegistry();
  const env2B = createTestEnvironment(registry2B);
  seedIndexDOM(env2B.document);
  runScriptInContext(indexScripts[0], env2B);

  // Rapid dispatch of 5 before-swap events in a row
  for (let k = 0; k < 5; k++) {
    env2B.document.dispatchEvent(new CustomEvent('astro:before-swap'));
  }
  assert(
    env2B.window.__ahkhLibAbort.signal.aborted === true,
    'Rapid before-swap: window.__ahkhLibAbort cleanly aborted'
  );
  assert(
    registry2B.getActiveCount('document', 'astro:page-load') === 0,
    'Rapid before-swap: page-load listener successfully purged'
  );
  assert(
    registry2B.getActiveCount('document', 'astro:before-swap') === 0,
    'Rapid before-swap: before-swap once-listener cleanly removed'
  );

  // Test 2C: Cross-course syllabus navigation (/courses/a -> /courses/b)
  console.log(`  ${colors.dim}Test 2C: Cross-course navigation (/courses/springboard-ux -> /courses/other-course)...${colors.reset}`);
  const registry2C = new ListenerRegistry();
  const env2C = createTestEnvironment(registry2C);
  env2C.window.location.pathname = '/ahkh-study-hub/courses/course-a/';
  seedCourseDOM(env2C.document, 'course-a');
  runScriptInContext(courseScripts[0], env2C);
  runScriptInContext(courseScripts[1], env2C);

  const prevAccordion = env2C.window.__ahkhAccordionAbort;
  const prevJourney = env2C.window.__ahkhJourneyAbort;

  // Swap to course-b
  env2C.document.dispatchEvent(
    new CustomEvent('astro:before-swap', {
      detail: { from: '/courses/course-a', to: '/courses/course-b' },
    })
  );

  assert(
    prevAccordion.signal.aborted === true,
    'Cross-course swap: Previous accordion controller aborted'
  );
  assert(
    prevJourney.signal.aborted === true,
    'Cross-course swap: Previous journey controller aborted'
  );

  env2C.window.location.pathname = '/ahkh-study-hub/courses/course-b/';
  seedCourseDOM(env2C.document, 'course-b');
  runScriptInContext(courseScripts[0], env2C);
  runScriptInContext(courseScripts[1], env2C);

  assert(
    env2C.window.__ahkhAccordionAbort !== prevAccordion,
    'Cross-course swap: Fresh accordion controller created'
  );
  assert(
    env2C.window.__ahkhAccordionAbort.signal.aborted === false,
    'Cross-course swap: Fresh accordion controller is active'
  );
  assert(
    registry2C.getActiveCount('document', 'astro:page-load') === 2,
    'Cross-course swap: Exactly 2 page-load listeners on new course (accordion + journey)'
  );

  // Test 2D: Missing DOM elements resilience (Zero unhandled exceptions)
  console.log(`  ${colors.dim}Test 2D: Resilience under empty DOM...${colors.reset}`);
  const registry2D = new ListenerRegistry();
  const env2D = createTestEnvironment(registry2D);
  env2D.document.body.children = []; // completely empty DOM

  let errorThrown = false;
  try {
    runScriptInContext(indexScripts[0], env2D);
    env2D.document.dispatchEvent(new CustomEvent('astro:page-load'));
    runScriptInContext(courseScripts[0], env2D);
    runScriptInContext(courseScripts[1], env2D);
    env2D.document.dispatchEvent(new CustomEvent('astro:page-load'));
  } catch (err) {
    errorThrown = true;
    console.error(err);
  }

  assert(
    !errorThrown,
    'Empty DOM resilience: Scripts execute without throwing errors when expected DOM nodes are absent'
  );

  // -------------------------------------------------------------------
  // TEST SUITE 3: TRI-WAY ROUTING (Index -> Course -> Lesson -> Course -> Index)
  // -------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.magenta}▶ SUITE 3: Tri-Way Full Platform Navigation Workflow (50 cycles)${colors.reset}`);

  const registry3 = new ListenerRegistry();
  const env3 = createTestEnvironment(registry3);

  // Load reader script into window context
  const readerCode = fs.readFileSync(path.join(ROOT, 'public', 'scripts', 'reader.js'), 'utf8');
  runScriptInContext(readerCode, env3);

  const routeSequence = [
    { type: 'index', path: '/ahkh-study-hub/' },
    { type: 'course', path: '/ahkh-study-hub/courses/springboard-ux/' },
    { type: 'lesson', path: '/ahkh-study-hub/courses/springboard-ux/lesson-1/' },
    { type: 'course', path: '/ahkh-study-hub/courses/springboard-ux/' },
  ];

  const triWaySamples = [];

  for (let step = 0; step < 50; step++) {
    const route = routeSequence[step % routeSequence.length];

    // Fire before-swap if not step 0
    if (step > 0) {
      env3.document.dispatchEvent(
        new CustomEvent('astro:before-swap', { detail: { to: route.path } })
      );
    }

    env3.window.location.pathname = route.path;

    if (route.type === 'index') {
      seedIndexDOM(env3.document);
      runScriptInContext(indexScripts[0], env3);
    } else if (route.type === 'course') {
      seedCourseDOM(env3.document, 'springboard-ux');
      runScriptInContext(courseScripts[0], env3);
      runScriptInContext(courseScripts[1], env3);
    } else if (route.type === 'lesson') {
      seedLessonDOM(env3.document, 'springboard-ux', 'lesson-1');
      runScriptInContext(lessonScripts[0], env3);
    }

    env3.document.dispatchEvent(new CustomEvent('astro:after-swap'));
    env3.document.dispatchEvent(new CustomEvent('astro:page-load'));

    triWaySamples.push({
      step,
      route: route.type,
      docListeners: registry3.getActiveCount('document'),
      winListeners: registry3.getActiveCount('window'),
      pageLoadListeners: registry3.getActiveCount('document', 'astro:page-load'),
    });
  }

  // Compare step 12 (full cycle completed) with step 48 (12 full cycles completed)
  const s12 = triWaySamples[12];
  const s48 = triWaySamples[48];

  assert(
    s12.route === s48.route,
    'Tri-way sample points match route type'
  );
  assert(
    s12.pageLoadListeners === s48.pageLoadListeners,
    `Tri-way stability: page-load listeners at step 12 (${s12.pageLoadListeners}) === step 48 (${s48.pageLoadListeners})`,
    { s12: s12.pageLoadListeners, s48: s48.pageLoadListeners }
  );
  assert(
    s12.docListeners === s48.docListeners,
    `Tri-way stability: document listeners at step 12 (${s12.docListeners}) === step 48 (${s48.docListeners})`,
    { s12: s12.docListeners, s48: s48.docListeners }
  );

  console.log(`    Step 12 (${s12.route}): doc=${s12.docListeners}, win=${s12.winListeners}, page-load=${s12.pageLoadListeners}`);
  console.log(`    Step 48 (${s48.route}): doc=${s48.docListeners}, win=${s48.winListeners}, page-load=${s48.pageLoadListeners}`);

  // -------------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  CHALLENGER M2 RESULTS SUMMARY${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  Total Assertions:  ${colors.bold}${totalAssertions}${colors.reset}`);
  console.log(`  Passed Assertions: ${colors.green}${colors.bold}${passedAssertions}${colors.reset}`);
  console.log(`  Failed Assertions: ${failedAssertions.length > 0 ? colors.red : colors.green}${colors.bold}${failedAssertions.length}${colors.reset}\n`);

  if (failedAssertions.length > 0) {
    console.error(`${colors.bold}${colors.red}VERDICT: REQUEST_CHANGES — Failures detected in lifecycle teardown!${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.bold}${colors.green}VERDICT: APPROVE — All lifecycle teardown and memory leak tests passed cleanly!${colors.reset}`);
    process.exit(0);
  }
}

runAdversarialLifecycleTests().catch((err) => {
  console.error('Fatal error during challenger execution:', err);
  process.exit(1);
});
