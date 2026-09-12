import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert';
import { createVirtualBrowser, loadReaderScript } from '../../tests/utils/dom-runtime.mjs';

console.log('=== BEHAVIORAL VERIFICATION TEST SUITE ===');

// 1. Lifecycle Teardown Behavioral Verification
console.log('\n--- 1. Testing astro:before-swap Lifecycle Teardown ---');
{
  const { window, document } = createVirtualBrowser();
  const desk = document.createElement('div');
  desk.id = 'study-desk';
  document.body.appendChild(desk);

  const bootFn = loadReaderScript(window);
  bootFn({
    courseId: 'springboard-ux',
    lessonId: 'sb-1-0',
    lessonSlug: 'lesson-a',
    courseAccent: 'amber',
    courseHighlight: 'amber',
  });

  const abortController = window.__ahkhReaderAbort;
  assert.ok(abortController, 'AbortController must be defined');
  assert.strictEqual(abortController.signal.aborted, false, 'AbortController must not be aborted initially');

  // Set dummy mock resources to verify cleanup
  let ytDestroyCalled = false;
  window.__ahkhYtPlayer = {
    destroy: () => { ytDestroyCalled = true; }
  };
  window.__ahkhYtTimer = 9999;
  let observerDisconnected = false;
  window.__ahkhVideoObserver = {
    disconnect: () => { observerDisconnected = true; }
  };

  assert.strictEqual(desk.dataset.ahkhBooted, 'true', 'Desk must be booted');

  // Trigger astro:before-swap
  document.dispatchEvent(new window.CustomEvent('astro:before-swap'));

  assert.strictEqual(abortController.signal.aborted, true, 'AbortController must be aborted on astro:before-swap');
  assert.strictEqual(window.__ahkhReaderAbort, null, 'window.__ahkhReaderAbort must be reset to null');
  assert.strictEqual(ytDestroyCalled, true, 'window.__ahkhYtPlayer.destroy() must have been called');
  assert.strictEqual(window.__ahkhYtPlayer, null, 'window.__ahkhYtPlayer must be reset to null');
  assert.strictEqual(window.__ahkhYtTimer, null, 'window.__ahkhYtTimer must be reset to null');
  assert.strictEqual(observerDisconnected, true, 'window.__ahkhVideoObserver.disconnect() must have been called');
  assert.strictEqual(window.__ahkhVideoObserver, null, 'window.__ahkhVideoObserver must be reset to null');
  assert.strictEqual(desk.dataset.ahkhBooted, undefined, 'Desk data-ahkh-booted must be cleared');

  console.log('PASS: Lifecycle teardown on astro:before-swap cleanly purges all resources.');
}

// 2. Scroll Restoration Storage Guarding
console.log('\n--- 2. Testing Scroll Restoration Overwrite Guarding ---');
{
  const { window, document, AhkhStorage } = createVirtualBrowser();
  const desk = document.createElement('div');
  desk.id = 'study-desk';
  document.body.appendChild(desk);

  // Pre-seed saved scroll coordinate
  AhkhStorage.set('ahkh_scroll_springboard-ux_lesson-a', JSON.stringify({
    percent: 75,
    scrollY: 1800,
    updatedAt: new Date().toISOString()
  }));

  const bootFn = loadReaderScript(window);
  bootFn({
    courseId: 'springboard-ux',
    lessonId: 'sb-1-0',
    lessonSlug: 'lesson-a',
    courseAccent: 'amber',
    courseHighlight: 'amber',
  });

  // Check saved data initially
  const initial = JSON.parse(AhkhStorage.get('ahkh_scroll_springboard-ux_lesson-a'));
  assert.strictEqual(initial.scrollY, 1800, 'Initial scrollY must be preserved');

  console.log('PASS: Scroll restoration preserves storage state.');
}

// 3. Touch Selection Event Parity
console.log('\n--- 3. Testing Mobile Touch Event Binding ---');
{
  const { window, document } = createVirtualBrowser();
  const desk = document.createElement('div');
  desk.id = 'study-desk';
  document.body.appendChild(desk);

  const popover = document.createElement('div');
  popover.id = 'selection-popover';
  popover.classList.add('hidden');
  popover.contains = (target) => false;
  document.body.appendChild(popover);

  const reading = document.createElement('div');
  reading.id = 'center-reading-column';
  document.body.appendChild(reading);

  const bootFn = loadReaderScript(window);
  bootFn({
    courseId: 'springboard-ux',
    lessonId: 'sb-1-0',
    lessonSlug: 'lesson-a',
    courseAccent: 'amber',
    courseHighlight: 'amber',
  });

  // Verify touchend and touchstart handlers don't crash
  let touchEventFired = false;
  try {
    document.dispatchEvent(new window.CustomEvent('touchend'));
    document.dispatchEvent(new window.CustomEvent('touchstart'));
    touchEventFired = true;
  } catch (e) {
    console.error('Touch event caught error:', e);
    touchEventFired = false;
  }
  assert.strictEqual(touchEventFired, true, 'Touch events must fire cleanly without exceptions');
  console.log('PASS: Mobile touch selection events execute cleanly.');
}

console.log('\n=== ALL BEHAVIORAL CHECKS PASSED ===');
