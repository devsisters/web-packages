module.exports = {
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: true,
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // It is better to setup project path manually
    // project: [],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'array-bracket-newline': ['error', 'consistent'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'array-element-newline': ['off', { multiline: true, minItems: 3 }],
    'quote-props': ['error', 'consistent-as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          consistent: true,
        },
        ObjectPattern: {
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    indent: 'off',
    // See https://github.com/typescript-eslint/typescript-eslint/issues/1824
    // "@typescript-eslint/indent": ["error", 2],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'eol-last': ['error', 'always'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
            },
          },
        },
      },
    ],
  },
};
