/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      maxWidth : {
      container :"1240px",
      },
      fontFamily: {
      'inter': ["Inter", "sans-serif"],
      'open_sans': ["Open Sans", "sans-serif"],
    }
    },
  },
  plugins: [],
}

