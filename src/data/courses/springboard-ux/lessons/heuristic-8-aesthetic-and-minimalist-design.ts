import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-12',
            slug: 'heuristic-8-aesthetic-and-minimalist-design',
            title: 'Heuristic #8: Aesthetic & Minimalist Design (Signal vs Noise)',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.12',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=ZgbRmeWDgd0',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'ZgbRmeWDgd0',
            summaryQuote: 'Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information.',
            outline: [
          {
                    "id": "h8-signal-noise",
                    "title": "1. The Signal-to-Noise Ratio in UI",
                    "level": 2
          },
          {
                    "id": "h8-competing-info",
                    "title": "2. Every Extra Pixel Competes with Core Information",
                    "level": 2
          },
          {
                    "id": "h8-progressive-disclosure",
                    "title": "3. Progressive Disclosure: Simplicity with Power",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Why minimalism is not decoration; it is functional clarity."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Minimalism in UI design is not an aesthetic fashion trend; it is the discipline of eliminating visual noise so the user's brain can process essential information effortlessly.
  </p>
  <h2 id="h8-signal-noise" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Signal-to-Noise Ratio in UI</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Every icon, border, color badge, and paragraph on a screen is a cognitive tax. High signal-to-noise ratio means that every visible pixel serves a deliberate communicative purpose.
  </p>
  <h2 id="h8-progressive-disclosure" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Progressive Disclosure: Simplicity with Power</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Show only the essential information upfront. Hide advanced settings and secondary data behind clean expandable disclosures or tabs so novices are not overwhelmed.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Aesthetic & Minimalist Design</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=ZgbRmeWDgd0" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
