/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      colors: {
        // Skeleton surface tokens — maps to zinc palette
        surface: {
          base: '#fafafa',     // zinc-50 — page background
          card: '#ffffff',     // white  — cards, panels
          sidebar: '#ffffff',  // white  — sidebar
          overlay: '#f4f4f5',  // zinc-100 — hover, subtle fills
        },
        border: {
          DEFAULT: '#e4e4e7',  // zinc-200
          strong: '#d4d4d8',   // zinc-300
        },
        text: {
          primary: '#18181b',  // zinc-900
          secondary: '#71717a', // zinc-500
          muted: '#a1a1aa',    // zinc-400
        },
        accent: {
          DEFAULT: '#18181b',  // zinc-900 — primary CTA
          hover: '#27272a',    // zinc-800
          ring: '#d4d4d8',     // zinc-300 — focus ring
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        sidebar: '1px 0 0 0 #e4e4e7',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
