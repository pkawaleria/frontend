/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
        screens: {
            'mw-340': { 'max': '340px' },
            'mw-480': { 'max': '480px' },
            'mw-lg': { 'max': '850px' },
            'mw-xs': { 'max': '420px' },
            'mw-2xs': { 'max': '280px' },
            'mh-xs': { 'raw': '(max-height: 700px)' }
        },
        extend: {
            boxShadow: {
                '3xl': '0 20px 20px 0px rgba(0, 0, 0, 0.3)'
            },
            minHeight: {
                '55': '55px'
            },
            colors: {
                accent: {
                    bkg: "hsl(var(--color-bkg) / <alpha-value>)",
                    content: "hsl(var(--color-content) / <alpha-value>)",
                }
            }
        },
    },
    plugins: [],
}
