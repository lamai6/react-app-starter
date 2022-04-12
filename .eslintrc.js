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
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-confusing-arrow': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, consistent: true },
        ExportDeclaration: { multiline: true, consistent: true },
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
