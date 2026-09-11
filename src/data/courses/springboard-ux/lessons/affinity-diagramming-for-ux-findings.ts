import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-3',
            slug: 'affinity-diagramming-for-ux-findings',
            title: 'Affinity Diagramming for Sorting UX Findings & Collaborative Synthesis',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.3',
            type: 'article',
            readTime: '24 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/affinity-diagram/',
            originalSourceLabel: 'Rachel Krause (User Experience Specialist, NN/g)',
            
            summaryQuote: 'Affinity diagramming turns hundreds of fragmented user research observations into coherent thematic clusters through inductive, bottom-up sorting.',
            outline: [
          {
                    "id": "aff-intro",
                    "title": "1. What is an Affinity Diagram?",
                    "level": 2
          },
          {
                    "id": "aff-why",
                    "title": "2. Why Affinity Mapping Works (Inductive vs Deductive)",
                    "level": 2
          },
          {
                    "id": "aff-steps",
                    "title": "3. The 5 Steps to Facilitate an Affinity Session",
                    "level": 2
          },
          {
                    "id": "aff-programmatic-board",
                    "title": "4. Programmatic Model: The Clustered Sticky Board",
                    "level": 2
          },
          {
                    "id": "aff-dos-donts",
                    "title": "5. Critical Facilitation Dos and Don'ts",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    After conducting user interviews, diary studies, or usability tests, design teams face a mountain of qualitative data: audio snippets, sticky notes, quotes, and behavioral observations. <strong>Affinity diagramming</strong> (also called affinity mapping) is the fundamental synthesis method used to organize messy qualitative observations into intuitive, hierarchical groups.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Affinity diagramming is inductive synthesis: you do not force raw data into pre-conceived categories. You let the natural clusters emerge organically from the voices of your users."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Rachel Krause, Nielsen Norman Group
    </cite>
  </div>

  <h2 id="aff-intro" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. What is an Affinity Diagram?</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Invented by Jiro Kawakita in the 1960s (often referred to as the KJ Method), an affinity diagram is a visual clustering exercise. Each individual observation, user quote, or pain point is recorded on an independent sticky note. Team members collaboratively group notes based on natural similarity rather than arbitrary predefined silos.
  </p>

  <h2 id="aff-why" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Why Affinity Mapping Works (Inductive vs Deductive)</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Traditional business analysis is typically <strong>deductive</strong>: executives create categories first (e.g., "Navigation", "Pricing", "Customer Service") and then stuff observations into those boxes. This biases the outcome.
  </p>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Affinity diagramming is strictly <strong>inductive (bottom-up)</strong>:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li>You begin with individual, concrete data points at the bottom.</li>
    <li>Notes that feel related are placed side by side.</li>
    <li>Categories are named <em>only after</em> the cluster has physically formed.</li>
    <li>This prevents team confirmation bias and surfaces surprising insights that leadership never anticipated.</li>
  </ul>

  <h2 id="aff-steps" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. The 5 Steps to Facilitate an Affinity Session</h2>
  <ol class="list-decimal pl-6 space-y-3 text-ink dark:text-dark-ink">
    <li><strong>Record Observations:</strong> Write one insight per sticky note. Ensure notes are self-explanatory (include context, not just one vague word).</li>
    <li><strong>Post Notes on the Wall:</strong> Scatter notes across a large whiteboard or digital canvas (FigJam / Miro) so everyone can see them.</li>
    <li><strong>Silent Sorting (The Golden Rule):</strong> Team members group related notes together in complete silence for 15 to 20 minutes. Working silently eliminates office politics and prevents senior executives from dominating the clustering.</li>
    <li><strong>Name the Clusters:</strong> As a group, discuss each cluster and write a descriptive header that captures the underlying human struggle.</li>
    <li><strong>Vote and Prioritize:</strong> Use dot voting (giving each team member 3 sticky dots) to vote on the most urgent problem clusters to address in the roadmap.</li>
  </ol>

  <h2 id="aff-programmatic-board" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Programmatic Model: The Clustered Sticky Board</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Here is an interactive programmatic model of an affinity synthesis board after silent sorting:
  </p>

  <!-- PROGRAMMATIC AFFINITY BOARD COMPONENT -->
  <div class="my-8 p-6 bg-paper-100 border border-ink-border rounded-xs not-prose dark:bg-dark-surface dark:border-dark-border">
    <div class="text-xs font-mono uppercase tracking-widest text-ink font-bold mb-4 dark:text-dark-ink">Programmatic Artifact: Qualitative Synthesis Board</div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Cluster 1 -->
      <div class="p-4 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
        <div class="pb-2 mb-3 border-b border-ink-border dark:border-dark-border">
          <span class="text-[10px] font-mono text-teal-700 font-bold uppercase block dark:text-teal-400">Cluster 01 Trust & Transparency</span>
          <h5 class="text-xs font-bold text-ink dark:text-dark-ink">"Where is my money going?"</h5>
        </div>
        <div class="space-y-2 text-[11px] font-mono">
          <div data-allow-fill class="p-2.5 bg-amber-50 border border-amber-200 text-ink shadow-2xs dark:text-dark-ink">
            "I hesitated when the final total changed after adding shipping; felt deceptive."
          </div>
          <div data-allow-fill class="p-2.5 bg-amber-50 border border-amber-200 text-ink shadow-2xs dark:text-dark-ink">
            "Didn't see any cancellation policy before giving credit card."
          </div>
          <div data-allow-fill class="p-2.5 bg-amber-50 border border-amber-200 text-ink shadow-2xs dark:text-dark-ink">
            "Why is the service fee hidden until step 4?"
          </div>
        </div>
      </div>

      <!-- Cluster 2 -->
      <div class="p-4 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
        <div class="pb-2 mb-3 border-b border-ink-border dark:border-dark-border">
          <span class="text-[10px] font-mono text-teal-700 font-bold uppercase block dark:text-teal-400">Cluster 02 Cognitive Friction</span>
          <h5 class="text-xs font-bold text-ink dark:text-dark-ink">"Too much jargon on the home screen"</h5>
        </div>
        <div class="space-y-2 text-[11px] font-mono">
          <div data-allow-fill class="p-2.5 bg-blue-50 border border-blue-200 text-ink shadow-2xs dark:text-dark-ink">
            "What does 'Portfolio Rebalancing' mean? I just want to invest $50."
          </div>
          <div data-allow-fill class="p-2.5 bg-blue-50 border border-blue-200 text-ink shadow-2xs dark:text-dark-ink">
            "The filter terms don't match how I think about my budget."
          </div>
          <div data-allow-fill class="p-2.5 bg-blue-50 border border-blue-200 text-ink shadow-2xs dark:text-dark-ink">
            "Icons without text labels confused 4 out of 5 users."
          </div>
        </div>
      </div>

      <!-- Cluster 3 -->
      <div class="p-4 bg-white border border-ink-border rounded-xs dark:bg-dark-card dark:border-dark-border">
        <div class="pb-2 mb-3 border-b border-ink-border dark:border-dark-border">
          <span class="text-[10px] font-mono text-teal-700 font-bold uppercase block dark:text-teal-400">Cluster 03 System Latency</span>
          <h5 class="text-xs font-bold text-ink dark:text-dark-ink">"Waiting with no feedback"</h5>
        </div>
        <div class="space-y-2 text-[11px] font-mono">
          <div data-allow-fill class="p-2.5 bg-rose-50 border border-rose-200 text-ink shadow-2xs dark:text-dark-ink">
            "Tapped 'Submit' twice because button didn't show a spinner."
          </div>
          <div data-allow-fill class="p-2.5 bg-rose-50 border border-rose-200 text-ink shadow-2xs dark:text-dark-ink">
            "Screen went blank for 3 seconds; user thought app crashed."
          </div>
          <div data-allow-fill class="p-2.5 bg-rose-50 border border-rose-200 text-ink shadow-2xs dark:text-dark-ink">
            "No receipt email sent immediately after payment."
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 id="aff-dos-donts" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">5. Critical Facilitation Dos and Don'ts</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs font-mono not-prose">
    <div data-allow-fill class="p-4 bg-emerald-50 border border-emerald-200 text-ink dark:text-dark-ink">
      <span class="font-bold text-teal-700 block mb-2 dark:text-teal-400">DO</span>
      <ul class="space-y-1">
        <li>&bull; Keep individual notes concise and specific.</li>
        <li>&bull; Encourage split clusters if a group exceeds 10 notes.</li>
        <li>&bull; Move duplicates next to each other to show pattern frequency.</li>
        <li>&bull; Involve developers and PMs directly in the clustering.</li>
      </ul>
    </div>
    <div data-allow-fill class="p-4 bg-rose-50 border border-rose-200 text-ink dark:text-dark-ink">
      <span class="font-bold text-teal-700 block mb-2 dark:text-teal-400">DON'T</span>
      <ul class="space-y-1">
        <li>&bull; Pre-label cluster boxes before reading the notes.</li>
        <li>&bull; Allow loud verbal debate during the sorting phase.</li>
        <li>&bull; Discard "outlier" notes—they often reveal critical edge cases.</li>
        <li>&bull; Rush to design UI fixes before naming the core problem.</li>
      </ul>
    </div>
  </div>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Affinity Diagramming for Sorting UX Findings</em> by <strong>Rachel Krause</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/affinity-diagram/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">
      Original Guide ↗
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
