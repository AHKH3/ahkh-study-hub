import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-6-2',
            slug: 'reference-guide-for-mobile-typography',
            title: 'A Reference Guide For Typography In Mobile Web Design',
            module: 'Unit 6: UI & Visual Design Fundamentals',
            unitNumber: 6,
            lessonNumber: '6.2',
            type: 'article',
            readTime: '28 min study',
            originalSourceUrl: 'https://www.smashingmagazine.com/2018/06/reference-guide-typography-mobile-web-design/',
            originalSourceLabel: 'Suzanne Scacca (Smashing Magazine Typography Fellow)',
            
            summaryQuote: 'Mobile typography must balance small glass screens with human vision limits, maintaining legibility across daylight glare and thumb scroll speeds.',
            outline: [
          {
                    "id": "mob-type-foundations",
                    "title": "1. Small Screen Constraints & Viewing Distance",
                    "level": 2
          },
          {
                    "id": "mob-type-scales",
                    "title": "2. Mathematical Modular Scales for Handheld Screens",
                    "level": 2
          },
          {
                    "id": "mob-type-measure",
                    "title": "3. Measure (Line Length) & Optical Tracking",
                    "level": 2
          },
          {
                    "id": "mob-type-touch",
                    "title": "4. Touch Targets & Line-Height Padding",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Designing typography for mobile devices is significantly more demanding than desktop web. Mobile phones are viewed at variable distances (from 10 to 18 inches), under harsh sunlight, while users are walking or distracted. In this comprehensive guide, Suzanne Scacca establishes the mathematical and optical rules for mobile typographic excellence.
  </p>

  <h2 id="mob-type-foundations" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Small Screen Constraints & Viewing Distance</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Desktop monitors sit 20–30 inches away from the user's eyes on a stable desk. Smartphones sit much closer, but move continuously with human hand tremors. Body copy on mobile must never drop below <strong>16px (1rem)</strong>; smaller sizes trigger automatic iOS Safari zoom and force users to pinch-and-squint.
  </p>

  <h2 id="mob-type-scales" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Mathematical Modular Scales for Handheld Screens</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    On wide desktop monitors, a dramatic scale ratio (like the Golden Ratio <code>1.618</code>) looks regal. On a 390px mobile screen, an H1 at 1.618 creates awkward 2-word line wraps. Use tighter scales on mobile:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Minor Third (1.200):</strong> Ideal for dense mobile tools, enterprise dashboards, and compact lists.</li>
    <li><strong>Major Second (1.125):</strong> The quietest, most subtle scale for high-information-density mobile screens.</li>
  </ul>

  <h2 id="mob-type-measure" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Measure (Line Length) & Optical Tracking</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Desktop measure allows 60–75 characters per line. On mobile screens, aim for <strong>35 to 45 characters per line</strong>. If lines are wider, users lose their place when jumping down to the next row; if narrower, reading rhythm stutters with excessive hyphens.
  </p>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Typography in Mobile Web Design</em> by <strong>Suzanne Scacca</strong> (Smashing Magazine).</span>
    </div>
    <a href="https://www.smashingmagazine.com/2018/06/reference-guide-typography-mobile-web-design/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
