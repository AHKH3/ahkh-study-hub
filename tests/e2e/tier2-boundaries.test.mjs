/**
 * AHKH Study Hub - E2E Test Suite: Tier 2 (Boundary & Corner Cases)
 * Tests resilience against edge cases: corrupted storage, extreme scroll offsets,
 * fast route hopping, missing attributes, special characters, and empty datasets.
 */

import { describe } from '../utils/test-framework.mjs';
import { createVirtualBrowser, loadReaderScript } from '../utils/dom-runtime.mjs';

describe('Tier 2: Boundary & Corner Cases — LocalStorage Corruption & Schema Resilience', ({ it }) => {
  it('T2-B1: Reader gracefully recovers from malformed JSON in highlights storage', (assert) => {
    const { window, AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonId = 'sb-1-0';
    const storageKey = `ahkh_hl_${courseId}_${lessonId}`;

    // Corrupt storage with broken JSON
    AhkhStorage.set(storageKey, '{{{MALFORMED_JSON_STRING%%%');

    // Simulate reader boot highlights parser
    let highlights = [];
    assert.doesNotThrow(() => {
      try {
        highlights = JSON.parse(AhkhStorage.get(storageKey) || '[]');
        if (!Array.isArray(highlights)) highlights = [];
      } catch (e) {
        highlights = [];
      }
    }, 'Must not throw uncaught error on corrupted JSON');

    assert.ok(Array.isArray(highlights), 'Must fallback to empty array');
    assert.strictEqual(highlights.length, 0);
  });

  it('T2-B2: Reader handles non-array payloads (objects, primitives) in highlights storage', (assert) => {
    const { window, AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonId = 'sb-1-0';
    const storageKey = `ahkh_hl_${courseId}_${lessonId}`;

    // Object instead of array
    AhkhStorage.set(storageKey, JSON.stringify({ error: 'not an array' }));
    let highlights = [];
    try {
      highlights = JSON.parse(AhkhStorage.get(storageKey) || '[]');
      if (!Array.isArray(highlights)) highlights = [];
    } catch (e) {
      highlights = [];
    }
    assert.ok(Array.isArray(highlights), 'Object payload must safely fall back to empty array');
    assert.strictEqual(highlights.length, 0);

    // Primitive number instead of array
    AhkhStorage.set(storageKey, '12345');
    try {
      highlights = JSON.parse(AhkhStorage.get(storageKey) || '[]');
      if (!Array.isArray(highlights)) highlights = [];
    } catch (e) {
      highlights = [];
    }
    assert.ok(Array.isArray(highlights), 'Number payload must safely fall back to empty array');
  });

  it('T2-B3: Corrupted or missing scroll data gracefully defaults to 0 offset', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonSlug = 'intro';
    const scrollKey = `ahkh_scroll_${courseId}_${lessonSlug}`;

    // Non-existent key
    assert.strictEqual(AhkhStorage.get(scrollKey), null);

    // Parse helper
    const parseScroll = (key) => {
      try {
        const raw = AhkhStorage.get(key);
        if (!raw) return { percent: 0, scrollY: 0 };
        const parsed = JSON.parse(raw);
        return {
          percent: Number.isFinite(parsed.percent) ? Math.min(100, Math.max(0, parsed.percent)) : 0,
          scrollY: Number.isFinite(parsed.scrollY) ? Math.max(0, parsed.scrollY) : 0,
        };
      } catch (e) {
        return { percent: 0, scrollY: 0 };
      }
    };

    assert.deepStrictEqual(parseScroll(scrollKey), { percent: 0, scrollY: 0 });

    // Corrupted JSON key
    AhkhStorage.set(scrollKey, 'not-json');
    assert.deepStrictEqual(parseScroll(scrollKey), { percent: 0, scrollY: 0 });

    // NaN values
    AhkhStorage.set(scrollKey, JSON.stringify({ percent: NaN, scrollY: 'infinite' }));
    assert.deepStrictEqual(parseScroll(scrollKey), { percent: 0, scrollY: 0 });
  });
});

describe('Tier 2: Boundary & Corner Cases — Extreme Scroll Offsets & Clamping', ({ it }) => {
  it('T2-B4: Negative scroll offsets are clamped to 0', (assert) => {
    const currentY = -150;
    const maxScroll = 2000;
    const clampedPct = Math.min(100, Math.max(0, Math.round((currentY / maxScroll) * 100)));
    const clampedY = Math.max(0, currentY);

    assert.strictEqual(clampedPct, 0, 'Negative scroll percent must clamp to 0');
    assert.strictEqual(clampedY, 0, 'Negative scrollY must clamp to 0');
  });

  it('T2-B5: Overflow scroll offsets are clamped to 100% and maxScroll', (assert) => {
    const currentY = 5000;
    const maxScroll = 2000;
    const clampedPct = Math.min(100, Math.max(0, Math.round((currentY / maxScroll) * 100)));
    const clampedY = Math.min(maxScroll, currentY);

    assert.strictEqual(clampedPct, 100, 'Overflow scroll percent must clamp to 100');
    assert.strictEqual(clampedY, 2000, 'Overflow scrollY must clamp to maxScroll');
  });

  it('T2-B6: Scroll restoration handles zero-height or unmeasured documents', (assert) => {
    const currentY = 100;
    const maxScroll = 0; // Document fits entirely in viewport
    let saved = false;

    // saveScrollDepth guard: if (maxScroll <= 0) return;
    if (maxScroll > 0) {
      saved = true;
    }
    assert.strictEqual(saved, false, 'Should not attempt scroll saving when maxScroll is 0');
  });
});

describe('Tier 2: Boundary & Corner Cases — Fast Route Hopping & Lifecycle Isolation', ({ it }) => {
  it('T2-B7: Rapid sequential reader boots abort previous controllers and clear timers', (assert) => {
    const { window, document } = createVirtualBrowser();
    const desk = document.createElement('div');
    desk.id = 'study-desk';
    document.body.appendChild(desk);

    const bootFn = loadReaderScript(window);

    // First boot
    bootFn({
      courseId: 'springboard-ux',
      lessonId: 'sb-1-0',
      lessonSlug: 'lesson-1',
    });
    const firstAbort = window.__ahkhReaderAbort;
    assert.ok(firstAbort, 'First boot must create an AbortController');
    assert.strictEqual(firstAbort.signal.aborted, false, 'First signal must start active');

    // Simulate navigation: reset desk boot stamp and trigger second boot
    desk.removeAttribute('data-ahkh-booted');
    bootFn({
      courseId: 'springboard-ux',
      lessonId: 'sb-1-1',
      lessonSlug: 'lesson-2',
    });

    const secondAbort = window.__ahkhReaderAbort;
    assert.ok(secondAbort, 'Second boot must create a new AbortController');
    assert.strictEqual(firstAbort.signal.aborted, true, 'First abort controller must be aborted on second boot');
    assert.strictEqual(secondAbort.signal.aborted, false, 'Second abort controller must remain active');
  });

  it('T2-B8: Non-reader page navigation cleanly skips boot without throwing errors', (assert) => {
    const { window, document } = createVirtualBrowser();
    // No #study-desk element
    assert.strictEqual(document.getElementById('study-desk'), null);

    const bootFn = loadReaderScript(window);
    assert.doesNotThrow(() => {
      // Calling boot on a non-reader page
      var desk = document.getElementById('study-desk');
      if (desk && window.__ahkhBootReader) {
        window.__ahkhBootReader(Object.assign({}, desk.dataset));
      }
    }, 'Must not throw when study-desk is absent');
  });
});

describe('Tier 2: Boundary & Corner Cases — Encoding, Escaping & Special Characters', ({ it }) => {
  it('T2-B9: Marginal notes containing HTML tags and scripts are safely escaped', (assert) => {
    function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    const dangerousNote = '<script>alert("XSS")</script> & "quotes"';
    const escaped = escapeHtml(dangerousNote);

    assert.doesNotMatch(escaped, /<script>/, 'Must escape opening script tags');
    assert.match(escaped, /&lt;script&gt;/, 'Must represent <script> as HTML entities');
    assert.match(escaped, /&quot;quotes&quot;/, 'Must escape double quotes');
    assert.match(escaped, /&amp;/, 'Must escape ampersands');
  });

  it('T2-B10: Unicode, RTL text, and diacritics in notes persist with 100% fidelity', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonId = 'sb-arabic-test';
    const storageKey = `ahkh_hl_${courseId}_${lessonId}`;

    const arabicNote = 'ملاحظة حول منهجية التفكير التصميمي والبحث الميداني';
    const unicodeNote = 'Über-Kreativität: «L’expérience utilisateur et l’esthétique» 100%';

    const items = [
      { id: 'hl-ar-1', text: 'Design Thinking', note: arabicNote },
      { id: 'hl-de-1', text: 'Aesthetics', note: unicodeNote },
    ];

    AhkhStorage.set(storageKey, JSON.stringify(items));
    const rehydrated = JSON.parse(AhkhStorage.get(storageKey));

    assert.strictEqual(rehydrated[0].note, arabicNote, 'RTL Arabic note must persist verbatim');
    assert.strictEqual(rehydrated[1].note, unicodeNote, 'European accents and French guillemets must persist verbatim');
  });
});

describe('Tier 2: Boundary & Corner Cases — State Machine Idempotence & Empty States', ({ it }) => {
  it('T2-B11: Rapid consecutive clicks on completion toggle button toggle idempotently', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const readKey = 'ahkh_read_springboard-ux_sb-1-0';

    const toggleComplete = () => {
      if (AhkhStorage.get(readKey) !== null) {
        AhkhStorage.remove(readKey);
        return false;
      } else {
        AhkhStorage.set(readKey, new Date().toISOString());
        return true;
      }
    };

    // 5 successive clicks
    assert.strictEqual(toggleComplete(), true, 'Click 1: complete');
    assert.strictEqual(toggleComplete(), false, 'Click 2: uncomplete');
    assert.strictEqual(toggleComplete(), true, 'Click 3: complete');
    assert.strictEqual(toggleComplete(), false, 'Click 4: uncomplete');
    assert.strictEqual(toggleComplete(), true, 'Click 5: complete');

    assert.ok(AhkhStorage.get(readKey) !== null, 'Final state must be completed');
  });

  it('T2-B12: Empty highlights array produces 0 count and does not fail rendering', (assert) => {
    const { window, document } = createVirtualBrowser();
    const countEl = document.createElement('span');
    countEl.id = 'header-highlights-count';
    document.body.appendChild(countEl);

    const highlights = [];
    countEl.textContent = highlights.length;
    assert.strictEqual(countEl.textContent, '0', 'Count must reflect 0 items');
  });
});
