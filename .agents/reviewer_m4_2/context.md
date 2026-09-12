# Reviewer M4-2 Context: Lesson Attribution & Documentation Review

## Identity
- Role: Reviewer (`teamwork_preview_reviewer`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\reviewer_m4_2`
- Milestone: Milestone 4 (Standardized Lesson Content Formatting Framework)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m4_1\handoff.md`
- `src/data/courses/springboard-ux/lessons/ui-design-fundamentals-and-color.ts` (`sb-6-1`)
- `src/data/courses/springboard-ux/lessons/moderated-usability-testing-and-the-five-act-interview.ts` (`sb-7-1`)
- `src/data/courses/springboard-ux/lessons/breaking-into-ux-and-career-strategy.ts` (`sb-8-1`)
- `src/data/courses.ts`
- `docs/EDITORIAL_FRAMEWORK.md`

## Review Focus
1. **Lesson Attribution Footers Repair**:
   - Verify that `sb-6-1`, `sb-7-1`, and `sb-8-1` contain the standardized source attribution block with valid external URLs, clean bibliographic format, and teal kicker.
   - Verify that both the granular lesson files and `courses.ts` are 100% synchronized.
   - Verify that all 37 lessons now have verified attribution footers.
2. **Editorial Documentation Review**:
   - Inspect `docs/EDITORIAL_FRAMEWORK.md` to ensure it comprehensively covers all 5 components, code examples, props, and constitutional rules.
3. **Build & Test Verification**:
   - Run `npm test`, `npm run verify`, and `npm run build`.
4. Output your review report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\reviewer_m4_2\report.md` and `handoff.md`. Clearly state verdict: APPROVE or REQUEST_CHANGES. Report back via send_message.
