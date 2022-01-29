const MIN_BABEL_VERSION = 7;

const { NODE_ENV, BABEL_ENV, BABEL_LOOSE } = process.env;
const cjs =
  NODE_ENV === 'test' || BABEL_ENV === 'commonjs' || BABEL_ENV === 'cjs';
const es = BABEL_ENV === 'es';

let modules = 'auto';

if (cjs) {
  modules = 'commonjs';
} else if (es) {
  modules = false;
}

module.exports = (api) => {
  api.assertVersion(MIN_BABEL_VERSION);
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: BABEL_LOOSE,
          modules,
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
