## 2025-05-20 - Keyboard Navigation and Focus Visible States for Custom Dropdowns
**Learning:** Custom UI dropdown menus (like ThemeSwitcher) often hide focus rings with `focus:outline-hidden` / `focus:outline-none`, leaving keyboard users without visual feedback when navigating or opening menus. WAI-ARIA menuitem roles also require keyboard listeners (`ArrowDown`, `ArrowUp`, `Home`, `End`, `Escape`) so keyboard users can navigate items without having to tab through every button.
**Action:** Always complement `focus:outline-none` on interactive popover triggers and menuitems with explicit `focus-visible:ring-2` focus rings and keyboard arrow handlers for full keyboard accessibility.

## 2025-05-21 - Accessible Skip-to-Content Link for Sticky Navigation Layouts
**Learning:** Sites with sticky top headers force screen reader and keyboard-only users to tab through top navigation items on every page transition. A visually hidden skip link (`sr-only focus:not-sr-only focus:fixed ...`) at the top of the root layout targeting `<main id="main-content" tabindex="-1">` allows keyboard users to bypass repeated top navigation immediately on press of Tab.
**Action:** Always include a skip-to-content link in root layouts (`BaseLayout`) and ensure every page's primary `<main>` container carries `id="main-content"` and `tabindex="-1"`.
