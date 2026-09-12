import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-6-1',
            slug: 'ui-design-fundamentals-and-color',
            title: 'Visual Design Fundamentals: Color Systems, Typography & Spatial Rhythm',
            module: 'Unit 6: UI & Visual Design Fundamentals',
            unitNumber: 6,
            lessonNumber: '6.1',
            type: 'article',
            readTime: '25 min',
            originalSourceUrl: 'https://dribbble.com/stories/2018/12/19/choosing-colors-for-web-design-a-practical-ui-color-application-guide',
            originalSourceLabel: 'Stefano Peschiera (Lead Product Designer, Dribbble Guide)',
            
            summaryQuote: 'Visual design in product software is functional architecture: guiding user attention effortlessly through contrast, scale, and spatial rhythm.',
            outline: [
          {
                    "id": "ui-color-rule",
                    "title": "1. The 60-30-10 Color Harmonization Rule",
                    "level": 2
          },
          {
                    "id": "ui-type-scale",
                    "title": "2. Typography: The Modular Scale & Baseline Rhythm",
                    "level": 2
          },
          {
                    "id": "ui-grid-system",
                    "title": "3. Spatial Rhythm: The 8-Point Grid System",
                    "level": 2
          },
          {
                    "id": "ui-accessibility",
                    "title": "4. Accessibility & Human Interface Ergonomics",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Visual design in digital products is not decoration; it is functional architecture. Where UX design establishes the skeleton and behavioral pathways of an interface, user interface (UI) design translates cognitive affordances into visual form. Every pixel, margin, and color swatch either clarifies system intent or burdens the user's working memory.
  </p>
  
  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Design is not just what it looks like and feels like. Design is how it works. A beautiful interface that confuses the user is fundamentally broken engineering."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Design Axiom: Form Follows Cognitive Function
    </cite>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The 60-30-10 Color Harmonization Rule</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Rooted in interior decorating and classical architecture, the <strong>60-30-10 rule</strong> prevents visual chaos in user interfaces:
  </p>
  <ul class="list-disc pl-6 space-y-3 text-ink dark:text-dark-ink">
    <li><strong>60% Dominant Base:</strong> Typically neutral canvas (pure white <code>#FFFFFF</code> or clean paper off-white <code>#FAFAFA</code> in light mode; deep carbon ink in dark mode). This creates negative space and prevents visual fatigue.</li>
    <li><strong>30% Secondary Structure:</strong> Cards, sidebars, navigation bars, borders, and secondary text. In our design system, this is represented by zinc neutrals (<code>#E4E4E7</code> borders, <code>#71717A</code> muted typography).</li>
    <li><strong>10% Intentional Accent:</strong> High-energy semantic color reserved exclusively for primary calls to action (CTAs), progress indicators, active tabs, and key interactive focal points. Never scatter accent colors across passive layout elements.</li>
  </ul>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border rounded-none dark:bg-dark-card dark:border-dark-border">
    <h3 class="text-lg font-serif font-semibold text-ink mb-3 dark:text-dark-ink">Color Architecture: HSL-Based Semantic Tokens</h3>
    <p class="text-ink text-sm leading-relaxed mb-4 dark:text-dark-ink">
      Modern design systems do not use static hex colors directly in components. Instead, colors are generated as semantic tokens along an HSL (Hue, Saturation, Lightness) scale:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
      <div class="p-3 bg-white border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <span class="font-bold block text-ink dark:text-dark-ink">Base 50–100</span>
        <span class="text-ink-muted dark:text-dark-muted">Lightness 95–98%</span>
        <p class="mt-2 text-ink-muted font-sans dark:text-dark-muted">Used for card fills, table zebra striping, and subtle selection states.</p>
      </div>
      <div class="p-3 bg-white border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <span class="font-bold block text-ink dark:text-dark-ink">Core 500–600</span>
        <span class="text-ink-muted dark:text-dark-muted">Lightness 40–55%</span>
        <p class="mt-2 text-ink-muted font-sans dark:text-dark-muted">The signature brand hue. Used for primary buttons and active navigational indicators.</p>
      </div>
      <div class="p-3 bg-white border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <span class="font-bold block text-ink dark:text-dark-ink">Deep 800–900</span>
        <span class="text-ink-muted dark:text-dark-muted">Lightness 10–20%</span>
        <p class="mt-2 text-ink-muted font-sans dark:text-dark-muted">Used for high-contrast typography and active pressed states.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Typography: The Modular Scale & Baseline Rhythm</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Typography represents more than 90% of web interfaces. Arbitrary font sizes create visual friction. World-class interfaces derive all type scales from a mathematical ratio (such as the Major Second <code>1.125</code> or the Minor Third <code>1.200</code>):
  </p>

  <div class="editorial-matrix my-6 overflow-x-auto">
    <table class="w-full text-left text-sm border-collapse border border-ink-border dark:border-dark-border">
      <thead>
        <tr class="bg-paper-100 border-b border-ink-border dark:bg-dark-surface dark:border-dark-border">
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Token</th>
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Computed Size</th>
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Line Height</th>
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Target Usage</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border dark:divide-dark-border">
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-xs</td>
          <td class="p-3 font-mono text-xs">12px (0.75rem)</td>
          <td class="p-3 font-mono text-xs">16px (1.33)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Metadata, timestamps, uppercase category labels, badges</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-sm</td>
          <td class="p-3 font-mono text-xs">14px (0.875rem)</td>
          <td class="p-3 font-mono text-xs">20px (1.43)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Dense table data, UI buttons, sidebar navigation items</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-base</td>
          <td class="p-3 font-mono text-xs">16px (1.000rem)</td>
          <td class="p-3 font-mono text-xs">24px (1.50)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Standard long-form editorial body prose, input fields</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-lg</td>
          <td class="p-3 font-mono text-xs">18px (1.125rem)</td>
          <td class="p-3 font-mono text-xs">28px (1.55)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Introductory lead paragraphs, pull quotes, card headers</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-2xl</td>
          <td class="p-3 font-mono text-xs">24px (1.500rem)</td>
          <td class="p-3 font-mono text-xs">32px (1.33)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Section headers (H2), major modal headings</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-3xl</td>
          <td class="p-3 font-mono text-xs">36px (2.250rem)</td>
          <td class="p-3 font-mono text-xs">40px (1.11)</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Page titles (H1), hero headline displays</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="editorial-callout my-6 p-5 bg-paper-100 border-l-2 border-ink dark:bg-dark-surface dark:border-dark-border">
    <h4 class="font-mono text-xs uppercase tracking-widest text-ink mb-1 dark:text-dark-ink">Typographic Golden Rule: Measure & Leading</h4>
    <p class="text-sm text-ink leading-relaxed dark:text-dark-ink">
      Optimal reading comfort requires a line length (<strong>measure</strong>) between <strong>45 and 75 characters</strong> (including spaces). Lines that are too wide cause the reader's eye to lose its place when returning to the left margin. Lines that are too narrow break reading rhythm. Furthermore, as type size increases, line-height (<strong>leading</strong>) must proportionally tighten.
    </p>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Spatial Rhythm: The 8-Point Grid System</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Why do leading tech companies (Apple, Google, Stripe, Airbnb) align all padding, margins, and component dimensions to multiples of <strong>8 pixels</strong> (and a half-step 4px unit)?
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Screen Scaling Precision:</strong> Modern display resolutions (1x, 2x Retina, 3x Super Retina, 1.5x Android hdpi) scale numbers divisible by 8 cleanly into whole integers without anti-aliasing blur or sub-pixel distortion.</li>
    <li><strong>Decision Velocity:</strong> Eliminates endless designer-developer debate between 13px vs 15px margins. The options are strictly: <code>4px, 8px, 16px, 24px, 32px, 48px, 64px</code>.</li>
    <li><strong>Cognitive Cohesion:</strong> Interfaces built on an 8pt grid possess an innate subconscious mathematical balance.</li>
  </ul>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Accessibility & Human Interface Ergonomics</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Aesthetic refinement without inclusive ergonomics is poor craftsmanship. Professional UI design adheres to rigid legal and biological standards:
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <h4 class="font-serif font-semibold text-ink mb-2 dark:text-dark-ink">WCAG 2.1 Contrast Ratios</h4>
      <p class="text-xs text-ink-muted mb-3 dark:text-dark-muted">Enforced by international law (European Accessibility Act & ADA Title III):</p>
      <ul class="space-y-2 text-xs text-ink dark:text-dark-ink">
        <li><strong>4.5 : 1 (AA Minimum):</strong> Required for regular body text below 18px.</li>
        <li><strong>3.0 : 1 (AA Large):</strong> Permitted for bold text 14px+ or regular text 18px+.</li>
        <li><strong>7.0 : 1 (AAA Enhanced):</strong> Publication-grade target for critical legibility and aging eyes.</li>
        <li><strong>3.0 : 1 (UI Components):</strong> Required for form input borders, checkboxes, and active icons.</li>
      </ul>
    </div>
    <div class="p-5 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <h4 class="font-serif font-semibold text-ink mb-2 dark:text-dark-ink">Touch Target Ergonomics</h4>
      <p class="text-xs text-ink-muted mb-3 dark:text-dark-muted">Based on human thumb contact pads (10mm x 10mm):</p>
      <ul class="space-y-2 text-xs text-ink dark:text-dark-ink">
        <li><strong>Minimum Target Size:</strong> 44 x 44 CSS pixels (Apple HIG) or 48 x 48 dp (Google Material 3).</li>
        <li><strong>Visual Size vs Tap Target:</strong> An icon can visually measure 20x20px, but its transparent clickable bounding box MUST expand to at least 44x44px.</li>
        <li><strong>Target Separation:</strong> Maintain at least 8px spacing between adjacent touch targets to eliminate accidental taps.</li>
      </ul>
    </div>
  </div>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border dark:bg-dark-card dark:border-dark-border">
    <h3 class="text-lg font-serif font-semibold text-ink mb-2 dark:text-dark-ink">Self-Assessment Checklist for UI Polish</h3>
    <div class="space-y-2 text-sm text-ink dark:text-dark-ink">
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold dark:text-dark-ink">[ ]</span>
        <span>Are all spacings and margins derived strictly from the 8-point spatial system?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold dark:text-dark-ink">[ ]</span>
        <span>Does the primary accent color account for no more than 10% of total screen surface area?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold dark:text-dark-ink">[ ]</span>
        <span>Have you verified with a contrast checker that all secondary text meets at least 4.5:1 against the canvas?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold dark:text-dark-ink">[ ]</span>
        <span>Do all interactive mobile touch targets have an active hit area of at least 44x44 CSS pixels?</span>
      </label>
    </div>
  </div>

  <div class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-ink-muted dark:text-dark-muted gap-4">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 dark:text-teal-400 block mb-0.5">Source Citation</span>
      <span>Adapted for sovereign study from <em>Choosing Colors for Web Design: A Practical UI Color Application Guide</em> by <strong>Stefano Peschiera</strong> (Dribbble).</span>
    </div>
    <a 
      href="https://dribbble.com/stories/2018/12/19/choosing-colors-for-web-design-a-practical-ui-color-application-guide" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="font-mono text-xs border border-ink-border/80 dark:border-dark-border px-3 py-1.5 rounded-xs bg-paper-50 dark:bg-dark-card text-ink dark:text-dark-ink hover:bg-paper-100 dark:hover:bg-dark-surface shrink-0 flex items-center gap-1 transition-colors"
    >
      <span>Read original source</span>
      <span>↗</span>
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
