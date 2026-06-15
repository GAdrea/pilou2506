/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './pages/**/*.html',
    './data/*.js',
    './assets/js/*.js',
    './script.js',
  ],
  theme: {
    extend: {
      colors: {
        jpRed:      '#bc002d',
        frBlue:     '#002395',
        mtOrange:   '#ff8c00',
        hibiscus:   '#ff4d6d',
        neonCyan:   '#00d4ff',
        hudBg:      '#050a12',
        hudSurface: '#0d1525',
      },
    },
  },
  plugins: [],
}
