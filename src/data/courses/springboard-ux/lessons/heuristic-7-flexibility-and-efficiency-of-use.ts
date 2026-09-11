import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-11',
            slug: 'heuristic-7-flexibility-and-efficiency-of-use',
            title: 'Heuristic #7: Flexibility & Efficiency of Use (Accelerators)',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.11',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=LoTdRTBB8BQ',
            originalSourceLabel: 'Nielsen Norman Group Heuristic Series',
            youtubeId: 'LoTdRTBB8BQ',
            summaryQuote: 'Shortcuts—unseen by the novice user—may often speed up the interaction for the expert user such that the design caters to both inexperienced and experienced users.',
            outline: [
          {
                    "id": "h7-accelerators",
                    "title": "1. What Are Accelerators?",
                    "level": 2
          },
          {
                    "id": "h7-novice-expert",
                    "title": "2. Designing Dual Pathways: Novice vs Expert",
                    "level": 2
          },
          {
                    "id": "h7-shortcuts",
                    "title": "3. Keyboard Shortcuts, Batch Actions, and Customization",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Accommodating both first-time users and power users through accelerators."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    A great product feels simple on day one, yet provides immense speed on day one hundred. Interfaces must cater to both beginners who need hand-holding and power users who demand lightning speed.
  </p>
  <h2 id="h7-accelerators" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. What Are Accelerators?</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    An accelerator is a design mechanism that speeds up frequent tasks without cluttering the interface for novices. Common examples include keyboard shortcuts (Cmd+K / Ctrl+K), swipe gestures, and macros.
  </p>
  <h2 id="h7-novice-expert" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Designing Dual Pathways: Novice vs Expert</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    A novice clicks through a 3-step wizard to export a report. An expert presses a single key combination. Both users are delighted.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Nielsen Norman Group Heuristic Masterclass: <strong>Flexibility & Efficiency of Use</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=LoTdRTBB8BQ" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
