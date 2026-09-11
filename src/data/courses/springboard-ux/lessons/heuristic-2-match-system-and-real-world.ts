import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-6',
            slug: 'heuristic-2-match-system-and-real-world',
            title: 'Heuristic #2: Match Between System & The Real World',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.6',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=0TAt9Pln51g',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: '0TAt9Pln51g',
            summaryQuote: 'The design should speak the users\' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.',
            outline: [
          {
                    "id": "h2-principle",
                    "title": "1. Speaking the User's Natural Language",
                    "level": 2
          },
          {
                    "id": "h2-metaphors",
                    "title": "2. Real-World Metaphors (Desktop, Cart, Trash)",
                    "level": 2
          },
          {
                    "id": "h2-jargon",
                    "title": "3. Eliminating Engineering Jargon from Interfaces",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Mental models and mapping physical concepts to digital surfaces."
          },
          {
                    "time": 60,
                    "label": "01:00 - Real-World Metaphors",
                    "text": "Using familiar icons and terminology."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    How people interpret your product depends heavily on their prior experiences. If your interface introduces technical concepts that do not map to everyday reality, cognitive dissonance occurs.
  </p>
  <h2 id="h2-principle" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Speaking the User's Natural Language</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Never force users to learn database nomenclature. An e-commerce customer does not "Query SQL Database for SKU"; they "Search shoes in Size 10". Match user vocabulary verbatim.
  </p>
  <h2 id="h2-metaphors" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Real-World Metaphors (Desktop, Cart, Trash)</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    The reason the personal computer succeeded was the desktop metaphor: files, folders, and a trash can. By leveraging metaphors that users already understood from physical offices, the learning curve dropped to zero.
  </p>
  <h2 id="h2-jargon" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Eliminating Engineering Jargon from Interfaces</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Audit error dialogues: replace "Error 0x80040154: Interface not registered" with "We couldn't connect to your printer. Check if it's turned on."
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Match Between System & Real World</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=0TAt9Pln51g" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
