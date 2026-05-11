/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        ink: '#141210',
        paper: '#f7f4ee',
        mist: '#e8e4dc',
        teal: {
          DEFAULT: '#1e3d3a',
          soft: '#2a524d',
        },
        gold: {
          DEFAULT: '#b8924a',
          light: '#dcc598',
          dark: '#7a5e28',
        },
        muted: '#5c564c',
        dim: '#7a7368',
      },
      animation: {
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1s ease both',
        'scale-in': 'scaleIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-petal': 'floatPetal 5s ease-in-out infinite',
        'shimmer-line': 'shimmerLine 2.4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatPetal: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg) scale(1)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translate(var(--petal-drift-x, 18px), -28px) rotate(12deg) scale(1.16)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translate(0, -52px) rotate(0deg) scale(1.1)',
            opacity: '0.55',
          },
          '75%': {
            transform: 'translate(calc(-1 * var(--petal-drift-x, 18px)), -22px) rotate(-11deg) scale(1.12)',
            opacity: '0.38',
          },
        },
        shimmerLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184, 146, 74, 0.35)' },
          '50%': { boxShadow: '0 0 0 12px rgba(184, 146, 74, 0)' },
        },
      },
    },
  },
  plugins: [],
}
