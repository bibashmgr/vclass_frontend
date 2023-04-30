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
      },
      boxShadow: {
        light: '0px 0px 35px rgba(181, 181, 195, 0.15)',
      },
      keyframes: {
        toaster: {
          '0%, 100%': { transform: 'translateX(320px)' },
          '25%': { transform: 'translateX(0px)' },
          '75%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        toaster: 'toaster 3s ease-in-out',
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
  darkMode: 'class',
};
