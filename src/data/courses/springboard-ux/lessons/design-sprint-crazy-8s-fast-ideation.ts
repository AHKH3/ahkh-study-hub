import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-4-2',
            slug: 'design-sprint-crazy-8s-fast-ideation',
            title: 'Design Sprint Crazy 8s: Generating Divergent Layouts in 8 Minutes',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.2',
            type: 'video',
            readTime: '20 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=yz4g87XapQ0',
            originalSourceLabel: 'AJ&Smart (Official Google Ventures Sprint Partner)',
            youtubeId: 'yz4g87XapQ0',
            summaryQuote: 'Crazy 8s is a core Design Sprint method that forces your brain past obvious first solutions by generating eight distinct variations under strict time pressure.',
            outline: [
          {
                    "id": "c8-intro",
                    "title": "1. What is Crazy 8s & Why Time Pressure Unlocks Creativity",
                    "level": 2
          },
          {
                    "id": "c8-setup",
                    "title": "2. Preparation: The Folded Paper Technique",
                    "level": 2
          },
          {
                    "id": "c8-programmatic-sheet",
                    "title": "3. Programmatic Model: The 8-Box Sprint Matrix",
                    "level": 2
          },
          {
                    "id": "c8-facilitation",
                    "title": "4. Facilitation Protocol: The 60-Second Interval Whistle",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Introduction to Crazy 8s",
                    "text": "AJ&Smart walk through how Crazy 8s forces rapid divergent layout exploration."
          },
          {
                    "time": 60,
                    "label": "01:00 - Folding the Paper",
                    "text": "Fold an A4 sheet into 8 equal rectangular viewports."
          },
          {
                    "time": 180,
                    "label": "03:00 - 60 Seconds per Box",
                    "text": "Sketching under the timer without erasing or self-critique."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Most designers sketch one idea, fall in love with it, and spend four hours polishing it in Figma before realizing the concept is fundamentally flawed. In the Google Ventures Design Sprint, <strong>Crazy 8s</strong> prevents premature attachment by forcing you to generate eight distinct layout concepts in eight frantic minutes.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Your first idea is rarely your best idea; it is just the most obvious one. Crazy 8s exhausts your predictable habits and forces your brain to innovate."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Jonathan Courtney, AJ&Smart
    </cite>
  </div>

  <h2 id="c8-intro" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. What is Crazy 8s & Why Time Pressure Unlocks Creativity</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Crazy 8s is a fast-paced sketching exercise that challenges team members to sketch eight distinct ideas in eight minutes. The goal is not to create a masterpiece; the goal is to explore a wide breadth of layouts, navigation structures, and interaction mechanics.
  </p>

  <h2 id="c8-setup" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Preparation: The Folded Paper Technique</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Take a plain blank sheet of letter or A4 paper. Fold it in half three times. When you unfold it, you have a grid of eight equal rectangular boxes. Each box represents a mobile screen viewport.
  </p>

  <h2 id="c8-programmatic-sheet" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Programmatic Model: The 8-Box Sprint Matrix</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Here is an interactive programmatic representation of a completed Crazy 8s sheet:
  </p>

  <!-- PROGRAMMATIC CRAZY 8S SHEET -->
  <div class="my-8 p-6 bg-paper-100 border border-ink-border rounded-xs not-prose font-mono text-xs dark:bg-dark-surface dark:border-dark-border">
    <div class="text-[10px] uppercase font-bold tracking-widest text-ink mb-4 dark:text-dark-ink">Programmatic Artifact: Folded 8-Screen Ideation Sheet</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <!-- Box 1 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 01 Tab List</span>
        <div class="h-2 bg-paper-200 w-3/4 mx-auto dark:bg-dark-border"></div>
        <div class="h-10 bg-paper-50 border border-dashed border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-card dark:text-dark-muted dark:border-dark-border">Vertical List</div>
        <div class="h-2 bg-paper-200 w-1/2 mx-auto dark:bg-dark-border"></div>
      </div>
      <!-- Box 2 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 02 Swipe Cards</span>
        <div class="h-2 bg-paper-200 w-3/4 mx-auto dark:bg-dark-border"></div>
        <div class="h-10 bg-paper-50 border border-dashed border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-card dark:text-dark-muted dark:border-dark-border">Tinder Card Deck</div>
        <div class="h-2 bg-paper-200 w-1/2 mx-auto dark:bg-dark-border"></div>
      </div>
      <!-- Box 3 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 03 Search First</span>
        <div class="h-4 bg-paper-100 border border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-surface dark:text-dark-muted dark:border-dark-border">Search Modal</div>
        <div class="h-8 bg-paper-50 border border-dashed border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-card dark:text-dark-muted dark:border-dark-border">Instant Results</div>
      </div>
      <!-- Box 4 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 04 Bottom Sheet</span>
        <div class="h-6 bg-paper-200 w-full dark:bg-dark-border"></div>
        <div class="h-6 bg-ink text-white flex items-center justify-center text-[10px] font-bold">Drawer Sheet</div>
      </div>
      <!-- Box 5 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 05 Conversational</span>
        <div class="h-12 bg-paper-50 border border-dashed border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-card dark:text-dark-muted dark:border-dark-border">Chat Dialogue UI</div>
      </div>
      <!-- Box 6 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 06 Stepper Wizard</span>
        <div class="flex justify-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-ink"></span><span class="w-1.5 h-1.5 rounded-full bg-paper-200 dark:bg-dark-border"></span><span class="w-1.5 h-1.5 rounded-full bg-paper-200 dark:bg-dark-border"></span></div>
        <div class="h-8 bg-paper-50 border border-ink-border flex items-center justify-center text-[10px] text-ink-muted dark:bg-dark-card dark:text-dark-muted dark:border-dark-border">Step 1 of 3</div>
      </div>
      <!-- Box 7 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-1.5 text-center dark:bg-dark-card dark:border-dark-border">
        <span class="text-[10px] font-bold text-ink-muted dark:text-dark-muted">Box 07 Data Dashboard</span>
        <div class="grid grid-cols-2 gap-1 h-10">
          <div class="bg-paper-100 border border-ink-border dark:bg-dark-surface dark:border-dark-border"></div>
          <div class="bg-paper-100 border border-ink-border dark:bg-dark-surface dark:border-dark-border"></div>
        </div>
      </div>
      <!-- Box 8 -->
      <div class="p-3 bg-white border-2 border-teal-600 rounded-xs space-y-1.5 text-center dark:bg-dark-card">
        <span class="text-[10px] font-bold text-teal-700 dark:text-teal-400">Box 08 Winner *</span>
        <div data-allow-fill class="h-10 bg-teal-50 border border-teal-300 flex items-center justify-center text-[10px] text-teal-700 font-bold">Hybrid Grid + Tab</div>
      </div>
    </div>
  </div>

  <h2 id="c8-facilitation" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Facilitation Protocol: The 60-Second Interval Whistle</h2>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li>The facilitator sets a timer for 60 seconds.</li>
    <li>Everyone sketches their first idea in Box 1.</li>
    <li>At 60 seconds, the facilitator calls: <em>"Switch to Box 2!"</em> No finishing touches; move to the next box immediately.</li>
    <li>Repeat until all eight boxes are filled.</li>
  </ul>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Design Sprint Crazy 8s</em> by <strong>AJ&Smart</strong>.</span>
    </div>
    <a href="https://www.youtube.com/watch?v=yz4g87XapQ0" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">Original Video ↗</a>
  </div>
</section>

            `,
          };

export default LESSON;
