import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-10',
            slug: 'heuristic-6-recognition-rather-than-recall',
            title: 'Heuristic #6: Recognition Rather Than Recall',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.10',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=6glQPp6q4Jc',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: '6glQPp6q4Jc',
            summaryQuote: 'Minimize the user\'s memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.',
            outline: [
          {
                    "id": "h6-memory",
                    "title": "1. Human Memory Limits: Miller's Law & Working Memory",
                    "level": 2
          },
          {
                    "id": "h6-recognition",
                    "title": "2. Recognition vs Recall: Why Multiple Choice is Easier",
                    "level": 2
          },
          {
                    "id": "h6-patterns",
                    "title": "3. Interface Patterns: Search Autocomplete & Recent History",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Why recognition requires significantly less cognitive energy than active memory retrieval."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Human working memory is extremely limited. Asking a user to remember an account number, promo code, or file path while navigating across multiple screens creates severe cognitive strain.
  </p>
  <h2 id="h6-memory" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Human Memory Limits: Miller's Law & Working Memory</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    George Miller demonstrated that short-term working memory holds roughly 7 &plusmn; 2 chunks of information. Good interfaces act as external memory aids, displaying all necessary choices on screen.
  </p>
  <h2 id="h6-recognition" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Recognition vs Recall: Why Multiple Choice is Easier</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Recognizing a face in a crowd is effortless; recalling someone's exact name from memory takes effort. Interfaces should present visible options (Recognition) rather than demanding users remember and type commands (Recall).
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Recognition Rather Than Recall</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=6glQPp6q4Jc" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
