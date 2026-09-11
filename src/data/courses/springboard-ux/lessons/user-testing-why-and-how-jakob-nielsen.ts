import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-7-3',
            slug: 'user-testing-why-and-how-jakob-nielsen',
            title: 'User Testing: Why & How (The Jakob Nielsen Masterclass)',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.3',
            type: 'article',
            readTime: '20 min study',
            originalSourceUrl: 'https://www.nngroup.com/videos/user-testing-jakob-nielsen/',
            originalSourceLabel: 'Jakob Nielsen (Pioneer of Discount Usability Engineering)',
            
            summaryQuote: 'Discount usability engineering is about running fast, cheap, frequent tests rather than rare, expensive laboratory experiments.',
            outline: [
          {
                    "id": "jn-discount",
                    "title": "1. The Philosophy of Discount Usability Engineering",
                    "level": 2
          },
          {
                    "id": "jn-testing-habit",
                    "title": "2. Making Testing a Weekly Continuous Habit",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Jakob Nielsen revolutionized the tech industry by introducing <strong>Discount Usability Engineering</strong> in the 1990s. Prior to Nielsen's work, companies believed usability testing required expensive one-way mirror labs and $50,000 budgets.
  </p>
  <h2 id="jn-discount" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Philosophy of Discount Usability Engineering</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Nielsen proved that simple paper prototypes, tested in coffee shops or offices with five users, uncover more than 85% of interface blunders. Running ten small studies across a product lifecycle is infinitely superior to running one massive study at the very end.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>User Testing: Why & How</em> by <strong>Jakob Nielsen</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/videos/user-testing-jakob-nielsen/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Article ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
