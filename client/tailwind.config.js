module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        'modalIcon': '41.59%',
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        'white': '#DFDFDF',
        'primary': '#121212',
        'secondary': '#242424',
        'third': '#BB86FC',
      },
      borderRadius: ['hover', 'focus'],
    },
    fontFamily: {
      sans: [
        'Roboto',
        'system-ui',
      ],
      'FugazOne': ['"Fugaz One"', 'cursive']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}