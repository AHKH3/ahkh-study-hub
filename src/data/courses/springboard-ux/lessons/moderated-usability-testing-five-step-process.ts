import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-7-4',
            slug: 'moderated-usability-testing-five-step-process',
            title: 'How to Run Moderated Usability Testing: The 5-Step Process',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.4',
            type: 'article',
            readTime: '24 min study',
            originalSourceUrl: 'https://contentsquare.com/guides/usability-testing/moderated/',
            originalSourceLabel: 'Contentsquare User Research Academy',
            
            summaryQuote: 'Moderated testing allows researchers to probe unexpected behaviors live, asking \'why\' the moment a user pauses or shows surprise.',
            outline: [
          {
                    "id": "cs-process",
                    "title": "1. The 5-Step Moderated Protocol",
                    "level": 2
          },
          {
                    "id": "cs-scripts",
                    "title": "2. Writing Non-Directive Test Scripts",
                    "level": 2
          },
          {
                    "id": "cs-analysis",
                    "title": "3. Coding Session Videos & Tagging Severity",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Moderated usability testing provides the highest qualitative fidelity in digital product design. Because a human facilitator is present live, you can observe facial micro-expressions, body tension, and probe moments of confusion with non-directive follow-up questions.
  </p>
  <h2 id="cs-process" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The 5-Step Moderated Protocol</h2>
  <ol class="list-decimal pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Study Scoping:</strong> Align key research questions with product squad goals.</li>
    <li><strong>Participant Recruitment:</strong> Screen for exact behavioral habits, not just demographics.</li>
    <li><strong>Script & Task Creation:</strong> Write authentic scenarios without revealing button names.</li>
    <li><strong>Session Execution:</strong> Run 45-minute sessions adhering strictly to the Think-Aloud protocol.</li>
    <li><strong>Debrief & Action Plan:</strong> Synthesize findings into ranked Jira / Linear tickets with video clips.</li>
  </ol>
  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Moderated Usability Testing Guide</em> by <strong>Contentsquare</strong>.</span>
    </div>
    <a href="https://contentsquare.com/guides/usability-testing/moderated/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Guide ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
