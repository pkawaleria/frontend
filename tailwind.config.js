/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'mw-xs': { 'max': '420px' },
      'mw-2xs': { 'max': '280px' },
      'mh-xs': { 'raw' : '(max-height: 700px)'}
    },
    extend: {},
  },
  plugins: [],
}

