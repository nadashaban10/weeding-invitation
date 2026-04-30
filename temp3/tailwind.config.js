/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        ink: '#1c1917',
        paper: '#fbf7f0',
        champagne: '#f3eadb',
        obsidian: '#12100e',
        gold: {
          DEFAULT: '#b88a3b',
          light: '#e3c98c',
          dark: '#7b5a22',
        },
        muted: '#5d564d',
        dim: '#81776b',
        line: 'rgba(184, 138, 59, 0.22)',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1.2s ease both',
        'float-petal': 'floatUp 4s ease-in infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ring-pulse': 'ringPulse 1.6s ease-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '100%': { transform: 'translateY(-80px) scale(1.4)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(1)', opacity: '0.75' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
