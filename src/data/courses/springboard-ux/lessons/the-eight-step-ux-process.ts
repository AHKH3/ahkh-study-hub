import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-1',
            slug: 'the-eight-step-ux-process',
            title: 'What Is the UX Design Process? 8 Steps Explained in Detail',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.1',
            type: 'article',
            readTime: '24 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-design-process/',
            originalSourceLabel: 'Sakshi Gupta (Design Researcher & Strategist)',
            
            summaryQuote: 'The UX design process is a disciplined journey from an ambiguous problem to a validated digital solution, grounding every interface choice in real human behavior.',
            outline: [
          {
                    "id": "sec-market-reality",
                    "title": "1. Market Reality & Industry Outlook",
                    "level": 2
          },
          {
                    "id": "sec-what-is-process",
                    "title": "2. What Is the UX Design Process?",
                    "level": 2
          },
          {
                    "id": "sec-why-important",
                    "title": "3. Why UX Design Matters: Beyond Aesthetics",
                    "level": 2
          },
          {
                    "id": "sec-ux-vs-ui",
                    "title": "4. The Fundamental Distinction: UX vs. UI",
                    "level": 2
          },
          {
                    "id": "sec-five-stages",
                    "title": "5. The 5 Foundational Stages of Product Development",
                    "level": 2
          },
          {
                    "id": "sec-step-1",
                    "title": "6. Step 1: Stakeholder Interviews (Aligning Business & Design)",
                    "level": 2
          },
          {
                    "id": "sec-step-2",
                    "title": "7. Step 2: User Research & Contextual Inquiry",
                    "level": 2
          },
          {
                    "id": "sec-step-3",
                    "title": "8. Step 3: UX Audit & Competitor Intelligence",
                    "level": 2
          },
          {
                    "id": "sec-step-4",
                    "title": "9. Step 4: Wireframing & Structural Blueprints",
                    "level": 2
          },
          {
                    "id": "sec-step-5",
                    "title": "10. Step 5: Interactive Prototyping (From Low-Fi to High-Fi)",
                    "level": 2
          },
          {
                    "id": "sec-step-6",
                    "title": "11. Step 6: User Testing & Behavioral Observation",
                    "level": 2
          },
          {
                    "id": "sec-step-7",
                    "title": "12. Step 7: Synthesis & Iterative Refinement",
                    "level": 2
          },
          {
                    "id": "sec-faqs",
                    "title": "13. Frequently Asked Questions & Core Takeaways",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      Every successful digital product—from the banking app you trust with your life savings to the navigation system that guides you through an unfamiliar city—is shaped by a disciplined sequence of decisions known as the <strong>UX design process</strong>.
    </p>

    <h2 id="sec-market-reality">1. Market Reality & Industry Outlook</h2>
    <p>
      The field of User Experience (UX) design sits at the intersection of psychology, technology, business strategy, and human craftsmanship. Digital products look and behave the way they do because UX designers conduct user inquiries, evaluate ergonomics, apply behavioral heuristics, and guide product development from blank sheet to shipping code.
    </p>
    <p>
      This discipline is also in extraordinary global demand. LinkedIn consistently lists UX design among the top most-sought-after hard skills across major enterprises, and Glassdoor consistently features product design in the top 25 best jobs of the decade. As software becomes the primary interface between human beings and the modern economy, companies that ignore user experience quickly lose their customers to competitors who take user needs seriously.
    </p>

    <!-- Industry Metrics Card -->
    <div class="my-10 p-6 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-4">
      <div class="flex items-center gap-2 font-mono text-xs text-teal-700 dark:text-teal-400 font-bold uppercase tracking-widest">
        <span>Industry Benchmarks & Economic Value</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div class="p-4 rounded-xs bg-white dark:bg-dark-surface border border-ink-border/80 dark:border-dark-border">
          <strong class="text-ink dark:text-dark-ink block text-sm font-sans mb-1 font-bold">LinkedIn In-Demand Index</strong>
          <p class="text-xs sm:text-sm text-ink dark:text-dark-ink font-serif leading-relaxed">
            Consistently ranks in the highest bracket of sought-after technical skills across enterprise software, consumer apps, healthcare, and fintech.
          </p>
        </div>
        <div class="p-4 rounded-xs bg-white dark:bg-dark-surface border border-ink-border/80 dark:border-dark-border">
          <strong class="text-ink dark:text-dark-ink block text-sm font-sans mb-1 font-bold">Glassdoor Top 25 Careers</strong>
          <p class="text-xs sm:text-sm text-ink dark:text-dark-ink font-serif leading-relaxed">
            Celebrated for high career mobility, competitive compensation, remote flexibility, and cross-functional executive leadership pathways.
          </p>
        </div>
      </div>
    </div>

    <h2 id="sec-what-is-process">2. What Is the UX Design Process?</h2>
    <p>
      The UX design process is a structured sequence of research, ideation, prototyping, and evaluation steps followed by designers to turn vague challenges into intuitive solutions. While different design teams customize the process to fit their sprint cycles, virtually all modern teams adhere to the same underlying cadence:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Understanding the Problem:</strong> Discovering what real human struggle exists and clarifying business objectives.</li>
      <li><strong>Gathering Behavioral Evidence:</strong> Interviewing users and observing how they complete tasks in real conditions.</li>
      <li><strong>Structuring Information Architecture:</strong> Organizing content nodes, taxonomies, and navigational flows.</li>
      <li><strong>Sketching & Prototyping:</strong> Building interactive models ranging from paper sketches to high-fidelity Figma components.</li>
      <li><strong>Testing & Validating:</strong> Watching real users navigate the prototype to expose mistakes before writing code.</li>
    </ul>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"UX design goes far beyond cosmetic styling; it anchors technical decisions in observable human behavior, ensuring that human goals and business objectives converge effortlessly."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        Core Philosophy &mdash; Sakshi Gupta
      </footer>
    </blockquote>

    <h2 id="sec-why-important">3. Why UX Design Matters: Beyond Aesthetics</h2>
    <p>
      Engineering teams frequently ask why product organizations invest so heavily in user research rather than jumping straight into programming. The answer is simple economic efficiency: <strong>fixing a design flaw on a whiteboard costs minutes; fixing it in code costs weeks; fixing it after customers leave costs millions.</strong>
    </p>
    <p>
      Design thinking forces teams to step outside their own assumptions. When engineers build products strictly around internal database architectures, the user interface invariably reflects the database schema rather than how a human mind thinks. UX design acts as the crucial translator between human mental models and system architecture.
    </p>

    <h2 id="sec-ux-vs-ui">4. The Fundamental Distinction: UX vs. UI</h2>
    <p>
      One of the most common confusions for beginners is the difference between User Experience (UX) and User Interface (UI) design. While closely intertwined, they focus on fundamentally distinct dimensions of product development:
    </p>

    <!-- Comparative Table -->
    <div class="my-10 overflow-x-auto not-prose">
      <table class="w-full text-left font-serif text-sm border-collapse border-t border-b border-ink-border dark:border-dark-border">
        <thead>
          <tr class="border-b border-ink-border dark:border-dark-border bg-paper-100 dark:bg-dark-card">
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Dimension</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">UX Design (Experience)</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400">UI Design (Interface)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60">
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Core Focus</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">How the product works, feels, and solves problems.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">How the product looks, presents itself, and animates.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Guiding Question</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">"Does this flow solve the user's struggle intuitively?"</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">"Does this screen convey brand clarity, hierarchy, and delight?"</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Primary Artifacts</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Personas, user journey maps, sitemaps, wireframes, testing reports.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Design tokens, color palettes, typography scales, interactive components.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Success Metric</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Task completion rate, reduction in errors, user retention.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Visual clarity, aesthetic delight, brand consistency, accessibility contrast.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="sec-five-stages">5. The 5 Foundational Stages of Product Development</h2>
    <p>
      At an architectural level, the product development lifecycle moves through five sequential phases:
    </p>

    <div class="my-8 space-y-4 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Stage 01 Define</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Alignment & Scope</span>
        </div>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Define the Core Challenge</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          State the fundamental business objectives, user targets, and technical constraints before spending engineering hours.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Stage 02 Research</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Contextual Inquiry</span>
        </div>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Discover User Realities</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Conduct qualitative user interviews and field inquiries to learn what people actually do rather than what they claim they do.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Stage 03 Analyze</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Synthesis & Scenarios</span>
        </div>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Map Personas and Journeys</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Synthesize field interviews into behavioral archetypes (personas) and diagram step-by-step user journey maps identifying drop-offs.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Stage 04 Design</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Architecture & Prototypes</span>
        </div>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Construct Wireframes & Interactive Prototypes</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Evolve concepts from rough paper sketches to structural wireframes, interactive Figma components, and cohesive design systems.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Stage 05 Validate</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Empirical Testing</span>
        </div>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Test with Real Participants</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Put interactive prototypes in front of real users, record qualitative friction points, and iteratively refine prior to release.
        </p>
      </div>
    </div>

    <!-- The 7 Tactical Steps -->
    <h2 id="sec-step-1">6. Step 1: Stakeholder Interviews (Aligning Business & Design)</h2>
    <p>
      Every product initiative begins with a business context. Before speaking to users, you must understand what your organization or client hopes to achieve. Are they trying to increase checkout conversion? Reduce customer support tickets? Expand into an international market?
    </p>
    <p>
      <strong>How to Start:</strong> Schedule 30-minute structured discovery calls with key leaders across Product, Engineering, Sales, and Support. Ask:
    </p>
    <ul class="list-disc pl-6 space-y-1 my-4 font-serif text-base text-ink dark:text-dark-ink">
      <li>What does business success look like for this initiative in six months?</li>
      <li>What technical or regulatory limitations must the design respect?</li>
      <li>What previous attempts failed, and what did the team learn from them?</li>
    </ul>

    <h2 id="sec-step-2">7. Step 2: User Research & Contextual Inquiry</h2>
    <p>
      Once business parameters are defined, the designer turns directly to the people who will actually touch the software. User research provides the empirical ground truth that keeps teams honest.
    </p>
    <p>
      <strong>How to Start:</strong> Recruit 5 to 8 participants matching your target audience. Conduct semi-structured, 45-minute interviews. Avoid leading questions like <em>"Would you like an automatic sync button?"</em> (users almost always say yes). Instead, ask backward-looking behavioral questions: <em>"Tell me about the last time you tried to sync files between your phone and laptop. What happened, and where did you get stuck?"</em>
    </p>

    <h2 id="sec-step-3">8. Step 3: UX Audit & Competitor Intelligence</h2>
    <p>
      Never design in a vacuum. A thorough competitor audit reveals established user expectations and gaps in the market that your product can exploit.
    </p>
    <div class="my-6 p-4 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border font-serif text-sm text-ink dark:text-dark-ink">
      <strong class="font-bold block mb-1">Direct vs. Indirect Competitors:</strong>
      Direct competitors offer the same solution in your exact market (e.g., Uber vs. Lyft). Indirect competitors satisfy the underlying human need through different mechanisms (e.g., Uber vs. public subways vs. walking). Studying indirect competitors often generates your most breakthrough UX insights.
    </div>

    <h2 id="sec-step-4">9. Step 4: Wireframing & Structural Blueprints</h2>
    <p>
      Wireframes are the architectural blueprints of digital design. They deliberately strip away typography choices, brand colors, imagery, and visual distractions to focus 100% on information hierarchy, layout, and content flow.
    </p>
    <p>
      <strong>How to Start:</strong> Begin with pencil and dot-grid paper. Sketch 4 to 6 different ways to layout the same screen. Once you identify the most promising layout, translate it into grayscale frames in your design tool using standard grid systems (e.g., 8-point spatial grid).
    </p>

    <h2 id="sec-step-5">10. Step 5: Interactive Prototyping (From Low-Fi to High-Fi)</h2>
    <p>
      Static screens cannot convey transitions, scroll states, or cognitive momentum. Prototypes bring static wireframes to life by connecting artboards with clickable hotspots and realistic logic.
    </p>
    <p>
      <strong>Progression:</strong> Start with simple click-through flows in Figma to test navigation paths. As usability feedback verifies the broad structure, upgrade to high-fidelity components that incorporate the actual design system tokens, typography scales, and micro-interactions.
    </p>

    <h2 id="sec-step-6">11. Step 6: User Testing & Behavioral Observation</h2>
    <p>
      User testing is the ultimate reality check. It involves watching real people interact with your prototype while you remain quiet and observe.
    </p>
    <p>
      <strong>The Think-Aloud Protocol:</strong> Encourage participants to narrate their thoughts as they explore: <em>"Right now I'm looking for the invoice settings, but I only see team members, so I'm clicking here..."</em> This exposes cognitive friction points that analytics will never catch.
    </p>

    <h2 id="sec-step-7">12. Step 7: Synthesis & Iterative Refinement</h2>
    <p>
      Testing reveals where users stumbled, got confused, or misinterpreted buttons. In the synthesis phase, the design team clusters recurring errors onto an affinity matrix, evaluates their severity, and implements fixes before handoff to engineering.
    </p>

    <!-- Socratic Callout -->
    <aside class="my-10 p-5 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border text-ink dark:text-dark-ink space-y-2 not-prose">
      <p class="font-mono text-xs uppercase font-bold text-teal-700 dark:text-teal-400 tracking-widest">Reflection Inquiry</p>
      <p class="font-serif text-sm sm:text-base leading-relaxed">
        Why is it dangerous to treat the UX design process as a strict linear conveyor belt? How does circling back between prototyping and user research actually save engineering capital?
      </p>
    </aside>

    <h2 id="sec-faqs">13. Frequently Asked Questions & Core Takeaways</h2>
    <div class="space-y-6 my-8 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1.5">Who participates in the UX design process?</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          While led by UX designers and researchers, successful execution requires continuous collaboration with product managers (defining business scope), software engineers (evaluating technical feasibility), and customer success teams (surfacing daily user complaints).
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1.5">Are there faster alternatives like Lean UX or Google Design Sprints?</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Yes. Frameworks like Lean UX and Google's 5-day Design Sprint condense these stages into rapid cycles. However, even the most accelerated sprint still contains the foundational core: problem framing, rapid prototyping, and empirical user testing.
        </p>
      </div>
    </div>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        SG
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Sakshi Gupta</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          This comprehensive editorial study guide is synthesized from the official curriculum publication <em>"What Is the UX Design Process? 8 Steps Explained in Detail"</em> by Sakshi Gupta at Springboard.
        </p>
        <a 
          href="https://www.springboard.com/blog/design/ux-design-process/" 
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
