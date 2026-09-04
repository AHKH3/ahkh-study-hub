# Highlighting, Selection & Notes — Redesign Proposals

Status: DECIDED AND IMPLEMENTED — bold marker direction executed (amber default,
seven colors incl. Midnight inverse, --hl-bg/--hl-rule voice system linking
span wash + gutter rail + sidebar quote). Kept here as the decision record.
Constraint for all options: cosmetic restyle only — no mechanics, no new
features. Tone calibration (600–700 light / 400 dark) and low-contrast active
states remain binding.

---

## Option 1 — Quiet Fixation (recommended)

- Selection stays solid ink (`::selection` as shipped — maximum clarity).
- Default graphite wash deepened slightly (0.10 → 0.14 light), baseline rule
  stays 1.5px.
- The six user colors stay exactly as calibrated.
- The one structural addition: the gutter-note rail and the sidebar quote
  border take the **highlight's own color** instead of neutral ink, so the eye
  links note to passage instantly with zero new elements.

## Option 2 — Study Markers

- Same structure as Option 1, but saturated hues (classic soft marker
  yellow instead of amber, 2px baseline rule).
- Cost: livelier, less Swiss-quiet; noisy pages under heavy highlighting.
  Not recommended for a deep-reading library.

## Option 3 — Bold Inverse (owner's suggestion)

- Add a seventh color, Midnight: solid inverted chip (ink chip + paper text
  in light mode, paper chip + ink text in dark mode).
- Accepted as an exceptional option only, never the default.

## Untouched regardless of choice

Selection/popover mechanics, positioning, transcript sync, storage schema.
