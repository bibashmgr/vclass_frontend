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
      boxShadow: {
        light: '0px 0px 35px rgba(181, 181, 195, 0.15)',
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
  darkMode: 'class',
};

/* 
  colors: {
    info: {
      blue-500
    },
    failure: {
      red-500
    },
    success: {
      emerald-500
    },
    warn: {
      yellow-300
    },
    neutral: {
      
    }
    light:{
      white
    }
    dark: {
      gray-900
    }
  }
*/
