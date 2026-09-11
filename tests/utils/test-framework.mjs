/**
 * AHKH Study Hub - Standalone E2E Test Framework
 * Provides lightweight, zero-dependency BDD-style testing with explicit assertion counting,
 * tier categorization, timing, and formatted CLI reporting.
 */

import { strict as nodeAssert } from 'node:assert';

class TestHarness {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
    this.totalAssertions = 0;
    this.currentTest = null;
  }

  suite(name, meta = {}) {
    const suiteObj = {
      name,
      meta,
      tests: [],
      passed: 0,
      failed: 0,
      skipped: 0,
      durationMs: 0,
    };
    this.suites.push(suiteObj);
    this.currentSuite = suiteObj;
    return suiteObj;
  }

  async runTest(name, fn, meta = {}) {
    if (!this.currentSuite) {
      this.suite('Default Suite');
    }
    const testObj = {
      name,
      meta,
      assertions: 0,
      error: null,
      passed: false,
      durationMs: 0,
    };
    this.currentSuite.tests.push(testObj);
    this.currentTest = testObj;

    const start = performance.now();
    try {
      await fn(this.createAssert(testObj));
      testObj.passed = true;
      this.currentSuite.passed++;
    } catch (err) {
      testObj.passed = false;
      testObj.error = err;
      this.currentSuite.failed++;
    } finally {
      testObj.durationMs = performance.now() - start;
      this.currentTest = null;
    }
  }

  createAssert(testObj) {
    const record = () => {
      this.totalAssertions++;
      if (testObj) testObj.assertions++;
    };

    return {
      ok: (val, msg) => {
        record();
        nodeAssert.ok(val, msg);
      },
      strictEqual: (act, exp, msg) => {
        record();
        nodeAssert.strictEqual(act, exp, msg);
      },
      notStrictEqual: (act, exp, msg) => {
        record();
        nodeAssert.notStrictEqual(act, exp, msg);
      },
      deepStrictEqual: (act, exp, msg) => {
        record();
        nodeAssert.deepStrictEqual(act, exp, msg);
      },
      match: (act, regex, msg) => {
        record();
        nodeAssert.match(act, regex, msg);
      },
      doesNotMatch: (act, regex, msg) => {
        record();
        nodeAssert.doesNotMatch(act, regex, msg);
      },
      throws: (fn, exp, msg) => {
        record();
        nodeAssert.throws(fn, exp, msg);
      },
      doesNotThrow: (fn, msg) => {
        record();
        nodeAssert.doesNotThrow(fn, msg);
      },
      greaterThan: (a, b, msg) => {
        record();
        nodeAssert.ok(a > b, msg || `Expected ${a} > ${b}`);
      },
      greaterThanOrEqual: (a, b, msg) => {
        record();
        nodeAssert.ok(a >= b, msg || `Expected ${a} >= ${b}`);
      },
      lessThan: (a, b, msg) => {
        record();
        nodeAssert.ok(a < b, msg || `Expected ${a} < ${b}`);
      },
      lessThanOrEqual: (a, b, msg) => {
        record();
        nodeAssert.ok(a <= b, msg || `Expected ${a} <= ${b}`);
      },
      includes: (haystack, needle, msg) => {
        record();
        nodeAssert.ok(haystack && haystack.includes(needle), msg || `Expected "${needle}" in collection/string`);
      },
      notIncludes: (haystack, needle, msg) => {
        record();
        nodeAssert.ok(!haystack || !haystack.includes(needle), msg || `Expected "${needle}" NOT in collection/string`);
      },
    };
  }

  getSummary() {
    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalDurationMs = 0;

    for (const s of this.suites) {
      totalTests += s.tests.length;
      totalPassed += s.passed;
      totalFailed += s.failed;
      for (const t of s.tests) {
        totalDurationMs += t.durationMs;
      }
    }

    return {
      suites: this.suites.length,
      totalTests,
      totalPassed,
      totalFailed,
      totalAssertions: this.totalAssertions,
      totalDurationMs,
      allPassed: totalFailed === 0,
    };
  }
}

export const harness = new TestHarness();

export function describe(name, fn, meta = {}) {
  const suite = harness.suite(name, meta);
  return fn({
    it: (testName, testFn, testMeta = {}) => harness.runTest(testName, testFn, testMeta),
    test: (testName, testFn, testMeta = {}) => harness.runTest(testName, testFn, testMeta),
  });
}
