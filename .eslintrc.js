module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
    'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
    complexity: ['error', 10],
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
}
