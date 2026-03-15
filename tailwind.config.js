/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'desktop': '#82B1FF',
        'window-bg': '#FFFFFF',
        'header-dark': '#1A2B3C',
        'accent': '#4A698D',
        'retro-text': '#1A1A1A',
      },
    },
  },
  plugins: [],
}