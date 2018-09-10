
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    window: true,
    __static: true,

    AppError: true,
    $lib: true,
  },
  plugins: [
    'html'
  ],
  rules: {
    // 单行文本长度
    'max-len': ['error', { code: 400 }],
    //
    'function-paren-newline': [2, 'multiline'],
    // 允许在代码块内使用"require"
    'global-require': 0,
    // 兼容 webpack resolve: app 命名空间
    'import/no-unresolved': 0,
    // 允许引用修改参数子属性
    'no-param-reassign': 0,
    //
    'no-continue': 0,
    // 允许倒入模块时不写扩展名
    'import/extensions': 0,
    // impont/require 后可以不留空行
    'import/newline-after-import': 0,
    // 允许连续赋值
    'no-multi-assign': 0,
    // 允许使用 ++ --
    'no-plusplus': 0,
    //
    'no-unused-expressions': 0,
    // 允许在代码块 首位留空行
    'padded-blocks': 0,
    // 允许不使用解构赋值
    'prefer-destructuring': 0,
    // for in 循环可以不进行属性检测
    'guard-for-in': 0,
    // airbnb 允许 for in 语法
    'no-restricted-syntax': 0,
    // 按需添加箭头函数参数的括号
    'arrow-parens': ['error', 'as-needed'],
    //
    'no-trailing-spaces': 0,
    // 按照环境允许 debugger 关键字
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
}
