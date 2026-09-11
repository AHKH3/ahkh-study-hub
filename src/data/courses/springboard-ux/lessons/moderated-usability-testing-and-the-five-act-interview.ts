import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-7-1',
            slug: 'moderated-usability-testing-and-the-five-act-interview',
            title: 'Usability Testing 101: The Google Ventures Five-Act Interview Protocol',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.1',
            type: 'video',
            readTime: '25 min study',
            originalSourceUrl: 'https://www.youtube.com/watch?v=U9ZG19XTbd4',
            originalSourceLabel: 'Michael Margolis & Jake Knapp (Google Ventures Design Sprint)',
            youtubeId: 'U9ZG19XTbd4',
            summaryQuote: 'Watching just five real customers interact with your prototype uncovers 85% of all usability problems before writing production code.',
            outline: [
          {
                    "id": "ut-act1",
                    "title": "Act 1: Friendly Welcome & Psychological Safety",
                    "level": 2
          },
          {
                    "id": "ut-act2",
                    "title": "Act 2: Context Questions & Background Warm-up",
                    "level": 2
          },
          {
                    "id": "ut-act3",
                    "title": "Act 3: Introducing the Prototype",
                    "level": 2
          },
          {
                    "id": "ut-act4",
                    "title": "Act 4: Tasks, Scenarios & Non-Directive Nudging",
                    "level": 2
          },
          {
                    "id": "ut-act5",
                    "title": "Act 5: Quick Debrief & The Magic Wand Question",
                    "level": 2
          }
],
            videoTimestamps: [
          {
                    "time": 0,
                    "label": "00:00 - Act 1: Welcome",
                    "text": "Welcome participant, establish psychological safety, explain think-aloud protocol."
          },
          {
                    "time": 75,
                    "label": "01:15 - Act 2: Context",
                    "text": "Ask background context questions about daily routines, tools, and workflows."
          },
          {
                    "time": 210,
                    "label": "03:30 - Act 3: Prototype",
                    "text": "Introduce prototype, calibrate fidelity expectations, ask for first impressions."
          },
          {
                    "time": 315,
                    "label": "05:15 - Act 4: Tasks",
                    "text": "Guide user through authentic scenarios; use non-directive nudging and boomerang technique."
          },
          {
                    "time": 525,
                    "label": "08:45 - Act 5: Debrief",
                    "text": "Wrap up with high-level debrief, magic wand question, and sprint team synthesis."
          }
],
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Usability testing is not a focus group, nor is it market research. It is an empirical observation of a human being interacting with your prototype to accomplish authentic tasks. In the Google Ventures Design Sprint methodology, Friday is dedicated entirely to testing your prototype with five real customers. Michael Margolis, Research Partner at Google Ventures, developed the <strong>Five-Act Interview</strong> to turn high-stakes testing into a repeatable, comfortable conversation that reveals critical flaws before building expensive software.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Watching real people struggle with your prototype is emotionally painful, but it is a hundred times cheaper than launching a product that nobody can figure out how to use."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Michael Margolis, Google Ventures Research Partner
    </cite>
  </div>

  <div class="editorial-callout my-6 p-4 bg-paper-100 border border-ink-border flex items-center justify-between dark:bg-dark-surface dark:border-dark-border">
    <div class="text-sm font-mono text-ink dark:text-dark-ink">
      <span class="font-bold">Interactive Video Transcript:</span> Click any timestamp to jump the video directly to that act.
    </div>
    <span class="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-dark-muted">Google Ventures / Sprint</span>
  </div>

  <!-- ACT 1 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-150 dark:bg-dark-card dark:border-dark-border" data-timestamp="0">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink dark:text-dark-ink">Act 1: The Friendly Welcome & Psychological Safety</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface" data-seek-time="0">
        00:00 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3 dark:text-dark-ink">
      Participants enter the session nervous. They assume they are taking a test and fear looking incompetent. Your first task is to dismantle their anxiety completely:
    </p>
    <div class="p-4 bg-paper-50 border-l-2 border-ink text-sm space-y-2 dark:bg-dark-card dark:border-dark-border">
      <p class="font-bold text-ink dark:text-dark-ink">Verbatim Protocol Script:</p>
      <p class="italic text-ink dark:text-dark-ink">
        "Thank you so much for joining us today! Before we get started, let me explain how this works. We are testing a new product concept, and we want to see how it works for real people like you. <strong>I want to emphasize: we are testing the product, not you.</strong> You cannot do or say anything wrong here. In fact, if you get confused, that is the most helpful thing you can show us, because it tells us where the product is broken."
      </p>
      <p class="italic text-ink dark:text-dark-ink">
        "Also, I didn't design this myself, so you won't hurt my feelings. Please be brutally honest. As we go through, please <strong>think aloud</strong>—tell me what you are looking at, what you expect to happen, and what puzzles you."
      </p>
    </div>
  </div>

  <!-- ACT 2 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-150 dark:bg-dark-card dark:border-dark-border" data-timestamp="75">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink dark:text-dark-ink">Act 2: Context Questions & Background Warm-up</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface" data-seek-time="75">
        01:15 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3 dark:text-dark-ink">
      Spend 5 to 7 minutes asking about the participant's daily routine, habits, and existing tools before showing any screens. This contextualizes their later reactions:
    </p>
    <ul class="list-disc pl-6 space-y-2 text-ink text-sm dark:text-dark-ink">
      <li><strong>Current Workflows:</strong> "How do you currently handle [problem area] today? What tools or apps do you rely on?"</li>
      <li><strong>Pain Points:</strong> "What is the most frustrating part of that process? When was the last time that happened?"</li>
      <li><strong>Vocabulary Calibration:</strong> Note the exact words they use to describe their domain. Notice if your product uses corporate jargon that clashes with their natural terminology.</li>
    </ul>
  </div>

  <!-- ACT 3 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-150 dark:bg-dark-card dark:border-dark-border" data-timestamp="210">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink dark:text-dark-ink">Act 3: Introducing the Prototype</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface" data-seek-time="210">
        03:30 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3 dark:text-dark-ink">
      Bring out the device or load the Figma prototype without explaining what it does. Set expectations about prototype fidelity:
    </p>
    <div class="p-4 bg-paper-50 border-l-2 border-ink text-sm dark:bg-dark-card dark:border-dark-border">
      <p class="italic text-ink dark:text-dark-ink">
        "This is an early prototype. Some buttons might not click, and some data is just placeholder text. If something doesn't respond, just let me know what you would have expected to happen. Take a look at this initial screen—without clicking anything yet, what do you make of this? What do you think this is for?"
      </p>
    </div>
  </div>

  <!-- ACT 4 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-150 dark:bg-dark-card dark:border-dark-border" data-timestamp="315">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink dark:text-dark-ink">Act 4: Tasks, Scenarios & The Art of Non-Directive Nudging</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface" data-seek-time="315">
        05:15 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3 dark:text-dark-ink">
      Give the participant an authentic goal, not a button-by-button instruction checklist:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs font-mono">
      <div data-allow-fill class="p-4 bg-rose-50/40 border border-rose-200 text-ink dark:text-dark-ink">
        <span class="font-bold text-rose-700 block mb-1">BAD: Leading Instruction</span>
        "Please click the blue 'Export' button in the top right and save this file as a CSV."
        <p class="mt-2 text-ink-muted font-sans dark:text-dark-muted">This tests reading comprehension, not interface usability.</p>
      </div>
      <div data-allow-fill class="p-4 bg-emerald-50/40 border border-emerald-200 text-ink dark:text-dark-ink">
        <span class="font-bold text-emerald-700 block mb-1 dark:text-emerald-400">GOOD: Scenario-Based Goal</span>
        "Imagine you need to share last month's financial numbers with your accountant. How would you accomplish that here?"
        <p class="mt-2 text-ink-muted font-sans dark:text-dark-muted">Allows the user to search, interpret labels, and reveal their natural mental model.</p>
      </div>
    </div>
    <div class="editorial-callout my-4 p-4 bg-paper-50 border border-ink-border text-sm dark:bg-dark-card dark:border-dark-border">
      <h4 class="font-mono text-xs uppercase font-bold text-ink mb-1 dark:text-dark-ink">The Boomerang Technique</h4>
      <p class="text-ink dark:text-dark-ink">
        When the participant gets stuck and asks: <em>"What does this button do?"</em> or <em>"Did I do this right?"</em>, <strong>never answer directly</strong>. Throw the question back with a warm smile:
      </p>
      <p class="italic text-ink mt-2 dark:text-dark-ink">
        "What do you think it does?" / "What would you expect to happen if you tapped that?"
      </p>
    </div>
  </div>

  <!-- ACT 5 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-150 dark:bg-dark-card dark:border-dark-border" data-timestamp="525">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink dark:text-dark-ink">Act 5: Quick Debrief & The Magic Wand Question</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface" data-seek-time="525">
        08:45 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3 dark:text-dark-ink">
      Wrap up the session with reflective, summarizing questions that reveal overarching mental impressions:
    </p>
    <ul class="list-disc pl-6 space-y-2 text-ink text-sm dark:text-dark-ink">
      <li>"How would you describe this tool to a colleague in your own words?"</li>
      <li>"What was the most intuitive part? What felt clumsy or unnatural?"</li>
      <li><strong>The Magic Wand:</strong> "If you had a magic wand and could change one single thing about how this worked, what would it be?"</li>
    </ul>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">Why Exactly Five Users? (The Nielsen-Landauer Mathematical Proof)</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Designers frequently ask: <em>"Isn't 5 users too small of a sample size to make major product decisions?"</em> Jakob Nielsen and Thomas Landauer proved mathematically that the number of usability problems found in an interface follows the Poisson distribution formula:
  </p>
  <div class="editorial-axiom my-6 p-4 bg-paper-100 font-mono text-center text-sm border border-ink-border dark:bg-dark-surface dark:border-dark-border">
    U(n) = N * (1 - (1 - L)^n)
  </div>
  <p class="text-ink text-sm leading-relaxed dark:text-dark-ink">
    Where <code>N</code> is the total number of usability issues in the design, and <code>L</code> is the proportion of usability issues discovered by a single user (empirically averaged at <code>31%</code> across hundreds of studies):
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink text-sm mt-3 dark:text-dark-ink">
    <li><strong>1 User:</strong> Discovers ~31% of total usability flaws.</li>
    <li><strong>2 Users:</strong> Discovers ~53% of flaws.</li>
    <li><strong>3 Users:</strong> Discovers ~68% of flaws.</li>
    <li><strong>5 Users:</strong> Discovers <strong>~85%</strong> of all usability defects.</li>
  </ul>
  <p class="text-ink text-sm leading-relaxed mt-3 dark:text-dark-ink">
    Beyond five users, you encounter diminishing returns: the same issues are repeated, wasting research budget that would be far better spent iterating the design and running a second 5-user study.
  </p>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border dark:bg-dark-card dark:border-dark-border">
    <h3 class="text-lg font-serif font-semibold text-ink mb-3 dark:text-dark-ink">Synthesizing Notes on Friday Afternoon</h3>
    <p class="text-ink text-sm leading-relaxed mb-3 dark:text-dark-ink">
      While the interviewer conducts sessions in the testing room, the rest of the sprint team watches the live feed in an observation room. Team members write raw observations on sticky notes using color coding:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
      <div data-allow-fill class="p-3 bg-emerald-50 border border-emerald-200">
        <span class="font-bold block text-emerald-700">Green Sticky Notes</span>
        User completed task smoothly; positive feedback; validated assumption.
      </div>
      <div data-allow-fill class="p-3 bg-rose-50 border border-rose-200">
        <span class="font-bold block text-rose-700">Red Sticky Notes</span>
        User failed task; confusion; incorrect interpretation of UI pattern.
      </div>
      <div data-allow-fill class="p-3 bg-amber-50 border border-amber-200">
        <span class="font-bold block text-amber-700">Yellow Sticky Notes</span>
        Neutral observation; interesting quote; unexpected workflow habit.
      </div>
    </div>
  </div>
</section>

            `,
          };

export default LESSON;
