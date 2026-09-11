import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-2',
            slug: 'ux-vs-ui-deliverables-and-planes',
            title: 'UX vs. UI: The Structural Architecture vs. The Sensory Surface',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.2',
            type: 'article',
            readTime: '20 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-vs-ui/',
            originalSourceLabel: 'Jesse James Garrett & Don Norman (Foundations of HCI)',
            
            summaryQuote: 'UX design builds the structural architecture and behavioral pathways; UI design crafts the sensory affordances and visual surface.',
            outline: [
          {
                    "id": "sec-analogy",
                    "title": "1. The Restaurant Metaphor: Architecture vs. Ambiance",
                    "level": 2
          },
          {
                    "id": "sec-core-definition",
                    "title": "2. Deconstructing the Terminology",
                    "level": 2
          },
          {
                    "id": "sec-ux-dimensions",
                    "title": "3. The Five Behavioral Layers of UX",
                    "level": 2
          },
          {
                    "id": "sec-ui-dimensions",
                    "title": "4. The Four Visual & Tangible Layers of UI",
                    "level": 2
          },
          {
                    "id": "sec-responsibility-matrix",
                    "title": "5. Comprehensive Roles & Deliverables Matrix",
                    "level": 2
          },
          {
                    "id": "sec-collaboration",
                    "title": "6. How UX and UI Collaborate in Agile Sprints",
                    "level": 2
          },
          {
                    "id": "sec-misconceptions",
                    "title": "7. Common Industry Misconceptions",
                    "level": 2
          },
          {
                    "id": "sec-career-convergence",
                    "title": "8. The Product Designer: Where UX and UI Meet",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      If you spend five minutes browsing tech job boards, you will see the slash everywhere: <em>"UX/UI Designer Needed."</em> This ubiquitous slash creates a harmful illusion that User Experience and User Interface design are the same job. In reality, while they collaborate intimately, they require fundamentally distinct mindsets, cognitive toolkits, and daily workflows.
    </p>

    <h2 id="sec-analogy">1. The Restaurant Metaphor: Architecture vs. Ambiance</h2>
    <p>
      To understand the essential difference without jargon, consider an evening dining at a celebrated restaurant:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li>
        <strong>The User Interface (UI)</strong> is everything you can physically see and touch: the elegant gold-foil lettering on the menu, the heavyweight linen napkins, the custom ceramic plates, the dim chandelier lighting, and the polished mahogany tables.
      </li>
      <li>
        <strong>The User Experience (UX)</strong> is the holistic reality of your entire evening: did the host seat you promptly without confusion? Was the menu clear and readable in the dim lighting? Did your food arrive piping hot rather than lukewarm? Was paying the bill effortless, or did you wait twenty minutes waving your hand at distracted staff?
      </li>
    </ul>
    <p>
      A restaurant can have the most breathtaking interior decor in the city (stunning UI), but if the food takes two hours to arrive and the waiter insults your guests, your experience (UX) is ruined. Conversely, a modest street diner with plastic stools can deliver an unforgettable dining experience because the service is warm, the food is extraordinary, and ordering is effortless.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"UI is the saddle, the stirrups, and the reins; UX is the feeling you have being able to ride the horse with mastery, comfort, and confidence."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        Classic Design Axiom &mdash; Dain Miller
      </footer>
    </blockquote>

    <h2 id="sec-core-definition">2. Deconstructing the Terminology</h2>
    <p>
      Let us define each discipline with academic rigor:
    </p>
    <p>
      <strong>User Experience (UX) Design</strong> is the evidence-based practice of identifying human struggles, mapping mental models, and engineering frictionless journeys through a product. UX is fundamentally diagnostic and structural. It answers: <em>"What needs to happen, in what sequence, so the user accomplishes their objective with minimum mental strain?"</em>
    </p>
    <p>
      <strong>User Interface (UI) Design</strong> is the visual and interactive craftsmanship of communicating that journey through sensory touchpoints. UI is fundamentally aesthetic, communicative, and ergonomic. It answers: <em>"How do typography, color contrast, spatial layout, and micro-animations clarify the interface and delight the senses?"</em>
    </p>

    <h2 id="sec-ux-dimensions">3. The Five Behavioral Layers of UX</h2>
    <p>
      Jesse James Garrett famously defined user experience as five interdependent planes built from bottom to top:
    </p>
    <figure class="my-10 text-center not-prose">
      <img loading="lazy" decoding="async" 
        src="${path('/images/lessons/sb-1-2/garrett_5_planes.webp')}" 
        alt="Jesse James Garrett's Five Planes of User Experience: Strategy, Scope, Structure, Skeleton, and Surface" 
        class="w-full max-w-2xl mx-auto rounded-xs border border-ink-border shadow-xs dark:border-dark-border"
      />
      <figcaption class="text-xs font-mono text-ink-muted mt-3 dark:text-dark-muted">
        Figure 1: Jesse James Garrett's Five Planes of UX &mdash; ascending from abstract human intent to concrete sensory surface.
      </figcaption>
    </figure>

    <div class="my-8 border-y border-ink-border not-prose overflow-x-auto dark:border-dark-border">
      <table class="w-full text-left text-sm font-sans border-collapse">
        <thead>
          <tr class="border-b border-ink-border text-xs font-mono uppercase tracking-widest text-ink font-bold bg-paper-100 dark:bg-dark-surface dark:text-dark-ink dark:border-dark-border">
            <th class="py-3 px-4 w-12 text-center">Plane</th>
            <th class="py-3 px-4 w-1/4">Architectural Level</th>
            <th class="py-3 px-4">Core Deliverables & Specifications</th>
            <th class="py-3 px-4 w-1/4">Key Question</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border text-ink dark:text-dark-ink dark:divide-dark-border">
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 text-center dark:text-teal-400">01</td>
            <td class="py-3 px-4 font-semibold">Strategy Plane</td>
            <td class="py-3 px-4 text-sm leading-relaxed">User research insights, business goals, success metrics, stakeholder alignment.</td>
            <td class="py-3 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Why are we building this, and for whom?</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 text-center dark:text-teal-400">02</td>
            <td class="py-3 px-4 font-semibold">Scope Plane</td>
            <td class="py-3 px-4 text-sm leading-relaxed">Functional specifications, content inventory, feature prioritization matrices.</td>
            <td class="py-3 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">What exact features and content are required?</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 text-center dark:text-teal-400">03</td>
            <td class="py-3 px-4 font-semibold">Structure Plane</td>
            <td class="py-3 px-4 text-sm leading-relaxed">Information architecture taxonomies, tree diagrams, interaction flowcharts.</td>
            <td class="py-3 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">How does the user navigate between tasks?</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 text-center dark:text-teal-400">04</td>
            <td class="py-3 px-4 font-semibold">Skeleton Plane</td>
            <td class="py-3 px-4 text-sm leading-relaxed">Interface wireframes, navigation mechanisms, information design layouts.</td>
            <td class="py-3 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Where do buttons, lists, and controls sit?</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 text-center dark:text-teal-400">05</td>
            <td class="py-3 px-4 font-semibold">Surface Plane</td>
            <td class="py-3 px-4 text-sm leading-relaxed">Visual design tokens, typographic hierarchy, color systems, tactile micro-animations.</td>
            <td class="py-3 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">How does the final interface look and feel?</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Notice that UI occupies the <strong>Surface</strong> plane—the final, visible culmination of the preceding four structural planes. If the Strategy, Scope, Structure, or Skeleton are broken, the most exquisite Surface styling cannot rescue the product.
    </p>

    <h2 id="sec-ui-dimensions">4. The Four Visual & Tangible Layers of UI</h2>
    <p>
      UI designers transform structural wireframes into high-craft interfaces across four tactile domains:
    </p>
    <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-5 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">1. Typographic Hierarchy</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Selecting harmonious typefaces, establishing modular scale ratios (16px base, 20px subhead, 32px title), and setting line height and measure for effortless reading.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">2. Color Theory & Accessibility</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Creating semantic token systems (Primary, Surface, Error, Muted) that meet WCAG AAA contrast standards (7:1 for normal text) across Light and Dark surfaces.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">3. Spatial Rhythm & Layout</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Applying an 8-point spatial grid system across margins, padding, and layout components to produce unconscious visual order and rhythm.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">4. Interaction & Motion</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Choreographing button states (Default, Hover, Active, Disabled, Loading) and easing curves that communicate physical weight and spatial continuity.
        </p>
      </div>
    </div>

    <h2 id="sec-responsibility-matrix">5. Comprehensive Roles & Deliverables Matrix</h2>
    <div class="my-10 overflow-x-auto not-prose">
      <table class="w-full text-left font-serif text-sm border-collapse border-t border-b border-ink-border dark:border-dark-border">
        <thead>
          <tr class="border-b border-ink-border dark:border-dark-border bg-paper-100 dark:bg-dark-card">
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Category</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">UX Designer</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">UI Designer</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60">
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Mindset</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Empathetic, analytical, problem-oriented, investigative.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Aesthetic, communicative, detail-oriented, visual-spatial.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Daily Tasks</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Conducting user interviews, building journey maps, card sorting, wireframing.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Designing UI components, refining typography, building Figma tokens, checking contrast.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Core Deliverables</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">User personas, user flow diagrams, low-fidelity wireframes, usability test summaries.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">High-fidelity screens, interactive component libraries, UI kits, design specs.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Software Tools</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Miro, FigJam, Dovetail, UserTesting, Balsamiq, Whimsical.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Figma, Sketch, Adobe Illustrator, Principle, Framer.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="sec-collaboration">6. How UX and UI Collaborate in Agile Sprints</h2>
    <p>
      In high-performing product engineering teams, UX and UI designers work in tight, continuous feedback loops rather than a disjointed handoff. The typical sprint collaboration proceeds as follows:
    </p>
    <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Discovery:</strong> The UX designer shares field research findings, persona goals, and proposed task flows with the UI designer and engineering lead.</li>
      <li><strong>Wireframe Review:</strong> The UX designer produces grayscale wireframes. The UI designer evaluates spatial feasibility and proposes early visual patterns.</li>
      <li><strong>Visual Translation:</strong> The UI designer applies the design system, establishing contrast, hierarchy, and micro-interactions on the approved wireframes.</li>
      <li><strong>Usability Testing:</strong> Both designers observe usability sessions together. The UX designer evaluates task success; the UI designer observes visual affordance errors (e.g., users failing to recognize an icon).</li>
    </ol>

    <h2 id="sec-misconceptions">7. Common Industry Misconceptions</h2>
    <div class="space-y-4 my-8 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Myth 1: "UI is just making UX pretty."</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Visual design is not superficial decoration. Clear typography, intentional whitespace, and distinct color hierarchy actively guide human attention and reduce cognitive load. Great UI makes complex functionality immediately intelligible.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Myth 2: "UX is purely subjective opinion."</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          True UX is grounded in empirical observation and behavioral science. When five independent users all fail to find the cancel button on a screen, that is not an opinion; it is an objective, measurable usability flaw.
        </p>
      </div>
    </div>

    <h2 id="sec-career-convergence">8. The Product Designer: Where UX and UI Meet</h2>
    <p>
      In recent years, leading tech companies (including Apple, Airbnb, Stripe, and Figma) have converged these responsibilities under the title of <strong>Product Designer</strong>. A Product Designer is a T-shaped or M-shaped practitioner capable of conducting generative user interviews in the morning, structuring the information architecture at noon, and polishing pixel-perfect Figma components by evening.
    </p>
    <p>
      Whether you choose to specialize deeply in UX research, dedicate your craft to visual UI systems, or become a hybrid Product Designer, mastering the distinction between experience and interface is the foundational first step of your professional journey.
    </p>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        SB
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Springboard Design Track</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the foundational curriculum publication <em>"UX vs. UI: The Difference Between UX and UI Design(ers)"</em> by the Springboard Editorial Team.
        </p>
        <a 
          href="https://www.springboard.com/blog/design/ux-vs-ui/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          <span>View original publication on Springboard Blog</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          };

export default LESSON;
