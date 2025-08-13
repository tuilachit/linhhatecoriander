/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cute-pink': '#FFB6C1',
        'cute-purple': '#DDA0DD',
        'cute-blue': '#87CEEB',
        'cute-yellow': '#FFE4B5',
        'cute-green': '#98FB98',
        'dachshund-brown': '#8B4513',
        'dachshund-gold': '#DAA520',
      },
      fontFamily: {
        'cute': ['Comic Sans MS', 'cursive'],
        'happy': ['Fredoka One', 'cursive'],
        'playful': ['Bubblegum Sans', 'cursive'],
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float-cute': 'floatCute 4s ease-in-out infinite',
        'paw-print': 'pawPrint 3s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        floatCute: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        pawPrint: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '100%': { opacity: '0', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} 