# FRAMEWORK.md — Lesson Production Framework (authoring-agent contract)

Status: binding for any agent authoring lessons (Katib, Musammim, Noir, external CLIs).
Companions: `DESIGN.md` (visual truth), `AGENTS.md` (guardrails), `docs/PROJECT.md` (scope).
Rule of precedence on conflict: AGENTS.md invariants > this file > drafts.

---

## Part 1 — Writing & Pedagogy

### 1.1 Voice
- One sentence = one idea. Max 22 words (Arabic), 25 (quoted English). Paragraph: 2–5 sentences, then a break. Longer splits mandatorily.
- Lead: 2–4 sentences. Explanation paragraph: max 120 words. Synthesis card: max 60 words.
- Address the reader as **أنت** always. No agent **أنا**, no "as an AI" sentences. Source authors named explicitly, then third person only.
- Tone: calm teacher to one student, declarative, verb-first when possible. No manufactured hype, no consecutive rhetorical questions.
- Body in simplified Modern Standard Arabic (light Egyptian tint allowed). Stable UX terms stay English: first occurrence Arabic followed by English in parentheses, then English alone. Never Arabize stable terms (usability, heuristic, affordance, wireframe). People/tools/companies always English, never translated. No Arabizi ever. Latin numerals. English mid-Arabic-line stays LTR-clean.
- Banned (fail review on sight): في عالم اليوم سريع الإيقاع، من الجدير بالذكر، لا شك أن، هيا بنا نستكشف، عزيزي القارئ، رحلة شيقة، انغمس، نسيج، يفتح آفاقا، يغير قواعد اللعبة، delve، tapestry، unlock، supercharge، embark، game-changer، vibrant، crucially، repeated moreover، Curriculum Roadmap، Click any lesson، Enroll now، Sign up — plus any marketing sentence about the platform or the course.
- Absolute: zero emojis, zero decorative `//`, zero marketing, zero promotional sub-headers above the original title.

### 1.2 Lesson anatomy (fixed spine, no exceptions)
1. **Title + Lead (mandatory).** Original lesson title verbatim; 2–4 sentence lead stating the central question. Lead is always editor-made, always `synthesized`.
2. **Pullout Axiom (0–2).** Foundational principle or pivotal sentence ONLY, verbatim from source + author/source credit. Never for ordinary sentences or editor summaries.
3. **Faithful body (mandatory).** Source paragraphs in original logic, verbatim. No summarizing, no rephrasing. Marketing deletions logged (see 1.4).
4. **Synthesis cards (mandatory, 1–3).** After each big idea: definition or working rule, ≤60 words each, always `synthesized` and labeled.
5. **Data Matrix (0–2, comparison only).** Only when the source itself compares (A vs B, before/after, pros/cons). Never decorative.
6. **Socratic Callout (0–1).** One open reflection question, no model answer, placed after mid-lesson. Never graded.
7. **Self-Test block (mandatory, 2–4 questions).** Last teaching element. Spec in 1.5.
8. **Source Attribution Footer (mandatory, absolute last line).** Author, source title, year if known, one link. Nothing before it except the honesty line (1.4); nothing after it.
- Units pages are grouping only (title + lesson list). No prose, no cards, no helper micro-copy anywhere.
- The five components above (+ Self-Test + Footer) are the ONLY allowed blocks. No sixth invention.

### 1.3 Modes: faithful vs synthesized
- **faithful** = source text verbatim (articles, transcripts, extracted PDFs). Zero summary, zero rephrase, zero addition, zero silent deletion. Used for all substance, definitions, quotes, video timestamp blocks.
- **synthesized** = agent-written (lead, transitions, synthesis cards, new examples, bridges, questions). Allowed ONLY at the spine positions above; must never smuggle new facts as source claims.
- **Labeling rule (text, never color):** faithful paragraphs plain (direct quotes in quotation marks + credit). Every synthesized block OPENS with exactly one of: خلاصة المحرر / ربط المحرر / مثال توضيحي من المحرر / سؤال المحرر. The prefix is visible reader text, always.
- One paragraph = one mode. Max one labeled transition sentence between paragraphs. If the source is gappy, write a labeled synthesized block naming the gap — never patch the original silently.

### 1.4 Deletion honesty
Source marketing (sign up, join us…) is deleted, each deletion logged in ONE line before the footer: حذف المحرر من المصدر: + few words.

### 1.5 Self-Test block
- Position: after last synthesis card, before footer. 2–4 questions, one test point each, no two-parters.
- Anatomy per question: number → ONE difficulty tag (تذكر | فهم | تطبيق) → question (15–30 words, direct أنت, no answer leak, no outside-lesson knowledge, no opinion) → model answer hidden by default (2–4 sentences, answers only, no new facts, never a copied paragraph) → one-line check starting إجابتك سليمة لو + the required core.
- Distribution: ≥1 تذكر (definition/principle) and ≥1 تطبيق (real UX situation, reader decides) per lesson.
- Banned: scores, percentages, grades; questions answerable from the question itself; questions on deleted details.

---

## Part 2 — Visual System

### 2.1 NEVER (authoring agent must not touch)
Canvas `#FFFFFF` / `#09090B`; secondary `#FAFAFA`; 1px `#E4E4E7`/`#27272A` rules; carbon ink `#18181B` body; color ONLY on `font-mono/text-xs` metadata (600–700 light, 400 dark); no colored backgrounds/pills; no orange/terracotta as theme; Newsreader/Inter/JetBrains Mono only, allowed sizes `xs–4xl` (+`5xl` H1, `10px` counters, `11px` micro-labels); UI max `medium`, card titles `semibold`, stats `bold`; zero emoji/`//`/gradients/floating shadows/whole-element hover motion/cards-in-cards/kickers. Every non-prose block in `contentHtml` carries `not-prose`.

### 2.2 MAY (compose freely)
Block order per pedagogical narrative; dropping unneeded optionals (per §2.3 caps); assets BY NAME from `public/images/lessons/[lesson-id]/` + kind per decision tree (§2.4); captions + `Figure` numbers; Q&A hidden-answer texts.

### 2.3 Component catalog (purpose + caps)
| Block | Cap | Hard rule |
|---|---|---|
| Pullout Axiom | 0–2 | Verbatim + `— Name, Source` credit line; never editor summary |
| Synthesis Card | 1–3, mandatory | `Key Principle NN` mono label; ≤60 words; never a copied paragraph |
| Socratic Callout | 0–1 | Fixed `Inquiry for Reflection` label; no model answer; never back-to-back |
| Data Matrix | 0–2 | Real comparison, same dimensions; ≤3 cols × 6 rows; no cell colors (Before/After pair per DESIGN.md §7.3 only) |
| Self-Test | 1 section, 2–4 Qs | `Self-Test NN` labels; answers hidden until click; never visible on first paint |
| Attribution Footer | 1, last | `Source: Name (Year, Title)` + one `Read original source` link (`rel=noopener`, `_blank`) |

### 2.4 Illustration style + decision tree
**Doodle tokens (binding):** rough black marker `#18181B`, 3–5px, uneven grainy edges (no smooth vector); ONE warm orange `~#E8930C` flat fill on ONE element only (≤15% of artwork); plain `#FFFFFF` paper bg; max two objects per composition; max one short handwritten word; max 2 doodles per lesson; no gradients/shadows/text-heavy scenes.
**Tree:** `doodle` = abstract concept or study habit, carries no precise data → `diagram-as-code (SVG/Tailwind, monochrome only)` = anything structural (wireframes, sitemaps, schemas) — never rasterized → `AI-generated` = realistic scene with no public screenshot — last resort before photo → `real photo` = real production UI only (public source + caption + credit); proprietary/doubtful → rebuild as SVG/AI. Doodles and saturated photos never adjacent — separate with heading or ≥1 text block.

### 2.5 Locked image-gen preset (paste verbatim + negatives, no extra style adjectives)
Style: `hand-drawn notebook doodle icon, thick rough black marker strokes (#18181B) with visible grain and uneven edges, flat fill in ONE warm orange (~#E8930C) on a single element only (max 15% of artwork), plain white paper background (#FFFFFF), minimal composition max two objects, no text unless one short handwritten word, editorial study-notebook feel`
Negatives: `no photorealism, no 3D render, no gradients, no shadows, no neon, no pastel palette, no extra colors besides black and single warm orange, no crowded scene, no watermark, no logo, no emoji, no code syntax, no double slashes`
Square, explicit white bg. Any second color or gradient = reject and regenerate. Filename: `public/images/lessons/[lesson-id]/doodle-[slug].png`.

### 2.6 Real photos
`figure.my-8.not-prose`, canvas width only, `border border-ink-border rounded-xs`, no shadow, no full-bleed, no misleading crops. Mandatory centered caption `Figure NN: analytic description + (Source)`. As-is colors (no filters); max 2 per lesson; none in abstract-concept lessons; video lessons prioritize timestamped transcript blocks. Dark mode: `dark:border-dark-border` only, never invert.

### 2.7 Provenance & storage
Every asset carries `data-provenance`: `curated` (public screenshot, source in caption) / `generated` (no external credit) / `external` (OFF by default; explicit approval + reason in caption + mono 11px credit line under caption). Local files only (`public/images/lessons/[lesson-id]/`, descriptive names) + frontmatter registry `assets: [{file, kind: doodle|diagram|photo, provenance, source?}]`. Unregistered asset = build violation. No hotlinks, no blurry/placeholder images.

---

## Part 3 — Unified validator (ALL must PASS; one FAIL = reject delivery)
**Text:** 1) source verbatim, silent deletions zero; 2) axioms 0–2, all credited; 3) synthesis 1–3, ≤60 words each; 4) every synthesized block opens with an approved prefix; 5) no mixed-mode paragraph; 6) matrices 0–2, comparison-only; 7) socratic 0–1, no model answer; 8) self-test present (2–4 Qs, ≥1 تذكر + ≥1 تطبيق, answers hidden 2–4 sentences + check line); 9) first English term parenthesized, then English alone; 10) zero emoji/`//`/banned-phrase/marketing; 11) units grouping-only; 12) footer last + honesty line for deletions; 13) sentence/paragraph length caps.
**Build:** 14) all non-prose blocks carry `not-prose`; 15) no banned sizes/weights/colors/gradients/shadows/motion; 16) doodles ≤2, photos ≤2, orange ≤15% inside art only, never chrome; 17) every asset has `data-provenance` + frontmatter registry entry, local file exists; 18) jawab: no visible answers on first paint; links use `path()` (no hardcoded base).

## Conflict resolutions (writer draft vs designer draft)
- Self-Test: single mandatory end-section (writer) with per-question anatomy (designer). No scattered question blocks.
- Socratic: 0–1 (writer, stricter). Synthesis: mandatory 1–3 (writer). Axiom: 0–2 verbatim (both).
- Orange: illustration-only containment (designer) stands against the AGENTS.md theme ban — no contradiction, different layers.
