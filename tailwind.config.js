/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './pages/**/*.{ts,tsx}',
  './node_modules/framer-motion/dist/**/*.js'
]
,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        dark: '#0b0b0b',
        light: '#f4f4f5',
      },
      keyframes: {
        typing: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#22c55e' },
        },
        pulseBackground: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        typewriter: 'typing 3.5s steps(40, end) 1 normal both, blink 1s step-end infinite',
        'bg-pulse': 'pulseBackground 15s ease infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
