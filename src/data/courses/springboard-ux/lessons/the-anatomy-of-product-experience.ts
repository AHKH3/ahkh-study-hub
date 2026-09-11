import { path } from '../../../../utils/paths';
import type { LessonDetail } from '../../../types';

export const LESSON: LessonDetail = {
            id: 'sb-1-0',
            slug: 'the-anatomy-of-product-experience',
            title: 'Introduction to UX Design: Core Principles, Process & Career Paths',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.0',
            type: 'pdf',
            readTime: '18 min',
            originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658744',
            originalSourceLabel: 'Laurel Hechanova (Goodmaker / Springboard Foundations)',
            
            summaryQuote: 'User experience is what someone feels, what they do, and what they understand when using a product. Good design begins with understanding real human needs.',
            outline: [
          {
                    "id": "sec-what-is-ux",
                    "title": "1. What UX Design Really Means",
                    "level": 2
          },
          {
                    "id": "sec-triad",
                    "title": "2. The Three Levels: Product, Service, and System",
                    "level": 2
          },
          {
                    "id": "sec-research",
                    "title": "3. Phase 1: User Research (Asking the Right Questions)",
                    "level": 2
          },
          {
                    "id": "sec-ia",
                    "title": "4. Phase 2: Information Architecture (Organizing the App)",
                    "level": 2
          },
          {
                    "id": "sec-case-study",
                    "title": "5. Case Study: Instagram Navigation Breakdown",
                    "level": 2
          },
          {
                    "id": "sec-ixd",
                    "title": "6. Phase 3: Interaction Design (Sketches & Wireframes)",
                    "level": 2
          },
          {
                    "id": "sec-testing",
                    "title": "7. Phase 4: Usability Testing (Catching Mistakes Early)",
                    "level": 2
          },
          {
                    "id": "sec-visual",
                    "title": "8. Phase 5: Visual & UI Design (Design Systems & Voice UI)",
                    "level": 2
          },
          {
                    "id": "sec-careers",
                    "title": "9. Career Paths: Generalist, Specialist, T-Shaped, or M-Shaped?",
                    "level": 2
          },
          {
                    "id": "sec-outlook",
                    "title": "10. The Future: Designing in the Age of AI",
                    "level": 2
          }
],
            
            contentHtml: `

<p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Even if you have never studied design before, you experience user experience dozens of times every single day. Every time you find a search bar without squinting, buy a train ticket on your phone in three taps, or rent a room without getting lost, you are benefiting from the work of a UX designer.
              </p>

              <h2 id="sec-what-is-ux">1. What UX Design Really Means</h2>
              <p>
                Across technology, healthcare, finance, and commerce, modern companies are investing heavily in User Experience Design (UXD). Whether they build in-house design teams or hire outside experts, these companies understand one simple truth: <strong>you cannot build a successful product if you ignore the real needs, habits, and frustrations of the people using it.</strong>
              </p>
              <p>
                At its heart, <strong>user experience is simply what someone feels, what they do, and what they understand when they interact with a tool or digital product.</strong> Because digital tools now touch almost every part of our daily lives, UX design has grown into one of the most exciting and rewarding paths in technology, offering career growth all the way to executive leadership.
              </p>

              <!-- Pullout Axiom with Calibrated Terracotta Accent -->
              <blockquote class="my-10 pl-6 border-l-2 border-ink dark:border-dark-ink font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed py-2 pr-4">
                <p>"Good design does not begin with graphics or code. It begins with curiosity about how real people live, where they struggle, and how a thoughtful tool can make their day easier."</p>
                <footer class="mt-3 flex items-center gap-2 text-xs font-sans not-italic text-ink-muted dark:text-dark-muted font-semibold tracking-widest uppercase">
                  <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>Core Design Axiom</span>
                </footer>
              </blockquote>

              <h2 id="sec-triad">2. The Three Levels: Product, Service, and System</h2>
              <p>
                When most people hear the word "experience," they usually picture an app on a smartphone screen. But user experience actually operates at three connected levels:
              </p>

              <!-- The Three Levels - Architectural Continuum -->
              <div class="my-8 border border-ink-border rounded-xs bg-paper-50 dark:bg-dark-card overflow-hidden not-prose dark:border-dark-border">
                <div class="px-6 py-4 border-b border-ink-border bg-white dark:bg-dark-bg flex items-center justify-between dark:border-dark-border">
                  <span class="text-xs font-mono font-bold uppercase tracking-widest text-ink-muted dark:text-dark-muted">Architectural Continuum &mdash; The Three Levels of Experience</span>
                  <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Micro to Macro Scope</span>
                </div>
                <div class="divide-y divide-ink-border dark:divide-dark-border">
                  <!-- Level 3: System (The Foundation) -->
                  <div class="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-paper-100/50 dark:bg-dark-card/50">
                    <div class="md:col-span-3">
                      <span class="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">Level 3 &bull; Macro</span>
                      <h4 class="font-sans font-semibold text-lg text-ink dark:text-dark-ink mt-0.5">The System</h4>
                    </div>
                    <div class="md:col-span-5 text-sm text-ink dark:text-dark-ink leading-relaxed">
                      The underlying engine, network, and data policies connecting multiple tools, institutions, and infrastructure together into a cohesive ecosystem.
                    </div>
                    <div class="md:col-span-4 text-xs font-mono text-ink-muted dark:text-dark-muted bg-white dark:bg-dark-bg p-3 border border-ink-border rounded-xs dark:border-dark-border">
                      <strong class="text-ink dark:text-dark-ink block mb-1">Ecosystem Manifestation:</strong>
                      Global payment networks (Visa/Stripe), municipal transit APIs, interconnected health records.
                    </div>
                  </div>

                  <!-- Level 2: Service (The Journey) -->
                  <div class="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-paper-50 dark:bg-dark-bg/60">
                    <div class="md:col-span-3">
                      <span class="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">Level 2 &bull; Meso</span>
                      <h4 class="font-sans font-semibold text-lg text-ink dark:text-dark-ink mt-0.5">The Service</h4>
                    </div>
                    <div class="md:col-span-5 text-sm text-ink dark:text-dark-ink leading-relaxed">
                      The complete temporal journey: accomplishing an objective across physical and digital touchpoints, people, and time.
                    </div>
                    <div class="md:col-span-4 text-xs font-mono text-ink-muted dark:text-dark-muted bg-white dark:bg-dark-bg p-3 border border-ink-border rounded-xs dark:border-dark-border">
                      <strong class="text-ink dark:text-dark-ink block mb-1">Ecosystem Manifestation:</strong>
                      Hailing, riding, and splitting a fare in Uber; booking, checking into, and reviewing a hotel stay.
                    </div>
                  </div>

                  <!-- Level 1: Product (The Interface) -->
                  <div class="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-white dark:bg-dark-surface">
                    <div class="md:col-span-3">
                      <span class="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">Level 1 &bull; Micro</span>
                      <h4 class="font-sans font-semibold text-lg text-ink dark:text-dark-ink mt-0.5">The Product</h4>
                    </div>
                    <div class="md:col-span-5 text-sm text-ink dark:text-dark-ink leading-relaxed">
                      The direct sensory object in front of the human being: the screen, hardware controls, button affordances, and immediate feedback loop.
                    </div>
                    <div class="md:col-span-4 text-xs font-mono text-ink-muted dark:text-dark-muted bg-paper-50 dark:bg-dark-card p-3 border border-ink-border rounded-xs dark:border-dark-border">
                      <strong class="text-ink dark:text-dark-ink block mb-1">Ecosystem Manifestation:</strong>
                      A smartphone screen, an ATM touch panel, an electric kettle thermostat switch.
                    </div>
                  </div>
                </div>
              </div>

              <p>
                To create great experiences across these three levels, professional product teams follow a clear five-stage design process: <strong>User Research</strong>, <strong>Information Architecture</strong>, <strong>Interaction Design</strong>, <strong>Usability Testing</strong>, and <strong>Visual & UI Design</strong>. Let us walk through each phase step-by-step.
              </p>

              <h2 id="sec-research">3. Phase 1: User Research (Asking the Right Questions)</h2>
              <p>
                Before drawing a single screen or writing code, you need to answer one fundamental question: <em>why are we building this, and what real human struggle does it solve?</em>
              </p>
              <p>
                Think of cooking dinner for an old friend. If you never ask what food they love or whether they have food allergies, you might spend four hours preparing a seafood stew, only to discover they are allergic to shrimp! In software design, assuming you already know what users want without talking to them leads to the exact same failure.
              </p>
              <p>
                User research helps you discover solutions that match how people actually think and act. Researchers talk to real people and focus on four essential questions:
              </p>

              <!-- 4 Research Questions - High Contrast Clear Reading Cards -->
              <!-- 4 Research Questions - Field Diagnostic Matrix -->
              <div class="my-8 border-y border-ink-border dark:border-dark-border not-prose overflow-x-auto">
                <table class="w-full text-left text-sm font-sans border-collapse">
                  <thead>
                    <tr class="border-b border-ink dark:border-dark-border text-xs font-mono uppercase tracking-widest text-ink dark:text-dark-ink font-bold bg-paper-100 dark:bg-dark-card">
                      <th class="py-3 px-4 w-12 text-center">#</th>
                      <th class="py-3 px-4 w-1/3">The Diagnostic Question</th>
                      <th class="py-3 px-4">What It Uncovers in User Reality</th>
                      <th class="py-3 px-4 w-1/4">Product Implication</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-ink-border dark:divide-dark-border text-ink dark:text-dark-ink">
                    <tr>
                      <td class="py-3.5 px-4 font-mono font-bold text-teal-700 dark:text-teal-400 text-center">01</td>
                      <td class="py-3.5 px-4 font-semibold">What concrete difficulties do people face?</td>
                      <td class="py-3.5 px-4 text-sm leading-relaxed">The exact friction points, delays, errors, or anxieties that disrupt their daily routine.</td>
                      <td class="py-3.5 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Identifies the core job-to-be-done.</td>
                    </tr>
                    <tr>
                      <td class="py-3.5 px-4 font-mono font-bold text-teal-700 dark:text-teal-400 text-center">02</td>
                      <td class="py-3.5 px-4 font-semibold">Who, specifically, encounters this friction?</td>
                      <td class="py-3.5 px-4 text-sm leading-relaxed">The distinct demographic, role, context, or cognitive profile. Designing for "everyone" creates bloated products that satisfy no one.</td>
                      <td class="py-3.5 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Defines target personas and boundary constraints.</td>
                    </tr>
                    <tr>
                      <td class="py-3.5 px-4 font-mono font-bold text-teal-700 dark:text-teal-400 text-center">03</td>
                      <td class="py-3.5 px-4 font-semibold">What workarounds are they using right now?</td>
                      <td class="py-3.5 px-4 text-sm leading-relaxed">People rarely wait idle; they invent improvised solutions using spreadsheets, scrap paper, sticky notes, or WhatsApp groups.</td>
                      <td class="py-3.5 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Reveals existing behavioral habits and mental models.</td>
                    </tr>
                    <tr>
                      <td class="py-3.5 px-4 font-mono font-bold text-teal-700 dark:text-teal-400 text-center">04</td>
                      <td class="py-3.5 px-4 font-semibold">Where do those workarounds break down?</td>
                      <td class="py-3.5 px-4 text-sm leading-relaxed">The exact points where improvised habits become brittle, error-prone, insecure, or costly.</td>
                      <td class="py-3.5 px-4 text-xs font-mono text-ink-muted dark:text-dark-muted">Pinpoints the commercial product opportunity.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 id="sec-ia">4. Phase 2: Information Architecture (Organizing the App)</h2>
              <p>
                Once discovery research tells you what features and content your product must have, the next challenge is organization: <em>how should this content be grouped so people find what they need without getting lost?</em> This discipline is called <strong>Information Architecture (IA)</strong>.
              </p>
              <p>
                Without clear architecture, an application turns into a confusing maze of buttons. Good IA groups related information together logically, creating intuitive pathways that match how users naturally think about their goals.
              </p>

              <!-- Case Study: Instagram Navigation Breakdown -->
              <h2 id="sec-case-study">5. Case Study: Instagram Navigation Breakdown</h2>
              <p>
                Let us look at a real-world example from the original course material: the navigation structure of the Instagram iOS app.
              </p>

              <div class="my-10 p-6 sm:p-8 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose shadow-xs">
                <div class="flex items-center justify-between pb-4 mb-6 border-b border-ink-border dark:border-dark-border">
                  <div class="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-teal-700 dark:text-teal-400 font-bold">
                    <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <span>Case Study &mdash; Structural Breakdown</span>
                  </div>
                  <span class="text-xs sm:text-sm font-mono font-semibold text-ink dark:text-dark-ink">Instagram iOS App</span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <!-- Screenshot Figure -->
                  <div class="lg:col-span-5 text-center">
                    <img loading="lazy" decoding="async" 
                      src="${path('/images/lessons/sb-1-0/page_3_img_2.webp')}" 
                      alt="Historical Instagram iOS interface screenshot demonstrating information architecture" 
                      class="max-w-xs mx-auto rounded-xs shadow-md border border-ink-border dark:border-dark-border"
                    />
                    <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                      Figure 1: The historical Instagram iOS home view, illustrating four distinct structural zones.
                    </p>
                  </div>

                  <!-- 4 Color-Coordinated Zones & Hierarchy -->
                  <div class="lg:col-span-7 space-y-4">
                    <!-- Zone 1 -->
                    <div class="p-4 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-semibold text-base text-teal-700 dark:text-teal-400">1. Header Utility Bar</h4>
                        <span class="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Top Navigation</span>
                      </div>
                      <p class="text-sm sm:text-base text-ink dark:text-dark-ink leading-relaxed">
                        Dedicated to quick actions: camera capture on the left, brand logo in the center, and private direct messages on the right.
                      </p>
                    </div>

                    <!-- Zone 2 -->
                    <div class="p-4 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-semibold text-base text-teal-700 dark:text-teal-400">2. Ephemeral Stories Carousel</h4>
                        <span class="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Horizontal Rail</span>
                      </div>
                      <p class="text-sm sm:text-base text-ink dark:text-dark-ink leading-relaxed">
                        Houses 24-hour casual media in a horizontal scroll rail, intentionally separated so it does not interrupt the permanent vertical feed below.
                      </p>
                    </div>

                    <!-- Zone 3 -->
                    <div class="p-4 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-semibold text-base text-teal-700 dark:text-teal-400">3. Primary Consumption Feed</h4>
                        <span class="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Vertical Canvas</span>
                      </div>
                      <p class="text-sm sm:text-base text-ink dark:text-dark-ink leading-relaxed">
                        The core reason users open the app: an infinite vertical stream of photos, videos, and comments from followed creators.
                      </p>
                    </div>

                    <!-- Zone 4 -->
                    <div class="p-4 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-semibold text-base text-teal-700 dark:text-teal-400">4. Bottom Navigation Bar</h4>
                        <span class="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Persistent Dock</span>
                      </div>
                      <p class="text-sm sm:text-base text-ink dark:text-dark-ink leading-relaxed">
                        The five core product destinations (Home, Search, Create, Activity, and Profile), permanently anchored within comfortable thumb reach.
                      </p>
                    </div>

                    <!-- Architectural Tree View -->
                    <div class="pt-4 border-t border-ink-border dark:border-dark-border">
                      <div class="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-ink dark:text-dark-ink font-bold mb-2.5">
                        <svg class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <span>Hierarchical Tree Representation</span>
                      </div>
                      <div class="p-3.5 rounded-xs bg-paper-100 dark:bg-dark-surface border border-ink-border dark:border-dark-border font-mono text-sm space-y-1.5 text-ink dark:text-dark-ink">
                        <div class="text-teal-700 dark:text-teal-400 font-bold">1. Header (Camera, IGTV, Direct Messages)</div>
                        <div class="text-teal-700 dark:text-teal-400 font-bold">2. Stories Carousel (Your Story, Following)</div>
                        <div class="text-teal-700 dark:text-teal-400 font-bold">3. Main Stream (Media Card, Social Actions)</div>
                        <div class="text-teal-700 dark:text-teal-400 font-bold">4. Global Tab Dock</div>
                        <div class="pl-4 font-sans text-xs sm:text-sm font-medium text-ink dark:text-dark-ink">4.1 Home &bull; 4.2 Explore &bull; 4.3 Post &bull; 4.4 Activity (Following / You) &bull; 4.5 Profile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="sec-ixd">6. Phase 3: Interaction Design (Sketches & Wireframes)</h2>
              <p>
                After deciding what content belongs on each screen, you map out how users move between them. This is called <strong>Interaction Design (IxD)</strong>.
              </p>
              <p>
                Interaction designers define what happens when someone taps, clicks, drags, or swipes. Does a detail sheet slide up from the bottom? Does an image expand smoothly? How does a button react when pressed? Every transition should feel natural, responsive, and predictable.
              </p>
              <p>
                <strong>Important Tip:</strong> Keep things fast and flexible in this phase. Do not spend hours picking colors, drop shadows, or brand logos yet. Start with <strong>rough whiteboard sketches and wireframes</strong>. If an idea does not work, you can erase a whiteboard or toss out a sketch in five seconds without wasting effort.
              </p>

              <!-- Side-by-Side Exhibits: Sketches & Wireframes -->
              <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center shadow-2xs">
                  <img loading="lazy" decoding="async" 
                    src="${path('/images/lessons/sb-1-0/whiteboard_wireframe_sketch.webp')}" 
                    alt="High-fidelity whiteboard sketch showing early web layout ideation and divergent thinking" 
                    class="w-full h-56 object-contain mx-auto rounded-xs bg-paper-50 dark:bg-dark-bg p-2 border border-ink-border dark:border-dark-border"
                  />
                  <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                    Figure 2: Rapid whiteboard sketching for exploring layout options quickly.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center shadow-2xs">
                  <img loading="lazy" decoding="async" 
                    src="${path('/images/lessons/sb-1-0/mobile_wireframe_screens.webp')}" 
                    alt="Structured mobile wireframe flow illustrating content hierarchy and touch targets" 
                    class="w-full h-56 object-contain mx-auto rounded-xs bg-paper-50 dark:bg-dark-bg p-2 border border-ink-border dark:border-dark-border"
                  />
                  <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                    Figure 3: Structured digital wireframe outlining hierarchy before applying visual styling.
                  </p>
                </div>
              </div>

              <h2 id="sec-testing">7. Phase 4: Usability Testing (Catching Mistakes Early)</h2>
              <p>
                Once wireframes are linked together into a clickable prototype, it is time to put your ideas to the test. In <strong>Usability Testing</strong>, you sit down with representative users, give them realistic tasks (such as <em>"Try finding a hotel room under $150 and reserving it"</em>), and observe where they hesitate, tap by mistake, or become confused.
              </p>
              <p>
                <strong>The golden rule of product design: test as early as possible.</strong> Catching a structural flaw on paper takes ten seconds to erase with a pencil. Catching the same flaw after engineering has written the database and frontend code requires weeks of painful rework and thousands of dollars.
              </p>

              <!-- Cost of Change Comparison Matrix -->
              <div class="my-8 p-6 sm:p-8 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose shadow-xs">
                <div class="flex items-center justify-between pb-4 mb-5 border-b border-ink-border dark:border-dark-border">
                  <div class="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-teal-700 dark:text-teal-400 font-bold">
                    <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span>The Law of Iteration Economics</span>
                  </div>
                  <span class="text-xs sm:text-sm font-mono font-bold text-ink dark:text-dark-ink">Why Early Testing Wins</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <!-- Stage 1 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-sans text-teal-700 dark:text-teal-400 font-bold uppercase">Stage 1</span>
                      <svg class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </div>
                    <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1.5">Sketches & Paper</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Rough pen-and-paper diagrams testing basic structural concepts.
                    </p>
                    <div class="text-sm font-mono font-bold text-teal-700 dark:text-teal-400 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Cost to revise: Minutes
                    </div>
                  </div>

                  <!-- Stage 2 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-sans text-teal-700 dark:text-teal-400 font-bold uppercase">Stage 2</span>
                      <svg class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
                    </div>
                    <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1.5">Clickable Prototypes</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Interactive wireframes evaluated directly with real end-users.
                    </p>
                    <div class="text-sm font-mono font-bold text-teal-700 dark:text-teal-400 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Ideal Window to Catch Flaws
                    </div>
                  </div>

                  <!-- Stage 3 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-surface border border-ink-border dark:border-dark-border shadow-2xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-sans text-teal-700 dark:text-teal-400 font-bold uppercase">Stage 3</span>
                      <svg class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    </div>
                    <h4 class="font-sans font-semibold text-base text-ink dark:text-dark-ink mb-1.5">Production Code</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Fully engineered software running on live production servers.
                    </p>
                    <div class="text-sm font-mono font-bold text-teal-700 dark:text-teal-400 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Cost to revise: Weeks & High Budget
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="sec-visual">8. Phase 5: Visual & UI Design (Design Systems & Voice UI)</h2>
              <p>
                When user testing proves that the navigation and interactive flows work smoothly, designers focus on <strong>Visual & UI Design</strong>. This is the visual surface that users touch and see: typographic hierarchy, harmonious color palettes, comfortable spacing, crisp icons, and high-quality photography.
              </p>
              <p>
                Modern teams collect their styles into a shared <strong>Design System</strong>: a centralized library of reusable components (like buttons, modal sheets, and text inputs) that ensures engineers build cohesive, unified interfaces across mobile and web.
              </p>

              <!-- Design System Exhibit -->
              <div class="my-8 p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center not-prose shadow-2xs">
                <img loading="lazy" decoding="async" 
                  src="${path('/images/lessons/sb-1-0/design_system_spec.webp')}" 
                  alt="Design system specification illustrating component states, color tokens, and typography" 
                  class="max-w-md mx-auto rounded-xs border border-ink-border dark:border-dark-border shadow-xs"
                />
                <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                  Figure 4: A foundational design system component sheet ensuring visual consistency across products.
                </p>
              </div>

              <p>
                Interfaces are also expanding beyond glass touchscreens. With smart speakers like Google Home and Amazon Echo, the interface is a microphone and speaker. <strong>Voice User Interface (VUI)</strong> designers craft clear, engaging, and natural spoken dialogue instead of arranging visual buttons.
              </p>

              <!-- Career Directions -->
              <h2 id="sec-careers">9. Career Paths: Generalist, Specialist, T-Shaped, or M-Shaped?</h2>
              <p>
                Having seen the entire UX journey from discovery interviews to polished pixels, which role matches your personal strengths? In the tech industry, design careers generally follow four models:
              </p>

              <!-- Career Paths Comparative Matrix - Clear Black High Contrast -->
              <div class="my-8 overflow-x-auto not-prose">
                <table class="w-full text-left text-sm sm:text-base font-sans border-collapse border-y border-ink-border dark:border-dark-border">
                  <thead>
                    <tr class="border-b border-ink-border dark:border-dark-border text-xs sm:text-sm font-mono uppercase tracking-widest text-ink dark:text-dark-ink font-bold">
                      <th class="py-3.5 pr-4">Career Archetype</th>
                      <th class="py-3.5 px-4">Core Responsibility</th>
                      <th class="py-3.5 px-4">Ideal Environment</th>
                      <th class="py-3.5 pl-4">Primary Tradeoff</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-ink-border dark:divide-dark-border text-ink dark:text-dark-ink">
                    <tr>
                      <td class="py-4 pr-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                        Generalist
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Handles the complete lifecycle from early discovery interviews to wireframes and UI polish.
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-medium">
                        Early-stage startups and small teams needing one versatile person to do everything.
                      </td>
                      <td class="py-4 pl-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Challenging to achieve deep world-class expertise in every single sub-discipline.
                      </td>
                    </tr>
                    <tr>
                      <td class="py-4 pr-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                        Specialist
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Focuses entirely on one specialized area (such as a dedicated User Researcher or pure Motion Designer).
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-medium">
                        Large tech companies and mature design departments with deep organizational teams.
                      </td>
                      <td class="py-4 pl-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Risk of losing sight of cross-functional product context outside their specialty.
                      </td>
                    </tr>
                    <tr>
                      <td class="py-4 pr-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                        T-Shaped
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Has broad fluency across all UX phases, paired with deep expertise in one primary superpower.
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-medium">
                        High-growth tech companies, modern product squads, and senior leadership tracks.
                      </td>
                      <td class="py-4 pl-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Requires ongoing effort to keep secondary skills updated alongside the main specialty.
                      </td>
                    </tr>
                    <tr>
                      <td class="py-4 pr-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                        M-Shaped
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Combines multiple deep proficiencies across adjacent fields (like UX design plus frontend code or technical writing).
                      </td>
                      <td class="py-4 px-4 text-ink dark:text-dark-ink leading-relaxed font-medium">
                        Autonomous product squads, founding designer roles, and rapid prototyping labs.
                      </td>
                      <td class="py-4 pl-4 text-ink dark:text-dark-ink leading-relaxed font-normal">
                        Frequent context-switching between code logic and design empathy can cause fatigue.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Looking Ahead: AI & UX -->
              <h2 id="sec-outlook">10. The Future: Designing in the Age of AI</h2>
              <p>
                Product design is always evolving to keep up with technology. As machine learning and generative artificial intelligence become part of everyday apps, the way people find information, make decisions, and interact with software is shifting fast.
              </p>
              <p>
                In this new era, UX designers do not just arrange buttons on a grid. We help shape how intelligent tools interact with human beings, making sure that technology remains transparent, respectful, and genuinely helpful. There has never been a more exciting or critical moment to champion human-centered design.
              </p>

              <!-- Derivative Attribution Footer (ADR-009) -->
              <div class="mt-14 pt-6 border-t border-ink-border dark:border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm font-sans text-ink dark:text-dark-ink gap-4 not-prose">
                <div class="flex items-center gap-3.5">
                  <img loading="lazy" decoding="async" 
                    src="${path('/images/lessons/sb-1-0/page_8_img_2.webp')}" 
                    alt="Laurel Hechanova" 
                    class="w-12 h-12 rounded-full object-cover border border-ink-border dark:border-dark-border shrink-0" 
                  />
                  <div>
                    <div class="flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-teal-700 dark:text-teal-400 font-bold mb-0.5">
                      <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                      <span>Curriculum Citation</span>
                    </div>
                    <span class="text-ink dark:text-dark-ink font-medium">Adapted for sovereign study inspired by <em>Introduction to UX Design</em> by <strong>Laurel Hechanova</strong> (Co-founder of Goodmaker, Springboard UX Track).</span>
                  </div>
                </div>
                <a 
                  href="https://readwise.io/reader/document_raw_content/490658744" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="font-mono font-medium text-xs text-ink dark:text-dark-ink hover:underline underline-offset-4 shrink-0 flex items-center gap-1 border border-ink-border dark:border-dark-border px-3 py-1.5 rounded-xs bg-paper-50 dark:bg-dark-card hover:bg-paper-100 dark:hover:bg-dark-surface"
                >
                  <span>Original Source</span>
                  <span>↗</span>
                </a>
              </div>

            `,
          };

export default LESSON;
