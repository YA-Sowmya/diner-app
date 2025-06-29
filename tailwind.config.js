/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        markazi: ["'Markazi Text'", "serif"],
        karla: ["'Karla'", "sans-serif"]
      },
      extend: {
      colors: {
        primary: '#495E57',
        accent: '#F4CE14',
        highlight: '#EDEFEE',
        charcoal: '#333333',
      },
    },
  },
  plugins: [],
}

