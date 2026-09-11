import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-9',
            slug: 'heuristic-5-error-prevention',
            title: 'Heuristic #5: Error Prevention (Slips vs Mistakes)',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.9',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=imS9s1DUY-I',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'imS9s1DUY-I',
            summaryQuote: 'Even better than good error messages is a careful design which prevents a problem from occurring in the first place.',
            outline: [
          {
                    "id": "h5-slips-mistakes",
                    "title": "1. Slips (Unconscious) vs. Mistakes (Conscious)",
                    "level": 2
          },
          {
                    "id": "h5-constraints",
                    "title": "2. Eliminating Slips with Constraints & Smart Defaults",
                    "level": 2
          },
          {
                    "id": "h5-confirmations",
                    "title": "3. Preventing Mistakes with Preview Confirmations",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Preventing errors before they happen through intelligent design constraints."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    A great error message is polite and helpful. But an exceptional design prevents the error from occurring altogether.
  </p>
  <h2 id="h5-slips-mistakes" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Slips (Unconscious) vs. Mistakes (Conscious)</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Slips:</strong> Occur when the user intends to do the right thing, but physical friction causes a blunder (e.g. typing a comma instead of a period, or tapping adjacent touch targets).</li>
    <li><strong>Mistakes:</strong> Occur when the user has an incorrect mental model and deliberately chooses the wrong action.</li>
  </ul>
  <h2 id="h5-constraints" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Eliminating Slips with Constraints & Smart Defaults</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Use date-picker widgets that disable past dates for hotel bookings. Restrict input fields to numbers only for credit card entries. Do not let users submit invalid data.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Error Prevention</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=imS9s1DUY-I" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
