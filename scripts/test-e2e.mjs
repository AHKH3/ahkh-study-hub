#!/usr/bin/env node

/**
 * AHKH Study Hub - Master E2E Test Runner
 *
 * Requirements-driven, opaque-box E2E test runner covering R1 through R5:
 * - R1: Instant Client-Side Navigation & Zero-Flicker Transitions
 * - R2: Data Splitting & Lazy-Loaded Course Bundles
 * - R3: Reader DOM Engine & Local Storage High-Performance Tuning
 * - R4: Standardized Lesson Content Formatting Framework
 * - R5: Web-Only Streamlining & Constitutional Integrity
 *
 * 4-Tier Test Coverage:
 * - Tier 1: Feature Coverage (>=5 tests per requirement)
 * - Tier 2: Boundary & Corner Cases (>=5 tests per feature)
 * - Tier 3: Cross-Feature Combinations
 * - Tier 4: Real-World Student Workflows (>=5 full scenarios)
 *
 * Usage:
 *   node scripts/test-e2e.mjs
 *   node scripts/test-e2e.mjs --tier=1
 *   node scripts/test-e2e.mjs --verbose
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { harness } from '../tests/utils/test-framework.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// CLI Argument Parsing
const args = process.argv.slice(2);
const tierArg = args.find((a) => a.startsWith('--tier='))?.split('=')[1];
const isVerbose = args.includes('--verbose') || args.includes('-v');

// Color helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

async function main() {
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  AHKH Study Hub — Comprehensive E2E Verification Suite${colors.reset}`);
  console.log(`${colors.dim}  Opaque-Box Architecture, Build Integrity & Runtime Contract Testing${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.bold}Core Requirements in Scope:${colors.reset}`);
  console.log(`  • ${colors.blue}R1:${colors.reset} Instant Client-Side Navigation & Zero-Flicker Transitions`);
  console.log(`  • ${colors.blue}R2:${colors.reset} Data Splitting & Lazy-Loaded Course Bundles`);
  console.log(`  • ${colors.blue}R3:${colors.reset} Reader DOM Engine & Local Storage Tuning`);
  console.log(`  • ${colors.blue}R4:${colors.reset} Standardized Lesson Content Formatting Framework`);
  console.log(`  • ${colors.blue}R5:${colors.reset} Web-Only Streamlining & Build Verification\n`);

  const startTime = performance.now();

  const tierFiles = [
    { tier: 1, file: '../tests/e2e/tier1-features.test.mjs', label: 'Tier 1: Feature Coverage' },
    { tier: 2, file: '../tests/e2e/tier2-boundaries.test.mjs', label: 'Tier 2: Boundary & Corner Cases' },
    { tier: 3, file: '../tests/e2e/tier3-combinations.test.mjs', label: 'Tier 3: Cross-Feature Combinations' },
    { tier: 4, file: '../tests/e2e/tier4-scenarios.test.mjs', label: 'Tier 4: Real-World Student Scenarios' },
  ];

  const selectedTiers = tierArg
    ? tierFiles.filter((t) => String(t.tier) === String(tierArg))
    : tierFiles;

  for (const t of selectedTiers) {
    const prevSuiteCount = harness.suites.length;
    await import(t.file);
    const newSuites = harness.suites.slice(prevSuiteCount);

    console.log(`${colors.bold}${colors.magenta}▶ ${t.label}${colors.reset}`);
    for (const suite of newSuites) {
      console.log(`  ${colors.bold}${suite.name}${colors.reset}`);
      for (const test of suite.tests) {
        const symbol = test.passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        const time = `${colors.dim}(${test.durationMs.toFixed(1)}ms, ${test.assertions} assertions)${colors.reset}`;
        console.log(`    ${symbol} ${test.name} ${time}`);
        if (!test.passed && test.error) {
          console.log(`      ${colors.red}${test.error.message}${colors.reset}`);
          if (isVerbose && test.error.stack) {
            console.log(`      ${colors.dim}${test.error.stack}${colors.reset}`);
          }
        }
      }
    }
    console.log('');
  }

  const summary = harness.getSummary();
  const totalDurationSec = ((performance.now() - startTime) / 1000).toFixed(2);

  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  E2E Test Execution Summary${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  Test Suites:     ${summary.suites}`);
  console.log(`  Total Tests:     ${summary.totalTests}`);
  console.log(`  Passed Tests:    ${colors.green}${summary.totalPassed}${colors.reset}`);
  console.log(`  Failed Tests:    ${summary.totalFailed > 0 ? colors.red : colors.green}${summary.totalFailed}${colors.reset}`);
  console.log(`  Total Assertions:${colors.bold} ${summary.totalAssertions}${colors.reset}`);
  console.log(`  Duration:        ${totalDurationSec}s\n`);

  if (summary.allPassed) {
    console.log(`${colors.bold}${colors.green}✓ ALL TESTS & AHKH CONSTITUTIONAL CONTRACTS VERIFIED CLEANLY!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.bold}${colors.red}✗ VERIFICATION FAILED WITH ${summary.totalFailed} ERROR(S)${colors.reset}\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
