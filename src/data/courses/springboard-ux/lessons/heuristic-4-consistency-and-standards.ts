import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-8',
            slug: 'heuristic-4-consistency-and-standards',
            title: 'Heuristic #4: Consistency & Standards (Jakob\'s Law)',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.8',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=Ibndy9KLOSQ',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'Ibndy9KLOSQ',
            summaryQuote: 'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.',
            outline: [
          {
                    "id": "h4-jakobs-law",
                    "title": "1. Jakob's Law of Internet User Experience",
                    "level": 2
          },
          {
                    "id": "h4-internal-external",
                    "title": "2. Internal vs. External Consistency",
                    "level": 2
          },
          {
                    "id": "h4-standards",
                    "title": "3. When to Innovate vs. When to Obey Conventions",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Jakob's Law: users spend most of their time on other sites."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Jakob's Law states: <strong>Users spend most of their time on sites other than yours.</strong> This means that users arrive at your product with expectations deeply conditioned by how other digital tools work.
  </p>
  <h2 id="h4-jakobs-law" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Jakob's Law of Internet User Experience</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    If your app places the logo on the bottom-right and the search bar in the footer, users do not marvel at your creativity; they get frustrated and leave. Conventions are cognitive shortcuts.
  </p>
  <h2 id="h4-internal-external" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Internal vs. External Consistency</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Internal Consistency:</strong> Maintain identical button styles, typography tokens, and terminology across all pages of your own product.</li>
    <li><strong>External Consistency:</strong> Respect operating system conventions (e.g. iOS tab bars at bottom, Android app bars at top).</li>
  </ul>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Consistency & Standards</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=Ibndy9KLOSQ" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
