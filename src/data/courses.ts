import { path } from '../utils/paths';

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  module: string;
  unitNumber: number;
  lessonNumber: string;
  type: 'article' | 'video' | 'pdf';
  readTime: string;
  originalSourceUrl?: string;
  originalSourceLabel?: string;
  youtubeId?: string;
  summaryQuote: string;
  outline: { id: string; title: string; level: number }[];
  contentHtml: string;
  videoTimestamps?: { time: number; label: string; text: string }[];
}

export type CourseStatus = 'active' | 'new' | 'explored' | 'completed';

export interface CourseDesignSystem {
  accent: string;
  highlight: string;
  paperBg?: string;
  secondary?: string;
  sidenoteBorder?: string;
  cardBg?: string;
  border?: string;
  typography?: {
    headingFont?: string;
    bodyFont?: string;
    fontImportUrl?: string;
    fontSizeScale?: 'compact' | 'classic' | 'spacious';
    lineHeight?: string;
  };
  motifs?: {
    borderRadius?: string;
    dividerStyle?: string;
    quoteStyle?: 'bordered-left' | 'callout-box' | 'centered-large' | 'bracketed';
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  updatedAt: string;
  duration: string;
  progressPercent: number;
  totalModules: number;
  totalSources: number;
  status: CourseStatus;
  theme: CourseDesignSystem;
  modules: {
    id: string;
    number: number;
    title: string;
    description: string;
    lessons: Lesson[];
  }[];
}

export const COURSES: Course[] = [
  {
    id: 'springboard-ux',
    slug: 'springboard-ux',
    title: 'Springboard UX Career Track',
    subtitle: 'Human-Centered Research, Information Architecture & Usability',
    description: 'A disciplined, master-level curriculum covering contextual inquiry, user testing protocols, synthesis, and ergonomic interface design.',
    category: 'Product Design',
    updatedAt: '2 days ago',
    duration: '40 hrs',
    progressPercent: 34,
    totalModules: 8,
    totalSources: 60,
    status: 'active',
    theme: {
      accent: '#18181B',
      highlight: 'rgba(0, 0, 0, 0.08)',
      paperBg: '#FFFFFF',
    },
    modules: [
      {
        id: 'mod-1',
        number: 1,
        title: 'Unit 1: Design 101 & Foundations',
        description: 'Core concepts of UX design, the 3 levels of experience, and foundational discovery methods.',
        lessons: [
          {
            id: 'sb-1-0',
            slug: 'the-anatomy-of-product-experience',
            title: 'Introduction to UX Design: Core Principles, Process & Career Paths',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.0',
            type: 'pdf',
            readTime: '18 min',
            originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658744',
            originalSourceLabel: 'Springboard UX Track (by Laurel Hechanova)',
            summaryQuote: 'User experience is what someone feels, what they do, and what they understand when using a product. Good design begins with understanding real human needs.',
            outline: [
              { id: 'sec-what-is-ux', title: '1. What UX Design Really Means', level: 2 },
              { id: 'sec-triad', title: '2. The Three Levels: Product, Service, and System', level: 2 },
              { id: 'sec-research', title: '3. Phase 1: User Research (Asking the Right Questions)', level: 2 },
              { id: 'sec-ia', title: '4. Phase 2: Information Architecture (Organizing the App)', level: 2 },
              { id: 'sec-case-study', title: '5. Case Study: Instagram Navigation Breakdown', level: 2 },
              { id: 'sec-ixd', title: '6. Phase 3: Interaction Design (Sketches & Wireframes)', level: 2 },
              { id: 'sec-testing', title: '7. Phase 4: Usability Testing (Catching Mistakes Early)', level: 2 },
              { id: 'sec-visual', title: '8. Phase 5: Visual & UI Design (Design Systems & Voice UI)', level: 2 },
              { id: 'sec-careers', title: '9. Career Paths: Generalist, Specialist, T-Shaped, or M-Shaped?', level: 2 },
              { id: 'sec-outlook', title: '10. The Future: Designing in the Age of AI', level: 2 },
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
              <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
                <p>"Good design does not begin with graphics or code. It begins with curiosity about how real people live, where they struggle, and how a thoughtful tool can make their day easier."</p>
                <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
                  // Core Design Axiom
                </footer>
              </blockquote>

              <h2 id="sec-triad">2. The Three Levels: Product, Service, and System</h2>
              <p>
                When most people hear the word "experience," they usually picture an app on a smartphone screen. But user experience actually operates at three connected levels:
              </p>

              <!-- The Three Levels - High-Contrast Clear Reading Cards -->
              <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-5 not-prose">
                <!-- Level 1: Product -->
                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-sky-500 shadow-2xs">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                      Level 01 // Product
                    </span>
                    <span class="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                  </div>
                  <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">
                    The Direct Object
                  </h4>
                  <p class="text-sm text-ink dark:text-dark-ink leading-relaxed mb-3">
                    The physical or digital tool directly in front of you.
                  </p>
                  <div class="text-sm font-sans font-medium text-ink dark:text-dark-ink pt-2.5 border-t border-ink-border dark:border-dark-border">
                    <span class="font-bold text-sky-800 dark:text-sky-300">Examples:</span> A mobile app, a website, a car dashboard, or an electric teapot on your kitchen counter.
                  </div>
                </div>

                <!-- Level 2: Service -->
                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-amber-500 shadow-2xs">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      Level 02 // Service
                    </span>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  </div>
                  <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">
                    The Ongoing Task Flow
                  </h4>
                  <p class="text-sm text-ink dark:text-dark-ink leading-relaxed mb-3">
                    Getting something done across multiple steps and interactions over time.
                  </p>
                  <div class="text-sm font-sans font-medium text-ink dark:text-dark-ink pt-2.5 border-t border-ink-border dark:border-dark-border">
                    <span class="font-bold text-amber-800 dark:text-amber-300">Examples:</span> Booking a hotel room, hailing a ride, making an in-app payment, or returning a broken teapot for a refund.
                  </div>
                </div>

                <!-- Level 3: System -->
                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-purple-500 shadow-2xs">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-mono font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                      Level 03 // System
                    </span>
                    <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  </div>
                  <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">
                    The Underlying Engine
                  </h4>
                  <p class="text-sm text-ink dark:text-dark-ink leading-relaxed mb-3">
                    The network, servers, and rules connecting tools, databases, and people together.
                  </p>
                  <div class="text-sm font-sans font-medium text-ink dark:text-dark-ink pt-2.5 border-t border-ink-border dark:border-dark-border">
                    <span class="font-bold text-purple-800 dark:text-purple-300">Examples:</span> The Apple App Store, a hotel chain reservation database, or an automated warranty platform.
                  </div>
                </div>
              </div>

              <p>
                To create great experiences across these three levels, professional product teams follow a clear five-stage design process: <strong>User Research</strong>, <strong>Information Architecture</strong>, <strong>Interaction Design</strong>, <strong>Usability Testing</strong>, and <strong>Visual & UI Design</strong>. Let us walk through each phase step-by-step.
              </p>

              <!-- Step 1: Research -->
              <div class="mt-12 mb-4 flex items-center gap-2 not-prose">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold text-teal-800 dark:text-teal-300 border border-teal-500/50 bg-teal-500/10">
                  Phase 01 // Discovery
                </span>
              </div>
              <h2 id="sec-research" class="!mt-2">3. Phase 1: User Research (Asking the Right Questions)</h2>
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
              <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-5 not-prose">
                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-teal-500 shadow-2xs">
                  <div class="flex items-center gap-3 mb-2.5">
                    <span class="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-mono font-bold shrink-0">1</span>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink">What concrete difficulties do they have?</h4>
                  </div>
                  <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed pl-10 font-normal">
                    Identify the exact friction point that wastes their time, causes daily mistakes, or stresses them out.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-blue-500 shadow-2xs">
                  <div class="flex items-center gap-3 mb-2.5">
                    <span class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-mono font-bold shrink-0">2</span>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink">Who, specifically, encounters this issue?</h4>
                  </div>
                  <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed pl-10 font-normal">
                    Narrow down the exact audience segment. If you design for "everyone," you satisfy no one well.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-amber-500 shadow-2xs">
                  <div class="flex items-center gap-3 mb-2.5">
                    <span class="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-mono font-bold shrink-0">3</span>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink">What workarounds are they using right now?</h4>
                  </div>
                  <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed pl-10 font-normal">
                    People rarely sit idle; they patch problems with spreadsheets, handwritten post-it notes, or messy email chains.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-rose-500 shadow-2xs">
                  <div class="flex items-center gap-3 mb-2.5">
                    <span class="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-mono font-bold shrink-0">4</span>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink">Where do their current workarounds break down?</h4>
                  </div>
                  <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed pl-10 font-normal">
                    Uncover where their improvised habits cost them energy, time, or money. That specific gap is your product opportunity.
                  </p>
                </div>
              </div>

              <!-- Step 2: Information Architecture -->
              <div class="mt-12 mb-4 flex items-center gap-2 not-prose">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-800 dark:text-blue-300 border border-blue-500/50 bg-blue-500/10">
                  Phase 02 // Structure
                </span>
              </div>
              <h2 id="sec-ia" class="!mt-2">4. Phase 2: Information Architecture (Organizing the App)</h2>
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
                  <span class="text-xs font-mono uppercase tracking-wider text-blue-800 dark:text-blue-300 font-bold">
                    Case Study // Structural Breakdown
                  </span>
                  <span class="text-xs sm:text-sm font-mono font-semibold text-ink dark:text-dark-ink">Instagram iOS App</span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <!-- Screenshot Figure -->
                  <div class="lg:col-span-5 text-center">
                    <img 
                      src="\${path('/images/lessons/sb-1-0/page_3_img_2.png')}" 
                      alt="Historical Instagram iOS interface screenshot demonstrating information architecture" 
                      class="max-w-[270px] mx-auto rounded-xl shadow-md border border-ink-border dark:border-dark-border"
                    />
                    <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                      Figure 1: The historical Instagram iOS home view, illustrating four distinct structural zones.
                    </p>
                  </div>

                  <!-- 4 Color-Coordinated Zones & Hierarchy -->
                  <div class="lg:col-span-7 space-y-4">
                    <!-- Zone 1 -->
                    <div class="p-4 rounded-xs border-l-4 border-sky-500 bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-bold text-base text-sky-800 dark:text-sky-300">1. Header Utility Bar</h4>
                        <span class="text-xs font-mono font-bold text-sky-800 dark:text-sky-300">Top Navigation</span>
                      </div>
                      <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed">
                        Dedicated to quick actions: camera capture on the left, brand logo in the center, and private direct messages on the right.
                      </p>
                    </div>

                    <!-- Zone 2 -->
                    <div class="p-4 rounded-xs border-l-4 border-amber-500 bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-bold text-base text-amber-800 dark:text-amber-300">2. Ephemeral Stories Carousel</h4>
                        <span class="text-xs font-mono font-bold text-amber-800 dark:text-amber-300">Horizontal Rail</span>
                      </div>
                      <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed">
                        Houses 24-hour casual media in a horizontal scroll rail, intentionally separated so it does not interrupt the permanent vertical feed below.
                      </p>
                    </div>

                    <!-- Zone 3 -->
                    <div class="p-4 rounded-xs border-l-4 border-indigo-500 bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-bold text-base text-indigo-800 dark:text-indigo-300">3. Primary Consumption Feed</h4>
                        <span class="text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300">Vertical Canvas</span>
                      </div>
                      <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed">
                        The core reason users open the app: an infinite vertical stream of photos, videos, and comments from followed creators.
                      </p>
                    </div>

                    <!-- Zone 4 -->
                    <div class="p-4 rounded-xs border-l-4 border-emerald-500 bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border">
                      <div class="flex items-center justify-between mb-1.5">
                        <h4 class="font-sans font-bold text-base text-emerald-800 dark:text-emerald-300">4. Bottom Navigation Bar</h4>
                        <span class="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">Persistent Dock</span>
                      </div>
                      <p class="text-sm sm:text-[15px] text-ink dark:text-dark-ink leading-relaxed">
                        The five core product destinations (Home, Search, Create, Activity, and Profile), permanently anchored within comfortable thumb reach.
                      </p>
                    </div>

                    <!-- Architectural Tree View -->
                    <div class="pt-4 border-t border-ink-border dark:border-dark-border">
                      <div class="text-xs font-mono uppercase tracking-wider text-ink dark:text-dark-ink font-bold mb-2.5">
                        // Hierarchical Tree Representation
                      </div>
                      <div class="p-3.5 rounded-xs bg-paper-100 dark:bg-dark-bg border border-ink-border dark:border-dark-border font-mono text-sm space-y-1.5 text-ink dark:text-dark-ink">
                        <div class="text-sky-800 dark:text-sky-300 font-bold">1. Header (Camera, IGTV, Direct Messages)</div>
                        <div class="text-amber-800 dark:text-amber-300 font-bold">2. Stories Carousel (Your Story, Following)</div>
                        <div class="text-indigo-800 dark:text-indigo-300 font-bold">3. Main Stream (Media Card, Social Actions)</div>
                        <div class="text-emerald-800 dark:text-emerald-300 font-bold">4. Global Tab Dock</div>
                        <div class="pl-4 font-sans text-xs sm:text-sm font-medium text-ink dark:text-dark-ink">4.1 Home &bull; 4.2 Explore &bull; 4.3 Post &bull; 4.4 Activity (Following / You) &bull; 4.5 Profile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Interaction Design -->
              <div class="mt-12 mb-4 flex items-center gap-2 not-prose">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold text-violet-800 dark:text-violet-300 border border-violet-500/50 bg-violet-500/10">
                  Phase 03 // Behavior
                </span>
              </div>
              <h2 id="sec-ixd" class="!mt-2">6. Phase 3: Interaction Design (Sketches & Wireframes)</h2>
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
                  <img 
                    src="\${path('/images/lessons/sb-1-0/page_5_img_2.png')}" 
                    alt="Whiteboard sketch showing early web layout ideation" 
                    class="w-full h-56 object-contain mx-auto rounded-xs bg-paper-50 dark:bg-dark-bg p-2 border border-ink-border dark:border-dark-border"
                  />
                  <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                    Figure 2: Rapid whiteboard sketching for exploring layout options quickly.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center shadow-2xs">
                  <img 
                    src="\${path('/images/lessons/sb-1-0/page_5_img_3.png')}" 
                    alt="Mobile wireframe testing functional content flow" 
                    class="w-full h-56 object-contain mx-auto rounded-xs bg-paper-50 dark:bg-dark-bg p-2 border border-ink-border dark:border-dark-border"
                  />
                  <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                    Figure 3: Structured digital wireframe outlining hierarchy before applying visual styling.
                  </p>
                </div>
              </div>

              <!-- Step 4: Usability Testing -->
              <div class="mt-12 mb-4 flex items-center gap-2 not-prose">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-800 dark:text-amber-300 border border-amber-500/50 bg-amber-500/10">
                  Phase 04 // Validation
                </span>
              </div>
              <h2 id="sec-testing" class="!mt-2">7. Phase 4: Usability Testing (Catching Mistakes Early)</h2>
              <p>
                Once wireframes are linked together into a clickable prototype, it is time to put your ideas to the test. In <strong>Usability Testing</strong>, you sit down with representative users, give them realistic tasks (such as <em>"Try finding a hotel room under $150 and reserving it"</em>), and observe where they hesitate, tap by mistake, or become confused.
              </p>
              <p>
                <strong>The golden rule of product design: test as early as possible.</strong> Catching a structural flaw on paper takes ten seconds to erase with a pencil. Catching the same flaw after engineering has written the database and frontend code requires weeks of painful rework and thousands of dollars.
              </p>

              <!-- Cost of Change Comparison Matrix -->
              <div class="my-8 p-6 sm:p-8 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose shadow-xs">
                <div class="flex items-center justify-between pb-4 mb-5 border-b border-ink-border dark:border-dark-border">
                  <span class="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300 font-bold">
                    // The Law of Iteration Economics
                  </span>
                  <span class="text-xs sm:text-sm font-mono font-bold text-ink dark:text-dark-ink">Why Early Testing Wins</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <!-- Stage 1 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border shadow-2xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold uppercase">Stage 1</span>
                      <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </div>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1.5">Sketches & Paper</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Rough pen-and-paper diagrams testing basic structural concepts.
                    </p>
                    <div class="text-sm font-mono font-bold text-emerald-800 dark:text-emerald-300 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Cost to revise: Minutes
                    </div>
                  </div>

                  <!-- Stage 2 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-bg border-2 border-amber-500 shadow-xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-mono text-amber-800 dark:text-amber-300 font-bold uppercase">Stage 2</span>
                      <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                    </div>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1.5">Clickable Prototypes</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Interactive wireframes evaluated directly with real end-users.
                    </p>
                    <div class="text-sm font-mono font-bold text-amber-800 dark:text-amber-300 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Ideal Window to Catch Flaws
                    </div>
                  </div>

                  <!-- Stage 3 -->
                  <div class="p-5 rounded-xs bg-paper-50 dark:bg-dark-bg border border-ink-border dark:border-dark-border shadow-2xs">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-mono text-rose-800 dark:text-rose-300 font-bold uppercase">Stage 3</span>
                      <span class="w-2 h-2 rounded-full bg-rose-600"></span>
                    </div>
                    <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1.5">Production Code</h4>
                    <p class="text-sm text-ink dark:text-dark-ink mb-3 leading-relaxed">
                      Fully engineered software running on live production servers.
                    </p>
                    <div class="text-sm font-mono font-bold text-rose-800 dark:text-rose-300 pt-2.5 border-t border-ink-border dark:border-dark-border">
                      Cost to revise: Weeks & High Budget
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 5: Visual Design -->
              <div class="mt-12 mb-4 flex items-center gap-2 not-prose">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/50 bg-emerald-500/10">
                  Phase 05 // Surface Craft
                </span>
              </div>
              <h2 id="sec-visual" class="!mt-2">8. Phase 5: Visual & UI Design (Design Systems & Voice UI)</h2>
              <p>
                When user testing proves that the navigation and interactive flows work smoothly, designers focus on <strong>Visual & UI Design</strong>. This is the visual surface that users touch and see: typographic hierarchy, harmonious color palettes, comfortable spacing, crisp icons, and high-quality photography.
              </p>
              <p>
                Modern teams collect their styles into a shared <strong>Design System</strong>: a centralized library of reusable components (like buttons, modal sheets, and text inputs) that ensures engineers build cohesive, unified interfaces across mobile and web.
              </p>

              <!-- Design System Exhibit -->
              <div class="my-8 p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center not-prose shadow-2xs">
                <img 
                  src="\${path('/images/lessons/sb-1-0/page_7_img_2.png')}" 
                  alt="A foundational design system library illustrating buttons, color tokens, and typographic styles" 
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
                <table class="w-full text-left text-sm sm:text-[15px] font-sans border-collapse border-y-2 border-ink dark:border-dark-ink">
                  <thead>
                    <tr class="border-b-2 border-ink dark:border-dark-ink text-xs sm:text-sm font-mono uppercase tracking-wider text-ink dark:text-dark-ink font-bold">
                      <th class="py-3.5 pr-4">Career Archetype</th>
                      <th class="py-3.5 px-4">Core Responsibility</th>
                      <th class="py-3.5 px-4">Ideal Environment</th>
                      <th class="py-3.5 pl-4">Primary Tradeoff</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-ink-border dark:divide-dark-border text-ink dark:text-dark-ink">
                    <tr>
                      <td class="py-4 pr-4 font-mono font-bold text-blue-800 dark:text-blue-300">
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
                      <td class="py-4 pr-4 font-mono font-bold text-violet-800 dark:text-violet-300">
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
                      <td class="py-4 pr-4 font-mono font-bold text-emerald-800 dark:text-emerald-300">
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
                      <td class="py-4 pr-4 font-mono font-bold text-amber-800 dark:text-amber-300">
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
                  <img 
                    src="\${path('/images/lessons/sb-1-0/page_8_img_2.png')}" 
                    alt="Laurel Hechanova" 
                    class="w-12 h-12 rounded-full object-cover border border-ink-border dark:border-dark-border shrink-0" 
                  />
                  <div>
                    <span class="font-mono text-xs uppercase tracking-wider text-teal-800 dark:text-teal-300 font-bold block mb-0.5">// Curriculum Citation</span>
                    <span class="text-ink dark:text-dark-ink font-medium">Adapted for sovereign study inspired by <em>Introduction to UX Design</em> by <strong>Laurel Hechanova</strong> (Co-founder of Goodmaker, Springboard UX Track).</span>
                  </div>
                </div>
                <a 
                  href="https://readwise.io/reader/document_raw_content/490658744" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="font-ui font-medium text-xs text-ink dark:text-dark-ink hover:underline underline-offset-4 shrink-0 flex items-center gap-1 border border-ink-border dark:border-dark-border px-3 py-1.5 rounded-xs bg-paper-50 dark:bg-dark-card hover:bg-paper-100"
                >
                  <span>Original Source</span>
                  <span>↗</span>
                </a>
              </div>
            
            `,
          },
          {
            id: 'sb-1-1',
            slug: 'the-eight-step-ux-process',
            title: 'What Is the UX Design Process? 8 Steps Explained in Detail',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.1',
            type: 'article',
            readTime: '24 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-design-process/',
            originalSourceLabel: 'Springboard Deep Dive (by Sakshi Gupta)',
            
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
      <div class="flex items-center gap-2 font-mono text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
        <span>// Industry Benchmarks & Economic Value</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div class="p-4 rounded-xs bg-white dark:bg-dark-bg border border-ink-border/80 dark:border-dark-border">
          <strong class="text-ink dark:text-dark-ink block text-sm font-sans mb-1 font-bold">LinkedIn In-Demand Index</strong>
          <p class="text-xs sm:text-sm text-ink dark:text-dark-ink font-serif leading-relaxed">
            Consistently ranks in the highest bracket of sought-after technical skills across enterprise software, consumer apps, healthcare, and fintech.
          </p>
        </div>
        <div class="p-4 rounded-xs bg-white dark:bg-dark-bg border border-ink-border/80 dark:border-dark-border">
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
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"UX design goes far beyond cosmetic styling; it anchors technical decisions in observable human behavior, ensuring that human goals and business objectives converge effortlessly."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Core Philosophy &mdash; Sakshi Gupta
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
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-800 dark:text-teal-300">UX Design (Experience)</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-indigo-800 dark:text-indigo-300">UI Design (Interface)</th>
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
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-amber-500 shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">Stage 01 // Define</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Alignment & Scope</span>
        </div>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Define the Core Challenge</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          State the fundamental business objectives, user targets, and technical constraints before spending engineering hours.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-teal-500 shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase">Stage 02 // Research</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Contextual Inquiry</span>
        </div>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Discover User Realities</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Conduct qualitative user interviews and field inquiries to learn what people actually do rather than what they claim they do.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-sky-500 shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-sky-800 dark:text-sky-300 uppercase">Stage 03 // Analyze</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Synthesis & Scenarios</span>
        </div>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Map Personas and Journeys</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Synthesize field interviews into behavioral archetypes (personas) and diagram step-by-step user journey maps identifying drop-offs.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-indigo-500 shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase">Stage 04 // Design</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Architecture & Prototypes</span>
        </div>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Construct Wireframes & Interactive Prototypes</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Evolve concepts from rough paper sketches to structural wireframes, interactive Figma components, and cohesive design systems.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-rose-500 shadow-2xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-xs font-bold text-rose-800 dark:text-rose-300 uppercase">Stage 05 // Validate</span>
          <span class="text-xs font-mono text-ink-muted dark:text-dark-muted">Empirical Testing</span>
        </div>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Test with Real Participants</h4>
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
    <div class="my-6 p-4 rounded-xs bg-paper-100 dark:bg-dark-card border-l-3 border-sky-600 dark:border-sky-500 font-serif text-sm text-ink dark:text-dark-ink">
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
    <aside class="my-10 p-5 rounded-xs border-l-3 border-teal-600 dark:border-teal-500 bg-teal-500/5 text-ink dark:text-dark-ink space-y-2 not-prose">
      <p class="font-mono text-xs uppercase font-bold text-teal-800 dark:text-teal-300 tracking-wider">// Reflection Inquiry</p>
      <p class="font-serif text-sm sm:text-base leading-relaxed">
        Why is it dangerous to treat the UX design process as a strict linear conveyor belt? How does circling back between prototyping and user research actually save engineering capital?
      </p>
    </aside>

    <h2 id="sec-faqs">13. Frequently Asked Questions & Core Takeaways</h2>
    <div class="space-y-6 my-8 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1.5">Who participates in the UX design process?</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          While led by UX designers and researchers, successful execution requires continuous collaboration with product managers (defining business scope), software engineers (evaluating technical feasibility), and customer success teams (surfacing daily user complaints).
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1.5">Are there faster alternatives like Lean UX or Google Design Sprints?</h4>
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Springboard Blog</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          },
          {
            id: 'sb-1-2',
            slug: 'ux-vs-ui-deliverables-and-planes',
            title: 'UX vs. UI: The Essential Distinction Between Experience and Interface',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.2',
            type: 'article',
            readTime: '20 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-vs-ui/',
            originalSourceLabel: 'Springboard Design Guide',
            
            summaryQuote: 'UI is the saddle, the stirrups, and the reins; UX is the feeling you have being able to ride the horse with mastery and confidence.',
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
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"UI is the saddle, the stirrups, and the reins; UX is the feeling you have being able to ride the horse with mastery, comfort, and confidence."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Classic Design Axiom &mdash; Dain Miller
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
    <div class="my-8 grid grid-cols-1 sm:grid-cols-5 gap-3 not-prose text-center">
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <div class="font-mono text-xs text-teal-800 dark:text-teal-300 font-bold mb-1">01 // Base</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Strategy</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">User needs & business goals</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <div class="font-mono text-xs text-blue-800 dark:text-blue-300 font-bold mb-1">02</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Scope</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Features & content specs</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <div class="font-mono text-xs text-amber-800 dark:text-amber-300 font-bold mb-1">03</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Structure</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">IA & interaction design</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <div class="font-mono text-xs text-indigo-800 dark:text-indigo-300 font-bold mb-1">04</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Skeleton</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Navigation & wireframes</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
        <div class="font-mono text-xs text-rose-800 dark:text-rose-300 font-bold mb-1">05 // Top</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Surface</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Visual presentation (UI)</div>
      </div>
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
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">1. Typographic Hierarchy</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Selecting harmonious typefaces, establishing modular scale ratios (16px base, 20px subhead, 32px title), and setting line height and measure for effortless reading.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">2. Color Theory & Accessibility</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Creating semantic token systems (Primary, Surface, Error, Muted) that meet WCAG AAA contrast standards (7:1 for normal text) across Light and Dark surfaces.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">3. Spatial Rhythm & Layout</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Applying an 8-point spatial grid system across margins, padding, and layout components to produce unconscious visual order and rhythm.
        </p>
      </div>
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">4. Interaction & Motion</h4>
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
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-800 dark:text-teal-300">UX Designer</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-indigo-800 dark:text-indigo-300">UI Designer</th>
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
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Myth 1: "UI is just making UX pretty."</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Visual design is not superficial decoration. Clear typography, intentional whitespace, and distinct color hierarchy actively guide human attention and reduce cognitive load. Great UI makes complex functionality immediately intelligible.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Myth 2: "UX is purely subjective opinion."</h4>
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Springboard Blog</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          },
          {
            id: 'sb-1-3',
            slug: 'design-thinking-process-and-mindsets',
            title: 'Design Thinking 101: The 5 Stages of Human-Centered Innovation',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.3',
            type: 'video',
            readTime: '18 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/design-thinking/',
            originalSourceLabel: 'Sarah Gibbons / Nielsen Norman Group',
            youtubeId: '6lmvCqvmjfE',
            summaryQuote: 'Design thinking is a human-centered approach to innovation that integrates the needs of people, the possibilities of technology, and the requirements for business success.',
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

    <div data-timestamp="0" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase">// Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="0">
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
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-teal-500">
        <div class="font-mono text-xs text-teal-800 dark:text-teal-300 font-bold mb-1">01</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Empathize</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Listen & observe</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-blue-500">
        <div class="font-mono text-xs text-blue-800 dark:text-blue-300 font-bold mb-1">02</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Define</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Frame the friction</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-amber-500">
        <div class="font-mono text-xs text-amber-800 dark:text-amber-300 font-bold mb-1">03</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Ideate</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Brainstorm widely</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-indigo-500">
        <div class="font-mono text-xs text-indigo-800 dark:text-indigo-300 font-bold mb-1">04</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Prototype</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Build test models</div>
      </div>
      <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-rose-500">
        <div class="font-mono text-xs text-rose-800 dark:text-rose-300 font-bold mb-1">05</div>
        <div class="font-bold text-sm text-ink dark:text-dark-ink">Test</div>
        <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Validate with users</div>
      </div>
    </div>

    <!-- Stage 1 -->
    <div data-timestamp="90" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase">// Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="90">
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
    <div data-timestamp="210" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-blue-800 dark:text-blue-300 uppercase">// Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="210">
          03:30 &mdash; Jump to Define Phase
        </button>
      </div>
      <h2 id="dt-stage-2" class="!mt-0 !border-b-0">3. Stage 2: Define (Framing the Real Struggle)</h2>
      <p class="font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
        In the Define phase, you synthesize messy field observations into a tight, actionable problem statement known as a <strong>Point-of-View (POV)</strong>.
      </p>
      <div class="my-4 p-4 rounded-xs bg-white dark:bg-dark-bg border border-ink-border/60 dark:border-dark-border font-serif text-sm">
        <strong class="font-sans text-xs uppercase font-bold text-blue-800 dark:text-blue-300 block mb-1">// Standard POV Formula</strong>
        <p class="italic text-ink dark:text-dark-ink">"[User description] needs a way to [user need] because surprisingly, [unexpected insight uncovered in research]."</p>
      </div>
      <p class="font-serif text-base text-ink dark:text-dark-ink leading-relaxed">
        From this statement, you generate open-ended <strong>"How Might We" (HMW)</strong> questions that launch the ideation phase without dictating a specific UI component.
      </p>
    </div>

    <!-- Stage 3 -->
    <div data-timestamp="330" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">// Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="330">
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
    <div data-timestamp="450" class="my-6 p-4 rounded-xs border border-ink-border/80 dark:border-dark-border bg-paper-50 dark:bg-dark-card transition-all">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase">// Video Timestamp Section</span>
        <button class="timestamp-btn font-mono text-xs px-2.5 py-1 rounded bg-paper-200 dark:bg-dark-border text-ink dark:text-dark-ink font-bold cursor-pointer hover:bg-paper-300 dark:hover:bg-dark-border/80 transition-colors" data-seek-time="450">
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
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"Fail early, fail cheaply, and fail in a mockup rather than in production code. A prototype is a conversation piece with the user's subconscious mind."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Sarah Gibbons &mdash; Nielsen Norman Group
      </footer>
    </blockquote>

    <h2 id="dt-double-diamond">7. The Double Diamond: Alternating Divergence and Convergence</h2>
    <p>
      The British Design Council visualized Design Thinking as two interconnected diamonds:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">Diamond 01 // Problem Space</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Discover & Define</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          You first expand outward (diverge) to explore all possible facets of user pain, then focus inward (converge) onto the single high-impact problem to solve.
        </p>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase block mb-1">Diamond 02 // Solution Space</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Develop & Deliver</h4>
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Nielsen Norman Group</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          }
        ]
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'Unit 2: User Research & Discovery',
        description: 'Qualitative & quantitative inquiry, non-leading interview protocols, and heuristics.',
        lessons: [
          {
            id: 'sb-2-1',
            slug: 'user-research-methods-and-interviews',
            title: 'The Essential Guide to User Research & Field Inquiry',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.1',
            type: 'article',
            readTime: '22 min',
            originalSourceUrl: 'https://uxplanet.org/ultimate-guide-to-user-research-bed4a57d260',
            originalSourceLabel: 'Mona Yang (UX Planet)',
            
            summaryQuote: 'Research is not about proving your opinions right; it is about uncovering reality before you invest time and capital in construction.',
            outline: [
          {
                    "id": "res-why",
                    "title": "1. Why Quantitative Analytics Lie: The What vs. The Why",
                    "level": 2
          },
          {
                    "id": "res-generative-evaluative",
                    "title": "2. Generative vs. Evaluative Research",
                    "level": 2
          },
          {
                    "id": "res-methods-matrix",
                    "title": "3. The 4 Primary Research Methodologies Matrix",
                    "level": 2
          },
          {
                    "id": "res-interviewing",
                    "title": "4. The Art of the Non-Leading User Interview",
                    "level": 2
          },
          {
                    "id": "res-contextual",
                    "title": "5. Contextual Inquiry: Shadowing Users in the Wild",
                    "level": 2
          },
          {
                    "id": "res-synthesis",
                    "title": "6. From Raw Notes to Affinity Diagrams",
                    "level": 2
          },
          {
                    "id": "res-personas",
                    "title": "7. Constructing Actionable Personas & Empathy Maps",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      Analytics dashboards tell you <em>what</em> happens on your screens: where users drop off, what buttons they click, and how long they linger. But analytics alone will never tell you <em>why</em> they did it. User research is the disciplined practice of uncovering the human thoughts, emotional triggers, and unstated workarounds that drive those numbers.
    </p>

    <h2 id="res-why">1. Why Quantitative Analytics Lie: The What vs. The Why</h2>
    <p>
      Imagine an e-commerce dashboard showing that 42% of users abandon their shopping carts at the payment step. A team looking strictly at numbers might hypothesize: <em>"Maybe the checkout button is too small? Let us make it huge and green!"</em>
    </p>
    <p>
      When a UX researcher actually interviews users who abandoned carts, the truth emerges: users did not leave because the button was small; they left because an unexpected shipping fee appeared at the final step, or because the checkout form asked for a phone number without explaining why it was required, triggering privacy suspicion.
    </p>
    <p>
      Quantitative data indicates symptoms; qualitative user research diagnoses the root cause. Without qualitative research, product teams waste months optimizing the wrong elements.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"User research is not about validating your existing opinions; it is about systematically dismantling your assumptions before engineers write a single line of code."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Mona Yang &mdash; UX Planet
      </footer>
    </blockquote>

    <h2 id="res-generative-evaluative">2. Generative vs. Evaluative Research</h2>
    <p>
      User research activities fall into two distinct phases of the product lifecycle:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-teal-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">Phase A // Discovery</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Generative (Exploratory) Research</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed mb-3">
          Conducted <em>before</em> any solution is imagined. Its goal is to uncover unmet human needs, emotional pain points, and current broken habits.
        </p>
        <div class="text-xs font-mono text-ink-muted dark:text-dark-muted border-t border-ink-border/60 dark:border-dark-border/60 pt-2 font-medium">
          Tools: 1-on-1 contextual interviews, ethnographic shadowing, diary studies.
        </div>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-indigo-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase block mb-1">Phase B // Validation</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Evaluative (Testing) Research</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed mb-3">
          Conducted <em>during and after</em> designs are produced. Its goal is to test whether the proposed interface functions intuitively in real hands.
        </p>
        <div class="text-xs font-mono text-ink-muted dark:text-dark-muted border-t border-ink-border/60 dark:border-dark-border/60 pt-2 font-medium">
          Tools: Usability testing, tree testing, card sorting, A/B conversion tests.
        </div>
      </div>
    </div>

    <h2 id="res-methods-matrix">3. The 4 Primary Research Methodologies Matrix</h2>
    <div class="my-10 overflow-x-auto not-prose">
      <table class="w-full text-left font-serif text-sm border-collapse border-t border-b border-ink-border dark:border-dark-border">
        <thead>
          <tr class="border-b border-ink-border dark:border-dark-border bg-paper-100 dark:bg-dark-card">
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-ink dark:text-dark-ink">Methodology</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-teal-800 dark:text-teal-300">Data Type</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-amber-800 dark:text-amber-300">Best Used For</th>
            <th class="py-3 px-4 font-mono text-xs uppercase font-bold text-indigo-800 dark:text-indigo-300">Sample Size</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-border/60 dark:divide-dark-border/60">
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">1-on-1 User Interviews</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Attitudinal</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Uncovering mental models, personal motivations, and history.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">5 &ndash; 8 users</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Contextual Inquiry</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Behavioral</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Observing authentic workflows and interruptions in natural environments.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">4 &ndash; 6 sessions</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Surveys & Questionnaires</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Quantitative / Attitudinal</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Validating qualitative findings across statistically significant cohorts.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">100 &ndash; 1000+ responses</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-ink dark:text-dark-ink">Usability Lab Sessions</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Qualitative / Behavioral</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Measuring task completion times, confusion points, and navigation errors.</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink font-mono text-xs">5 users per iteration</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="res-interviewing">4. The Art of the Non-Leading User Interview</h2>
    <p>
      The single biggest mistake junior researchers make is asking <strong>leading questions</strong>. When you ask leading questions, you unconsciously bias the participant into agreeing with you to appear agreeable.
    </p>

    <!-- Good vs Bad Interviewing Matrix -->
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-5 rounded-xs bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
        <h4 class="font-sans font-bold text-rose-800 dark:text-rose-300 text-sm mb-2 flex items-center gap-1.5">
          <span>&times;</span> Leading Questions (Biased & Useless)
        </h4>
        <ul class="space-y-2 text-xs font-serif text-ink dark:text-dark-ink">
          <li>&bull; <em>"Would you find an automated calendar sync helpful?"</em> (Everyone says yes; hypothetical futures are unreliable).</li>
          <li>&bull; <em>"Don't you think our search bar is much easier than Competitor X?"</em> (Directly prompts a compliment).</li>
          <li>&bull; <em>"What features would make you buy this app?"</em> (Users are terrible product managers; they request feature bloat).</li>
        </ul>
      </div>

      <div class="p-5 rounded-xs bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40">
        <h4 class="font-sans font-bold text-teal-800 dark:text-teal-300 text-sm mb-2 flex items-center gap-1.5">
          <span>&check;</span> Non-Leading Questions (Behavioral & Reliable)
        </h4>
        <ul class="space-y-2 text-xs font-serif text-ink dark:text-dark-ink">
          <li>&bull; <em>"Tell me about the last time you tried to schedule a meeting with three clients. What happened?"</em></li>
          <li>&bull; <em>"Walk me through how you searched for that document yesterday. Where did you click first?"</em></li>
          <li>&bull; <em>"What is the most frustrating part of your current morning routine using Tool X?"</em></li>
        </ul>
      </div>
    </div>

    <h2 id="res-contextual">5. Contextual Inquiry: Shadowing Users in the Wild</h2>
    <p>
      When people sit in a quiet meeting room answering interview questions, they rationalize their behavior. They tell you how they <em>think</em> they work. In reality, their actual work environment is chaotic: their phone rings, two monitors flash Slack alerts, and coworkers interrupt them every six minutes.
    </p>
    <p>
      <strong>Contextual Inquiry</strong> involves sitting beside users in their real workplace while they perform actual tasks. You observe the physical sticky notes stuck to their monitor, the manual Excel spreadsheet workarounds they created because the enterprise software was too slow, and the keyboard shortcuts they rely on. These unstated workarounds are the richest source of product innovation.
    </p>

    <h2 id="res-synthesis">6. From Raw Notes to Affinity Diagrams</h2>
    <p>
      After conducting six user interviews, you have thirty pages of messy transcripts and observations. How do you turn this chaos into clear design requirements? Through <strong>Affinity Diagramming</strong>:
    </p>
    <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Extract Atomic Quotes:</strong> Write each standalone observation, quote, or struggle onto an individual sticky note in FigJam or Miro.</li>
      <li><strong>Cluster Organically:</strong> Without speaking or arguing, group related notes together based on natural patterns (e.g., "Confusion about pricing", "Mobile keyboard errors", "Security skepticism").</li>
      <li><strong>Name the Thematic Pillars:</strong> Give each cluster a descriptive title stating the core human struggle.</li>
      <li><strong>Prioritize by Frequency & Impact:</strong> Identify which themes recurred across the majority of participants and impacted task completion most severely.</li>
    </ol>

    <h2 id="res-personas">7. Constructing Actionable Personas & Empathy Maps</h2>
    <p>
      A persona is not a fictional character with a random stock photo and irrelevant trivia like <em>"Drives a Honda and drinks oat lattes."</em> An actionable design persona is a composite archetype grounded strictly in behavioral research data. It documents:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Primary Objective:</strong> What specific outcome must they achieve to feel successful?</li>
      <li><strong>Core Friction Points:</strong> What obstacles currently waste their time or trigger anxiety?</li>
      <li><strong>Mental Model & Tech Comfort:</strong> How do they conceptualize the system, and what analogies do they rely on?</li>
      <li><strong>Decision Triggers:</strong> What makes them trust or abandon a digital service?</li>
    </ul>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        MY
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Mona Yang</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the comprehensive research publication <em>"The Essential Guide to User Research & Field Inquiry"</em> by Mona Yang on UX Planet.
        </p>
        <a 
          href="https://uxplanet.org/ultimate-guide-to-user-research-bed4a57d260" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on UX Planet</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          },
          {
            id: 'sb-2-2',
            slug: 'ten-usability-heuristics-with-severity-matrix',
            title: 'The 10 Usability Heuristics for User Interface Design',
            module: 'Unit 2: User Research & Discovery',
            unitNumber: 2,
            lessonNumber: '2.2',
            type: 'article',
            readTime: '26 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
            originalSourceLabel: 'Jakob Nielsen / Nielsen Norman Group',
            
            summaryQuote: 'Heuristics are not rigid laws; they are broad rules of thumb derived from thirty years of empirical usability observation across thousands of software systems.',
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
      <strong class="font-sans text-xs uppercase font-bold text-teal-800 dark:text-teal-300 block mb-1">// Concrete Implementation</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-blue-800 dark:text-blue-300 block mb-1">// Concrete Implementation</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-amber-800 dark:text-amber-300 block mb-1">// Concrete Implementation</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-indigo-800 dark:text-indigo-300 block mb-1">// Jakob's Law of the Web</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-rose-800 dark:text-rose-300 block mb-1">// Slips vs. Mistakes</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-teal-800 dark:text-teal-300 block mb-1">// Cognitive Principle</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-blue-800 dark:text-blue-300 block mb-1">// Dual-Paced Interfaces</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-amber-800 dark:text-amber-300 block mb-1">// Signal-to-Noise Ratio</strong>
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
      <strong class="font-sans text-xs uppercase font-bold text-rose-800 dark:text-rose-300 block mb-1">// Anatomy of a Great Error State</strong>
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
            <td class="py-3 px-4 font-mono font-bold text-teal-800 dark:text-teal-300">0</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Not a usability problem at all.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">No action required.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-blue-800 dark:text-blue-300">1</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Cosmetic problem only.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">Fix only if extra design sprint capacity exists.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-amber-800 dark:text-amber-300">2</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Minor usability problem.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">Low priority fix; causes slight user friction.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-orange-800 dark:text-orange-300">3</td>
            <td class="py-3 px-4 text-ink dark:text-dark-ink">Major usability problem.</td>
            <td class="py-3 px-4 text-ink-muted dark:text-dark-muted">High priority fix; frequently blocks users from task completion.</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-rose-800 dark:text-rose-300">4</td>
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Nielsen Norman Group</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          }
        ]
      },
      {
        id: 'mod-3',
        number: 3,
        title: 'Unit 3: Information Architecture & User Flows',
        description: 'Rosenfeld & Morvilles 4 IA systems, open/closed card sorting, tree testing, and taxonomy.',
        lessons: [
          {
            id: 'sb-3-1',
            slug: 'information-architecture-and-card-sorting',
            title: 'Information Architecture: The Structural Blueprint of Digital Products',
            module: 'Unit 3: Information Architecture & User Flows',
            unitNumber: 3,
            lessonNumber: '3.1',
            type: 'article',
            readTime: '22 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/ia-study-guide/',
            originalSourceLabel: 'Page Laubheimer / Nielsen Norman Group',
            
            summaryQuote: 'Information architecture is the practice of deciding how to arrange the parts of something to be understandable.',
            outline: [
          {
                    "id": "ia-what-is",
                    "title": "1. What Information Architecture Really Is",
                    "level": 2
          },
          {
                    "id": "ia-four-systems",
                    "title": "2. The Four Core Systems of IA",
                    "level": 2
          },
          {
                    "id": "ia-top-down-bottom-up",
                    "title": "3. Top-Down vs. Bottom-Up Architecture",
                    "level": 2
          },
          {
                    "id": "ia-card-sorting",
                    "title": "4. Card Sorting Methodologies: Open, Closed & Hybrid",
                    "level": 2
          },
          {
                    "id": "ia-tree-testing",
                    "title": "5. Tree Testing: Validating Hierarchy Before Visual Design",
                    "level": 2
          },
          {
                    "id": "ia-taxonomy",
                    "title": "6. Taxonomy Structures: Flat, Hierarchical & Faceted",
                    "level": 2
          },
          {
                    "id": "ia-sitemaps",
                    "title": "7. Designing Resilient Sitemaps & Navigation Schemas",
                    "level": 2
          }
],
            
            contentHtml: `

    <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
      If content is the raw material of the internet, <strong>Information Architecture (IA)</strong> is the structural steel and concrete that keeps the building standing. Without sound information architecture, even the most beautifully styled interface degenerates into an incomprehensible labyrinth where users get lost and abandon their tasks.
    </p>

    <h2 id="ia-what-is">1. What Information Architecture Really Is</h2>
    <p>
      Information architecture is the art and science of organizing, labeling, and structuring websites, intranets, and mobile software to support usability and findability. Richard Saul Wurman coined the term in 1976, predicting that the explosion of digital information would create a desperate need for architects who could make complex data understandable.
    </p>
    <p>
      In digital product design, IA bridges the gap between what users are trying to accomplish and the vast repository of content, tools, and records stored in backend databases.
    </p>

    <!-- Pullout Axiom -->
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"Information architecture is the structural design of shared information environments. It is deciding how to arrange the parts of something so that human minds can find, understand, and use it."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Louis Rosenfeld & Peter Morville &mdash; "The Polar Bear Book"
      </footer>
    </blockquote>

    <h2 id="ia-four-systems">2. The Four Core Systems of IA</h2>
    <p>
      In their seminal publication <em>Information Architecture for the World Wide Web</em>, Lou Rosenfeld and Peter Morville established the four foundational systems that govern every digital product:
    </p>

    <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-5 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-teal-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">System 01</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Organization Systems</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          How information is categorized and grouped (e.g., chronological, alphabetical, geographical, or topic-based).
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-blue-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">System 02</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Labeling Systems</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          How categories and links are named so users predict their contents before clicking (e.g., "Settings" vs. "Preferences").
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-amber-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block mb-1">System 03</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Navigation Systems</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          The physical pathways that allow users to move through content (global header menus, breadcrumbs, contextual hyperlinks).
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-l-4 border-l-indigo-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase block mb-1">System 04</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Search Systems</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          How users query the database directly, including autocomplete indexing, filter algorithms, and zero-state search suggestions.
        </p>
      </div>
    </div>

    <h2 id="ia-top-down-bottom-up">3. Top-Down vs. Bottom-Up Architecture</h2>
    <p>
      Information architects operate in two opposing yet complementary directions:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li>
        <strong>Top-Down IA:</strong> Starts from the highest strategic level (the homepage or main dashboard) and subdivides content into major modules, sub-pages, and individual screens. It asks: <em>"How do we guide a new visitor from the front door to their destination?"</em>
      </li>
      <li>
        <strong>Bottom-Up IA:</strong> Starts at the individual content item or article level. Users frequently land deep inside a product via Google search or social links without ever seeing the homepage. Bottom-up IA asks: <em>"When a user lands directly on this single article, how do metadata tags and contextual links help them understand where they are and what to read next?"</em>
      </li>
    </ul>

    <h2 id="ia-card-sorting">4. Card Sorting Methodologies: Open, Closed & Hybrid</h2>
    <p>
      How do you know what category names make sense to users? Never guess in an internal meeting; run <strong>Card Sorting</strong> studies with real participants:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-5 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">Type A</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Open Card Sort</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Participants sort 30&ndash;50 content cards into groups and invent their own category names. Best for discovering natural user mental models early.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">Type B</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Closed Card Sort</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Participants sort cards into pre-determined categories you established. Best for testing whether your existing navigation buckets are clear.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block mb-1">Type C</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Hybrid Card Sort</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          Participants sort into pre-determined buckets, but are permitted to create new category labels if something does not fit.
        </p>
      </div>
    </div>

    <h2 id="ia-tree-testing">5. Tree Testing: Validating Hierarchy Before Visual Design</h2>
    <p>
      While Card Sorting tests categorization, <strong>Tree Testing</strong> (reverse card sorting) tests findability. You strip away all styling, images, and search boxes, giving users a bare text tree of your navigation menu. You give them a prompt (e.g., <em>"Find where to update your billing currency"</em>) and measure:
    </p>
    <ul class="list-disc pl-6 space-y-1 my-4 font-serif text-base text-ink dark:text-dark-ink">
      <li><strong>Directness:</strong> Did they click straight to the right folder, or did they backtrack?</li>
      <li><strong>Success Rate:</strong> Did they locate the correct destination?</li>
      <li><strong>Time to Task:</strong> How many seconds did they spend reading category labels?</li>
    </ul>

    <h2 id="ia-taxonomy">6. Taxonomy Structures: Flat, Hierarchical & Faceted</h2>
    <p>
      Different content types demand different structural topologies:
    </p>
    <ul class="list-disc pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
      <li><strong>Hierarchical (Tree):</strong> Classic parent-child structure (e.g., <em>Home &rarr; Electronics &rarr; Audio &rarr; Headphones</em>). Easy to understand, but deep trees increase click fatigue.</li>
      <li><strong>Flat:</strong> Few or no subcategories (e.g., simple landing pages or mobile utilities). Fast to scan, but collapses under large content volumes.</li>
      <li><strong>Faceted Navigation:</strong> Users filter items simultaneously across multiple independent dimensions (e.g., <em>Price, Brand, Size, Rating, Color</em> on Amazon). The gold standard for modern e-commerce and knowledge bases.</li>
    </ul>

    <h2 id="ia-sitemaps">7. Designing Resilient Sitemaps & Navigation Schemas</h2>
    <p>
      A great sitemap balances <strong>breadth</strong> (how many options appear at each menu level) and <strong>depth</strong> (how many clicks are required to reach the deepest content node). Aim for the <strong>Rule of 7 &plusmn; 2</strong>: keep top-level navigation menus to between 5 and 7 concise items to respect human working memory limits.
    </p>

    <!-- Derivative Attribution Footer -->
    <footer class="mt-16 pt-8 border-t border-ink-border/80 dark:border-dark-border not-prose flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-paper-200 dark:bg-dark-card border border-ink-border dark:border-dark-border flex items-center justify-center font-serif font-bold text-ink dark:text-dark-ink shrink-0">
        PL
      </div>
      <div class="text-xs font-serif leading-relaxed text-ink dark:text-dark-ink">
        <div class="font-sans font-semibold text-sm">Derivative Study Companion &mdash; Page Laubheimer</div>
        <p class="text-ink-muted dark:text-dark-muted mt-0.5">
          Synthesized from the comprehensive architecture curriculum <em>"Information Architecture: Study Guide"</em> by Page Laubheimer at Nielsen Norman Group.
        </p>
        <a 
          href="https://www.nngroup.com/articles/ia-study-guide/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Nielsen Norman Group</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          }
        ]
      },
      {
        id: 'mod-4',
        number: 4,
        title: 'Unit 4: Wireframing & Sketching',
        description: 'Rapid ideation on paper, the Crazy 8s technique, and reusable UI design patterns.',
        lessons: [
          {
            id: 'sb-4-1',
            slug: 'the-art-of-ux-sketching',
            title: 'The Messy Art of UX Sketching & Rapid Ideation',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.1',
            type: 'article',
            readTime: '20 min',
            originalSourceUrl: 'https://www.smashingmagazine.com/2011/12/the-messy-art-of-ux-sketching/',
            originalSourceLabel: 'Peiter Buick / Smashing Magazine',
            
            summaryQuote: 'Sketching is not about drawing pretty pictures; it is about thinking visually on paper so you can fail fast, iterate fearlessly, and find the best ideas.',
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
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"The primary value of a sketch is not the artifact on the page; it is the mental clarity gained by the designer while making the marks."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // Peiter Buick &mdash; Smashing Magazine
      </footer>
    </blockquote>

    <h2 id="sk-psychology-lofi">2. The Psychology of Low Fidelity: Inviting Honest Critique</h2>
    <p>
      The visual fidelity of a design directly dictates the quality of feedback you receive from stakeholders:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-rose-800 dark:text-rose-300 uppercase block mb-1">High-Fidelity Mockup</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Triggers Superficial Feedback</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          When stakeholders see a polished screen with photos and colors, they assume the architectural decisions are finished. They debate button colors, font sizes, and hero image models while ignoring broken task flows.
        </p>
      </div>

      <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">Rough Pen Sketch</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-2">Triggers Structural Feedback</h4>
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original publication on Smashing Magazine</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          }
        ]
      },
      {
        id: 'mod-5',
        number: 5,
        title: 'Unit 5: Interactive Prototyping',
        description: 'Building clickable prototypes, micro-interactions, and component states in modern tools.',
        lessons: [
          {
            id: 'sb-5-1',
            slug: 'interactive-prototyping-in-figma',
            title: 'Interactive Prototyping: From Static Artboards to Dynamic Logic',
            module: 'Unit 5: Interactive Prototyping',
            unitNumber: 5,
            lessonNumber: '5.1',
            type: 'article',
            readTime: '22 min',
            originalSourceUrl: 'https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma',
            originalSourceLabel: 'Figma Learn Documentation',
            
            summaryQuote: 'Prototypes are not static pictures; they are living simulations of logic, feedback, and motion that bridge the gap between design and code.',
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
    <blockquote class="my-10 pl-6 border-l-3 border-amber-600 dark:border-amber-500 font-serif italic text-lg sm:text-xl text-ink dark:text-dark-ink leading-relaxed bg-amber-500/5 py-4 pr-4 rounded-r-xs">
      <p>"If a picture is worth a thousand words, an interactive prototype is worth a thousand meetings."</p>
      <footer class="mt-2 text-xs sm:text-sm font-mono not-italic text-amber-800 dark:text-amber-300 font-bold tracking-wide uppercase">
        // IDEO Prototyping Canon
      </footer>
    </blockquote>

    <h2 id="pr-anatomy">2. Anatomy of an Interaction: Triggers, Actions & Transitions</h2>
    <p>
      Every interaction in tools like Figma is composed of three interconnected parts:
    </p>
    <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-5 not-prose">
      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-teal-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">Part 01</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Trigger</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          The physical user gesture that initiates the event: <em>On Click, While Hovering, While Pressing, On Drag, or After Delay</em>.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-blue-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">Part 02</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Action</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          What the system does in response: <em>Navigate to screen, Open overlay, Swap variant, Scroll to anchor, or Set variable</em>.
        </p>
      </div>

      <div class="p-5 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border border-t-3 border-t-indigo-500 shadow-2xs">
        <span class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase block mb-1">Part 03</span>
        <h4 class="font-sans font-bold text-base text-ink dark:text-dark-ink mb-1">Transition & Easing</h4>
        <p class="text-sm font-serif text-ink dark:text-dark-ink leading-relaxed">
          The temporal physics of the movement: <em>Instant, Dissolve, Smart Animate, Slide In, or Push</em>, tuned with cubic-bezier curves (e.g., 300ms ease-out).
        </p>
      </div>
    </div>

    <h2 id="pr-smart-animate">3. Mastering Smart Animate: Layer Names & Spatial Continuity</h2>
    <p>
      Figma's <strong>Smart Animate</strong> engine calculates the delta between two artboards and automatically interpolates differences in position, scale, opacity, corner radius, and fill color.
    </p>
    <div class="my-6 p-4 rounded-xs bg-paper-100 dark:bg-dark-card border-l-3 border-indigo-600 dark:border-indigo-500 font-serif text-sm text-ink dark:text-dark-ink">
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
          class="inline-flex items-center gap-1 mt-2 text-ink dark:text-dark-ink font-sans font-medium underline underline-offset-2 hover:text-black dark:hover:text-white"
        >
          <span>View original documentation on Figma Help Center</span>
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </footer>
  
            `,
          }
        ]
      },
      {
        id: 'mod-6',
        number: 6,
        title: 'Unit 6: UI & Visual Design Fundamentals',
        description: 'Design systems, color theory, typography, button ergonomics, and accessibility standards.',
        lessons: [
          {
            id: 'sb-6-1',
            slug: 'ui-design-fundamentals-and-color',
            title: 'Visual Design Fundamentals: Color Systems, Typography & Spatial Rhythm',
            module: 'Unit 6: UI & Visual Design Fundamentals',
            unitNumber: 6,
            lessonNumber: '6.1',
            type: 'article',
            readTime: '45 min read',
            originalSourceUrl: 'https://dribbble.com/resources/ui-design-fundamentals',
            originalSourceLabel: 'Stefano Peschiera & Material Design Architecture Team',
            
            summaryQuote: 'Visual design in product software is functional architecture: guiding user attention effortlessly through contrast, scale, and spatial rhythm.',
            outline: [
          {
                    "id": "sb-6-1-sec-1",
                    "title": "1. The 60-30-10 Color Harmonization Rule",
                    "level": 2
          },
          {
                    "id": "sb-6-1-sec-2",
                    "title": "2. Typography: The Modular Scale & Baseline Rhythm",
                    "level": 2
          },
          {
                    "id": "sb-6-1-sec-3",
                    "title": "3. Spatial Rhythm: The 8-Point Grid System",
                    "level": 2
          },
          {
                    "id": "sb-6-1-sec-4",
                    "title": "4. Accessibility & Human Interface Ergonomics",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light">
    Visual design in digital products is not decoration; it is functional architecture. Where UX design establishes the skeleton and behavioral pathways of an interface, user interface (UI) design translates cognitive affordances into visual form. Every pixel, margin, and color swatch either clarifies system intent or burdens the user's working memory.
  </p>
  
  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-4 border-ink">
    <p class="text-lg italic font-serif text-ink">
      "Design is not just what it looks like and feels like. Design is how it works. A beautiful interface that confuses the user is fundamentally broken engineering."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted">
      — Design Axiom: Form Follows Cognitive Function
    </cite>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-6-1-sec-1">1. The 60-30-10 Color Harmonization Rule</h2>
  <p class="text-ink leading-relaxed">
    Rooted in interior decorating and classical architecture, the <strong>60-30-10 rule</strong> prevents visual chaos in user interfaces:
  </p>
  <ul class="list-disc pl-6 space-y-3 text-ink">
    <li><strong>60% Dominant Base:</strong> Typically neutral canvas (pure white <code>#FFFFFF</code> or clean paper off-white <code>#FAFAFA</code> in light mode; deep carbon ink in dark mode). This creates negative space and prevents visual fatigue.</li>
    <li><strong>30% Secondary Structure:</strong> Cards, sidebars, navigation bars, borders, and secondary text. In our design system, this is represented by zinc neutrals (<code>#E4E4E7</code> borders, <code>#71717A</code> muted typography).</li>
    <li><strong>10% Intentional Accent:</strong> High-energy semantic color reserved exclusively for primary calls to action (CTAs), progress indicators, active tabs, and key interactive focal points. Never scatter accent colors across passive layout elements.</li>
  </ul>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border rounded-none">
    <h3 class="text-lg font-serif font-semibold text-ink mb-3">Color Architecture: HSL-Based Semantic Tokens</h3>
    <p class="text-ink text-sm leading-relaxed mb-4">
      Modern design systems do not use static hex colors directly in components. Instead, colors are generated as semantic tokens along an HSL (Hue, Saturation, Lightness) scale:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
      <div class="p-3 bg-white border border-ink-border">
        <span class="font-bold block text-ink">Base 50–100</span>
        <span class="text-ink-muted">Lightness 95–98%</span>
        <p class="mt-2 text-ink-muted font-sans">Used for card fills, table zebra striping, and subtle selection states.</p>
      </div>
      <div class="p-3 bg-white border border-ink-border">
        <span class="font-bold block text-ink">Core 500–600</span>
        <span class="text-ink-muted">Lightness 40–55%</span>
        <p class="mt-2 text-ink-muted font-sans">The signature brand hue. Used for primary buttons and active navigational indicators.</p>
      </div>
      <div class="p-3 bg-white border border-ink-border">
        <span class="font-bold block text-ink">Deep 800–900</span>
        <span class="text-ink-muted">Lightness 10–20%</span>
        <p class="mt-2 text-ink-muted font-sans">Used for high-contrast typography and active pressed states.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-6-1-sec-2">2. Typography: The Modular Scale & Baseline Rhythm</h2>
  <p class="text-ink leading-relaxed">
    Typography represents more than 90% of web interfaces. Arbitrary font sizes create visual friction. World-class interfaces derive all type scales from a mathematical ratio (such as the Major Second <code>1.125</code> or the Minor Third <code>1.200</code>):
  </p>

  <div class="editorial-matrix my-6 overflow-x-auto">
    <table class="w-full text-left text-sm border-collapse border border-ink-border">
      <thead>
        <tr class="bg-paper-100 border-b border-ink-border">
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Token</th>
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Computed Size</th>
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Line Height</th>
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Target Usage</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border">
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-xs</td>
          <td class="p-3 font-mono text-xs">12px (0.75rem)</td>
          <td class="p-3 font-mono text-xs">16px (1.33)</td>
          <td class="p-3 text-ink-muted">Metadata, timestamps, uppercase category labels, badges</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-sm</td>
          <td class="p-3 font-mono text-xs">14px (0.875rem)</td>
          <td class="p-3 font-mono text-xs">20px (1.43)</td>
          <td class="p-3 text-ink-muted">Dense table data, UI buttons, sidebar navigation items</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-base</td>
          <td class="p-3 font-mono text-xs">16px (1.000rem)</td>
          <td class="p-3 font-mono text-xs">24px (1.50)</td>
          <td class="p-3 text-ink-muted">Standard long-form editorial body prose, input fields</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-lg</td>
          <td class="p-3 font-mono text-xs">18px (1.125rem)</td>
          <td class="p-3 font-mono text-xs">28px (1.55)</td>
          <td class="p-3 text-ink-muted">Introductory lead paragraphs, pull quotes, card headers</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-2xl</td>
          <td class="p-3 font-mono text-xs">24px (1.500rem)</td>
          <td class="p-3 font-mono text-xs">32px (1.33)</td>
          <td class="p-3 text-ink-muted">Section headers (H2), major modal headings</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">text-4xl</td>
          <td class="p-3 font-mono text-xs">36px (2.250rem)</td>
          <td class="p-3 font-mono text-xs">40px (1.11)</td>
          <td class="p-3 text-ink-muted">Page titles (H1), hero headline displays</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="editorial-callout my-6 p-5 bg-paper-100 border-l-2 border-ink">
    <h4 class="font-mono text-xs uppercase tracking-widest text-ink mb-1">Typographic Golden Rule: Measure & Leading</h4>
    <p class="text-sm text-ink leading-relaxed">
      Optimal reading comfort requires a line length (<strong>measure</strong>) between <strong>45 and 75 characters</strong> (including spaces). Lines that are too wide cause the reader's eye to lose its place when returning to the left margin. Lines that are too narrow break reading rhythm. Furthermore, as type size increases, line-height (<strong>leading</strong>) must proportionally tighten.
    </p>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-6-1-sec-3">3. Spatial Rhythm: The 8-Point Grid System</h2>
  <p class="text-ink leading-relaxed">
    Why do leading tech companies (Apple, Google, Stripe, Airbnb) align all padding, margins, and component dimensions to multiples of <strong>8 pixels</strong> (and a half-step 4px unit)?
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink">
    <li><strong>Screen Scaling Precision:</strong> Modern display resolutions (1x, 2x Retina, 3x Super Retina, 1.5x Android hdpi) scale numbers divisible by 8 cleanly into whole integers without anti-aliasing blur or sub-pixel distortion.</li>
    <li><strong>Decision Velocity:</strong> Eliminates endless designer-developer debate between 13px vs 15px margins. The options are strictly: <code>4px, 8px, 16px, 24px, 32px, 48px, 64px</code>.</li>
    <li><strong>Cognitive Cohesion:</strong> Interfaces built on an 8pt grid possess an innate subconscious mathematical balance.</li>
  </ul>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-6-1-sec-4">4. Accessibility & Human Interface Ergonomics</h2>
  <p class="text-ink leading-relaxed">
    Aesthetic refinement without inclusive ergonomics is poor craftsmanship. Professional UI design adheres to rigid legal and biological standards:
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-ink-border bg-white">
      <h4 class="font-serif font-semibold text-ink mb-2">WCAG 2.1 Contrast Ratios</h4>
      <p class="text-xs text-ink-muted mb-3">Enforced by international law (European Accessibility Act & ADA Title III):</p>
      <ul class="space-y-2 text-xs text-ink">
        <li><strong>4.5 : 1 (AA Minimum):</strong> Required for regular body text below 18px.</li>
        <li><strong>3.0 : 1 (AA Large):</strong> Permitted for bold text 14px+ or regular text 18px+.</li>
        <li><strong>7.0 : 1 (AAA Enhanced):</strong> Publication-grade target for critical legibility and aging eyes.</li>
        <li><strong>3.0 : 1 (UI Components):</strong> Required for form input borders, checkboxes, and active icons.</li>
      </ul>
    </div>
    <div class="p-5 border border-ink-border bg-white">
      <h4 class="font-serif font-semibold text-ink mb-2">Touch Target Ergonomics</h4>
      <p class="text-xs text-ink-muted mb-3">Based on human thumb contact pads (10mm x 10mm):</p>
      <ul class="space-y-2 text-xs text-ink">
        <li><strong>Minimum Target Size:</strong> 44 x 44 CSS pixels (Apple HIG) or 48 x 48 dp (Google Material 3).</li>
        <li><strong>Visual Size vs Tap Target:</strong> An icon can visually measure 20x20px, but its transparent clickable bounding box MUST expand to at least 44x44px.</li>
        <li><strong>Target Separation:</strong> Maintain at least 8px spacing between adjacent touch targets to eliminate accidental taps.</li>
      </ul>
    </div>
  </div>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border">
    <h3 class="text-lg font-serif font-semibold text-ink mb-2">Self-Assessment Checklist for UI Polish</h3>
    <div class="space-y-2 text-sm text-ink">
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold">[ ]</span>
        <span>Are all spacings and margins derived strictly from the 8-point spatial system?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold">[ ]</span>
        <span>Does the primary accent color account for no more than 10% of total screen surface area?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold">[ ]</span>
        <span>Have you verified with a contrast checker that all secondary text meets at least 4.5:1 against the canvas?</span>
      </label>
      <label class="flex items-start gap-2">
        <span class="font-mono text-ink font-bold">[ ]</span>
        <span>Do all interactive mobile touch targets have an active hit area of at least 44x44 CSS pixels?</span>
      </label>
    </div>
  </div>
</section>

            `,
          }
        ]
      },
      {
        id: 'mod-7',
        number: 7,
        title: 'Unit 7: Usability Testing & Validation',
        description: 'Moderated testing protocols, the Five-Act Interview, task success metrics, and synthesis.',
        lessons: [
          {
            id: 'sb-7-1',
            slug: 'moderated-usability-testing-and-the-five-act-interview',
            title: 'Usability Testing 101: The Google Ventures Five-Act Interview Protocol',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.1',
            type: 'video',
            readTime: '40 min study (Video + Interactive Protocol)',
            originalSourceUrl: 'https://www.youtube.com/watch?v=U9ZG19XTbd4',
            originalSourceLabel: 'Michael Margolis & Jake Knapp (Google Ventures Design Sprint)',
            youtubeId: 'U9ZG19XTbd4',
            summaryQuote: 'Watching just five real customers interact with your prototype uncovers 85% of all usability problems before writing production code.',
            outline: [
          {
                    "id": "sb-7-1-sec-1",
                    "title": "Why Exactly Five Users? (The Nielsen-Landauer Mathematical Proof)",
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
  <p class="text-xl leading-relaxed text-ink font-serif font-light">
    Usability testing is not a focus group, nor is it market research. It is an empirical observation of a human being interacting with your prototype to accomplish authentic tasks. In the Google Ventures Design Sprint methodology, Friday is dedicated entirely to testing your prototype with five real customers. Michael Margolis, Research Partner at Google Ventures, developed the <strong>Five-Act Interview</strong> to turn high-stakes testing into a repeatable, comfortable conversation that reveals critical flaws before building expensive software.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-4 border-ink">
    <p class="text-lg italic font-serif text-ink">
      "Watching real people struggle with your prototype is emotionally painful, but it is a hundred times cheaper than launching a product that nobody can figure out how to use."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted">
      — Michael Margolis, Google Ventures Research Partner
    </cite>
  </div>

  <div class="editorial-callout my-6 p-4 bg-paper-100 border border-ink-border flex items-center justify-between">
    <div class="text-sm font-mono text-ink">
      <span class="font-bold">Interactive Video Transcript:</span> Click any timestamp to jump the video directly to that act.
    </div>
    <span class="text-xs font-mono uppercase tracking-widest text-ink-muted">Google Ventures / Sprint</span>
  </div>

  <!-- ACT 1 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-200" data-timestamp="0">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink">Act 1: The Friendly Welcome & Psychological Safety</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors" data-seek-time="0">
        00:00 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3">
      Participants enter the session nervous. They assume they are taking a test and fear looking incompetent. Your first task is to dismantle their anxiety completely:
    </p>
    <div class="p-4 bg-paper-50 border-l-2 border-ink text-sm space-y-2">
      <p class="font-bold text-ink">Verbatim Protocol Script:</p>
      <p class="italic text-ink">
        "Thank you so much for joining us today! Before we get started, let me explain how this works. We are testing a new product concept, and we want to see how it works for real people like you. <strong>I want to emphasize: we are testing the product, not you.</strong> You cannot do or say anything wrong here. In fact, if you get confused, that is the most helpful thing you can show us, because it tells us where the product is broken."
      </p>
      <p class="italic text-ink">
        "Also, I didn't design this myself, so you won't hurt my feelings. Please be brutally honest. As we go through, please <strong>think aloud</strong>—tell me what you are looking at, what you expect to happen, and what puzzles you."
      </p>
    </div>
  </div>

  <!-- ACT 2 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-200" data-timestamp="75">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink">Act 2: Context Questions & Background Warm-up</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors" data-seek-time="75">
        01:15 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3">
      Spend 5 to 7 minutes asking about the participant's daily routine, habits, and existing tools before showing any screens. This contextualizes their later reactions:
    </p>
    <ul class="list-disc pl-6 space-y-2 text-ink text-sm">
      <li><strong>Current Workflows:</strong> "How do you currently handle [problem area] today? What tools or apps do you rely on?"</li>
      <li><strong>Pain Points:</strong> "What is the most frustrating part of that process? When was the last time that happened?"</li>
      <li><strong>Vocabulary Calibration:</strong> Note the exact words they use to describe their domain. Notice if your product uses corporate jargon that clashes with their natural terminology.</li>
    </ul>
  </div>

  <!-- ACT 3 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-200" data-timestamp="210">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink">Act 3: Introducing the Prototype</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors" data-seek-time="210">
        03:30 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3">
      Bring out the device or load the Figma prototype without explaining what it does. Set expectations about prototype fidelity:
    </p>
    <div class="p-4 bg-paper-50 border-l-2 border-ink text-sm">
      <p class="italic text-ink">
        "This is an early prototype. Some buttons might not click, and some data is just placeholder text. If something doesn't respond, just let me know what you would have expected to happen. Take a look at this initial screen—without clicking anything yet, what do you make of this? What do you think this is for?"
      </p>
    </div>
  </div>

  <!-- ACT 4 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-200" data-timestamp="315">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink">Act 4: Tasks, Scenarios & The Art of Non-Directive Nudging</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors" data-seek-time="315">
        05:15 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3">
      Give the participant an authentic goal, not a button-by-button instruction checklist:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs font-mono">
      <div class="p-4 bg-red-50/40 border border-red-200 text-ink">
        <span class="font-bold text-red-700 block mb-1">BAD: Leading Instruction</span>
        "Please click the blue 'Export' button in the top right and save this file as a CSV."
        <p class="mt-2 text-ink-muted font-sans">This tests reading comprehension, not interface usability.</p>
      </div>
      <div class="p-4 bg-emerald-50/40 border border-emerald-200 text-ink">
        <span class="font-bold text-emerald-700 block mb-1">GOOD: Scenario-Based Goal</span>
        "Imagine you need to share last month's financial numbers with your accountant. How would you accomplish that here?"
        <p class="mt-2 text-ink-muted font-sans">Allows the user to search, interpret labels, and reveal their natural mental model.</p>
      </div>
    </div>
    <div class="editorial-callout my-4 p-4 bg-paper-50 border border-ink-border text-sm">
      <h4 class="font-mono text-xs uppercase font-bold text-ink mb-1">The Boomerang Technique</h4>
      <p class="text-ink">
        When the participant gets stuck and asks: <em>"What does this button do?"</em> or <em>"Did I do this right?"</em>, <strong>never answer directly</strong>. Throw the question back with a warm smile:
      </p>
      <p class="italic text-ink mt-2">
        "What do you think it does?" / "What would you expect to happen if you tapped that?"
      </p>
    </div>
  </div>

  <!-- ACT 5 -->
  <div class="video-transcript-block p-6 my-6 border border-ink-border bg-white transition-colors duration-200" data-timestamp="525">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-serif font-semibold text-ink">Act 5: Quick Debrief & The Magic Wand Question</h3>
      <button class="timestamp-btn font-mono text-xs px-2.5 py-1 border border-ink-border hover:bg-paper-100 text-ink transition-colors" data-seek-time="525">
        08:45 - Jump
      </button>
    </div>
    <p class="text-ink leading-relaxed mb-3">
      Wrap up the session with reflective, summarizing questions that reveal overarching mental impressions:
    </p>
    <ul class="list-disc pl-6 space-y-2 text-ink text-sm">
      <li>"How would you describe this tool to a colleague in your own words?"</li>
      <li>"What was the most intuitive part? What felt clumsy or unnatural?"</li>
      <li><strong>The Magic Wand:</strong> "If you had a magic wand and could change one single thing about how this worked, what would it be?"</li>
    </ul>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-7-1-sec-1">Why Exactly Five Users? (The Nielsen-Landauer Mathematical Proof)</h2>
  <p class="text-ink leading-relaxed">
    Designers frequently ask: <em>"Isn't 5 users too small of a sample size to make major product decisions?"</em> Jakob Nielsen and Thomas Landauer proved mathematically that the number of usability problems found in an interface follows the Poisson distribution formula:
  </p>
  <div class="editorial-axiom my-6 p-4 bg-paper-100 font-mono text-center text-sm border border-ink-border">
    U(n) = N * (1 - (1 - L)^n)
  </div>
  <p class="text-ink text-sm leading-relaxed">
    Where <code>N</code> is the total number of usability issues in the design, and <code>L</code> is the proportion of usability issues discovered by a single user (empirically averaged at <code>31%</code> across hundreds of studies):
  </p>
  <ul class="list-disc pl-6 space-y-2 text-ink text-sm mt-3">
    <li><strong>1 User:</strong> Discovers ~31% of total usability flaws.</li>
    <li><strong>2 Users:</strong> Discovers ~53% of flaws.</li>
    <li><strong>3 Users:</strong> Discovers ~68% of flaws.</li>
    <li><strong>5 Users:</strong> Discovers <strong>~85%</strong> of all usability defects.</li>
  </ul>
  <p class="text-ink text-sm leading-relaxed mt-3">
    Beyond five users, you encounter diminishing returns: the same issues are repeated, wasting research budget that would be far better spent iterating the design and running a second 5-user study.
  </p>

  <div class="editorial-card my-8 p-6 bg-paper-50 border border-ink-border">
    <h3 class="text-lg font-serif font-semibold text-ink mb-3">Synthesizing Notes on Friday Afternoon</h3>
    <p class="text-ink text-sm leading-relaxed mb-3">
      While the interviewer conducts sessions in the testing room, the rest of the sprint team watches the live feed in an observation room. Team members write raw observations on sticky notes using color coding:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
      <div class="p-3 bg-emerald-50 border border-emerald-200">
        <span class="font-bold block text-emerald-900">Green Sticky Notes</span>
        User completed task smoothly; positive feedback; validated assumption.
      </div>
      <div class="p-3 bg-red-50 border border-red-200">
        <span class="font-bold block text-red-900">Red Sticky Notes</span>
        User failed task; confusion; incorrect interpretation of UI pattern.
      </div>
      <div class="p-3 bg-amber-50 border border-amber-200">
        <span class="font-bold block text-amber-900">Yellow Sticky Notes</span>
        Neutral observation; interesting quote; unexpected workflow habit.
      </div>
    </div>
  </div>
</section>

            `,
          }
        ]
      },
      {
        id: 'mod-8',
        number: 8,
        title: 'Unit 8: Career Pathways & Industry Navigation',
        description: 'Building an authentic case study portfolio, interviewing, and thriving in the AI era.',
        lessons: [
          {
            id: 'sb-8-1',
            slug: 'breaking-into-ux-and-career-strategy',
            title: 'UX Career Strategy: Crafting High-Impact Case Studies & Thriving in the AI Era',
            module: 'Unit 8: Career Pathways & Industry Navigation',
            unitNumber: 8,
            lessonNumber: '8.1',
            type: 'article',
            readTime: '50 min study',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-design-portfolio-guide/',
            originalSourceLabel: 'Springboard Design Mentorship Board & Principal Design Leaders',
            
            summaryQuote: 'Standout UX portfolios do not showcase decorative mockups; they prove business acumen, constraint management, and rigorous human-centered validation.',
            outline: [
          {
                    "id": "sb-8-1-sec-1",
                    "title": "1. Anatomy of a World-Class Case Study",
                    "level": 2
          },
          {
                    "id": "sb-8-1-sec-2",
                    "title": "2. The 5-Step Whiteboard Challenge Playbook",
                    "level": 2
          },
          {
                    "id": "sb-8-1-sec-3",
                    "title": "3. Thriving in the AI-Augmented Era of UX",
                    "level": 2
          }
],
            
            contentHtml: `

<section class="lesson-section space-y-6">
  <p class="text-xl leading-relaxed text-ink font-serif font-light">
    A design portfolio is not an art gallery; it is a proof of problem-solving capability. Hiring managers spend an average of less than 90 seconds scanning a UX portfolio before deciding whether to advance a candidate to the interview loop. If your case studies present only polished final Dribbble-style mockups without demonstrating how you navigated constraints, made trade-offs, and validated assumptions with real humans, your application will be filtered out.
  </p>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-4 border-ink">
    <p class="text-lg italic font-serif text-ink">
      "Junior designers show what they built. Senior designers show why they built it, what went wrong along the way, how they validated it, and what measurable impact it produced for the business."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted">
      — Principal Design Director, San Francisco
    </cite>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-8-1-sec-1">1. Anatomy of a World-Class Case Study</h2>
  <p class="text-ink leading-relaxed">
    Every standout UX case study follows a classic narrative arc: Hook, Context, Conflict, Resolution, and Reflection. Avoid monolithic walls of text; use scannable typographic hierarchy, diagrams, and annotated visuals:
  </p>

  <div class="space-y-6 my-6">
    <div class="p-6 border border-ink-border bg-white">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1">Phase 1</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2">The Executive Summary (Above the Fold)</h3>
      <p class="text-sm text-ink leading-relaxed mb-3">
        Before diving into research, give the reviewer an immediate snapshot of the project scope:
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono bg-paper-50 p-4 border border-ink-border">
        <div><strong class="block text-ink">Role:</strong> Lead Product Designer</div>
        <div><strong class="block text-ink">Timeline:</strong> 8 Weeks (Q3)</div>
        <div><strong class="block text-ink">Platform:</strong> iOS & Web App</div>
        <div><strong class="block text-ink">Outcome:</strong> +34% Task Completion</div>
      </div>
      <p class="text-xs text-ink-muted mt-2">
        <strong>The Problem Statement:</strong> In 2 sentences, explain the user friction and the business risk.
      </p>
    </div>

    <div class="p-6 border border-ink-border bg-white">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1">Phase 2</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2">The Messy Middle & Pivot Points</h3>
      <p class="text-sm text-ink leading-relaxed mb-2">
        Hiring teams actively distrust case studies where everything was perfect from day one. Real product design is messy:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-sm text-ink">
        <li>Show your initial sketch or assumption that completely failed in usability testing.</li>
        <li>Explain the engineering constraint (e.g., legacy API latency) that forced you to change your UI architecture.</li>
        <li>Document how you balanced competing user needs against business revenue requirements.</li>
      </ul>
    </div>

    <div class="p-6 border border-ink-border bg-white">
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted block mb-1">Phase 3</span>
      <h3 class="text-lg font-serif font-semibold text-ink mb-2">The Measurable Impact & Reflection</h3>
      <p class="text-sm text-ink leading-relaxed mb-2">
        Close your case study with concrete numbers, not vague claims:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-sm text-ink">
        <li><strong>Quantitative Metrics:</strong> Conversion rate lift, reduction in customer support tickets, SUS (System Usability Scale) score improvement.</li>
        <li><strong>Qualitative Validation:</strong> Quotes from post-launch customer interviews.</li>
        <li><strong>Retrospective Humility:</strong> "If I had two more weeks on this project, I would investigate edge-case accessibility on small-screen Android devices."</li>
      </ul>
    </div>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-8-1-sec-2">2. The 5-Step Whiteboard Challenge Playbook</h2>
  <p class="text-ink leading-relaxed">
    During on-site interview loops, you will frequently be asked to solve an ambiguous design prompt on a whiteboard in 45 minutes (e.g., <em>"Design an automated kiosk for a subway station"</em>). Follow this rigorous 5-step framework:
  </p>

  <div class="editorial-matrix my-6 overflow-x-auto">
    <table class="w-full text-left text-sm border-collapse border border-ink-border">
      <thead>
        <tr class="bg-paper-100 border-b border-ink-border">
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Step</th>
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Time Allocation</th>
          <th class="p-3 font-mono text-xs uppercase tracking-wider text-ink">Core Action & Questions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-ink-border">
        <tr>
          <td class="p-3 font-mono font-bold text-xs">1. Clarify the Scope</td>
          <td class="p-3 font-mono text-xs">5 minutes</td>
          <td class="p-3 text-ink-muted">Ask questions! Who is paying? What are the hardware limitations? Is this domestic or international travelers?</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">2. Define the User & Context</td>
          <td class="p-3 font-mono text-xs">10 minutes</td>
          <td class="p-3 text-ink-muted">Identify primary persona and stress environment (e.g., rushing commuter with luggage vs first-time tourist).</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">3. Map Core User Journey</td>
          <td class="p-3 font-mono text-xs">10 minutes</td>
          <td class="p-3 text-ink-muted">Draw a linear flowchart: Approach &rarr; Select Language &rarr; Pick Destination &rarr; Payment &rarr; Dispense Ticket.</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">4. Sketch Wireframe Interface</td>
          <td class="p-3 font-mono text-xs">15 minutes</td>
          <td class="p-3 text-ink-muted">Sketch low-fidelity wireframes of the critical 3 screens. Annotate touch targets, hierarchy, and physical hardware interaction.</td>
        </tr>
        <tr>
          <td class="p-3 font-mono font-bold text-xs">5. Critique, Edge Cases & Wrap</td>
          <td class="p-3 font-mono text-xs">5 minutes</td>
          <td class="p-3 text-ink-muted">Proactively point out potential flaws: "What if the paper runs out? What if the payment fails? How does a wheelchair user reach the screen?"</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-2xl font-serif font-semibold text-ink mt-8 mb-4" id="sb-8-1-sec-3">3. Thriving in the AI-Augmented Era of UX</h2>
  <p class="text-ink leading-relaxed">
    Artificial intelligence is rapidly commoditizing generic UI production. Tools like Midjourney, v0, Galileo, and AI-assisted design systems can generate screens in seconds. Where does this leave the professional product designer?
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-ink-border bg-paper-50">
      <h4 class="font-serif font-semibold text-ink mb-2">What AI Replaces (The Low-Leverage Tasks)</h4>
      <ul class="space-y-2 text-xs text-ink">
        <li>Generating boilerplate lorem ipsum and placeholder imagery.</li>
        <li>Basic component variation generation and token exports.</li>
        <li>Writing standard form layouts and routine admin dashboards.</li>
        <li>Initial competitive screenshot auditing and basic data sorting.</li>
      </ul>
    </div>
    <div class="p-5 border border-ink-border bg-white">
      <h4 class="font-serif font-semibold text-ink mb-2">What Becomes 10x More Valuable (Irreplaceable Core)</h4>
      <ul class="space-y-2 text-xs text-ink">
        <li><strong>Problem Framing:</strong> Determining if we are solving the right human problem before building anything.</li>
        <li><strong>In-Person Contextual Empathy:</strong> Observing unspoken emotional body language in user research.</li>
        <li><strong>Cross-Functional Persuasion:</strong> Aligning engineering, product, legal, and executive stakeholders around vision.</li>
        <li><strong>System Ethics & Trust:</strong> Protecting user privacy, eliminating algorithmic bias, and preventing dark patterns.</li>
      </ul>
    </div>
  </div>

  <div class="editorial-axiom my-8 p-6 bg-paper-50 border-l-4 border-ink">
    <p class="text-lg italic font-serif text-ink">
      "AI will not replace UX designers. But UX designers who master AI tools to conduct deeper research, explore wider option spaces, and ship higher-fidelity solutions will replace designers who refuse to evolve."
    </p>
    <cite class="block mt-3 text-xs uppercase tracking-widest font-mono text-ink-muted">
      — Design Leadership Manifesto, 2026
    </cite>
  </div>
</section>

            `,
          }
        ]
      }
    ]
  },
  {
    id: 'systems-architecture',
    slug: 'systems-architecture',
    title: 'Systems & Software Architecture',
    subtitle: 'Distributed Systems, Eventual Consistency & Domain-Driven Design',
    description: 'Rigorous engineering foundations for resilient, decoupled backend services.',
    category: 'Engineering',
    updatedAt: '1 week ago',
    duration: '28 hrs',
    progressPercent: 12,
    totalModules: 6,
    totalSources: 28,
    status: 'new',
    theme: {
      accent: '#2D3E35',
      highlight: 'rgba(45, 62, 53, 0.25)',
      paperBg: '#FFFFFF',
    },
    modules: []
  },
  {
    id: 'cognitive-science',
    slug: 'cognitive-science',
    title: 'Cognitive Science & Learning Theory',
    subtitle: 'Memory Consolidation, Dual-Coding & Attentional Allocation',
    description: 'Scientific foundations for how the human mind acquires, retains, and retrieves complex mental schemas.',
    category: 'Cognition',
    updatedAt: '3 weeks ago',
    duration: '16 hrs',
    progressPercent: 78,
    totalModules: 4,
    totalSources: 18,
    status: 'explored',
    theme: {
      accent: '#4A6B5B',
      highlight: 'rgba(74, 107, 91, 0.25)',
      paperBg: '#FFFFFF',
    },
    modules: []
  },
  {
    id: 'swiss-typography',
    slug: 'swiss-typography',
    title: 'Swiss Typography & Book Arts',
    subtitle: 'Grid Systems, Asymmetric Balance & The Dignity of the Printed Page',
    description: 'Historical and technical study of Emil Ruder, Josef Müller-Brockmann, and modernist publication design.',
    category: 'Typography',
    updatedAt: 'Completed',
    duration: '12 hrs',
    progressPercent: 100,
    totalModules: 5,
    totalSources: 22,
    status: 'completed',
    theme: {
      accent: '#9E6726',
      highlight: 'rgba(158, 103, 38, 0.25)',
      paperBg: '#FFFFFF',
    },
    modules: []
  }
];

