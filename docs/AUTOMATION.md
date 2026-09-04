# Source Ingestion Automation & Standing Directives

How new material enters AHKH Study Hub — for the owner and for any present or
future ingestion agent (human-driven or autonomous) with repository access.

---

## 1. The ingestion contract (link or file → lesson)

When given a source (URL or file) for a suitable course, the agent MUST:

1. Read `AGENTS.md` (invariant guardrails), `DESIGN.md` ( Unified Global Design
   System, including §7 Applied Lesson Patterns Inventory), and
   `docs/PROJECT.md` (scope) before touching anything.
2. Load the required skills for the job: transcript ingestion
   (`scripts/fetch-transcripts.mjs`), the paraphrase standard (ADR-009), and
   the editorial component library (`DESIGN.md` §5 + §7).
3. Produce a lesson that reuses the canonical recipes verbatim — never invent
   new styling, eyebrows, helper copy, or color themes.
4. Register the lesson in `src/data/courses.ts`, run `npm run transcripts`
   for videos, then verify with `npm run build` (zero errors mandatory).
5. No surprises: report exactly what was added, which decisions were taken,
   and what still needs the owner's eyes.

## 2. Images rule (mandatory)

- If a source contains images — especially articles — ingest them:
  `public/images/lessons/<lesson-id>/` with descriptive file names.
- Reference them exclusively via `${path('/images/lessons/<lesson-id>/<file>')}`
  inside `contentHtml` (unescaped interpolation — a leading backslash breaks
  the URL). Never hardcode the `/ahkh-study-hub` base.
- Every image gets a meaningful `alt`, `loading="lazy"`, and a figure caption
  where the editorial layout calls for one.

## 3. Unavailable sources (hard stop)

- If a source is paywalled, dead, login-walled, or otherwise not publicly
  retrievable: STOP, do not fabricate content or images, and ask the owner to
  provide the material. This rule has zero exceptions.

## 4. Third-party link review flow

- Links submitted by anyone other than the owner are reviewed first against
  scope, quality, copyright safety (ADR-009), and design fit; the agent then
  reports the verdict to the owner. No silent ingestion.

## 5. Local user conversion (FUTURE — not now)

- Vision: the app ships a copy-ready prompt so any user can hand a source +
  the prompt to any local agent and receive a lesson in house style; possible
  integrations with external AI apps follow the same contract above.
- Explicitly deferred until the core reading/learning experience is polished
  and the Tauri local app lands. No implementation work before then.

## 6. Current priority order (binding)

1. Reader + reading-experience polish (no new features).
2. Highlighting experience polish.
3. Tauri local app.
4. Course content completion comes only after 1–2.
