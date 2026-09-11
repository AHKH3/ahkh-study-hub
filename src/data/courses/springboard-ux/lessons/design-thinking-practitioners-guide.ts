import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-5',
            slug: 'design-thinking-practitioners-guide',
            title: 'Design Thinking 101: The Comprehensive Practitioner\'s Guide',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.5',
            type: 'article',
            readTime: '26 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/design-thinking/',
            originalSourceLabel: 'Sarah Gibbons (Chief Designer, Nielsen Norman Group)',
            
            summaryQuote: 'Design thinking provides a common vocabulary and unified framework for multidisciplinary teams to tackle ambiguous problems together.',
            outline: [
          {
                    "id": "dt-def",
                    "title": "1. Definition & Foundations of Design Thinking",
                    "level": 2
          },
          {
                    "id": "dt-process-nng",
                    "title": "2. The 6-Phase NN/g Process Model",
                    "level": 2
          },
          {
                    "id": "dt-wireframe-example",
                    "title": "3. Programmatic Wireframe: Low-Fidelity Rapid Ideation",
                    "level": 2
          },
          {
                    "id": "dt-advantages",
                    "title": "4. Strategic Advantages: Why Organizations Adopt It",
                    "level": 2
          },
          {
                    "id": "dt-scalability",
                    "title": "5. Scalability: Applying Design Thinking from Features to Systems",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Design thinking is not exclusive to designers; it is a shared framework for multidisciplinary problem-solving. In this masterclass from Nielsen Norman Group, Chief Designer Sarah Gibbons deconstructs how design thinking connects business strategy with human psychology.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Design thinking bridges the gap between what is technically possible and what is genuinely meaningful for human beings."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Sarah Gibbons, Nielsen Norman Group
    </cite>
  </div>

  <h2 id="dt-def" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Definition & Foundations of Design Thinking</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Nielsen Norman Group defines design thinking as a human-centered, iterative approach to innovation that integrates the needs of people, the possibilities of technology, and the requirements for business success. Unlike traditional waterfall development, design thinking expects failure early and uses it as diagnostic data.
  </p>

  <h2 id="dt-process-nng" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The 6-Phase NN/g Process Model</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    While some models group activities into 5 steps, NN/g structures design thinking into six distinct, interconnected phases divided across three buckets:
  </p>

  <div class="space-y-4 my-6 not-prose">
    <div class="p-5 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Bucket 1: Understand</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Phase 1: Empathize &bull; Phase 2: Define</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Conduct field studies and user interviews to uncover what users need, feel, and say. Synthesize these inputs into actionable problem statements that do not dictate solutions.</p>
    </div>
    <div class="p-5 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Bucket 2: Explore</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Phase 3: Ideate &bull; Phase 4: Prototype</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Brainstorm unconstrained approaches. Select the most promising ideas and convert them immediately into tangible paper or digital wireframes to reveal trade-offs.</p>
    </div>
    <div class="p-5 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Bucket 3: Materialize</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Phase 5: Test &bull; Phase 6: Implement</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Observe representative end-users interacting with the prototype. Feed learnings back into the cycle, and hand off validated specifications to engineering.</p>
    </div>
  </div>

  <h2 id="dt-wireframe-example" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Programmatic Wireframe: Low-Fidelity Rapid Ideation</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    In the Ideate and Prototype phases, designers avoid high-fidelity cosmetics. Below is an example of an editorial low-fidelity wireframe illustrating structural content zones:
  </p>

  <!-- PROGRAMMATIC WIREFRAME COMPONENT -->
  <div class="my-8 max-w-sm mx-auto p-4 bg-white border-2 border-dashed border-ink-border rounded-xs shadow-sm not-prose font-mono text-xs dark:bg-dark-card dark:border-dark-border">
    <!-- Header -->
    <div class="flex items-center justify-between pb-3 border-b border-ink-border dark:border-dark-border">
      <span class="w-5 h-5 bg-paper-200 border border-ink-border rounded-xs inline-block dark:bg-dark-border dark:border-dark-border"></span>
      <span class="font-bold tracking-widest text-ink dark:text-dark-ink">APP_HEADER</span>
      <span class="w-5 h-5 bg-paper-200 border border-ink-border rounded-xs inline-block dark:bg-dark-border dark:border-dark-border"></span>
    </div>

    <!-- Search Input Skeleton -->
    <div class="my-3 p-2 bg-paper-100 border border-ink-border rounded-xs text-ink-muted flex items-center justify-between dark:bg-dark-surface dark:text-dark-muted dark:border-dark-border">
      <span>[ Search courses or topics... ]</span>
      <span class="text-[10px] text-ink-border font-bold">ESC</span>
    </div>

    <!-- Hero Card Wireframe -->
    <div class="my-3 p-4 bg-paper-50 border border-ink-border rounded-xs space-y-2 dark:bg-dark-card dark:border-dark-border">
      <div class="h-4 bg-paper-200 w-3/4 rounded-2xs dark:bg-dark-border"></div>
      <div class="h-2.5 bg-paper-200 w-full rounded-2xs dark:bg-dark-border"></div>
      <div class="h-2.5 bg-paper-200 w-2/3 rounded-2xs dark:bg-dark-border"></div>
      <div class="pt-2 flex gap-2">
        <span class="px-2 py-1 bg-ink text-white text-[10px] rounded-2xs font-bold">CTA_BUTTON</span>
        <span class="px-2 py-1 border border-ink-border text-[10px] rounded-2xs dark:border-dark-border">LEARN_MORE</span>
      </div>
    </div>

    <!-- Feed Items -->
    <div class="space-y-2 pt-2">
      <div class="flex items-center gap-2 p-2 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
        <span class="w-8 h-8 bg-paper-200 border border-ink-border rounded-xs shrink-0 dark:bg-dark-border dark:border-dark-border"></span>
        <div class="flex-1 space-y-1">
          <div class="h-2.5 bg-paper-200 w-4/5 dark:bg-dark-border"></div>
          <div class="h-2 bg-paper-100 w-1/2 dark:bg-dark-surface"></div>
        </div>
      </div>
      <div class="flex items-center gap-2 p-2 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
        <span class="w-8 h-8 bg-paper-200 border border-ink-border rounded-xs shrink-0 dark:bg-dark-border dark:border-dark-border"></span>
        <div class="flex-1 space-y-1">
          <div class="h-2.5 bg-paper-200 w-3/5 dark:bg-dark-border"></div>
          <div class="h-2 bg-paper-100 w-2/5 dark:bg-dark-surface"></div>
        </div>
      </div>
    </div>

    <!-- Tab Dock -->
    <div class="mt-4 pt-3 border-t border-ink-border grid grid-cols-4 gap-1 text-center text-[10px] text-ink-muted dark:text-dark-muted dark:border-dark-border">
      <div class="font-bold text-ink dark:text-dark-ink">[Home]</div>
      <div>[Search]</div>
      <div>[Library]</div>
      <div>[Profile]</div>
    </div>
  </div>
  <p class="text-xs font-sans text-ink-muted text-center mt-2 dark:text-dark-muted">Figure: Clean programmatic wireframe demonstrating structural zone allocation before visual design.</p>

  <h2 id="dt-advantages" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Strategic Advantages: Why Organizations Adopt It</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>De-risks Investments:</strong> Validates user appetite and workflow logic before investing engineering capital in database development.</li>
    <li><strong>Breaks Organizational Silos:</strong> Provides a structured forum where developers, product managers, and marketers collaborate as co-designers.</li>
    <li><strong>Anchors on Authentic Outcomes:</strong> Keeps product teams focused on solving measurable human problems rather than shipping feature bloat.</li>
  </ul>

  <h2 id="dt-scalability" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">5. Scalability: Applying Design Thinking from Features to Systems</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Design thinking is fractal. It operates equally well at three distinct organizational altitudes:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Micro (Feature Level):</strong> Redesigning an onboarding form, checkout modal, or audio player scrubber.</li>
    <li><strong>Meso (Product Level):</strong> Reimagining the entire end-to-end journey of booking a doctor's appointment or filing taxes online.</li>
    <li><strong>Macro (Systemic Level):</strong> Transforming how an enterprise hospital network coordinates patient data across multiple facilities.</li>
  </ul>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Design Thinking 101</em> by <strong>Sarah Gibbons</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/design-thinking/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">
      Original Guide ↗
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
