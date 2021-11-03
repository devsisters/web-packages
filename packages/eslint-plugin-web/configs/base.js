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
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-console': 'warn',
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
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
      },
    ],
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
    'keyword-spacing': 'error',
    // See https://github.com/typescript-eslint/typescript-eslint/issues/1824
    // "@typescript-eslint/indent": ["error", 2],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
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
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          colon: {
            before: false,
            after: true
          },
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ]
  },
  settings: {
    'import/internal-regex': '^~/',
  }
};
