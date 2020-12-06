module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'plugins': [
    'react-hooks'
  ],
  'parser': 'babel-eslint',
  'extends': 'alloy',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'indent': [
      'error',
      4
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    "no-unused-vars": "off"
  }
};