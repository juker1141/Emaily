module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        'modalIcon': '41.59%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
