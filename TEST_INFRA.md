# AHKH Study Hub — E2E Test Infrastructure Specification

This document details the test infrastructure, runner architecture, and verification methodologies created for **AHKH Study Hub**.

---

## 1. Test Architecture Overview

The test framework is a **zero-dependency, high-speed, opaque-box E2E test engine** built natively on Node.js 24+. It executes comprehensive static artifact audits and dynamic runtime simulation in under 500ms.

```
ahkh-study-hub/
├── scripts/
│   ├── test-e2e.mjs                  # Master E2E test runner CLI
│   ├── verify-dist.mjs               # 11 constitutional checks audit
│   └── check-inline-scripts.mjs      # AST script syntax auditor
├── tests/
│   ├── utils/
│   │   ├── test-framework.mjs        # BDD test harness with assertion tracking
│   │   ├── dist-inspector.mjs        # Static HTML/CSS/JS parser and crawler
│   │   └── dom-runtime.mjs           # Virtual browser DOM & lifecycle simulator
│   └── e2e/
│       ├── tier1-features.test.mjs   # Tier 1: Feature Coverage (R1–R5)
│       ├── tier2-boundaries.test.mjs # Tier 2: Boundary & Corner Cases
│       ├── tier3-combinations.test.mjs# Tier 3: Cross-Feature Combinations
│       └── tier4-scenarios.test.mjs  # Tier 4: Real-World Student Scenarios
├── TEST_INFRA.md                     # This infrastructure specification
└── TEST_READY.md                     # Test suite readiness & execution report
```

---

## 2. Verification Modes

The suite operates via dual-mode verification:

### 2.1. Static Artifact & Build Output Verification
- Inspects all 42 statically generated HTML pages in `dist/`.
- Audits CSS stylesheets in `dist/_astro/` for constitutional token locks, locked font voices, and signal hues.
- Audits script bundles in `dist/scripts/` to enforce library externalization (ADR-027).
- Verifies base-path routing integrity (`/ahkh-study-hub`) across all internal links.
- Enforces strict craft rules: zero emojis, zero double-slash eyebrows (`//`), zero whole-element hover movements (ADR-017).

### 2.2. Virtual Browser & Runtime Contract Simulation
- Uses `tests/utils/dom-runtime.mjs` to create an SSR-safe browser context (`window`, `document`, `localStorage`, `history`, `AbortController`, `requestAnimationFrame`).
- Executes the actual production `public/scripts/reader.js` code in an isolated `node:vm` sandbox.
- Exercises the complete 4-state reading lifecycle (`new` → `explored` → `reading` → `completed`).
- Tests localStorage persistence across all namespaces (`ahkh_hl_*`, `ahkh_scroll_*`, `ahkh_read_*`, `ahkh_opened_*`, `ahkh_reading_*`, `ahkh_theme`, `ahkh_hl_color`).
- Simulates user interactions: text selections, marginal notes, theme toggling, scroll depth tracking, and route swap teardown.

---

## 3. How to Run the Tests

### Primary Commands
```bash
# Run the complete E2E test suite (all 4 tiers, 49 tests, 970 assertions)
npm test

# Equivalent direct command
node scripts/test-e2e.mjs

# Run a specific tier only
node scripts/test-e2e.mjs --tier=1
node scripts/test-e2e.mjs --tier=2
node scripts/test-e2e.mjs --tier=3
node scripts/test-e2e.mjs --tier=4

# Run with full verbose stack traces
node scripts/test-e2e.mjs --verbose
```

### Full Verification Pipeline
```bash
# Verify scripts and dist constitutionality
npm run verify

# Verify complete E2E suite
npm test
```

---

## 4. 4-Tier Test Structure

| Tier | File | Focus | Tests | Assertions |
|---|---|---|---|---|
| **Tier 1** | `tests/e2e/tier1-features.test.mjs` | Feature coverage across all 5 core requirements (R1–R5) | 27 | 897 |
| **Tier 2** | `tests/e2e/tier2-boundaries.test.mjs` | Resilience against corrupted storage, NaN offsets, hopping, XSS | 12 | 35 |
| **Tier 3** | `tests/e2e/tier3-combinations.test.mjs` | Cross-feature couplings (scroll + navigation, abort + swap) | 5 | 18 |
| **Tier 4** | `tests/e2e/tier4-scenarios.test.mjs` | End-to-end student workflows from discovery to completion | 5 | 20 |
| **Total** | **All 4 Tiers** | **Comprehensive Full-Spectrum Verification** | **49** | **970** |

---

## 5. Downstream Agent Integration (Milestones M1–M5)

Sub-orchestrators and implementing agents working on milestones M1 through M5 must use this test infrastructure to verify progressive milestones:

1. **Before Commencing**: Run `npm test` to verify baseline pass (49/49 passing).
2. **During Milestone Implementation**:
   - `M1 (Data Splitting)`: Run `node scripts/test-e2e.mjs --tier=1` to verify `R2-F1` through `R2-F5`.
   - `M2 (Navigation & Prefetching)`: Verify `R1-F1` through `R1-F6` and `T3-C2`.
   - `M3 (Reader DOM & Storage)`: Verify `R3-F1` through `R3-F5`, `T2-B1` through `T2-B8`, and `T4-S2`–`T4-S3`.
   - `M4 (Editorial Framework)`: Verify `R4-F1` through `R4-F6`.
   - `M5 (Web-Only Streamlining)`: Verify `R5-F1` through `R5-F5` and run full `npm test && npm run verify`.
3. **Commit Gate**: Never commit changes if `npm test` fails.
