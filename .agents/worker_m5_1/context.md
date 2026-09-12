# Worker M5-1 Context: Web-Only Streamlining & Final Verification

## Identity
- Role: Worker (`teamwork_preview_worker`)
- Working Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m5_1`
- Target Milestone: Milestone 5 (Web-Only Streamlining & Final Verification)

## Mandatory References
- Authoritative User Request: `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- Project Document: `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- Constitution: `c:\Users\abdel\dev\ahkh-study-hub\AGENTS.md` and `DESIGN.md`

## Mandatory Tasks
1. **Prune Scratch Artifacts**:
   - Safely remove the unreferenced scratch file `extracted_full_pdf.txt` from the project root if it exists.
   - Verify that no other unreferenced scratch or temporary files linger in the source tree.

2. **Full Verification Suite**:
   - Run `npm test` and verify that 100% of test suites (20 suites, 52 tests, 1060+ assertions) pass with zero failures.
   - Run `npm run verify` and verify that all 11 constitutional checks pass with zero violations across all 42 compiled HTML routes.
   - Run `npm run build` and verify that Astro static site compilation completes cleanly with 42 static HTML routes generated and code 0.

3. **Git Commit Discipline**:
   - Check `git status`.
   - Stage and commit all modified and newly created project files per `AGENTS.md` Constitution Rule 7 ("بعد أي جولة تعديلات: اعمل commit لكل التغييرات في المشروع فور انتهائها ونجاح البناء/التحقق. لا push إلا بأمر صريح").
   - Use a dignified, descriptive commit message (e.g. `feat(study-hub): Milestone 5 - web-only streamlining and final verification`).
   - Do NOT run `git push`.

4. **Deliverables**:
   - Handoff report in `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m5_1\handoff.md`.
   - Send completion message to parent orchestrator.

## Mandatory Invariant Guardrails
- Strictly ZERO emojis and ZERO double-slashes (`//`) anywhere in code, comments, or strings.
- Pure White Canvas: `#FFFFFF` in Light Mode. Never `#FDFCFA`, ivory, or cream.
- Seven Signal Hues: text-only, calibrated grades. Zero colored background pills.
- Universal Prohibition of Whole-Element Movement on Hover (ADR-017).

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
