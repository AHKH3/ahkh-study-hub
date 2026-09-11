import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-7-2',
            slug: 'usability-testing-101-nngroup-foundations',
            title: 'Usability Testing 101: Core Methodologies, Metrics & Study Formats',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.2',
            type: 'article',
            readTime: '26 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/usability-testing-101/',
            originalSourceLabel: 'Kate Moran (Vice President, Nielsen Norman Group)',
            
            summaryQuote: 'Usability testing evaluates a product by testing it on real users, measuring task completion, error frequency, and subjective satisfaction.',
            outline: [
          {
                    "id": "ut101-why",
                    "title": "1. Why Usability Test? (Formative vs Summative)",
                    "level": 2
          },
          {
                    "id": "ut101-elements",
                    "title": "2. The 3 Core Elements: Facilitator, Tasks, Participant",
                    "level": 2
          },
          {
                    "id": "ut101-formats",
                    "title": "3. Moderated vs Unmoderated, Lab vs Remote",
                    "level": 2
          },
          {
                    "id": "ut101-metrics",
                    "title": "4. Usability Metrics: Task Success, Time on Task, SUS",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Usability testing is the core engine of user-centered design. In this comprehensive guide from Nielsen Norman Group, VP Kate Moran explains how to structure, conduct, and analyze usability tests to turn qualitative observations into decisive product improvements.
  </p>
  <h2 id="ut101-why" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Why Usability Test? (Formative vs Summative)</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Formative Testing (Diagnostic):</strong> Conducted during the iterative design phase with low-fi prototypes to identify usability flaws and refine workflows before code is written.</li>
    <li><strong>Summative Testing (Benchmarking):</strong> Conducted on live production software to measure performance metrics (e.g. System Usability Scale, task completion rate) and compare against competitors.</li>
  </ul>
  <h2 id="ut101-elements" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The 3 Core Elements: Facilitator, Tasks, Participant</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Every usability test consists of: A neutral facilitator who presents tasks without coaching; authentic scenarios that reflect real human goals; and a representative participant from your primary user archetype.
  </p>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Usability Testing 101</em> by <strong>Kate Moran</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/usability-testing-101/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
