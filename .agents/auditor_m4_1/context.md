# Forensic Auditor M4-1 Context: Integrity Verification

## Identity
- Role: Forensic Auditor (`teamwork_preview_auditor`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\auditor_m4_1`
- Milestone: Milestone 4 (Standardized Lesson Content Formatting Framework)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m4_1\handoff.md`
- `src/components/editorial/`
- `src/data/courses/springboard-ux/lessons/`
- `docs/EDITORIAL_FRAMEWORK.md`

## Forensic Audit Protocol
1. **Static Analysis & Anti-Cheat Audit**:
   - Inspect all files under `src/components/editorial/`: ensure authentic Astro templates with typed interfaces, real rendering logic, and zero mock/facade implementations.
   - Inspect repaired attribution blocks in `sb-6-1.ts`, `sb-7-1.ts`, and `sb-8-1.ts`: verify real citations with genuine source URLs and author attributions.
   - Inspect `docs/EDITORIAL_FRAMEWORK.md`: verify comprehensive documentation of all 5 components, API tables, and constitutional rules.
2. **Constitutional Compliance Audit**:
   - Verify zero emojis across all new and modified files.
   - Verify zero double-slashes (`//`) in UI strings or comments.
   - Verify pure white canvas `#FFFFFF` and seven signal hues compliance.
3. **Execution Validation**:
   - Run `npm test` and `npm run verify` to confirm authentic test runs.
4. Output your detailed audit report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\auditor_m4_1\report.md` and `handoff.md`. Clearly state binary verdict: CLEAN or INTEGRITY VIOLATION. Report back via send_message.
