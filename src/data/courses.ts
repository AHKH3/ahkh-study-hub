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
    totalSources: 42,
    status: 'active',
    theme: {
      accent: '#1C1B19',
      highlight: 'rgba(0, 0, 0, 0.08)',
      paperBg: '#FFFFFF',
    },
    modules: [
      {
        id: 'mod-1',
        number: 1,
        title: 'UX Research & Discovery Foundations',
        description: 'Framing problems, qualitative interviewing ethics, and field observation.',
        lessons: [
          {
            id: 'sb-1-0',
            slug: 'the-anatomy-of-product-experience',
            title: 'Understanding UX Design: The Core Process and Career Paths',
            module: 'UX Research & Discovery Foundations',
            unitNumber: 1,
            lessonNumber: '1.0',
            type: 'article',
            readTime: '16 min',
            originalSourceUrl: 'https://readwise.io/reader/document_raw_content/490658744',
            originalSourceLabel: 'Springboard UX Career Track (Laurel Hechanova)',
            summaryQuote: 'User experience is simply how a person feels, what they do, and what they see when using a product. Good design begins with understanding real human needs.',
            outline: [
              { id: 'sec-what-is-ux', title: '1. What Exactly Is UX Design?', level: 2 },
              { id: 'sec-triad', title: '2. The Three Levels: Product, Service, and System', level: 2 },
              { id: 'sec-research', title: '3. Step 1: User Research (Asking the Right Questions)', level: 2 },
              { id: 'sec-ia', title: '4. Step 2: Information Architecture (Organizing Content)', level: 2 },
              { id: 'sec-ixd', title: '5. Step 3: Interaction Design (How Things Connect)', level: 2 },
              { id: 'sec-testing', title: '6. Step 4: Usability Testing (Testing Early to Save Time)', level: 2 },
              { id: 'sec-visual', title: '7. Step 5: Visual & UI Design (The Final Polish)', level: 2 },
              { id: 'sec-careers', title: '8. Career Paths: Generalist, Specialist, or T-Shaped?', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg font-serif italic text-stone-700 dark:text-stone-300 mb-8">
                Even if you are new to the term "user experience," you interact with UX design dozens of times every day. When you easily find a search bar, book a room in three clicks, or order food without confusion, you are experiencing the work of a UX designer.
              </p>

              <h2 id="sec-what-is-ux">1. What Exactly Is UX Design?</h2>
              <p>
                Companies across all industries are investing heavily in user experience design (UXD). Whether building internal design teams or hiring outside studios, they have learned a simple truth: <strong>you cannot build a successful business without focusing on the real needs of the people using your product.</strong>
              </p>
              <p>
                At its simplest, <strong>user experience is how someone feels, what they do, and what they see when they interact with something.</strong> That "something" is not always a digital app. It can happen at three distinct levels:
              </p>

              <!-- Level 1-2-3 Colored Structural Diagram -->
              <div class="my-10 p-6 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40">
                <div class="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-4 flex items-center justify-between">
                  <span>// The Three Levels of Experience</span>
                  <span class="text-amber-600 dark:text-amber-400 font-semibold">Everyday Examples</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Level 1: Product -->
                  <div class="p-5 rounded-md bg-white dark:bg-stone-950 border border-sky-200 dark:border-sky-900/60 shadow-xs">
                    <div class="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 mb-3">
                      Level 01 // Product
                    </div>
                    <h4 class="font-sans font-bold text-base text-stone-900 dark:text-stone-100 mb-2">The Tangible Object</h4>
                    <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                      The direct physical or digital tool in front of you.
                    </p>
                    <div class="text-xs font-mono text-sky-800 dark:text-sky-300 bg-sky-50/60 dark:bg-sky-950/40 p-2 rounded">
                      Examples: A mobile app, a website, a car, or an electric kettle.
                    </div>
                  </div>

                  <!-- Level 2: Service -->
                  <div class="p-5 rounded-md bg-white dark:bg-stone-950 border border-amber-200 dark:border-amber-900/60 shadow-xs">
                    <div class="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 mb-3">
                      Level 02 // Service
                    </div>
                    <h4 class="font-sans font-bold text-base text-stone-900 dark:text-stone-100 mb-2">The Task Flow</h4>
                    <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                      The step-by-step action of getting something done over time.
                    </p>
                    <div class="text-xs font-mono text-amber-800 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/40 p-2 rounded">
                      Examples: Booking a hotel room, renting a car, or returning a broken item.
                    </div>
                  </div>

                  <!-- Level 3: System -->
                  <div class="p-5 rounded-md bg-white dark:bg-stone-950 border border-purple-200 dark:border-purple-900/60 shadow-xs">
                    <div class="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-3">
                      Level 03 // System
                    </div>
                    <h4 class="font-sans font-bold text-base text-stone-900 dark:text-stone-100 mb-2">The Ecosystem</h4>
                    <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                      The larger infrastructure connecting products and people together.
                    </p>
                    <div class="text-xs font-mono text-purple-800 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/40 p-2 rounded">
                      Examples: The App Store, a hotel chain reservation system, or automated support.
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="sec-research">3. Step 1: User Research (Asking the Right Questions)</h2>
              <p>
                Before deciding what your product should look like, you need to understand <em>why</em> you are making it. You cannot cook someone their favorite meal if you do not know what they like to eat. In the same way, you cannot design a good product without talking to real users.
              </p>
              <p>
                User research means speaking directly with the people you want to serve, observing how they work, and asking four essential questions:
              </p>

              <!-- 4 Research Questions - Clean Visual Grid -->
              <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-md border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
                    <h4 class="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">What specific problems do they have?</h4>
                  </div>
                  <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Identify the exact obstacle causing daily stress or slowing them down, not just general complaints.
                  </p>
                </div>

                <div class="p-4 rounded-md border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
                    <h4 class="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">Who, specifically, faces this problem?</h4>
                  </div>
                  <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Narrow down the exact group of people. If you design for "everyone in general," you end up helping nobody well.
                  </p>
                </div>

                <div class="p-4 rounded-md border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
                    <h4 class="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">What are they doing right now to solve it?</h4>
                  </div>
                  <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    People rarely do nothing. Notice their manual workarounds: paper notes, spreadsheets, or improvised hacks.
                  </p>
                </div>

                <div class="p-4 rounded-md border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
                    <h4 class="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">How happy are they with those current solutions?</h4>
                  </div>
                  <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Find out where their existing workaround is frustrating them. That gap is where your product provides real value.
                  </p>
                </div>
              </div>

              <h2 id="sec-ia">4. Step 2: Information Architecture (Organizing Content)</h2>
              <p>
                Once you finish your user research, you will have a clear idea of what features and content your product needs. The next challenge is organizing that content so users can find what they want naturally without feeling lost. This discipline is called <strong>Information Architecture (IA)</strong>.
              </p>
              <p>
                Think of an app you use every day, like Instagram. Its screen is not an arbitrary collection of buttons; it is organized into four main areas:
              </p>

              <!-- Live Mobile Viewport Reconstruction with Real Visual Colors -->
              <div class="my-10 p-6 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
                <div class="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-6 flex items-center justify-between">
                  <span>// Case Study: Instagram Mobile App Layout</span>
                  <span class="text-blue-600 dark:text-blue-400 font-semibold font-mono">Real-World IA Example</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <!-- Phone Mockup -->
                  <div class="md:col-span-5 flex justify-center">
                    <div class="w-64 rounded-3xl border-4 border-stone-800 dark:border-stone-700 bg-white dark:bg-stone-950 p-3 shadow-md font-sans select-none">
                      <!-- Phone Top Notch / Status -->
                      <div class="flex justify-between items-center text-[10px] font-mono text-stone-400 pb-1 px-1 border-b border-stone-100 dark:border-stone-900">
                        <span>9:41</span>
                        <div class="flex items-center gap-1">
                          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>100%</span>
                        </div>
                      </div>

                      <!-- Zone 1: Header -->
                      <div class="py-2 px-2 my-1.5 rounded-md border border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/40 flex items-center justify-between">
                        <span class="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300">Camera</span>
                        <span class="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">Instagram</span>
                        <div class="flex items-center gap-1.5 text-[10px] font-mono text-sky-700 dark:text-sky-300">
                          <span>TV</span>
                          <span class="relative">DM<span class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span></span>
                        </div>
                      </div>

                      <!-- Zone 2: Stories Bar -->
                      <div class="py-2 px-1 my-1 rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 flex gap-2 overflow-hidden">
                        <div class="w-8 h-8 rounded-full ring-2 ring-gradient ring-amber-500 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[8px] font-mono font-bold text-amber-800 dark:text-amber-300">You</div>
                        <div class="w-8 h-8 rounded-full ring-2 ring-rose-400 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[8px] font-mono text-stone-600 dark:text-stone-400">Sara</div>
                        <div class="w-8 h-8 rounded-full ring-2 ring-purple-400 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[8px] font-mono text-stone-600 dark:text-stone-400">Alex</div>
                        <div class="w-8 h-8 rounded-full ring-2 ring-stone-300 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[8px] font-mono text-stone-600 dark:text-stone-400">Omar</div>
                      </div>

                      <!-- Zone 3: Main Feed -->
                      <div class="my-1.5 p-2 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                        <div class="flex items-center gap-2 mb-1.5">
                          <div class="w-5 h-5 rounded-full bg-stone-300 dark:bg-stone-700"></div>
                          <span class="text-[10px] font-sans font-semibold text-stone-800 dark:text-stone-200">design_studio</span>
                        </div>
                        <div class="w-full h-24 rounded bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-[10px] font-mono text-stone-400">
                          [Main Photo / Video]
                        </div>
                        <div class="flex gap-2 mt-2 text-[10px]">
                          <span class="text-rose-500 font-bold">♥ 1.2k</span>
                          <span class="text-stone-500">💬 84</span>
                        </div>
                      </div>

                      <!-- Zone 4: Tab Bar -->
                      <div class="pt-2 border-t-2 border-stone-300 dark:border-stone-700 flex justify-between items-center text-[9px] font-mono px-1">
                        <span class="font-bold text-amber-700 dark:text-amber-400">Home</span>
                        <span class="text-stone-400">Search</span>
                        <span class="text-stone-400 font-bold">+</span>
                        <span class="text-stone-400">Activity</span>
                        <span class="text-stone-400">Profile</span>
                      </div>
                    </div>
                  </div>

                  <!-- Zone Explanations -->
                  <div class="md:col-span-7 space-y-4">
                    <div class="p-3 rounded border-l-4 border-sky-500 bg-white dark:bg-stone-950">
                      <h4 class="font-sans font-bold text-sm text-sky-800 dark:text-sky-300">1. Header Bar</h4>
                      <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
                        Dedicated to fast actions: posting a quick story (camera), opening IGTV video, or checking direct messages.
                      </p>
                    </div>

                    <div class="p-3 rounded border-l-4 border-amber-500 bg-white dark:bg-stone-950">
                      <h4 class="font-sans font-bold text-sm text-amber-800 dark:text-amber-300">2. Stories Carousel</h4>
                      <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
                        Temporary 24-hour content kept in a horizontal bar so it does not clutter the permanent main feed.
                      </p>
                    </div>

                    <div class="p-3 rounded border-l-4 border-emerald-500 bg-white dark:bg-stone-950">
                      <h4 class="font-sans font-bold text-sm text-emerald-800 dark:text-emerald-300">3. Main Feed</h4>
                      <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
                        The primary reason people open the app: a vertical, infinite stream of posts from people they follow.
                      </p>
                    </div>

                    <div class="p-3 rounded border-l-4 border-purple-500 bg-white dark:bg-stone-950">
                      <h4 class="font-sans font-bold text-sm text-purple-800 dark:text-purple-300">4. Bottom Navigation Bar</h4>
                      <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
                        The five core destinations of the app (Home, Search, Create, Activity, Profile) always within reach of your thumb.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Original Reference Screenshot from PDF -->
                <div class="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-center">
                  <div class="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-3">Original Course Exhibit</div>
                  <img src="${path('/images/lessons/sb-1-0/page_3_img_2.png')}" alt="Original Instagram interface screenshot from course" class="max-w-[260px] mx-auto rounded-xl shadow-md border border-stone-300 dark:border-stone-700" />
                  <p class="text-[11px] font-mono text-stone-500 mt-2">Figure 1: The actual historical Instagram iOS interface screenshot provided in the original curriculum.</p>
                </div>
              </div>

              <h2 id="sec-ixd">5. Step 3: Interaction Design (How Things Connect)</h2>
              <p>
                After deciding what content goes where, you plan how users will move between these sections. This is called <strong>Interaction Design (IxD)</strong>.
              </p>
              <p>
                Interaction designers decide what happens when a user touches the screen: does a new page slide in from the right? Does a sheet pull up from the bottom? How does a button change color when tapped?
              </p>
              <p>
                In this phase, designers stay fast and flexible. You do not spend hours picking colors or fonts; you make <strong>simple paper sketches and wireframes</strong> so you can experiment quickly without wasting time.
              </p>

              <!-- Original Sketches Exhibits from PDF -->
              <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-center">
                  <img src="${path('/images/lessons/sb-1-0/page_5_img_2.png')}" alt="Whiteboard sketch for website" class="w-full h-48 object-contain rounded-md" />
                  <p class="text-[11px] font-mono text-stone-500 mt-2">Figure 2: Original whiteboard sketch for early website ideation.</p>
                </div>
                <div class="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-center">
                  <img src="${path('/images/lessons/sb-1-0/page_5_img_3.png')}" alt="Wireframe for an app" class="w-full h-48 object-contain rounded-md" />
                  <p class="text-[11px] font-mono text-stone-500 mt-2">Figure 3: Original wireframe for an app testing layout flows.</p>
                </div>
              </div>

              <h2 id="sec-testing">6. Step 4: Usability Testing (Testing Early to Save Time)</h2>
              <p>
                Once you connect your wireframes into a "clickable prototype," it is time to test your ideas with real people. You give a user a clear task (for example: <em>"Can you find and order a coffee using this app?"</em>) and watch where they hesitate, where they tap by mistake, and where they get stuck.
              </p>
              <p>
                <strong>The golden rule of UX design: test as early as possible.</strong> It takes two minutes to erase a pencil sketch, but it takes weeks to rewrite coded software.
              </p>

              <!-- Cost of Change Comparison Bar -->
              <div class="my-10 p-6 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/30">
                <div class="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-4 flex items-center justify-between">
                  <span>// The Cost-of-Change Rule</span>
                  <span class="text-emerald-700 dark:text-emerald-400 font-semibold font-mono">Why We Test Early</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="p-4 rounded-md border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-stone-950">
                    <div class="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-1">Phase 1: Sketches</div>
                    <div class="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">Paper & Whiteboard</div>
                    <p class="text-xs text-stone-600 dark:text-stone-400 mb-3">Exploring rough ideas quickly with pen and paper.</p>
                    <div class="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 p-1.5 rounded text-center">
                      Cost to change: Minutes
                    </div>
                  </div>

                  <div class="p-4 rounded-md border-2 border-amber-400 dark:border-amber-600 bg-white dark:bg-stone-950 shadow-xs">
                    <div class="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 mb-1">Phase 2: Wireframes</div>
                    <div class="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">Clickable Prototype</div>
                    <p class="text-xs text-stone-600 dark:text-stone-400 mb-3">Testing with real people before building anything in code.</p>
                    <div class="text-[11px] font-mono font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 p-1.5 rounded text-center">
                      Best Time to Catch Mistakes
                    </div>
                  </div>

                  <div class="p-4 rounded-md border border-rose-300 dark:border-rose-800 bg-white dark:bg-stone-950">
                    <div class="text-[11px] font-mono font-bold text-rose-700 dark:text-rose-400 mb-1">Phase 3: Final Code</div>
                    <div class="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">Production UI</div>
                    <p class="text-xs text-stone-600 dark:text-stone-400 mb-3">Polished graphics, final animations, and live code.</p>
                    <div class="text-[11px] font-mono font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 p-1.5 rounded text-center">
                      Cost to change: Weeks & Money
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="sec-visual">7. Step 5: Visual & UI Design (The Final Polish)</h2>
              <p>
                After your usability testing confirms that the prototype works smoothly, you begin the visual design work. This is what most people notice first: typography, colors, button styles, spacing, and icons.
              </p>
              <p>
                Visual designers often build a <strong>Design System</strong>: a shared library of reusable components (like buttons, dropdowns, and form inputs) so that everyone on the engineering team builds screens with the same consistent look and feel.
              </p>

              <!-- Original Design System Exhibit from PDF -->
              <div class="my-8 p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-center">
                <img src="${path('/images/lessons/sb-1-0/page_7_img_2.png')}" alt="A basic design system from the curriculum" class="max-w-md mx-auto rounded-md border border-stone-200 dark:border-stone-800" />
                <p class="text-[11px] font-mono text-stone-500 mt-2">Figure 4: A basic design system library showing unified buttons, color swatches, and typography.</p>
              </div>

              <p>
                Remember that interfaces are not only visual. With the rise of voice assistants like Siri and Alexa, designers also create Voice User Interfaces (VUI), crafting natural spoken conversations instead of buttons on a glass screen.
              </p>

              <h2 id="sec-careers">8. Career Paths: Generalist, Specialist, or T-Shaped?</h2>
              <p>
                Now that you know the whole process from research to final pixels, which role fits you best? In the design industry, careers generally follow four paths:
              </p>

              <!-- Career Paths Table with Colored Role Tags -->
              <div class="my-8 overflow-x-auto">
                <table class="w-full text-left text-sm font-sans border-collapse border-y border-stone-200 dark:border-stone-800">
                  <thead>
                    <tr class="border-b border-stone-200 dark:border-stone-800 text-xs font-mono uppercase tracking-wider text-stone-500">
                      <th class="py-3 pr-4">Career Type</th>
                      <th class="py-3 px-4">What They Do</th>
                      <th class="py-3 px-4">Where They Shine</th>
                      <th class="py-3 pl-4">The Challenge</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">
                        <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Generalist</span>
                      </td>
                      <td class="py-3 px-4 text-stone-800 dark:text-stone-200">Handles everything from user interviews to wireframes and UI colors.</td>
                      <td class="py-3 px-4 text-stone-600 dark:text-stone-400">Startups and small teams that need one designer to do it all.</td>
                      <td class="py-3 pl-4 text-stone-500">Hard to become a deep master in every single skill.</td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">
                        <span class="px-2 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">Specialist</span>
                      </td>
                      <td class="py-3 px-4 text-stone-800 dark:text-stone-200">Focuses deeply on one single area (e.g. only User Research or only Motion Design).</td>
                      <td class="py-3 px-4 text-stone-600 dark:text-stone-400">Large tech companies with big teams (like Google or Apple).</td>
                      <td class="py-3 pl-4 text-stone-500">Can lose sight of how other parts of the product work.</td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">
                        <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">T-Shaped</span>
                      </td>
                      <td class="py-3 px-4 text-stone-800 dark:text-stone-200">Understands the entire process broadly, with one deep superpower (like elite UI design).</td>
                      <td class="py-3 px-4 text-stone-600 dark:text-stone-400">Growing product companies and modern tech teams.</td>
                      <td class="py-3 pl-4 text-stone-500">Requires continuous practice to keep your primary skill sharp.</td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4 font-mono font-bold">
                        <span class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">M-Shaped</span>
                      </td>
                      <td class="py-3 px-4 text-stone-800 dark:text-stone-200">Has multiple superpowers: for example, skilled in both UX design and front-end code.</td>
                      <td class="py-3 px-4 text-stone-600 dark:text-stone-400">Fast-moving teams, founder roles, and cross-functional squads.</td>
                      <td class="py-3 pl-4 text-stone-500">Switching between coding and designing can be mentally tiring.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Derivative Attribution Card with Author Avatar (ADR-009) -->
              <div class="mt-14 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-stone-500 gap-4">
                <div class="flex items-center gap-3">
                  <img src="${path('/images/lessons/sb-1-0/page_8_img_2.png')}" alt="Laurel Hechanova" class="w-10 h-10 rounded-full object-cover border border-stone-300 dark:border-stone-700 shrink-0" />
                  <div>
                    <span class="font-mono text-[11px] uppercase tracking-wider text-stone-400 block mb-0.5">// Source Attribution</span>
                    <span>Adapted for self-study from <em>Introduction to UX Design</em> by <strong>Laurel Hechanova</strong> (Co-founder of Goodmaker, Springboard UX Career Track).</span>
                  </div>
                </div>
                <a href="https://readwise.io/reader/document_raw_content/490658744" target="_blank" rel="noopener noreferrer" class="hover:text-stone-900 dark:hover:text-stone-200 underline underline-offset-4 font-mono shrink-0">
                  Original Source Link ↗
                </a>
              </div>
            `,
          },
          {
            id: 'sb-1-1',
            slug: 'the-art-of-ethical-ux',
            title: 'The Art of Ethical UX: Designing for Trust and Autonomy',
            module: 'UX Research & Discovery Foundations',
            unitNumber: 1,
            lessonNumber: '1.1',
            type: 'article',
            readTime: '10 min',
            originalSourceUrl: 'https://springboard.com/resources/ethical-ux',
            originalSourceLabel: 'Springboard Curriculum Core Reading',
            summaryQuote: 'Design is not merely how an interface looks; it is the concrete architecture of decisions that respects or exploits user agency.',
            outline: [
              { id: 'sec-foundations', title: '1. Foundations of Ethical Agency', level: 2 },
              { id: 'sec-dark-patterns', title: '2. Deconstructing Subversive Patterns', level: 2 },
              { id: 'sec-trust-framework', title: '3. The Architectural Trust Matrix', level: 2 },
              { id: 'sec-conclusion', title: '4. Synthesis & The Practitioner\'s Pledge', level: 2 },
            ],
            contentHtml: `
              <p class="lead text-lg font-serif italic text-ink-muted">
                Every interaction designed is an intentional distribution of power. When we craft digital environments, we decide whether the interface empowers conscious choice or manufactures involuntary compliance.
              </p>

              <h2 id="sec-foundations">1. Foundations of Ethical Agency</h2>
              <p>
                In product design, user autonomy is frequently compromised not through malice, but through the misaligned incentive structures of engagement optimization. Ethical user experience begins with a non-negotiable premise: <em>the user's cognitive attention and decision-making sovereignty are sacred.</em>
              </p>
              <p>
                When individuals navigate complex software systems, they construct mental models based on perceived trust heuristics. Violating these heuristics by disguising commercial obligations as navigational necessities creates friction that ultimately erodes brand longevity.
              </p>

              <blockquote>
                "Good design is honest. It does not make a product more innovative, powerful or valuable than it really is. It does not attempt to manipulate the consumer with promises that cannot be kept."
                <cite class="block text-right text-xs not-italic mt-2 text-ink-muted">— Dieter Rams, Ten Principles for Good Design</cite>
              </blockquote>

              <h2 id="sec-dark-patterns">2. Deconstructing Subversive Patterns</h2>
              <p>
                Dark patterns represent cognitive exploitation codified into CSS and interaction choreography. Consider the common asymmetry found in cancellation flows: onboarding requires a single click, while subscription termination necessitates traversing multi-layered confirmation dialogues with loaded guilt-framing copy ("Confirmshaming").
              </p>
              <p>
                To maintain ethical rigor, the practitioner must implement symmetrical affordances: <strong>The cognitive difficulty of leaving a service must never exceed the cognitive difficulty of joining it.</strong>
              </p>

              <h2 id="sec-trust-framework">3. The Architectural Trust Matrix</h2>
              <p>
                We evaluate ethical interfaces across three operational dimensions:
              </p>
              <ul class="list-disc pl-6 space-y-2 mb-6 text-ink">
                <li><strong>Transparency of Intent:</strong> Explicit disclosures regarding data telemetry and commercial consequences before irreversible actions.</li>
                <li><strong>Reversibility of Action:</strong> Forgiving system states where destructive or binding decisions can be cleanly unmade without punitive hurdles.</li>
                <li><strong>Cognitive Clarity:</strong> Neutral language stripped of manipulative emotional urgency or manufactured scarcity.</li>
              </ul>

              <h2 id="sec-conclusion">4. Synthesis & The Practitioner\'s Pledge</h2>
              <p>
                As researchers and designers, our primary loyalty does not belong to the quarterly conversion metric; it belongs to the human being sitting in front of the illuminated screen seeking to accomplish a meaningful life task without being tricked.
              </p>
            `,
          },
          {
            id: 'sb-1-2',
            slug: 'generative-user-interviews',
            title: 'Generative User Interviews: The Masterclass in Inquiry',
            module: 'UX Research & Discovery Foundations',
            unitNumber: 1,
            lessonNumber: '1.2',
            type: 'video',
            readTime: '18 min',
            originalSourceUrl: 'https://youtube.com/watch?v=mock-ux-interview',
            originalSourceLabel: 'Video Lecture & Verbatim Transcript',
            youtubeId: 'dQw4w9WgXcQ', // Standard mock ID
            summaryQuote: 'A generative interview is not an interrogation; it is creating a comfortable acoustic chamber where unspoken workarounds reveal themselves.',
            outline: [
              { id: 'vid-intro', title: '1. The Philosophy of Generative Inquiry', level: 2 },
              { id: 'vid-probing', title: '2. The 5-Why Probe Architecture', level: 2 },
              { id: 'vid-silence', title: '3. Tactical Silence as a Data Instrument', level: 2 },
            ],
            videoTimestamps: [
              { time: 0, label: '00:00 - Introduction', text: 'Welcome to this session on generative research methods. Today we are discarding structured questionnaires and examining how human beings truly express frustration.' },
              { time: 60, label: '01:00 - Framing Intent', text: 'When you sit across from a participant, your posture and breathing determine the depth of disclosure. If you act like an investigator, you receive defensive, polite answers.' },
              { time: 180, label: '03:00 - Tactical Silence', text: 'The most critical tool in qualitative inquiry is tactical silence. When a participant stops talking, count four seconds in your mind before responding. In that quiet pause, ninety percent of genuine workarounds are articulated.' },
              { time: 320, label: '05:20 - Avoiding Leading Prompts', text: 'Never ask "Would you find this dashboard helpful?" Humans are conditioned to be agreeable. Instead ask: "Tell me about the last time you attempted to compile this quarterly report. What tools were on your desk?"' }
            ],
            contentHtml: `
              <p class="lead text-lg font-serif italic text-ink-muted">
                This session examines the exact psychological posture required to elicit authentic behavioral narratives during qualitative user interviews.
              </p>

              <h2 id="vid-intro">1. The Philosophy of Generative Inquiry</h2>
              <p data-timestamp="0">
                Welcome to this session on generative research methods. Today we are discarding structured questionnaires and examining how human beings truly express frustration. Evaluative research checks whether an existing button works; generative research discovers whether the problem even deserves to exist.
              </p>

              <h2 id="vid-probing">2. The 5-Why Probe Architecture</h2>
              <p data-timestamp="60">
                When you sit across from a participant, your posture and breathing determine the depth of disclosure. If you act like an investigator, you receive defensive, polite answers. You must position yourself as an apprentice eager to learn how they survive their daily tasks.
              </p>

              <h2 id="vid-silence">3. Tactical Silence as a Data Instrument</h2>
              <p data-timestamp="180">
                The most critical tool in qualitative inquiry is tactical silence. When a participant stops talking, count four seconds in your mind before responding. In that quiet pause, ninety percent of genuine workarounds are articulated.
              </p>
              <p data-timestamp="320">
                Never ask "Would you find this dashboard helpful?" Humans are conditioned to be agreeable. Instead ask: "Tell me about the last time you attempted to compile this quarterly report. What tools were on your desk?"
              </p>
            `,
          }
        ]
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'Information Architecture & Mental Models',
        description: 'Taxonomies, navigation topologies, and card sorting experiments.',
        lessons: [
          {
            id: 'sb-2-1',
            slug: 'card-sorting-and-mental-models',
            title: 'Card Sorting & Cognitive Schemas',
            module: 'Information Architecture & Mental Models',
            unitNumber: 2,
            lessonNumber: '2.1',
            type: 'article',
            readTime: '15 min',
            summaryQuote: 'Information architecture is not about organizing files; it is about harmonizing external structures with internal cognitive schemas.',
            outline: [
              { id: 'ia-schemas', title: '1. Human Categorization Heuristics', level: 2 },
              { id: 'ia-methods', title: '2. Open vs. Closed Card Sorting', level: 2 },
            ],
            contentHtml: '<p>Content for Card Sorting and Cognitive Schemas...</p>',
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
