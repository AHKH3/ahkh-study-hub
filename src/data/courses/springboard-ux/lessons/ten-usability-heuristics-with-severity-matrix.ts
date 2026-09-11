import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-2-4',
            slug: 'ten-usability-heuristics-with-severity-matrix',
            title: '10 Usability Heuristics for User Interface Design & Severity Rating',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.4',
            type: 'article',
            readTime: '30 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
            originalSourceLabel: 'Jakob Nielsen (Nielsen Norman Group)',
            
            summaryQuote: 'Jakob Nielsen\'s ten heuristics provide a timeless diagnostic toolkit for auditing digital interfaces and eliminating cognitive friction.',
            outline: [
          {
                    "id": "h-intro",
                    "title": "1. What Are Usability Heuristics?",
                    "level": 2
          },
          {
                    "id": "h-1",
                    "title": "2. Heuristic 1: Visibility of System Status",
                    "level": 2
          },
          {
                    "id": "h-2",
                    "title": "3. Heuristic 2: Match Between System & Real World",
                    "level": 2
          },
          {
                    "id": "h-3",
                    "title": "4. Heuristic 3: User Control & Freedom",
                    "level": 2
          },
          {
                    "id": "h-4",
                    "title": "5. Heuristic 4: Consistency & Standards",
                    "level": 2
          },
          {
                    "id": "h-5",
                    "title": "6. Heuristic 5: Error Prevention",
                    "level": 2
          },
          {
                    "id": "h-6",
                    "title": "7. Heuristic 6: Recognition Rather Than Recall",
                    "level": 2
          },
          {
                    "id": "h-7",
                    "title": "8. Heuristic 7: Flexibility & Efficiency of Use",
                    "level": 2
          },
          {
                    "id": "h-8",
                    "title": "9. Heuristic 8: Aesthetic & Minimalist Design",
                    "level": 2
          },
          {
                    "id": "h-9",
                    "title": "10. Heuristic 9: Recognize, Diagnose & Recover from Errors",
                    "level": 2
          },
          {
                    "id": "h-10",
                    "title": "11. Heuristic 10: Help & Documentation",
                    "level": 2
          },
          {
                    "id": "h-evaluation",
                    "title": "12. Conducting a Heuristic Evaluation: Severity Rating Scale",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      In 1994, Dr. Jakob Nielsen evaluated hundreds of software usability tests and extracted ten foundational principles that explain why humans struggle with or succeed with digital systems. Thirty years later, despite the shift from green-screen mainframes to touchscreens and AI interfaces, <strong>Nielsen's 10 Usability Heuristics</strong> remain the definitive golden standard of interface evaluation.
    </p>

    <h2 id="h-intro">1. What Are Usability Heuristics?</h2>
    <p>
      The word <em>heuristic</em> originates from ancient Greek, meaning "to discover" or "to find." In software design, a heuristic is a broad rule of thumb—a reliable psychological shortcut that guides interface design without dictating rigid code specifications.
    </p>
    <p>
      Unlike full usability lab testing (which requires recruiting participants and takes weeks), a <strong>Heuristic Evaluation</strong> allows experienced designers to audit an interface in hours, catching 60% to 75% of severe usability flaws before users ever lay eyes on the product.
    </p>

    <!-- Heuristic 1 -->
    <h2 id="h-1">2. Heuristic 1: Visibility of System Status</h2>
    <p>
      <em>The design should always keep users informed about what is going on, through appropriate feedback within a reasonable time.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Concrete Implementation</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        When an application is performing a background process (like uploading a 200MB video), never present a frozen screen. Provide a determinable progress bar with estimated time remaining (<em>"45 seconds left..."</em>). When users tap a submit button, immediately transition the button into a spinner state so they know their click registered and do not double-click, charging their credit card twice.
      </p>
    </div>

    <!-- Heuristic 2 -->
    <h2 id="h-2">3. Heuristic 2: Match Between System & Real World</h2>
    <p>
      <em>The design should speak the users' language, using words, phrases, and concepts familiar to the user, rather than internal system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Concrete Implementation</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        A desktop trash can icon maps to the physical wastebasket beside an office desk. An e-commerce site uses a "Shopping Cart" rather than an "Entity Array Buffer." Avoid exposing internal server database jargon (like <em>"Error: NullPointerException at record 0x4F"</em>); speak in natural human consequences (<em>"We could not save your address because the postal code was missing a digit."</em>).
      </p>
    </div>

    <!-- Heuristic 3 -->
    <h2 id="h-3">4. Heuristic 3: User Control & Freedom</h2>
    <p>
      <em>Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process. Support undo and redo.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Concrete Implementation</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        When users accidentally delete an email in Gmail, they do not face a blocking, anxiety-inducing confirmation modal. Instead, the action happens instantly, paired with an unobtrusive "Undo" toast floating at the bottom. Knowing they can reverse any mistake gives users the psychological safety to explore software confidently.
      </p>
    </div>

    <!-- Heuristic 4 -->
    <h2 id="h-4">5. Heuristic 4: Consistency & Standards</h2>
    <p>
      <em>Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Jakob's Law of the Web</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        Jakob's Law states: <em>"Users spend most of their time on other sites."</em> That means users expect your site to work just like all the other sites they already know. If you invent an unconventional navigation model where clicking the logo does not return home, or where the shopping cart lives at the bottom left instead of the top right, users become confused and frustrated.
      </p>
    </div>

    <!-- Heuristic 5 -->
    <h2 id="h-5">6. Heuristic 5: Error Prevention</h2>
    <p>
      <em>Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Slips vs. Mistakes</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        A <strong>slip</strong> occurs through inattention (e.g., mistyping an email address). Prevent slips with sensible constraints, such as auto-suggesting "@gmail.com" or disabling date-picker selection for dates in the past. A <strong>mistake</strong> occurs when users have the wrong mental model. Prevent mistakes by clarifying destructive actions before execution.
      </p>
    </div>

    <!-- Heuristic 6 -->
    <h2 id="h-6">7. Heuristic 6: Recognition Rather Than Recall</h2>
    <p>
      <em>Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Cognitive Principle</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        Human short-term memory can only hold 4 to 7 items at once. Never force users to write down an order number from Screen A to type it into Screen B. Instead of making users remember an item's exact SKU number to search for it, provide an autocomplete menu with visual thumbnails as they type.
      </p>
    </div>

    <!-- Heuristic 7 -->
    <h2 id="h-7">8. Heuristic 7: Flexibility & Efficiency of Use</h2>
    <p>
      <em>Shortcuts &mdash; hidden from novice users &mdash; may speed up the interaction for the expert user such that the design can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Dual-Paced Interfaces</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        A novice user clicks <em>File &rarr; Save</em> with their mouse; an expert presses <em>Ctrl + S</em>. Excellent software serves beginners with clear visible buttons while delighting power users with keyboard accelerators, command palettes (<em>Cmd + K</em>), and customizable workspace macros.
      </p>
    </div>

    <!-- Heuristic 8 -->
    <h2 id="h-8">9. Heuristic 8: Aesthetic & Minimalist Design</h2>
    <p>
      <em>Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information and diminishes their relative visibility.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Signal-to-Noise Ratio</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        Minimalism is not about sterile white screens; it is about maximizing the signal-to-noise ratio. Practice <strong>progressive disclosure</strong>: show only the essential primary controls needed for the immediate task, tucking secondary configurations into advanced disclosure drawers.
      </p>
    </div>

    <!-- Heuristic 9 -->
    <h2 id="h-9">10. Heuristic 9: Recognize, Diagnose & Recover from Errors</h2>
    <p>
      <em>Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.</em>
    </p>
    <div class="my-6 p-5 rounded-xs bg-paper-50 dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs space-y-2 font-serif text-sm">
      <strong class="font-sans text-xs uppercase font-bold text-teal-700 dark:text-teal-400 block mb-1">Anatomy of a Great Error State</strong>
      <p class="text-ink dark:text-dark-ink leading-relaxed">
        Bad error message: <em>"System Error 403: Invalid Request."</em><br>
        Exceptional error message: <em>"Your password needs at least 8 characters and one number. Try adding a digit to the end."</em> Always tell the user what went wrong, why it happened, and the exact physical step they should take right now to fix it.
      </p>
    </div>

    <!-- Heuristic 10 -->
    <h2 id="h-10">11. Heuristic 10: Help & Documentation</h2>
    <p>
      <em>Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.</em>
    </p>

    <!-- Severity Rating Matrix -->
    <h2 id="h-evaluation">12. Conducting a Heuristic Evaluation: Severity Rating Scale</h2>
    <p>
      When auditing an interface, evaluate each violation using Nielsen's formal 0-to-4 severity rating scale:
    </p>
    <div class="my-10 overflow-x-auto not-prose">
      <table class="w-full text-left font-serif text-sm border-collapse border-t border-b border-ink-border dark:border-dark-border">
        <thead>
          <tr class="border-b border-ink-border dark:border-dark-border bg-paper-100 dark:bg-dark-card">
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Level</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Severity Classification</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Engineering Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60">
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">0</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Not a usability problem at all.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">No action required.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">1</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Cosmetic problem only.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">Fix only if extra design sprint capacity exists.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">2</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Minor usability problem.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">Low priority fix; causes slight user friction.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">3</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Major usability problem.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">High priority fix; frequently blocks users from task completion.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">4</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-bold">Usability catastrophe!</td>
            <td class="py-3 px-4 text-rose-700 dark:text-rose-400 font-bold">Emergency stop-ship; must be resolved before release.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        JN
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Dr. Jakob Nielsen</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the definitive foundational usability text <em>"10 Usability Heuristics for User Interface Design"</em> by Dr. Jakob Nielsen at Nielsen Norman Group.
        </p>
        <a 
          href="https://www.nngroup.com/articles/ten-usability-heuristics/" 
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
