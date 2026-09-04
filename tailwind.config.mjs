import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Lora', 'Charter', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        paper: {
          50: '#FDFCFA',
          100: '#F7F5F0',
          200: '#EFECE6',
          300: '#DFDAD1',
        },
        ink: {
          DEFAULT: '#22211F',
          muted: '#73716C',
          faint: '#A8A6A1',
          border: '#E8E6E1',
        },
        dark: {
          bg: '#000000',
          card: '#0A0A0A',
          border: '#1E1E1E',
          ink: '#F4F4F5',
          muted: '#8E8E93',
        },
        course: {
          terracotta: '#B35334',
          'terracotta-tint': 'rgba(224, 118, 85, 0.28)',
          pine: '#2D3E35',
          'pine-tint': 'rgba(45, 62, 53, 0.22)',
          sage: '#4A6B5B',
          ochre: '#9E6726',
        }
      },
      maxWidth: {
        'reading': '680px',
        'hub': '860px',
      }
    },
  },
  plugins: [
    typography,
  ],
};
