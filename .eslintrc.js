module.exports = {
  parser: 'typescript-eslint-parser',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { "extensions": ['.js', '.jsx', '.tsx'] }]
  },
  'env': {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.tsx'],
      },
    },
  },
};
