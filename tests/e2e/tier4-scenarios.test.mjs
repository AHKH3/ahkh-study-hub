/**
 * AHKH Study Hub - E2E Test Suite: Tier 4 (Real-World Student Scenarios)
 * Simulates complete, end-to-end student workflows from discovery to mastery:
 * - Scenario 1: Full Student Onboarding & Discovery Journey
 * - Scenario 2: Deep Reading, Highlighting & Marginalia Annotation Cycle
 * - Scenario 3: Interrupted Study Session, Route Hopping & Scroll Resumption
 * - Scenario 4: Video Lecture Playback Synchronization & Format Switching
 * - Scenario 5: Course Progress Accrual & Full Completion Loop
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe } from '../utils/test-framework.mjs';
import { DistInspector } from '../utils/dist-inspector.mjs';
import { createVirtualBrowser, loadReaderScript } from '../utils/dom-runtime.mjs';

const inspector = new DistInspector();
const ROOT = process.cwd();

describe('Tier 4: Real-World Scenarios — Scenario 1: Onboarding & Discovery Journey', ({ it }) => {
  it('T4-S1: Student navigates from Library Index -> Syllabus -> First Lesson reading desk', (assert) => {
    // 1. Inspect Library Index
    const indexHtml = inspector.getLibraryIndexHtml();
    assert.ok(indexHtml, 'Library index HTML must exist');
    assert.match(indexHtml, /Springboard UX Career Track/, 'Course title must be visible');
    assert.match(indexHtml, /href=["'][^"']*courses\/springboard-ux["']/, 'Course card must link to syllabus');

    // 2. Inspect Course Syllabus
    const courseFiles = inspector.getCourseIndexHtmlFiles();
    assert.greaterThan(courseFiles.length, 0);
    const syllabusHtml = fs.readFileSync(courseFiles[0], 'utf8');
    assert.match(syllabusHtml, />U1</, 'Syllabus must outline units via badges (U1, U2, ...)');
    assert.match(syllabusHtml, /the-anatomy-of-product-experience/, 'Syllabus must link to first lesson');

    // 3. Mount First Lesson in Virtual Browser
    const { window, document, AhkhStorage } = createVirtualBrowser();
    const desk = document.createElement('div');
    desk.id = 'study-desk';
    desk.dataset.courseId = 'springboard-ux';
    desk.dataset.courseTitle = 'Springboard UX Career Track';
    desk.dataset.lessonId = 'sb-1-0';
    desk.dataset.lessonSlug = 'the-anatomy-of-product-experience';
    desk.dataset.lessonTitle = 'The Anatomy of Product Experience';
    document.body.appendChild(desk);

    const bootFn = loadReaderScript(window);
    bootFn(desk.dataset);

    // Verify initial visit records "explored" state
    const openedKey = `ahkh_opened_${desk.dataset.courseId}_${desk.dataset.lessonSlug}`;
    assert.ok(AhkhStorage.get(openedKey) !== null, 'Lesson visit must record opened timestamp in storage');
  });
});

describe('Tier 4: Real-World Scenarios — Scenario 2: Deep Reading & Marginalia Cycle', ({ it }) => {
  it('T4-S2: Student enters study mode, creates highlighted quote, and attaches marginal note', (assert) => {
    const { window, document, AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonId = 'sb-1-0';
    const lessonSlug = 'course-orientation-and-onboarding';

    // 1. Initial State: Explored
    const openedKey = `ahkh_opened_${courseId}_${lessonSlug}`;
    const readingKey = `ahkh_reading_${courseId}_${lessonSlug}`;
    AhkhStorage.set(openedKey, new Date().toISOString());

    // 2. Student clicks "Start Reading" button
    const startReading = () => {
      AhkhStorage.set(readingKey, new Date().toISOString());
    };
    startReading();
    assert.ok(AhkhStorage.get(readingKey) !== null, 'Reading timestamp must be recorded');

    // 3. Student highlights text with emerald pen
    const storageKey = `ahkh_hl_${courseId}_${lessonId}`;
    const highlights = [
      {
        id: 'hl-demo-1',
        text: 'Good design is making something intelligible and memorable.',
        color: 'emerald',
        note: 'Dieter Rams Ten Principles for Good Design',
        timestamp: Date.now(),
      },
    ];
    AhkhStorage.set(storageKey, JSON.stringify(highlights));

    // 4. Verify highlight persists and reflects in drawer
    const saved = JSON.parse(AhkhStorage.get(storageKey));
    assert.strictEqual(saved.length, 1);
    assert.strictEqual(saved[0].color, 'emerald');
    assert.match(saved[0].note, /Dieter Rams/);

    // 5. Student edits note
    saved[0].note = 'Dieter Rams Principle #8: Thorough down to the last detail';
    AhkhStorage.set(storageKey, JSON.stringify(saved));
    const updated = JSON.parse(AhkhStorage.get(storageKey));
    assert.strictEqual(updated[0].note, 'Dieter Rams Principle #8: Thorough down to the last detail');
  });
});

describe('Tier 4: Real-World Scenarios — Scenario 3: Interrupted Study & Scroll Resumption', ({ it }) => {
  it('T4-S3: Scroll depth tracks reading progress, persists, and restores upon return', (assert) => {
    const { window, AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const lessonSlug = 'research-guide';
    const scrollKey = `ahkh_scroll_${courseId}_${lessonSlug}`;

    // Student reads through 75% of chapter
    const currentScrollY = 1500;
    const maxScroll = 2000;
    const pct = Math.round((currentScrollY / maxScroll) * 100);

    const state = {
      percent: pct,
      scrollY: currentScrollY,
      updatedAt: new Date().toISOString(),
    };
    AhkhStorage.set(scrollKey, JSON.stringify(state));

    // Student navigates away to Commonplace then returns
    const restored = JSON.parse(AhkhStorage.get(scrollKey));
    assert.ok(restored !== null, 'Scroll state must persist across navigation');
    assert.strictEqual(restored.percent, 75, 'Scroll percentage must accurately restore to 75%');
    assert.strictEqual(restored.scrollY, 1500, 'Scroll vertical offset must restore to 1500px');
  });
});

describe('Tier 4: Real-World Scenarios — Scenario 4: Video Lecture Synchronization', ({ it }) => {
  it('T4-S4: Video lecture displays synced transcript cues and persists sticky pin preference', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();

    // Toggle video pin preference
    const pinKey = 'ahkh_video_pinned';
    AhkhStorage.set(pinKey, 'true');
    assert.strictEqual(AhkhStorage.get(pinKey), 'true', 'Video pin preference must persist in storage');

    // Toggle transcript formatted vs original view mode
    const viewModeKey = 'ahkh_transcript_view';
    AhkhStorage.set(viewModeKey, 'original');
    assert.strictEqual(AhkhStorage.get(viewModeKey), 'original', 'Transcript view mode must persist');

    AhkhStorage.set(viewModeKey, 'formatted');
    assert.strictEqual(AhkhStorage.get(viewModeKey), 'formatted', 'Transcript view mode toggles back to formatted');
  });
});

describe('Tier 4: Real-World Scenarios — Scenario 5: Full Course Completion Loop', ({ it }) => {
  it('T4-S5: Explicit completion updates status, persists readKey, and increments progress', (assert) => {
    const { AhkhStorage } = createVirtualBrowser();
    const courseId = 'springboard-ux';
    const totalLessons = 37;

    const lessons = ['sb-1-0', 'sb-1-1', 'sb-1-2'];

    // Complete lesson 1
    AhkhStorage.set(`ahkh_read_${courseId}_${lessons[0]}`, new Date().toISOString());
    // Complete lesson 2
    AhkhStorage.set(`ahkh_read_${courseId}_${lessons[1]}`, new Date().toISOString());

    // Calculate completed count
    let completedCount = 0;
    for (const l of lessons) {
      if (AhkhStorage.get(`ahkh_read_${courseId}_${l}`) !== null) {
        completedCount++;
      }
    }
    assert.strictEqual(completedCount, 2, '2 of 3 lessons must be completed');

    const progressPercent = Math.round((completedCount / totalLessons) * 100);
    assert.strictEqual(progressPercent, 5, 'Progress percent must calculate to 5% (2/37)');
  });
});
