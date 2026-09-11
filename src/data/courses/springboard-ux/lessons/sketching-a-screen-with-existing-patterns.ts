import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-4-4',
            slug: 'sketching-a-screen-with-existing-patterns',
            title: 'Sketching a Screen with Existing Design Patterns: Practical Walkthrough',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.4',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=RGajFMYZ0mM',
            originalSourceLabel: 'Springboard Design Curriculum Team',
            youtubeId: 'RGajFMYZ0mM',
            summaryQuote: 'Watch how experienced designers assemble proven UI patterns onto a paper grid to create a cohesive screen in minutes.',
            outline: [
          {
                    "id": "skp-walkthrough",
                    "title": "1. Assembling Patterns on Paper",
                    "level": 2
          },
          {
                    "id": "skp-hierarchy",
                    "title": "2. Establishing Visual Weight with Sharpie Pens",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Live demonstration of sketching a product screen using established patterns."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    In this video demonstration, Springboard design mentors demonstrate how to take a collection of isolated design patterns (e.g. a carousel header, an avatar list, and a sticky footer CTA) and assemble them harmoniously into an intuitive mobile view.
  </p>
  <h2 id="skp-walkthrough" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Assembling Patterns on Paper</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    By using thicker markers (such as a chisel-tip Sharpie) rather than fine pens, designers are forced to focus on macro hierarchy, element weights, and proportions, rather than getting bogged down in micro-details.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Springboard Masterclass: <strong>Sketching a Screen with Existing Patterns</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=RGajFMYZ0mM" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
