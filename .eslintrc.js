const jest = require('jest/package.json');

module.exports = {
  extends: ['airbnb', 'plugin:react/jsx-runtime', 'plugin:jest/recommended'],
  parser: '@babel/eslint-parser',
  plugins: ['jest'],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: jest.version,
    },
    'import/resolver': 'webpack',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    '.vscode',
    '/src/assets/',
    '*.md',
  ],
};
