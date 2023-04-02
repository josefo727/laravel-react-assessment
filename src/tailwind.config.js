module.exports = {
  purge: ['./resources/**/*.jsx', './resources/**/*.css'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
