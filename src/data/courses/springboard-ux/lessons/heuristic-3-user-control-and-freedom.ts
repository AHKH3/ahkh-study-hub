import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-7',
            slug: 'heuristic-3-user-control-and-freedom',
            title: 'Heuristic #3: User Control & Freedom (Emergency Exits)',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.7',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=MXuk-fdbr0A',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'MXuk-fdbr0A',
            summaryQuote: 'Users often choose system functions by mistake and will need a clearly marked emergency exit to leave the unwanted state without an extended dialogue.',
            outline: [
          {
                    "id": "h3-principle",
                    "title": "1. The Emergency Exit Axiom",
                    "level": 2
          },
          {
                    "id": "h3-undo",
                    "title": "2. The Power of Undo vs Destructive Confirmations",
                    "level": 2
          },
          {
                    "id": "h3-workflows",
                    "title": "3. Linear Workflows with Back Navigation",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Why users make mistakes and how emergency exits grant confidence."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    When people explore software, they make mistakes: clicking the wrong button, deleting a paragraph, or entering the wrong form step. If an application traps them without an obvious way out, anxiety rises.
  </p>
  <h2 id="h3-principle" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Emergency Exit Axiom</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Every state in an interface must provide a visible, low-cost exit route: Cancel buttons on modals, a clear Back arrow on mobile flows, and a universal Escape key action.
  </p>
  <h2 id="h3-undo" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The Power of Undo vs Destructive Confirmations</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Modern design favors <strong>instant action with Undo</strong> (e.g. Gmail's "Message sent — Undo" toast) over annoying, disruptive popups asking "Are you sure you want to delete this?".
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>User Control & Freedom</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=MXuk-fdbr0A" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
