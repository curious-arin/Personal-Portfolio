/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#070b14',
        panel: '#111318',
        // Objects (not plain strings) so shades like violet-500 and
        // opacity modifiers like bg-violet/15 both work.
        violet: { DEFAULT: '#8b5cf6', 400: '#a78bfa', 500: '#7c3aed', 600: '#6d28d9' },
        mint: { DEFAULT: '#67e8f9', 400: '#a5f3fc' },
      },
      boxShadow: { glow: '0 0 70px rgba(139, 92, 246, .22)' },
    },
  },
  plugins: [],
}
