const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    require.resolve('./base'),
  ],
  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-console': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/unambiguous': 'error',
    'import/no-amd': 'error',
    'import/no-deprecated': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-nodejs-modules': 'error',
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-unassigned-import': [
      'error',
      { allow: ['**/*.css', '**/*.scss'] },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['parent', 'internal'],
          'sibling',
          ['unknown', 'index', 'object'],
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/internal-regex': '^~/',
  },
  overrides: [
    {
      files: [
        '**/*.test.{js,jsx,ts,tsx}',
        '**/__test?(s)__/**/*.{js,jsx,ts,tsx}',
        '**/__mock?(s)__/**/*.{js,jsx,ts,tsx}',
      ],
      env: {
        node: true,
        jest: true,
      },
    },
    {
      files: ['gatsby-node.{js,jsx,ts,tsx}'],
      env: {
        node: true,
        browser: false,
      },
    },
    {
      files: ['gatsby-ssr.{js,jsx,ts,tsx}'],
      env: {
        node: true,
        browser: true,
        'shared-node-browser': true,
      },
    },
    {
      files: ['gatsby-browser.{js,jsx,ts,tsx}'],
      env: {
        node: false,
        browser: true,
      },
    },
  ],
};
