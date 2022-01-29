module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'babel', 'prettier', 'unused-imports'],
  rules: {
    'array-callback-return': 'warn',
    'consistent-return': 'warn',
    'no-empty-pattern': 'warn',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-undef': 'warn',
    'no-fallthrough': 'warn', // TODO move to error
    'no-continue': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off', // TODO move to error
    'class-methods-use-this': 'off',
    'default-param-last': 'off',
    'no-restricted-exports': 'off',
    'no-constructor-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
