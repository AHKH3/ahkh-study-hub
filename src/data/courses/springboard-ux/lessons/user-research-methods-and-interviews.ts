import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-1',
            slug: 'user-research-methods-and-interviews',
            title: 'The Essential Guide to User Research: Qualitative Inquiry & Observation',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.1',
            type: 'article',
            readTime: '25 min',
            originalSourceUrl: 'https://uxplanet.org/ultimate-guide-to-user-research-bed4a57d260',
            originalSourceLabel: 'Mona Yang (UX Researcher & Product Strategist)',
            
            summaryQuote: 'Observing authentic user behavior in their natural habitat reveals the unspoken truths that surveys and focus groups completely conceal.',
            outline: [
          {
                    "id": "res-why",
                    "title": "1. Why Quantitative Analytics Lie: The What vs. The Why",
                    "level": 2
          },
          {
                    "id": "res-generative-evaluative",
                    "title": "2. Generative vs. Evaluative Research",
                    "level": 2
          },
          {
                    "id": "res-methods-matrix",
                    "title": "3. The 4 Primary Research Methodologies Matrix",
                    "level": 2
          },
          {
                    "id": "res-interviewing",
                    "title": "4. The Art of the Non-Leading User Interview",
                    "level": 2
          },
          {
                    "id": "res-contextual",
                    "title": "5. Contextual Inquiry: Shadowing Users in the Wild",
                    "level": 2
          },
          {
                    "id": "res-synthesis",
                    "title": "6. From Raw Notes to Affinity Diagrams",
                    "level": 2
          },
          {
                    "id": "res-personas",
                    "title": "7. Constructing Actionable Personas & Empathy Maps",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      Analytics dashboards tell you <em>what</em> happens on your screens: where users drop off, what buttons they click, and how long they linger. But analytics alone will never tell you <em>why</em> they did it. User research is the disciplined practice of uncovering the human thoughts, emotional triggers, and unstated workarounds that drive those numbers.
    </p>

    <h2 id="res-why">1. Why Quantitative Analytics Lie: The What vs. The Why</h2>
    <p>
      Imagine an e-commerce dashboard showing that 42% of users abandon their shopping carts at the payment step. A team looking strictly at numbers might hypothesize: <em>"Maybe the checkout button is too small? Let us make it huge and green!"</em>
    </p>
    <p>
      When a UX researcher actually interviews users who abandoned carts, the truth emerges: users did not leave because the button was small; they left because an unexpected shipping fee appeared at the final step, or because the checkout form asked for a phone number without explaining why it was required, triggering privacy suspicion.
    </p>
    <p>
      Quantitative data indicates symptoms; qualitative user research diagnoses the root cause. Without qualitative research, product teams waste months optimizing the wrong elements.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"User research is not about validating your existing opinions; it is about systematically dismantling your assumptions before engineers write a single line of code."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        Mona Yang &mdash; UX Planet
      </footer>
    </blockquote>

    <h2 id="res-generative-evaluative">2. Generative vs. Evaluative Research</h2>
    <p>
      User research activities fall into two distinct phases of the product lifecycle:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Phase A Discovery</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Generative (Exploratory) Research</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed mb-3">
          Conducted <em>before</em> any solution is imagined. Its goal is to uncover unmet human needs, emotional pain points, and current broken habits.
        </p>
        <div class="text-xs font-mono text-ink-muted dark:text-dark-muted border-t border-ink-border/60 dark:border-dark-border/60 pt-2 font-medium">
          Tools: 1-on-1 contextual interviews, ethnographic shadowing, diary studies.
        </div>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Phase B Validation</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Evaluative (Testing) Research</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed mb-3">
          Conducted <em>during and after</em> designs are produced. Its goal is to test whether the proposed interface functions intuitively in real hands.
        </p>
        <div class="text-xs font-mono text-ink-muted dark:text-dark-muted border-t border-ink-border/60 dark:border-dark-border/60 pt-2 font-medium">
          Tools: Usability testing, tree testing, card sorting, A/B conversion tests.
        </div>
      </div>
    </div>

    <h2 id="res-methods-matrix">3. The 4 Primary Research Methodologies Matrix</h2>
    <div class="my-10 overflow-x-auto not-prose">
      <table class="w-full text-left font-serif text-sm border-collapse border-t border-b border-ink-border dark:border-dark-border">
        <thead>
          <tr class="border-b border-ink-border dark:border-dark-border bg-paper-100 dark:bg-dark-card">
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Methodology</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">Data Type</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">Best Used For</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">Sample Size</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60">
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">1-on-1 User Interviews</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Attitudinal</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Uncovering mental models, personal motivations, and history.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">5 &ndash; 8 users</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Contextual Inquiry</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Behavioral</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Observing authentic workflows and interruptions in natural environments.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">4 &ndash; 6 sessions</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Surveys & Questionnaires</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Quantitative / Attitudinal</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Validating qualitative findings across statistically significant cohorts.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">100 &ndash; 1000+ responses</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Usability Lab Sessions</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Behavioral</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Measuring task completion times, confusion points, and navigation errors.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">5 users per iteration</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="res-interviewing">4. The Art of the Non-Leading User Interview</h2>
    <p>
      The single biggest mistake junior researchers make is asking <strong>leading questions</strong>. When you ask leading questions, you unconsciously bias the participant into agreeing with you to appear agreeable.
    </p>

    <!-- Good vs Bad Interviewing Matrix -->
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <h4 class="font-sans font-semibold text-teal-700 dark:text-teal-400 text-sm mb-2 flex items-center gap-1.5">
          <span>&times;</span> Leading Questions (Biased & Useless)
        </h4>
        <ul class="space-y-2 text-xs font-serif text-ink dark:text-dark-ink">
          <li>&bull; <em>"Would you find an automated calendar sync helpful?"</em> (Everyone says yes; hypothetical futures are unreliable).</li>
          <li>&bull; <em>"Don't you think our search bar is much easier than Competitor X?"</em> (Directly prompts a compliment).</li>
          <li>&bull; <em>"What features would make you buy this app?"</em> (Users are terrible product managers; they request feature bloat).</li>
        </ul>
      </div>

      <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <h4 class="font-sans font-semibold text-teal-700 dark:text-teal-400 text-sm mb-2 flex items-center gap-1.5">
          <span>&check;</span> Non-Leading Questions (Behavioral & Reliable)
        </h4>
        <ul class="space-y-2 text-xs font-serif text-ink dark:text-dark-ink">
          <li>&bull; <em>"Tell me about the last time you tried to schedule a meeting with three clients. What happened?"</em></li>
          <li>&bull; <em>"Walk me through how you searched for that document yesterday. Where did you click first?"</em></li>
          <li>&bull; <em>"What is the most frustrating part of your current morning routine using Tool X?"</em></li>
        </ul>
      </div>
    </div>

    <h2 id="res-contextual">5. Contextual Inquiry: Shadowing Users in the Wild</h2>
    <p>
      When people sit in a quiet meeting room answering interview questions, they rationalize their behavior. They tell you how they <em>think</em> they work. In reality, their actual work environment is chaotic: their phone rings, two monitors flash Slack alerts, and coworkers interrupt them every six minutes.
    </p>
    <p>
      <strong>Contextual Inquiry</strong> involves sitting beside users in their real workplace while they perform actual tasks. You observe the physical sticky notes stuck to their monitor, the manual Excel spreadsheet workarounds they created because the enterprise software was too slow, and the keyboard shortcuts they rely on. These unstated workarounds are the richest source of product innovation.
    </p>

    <h2 id="res-synthesis">6. From Raw Notes to Affinity Diagrams</h2>
    <p>
      After conducting six user interviews, you have thirty pages of messy transcripts and observations. How do you turn this chaos into clear design requirements? Through <strong>Affinity Diagramming</strong>:
    </p>
    <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Extract Atomic Quotes:</strong> Write each standalone observation, quote, or struggle onto an individual sticky note in FigJam or Miro.</li>
      <li><strong>Cluster Organically:</strong> Without speaking or arguing, group related notes together based on natural patterns (e.g., "Confusion about pricing", "Mobile keyboard errors", "Security skepticism").</li>
      <li><strong>Name the Thematic Pillars:</strong> Give each cluster a descriptive title stating the core human struggle.</li>
      <li><strong>Prioritize by Frequency & Impact:</strong> Identify which themes recurred across the majority of participants and impacted task completion most severely.</li>
    </ol>

    <h2 id="res-personas">7. Constructing Actionable Personas & Empathy Maps</h2>
    <p>
      A persona is not a fictional character with a random stock photo and irrelevant trivia like <em>"Drives a Honda and drinks oat lattes."</em> An actionable design persona is a composite archetype grounded strictly in behavioral research data. It documents:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Primary Objective:</strong> What specific outcome must they achieve to feel successful?</li>
      <li><strong>Core Friction Points:</strong> What obstacles currently waste their time or trigger anxiety?</li>
      <li><strong>Mental Model & Tech Comfort:</strong> How do they conceptualize the system, and what analogies do they rely on?</li>
      <li><strong>Decision Triggers:</strong> What makes them trust or abandon a digital service?</li>
    </ul>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        MY
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Mona Yang</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the comprehensive research publication <em>"The Essential Guide to User Research & Field Inquiry"</em> by Mona Yang on UX Planet.
        </p>
        <a 
          href="https://uxplanet.org/ultimate-guide-to-user-research-bed4a57d260" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          <span>View original publication on UX Planet</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          };

export default LESSON;
