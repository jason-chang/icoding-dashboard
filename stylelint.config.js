
module.exports = {
  configBasedir: process.cwd(),
  ignoreFiles: [
    'node_modules/**',
    'src/assets/font',
  ],
  extends: 'stylelint-config-airbnb',
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-single-line-max-declarations': null,
    'declaration-colon-space-after': 'always',
    indentation: [
      2,
      {
        except: ['value'],
      },
    ],
    'max-empty-lines': 2,
    'max-nesting-depth': 99,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'unit-whitelist': ['px', '%', 'vw', 'vh', 's', 'em', 'deg'],
  },
};
