// postcss.config.cjs

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: {
    'flex-gap-polyfill': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 0,
    },
    autoprefixer: {},
  },
};
