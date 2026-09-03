# Design Critique: The Commonplace Book (`src/pages/commonplace.astro`)

⚠️ DEGRADED: single-context (parent execution context)

## Target
`src/pages/commonplace.astro`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Real-time counts on filter tabs, search results counter, export button enable/disable states |
| 2 | Match System / Real World | 4 | Authentic commonplace book metaphor; scholarly blockquotes with cited authors and lesson provenance |
| 3 | User Control and Freedom | 4 | Search with instant `/` shortcut, clearable input, filter by marginalia or course, reversible archive with undo |
| 4 | Consistency and Standards | 4 | Strict monochrome palette; standard RFC 4180 Readwise CSV and Markdown export schemas |
| 5 | Error Prevention | 4 | Deletion confirmation modal prevents accidental loss; disabled exports when empty |
| 6 | Recognition Rather Than Recall | 4 | Course badges, lesson links, exact timestamps, and inline notes clearly juxtaposed |
| 7 | Flexibility and Efficiency | 4 | Keyboard shortcuts (`/` for search, `Esc` to clear), dynamic course-level filter tabs |
| 8 | Aesthetic and Minimalist Design | 4 | Stripped of all AI-slop (no eyebrows, no subtitle decks, no artificial glowing colors); pure typography |
| 9 | Error Recovery | 3 | Toast notification with undo action on archive; needs toast persistence configuration |
| 10 | Help and Documentation | 3 | Pristine empty state explains what commonplace is and provides clear navigational prompts |
| **Total** | | **38/40** | **Outstanding** |

## Design Specificity Verdict
- **LLM Assessment**: The Commonplace Book has achieved true scholarly dignity. It avoids the common trap of feeling like a generic "notes app" or CRUD dashboard. By presenting extracted text as authoritative editorial blockquotes alongside handwritten-style marginalia and academic provenance links, it functions as a digital continuation of the Renaissance commonplace book tradition.
- **AI-Slop Cleanliness**: Completely purged of formulaic eyebrows, italic teaser decks, and arbitrary purple accent tints. Now 100% grounded in high-contrast editorial monochrome.
- **Deterministic Check**: Build verification clean (`0` syntax errors, `10/10` static pages compiled).

## Cognitive Load Assessment
- **Checklist Failures**: 0.
- **Visible Decision Points**: 3 primary actions (Filter tab selection, Search query, Export format). Well below the cognitive threshold of 4+.
- **Information Chunking**: Each entry is visually grouped as: [Course Pill + Lesson Anchor + Timestamp + Actions] -> [Blockquote] -> [Marginalia Note]. Scanability is effortless.

## Emotional Journey
- **Arrival (First Highlight)**: Learner sees their intellectual effort reflected immediately in a clean, archive-grade feed.
- **Empty State**: Reassuring and dignified ("Your Commonplace Book is Pristine") rather than apologetic or jarring.
- **Peak Moment (Export to Readwise)**: Instant single-click download with zero paywalls or registration dialogs, affirming the user's sovereign ownership of their data.

## Priority Issues

### [P2] What: Export action lacks a visual confirmation badge or post-download toast
- **Why it matters**: When clicking "Export to Readwise (CSV)" or "Export Markdown", the file downloads via browser silently. Users benefit from brief visual reassurance (e.g., a subtle "Downloaded readwise_highlights.csv" toast).
- **Fix**: Trigger the existing toast system with a success message when the Blob download completes.
- **Suggested command**: `/impeccable polish`

### [P3] What: No bulk archive or selective export
- **Why it matters**: As the commonplace collection grows into hundreds of passages across multiple courses, learners may want to export highlights for only a single course rather than all courses at once.
- **Fix**: Update export logic to respect the currently active course filter tab.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags
- **Alex (Power Scholar)**: Extremely pleased with the `/` search shortcut and Readwise CSV schema. Desires bulk tagging or multi-select export in future iterations.
- **Jordan (Casual Learner)**: Understands the purpose immediately; finds the blockquote + note layout much easier to read than Notion tables.
- **Sam (Keyboard & Screen Reader User)**: Clean ARIA live regions for counter and search results; high contrast exceeds WCAG AAA.

## Trend & Persistence
> **Trend for `src-pages-commonplace-astro`: 38 (out of 40)**
