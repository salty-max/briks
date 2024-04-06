/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: [
    'simple-import-sort',
    'prettier',
    'react',
    'react-hooks',
    'testing-library',
    'jest',
    'jest-dom',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'turbo',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'consistent-return': 'off',
    'default-param-last': 'off',
    'guard-for-in': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'no-inner-declarations': 'off',
    'no-lonely-if': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-promise-executor-return': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-void': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Packages and side effect imports.
          ['^@?\\w', '^\\u0000'],
          // Components and providers.
          ['^@/components', '^@/providers'],
          // Hooks
          ['^@/hooks'],
          // Utils, helpers, and lib
          ['^@/utils', '^@/helpers', '^@/lib'],
          // Other absolute imports.
          ['^@/'],
          // Relative imports.
          ['^\\.'],
          // Import type and types.
          ['^.*\\u0000$', '^@/types'],
          // Styles.
          ['^.+\\.s?css$'],
          // Anything not matched in another group.
          ['^'],
        ],
      },
    ],
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/no-node-access': 'off',
    'testing-library/no-render-in-lifecycle': 'off',
    'testing-library/no-unnecessary-act': 'off',
    'testing-library/no-wait-for-side-effects': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
  ignorePatterns: [
    '.next',
    '.turbo',
    'dist',
    'node_modules',
    '**/*.js',
    '**/*.mjs',
    '**/*.jsx',
    '**/*.mdx',
  ],
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mdx)'],
      rules: {
        'storybook/hierarchy-separator': 'error',
        'storybook/default-exports': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['*.@(spec|test).@(ts|tsx)'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
    },
    typescript: {},
    react: {
      version: 'detect',
    },
  },
  env: {
    jest: true,
  },
};
