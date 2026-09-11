import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-3-1',
            slug: 'information-architecture-and-card-sorting',
            title: 'Information Architecture: Mental Models, Taxonomies & Card Sorting',
            module: 'Unit 3: Information Architecture & User Flows',
            unitNumber: 3,
            lessonNumber: '3.1',
            type: 'article',
            readTime: '28 min study',
            originalSourceUrl: 'https://www.nngroup.com/articles/ia-study-guide/',
            originalSourceLabel: 'Page Laubheimer (Information Architecture Specialist, NN/g)',
            
            summaryQuote: 'Information Architecture creates order out of chaos, structuring mental models so users intuitively find what they need without cognitive strain.',
            outline: [
          {
                    "id": "ia-def",
                    "title": "1. What is Information Architecture (IA)?",
                    "level": 2
          },
          {
                    "id": "ia-four-systems",
                    "title": "2. Rosenfeld & Morville's 4 IA Systems",
                    "level": 2
          },
          {
                    "id": "ia-programmatic-sitemap",
                    "title": "3. Programmatic Model: Multi-Tier Sitemap Architecture",
                    "level": 2
          },
          {
                    "id": "ia-card-sorting",
                    "title": "4. Research Methods: Open, Closed & Hybrid Card Sorting",
                    "level": 2
          },
          {
                    "id": "ia-tree-testing",
                    "title": "5. Quantitative Validation: Tree Testing Menus",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light dark:text-dark-ink">
    Information Architecture (IA) is the structural foundation of digital design. If the content of a website or mobile app is not organized according to the user's natural mental model, even the most beautiful visual UI will fail. In this masterclass from Nielsen Norman Group, Page Laubheimer breaks down how to structure complex taxonomies, design navigation pathways, and validate architectures before drawing screens.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-2 border-ink dark:bg-dark-card dark:border-dark-border">
    <p class="text-lg italic font-serif text-ink dark:text-dark-ink">
      "Information Architecture is about helping people understand their surroundings and find what they're looking for, in the real world as well as online."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted dark:text-dark-muted">
      — Louis Rosenfeld & Peter Morville
    </cite>
  </div>

  <h2 id="ia-def" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">1. What is Information Architecture (IA)?</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Information Architecture is the practice of deciding how the parts of something should be arranged to be understandable. In software products, IA focuses on organizing content so that users can adjust to the interface quickly and easily find everything they need with minimal cognitive friction.
  </p>

  <h2 id="ia-four-systems" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">2. Rosenfeld & Morville's 4 IA Systems</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    In their seminal text <em>Information Architecture for the World Wide Web</em>, Lou Rosenfeld and Peter Morville established the four foundational systems of any digital ecosystem:
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">System 01</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Organization Systems</h4>
      <p class="text-xs text-ink-muted leading-relaxed dark:text-dark-muted">How content is categorized and grouped: chronological, alphabetical, geographical, topic-based, or task-oriented.</p>
    </div>
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">System 02</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Labeling Systems</h4>
      <p class="text-xs text-ink-muted leading-relaxed dark:text-dark-muted">The terminology and language used to represent data chunks (e.g. "Contact Us" vs "Get Help", "Settings" vs "Preferences").</p>
    </div>
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">System 03</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Navigation Systems</h4>
      <p class="text-xs text-ink-muted leading-relaxed dark:text-dark-muted">How users physically move through content: global top headers, local sidebars, breadcrumb rails, and contextual inline links.</p>
    </div>
    <div class="p-5 border border-ink-border bg-white rounded-xs dark:bg-dark-card dark:border-dark-border">
      <span class="font-mono text-xs uppercase font-bold text-teal-700 block mb-1 dark:text-teal-400">System 04</span>
      <h4 class="font-bold text-base text-ink mb-1 dark:text-dark-ink">Search Systems</h4>
      <p class="text-xs text-ink-muted leading-relaxed dark:text-dark-muted">How users query data directly: search syntax, autocomplete suggestions, faceted filters, and zero-state recommendations.</p>
    </div>
  </div>

  <h2 id="ia-programmatic-sitemap" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">3. Programmatic Model: Multi-Tier Sitemap Architecture</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Below is a programmatic architectural tree illustrating a clean 3-tier hierarchy that balances breadth and depth:
  </p>

  <!-- PROGRAMMATIC SITEMAP TREE COMPONENT -->
  <div class="my-8 p-6 bg-paper-100 border border-ink-border rounded-xs not-prose font-mono text-xs dark:bg-dark-surface dark:border-dark-border">
    <div class="text-[10px] uppercase font-bold tracking-widest text-ink mb-4 dark:text-dark-ink">Programmatic Artifact: Hierarchical Taxonomy Tree</div>
    
    <!-- Level 0 Root -->
    <div class="p-3 bg-ink text-white rounded-xs font-bold text-center mb-4">
      [0.0] PRODUCT_ROOT_DOMAIN
    </div>

    <!-- Level 1 Columns -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Tier 1 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-2 dark:bg-dark-card dark:border-dark-border">
        <div class="font-bold text-teal-700 border-b border-ink-border pb-1 dark:border-dark-border dark:text-teal-400">[1.0] EXPLORE / DISCOVER</div>
        <div class="pl-2 space-y-1 text-[11px] text-ink-muted dark:text-dark-muted">
          <div>&bull; 1.1 Category Directory</div>
          <div>&bull; 1.2 Featured Collections</div>
          <div>&bull; 1.3 Search & Faceted Filter</div>
        </div>
      </div>

      <!-- Tier 2 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-2 dark:bg-dark-card dark:border-dark-border">
        <div class="font-bold text-teal-700 border-b border-ink-border pb-1 dark:border-dark-border dark:text-teal-400">[2.0] WORKSPACE / STUDIO</div>
        <div class="pl-2 space-y-1 text-[11px] text-ink-muted dark:text-dark-muted">
          <div>&bull; 2.1 Active Projects</div>
          <div>&bull; 2.2 Shared Assets Library</div>
          <div>&bull; 2.3 Revision History Log</div>
        </div>
      </div>

      <!-- Tier 3 -->
      <div class="p-3 bg-white border border-ink-border rounded-xs space-y-2 dark:bg-dark-card dark:border-dark-border">
        <div class="font-bold text-teal-700 border-b border-ink-border pb-1 dark:border-dark-border dark:text-teal-400">[3.0] ACCOUNT & SYSTEM</div>
        <div class="pl-2 space-y-1 text-[11px] text-ink-muted dark:text-dark-muted">
          <div>&bull; 3.1 Organization Profile</div>
          <div>&bull; 3.2 Role-Based Permissions</div>
          <div>&bull; 3.3 Billing & Invoices</div>
        </div>
      </div>
    </div>
  </div>

  <h2 id="ia-card-sorting" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">4. Research Methods: Open, Closed & Hybrid Card Sorting</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    To discover how real users organize topics in their heads, researchers use <strong>Card Sorting</strong>:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink dark:text-dark-ink">
    <li><strong>Open Card Sort:</strong> Participants are given ~40 topic cards and asked to organize them into groups that make sense to them, then name each group. Used for generative discovery.</li>
    <li><strong>Closed Card Sort:</strong> Participants are given predefined categories and asked to place topic cards into those fixed slots. Used to evaluate an existing taxonomy.</li>
    <li><strong>Hybrid Card Sort:</strong> Participants place cards into predefined categories but are permitted to create new ones if needed.</li>
  </ul>

  <h2 id="ia-tree-testing" class="text-2xl font-serif font-semibold text-ink mt-8 mb-4 dark:text-dark-ink">5. Quantitative Validation: Tree Testing Menus</h2>
  <p class="text-ink leading-relaxed dark:text-dark-ink">
    Before investing in wireframes or visual mockups, test your hierarchy using <strong>Tree Testing</strong> (Reverse Card Sorting). Participants are given a text-only menu tree without any visual styling and asked: <em>"Where would you click to change your billing address?"</em>
  </p>
  <p class="text-ink text-sm leading-relaxed dark:text-dark-ink">
    Tree testing reveals the exact task success rate, directness rate, and the specific branch nodes where users backtrack or choose the wrong category.
  </p>

  <div class="mt-16 pt-8 border-t border-ink-border/80 not-prose flex items-start justify-between text-xs font-sans text-ink-muted dark:text-dark-muted dark:border-dark-border">
    <div>
      <span class="font-mono uppercase font-bold text-teal-700 block mb-0.5 dark:text-teal-400">Source Citation</span>
      <span>Adapted for sovereign study from <em>Information Architecture Study Guide</em> by <strong>Page Laubheimer</strong> (Nielsen Norman Group).</span>
    </div>
    <a href="https://www.nngroup.com/articles/ia-study-guide/" target="_blank" rel="noopener noreferrer" class="font-mono text-xs border border-ink-border px-3 py-1.5 rounded-xs bg-paper-50 hover:bg-paper-100 text-ink dark:bg-dark-card dark:text-dark-ink dark:border-dark-border dark:hover:bg-dark-surface">
      Original Guide ↗
    </a>
  </div>
</section>

            `,
          };

export default LESSON;
