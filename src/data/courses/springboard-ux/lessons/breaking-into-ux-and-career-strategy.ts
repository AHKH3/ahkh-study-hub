import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-8-1',
            slug: 'breaking-into-ux-and-career-strategy',
            title: 'UX Career Strategy: Crafting High-Impact Case Studies & Thriving in the AI Era',
            module: 'Unit 8: Career Pathways & Industry Navigation',
            unitNumber: 8,
            lessonNumber: '8.1',
            type: 'article',
            readTime: '28 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-design-portfolio-guide/',
            originalSourceLabel: 'Springboard Design Mentorship Board & Principal Design Leaders',
            
            summaryQuote: 'Standout UX portfolios do not showcase decorative mockups; they prove business acumen, constraint management, and rigorous human-centered validation.',
            outline: [
          {
                    "id": "car-case-study",
                    "title": "1. Anatomy of a World-Class Case Study",
                    "level": 2
          },
          {
                    "id": "car-whiteboard",
                    "title": "2. The 5-Step Whiteboard Challenge Playbook",
                    "level": 2
          },
          {
                    "id": "car-ai-era",
                    "title": "3. Thriving in the AI-Augmented Era of UX",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    A design portfolio is not an art gallery; it is a proof of problem-solving capability. Hiring managers spend an average of less than 90 seconds scanning a UX portfolio before deciding whether to advance a candidate to the interview loop. If your case studies present only polished final Dribbble-style mockups without demonstrating how you navigated constraints, made trade-offs, and validated assumptions with real humans, your application will be filtered out.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Junior designers show what they built. Senior designers show why they built it, what went wrong along the way, how they validated it, and what measurable impact it produced for the business."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Principal Design Director, San Francisco
    </cite>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. Anatomy of a World-Class Case Study</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Every standout UX case study follows a classic narrative arc: Hook, Context, Conflict, Resolution, and Reflection. Avoid monolithic walls of text; use scannable typographic hierarchy, diagrams, and annotated visuals:
  </p>

  <div class="space-y-6 my-6">
    <div class="p-6 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1 dark:text-dark-muted">Phase 1</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2 dark:text-dark-ink">The Executive Summary (Above the Fold)</h3>
      <p class="text-sm text-ink leading-relaxed mb-3 dark:text-dark-ink">
        Before diving into research, give the reviewer an immediate snapshot of the project scope:
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono bg-paper-50 p-4 border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <div><strong class="block text-ink dark:text-dark-ink">Role:</strong> Lead Product Designer</div>
        <div><strong class="block text-ink dark:text-dark-ink">Timeline:</strong> 8 Weeks (Q3)</div>
        <div><strong class="block text-ink dark:text-dark-ink">Platform:</strong> iOS & Web App</div>
        <div><strong class="block text-ink dark:text-dark-ink">Outcome:</strong> +34% Task Completion</div>
      </div>
      <p class="text-xs text-ink-muted mt-2 dark:text-dark-muted">
        <strong>The Problem Statement:</strong> In 2 sentences, explain the user friction and the business risk.
      </p>
    </div>

    <div class="p-6 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1 dark:text-dark-muted">Phase 2</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2 dark:text-dark-ink">The Messy Middle & Pivot Points</h3>
      <p class="text-sm text-ink leading-relaxed mb-2 dark:text-dark-ink">
        Hiring teams actively distrust case studies where everything was perfect from day one. Real product design is messy:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-sm text-ink dark:text-dark-ink">
        <li>Show your initial sketch or assumption that completely failed in usability testing.</li>
        <li>Explain the engineering constraint (e.g., legacy API latency) that forced you to change your UI architecture.</li>
        <li>Document how you balanced competing user needs against business revenue requirements.</li>
      </ul>
    </div>

    <div class="p-6 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1 dark:text-dark-muted">Phase 3</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2 dark:text-dark-ink">The Measurable Impact & Reflection</h3>
      <p class="text-sm text-ink leading-relaxed mb-2 dark:text-dark-ink">
        Close your case study with concrete numbers, not vague claims:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-sm text-ink dark:text-dark-ink">
        <li><strong>Quantitative Metrics:</strong> Conversion rate lift, reduction in customer support tickets, SUS (System Usability Scale) score improvement.</li>
        <li><strong>Qualitative Validation:</strong> Quotes from post-launch customer interviews.</li>
        <li><strong>Retrospective Humility:</strong> "If I had two more weeks on this project, I would investigate edge-case accessibility on small-screen Android devices."</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The 5-Step Whiteboard Challenge Playbook</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    During on-site interview loops, you will frequently be asked to solve an ambiguous design prompt on a whiteboard in 45 minutes (e.g., <em>"Design an automated kiosk for a subway station"</em>). Follow this rigorous 5-step framework:
  </p>

  <div class="editorial-matrix my-6 overflow-x-auto">
    <table class="w-full text-left text-sm border-collapse border border-ink-border dark:border-dark-border">
      <thead>
        <tr class="bg-paper-100 border-b border-ink-border dark:bg-dark-surface dark:border-dark-border">
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Step</th>
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Time Allocation</th>
          <th class="p-3 font-mono text-xs uppercase tracking-widest text-ink dark:text-dark-ink">Core Action & Questions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border dark:divide-dark-border">
        <tr>
          <td class="p-3 font-mono font-bold text-xs">1. Clarify the Scope</td>
          <td class="p-3 font-mono text-xs">5 minutes</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Ask questions! Who is paying? What are the hardware limitations? Is this domestic or international travelers?</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">2. Define the User & Context</td>
          <td class="p-3 font-mono text-xs">10 minutes</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Identify primary persona and stress environment (e.g., rushing commuter with luggage vs first-time tourist).</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">3. Map Core User Journey</td>
          <td class="p-3 font-mono text-xs">10 minutes</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Draw a linear flowchart: Approach &rarr; Select Language &rarr; Pick Destination &rarr; Payment &rarr; Dispense Ticket.</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">4. Sketch Wireframe Interface</td>
          <td class="p-3 font-mono text-xs">15 minutes</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Sketch low-fidelity wireframes of the critical 3 screens. Annotate touch targets, hierarchy, and physical hardware interaction.</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">5. Critique, Edge Cases & Wrap</td>
          <td class="p-3 font-mono text-xs">5 minutes</td>
          <td class="p-3 text-ink-muted dark:text-dark-muted">Proactively point out potential flaws: "What if the paper runs out? What if the payment fails? How does a wheelchair user reach the screen?"</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Thriving in the AI-Augmented Era of UX</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Artificial intelligence is rapidly commoditizing generic UI production. Tools like Midjourney, v0, Galileo, and AI-assisted design systems can generate screens in seconds. Where does this leave the professional product designer?
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-ink-border bg-paper-50 dark:bg-dark-card dark:border-dark-border">
      <h4 class="font-serif font-semibold text-ink mb-2 dark:text-dark-ink">What AI Replaces (The Low-Leverage Tasks)</h4>
      <ul class="space-y-2 text-xs text-ink dark:text-dark-ink">
        <li>Generating boilerplate lorem ipsum and placeholder imagery.</li>
        <li>Basic component variation generation and token exports.</li>
        <li>Writing standard form layouts and routine admin dashboards.</li>
        <li>Initial competitive screenshot auditing and basic data sorting.</li>
      </ul>
    </div>
    <div class="p-5 border border-ink-border bg-white dark:bg-dark-card dark:border-dark-border">
      <h4 class="font-serif font-semibold text-ink mb-2 dark:text-dark-ink">What Becomes 10x More Valuable (Irreplaceable Core)</h4>
      <ul class="space-y-2 text-xs text-ink dark:text-dark-ink">
        <li><strong>Problem Framing:</strong> Determining if we are solving the right human problem before building anything.</li>
        <li><strong>In-Person Contextual Empathy:</strong> Observing unspoken emotional body language in user research.</li>
        <li><strong>Cross-Functional Persuasion:</strong> Aligning engineering, product, legal, and executive stakeholders around vision.</li>
        <li><strong>System Ethics & Trust:</strong> Protecting user privacy, eliminating algorithmic bias, and preventing dark patterns.</li>
      </ul>
    </div>
  </div>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "AI will not replace UX designers. But UX designers who master AI tools to conduct deeper research, explore wider option spaces, and ship higher-fidelity solutions will replace designers who refuse to evolve."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Design Leadership Manifesto, 2026
    </cite>
  </div>
</section>

            `,
          };

export default LESSON;
