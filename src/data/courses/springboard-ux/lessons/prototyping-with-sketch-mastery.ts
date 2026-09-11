import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-5-2',
            slug: 'prototyping-with-sketch-mastery',
            title: 'Prototyping Workflows in Sketch: Connecting Artboards & Hotspots',
            module: 'Unit 5: Interactive Prototyping',
            unitNumber: 5,
            lessonNumber: '5.2',
            type: 'article',
            readTime: '18 min study',
            originalSourceUrl: 'https://www.sketch.com/docs/prototyping/',
            originalSourceLabel: 'Sketch Documentation Team',
            
            summaryQuote: 'Prototyping in Sketch connects visual artboards with interactive hotspots, transitions, and fixed elements to simulate real device software.',
            outline: [
          {
                    "id": "sk-hotspots",
                    "title": "1. Creating Hotspots & Target Artboards",
                    "level": 2
          },
          {
                    "id": "sk-transitions",
                    "title": "2. Transition Animations & Fixed Headers",
                    "level": 2
          },
          {
                    "id": "sk-mirror",
                    "title": "3. Device Testing with Sketch Mirror",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Prototyping turns static UI artboards into interactive simulations. By defining interactive hotspots and screen transitions, designers can evaluate user flows directly on physical devices.
  </p>
  <h2 id="sk-hotspots" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Creating Hotspots & Target Artboards</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Select any layer, button, or card, press <code>W</code> to create a Link, and drag the connector line to your destination artboard. You can define trigger conditions such as Click or Tap.
  </p>
  <h2 id="sk-transitions" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Transition Animations & Fixed Headers</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Choose from four primary transition types: Slide In, Slide Out, Push, or Instant. Check <strong>Fix position when scrolling</strong> to pin top navigation headers and bottom tab bars so they remain stationary while page content scrolls underneath.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Prototyping in Sketch</em> by <strong>Sketch Docs</strong>.</span>
    </div>
    <a href="https://www.sketch.com/docs/prototyping/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
