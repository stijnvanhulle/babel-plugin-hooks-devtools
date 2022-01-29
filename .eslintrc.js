module.exports = {
  root: true,
  extends: [
    '@webpack-contrib/eslint-config-webpack',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'babel', 'prettier', 'unused-imports'],
  rules: {
    'import/extensions': 'warn',
    'import/no-unresolved': 'warn',
    'array-callback-return': 'warn',
    'consistent-return': 'warn',
  },
};
