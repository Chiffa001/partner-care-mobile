// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      semi: ['error', 'always'],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Node.js builtins.
            ['^node:'],
            // Packages.
            ['^@?\\w'],
            // Absolute/alias imports.
            ['^(@|~|src|app|components|features|hooks|utils|lib|services|assets)(/.*|$)'],
            // Relative imports.
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
]);
