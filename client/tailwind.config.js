module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': {
          '900': '#0C4A6E'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
