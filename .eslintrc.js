module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'prefer-arrow-callback': 'error',
    'react/jsx-filename-extension': false
  },
  ecmaFeatures: {
    jsx: true,
    modules: true,
    arrowFunctions: true,
    classes: true,
    spread: true,
  },
  globals: {
    window: true
  }
};
