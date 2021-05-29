module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      colors: {
        'white': '#DFDFDF',
        'primary': '#121212',
        'secondary': '#242424',
        'third': '#2D2D2D',
        'fourth': '#383838',
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