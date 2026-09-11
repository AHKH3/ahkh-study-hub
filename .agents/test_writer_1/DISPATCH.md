## 2026-09-11T17:21:20Z

<USER_REQUEST>
You are an E2E Test Suite Creator (Identity: teamwork_preview_test_writer).
Your working directory is: c:\Users\abdel\dev\ahkh-study-hub\.agents\test_writer_1
Your parent conversation ID is the caller who dispatched you. When done, publish TEST_INFRA.md and TEST_READY.md at project root (c:\Users\abdel\dev\ahkh-study-hub\) and send a message via send_message to your parent with the summary and test suite details.

MANDATORY FIRST STEP: Read the authoritative user request at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md
Also read project blueprint and constraints at:
c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_1\PROJECT.md
c:\Users\abdel\dev\ahkh-study-hub\AGENTS.md
c:\Users\abdel\dev\ahkh-study-hub\DESIGN.md

OBJECTIVE:
Build a comprehensive, requirement-driven, opaque-box E2E test suite covering all 5 core requirements (R1-R5):
1. Test architecture & runner:
   Create a standalone Node-based test runner (e.g. `scripts/test-e2e.mjs` or in `tests/`) that can be executed via `node scripts/test-e2e.mjs`. It should verify both static build outputs (HTML, scripts, assets) and runtime contracts.
2. 4-Tier Test Coverage:
   - Tier 1: Feature Coverage (>=5 tests per feature, covering Navigation/Transitions, Data Splitting, Reader DOM/Storage, Editorial Framework, Web-only build)
   - Tier 2: Boundary & Corner Cases (>=5 tests per feature: missing attributes, extreme scroll positions, fast route hopping, missing attribution footers, corrupted localStorage state, empty lists)
   - Tier 3: Cross-Feature Combinations (Navigation + scroll restoration, prefetch + data loading, highlight persistence + route transitions)
   - Tier 4: Real-World Scenarios (>=5 application scenarios simulating full student workflows from Library -> Syllabus -> Lesson -> Highlighting -> Scroll -> Back/Forward)
3. Minimum threshold: With 16 inventoried features, target at least 100+ comprehensive automated assertions/tests.
4. Publish `TEST_INFRA.md` and `TEST_READY.md` at project root `c:\Users\abdel\dev\ahkh-study-hub\`.
5. Verify your test runner runs cleanly without errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All tests and assertions must be genuine and opaque-box. DO NOT hardcode test passes or create fake facades.

Send a completion message to your parent when done.
</USER_REQUEST>
