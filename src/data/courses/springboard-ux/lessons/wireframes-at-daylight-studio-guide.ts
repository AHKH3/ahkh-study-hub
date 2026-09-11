import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-4-5',
            slug: 'wireframes-at-daylight-studio-guide',
            title: 'Wireframes at Daylight: Structural Clarity Before Visual Styling',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.5',
            type: 'article',
            readTime: '20 min study',
            originalSourceUrl: 'https://thedaylightstudio.com/wireframes-at-daylight/',
            originalSourceLabel: 'Daylight Design Studio',
            
            summaryQuote: 'A wireframe is a contractual blueprint between content, functionality, and user intent, stripping away color and decoration to test raw usability.',
            outline: [
          {
                    "id": "dl-purpose",
                    "title": "1. The True Goal of a Wireframe",
                    "level": 2
          },
          {
                    "id": "dl-annotation",
                    "title": "2. The Art of Wireframe Annotation",
                    "level": 2
          },
          {
                    "id": "dl-stakeholders",
                    "title": "3. Communicating with Engineers & Stakeholders",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    At Daylight Studio, wireframes are considered the most critical communication asset in product development. Before clients argue over whether a button should be teal or navy, wireframes force everyone to agree on what information needs to be on the page and why.
  </p>
  <h2 id="dl-purpose" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The True Goal of a Wireframe</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Wireframes are intentionally monochromatic. By stripping away typography branding, color accents, and photographic styling, stakeholders are prevented from commenting on superficial aesthetics and forced to evaluate functional layout, content hierarchy, and task efficiency.
  </p>
  <h2 id="dl-annotation" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The Art of Wireframe Annotation</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Professional wireframes always include numbered callouts in the margins explaining functional logic: <em>"Tap expands inline accordion without page reload"</em> or <em>"Displays error state if postal code fails validation"</em>.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Wireframes at Daylight</em> by <strong>Daylight Studio</strong>.</span>
    </div>
    <a href="https://thedaylightstudio.com/wireframes-at-daylight/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
