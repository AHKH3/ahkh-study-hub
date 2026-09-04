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
      accent: '#B35334',
      highlight: 'rgba(224, 118, 85, 0.28)',
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
