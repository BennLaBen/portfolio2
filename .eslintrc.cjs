/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'testing-library'],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'info'] }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      env: { 'vitest-globals/env': true },
      rules: {
        'no-console': 'off'
      }
    }
  ]
};

