/**
 * Extensible Tone-Calibrated Domain & Metadata Color System
 * Strictly text colors adhering to light (600/700) and dark (400) calibrated tones.
 * Zero background color modifications; pure typographic hierarchy.
 */

export interface ColorDefinition {
  text: string;
}

export const DOMAIN_COLORS: Record<string, ColorDefinition> = {
  // Artificial Intelligence & Machine Learning
  ai: { text: 'text-fuchsia-600 dark:text-fuchsia-400' },
  'artificial intelligence': { text: 'text-fuchsia-600 dark:text-fuchsia-400' },
  'machine learning': { text: 'text-fuchsia-600 dark:text-fuchsia-400' },

  // Software & Systems Engineering
  engineering: { text: 'text-sky-600 dark:text-sky-400' },
  'software engineering': { text: 'text-sky-600 dark:text-sky-400' },
  'systems & architecture': { text: 'text-sky-600 dark:text-sky-400' },
  programming: { text: 'text-sky-600 dark:text-sky-400' },

  // Product Design & UX / HCI
  'product design': { text: 'text-teal-600 dark:text-teal-400' },
  'design & hci': { text: 'text-teal-600 dark:text-teal-400' },
  design: { text: 'text-teal-600 dark:text-teal-400' },
  ux: { text: 'text-teal-600 dark:text-teal-400' },
  'ui/ux': { text: 'text-teal-600 dark:text-teal-400' },

  // Cognitive Science & Psychology
  cognition: { text: 'text-purple-600 dark:text-purple-400' },
  'cognitive science': { text: 'text-purple-600 dark:text-purple-400' },
  psychology: { text: 'text-purple-600 dark:text-purple-400' },

  // Typography & Book Arts
  typography: { text: 'text-amber-700 dark:text-amber-400' },
  'book arts': { text: 'text-amber-700 dark:text-amber-400' },

  // Philosophy & Ethics
  philosophy: { text: 'text-rose-600 dark:text-rose-400' },
  ethics: { text: 'text-rose-600 dark:text-rose-400' },

  // Mathematics & Algorithms
  mathematics: { text: 'text-cyan-600 dark:text-cyan-400' },
  algorithms: { text: 'text-cyan-600 dark:text-cyan-400' },

  // Product Strategy & Business
  business: { text: 'text-emerald-600 dark:text-emerald-400' },
  strategy: { text: 'text-emerald-600 dark:text-emerald-400' },
};

const DEFAULT_DOMAIN_COLOR: ColorDefinition = {
  text: 'text-zinc-600 dark:text-zinc-400',
};

export function getCategoryColor(category: string): string {
  if (!category) return DEFAULT_DOMAIN_COLOR.text;
  const key = category.trim().toLowerCase();
  return DOMAIN_COLORS[key]?.text || DEFAULT_DOMAIN_COLOR.text;
}

export const FORMAT_COLORS: Record<string, ColorDefinition> = {
  video: { text: 'text-rose-600 dark:text-rose-400' },
  article: { text: 'text-sky-600 dark:text-sky-400' },
  pdf: { text: 'text-amber-700 dark:text-amber-400' },
  audio: { text: 'text-violet-600 dark:text-violet-400' },
};

export function getFormatColor(type: string): string {
  if (!type) return 'text-ink-muted dark:text-dark-muted';
  const key = type.trim().toLowerCase();
  return FORMAT_COLORS[key]?.text || 'text-ink-muted dark:text-dark-muted';
}
