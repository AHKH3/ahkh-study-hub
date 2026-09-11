import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-3',
            slug: 'design-thinking-process-and-mindsets',
            title: 'Design Thinking 101: Human-Centered Mindsets & The Double Diamond',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.3',
            type: 'video',
            readTime: '18 min',
            originalSourceUrl: 'https://www.nngroup.com/videos/design-thinking-101/',
            originalSourceLabel: 'Sarah Gibbons (Chief Designer, Nielsen Norman Group)',
            youtubeId: '6lmvCqvmjfE',
            summaryQuote: 'Design thinking is not a rigid linear checklist; it is an iterative mindset grounded in deep empathy and divergent-convergent exploration.',
            outline: [
          {
                    "id": "dt-intro",
                    "title": "1. The Mindset of Human-Centered Innovation",
                    "level": 2
          },
          {
                    "id": "dt-stage-1",
                    "title": "2. Stage 1: Empathize (Listening without Judgment)",
                    "level": 2
          },
          {
                    "id": "dt-stage-2",
                    "title": "3. Stage 2: Define (Framing the Real Struggle)",
                    "level": 2
          },
          {
                    "id": "dt-stage-3",
                    "title": "4. Stage 3: Ideate (Divergent Thinking & Crazy 8s)",
                    "level": 2
          },
          {
                    "id": "dt-stage-4",
                    "title": "5. Stage 4: Prototype (Cheap, Fast, Tangible Experiments)",
                    "level": 2
          },
          {
                    "id": "dt-stage-5",
                    "title": "6. Stage 5: Test (Validating Assumptions with Real Users)",
                    "level": 2
          },
          {
                    "id": "dt-double-diamond",
                    "title": "7. The Double Diamond: Alternating Divergence and Convergence",
                    "level": 2
          },
          {
                    "id": "dt-beginners-mind",
                    "title": "8. Cultivating Beginner's Mind",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction",
                    "text": "Sarah Gibbons introduces Design Thinking as a human-centered innovation framework."
          },
          {
                    "time": 90,
                    "label": "01:30 - Empathize & Define",
                    "text": "The foundational stages of listening to real users and framing actionable problem statements."
          },
          {
                    "time": 210,
                    "label": "03:30 - Ideate & Diverge",
                    "text": "Generating wild, divergent possibilities without premature criticism or filtering."
          },
          {
                    "time": 330,
                    "label": "05:30 - Prototype & Test",
                    "text": "Making ideas tangible with rapid prototypes and validating them through direct observation."
          },
          {
                    "time": 450,
                    "label": "07:30 - Iterative Mindsets",
                    "text": "Embracing failure as data, cultivating beginner mind, and maintaining relentless focus on human outcomes."
          }
],
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      Design Thinking is not a rigid formula; it is an empathetic, non-linear problem-solving philosophy pioneered at Stanford d.school and codified by global design leaders to tackle complex, ambiguous human challenges.
    </p>

    <div data-timestamp="0" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded-xs bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="0">
          00:00 &mdash; Play Lecture Intro
        </button>
      </div>
      <h2 id="dt-intro" class="!mt-0 !border-b-0">1. The Mindset of Human-Centered Innovation</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        Traditional business approaches tackle problems by starting with spreadsheets, feature matrices, and technical feasibility. Design Thinking turns that hierarchy upside down: it mandates starting with <strong>human desirability</strong> first, only considering technical feasibility and economic viability once you are certain you are solving a genuine human struggle.
      </p>
    </div>

    <!-- The 5 Stages Visual Grid -->
    <div class="my-10 grid grid-cols-1 sm:grid-cols-5 gap-3 not-prose text-center">
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="font-mono text-xs text-teal-700 dark:text-teal-400 font-bold mb-1">01</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Empathize</div>
        <div class="text-xs text-ink-muted dark:text-dark-muted mt-1">Listen & observe</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="font-mono text-xs text-teal-700 dark:text-teal-400 font-bold mb-1">02</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Define</div>
        <div class="text-xs text-ink-muted dark:text-dark-muted mt-1">Frame the friction</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="font-mono text-xs text-teal-700 dark:text-teal-400 font-bold mb-1">03</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Ideate</div>
        <div class="text-xs text-ink-muted dark:text-dark-muted mt-1">Brainstorm widely</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="font-mono text-xs text-teal-700 dark:text-teal-400 font-bold mb-1">04</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Prototype</div>
        <div class="text-xs text-ink-muted dark:text-dark-muted mt-1">Build test models</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <div class="font-mono text-xs text-teal-700 dark:text-teal-400 font-bold mb-1">05</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Test</div>
        <div class="text-xs text-ink-muted dark:text-dark-muted mt-1">Validate with users</div>
      </div>
    </div>

    <!-- Stage 1 -->
    <div data-timestamp="90" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded-xs bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="90">
          01:30 &mdash; Jump to Empathy Phase
        </button>
      </div>
      <h2 id="dt-stage-1" class="!mt-0 !border-b-0">2. Stage 1: Empathize (Listening without Judgment)</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        The empathy phase requires setting aside your personal assumptions, ego, and expertise. Designers immerse themselves in the user's physical environment. You observe what tools they use, note where they hesitate, and listen to the emotional language they use when describing their frustrations.
      </p>
      <p class="font-serif text-base text-ink dark:text-dark-ink leading-relaxed mt-2">
        <strong>The Rule of Extreme Users:</strong> When testing an interface, studying average users yields predictable results. But interviewing "extreme users"—such as people with severe motor impairments, or elderly users who have never used smartphones—reveals hidden friction points that benefit every user when resolved.
      </p>
    </div>

    <!-- Stage 2 -->
    <div data-timestamp="210" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded-xs bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="210">
          03:30 &mdash; Jump to Define Phase
        </button>
      </div>
      <h2 id="dt-stage-2" class="!mt-0 !border-b-0">3. Stage 2: Define (Framing the Real Struggle)</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        In the Define phase, you synthesize messy field observations into a tight, actionable problem statement known as a <strong>Point-of-View (POV)</strong>.
      </p>
      <div class="my-4 p-4 rounded-xs bg-white dark:bg-dark-surface border border-ink-border/60 dark:border-dark-border font-serif text-sm">
        <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Standard POV Formula</strong>
        <p class="italic text-ink dark:text-dark-ink">"[User description] needs a way to [user need] because surprisingly, [unexpected insight uncovered in research]."</p>
      </div>
      <p class="font-serif text-base text-ink dark:text-dark-ink leading-relaxed">
        From this statement, you generate open-ended <strong>"How Might We" (HMW)</strong> questions that launch the ideation phase without dictating a specific UI component.
      </p>
    </div>

    <!-- Stage 3 -->
    <div data-timestamp="330" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded-xs bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="330">
          05:30 &mdash; Jump to Ideation Phase
        </button>
      </div>
      <h2 id="dt-stage-3" class="!mt-0 !border-b-0">4. Stage 3: Ideate (Divergent Thinking & Crazy 8s)</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        The ideation phase is deliberately divergent. The goal is quantity over quality: generating fifty concepts to uncover the three breakthrough ideas that defy conventional assumptions.
      </p>
      <p class="font-serif text-base text-ink dark:text-dark-ink leading-relaxed mt-2">
        Techniques like <strong>Crazy 8s</strong> (folding a paper sheet into 8 boxes and drawing 8 distinct screen layouts in 8 minutes) force designers past their first obvious, clichéd idea into radical, novel configurations.
      </p>
    </div>

    <!-- Stage 4 & 5 -->
    <div data-timestamp="450" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-colors">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded-xs bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="450">
          07:30 &mdash; Jump to Prototype & Test
        </button>
      </div>
      <h2 id="dt-stage-4" class="!mt-0 !border-b-0">5. Stage 4: Prototype & Stage 5: Test</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        A prototype is not meant to be a polished work of art; it is an experimental instrument designed to answer a specific question: <em>"Will users understand this concept?"</em>
      </p>
      <p class="font-serif text-base text-ink dark:text-dark-ink leading-relaxed mt-2">
        When testing, resist the urge to explain or defend your design. If a user cannot figure out where to click, the design has failed, not the user. Observe their hesitation quietly and take notes.
      </p>
    </div>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"Fail early, fail cheaply, and fail in a mockup rather than in production code. A prototype is a conversation piece with the user's subconscious mind."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        Sarah Gibbons &mdash; Nielsen Norman Group
      </footer>
    </blockquote>

    <h2 id="dt-double-diamond">7. The Double Diamond: Alternating Divergence and Convergence</h2>
    <p>
      The British Design Council visualized Design Thinking as two interconnected diamonds:
    </p>
    <figure class="my-10 text-center not-prose">
      <img loading="lazy" decoding="async" 
        src="${path('/images/lessons/sb-1-3/double_diamond_framework.webp')}" 
        alt="The Double Diamond Design Model illustrating alternating divergent and convergent phases across problem and solution spaces" 
        class="w-full max-w-2xl mx-auto rounded-xs border border-ink-border shadow-xs dark:border-dark-border"
      />
      <figcaption class="text-xs font-mono text-ink-muted mt-3 dark:text-dark-muted">
        Figure 1: The Double Diamond Framework &mdash; Discover, Define, Develop, Deliver (British Design Council).
      </figcaption>
    </figure>

    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Diamond 01 Problem Space</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Discover & Define</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          You first expand outward (diverge) to explore all possible facets of user pain, then focus inward (converge) onto the single high-impact problem to solve.
        </p>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Diamond 02 Solution Space</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Develop & Deliver</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          You expand outward again (diverge) to generate dozens of radical solution prototypes, then converge onto the validated design that will be handed off to engineering.
        </p>
      </div>
    </div>

    <h2 id="dt-beginners-mind">8. Cultivating Beginner's Mind</h2>
    <p>
      The ultimate asset of an exceptional UX designer is <strong>Shoshin</strong> (Beginner's Mind). The moment you assume you are an expert who already knows what users want, your ability to conduct empathetic research evaporates. Enter every research session with genuine curiosity, ask childlike questions, and let real human behavior continuously surprise you.
    </p>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        NN
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Video Study Companion &mdash; Sarah Gibbons</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the definitive video masterclass and publication <em>"Design Thinking 101"</em> by Sarah Gibbons at Nielsen Norman Group.
        </p>
        <a 
          href="https://www.nngroup.com/articles/design-thinking/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          <span>View original publication on Nielsen Norman Group</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          };

export default LESSON;
