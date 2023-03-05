/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        lightColor: '#FFFFFF',
        darkColor: '#0F172A',
        failureColor: {
          light: '#F87171',
          dark: '#EF4444',
        },
        successColor: {
          light: '#6EE7B7',
          dark: '#10B981',
        },
        infoColor: {
          light: '#93C5FD',
          dark: '#3B82F6',
        },
        warnColor: {
          light: '#FEF08A',
          dark: '#FDE047',
        },
        neutralColor: {
          lightest: '#F1F5F9',
          lighter: '#E2E8F0',
          light: '#CBD5E1',
          dark: '#94A3B8',
        },
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
  darkMode: 'class',
};
