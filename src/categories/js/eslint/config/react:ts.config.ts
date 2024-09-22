import { jestMutation, prettierMutation } from '../eslint.utils';
import { Config } from './config.interface';

export const reactTsConfig: Config = {
  dependencies: ['globals', '@eslint/js', 'typescript-eslint', 'eslint-plugin-react', 'eslint-plugin-beautiful-sort'],
  imports: [
    `import globals from 'globals'`,
    `import eslint from '@eslint/js'`,
    `import tseslint from 'typescript-eslint'`,
    `import pluginReact from 'eslint-plugin-react'`,
    `import beautifulSort from 'eslint-plugin-beautiful-sort'`,
  ],
  configs: ['eslint.configs.recommended', '...tseslint.configs.recommended', `pluginReact.configs.flat['jsx-runtime']`],
  eslintConfig: {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: ['browser'],
      parserOptions: {
        project: true,
      },
    },
    ignores: ['node_modules', 'dist'],
    plugins: {
      'beautiful-sort': 'beautifulSort',
    },
    rules: {
      'no-use-before-define': 'error',
      'object-shorthand': 'warn',
      'no-async-promise-executor': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-deprecated': 'error',
      'beautiful-sort/import': [
        'error',
        {
          special: [],
          order: ['special', 'namespace', 'default', 'defaultObj', 'obj', 'none'],
        },
      ],
    },
  },
  typescript: true,
  scripts: [
    { name: 'lint', script: 'eslint "**/*.{ts,tsx}"' },
    { name: 'lint:fix', script: 'eslint "**/*.{ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
