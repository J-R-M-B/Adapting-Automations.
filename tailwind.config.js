/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'energyFlow': 'energyFlow 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};