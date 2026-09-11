# Minimal Content Framework v0 — Original First, Enhancement Only

This is the whole framework. A lesson is either inside it or it does not ship. No conversation needed: follow the checklist in section 6.

## 1. The one rule

Keep the original text of everything, including articles. The framework only enhances: it strips page junk and improves formatting. It never rewrites, never summarizes, never invents.

## 2. Strip list (delete on sight)

Navigation menus, ads, promo banners, newsletter boxes, cookie notices, share widgets, related-post rails, author bio boxes, comment sections, read-next cards, any sentence selling the source platform. The author's name survives only in the attribution footer.

## 3. Keep list (verbatim, always)

Every surviving sentence stays word for word. Code blocks stay character for character. Numbers, steps, examples, warnings, and image captions stay untouched. Original images stay as they are with their original captions; no generated or replacement images in v0.

## 4. Allowed formats (closed set, copy the snippets)

Lead paragraph:

<p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">First paragraph of the source.</p>

Numbered section heading with anchor (matches the outline array):

<h2 id="sec-slug">1. Section Title As Written</h2>

Plain paragraphs, emphasis only where the source emphasizes:

<p>Body text with <strong>source emphasis kept</strong> and <em>source italics kept</em>.</p>

Lists only where the source lists:

<ul><li>First item as written.</li><li>Second item as written.</li></ul>

Standing quote for the one commanding sentence per section at most:

<blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4"><p>Quoted sentence exactly as written.</p></blockquote>

Comparison table for contrasts the source already makes:

<div class="my-8 overflow-x-auto not-prose"><table class="w-full text-left text-sm sm:text-base font-sans border-collapse border-y border-ink-border dark:border-dark-border"><thead><tr class="border-b border-ink-border dark:border-dark-border text-xs sm:text-sm font-mono uppercase tracking-widest font-bold"><th class="py-3.5 pr-4">First Column</th><th class="py-3.5 px-4">Second Column</th></tr></thead><tbody class="divide-y divide-ink-border dark:divide-dark-border"><tr><td class="py-4 pr-4">Cell as written.</td><td class="py-4 px-4">Cell as written.</td></tr></tbody></table></div>

Original figure, unchanged image plus its caption:

<div class="my-8 text-center not-prose"><img src="ORIGINAL_PATH" alt="Plain description of what the image shows" class="mx-auto rounded-xs border border-ink-border dark:border-dark-border" loading="lazy"><p class="text-xs sm:text-sm font-sans text-ink dark:text-dark-ink mt-3">Figure N: Original caption as written.</p></div>

Video lesson keeps its player plus transcript blocks with timestamps (existing media sync, unchanged).

Every lesson ends with the source attribution footer: derived-work note, author, platform, original link, fidelity mark (S, E, or O).

## 5. Banned in v0

Summaries, paraphrase of the default path, new examples, generated images, replacement visuals, promotional copy, emojis, programming-syntax decoration, redundant section eyebrows, any color or radius or shadow outside DESIGN.md tokens.

## 6. Adding checklist (no agent talk needed)

1. Paste the source text after applying the strip list.
2. Mark sections with numbered h2 headings and matching outline ids.
3. Wrap the opening paragraph as lead, quotes as blockquote, contrasts as table, original images as figure.
4. Fill metadata: id, slug, title, module, type, readTime, originalSourceUrl, originalSourceLabel, fidelity mark.
5. Run the build plus verify: zero errors or the lesson does not ship.
6. Read the rendered page once: if any sentence is not the source's, delete your addition.

## 7. PDF rule (v0)

Text-selectable PDF: extract the text into the study layer and attach the original file beside it. Scanned or locked PDF: embed the file as is and take notes with page numbers. Screenshot-region capture as highlight is a recorded later feature, not v0.

## 8. Highlights rule (v0)

Highlights and notes stay in browser localStorage exactly as today. File-based persistence moves with the local app shell later. Nothing changes now.
