import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#1F2A2E', deep: '#172024', soft: '#2A373C', line: '#34444A' },
        ivory: '#F3EFE8',
        paper: '#FCFAF6',
        sand: '#E8E2D7',
        line: '#D6CFC2',
        slate: '#46514F',
        muted: '#6B7472',
        accent: { DEFAULT: '#A8322A', coral: '#E0675C' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1280px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 48s linear infinite' },
    },
  },
  plugins: [],
};

export default config;
