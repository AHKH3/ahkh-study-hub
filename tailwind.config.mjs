import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ui: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['var(--reader-font-family, Merriweather)', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        canvas: {
          light: '#FFFFFF',
          dark: '#121214',
        },
        surface: {
          light: '#FAFAFA',
          dark: '#18181B',
        },
        paper: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F4F4F5',
          300: '#E4E4E7',
        },
        ink: {
          DEFAULT: '#18181B',
          muted: '#71717A',
          faint: '#A1A1AA',
          border: '#E4E4E7',
        },
        dark: {
          bg: '#121214',
          surface: '#18181B',
          card: '#1E1E22',
          border: '#27272A',
          ink: '#D4D4D8',
          muted: '#A1A1AA',
          faint: '#52525B',
        }
      },
      maxWidth: {
        'reading': '68ch',
        'hub': '960px',
      }
    },
  },
  plugins: [
    typography,
  ],
};
