import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-6-3',
            slug: 'visual-design-in-ux-study-guide',
            title: 'Visual Design in UX: Principles, Ergonomics & Accessibility',
            module: 'Unit 6: UI & Visual Design Fundamentals',
            unitNumber: 6,
            lessonNumber: '6.3',
            type: 'article',
            readTime: '24 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/visual-design-in-ux-study-guide/',
            originalSourceLabel: 'Kelley Gordon (Visual Design Specialist, NN/g)',
            
            summaryQuote: 'Visual design in UX is the disciplined orchestration of scale, visual hierarchy, balance, and contrast to communicate system architecture.',
            outline: [
          {
                    "id": "vis-foundations",
                    "title": "1. The 5 Core Visual Design Principles",
                    "level": 2
          },
          {
                    "id": "vis-gestalt",
                    "title": "2. Gestalt Principles in Digital UI (Proximity & Similarity)",
                    "level": 2
          },
          {
                    "id": "vis-accessibility",
                    "title": "3. Accessible Contrast & Visual Testing Protocols",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Visual design is the bridge between psychology and software. When executed properly, visual hierarchy guides the user's attention along the exact path necessary to complete their goals without deliberate thought.
  </p>
  <h2 id="vis-foundations" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The 5 Core Visual Design Principles</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Nielsen Norman Group categorizes the foundational visual design principles as: Scale, Visual Hierarchy, Balance, Contrast, and Gestalt Proximity.
  </p>
  <h2 id="vis-gestalt" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Gestalt Principles in Digital UI (Proximity & Similarity)</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    <strong>Law of Proximity:</strong> Elements placed close together are perceived as belonging to the same functional group. A label must always sit closer to its corresponding form field than to the field above it.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Visual Design in UX Study Guide</em> by <strong>Kelley Gordon</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/visual-design-in-ux-study-guide/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
