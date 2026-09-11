import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-5',
            slug: 'heuristic-1-visibility-of-system-status',
            title: 'Heuristic #1: Visibility of System Status & Real-Time Feedback',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.5',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=cTtc90jCULU',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'cTtc90jCULU',
            summaryQuote: 'The design should always keep users informed about what is going on, through appropriate feedback within a reasonable time.',
            outline: [
          {
                    "id": "h1-principle",
                    "title": "1. The Core Principle: Never Leave Users in the Dark",
                    "level": 2
          },
          {
                    "id": "h1-latencies",
                    "title": "2. The 3 Human Attention Limits: 0.1s, 1.0s, 10.0s",
                    "level": 2
          },
          {
                    "id": "h1-examples",
                    "title": "3. Real-World Implementations: Progress Bars & Skeleton Screens",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Principle Overview",
                    "text": "Jakob Nielsen explains why system visibility builds user trust."
          },
          {
                    "time": 60,
                    "label": "01:00 - Immediate Feedback",
                    "text": "Micro-interactions, button state changes, and progress indicators."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    When users interact with a system, they need to know whether their action was registered. If an elevator button does not light up when pressed, you press it again—or assume the elevator is broken. The first heuristic guarantees that every user action receives immediate, perceptible confirmation.
  </p>
  <h2 id="h1-principle" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Core Principle: Never Leave Users in the Dark</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Predictable feedback creates psychological safety. When an app provides clear status updates, users feel in control, take confident actions, and rarely make accidental double-purchases or duplicate uploads.
  </p>
  <h2 id="h1-latencies" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The 3 Human Attention Limits: 0.1s, 1.0s, 10.0s</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>0.1 Second:</strong> Feels instantaneous. Required for button press states and hover effects.</li>
    <li><strong>1.0 Second:</strong> The user notices the delay but their train of thought is not interrupted. Display an inline spinner.</li>
    <li><strong>10.0 Seconds:</strong> The limit of human attention. A progress bar with percentage and estimated remaining time is mandatory.</li>
  </ul>
  <h2 id="h1-examples" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Real-World Implementations: Progress Bars & Skeleton Screens</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Replace jarring blank white loading screens with <strong>Skeleton Screens</strong> (placeholder grey shapes that mimic the layout). Skeletons reduce perceived wait time by showing structural progression.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Visibility of System Status</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=cTtc90jCULU" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
