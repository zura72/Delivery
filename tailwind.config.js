/** @type {import('tailwindcss').Config} */

// Warna memakai CSS variable channel "R G B" + <alpha-value> agar modifier opacity
// (mis. bg-white/10) menghasilkan rgb(... / .10) — didukung Safari/Android lama.
// Nilai variabel didefinisikan & dibalik antar tema di src/index.css (:root / .dark).
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        white: withVar('--color-white'),
        'on-brand': withVar('--color-on-brand'),
        brand: {
          50: withVar('--color-brand-50'),
          100: withVar('--color-brand-100'),
          200: withVar('--color-brand-200'),
          300: withVar('--color-brand-300'),
          400: withVar('--color-brand-400'),
          500: withVar('--color-brand-500'),
          600: withVar('--color-brand-600'),
          700: withVar('--color-brand-700'),
        },
        accent: {
          300: withVar('--color-accent-300'),
          400: withVar('--color-accent-400'),
          500: withVar('--color-accent-500'),
          600: withVar('--color-accent-600'),
        },
        ink: {
          700: withVar('--color-ink-700'),
          800: withVar('--color-ink-800'),
          900: withVar('--color-ink-900'),
        },
        slate: {
          200: withVar('--color-slate-200'),
          300: withVar('--color-slate-300'),
          400: withVar('--color-slate-400'),
          500: withVar('--color-slate-500'),
        },
        emerald: {
          300: withVar('--color-emerald-300'),
          400: withVar('--color-emerald-400'),
        },
        amber: {
          300: withVar('--color-amber-300'),
          400: withVar('--color-amber-400'),
        },
        rose: {
          300: withVar('--color-rose-300'),
          400: withVar('--color-rose-400'),
        },
        violet: {
          300: withVar('--color-violet-300'),
        },
      },
    },
  },
  plugins: [],
}
