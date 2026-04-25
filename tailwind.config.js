/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        airtel: {
          red: '#D71920',
          light: '#ff2c35',
          dark: '#a81117',
          deeper: '#8a0e14',
          rose: '#ff6b6b',
          blush: '#ffe0e0',
        },
        neuro: {
          bg: '#e0e5ec',
          surface: '#e8ecf1',
          light: '#ffffff',
          dark: '#a3b1c6',
          muted: '#c8d0da',
        }
      },
      boxShadow: {
        'neo': '8px 8px 16px rgba(163,177,198,0.6), -8px -8px 16px rgba(255,255,255,0.5)',
        'neo-lg': '12px 12px 24px rgba(163,177,198,0.6), -12px -12px 24px rgba(255,255,255,0.5)',
        'neo-sm': '4px 4px 8px rgba(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5)',
        'neo-inset': 'inset 6px 6px 12px rgba(163,177,198,0.6), inset -6px -6px 12px rgba(255,255,255,0.7)',
        'neo-inset-sm': 'inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.6)',
        'neo-red': '6px 6px 14px rgba(168,17,23,0.35), -6px -6px 14px rgba(255,44,53,0.15)',
        'neo-red-lg': '8px 8px 20px rgba(168,17,23,0.4), -8px -8px 20px rgba(255,44,53,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}