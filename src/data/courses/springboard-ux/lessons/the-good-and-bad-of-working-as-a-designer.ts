import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-8-3',
            slug: 'the-good-and-bad-of-working-as-a-designer',
            title: 'The Good and Bad of Working as a Professional UX Designer',
            module: 'Unit 8: Career Pathways & Industry Navigation',
            unitNumber: 8,
            lessonNumber: '8.3',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=qwCEZ1lRkHo',
            originalSourceLabel: 'Springboard Career Series',
            youtubeId: 'qwCEZ1lRkHo',
            summaryQuote: 'An honest evaluation of the product design profession: the immense thrill of launching products versus navigating corporate politics and technical constraints.',
            outline: [
          {
                    "id": "gb-rewards",
                    "title": "1. The Rewards: Impact, Autonomy & Creative Problem-Solving",
                    "level": 2
          },
          {
                    "id": "gb-frustrations",
                    "title": "2. The Frustrations: Stakeholder Pushback & Technical Debt",
                    "level": 2
          },
          {
                    "id": "gb-advice",
                    "title": "3. Advice for Maintaining Creative Resilience",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Honest reflections from senior designers on the industry's biggest perks and headaches."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Every career path has trade-offs. Knowing what to expect before entering the tech industry allows you to cultivate emotional resilience and focus on high-leverage activities.
  </p>
  <h2 id="gb-rewards" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Rewards: Impact, Autonomy & Creative Problem-Solving</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    There is no feeling comparable to watching a customer easily navigate a workflow that used to take them forty minutes of frustration. Designers have a direct voice in shaping human interactions with technology.
  </p>
  <h2 id="gb-frustrations" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The Frustrations: Stakeholder Pushback & Technical Debt</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    You will frequently design elegant solutions that engineering cannot build in the current quarter due to legacy database debt. Learning to make graceful compromises is what separates mature designers from juniors.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Springboard Career Series: <strong>The Good and Bad of Working as a Designer</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=qwCEZ1lRkHo" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
