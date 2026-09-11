import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-4',
            slug: 'what-is-design-thinking-strategy-group',
            title: 'What is Design Thinking? Core Frameworks & Innovation Strategy',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.4',
            type: 'video',
            readTime: '15 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=TtgegZfk5ZU',
            originalSourceLabel: 'The Strategy Group (Innovation & Design Strategy)',
            youtubeId: 'TtgegZfk5ZU',
            summaryQuote: 'Design thinking balances human desirability, technical feasibility, and business viability to create products people genuinely love.',
            outline: [
          {
                    "id": "dt-intro",
                    "title": "1. The Innovation Sweet Spot: Desirability, Viability, Feasibility",
                    "level": 2
          },
          {
                    "id": "dt-five-stages",
                    "title": "2. The Five Non-Linear Stages of Design Thinking",
                    "level": 2
          },
          {
                    "id": "dt-programmatic-model",
                    "title": "3. Interactive Schema: The Divergent-Convergent Funnel",
                    "level": 2
          },
          {
                    "id": "dt-mindsets",
                    "title": "4. The Four Core Mindsets of Human-Centered Innovators",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - What is Design Thinking?",
                    "text": "Introduction to design thinking as an agile problem-solving philosophy for business and product development."
          },
          {
                    "time": 60,
                    "label": "01:00 - The Innovation Triad",
                    "text": "Balancing user desirability, technical feasibility, and financial viability."
          },
          {
                    "time": 180,
                    "label": "03:00 - The 5 Phases in Action",
                    "text": "Empathize, Define, Ideate, Prototype, and Test."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Design thinking is an iterative, non-linear methodology that teams use to understand users, challenge assumptions, redefine problems, and create innovative solutions. Rather than starting with technical constraints or business models, design thinking begins with human empathy.
  </p>

  <h2 id="dt-intro" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. The Innovation Sweet Spot: Desirability, Viability, Feasibility</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Truly successful innovations exist strictly at the intersection of three competing forces:
  </p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 my-6 not-prose">
    <div class="p-5 border border-ink-border bg-paper-50 rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Human Desirability</span>
      <h4 class="font-bold text-base text-ink mb-2 dark:text-dark-ink">Do People Want This?</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Does the product solve a real human pain point, match mental models, and provide genuine emotional relief?</p>
    </div>
    <div class="p-5 border border-ink-border bg-paper-50 rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Technical Feasibility</span>
      <h4 class="font-bold text-base text-ink mb-2 dark:text-dark-ink">Can We Build This?</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Can current technology, APIs, infrastructure, and engineering resources build this reliably within operational limits?</p>
    </div>
    <div class="p-5 border border-ink-border bg-paper-50 rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Business Viability</span>
      <h4 class="font-bold text-base text-ink mb-2 dark:text-dark-ink">Should We Build This?</h4>
      <p class="text-sm text-ink-muted dark:text-dark-muted">Does the unit economics work? Does this align with strategic company goals and generate sustainable value?</p>
    </div>
  </div>

  <h2 id="dt-five-stages" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. The Five Non-Linear Stages of Design Thinking</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Popularized by Stanford d.school and IDEO, design thinking moves between five interactive states:
  </p>
  <ol class="list-decimal pl-6 space-y-3 text-ink dark:text-dark-ink">
    <li><strong>Empathize:</strong> Research your users' authentic needs through unscripted observation, immersive interviews, and emotional immersion.</li>
    <li><strong>Define:</strong> Synthesize raw observations into a concise, human-centered problem statement (a Point of View or "How Might We" prompt).</li>
    <li><strong>Ideate:</strong> Brainstorm a wide range of wild, creative solutions without premature judgment.</li>
    <li><strong>Prototype:</strong> Build rough, inexpensive physical or digital representations of ideas to make them tangible.</li>
    <li><strong>Test:</strong> Place prototypes in front of real users to observe reactions, gather critique, and refine hypotheses.</li>
  </ol>

  <h2 id="dt-programmatic-model" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Interactive Schema: The Divergent-Convergent Funnel</h2>
  <div class="my-8 p-6 border border-ink-border bg-paper-100 rounded-xs not-prose dark:bg-dark-surface dark:border-dark-border">
    <div class="text-xs font-mono uppercase tracking-widest text-ink font-bold mb-4 dark:text-dark-ink">Programmatic Architecture Model: Divergent vs Convergent Thinking</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
      <div class="p-4 bg-white border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <span class="font-bold text-teal-700 block mb-2 dark:text-teal-400">Divergent Phase (Opening the Funnel)</span>
        <ul class="space-y-1 text-ink-muted dark:text-dark-muted">
          <li>&bull; Questioning orthodoxies</li>
          <li>&bull; "Yes, and..." thinking</li>
          <li>&bull; Maximizing solution variety</li>
          <li>&bull; Suspension of technical constraints</li>
        </ul>
      </div>
      <div class="p-4 bg-white border border-ink-border dark:bg-dark-card dark:border-dark-border">
        <span class="font-bold text-teal-700 block mb-2 dark:text-teal-400">Convergent Phase (Closing the Funnel)</span>
        <ul class="space-y-1 text-ink-muted dark:text-dark-muted">
          <li>&bull; Dot voting and prioritization</li>
          <li>&bull; Filtering by feasibility</li>
          <li>&bull; Synthesizing into concrete specs</li>
          <li>&bull; Making disciplined tradeoffs</li>
        </ul>
      </div>
    </div>
  </div>

  <h2 id="dt-mindsets" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. The Four Core Mindsets of Human-Centered Innovators</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Show, Don't Tell:</strong> Communicate vision through quick sketches and clickable prototypes rather than abstract presentations.</li>
    <li><strong>Focus on Human Values:</strong> Empathy for the people you are designing for is your ultimate north star.</li>
    <li><strong>Craft Clarity:</strong> Produce clean, unambiguous problem definitions from messy, confusing reality.</li>
    <li><strong>Bias Toward Action:</strong> When in doubt, build something small and test it immediately rather than debating in conference rooms.</li>
  </ul>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>What is Design Thinking?</em> by <strong>The Strategy Group</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=TtgegZfk5ZU" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">
      Original Lecture ↗
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
