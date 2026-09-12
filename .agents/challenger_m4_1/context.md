# Challenger M4-1 Context: Editorial Components Stress & Edge-Case Verification

## Identity
- Role: Challenger (`teamwork_preview_challenger`)
- Directory: `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m4_1`
- Milestone: Milestone 4 (Standardized Lesson Content Formatting Framework)

## Mandatory References
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\orchestrator_2\PROJECT.md`
- `c:\Users\abdel\dev\ahkh-study-hub\.agents\worker_m4_1\handoff.md`
- `src/components/editorial/`

## Task
1. Author an empirical test script that renders or verifies the 5 editorial components across boundary and edge cases:
   - Extreme input lengths (very long quotes, multi-paragraph bodies).
   - Missing optional props (e.g. `role`, `source`, `kicker`, `caption`).
   - Special typographical characters (`&mdash;`, `&nearr;`, HTML entities).
   - Slot content handling in `KeyPrinciple` and `SocraticCallout`.
   - Table edge cases in `DataMatrix` (single row, many columns, empty cells).
2. Verify that rendered output strictly obeys:
   - Zero emojis, zero double-slashes `//`.
   - Pure white canvas `#FFFFFF` and neutral zinc borders.
   - Seven signal hues text-only (teal kicker `text-teal-700 dark:text-teal-400`).
3. Run `npm test` and your empirical challenge script.
4. Output your report to `c:\Users\abdel\dev\ahkh-study-hub\.agents\challenger_m4_1\report.md` and `handoff.md`. Clearly state verdict: APPROVE or REQUEST_CHANGES. Report back via send_message.
