import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-5-1',
            slug: 'interactive-prototyping-in-figma',
            title: 'Interactive Prototyping: Bringing Wireframes to Life in Figma',
            module: 'Unit 5: Interactive Prototyping',
            unitNumber: 5,
            lessonNumber: '5.1',
            type: 'article',
            readTime: '26 min',
            originalSourceUrl: 'https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma',
            originalSourceLabel: 'Figma Learn Documentation Team',
            
            summaryQuote: 'A prototype turns abstract debate into concrete physical reality, validating workflows before expensive engineering development begins.',
            outline: [
          {
                    "id": "pr-why-simulate",
                    "title": "1. Why Static Mockups Fail Complex Logic",
                    "level": 2
          },
          {
                    "id": "pr-anatomy",
                    "title": "2. Anatomy of an Interaction: Triggers, Actions & Transitions",
                    "level": 2
          },
          {
                    "id": "pr-smart-animate",
                    "title": "3. Mastering Smart Animate: Layer Names & Spatial Continuity",
                    "level": 2
          },
          {
                    "id": "pr-components",
                    "title": "4. Interactive Components & Variant States",
                    "level": 2
          },
          {
                    "id": "pr-device-frames",
                    "title": "5. Mobile Viewports & Physical Ergonomics",
                    "level": 2
          },
          {
                    "id": "pr-testing-prep",
                    "title": "6. Preparing Prototypes for Usability Testing",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      A static mockup is a freeze-frame photograph of a product; an interactive prototype is the motion picture. In modern product engineering, the prototype is the single most authoritative communication tool between designers, executive stakeholders, and software engineers.
    </p>

    <h2 id="pr-why-simulate">1. Why Static Mockups Fail Complex Logic</h2>
    <p>
      Consider a simple mobile modal sheet that slides up from the bottom of the screen. In a static design presentation, the designer shows Screen A (empty feed) and Screen B (feed with modal overlay). But static images cannot answer essential engineering and usability questions:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li>How fast does the modal slide up? What is the physical easing curve (linear, spring, ease-out)?</li>
      <li>Does the background feed blur or dim? By what percentage?</li>
      <li>If the user drags their finger down slightly, does the modal follow their finger with 1:1 physics, or does it snap immediately shut?</li>
      <li>If a network call fails while the modal is open, what error state displays?</li>
    </ul>
    <p>
      An interactive prototype answers these questions conclusively, leaving zero room for subjective misinterpretation during developer handoff.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
      <p>"If a picture is worth a thousand words, an interactive prototype is worth a thousand meetings."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-ink-muted dark:text-dark-muted font-bold tracking-widest uppercase">
        IDEO Prototyping Canon
      </footer>
    </blockquote>

    <h2 id="pr-anatomy">2. Anatomy of an Interaction: Triggers, Actions & Transitions</h2>
    <p>
      Every interaction in tools like Figma is composed of three interconnected parts:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-5 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Part 01</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Trigger</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          The physical user gesture that initiates the event: <em>On Click, While Hovering, While Pressing, On Drag, or After Delay</em>.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Part 02</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Action</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          What the system does in response: <em>Navigate to screen, Open overlay, Swap variant, Scroll to anchor, or Set variable</em>.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 uppercase block mb-1">Part 03</span>
        <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1">Transition & Easing</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          The temporal physics of the movement: <em>Instant, Dissolve, Smart Animate, Slide In, or Push</em>, tuned with cubic-bezier curves (e.g., 300ms ease-out).
        </p>
      </div>
    </div>

    <h2 id="pr-smart-animate">3. Mastering Smart Animate: Layer Names & Spatial Continuity</h2>
    <p>
      Figma's <strong>Smart Animate</strong> engine calculates the delta between two artboards and automatically interpolates differences in position, scale, opacity, corner radius, and fill color.
    </p>
    <div class="my-6 p-4 rounded-xs bg-paper-100 dark:bg-dark-card border border-ink-border dark:border-dark-border font-serif text-sm text-ink dark:text-dark-ink">
      <strong class="font-bold block mb-1">The Golden Rule of Smart Animate:</strong>
      Smart Animate relies entirely on matching <strong>Layer Names</strong> and hierarchy. If a button is named <em>"Primary CTA"</em> on Frame 1, it must be named <em>"Primary CTA"</em> on Frame 2. If you rename it to <em>"Primary CTA Active"</em>, Figma will treat them as two completely separate objects, causing a harsh crossfade rather than a smooth spatial transition.
    </div>

    <h2 id="pr-components">4. Interactive Components & Variant States</h2>
    <p>
      In early prototyping tools, showing a simple button hover state required duplicating the entire screen twice. Modern design systems solve this with <strong>Interactive Components</strong>:
    </p>
    <p>
      You wire connections directly inside the component set itself: connecting the <em>Default</em> variant to the <em>Hover</em> variant (via <em>While Hovering</em>) and to the <em>Active</em> variant (via <em>While Pressing</em>). Once wired at the component level, every single button instance across five hundred screens automatically inherits interactive states with zero manual wiring!
    </p>

    <h2 id="pr-device-frames">5. Mobile Viewports & Physical Ergonomics</h2>
    <p>
      Never present mobile designs in a floating web browser window. Always wrap mobile prototypes in realistic device frames (e.g., iPhone 15 Pro, Pixel 8) with proper device safe areas (status bars and home indicator bars).
    </p>
    <p>
      <strong>Physical Device Testing:</strong> Use the Figma mobile app (Figma Mirror) to test the prototype on a real smartphone held in your physical hand. Test:
    </p>
    <ul class="list-disc pl-6 space-y-1 my-4 font-serif text-base text-ink dark:text-dark-ink">
      <li>Can your thumb comfortably reach the primary action button while holding the phone with one hand?</li>
      <li>Is the typography readable in outdoor sunlight?</li>
      <li>Are touch targets at least 44 &times; 44 points so users don't accidentally tap the wrong link?</li>
    </ul>

    <h2 id="pr-testing-prep">6. Preparing Prototypes for Usability Testing</h2>
    <p>
      When preparing a prototype for real user testing sessions:
    </p>
    <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Disable Clickable Hotspot Hinting:</strong> In Figma settings, turn off <em>"Show hotspot hinting on click."</em> If this is left on, users who click in the wrong spot see blue flashing boxes that give away the correct button, ruining your usability test!</li>
      <li><strong>Define the Starting Flow:</strong> Set a clean starting point and clear browser cache so participants start with fresh local storage state.</li>
      <li><strong>Cover the "Happy Path" & Common Errors:</strong> Build at least one error state branch (e.g., entering an invalid password) so you can test whether error recovery works intuitively.</li>
    </ol>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        FG
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Figma Learn</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the definitive prototyping curriculum and documentation published by the Figma Education & Community Team.
        </p>
        <a 
          href="https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          <span>View original documentation on Figma Help Center</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          };

export default LESSON;
