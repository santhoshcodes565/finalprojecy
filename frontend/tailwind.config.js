/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#0A2E1A', // Deep Luxury Green
          secondary: '#D4A017', // Premium Gold
          accent:    '#FEF9EE', // Cream
          dark:      '#051f10', // Ultra Dark Green for deep backgrounds
          mid:       '#14532D', // Mid Green for overlays
          light:     '#166534', // Light Green
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'ken-burns': 'kenBurns 12s ease-in-out infinite alternate',
        'float':     'float 4s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'count-up':  'countUp 2s ease forwards',
        'marquee':   'marquee 25s linear infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23D4A017\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
