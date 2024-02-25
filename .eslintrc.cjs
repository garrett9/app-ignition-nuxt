module.exports = {
  root: true,
  extends: [
    // Base ESLint rules
    'eslint:recommended',

    // Typescript rules
    'plugin:@typescript-eslint/recommended',

    // Promise rules
    'plugin:promise/recommended',

    // Browser compatibility rules
    'plugin:compat/recommended',

    // Accessibility rules
    'plugin:vuejs-accessibility/recommended',

    // Prettier rules
    'plugin:prettier-vue/recommended',

    // Nuxt rules with Vue3 rules
    '@nuxt/eslint-config',
  ],
  plugins: [
    'import',
    'unused-imports',
    'simple-import-sort',
    '@typescript-eslint',
    'vuejs-accessibility',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.vue'],
    },
    'prettier-vue': {
      // Settings for how to process Vue SFC Blocks
      SFCBlocks: {
        // Don't run ESLint on <template> blocks. Instead, rely on @nuxt/eslint-config to format it since it does a better job.
        template: false,

        // Run ESLint on <script> blocks.
        script: true,

        // Run ESLint on <style> blocks.
        style: true,
      },
    },
  },
  rules: {
    // Prettier Rules
    'prettier-vue/prettier': [
      'error',
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        printWidth: 100,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      },
    ],

    // Typescript Rules
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // Console Rules
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Imports Rules
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // All 3rd - party imports
          ['^(?!(app\\/)|(.*.scss)|(\\.)).*$'],
          // SCSS files
          ['^.*.scss$'],
          // local absolute imports
          ['^(app\\/).*$'],
          // local relative imports
          ['^\\.'],
        ],
      },
    ],

    // Vue Rules
    'vue/html-indent': ['error'],
    'vue/singleline-html-element-content-newline': ['error'],
    'vue/max-attributes-per-line': ['error'],
    'vue/multiline-html-element-content-newline': ['error'],
    'vue/html-self-closing': ['error'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],

    // Other Rules
    curly: 'error',
    'func-style': ['error', 'expression'],
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
  },
};
