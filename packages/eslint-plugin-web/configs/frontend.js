const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    require.resolve('./base'),
  ],
  rules: {

    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'import/no-unassigned-import': [
      'error',
      { allow: ['**/*.css', '**/*.scss'] },
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
