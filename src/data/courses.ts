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
                      src="${path('/images/lessons/sb-1-0/page_3_img_2.png')}" 
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
                    src="${path('/images/lessons/sb-1-0/page_5_img_2.png')}" 
                    alt="Whiteboard sketch showing early web layout ideation" 
                    class="w-full h-56 object-contain mx-auto rounded-xs bg-paper-50 dark:bg-dark-bg p-2 border border-ink-border dark:border-dark-border"
                  />
                  <p class="text-xs sm:text-sm font-sans font-medium text-ink dark:text-dark-ink mt-3">
                    Figure 2: Rapid whiteboard sketching for exploring layout options quickly.
                  </p>
                </div>

                <div class="p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border text-center shadow-2xs">
                  <img 
                    src="${path('/images/lessons/sb-1-0/page_5_img_3.png')}" 
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
                  src="${path('/images/lessons/sb-1-0/page_7_img_2.png')}" 
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
                    src="${path('/images/lessons/sb-1-0/page_8_img_2.png')}" 
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
            title: 'The 8-Step UX Design Process: From Problem Framing to Handoff',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.1',
            type: 'article',
            readTime: '15 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-design-process/',
            originalSourceLabel: 'Springboard Design Blog',
            summaryQuote: 'The design process is not a rigid linear checklist; it is an iterative feedback loop that turns raw user problems into verified solutions.',
            outline: [
              { id: 'sec-8step-overview', title: '1. The Anatomy of an Iterative Workflow', level: 2 },
              { id: 'sec-8step-framing', title: '2. Step 1-3: Understand, Research & Sketch', level: 2 },
              { id: 'sec-8step-build', title: '3. Step 4-6: Design, Prototype & Test', level: 2 },
              { id: 'sec-8step-ship', title: '4. Step 7-8: Measurement & Evolution', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Every successful digital product—from Spotify to Airbnb—follows a deliberate progression to move from an uncertain idea to a reliable, lovable experience.
              </p>

              <h2 id="sec-8step-overview">1. The Anatomy of an Iterative Workflow</h2>
              <p>
                Great product design is never a straight line from brainstorm to final code. Instead, it is an <strong>iterative cycle</strong>: you explore ideas, build quick tests, learn from real user reactions, and refine your work.
              </p>

              <div class="my-8 p-6 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border not-prose shadow-2xs">
                <div class="font-mono text-xs uppercase tracking-wider text-teal-800 dark:text-teal-300 font-bold mb-3">// The 8-Step Sequence</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans text-sm">
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-sky-800 dark:text-sky-300">01</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Understand</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Define user struggle & business objective</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-teal-800 dark:text-teal-300">02</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Research</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Interviews & field observation</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-indigo-800 dark:text-indigo-300">03</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Sketch</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Low-cost whiteboard exploration</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-blue-800 dark:text-blue-300">04</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Design</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Wireframes & information architecture</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-amber-800 dark:text-amber-300">05</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Prototype</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Interactive clickable models</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-rose-800 dark:text-rose-300">06</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Test</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Observe real users completing tasks</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-violet-800 dark:text-violet-300">07</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Measurement</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Telemetry & usability analytics</div>
                  </div>
                  <div class="p-3 bg-paper-50 dark:bg-dark-bg rounded-xs border border-ink-border/70 dark:border-dark-border">
                    <span class="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">08</span>
                    <div class="font-bold text-ink dark:text-dark-ink">Evolution</div>
                    <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Continuous incremental refinement</div>
                  </div>
                </div>
              </div>

              <h2 id="sec-8step-framing">2. Step 1-3: Understand, Research & Sketch</h2>
              <p>
                In the first three steps, you fall in love with the problem rather than your first solution. You listen to user interviews, map their daily frustrations, and sketch wide varieties of ideas on paper without worrying about visual polish.
              </p>

              <h2 id="sec-8step-build">3. Step 4-6: Design, Prototype & Test</h2>
              <p>
                Here, your paper sketches turn into structured digital wireframes. You connect them into clickable prototypes and conduct usability sessions to verify whether navigation makes intuitive sense.
              </p>

              <h2 id="sec-8step-ship">4. Step 7-8: Measurement & Evolution</h2>
              <p>
                Shipping a design is not the finish line; it is where real learning begins. By tracking task success rates and user satisfaction, you continuously evolve the product based on observed human behavior.
              </p>
            `,
          },
          {
            id: 'sb-1-2',
            slug: 'ux-vs-ui-the-essential-distinction',
            title: 'UX vs. UI: The Difference Between Experience and Interface',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.2',
            type: 'article',
            readTime: '12 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-vs-ui/',
            originalSourceLabel: 'Springboard Design Blog',
            summaryQuote: 'UX is the architecture and logic of how a journey works; UI is the craft, sensory elegance, and touch of the vessel itself.',
            outline: [
              { id: 'sec-analogy', title: '1. The Blueprint & Interior Design Analogy', level: 2 },
              { id: 'sec-comparison', title: '2. Comparing Roles, Deliverables & Tools', level: 2 },
              { id: 'sec-synergy', title: '3. Why Great Products Need Both', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                While people often say "UI/UX" as if it were a single job title, user experience and user interface design are distinct crafts with complementary focuses.
              </p>

              <h2 id="sec-analogy">1. The Blueprint & Interior Design Analogy</h2>
              <p>
                Imagine building a family home:
              </p>
              <ul class="space-y-3 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
                <li class="flex items-start gap-3">
                  <span class="font-mono text-xs text-sky-700 dark:text-sky-400 mt-1.5 shrink-0 font-bold">—</span>
                  <div>
                    <strong>The UX Architect:</strong> Plans where the plumbing runs, where doors open, how rooms connect, and whether the kitchen is close to the dining room so you don't carry hot soup across three corridors.
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-mono text-xs text-emerald-700 dark:text-emerald-400 mt-1.5 shrink-0 font-bold">—</span>
                  <div>
                    <strong>The UI Designer:</strong> Chooses the natural lighting, tactile hardwood flooring, brass door handles, paint swatches, and beautiful fixtures that make walking into the home feel warm and delightful.
                  </div>
                </li>
              </ul>

              <h2 id="sec-comparison">2. Comparing Roles, Deliverables & Tools</h2>
              <div class="my-8 overflow-x-auto not-prose">
                <table class="w-full text-left text-sm font-sans border-collapse border-y-2 border-ink dark:border-dark-ink">
                  <thead>
                    <tr class="border-b-2 border-ink dark:border-dark-ink font-mono text-xs uppercase tracking-wider text-ink dark:text-dark-ink font-bold">
                      <th class="py-3 pr-4">Dimension</th>
                      <th class="py-3 px-4 text-sky-800 dark:text-sky-300">UX Design</th>
                      <th class="py-3 pl-4 text-emerald-800 dark:text-emerald-300">UI Design</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-ink-border dark:divide-dark-border text-ink dark:text-dark-ink">
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">Primary Goal</td>
                      <td class="py-3 px-4">Solving problems & removing user friction</td>
                      <td class="py-3 pl-4">Crafting visual clarity, beauty & branding</td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">Key Deliverables</td>
                      <td class="py-3 px-4">Personas, user flows, wireframes, testing reports</td>
                      <td class="py-3 pl-4">Design systems, polished mockups, icon sets</td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">Core Question</td>
                      <td class="py-3 px-4"><em>"Does this solve the user's task easily?"</em></td>
                      <td class="py-3 pl-4"><em>"Does this communicate clearly and feel delightful?"</em></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 id="sec-synergy">3. Why Great Products Need Both</h2>
              <p>
                A product with brilliant UX and terrible UI is easy to use, but looks outdated and untrustworthy. A product with gorgeous UI and terrible UX looks stunning in a screenshot, but frustrates users the moment they try to complete a task. Real product excellence happens when both disciplines work in total harmony.
              </p>
            `,
          },
          {
            id: 'sb-1-3',
            slug: 'design-thinking-fundamentals',
            title: 'Design Thinking 101: The Human-Centered Innovation Model',
            module: 'Unit 1: Design 101 & Foundations',
            unitNumber: 1,
            lessonNumber: '1.3',
            type: 'video',
            readTime: '15 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/design-thinking/',
            originalSourceLabel: 'Sarah Gibbons / Nielsen Norman Group',
            youtubeId: '6lmvCqvmjfE',
            summaryQuote: 'Design thinking is a human-centered approach to innovation that integrates the needs of people, the possibilities of technology, and the requirements for business success.',
            outline: [
              { id: 'dt-intro', title: '1. The 5 Stages: Empathize to Test', level: 2 },
              { id: 'dt-divergence', title: '2. The Double Diamond: Diverge and Converge', level: 2 },
              { id: 'dt-mindset', title: '3. Cultivating Beginner\'s Mind', level: 2 },
            ],
            videoTimestamps: [
              { time: 0, label: '00:00 - Introduction', text: 'Welcome to this foundational overview of Design Thinking from Nielsen Norman Group. We explore the five core phases that structure human-centered innovation.' },
              { time: 120, label: '02:00 - Empathy Phase', text: 'Empathy is about stepping into the shoes of your users without judgment to discover their real daily struggles.' },
              { time: 300, label: '05:00 - Ideate & Prototype', text: 'Generating wide varieties of concepts before zeroing in on testable interactive prototypes.' }
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Design Thinking is a proven problem-solving framework used by top design organizations to tackle complex, ambiguous challenges with deep human empathy.
              </p>

              <h2 id="dt-intro">1. The 5 Stages: Empathize to Test</h2>
              <div class="my-8 grid grid-cols-1 sm:grid-cols-5 gap-3 not-prose text-center">
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs text-teal-800 dark:text-teal-300 font-bold mb-1">01</div>
                  <div class="font-bold text-sm text-ink dark:text-dark-ink">Empathize</div>
                  <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Listen & observe</div>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs text-blue-800 dark:text-blue-300 font-bold mb-1">02</div>
                  <div class="font-bold text-sm text-ink dark:text-dark-ink">Define</div>
                  <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">State the core struggle</div>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs text-amber-800 dark:text-amber-300 font-bold mb-1">03</div>
                  <div class="font-bold text-sm text-ink dark:text-dark-ink">Ideate</div>
                  <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Brainstorm widely</div>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs text-indigo-800 dark:text-indigo-300 font-bold mb-1">04</div>
                  <div class="font-bold text-sm text-ink dark:text-dark-ink">Prototype</div>
                  <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Build testable models</div>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs text-rose-800 dark:text-rose-300 font-bold mb-1">05</div>
                  <div class="font-bold text-sm text-ink dark:text-dark-ink">Test</div>
                  <div class="text-xs text-ink/80 dark:text-dark-ink/80 mt-1">Validate with users</div>
                </div>
              </div>

              <h2 id="dt-divergence">2. The Double Diamond: Diverge and Converge</h2>
              <p>
                Design Thinking relies on alternating between expanding your thinking (diverging) and focusing your choices (converging). You first explore many different problem definitions before choosing the right one; then, you explore many different solutions before choosing the best one to prototype.
              </p>

              <h2 id="dt-mindset">3. Cultivating Beginner's Mind</h2>
              <p>
                The greatest danger in product development is assuming you already know what the user needs. Practicing Design Thinking means adopting a humble "beginner's mind"—asking genuine questions, listening intently, and letting user behavior surprise you.
              </p>
            `,
          }
        ]
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'Unit 2: User Research & Synthesis',
        description: 'Qualitative interviewing protocols, contextual inquiry, personas, and the 10 Usability Heuristics.',
        lessons: [
          {
            id: 'sb-2-1',
            slug: 'the-essential-guide-to-user-research',
            title: 'The Essential Guide to User Research & Field Inquiry',
            module: 'Unit 2: User Research & Synthesis',
            unitNumber: 2,
            lessonNumber: '2.1',
            type: 'article',
            readTime: '16 min',
            originalSourceUrl: 'https://uxplanet.org/ultimate-guide-to-user-research-bed4a57d260',
            originalSourceLabel: 'Mona Yang (UX Planet)',
            summaryQuote: 'Research is not about proving your opinions right; it is about uncovering reality before you invest time and capital in construction.',
            outline: [
              { id: 'res-why', title: '1. Why Quantitative Data is Not Enough', level: 2 },
              { id: 'res-methods', title: '2. Qualitative vs. Quantitative Methods', level: 2 },
              { id: 'res-interviewing', title: '3. Conducting Empathetic User Interviews', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Analytics tell you <em>what</em> users are doing on your site; qualitative user research tells you <em>why</em> they are doing it.
              </p>

              <h2 id="res-why">1. Why Quantitative Data is Not Enough</h2>
              <p>
                Your dashboard might show that 40% of users drop off at the checkout page. But analytics alone will never tell you if they left because the payment form felt insecure, because an unexpected shipping fee shocked them, or because a button was hard to tap on mobile. To understand the human reasons behind the numbers, you must talk to real people.
              </p>

              <h2 id="res-methods">2. Qualitative vs. Quantitative Methods</h2>
              <p>
                Strong research combines both perspectives: <strong>qualitative discovery</strong> (open-ended interviews, usability observations) to discover user mental models, paired with <strong>quantitative validation</strong> (surveys, conversion analytics) to measure patterns across large populations.
              </p>

              <h2 id="res-interviewing">3. Conducting Empathetic User Interviews</h2>
              <p>
                Never ask leading questions like <em>"Wouldn't you love a dark mode feature?"</em> People naturally want to be polite and will say yes. Instead, ask about concrete past behavior: <em>"Tell me about the last time you used this app late at night. What happened?"</em>
              </p>
            `,
          },
          {
            id: 'sb-2-2',
            slug: 'the-ten-usability-heuristics',
            title: 'The 10 Usability Heuristics for User Interface Design',
            module: 'Unit 2: User Research & Synthesis',
            unitNumber: 2,
            lessonNumber: '2.2',
            type: 'article',
            readTime: '20 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
            originalSourceLabel: 'Jakob Nielsen (Nielsen Norman Group)',
            summaryQuote: 'Heuristics are broad rules of thumb, not rigid laws. They provide a time-tested checklist for identifying and preventing usability disasters.',
            outline: [
              { id: 'heur-foundations', title: '1. The Origins of Usability Heuristics', level: 2 },
              { id: 'heur-first-five', title: '2. Heuristics 1–5: Status, Real World, Control, Consistency & Errors', level: 2 },
              { id: 'heur-second-five', title: '3. Heuristics 6–10: Recognition, Flexibility, Aesthetics, Recovery & Help', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Formulated by Jakob Nielsen in 1994, these ten fundamental principles remain the global gold standard for evaluating digital interfaces.
              </p>

              <h2 id="heur-foundations">1. The Origins of Usability Heuristics</h2>
              <p>
                Jakob Nielsen analyzed hundreds of software usability problems and realized that almost all friction points stemmed from the violation of a small set of psychological heuristics.
              </p>

              <h2 id="heur-first-five">2. Heuristics 1–5: Core Feedback & Control</h2>
              <div class="space-y-4 my-8 not-prose">
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">01 // Visibility of System Status</div>
                  <p class="text-sm text-ink dark:text-dark-ink mt-1 font-normal">Keep users informed about what is going on through appropriate feedback within reasonable time (e.g. progress bars, loading spinners).</p>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs font-bold text-blue-800 dark:text-blue-300">02 // Match Between System and Real World</div>
                  <p class="text-sm text-ink dark:text-dark-ink mt-1 font-normal">Speak the user's language with words, phrases, and concepts familiar to them, rather than internal database codes.</p>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs font-bold text-amber-800 dark:text-amber-300">03 // User Control and Freedom</div>
                  <p class="text-sm text-ink dark:text-dark-ink mt-1 font-normal">Provide clear "emergency exits" like Undo and Redo when users choose system functions by mistake.</p>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300">04 // Consistency and Standards</div>
                  <p class="text-sm text-ink dark:text-dark-ink mt-1 font-normal">Follow platform conventions so users do not have to wonder whether different words or icons mean the same thing.</p>
                </div>
                <div class="p-4 rounded-xs bg-white dark:bg-dark-card border border-ink-border dark:border-dark-border">
                  <div class="font-mono text-xs font-bold text-rose-800 dark:text-rose-300">05 // Error Prevention</div>
                  <p class="text-sm text-ink dark:text-dark-ink mt-1 font-normal">Carefully prevent errors from happening in the first place, rather than just designing pretty error messages after the fact.</p>
                </div>
              </div>

              <h2 id="heur-second-five">3. Heuristics 6–10: Cognition, Simplicity & Support</h2>
              <p>
                The remaining five heuristics focus on reducing human memory load (Recognition over Recall), allowing power shortcuts (Flexibility & Efficiency), maintaining visual calm (Aesthetic & Minimalist Design), writing helpful error messages, and providing accessible documentation when needed.
              </p>
            `,
          }
        ]
      },
      {
        id: 'mod-3',
        number: 3,
        title: 'Unit 3: Information Architecture & Navigation',
        description: 'Organizing complex content, taxonomy schemas, user flows, and mental model alignment.',
        lessons: [
          {
            id: 'sb-3-1',
            slug: 'information-architecture-study-guide',
            title: 'Information Architecture: Structural Models & Navigation Systems',
            module: 'Unit 3: Information Architecture & Navigation',
            unitNumber: 3,
            lessonNumber: '3.1',
            type: 'article',
            readTime: '18 min',
            originalSourceUrl: 'https://www.nngroup.com/articles/ia-study-guide/',
            originalSourceLabel: 'Page Laubheimer (Nielsen Norman Group)',
            summaryQuote: 'Information architecture is the structural design of shared information environments that turns chaos into intuitive pathways.',
            outline: [
              { id: 'ia-foundations', title: '1. The Lou Rosenfeld & Peter Morville IA Model', level: 2 },
              { id: 'ia-navigation', title: '2. Global, Local & Contextual Navigation', level: 2 },
              { id: 'ia-testing', title: '3. Tree Testing & Validating Architecture', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Information architecture is the quiet foundation of digital usability. When IA is done well, nobody notices it; when it is done poorly, users feel lost and abandoned.
              </p>

              <h2 id="ia-foundations">1. The Lou Rosenfeld & Peter Morville IA Model</h2>
              <p>
                Information architecture sits at the intersection of three factors: <strong>Users</strong> (their information-seeking habits), <strong>Content</strong> (document structure and volume), and <strong>Context</strong> (business goals and technical constraints).
              </p>

              <h2 id="ia-navigation">2. Global, Local & Contextual Navigation</h2>
              <p>
                Modern software uses layered navigation systems: persistent global header bars for top destinations, local sidebars for sub-sections, and contextual inline links for related reading.
              </p>

              <h2 id="ia-testing">3. Tree Testing & Validating Architecture</h2>
              <p>
                Before designing any visual screens, you can test your navigation hierarchy using <strong>Tree Testing</strong>: giving users a text-only menu tree and asking them where they would click to find a specific setting or document.
              </p>
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
            title: 'The Art of Rapid UX Sketching & The Crazy 8s Technique',
            module: 'Unit 4: Wireframing & Sketching',
            unitNumber: 4,
            lessonNumber: '4.1',
            type: 'article',
            readTime: '14 min',
            originalSourceUrl: 'https://www.smashingmagazine.com/2011/12/the-messy-art-of-ux-sketching/',
            originalSourceLabel: 'Peiter Buick (Smashing Magazine)',
            summaryQuote: 'Sketching is not about drawing pretty pictures; it is about thinking visually at the speed of human thought.',
            outline: [
              { id: 'sk-why', title: '1. Why Everyone Can and Should Sketch', level: 2 },
              { id: 'sk-crazy8s', title: '2. The Crazy 8s Exercise from Google Ventures', level: 2 },
              { id: 'sk-fidelity', title: '3. Moving from Paper to Digital Wireframes', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Sketching is the fastest way to get raw ideas out of your head and onto a tangible surface where you can compare them objectively.
              </p>

              <h2 id="sk-why">1. Why Everyone Can and Should Sketch</h2>
              <p>
                Many aspiring designers say: <em>"But I can't draw!"</em> You don't need to be an artist to sketch for UX. If you can draw a rectangle, a circle, and an arrow, you have all the visual vocabulary needed to map an application layout.
              </p>

              <h2 id="sk-crazy8s">2. The Crazy 8s Exercise from Google Ventures</h2>
              <p>
                In a Design Sprint, team members fold a sheet of paper into eight rectangles and spend eight minutes sketching eight distinct layout ideas (one minute per box). This time pressure forces your brain past obvious initial solutions and unlocks creative alternatives.
              </p>

              <h2 id="sk-fidelity">3. Moving from Paper to Digital Wireframes</h2>
              <p>
                Once you select the best sketches, you translate them into digital wireframes—establishing alignment, typography hierarchy, and spacing grids in design software.
              </p>
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
            title: 'Interactive Prototyping: Bringing Wireframes to Life',
            module: 'Unit 5: Interactive Prototyping',
            unitNumber: 5,
            lessonNumber: '5.1',
            type: 'article',
            readTime: '15 min',
            originalSourceUrl: 'https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma',
            originalSourceLabel: 'Figma Learn Documentation',
            summaryQuote: 'A prototype is worth a thousand meetings. Connecting screens together makes abstract ideas immediately concrete and testable.',
            outline: [
              { id: 'proto-types', title: '1. Levels of Fidelity: Low vs. High', level: 2 },
              { id: 'proto-triggers', title: '2. Interaction Triggers & Transitions', level: 2 },
              { id: 'proto-smart', title: '3. Smart Animate & State Management', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Clickable prototypes allow stakeholders and test participants to experience the flow of an application before a single line of backend code is written.
              </p>

              <h2 id="proto-types">1. Levels of Fidelity: Low vs. High</h2>
              <p>
                Low-fidelity prototypes use simple grey boxes to test navigation pathways. High-fidelity prototypes look and feel almost like real production apps, with realistic copy, images, and smooth micro-animations.
              </p>

              <h2 id="proto-triggers">2. Interaction Triggers & Transitions</h2>
              <p>
                Modern tools allow you to model complex triggers: On Click, While Hovering, On Drag, and Key Press, connecting screens with slide, push, or fade transitions.
              </p>

              <h2 id="proto-smart">3. Smart Animate & State Management</h2>
              <p>
                By maintaining identical layer names across screens, tools like Figma automatically interpolate motion—making toggle switches glide and cards expand smoothly.
              </p>
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
            title: 'Visual Design in UX: Color Harmony, Typography & Button Ergonomics',
            module: 'Unit 6: UI & Visual Design Fundamentals',
            unitNumber: 6,
            lessonNumber: '6.1',
            type: 'article',
            readTime: '18 min',
            originalSourceUrl: 'https://dribbble.com/stories/2018/12/19/choosing-colors-for-web-design-a-practical-ui-color-application-guide',
            originalSourceLabel: 'Stefano Peschiera / Dribbble Guide',
            summaryQuote: 'Visual design is visual communication: guiding the eye effortlessly to the most important actions through contrast and rhythm.',
            outline: [
              { id: 'ui-color', title: '1. The 60-30-10 Color Rule in UI', level: 2 },
              { id: 'ui-type', title: '2. Typographic Scale and Readability', level: 2 },
              { id: 'ui-buttons', title: '3. The Ergonomics of Mobile Buttons', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Visual design transforms functional wireframes into polished, trustworthy, and aesthetically dignified products.
              </p>

              <h2 id="ui-color">1. The 60-30-10 Color Rule in UI</h2>
              <p>
                To avoid visual clutter, use a disciplined balance: 60% neutral background surface (crisp white or dark canvas), 30% structural text and secondary surfaces (charcoal ink, zinc borders), and 10% purposeful accent color for primary call-to-action buttons.
              </p>

              <h2 id="ui-type">2. Typographic Scale and Readability</h2>
              <p>
                Great typography establishes unmistakable visual hierarchy: bold commanding titles, comfortable long-form body text with generous line height, and compact monospaced labels for technical metadata.
              </p>

              <h2 id="ui-buttons">3. The Ergonomics of Mobile Buttons</h2>
              <p>
                Mobile touch targets must be at least 44x44 pixels (or 48x48 dp on Android) to accommodate human thumbs without accidental taps.
              </p>
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
            title: 'Usability Testing 101: The Five-Act Interview Protocol',
            module: 'Unit 7: Usability Testing & Validation',
            unitNumber: 7,
            lessonNumber: '7.1',
            type: 'video',
            readTime: '20 min',
            originalSourceUrl: 'https://www.youtube.com/embed/U9ZG19XTbd4',
            originalSourceLabel: 'Google Ventures (GV) Sprint Protocol',
            youtubeId: 'U9ZG19XTbd4',
            summaryQuote: 'Watching just five real users test your prototype will reveal eighty-five percent of all usability problems.',
            outline: [
              { id: 'ut-why5', title: '1. Why Five Users are Enough', level: 2 },
              { id: 'ut-fiveact', title: '2. The Five-Act Interview Architecture', level: 2 },
              { id: 'ut-synthesis', title: '3. Synthesizing Findings into Actionable Fixes', level: 2 },
            ],
            videoTimestamps: [
              { time: 0, label: '00:00 - Introduction', text: 'Welcome to this session on the Five-Act Interview protocol developed at Google Ventures for rapid user testing.' },
              { time: 180, label: '03:00 - The Five Acts', text: 'Walk through: Friendly welcome, context questions, introducing prototype, task-based observation, and debrief.' }
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Usability testing is the moment of truth in product design: observing real people interact with your prototype without guiding or correcting them.
              </p>

              <h2 id="ut-why5">1. Why Five Users are Enough</h2>
              <p>
                Jakob Nielsen demonstrated mathematically that testing with five participants uncovers roughly 85% of usability flaws. Adding more participants yields diminishing returns while repeating the same obvious issues.
              </p>

              <h2 id="ut-fiveact">2. The Five-Act Interview Architecture</h2>
              <p>
                The Google Ventures Five-Act structure keeps sessions disciplined:
              </p>
              <ol class="list-decimal pl-6 space-y-2 my-6 font-serif text-base sm:text-lg text-ink dark:text-dark-ink leading-relaxed">
                <li><strong>Friendly Welcome:</strong> Put the participant at ease; remind them that the prototype is being tested, not them.</li>
                <li><strong>Context Questions:</strong> Learn about their daily habits and work background.</li>
                <li><strong>Introducing the Prototype:</strong> Remind them that some buttons may not work yet and encourage them to think aloud.</li>
                <li><strong>Tasks & Observation:</strong> Give them realistic goals and watch quietly as they navigate.</li>
                <li><strong>Debrief:</strong> Ask open-ended closing questions about what made sense and what felt confusing.</li>
              </ol>

              <h2 id="ut-synthesis">3. Synthesizing Findings into Actionable Fixes</h2>
              <p>
                Group common mistakes onto an affinity board and prioritize fixes based on severity: resolve critical roadblocks first before tuning minor cosmetic preferences.
              </p>
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
            title: 'UX Career Strategy: Crafting Case Studies & Thriving in the AI Era',
            module: 'Unit 8: Career Pathways & Industry Navigation',
            unitNumber: 8,
            lessonNumber: '8.1',
            type: 'article',
            readTime: '15 min',
            originalSourceUrl: 'https://www.springboard.com/blog/design/ux-no-experience/',
            originalSourceLabel: 'Springboard Career Strategy Guide',
            summaryQuote: 'Hiring managers do not look for perfection in portfolios; they look for clear problem framing, honest iteration, and empathetic communication.',
            outline: [
              { id: 'car-case-study', title: '1. What Makes a World-Class Case Study', level: 2 },
              { id: 'car-interview', title: '2. The Whiteboard Challenge & App Critique', level: 2 },
              { id: 'car-ai-era', title: '3. Future-Proofing Your Career with AI Fluency', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg sm:text-xl font-serif text-ink dark:text-dark-ink mb-8 leading-relaxed">
                Transitioning into product design requires more than showing pretty screenshots; it requires communicating your strategic thought process clearly.
              </p>

              <h2 id="car-case-study">1. What Makes a World-Class Case Study</h2>
              <p>
                A compelling case study is a structured narrative: <strong>The Problem</strong> (the human and business friction), <strong>The Research</strong> (what users told you), <strong>The Early Mistakes</strong> (what failed in testing), and <strong>The Outcome</strong> (how your solution improved their lives).
              </p>

              <h2 id="car-interview">2. The Whiteboard Challenge & App Critique</h2>
              <p>
                During design interviews, teams test how you collaborate live. Focus on asking clarifying questions, framing the user's struggle before proposing ideas, and explaining the reasoning behind your layout choices.
              </p>

              <h2 id="car-ai-era">3. Future-Proofing Your Career with AI Fluency</h2>
              <p>
                AI will automate repetitive tasks like drafting initial color palettes or transcribing interviews. The designers who thrive will be those who excel at what algorithms cannot do: deep human empathy, ethical judgement, strategic problem framing, and building trust with users.
              </p>
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
