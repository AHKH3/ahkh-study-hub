import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-2',
            slug: 'personas-vs-jobs-to-be-done',
            title: 'Personas vs. Jobs-to-Be-Done: Balancing Empathy with Functional Outcomes',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.2',
            type: 'article',
            readTime: '22 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/personas-jobs-be-done/',
            originalSourceLabel: 'Page Laubheimer (Senior User Experience Specialist, NN/g)',
            
            summaryQuote: 'Personas build human empathy for who you are designing for; Jobs-to-Be-Done clarifies what functional outcome they are trying to achieve.',
            outline: [
          {
                    "id": "p-jtbd-intro",
                    "title": "1. The Tension Between Who and What",
                    "level": 2
          },
          {
                    "id": "p-jtbd-definitions",
                    "title": "2. Defining the Tools: Archetypes vs Functional Jobs",
                    "level": 2
          },
          {
                    "id": "p-jtbd-matrix",
                    "title": "3. Comparative Matrix: When to Use Personas vs JTBD",
                    "level": 2
          },
          {
                    "id": "p-jtbd-programmatic",
                    "title": "4. Programmatic Model: The Integrated Persona-JTBD Card",
                    "level": 2
          },
          {
                    "id": "p-jtbd-synthesis",
                    "title": "5. How to Combine Both Frameworks in Product Sprints",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Product teams frequently debate whether to use <strong>User Personas</strong> or <strong>Jobs-to-Be-Done (JTBD)</strong>. Some advocate abandoning personas, claiming demographic profiles distract from actual tasks. Others argue that JTBD lacks the emotional depth necessary to build empathetic experiences. In this study guide from Nielsen Norman Group, Page Laubheimer demonstrates why these two tools are not competitors—they are powerful complements.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Personas answer: 'Who are we building for, and what are their values?' Jobs-to-Be-Done answers: 'What progress is that person trying to achieve in a specific circumstance?'"
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Page Laubheimer, Nielsen Norman Group
    </cite>
  </div>

  <h2 id="p-jtbd-intro" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Tension Between Who and What</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Traditional personas often fail because they are cluttered with irrelevant trivia: a stock photo, arbitrary age, favorite music, and fake hobbies that have zero impact on software design. When a persona is just a demographic caricature, engineers and product managers dismiss it.
  </p>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    <strong>Jobs-to-Be-Done (JTBD)</strong> emerged as an antidote. Popularized by Clayton Christensen, JTBD focuses on the job a customer "hires" a product to do. A person does not buy a drill because they love drills; they buy a drill because they need a quarter-inch hole in their wall.
  </p>

  <h2 id="p-jtbd-definitions" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Defining the Tools: Archetypes vs Functional Jobs</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
    <div class="p-5 border border-ink-border bg-paper-50 rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Human-Centered Archetype</span>
      <h4 class="font-bold text-base text-ink mb-2 dark:text-dark-ink">The Behavioral Persona</h4>
      <p class="text-sm text-ink-muted mb-3 dark:text-dark-muted">A composite archetype representing a distinct user group characterized by similar goals, mental models, frustrations, and digital literacy.</p>
      <div class="text-xs font-mono bg-white p-3 border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <strong>Key Superpower:</strong> Establishes shared team empathy, humanizes edge cases, and prevents self-referential design.
      </div>
    </div>
    <div class="p-5 border border-ink-border bg-paper-50 rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">Outcome-Driven Statement</span>
      <h4 class="font-bold text-base text-ink mb-2 dark:text-dark-ink">The Job-to-Be-Done</h4>
      <p class="text-sm text-ink-muted mb-3 dark:text-dark-muted">A structured sentence describing the core functional progress someone wants to make under specific situational constraints.</p>
      <div class="text-xs font-mono bg-white p-3 border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <strong>Formula:</strong> When [Situation], I want to [Motivation], So that [Expected Outcome].
      </div>
    </div>
  </div>

  <h2 id="p-jtbd-matrix" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Comparative Matrix: When to Use Personas vs JTBD</h2>
  <div class="my-6 overflow-x-auto not-prose">
    <table class="w-full text-left text-sm font-sans border-collapse border border-ink-border dark:border-dark-border">
      <thead>
        <tr class="bg-paper-100 border-b border-ink-border text-xs font-mono uppercase tracking-widest text-ink font-bold dark:bg-dark-surface dark:text-dark-ink dark:border-dark-border">
          <th class="p-3">Evaluation Dimension</th>
          <th class="p-3">User Personas</th>
          <th class="p-3">Jobs-to-Be-Done</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border dark:divide-dark-border">
        <tr>
          <td class="p-3 font-mono font-bold text-xs">Primary Question</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Who is experiencing this problem?</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">What progress needs to be accomplished?</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">Core Value</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Builds empathy, aligns vocabulary, highlights cognitive limits</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Uncovers true competitors, identifies root motivations</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">Best Suited For</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Information architecture, tone of voice, visual ergonomics</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Product roadmap strategy, value proposition definition</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">Common Failure Mode</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Decorating with useless demographic fluff</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Ignoring accessibility, emotional stress, and technical competence</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 id="p-jtbd-programmatic" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Programmatic Model: The Integrated Persona-JTBD Card</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Leading product squads combine both into a unified <strong>Job-Embedded Persona Card</strong>:
  </p>

  <!-- PROGRAMMATIC ARTIFACT: UNIFIED PERSONA CARD -->
  <div class="my-8 max-w-lg mx-auto p-6 bg-white border border-ink-border rounded-xs shadow-sm not-prose font-sans dark:bg-dark-card dark:border-dark-border">
    <div class="flex items-center justify-between pb-3 border-b border-ink-border dark:border-dark-border">
      <div>
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Archetype #01 Enterprise Ops</span>
        <h4 class="text-lg font-serif font-bold text-ink dark:text-dark-ink">The High-Frequency Dispatcher</h4>
      </div>
      <span class="px-2.5 py-1 bg-paper-100 border border-ink-border font-mono text-[10px] text-ink font-bold dark:bg-dark-surface dark:text-dark-ink dark:border-dark-border">DESKTOP_HEAVY</span>
    </div>

    <div class="my-4 space-y-3 text-xs">
      <div>
        <strong class="font-mono text-ink block mb-1 uppercase tracking-widest dark:text-dark-ink">Cognitive Environment & Mental Model</strong>
        <p class="text-ink-muted leading-relaxed dark:text-dark-muted">Operates under severe time pressure across 3 monitors simultaneously. Highly intolerant of multi-step modals; relies strictly on keyboard shortcuts.</p>
      </div>

      <div class="p-3 bg-paper-50 border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
        <strong class="font-mono text-teal-700 block mb-1 uppercase tracking-widest dark:text-teal-400">Primary Job-to-Be-Done</strong>
        <p class="text-ink italic dark:text-dark-ink">
          "When an urgent delivery route is blocked by weather, I want to reroute 40 drivers in bulk with one confirmation step, so that customer shipments are not delayed and our SLA penalty is avoided."
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
        <div class="p-2 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
          <span class="font-bold text-rose-700 block dark:text-rose-400">Core Frustration</span>
          Laggy dropdown filters that reset search state.
        </div>
        <div class="p-2 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
          <span class="font-bold text-emerald-700 block dark:text-emerald-400">Success Metric</span>
          Reroute execution time reduced from 8 min to under 45 sec.
        </div>
      </div>
    </div>
  </div>

  <h2 id="p-jtbd-synthesis" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">5. How to Combine Both Frameworks in Product Sprints</h2>
  <ol class="list-decimal pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Start with JTBD to define the product feature:</strong> Identify what functional outcome creates genuine progress for the customer.</li>
    <li><strong>Layer Personas to design the interaction details:</strong> Adapt the interface layout, typography density, and error messaging to match the specific digital literacy and environmental context of the user archetype.</li>
  </ol>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Personas vs. Jobs-to-Be-Done</em> by <strong>Page Laubheimer</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/personas-jobs-be-done/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">
      Original Article ↗
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
