## 2025-05-21 - Accessible Header Navigation and Active Route Identifiers
**Learning:** Top-level persistent header navigation bars often omit `aria-label` containers and `aria-current="page"` flags on active links, making it difficult for screen reader users to identify their location within the app hierarchy. Furthermore, top-level navigation links require standard `focus-visible:ring-2` rings to ensure visible focus during keyboard tabbing.
**Action:** Always equip `<nav>` landmarks with `aria-label` descriptions, mark active navigation links with `aria-current="page"`, and provide low-contrast `focus-visible:ring-2` focus rings for keyboard accessibility.

## 2025-05-20 - Keyboard Navigation and Focus Visible States for Custom Dropdowns
**Learning:** Custom UI dropdown menus (like ThemeSwitcher) often hide focus rings with `focus:outline-hidden` / `focus:outline-none`, leaving keyboard users without visual feedback when navigating or opening menus. WAI-ARIA menuitem roles also require keyboard listeners (`ArrowDown`, `ArrowUp`, `Home`, `End`, `Escape`) so keyboard users can navigate items without having to tab through every button.
**Action:** Always complement `focus:outline-none` on interactive popover triggers and menuitems with explicit `focus-visible:ring-2` focus rings and keyboard arrow handlers for full keyboard accessibility.
