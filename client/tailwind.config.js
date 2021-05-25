module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: ['red', 'yellow', 'green', '400', '500', '600', '700', '800']
    }
  },
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
