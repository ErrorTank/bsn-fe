const {join} = require('path');

module.exports = {
  plugins: {
    'postcss-utilities': {},
    'postcss-import': {},
    precss: {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: join(__dirname, './tailwind.config.cjs')
    },
    autoprefixer: {},
  }
};
