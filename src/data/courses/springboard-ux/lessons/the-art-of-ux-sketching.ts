import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-4-1',
            slug: 'the-art-of-ux-sketching',
            title: 'The Messy Art Of UX Sketching: Thinking at the Speed of Thought',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.1',
            type: 'article',
            readTime: '22 min',
            originalSourceUrl: 'https://www.smashingmagazine.com/2011/12/the-messy-art-of-ux-sketching/',
            originalSourceLabel: 'Peiter Buick (Senior Designer & Smashing Magazine Contributor)',
            
            summaryQuote: 'Sketching on paper removes perfectionism, allowing designers to iterate ideas at the speed of thought before committing to digital pixels.',
            outline: [
          {
                    "id": "sk-why-paper",
                    "title": "1. Why Paper Beats Pixels in Early Discovery",
                    "level": 2
          },
          {
                    "id": "sk-psychology-lofi",
                    "title": "2. The Psychology of Low Fidelity: Inviting Honest Critique",
                    "level": 2
          },
          {
                    "id": "sk-crazy-8s",
                    "title": "3. The Crazy 8s Sprint Technique",
                    "level": 2
          },
          {
                    "id": "sk-visual-vocabulary",
                    "title": "4. The Essential UI Sketching Stencil Vocabulary",
                    "level": 2
          },
          {
                    "id": "sk-fidelity-ladder",
                    "title": "5. The Fidelity Ladder: Napkin to Wireframe",
                    "level": 2
          },
          {
                    "id": "sk-patterns",
                    "title": "6. Great Artists Reuse: Established UI Design Patterns",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      Whenever people hear the word "sketching," many immediately freeze and say: <em>"But I cannot draw! I am not an artist!"</em> In UX design, sketching has virtually nothing to do with artistic illustration. UX sketching is simply <strong>thinking on paper</strong>&mdash;a rapid, disposable method for externalizing mental models and generating dozens of structural possibilities in minutes.
    </p>

    <h2 id="sk-why-paper">1. Why Paper Beats Pixels in Early Discovery</h2>
    <p>
      When a designer opens Figma or Sketch with a blank digital canvas, something dangerous happens to their psychology. Because computer tools make lines straight, corners perfectly rounded, and text crisp, the designer unconsciously starts obsessing over micro-details: picking hex color codes, tweaking padding by 2 pixels, and browsing icon packs.
    </p>
    <p>
      This premature polish is fatal in the early discovery phase. When you spend two hours crafting a single pixel-perfect mockup, you become psychologically attached to it. You will defend it during team critiques even if its underlying layout is fundamentally flawed.
    </p>
    <p>
      With pen and paper, however, a sketch takes forty seconds. If an idea is terrible, you crumple the paper into a ball and throw it away without an ounce of regret. Paper keeps you fast, detached, and genuinely objective.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"The primary value of a sketch is not the artifact on the page; it is the mental clarity gained by the designer while making the marks."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        Peiter Buick &mdash; Smashing Magazine
      </footer>
    </blockquote>

    <h2 id="sk-psychology-lofi">2. The Psychology of Low Fidelity: Inviting Honest Critique</h2>
    <p>
      The visual fidelity of a design directly dictates the quality of feedback you receive from stakeholders:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">High-Fidelity Mockup</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Triggers Superficial Feedback</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          When stakeholders see a polished screen with photos and colors, they assume the architectural decisions are finished. They debate button colors, font sizes, and hero image models while ignoring broken task flows.
        </p>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Rough Pen Sketch</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-2">Triggers Structural Feedback</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          When stakeholders see hand-drawn boxes and squiggly lines, they immediately recognize the work is in-progress. They feel invited to grab a marker, point out missing steps, and debate the core business logic.
        </p>
      </div>
    </div>

    <h2 id="sk-crazy-8s">3. The Crazy 8s Sprint Technique</h2>
    <p>
      Developed at Google Ventures for rapid design sprints, <strong>Crazy 8s</strong> is a fast-paced sketching exercise that breaks creative block:
    </p>
    <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li>Take a standard A4 sheet of printer paper and fold it in half three times to create 8 equal rectangular grid cells.</li>
      <li>Set a timer for <strong>eight minutes</strong> (exactly 60 seconds per rectangular cell).</li>
      <li>In each cell, sketch a distinct variation or approach to the same screen or interaction challenge.</li>
      <li><strong>The Psychological Breakthrough:</strong> Your first two sketches will be obvious, boring clichés. By sketches 5 and 6, your brain runs out of easy answers and is forced to explore unconventional, radical configurations. That is where innovation happens.</li>
    </ol>

    <h2 id="sk-visual-vocabulary">4. The Essential UI Sketching Stencil Vocabulary</h2>
    <p>
      You only need five basic typographical and geometric symbols to sketch any modern interface:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Rectangle with an 'X' through it:</strong> Indicates an image, illustration, or video thumbnail.</li>
      <li><strong>Horizontal parallel squiggles:</strong> Indicates body text paragraphs.</li>
      <li><strong>Thick horizontal bars:</strong> Indicates a heading or title.</li>
      <li><strong>Small pill or rounded rectangle with a word:</strong> Indicates a button or clickable CTA.</li>
      <li><strong>Magnifying glass inside a box:</strong> Indicates an input search field.</li>
    </ul>

    <h2 id="sk-fidelity-ladder">5. The Fidelity Ladder: Napkin to Wireframe</h2>
    <p>
      Disciplined design teams move up the <strong>Fidelity Ladder</strong> deliberately:
    </p>
    <div class="my-8 space-y-3 not-prose">
      <div class="p-4 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-between">
        <span class="font-bold text-sm text-ink dark:text-dark-ink">Level 1: Napkin Sketches</span>
        <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Exploring 20+ wild ideas in 1 hour</span>
      </div>
      <div class="p-4 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-between">
        <span class="font-bold text-sm text-ink dark:text-dark-ink">Level 2: Step-by-Step UI Storyboard</span>
        <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Connecting 4 to 6 sketches with flow arrows</span>
      </div>
      <div class="p-4 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-between">
        <span class="font-bold text-sm text-ink dark:text-dark-ink">Level 3: Grayscale Digital Wireframes</span>
        <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Standardizing spatial grids and layout hierarchy in Figma</span>
      </div>
    </div>

    <h2 id="sk-patterns">6. Great Artists Reuse: Established UI Design Patterns</h2>
    <p>
      Never reinvent the wheel. As Marcin Treder noted, innovative product design is 80% proven, established design patterns and 20% bespoke magic. Users rely on established patterns (like the bottom navigation bar on iOS, breadcrumbs in e-commerce, and cards for discrete content items) because they provide instant cognitive familiarity.
    </p>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        PB
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Peiter Buick</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the foundational sketching masterclass <em>"The Messy Art Of UX Sketching"</em> by Peiter Buick on Smashing Magazine.
        </p>
        <a 
          href="https://www.smashingmagazine.com/2011/12/the-messy-art-of-ux-sketching/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          <span>View original publication on Smashing Magazine</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          };

export default LESSON;
