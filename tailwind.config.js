module.exports = {
  purge: [],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: [
      "dark",
    ],
    borderColor: ["dark"],
    textColor: ["dark"],
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    //any file that may contain the reference of CSS styles by class name.
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
