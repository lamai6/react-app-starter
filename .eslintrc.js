module.exports = {
    extends: [
        'airbnb',
        'plugin:react/jsx-runtime',
        'plugin:jest/recommended'
    ],
    parser: '@babel/eslint-parser',
    plugins: ['jest'],
    settings: {
        'react': {
            'version': 'detect'
        },
        'jest': {
            'version': require('jest/package.json').version,
        }
    },
    env: {
        'browser': true,
        'node': true
    },
    ignorePatterns: ['node_modules', 'dist', 'coverage']
}