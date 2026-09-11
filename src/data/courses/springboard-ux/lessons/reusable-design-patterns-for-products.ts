import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-4-3',
            slug: 'reusable-design-patterns-for-products',
            title: 'Great Artists Reuse: Standardizing Patterns & Building Blocks',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.3',
            type: 'article',
            readTime: '24 min study',
            originalSourceUrl: 'https://www.uxpin.com/studio/blog/great-artists-reuse-reusable-patterns-product-design/',
            originalSourceLabel: 'Marcin Treder (CEO & Product Designer, UXPin)',
            
            summaryQuote: 'Designers should not reinvent the wheel for routine interactions. Reusing standardized patterns frees up creative energy to solve truly unique domain challenges.',
            outline: [
          {
                    "id": "pat-intro",
                    "title": "1. The Myth of Pure Originality in UI",
                    "level": 2
          },
          {
                    "id": "pat-two-kinds",
                    "title": "2. The Two Kinds of Copying in Product Design",
                    "level": 2
          },
          {
                    "id": "pat-building-blocks",
                    "title": "3. Building Blocks vs Compound Patterns",
                    "level": 2
          },
          {
                    "id": "pat-system",
                    "title": "4. Scaling Reusability into a Cohesive Design System",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Pablo Picasso famously quipped: <em>"Good artists copy; great artists steal."</em> In digital product design, trying to make every single form input, navigation bar, or modal dialog completely unique is not innovation; it is a disservice to the user. Standardized UI patterns are the established vocabulary of software.
  </p>

  <h2 id="pat-intro" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Myth of Pure Originality in UI</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Users do not open an application to admire an avant-garde password reset flow. They want to reset their password in five seconds and return to their work. When you reuse familiar patterns, users feel instantly competent.
  </p>

  <h2 id="pat-two-kinds" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The Two Kinds of Copying in Product Design</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Superficial Copying (Plagiarism):</strong> Copying someone else's visual aesthetics, colors, or typography without understanding the underlying behavioral rationale. This results in mismatched, dysfunctional interfaces.</li>
    <li><strong>Structural Reuse (Pattern Adoption):</strong> Adopting proven interaction conventions—like swipe-to-archive, infinite scroll with sticky headers, or stepper checkouts—because they have been battle-tested with millions of humans.</li>
  </ul>

  <h2 id="pat-building-blocks" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Building Blocks vs Compound Patterns</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Atomic Tier</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Building Blocks (Atoms)</h4>
      <p class="text-xs text-ink-muted dark:text-dark-muted">Basic primitives: text inputs, primary buttons, checkboxes, icons, toggle switches, and badges.</p>
    </div>
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Organismic Tier</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Compound Patterns (Molecules)</h4>
      <p class="text-xs text-ink-muted dark:text-dark-muted">Combinations of building blocks solving specific user goals: credit card entry widgets, search bars with autocomplete, and comment threads.</p>
    </div>
  </div>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Great Artists Reuse</em> by <strong>Marcin Treder</strong> (UXPin).</span>
    </div>
    <a href="https://www.uxpin.com/studio/blog/great-artists-reuse-reusable-patterns-product-design/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Article ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
