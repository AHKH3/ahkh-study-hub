import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/scripts/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ui: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['var(--reader-font-family, Merriweather)', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        canvas: {
          light: '#FFFFFF',
          dark: '#09090B',
        },
        surface: {
          light: '#FAFAFA',
          dark: '#121215',
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
          bg: '#09090B',
          surface: '#121215',
          card: '#18181B',
          border: '#27272A',
          ink: '#F4F4F5',
          muted: '#A1A1AA',
          faint: '#52525B',
        }
      },
      maxWidth: {
        'reading': '68ch',
        'hub': '960px',
      },
      borderRadius: {
        '2xs': '1px',
        'xs': '2px',
      },
      boxShadow: {
        '2xs': '0 1px 2px rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [
    typography,
  ],
};
