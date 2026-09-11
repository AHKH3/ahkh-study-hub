import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-8-2',
            slug: 'a-day-in-the-life-of-a-ux-designer',
            title: 'A Day in the Life of a Product Designer: Inside Modern Design Squads',
            module: 'Unit 8: Career Pathways & Industry Navigation',
            unitNumber: 8,
            lessonNumber: '8.2',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=Hq7ohURsQN8',
            originalSourceLabel: 'Springboard Career Series',
            youtubeId: 'Hq7ohURsQN8',
            summaryQuote: 'What does a UX designer actually do on a typical Tuesday? Explore standups, user testing reviews, cross-functional engineering alignment, and design critiques.',
            outline: [
          {
                    "id": "day-morning",
                    "title": "1. Morning: Standups, Analytics Review & Sprint Priorities",
                    "level": 2
          },
          {
                    "id": "day-afternoon",
                    "title": "2. Afternoon: Deep Work, Wireframing & Design Critique",
                    "level": 2
          },
          {
                    "id": "day-handoff",
                    "title": "3. Handoff: Collaborating with Frontend Engineers",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Behind the scenes: everyday routines of professional tech designers."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Aspiring designers often imagine the job consists of sitting alone with noise-canceling headphones drawing pretty shapes in Figma. The reality is that UX design is primarily a <strong>communication and consensus-building discipline</strong>.
  </p>
  <h2 id="day-morning" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Morning: Standups, Analytics Review & Sprint Priorities</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    The day begins with a 15-minute cross-functional standup with software engineers and product managers. You review Jira tickets, unblock frontend developers who need component token specs, and check Amplitude / PostHog funnels.
  </p>
  <h2 id="day-afternoon" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Afternoon: Deep Work, Wireframing & Design Critique</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Afternoons are reserved for focused deep work: translating user interview synthesis into wireframes, followed by a <strong>Design Critique</strong> where peers stress-test your layouts for edge cases and accessibility.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Springboard Career Series: <strong>A Day in the Life of a Designer</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=Hq7ohURsQN8" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
