module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true, // browser 全局变量
    node: true, //  Node.js 全局变量和 Node.js 作用域
    es6: true // 支持除模块外所有 ECMAScript 6 特性
  },
  extends: 'airbnb-base',
  'rules': {
    // 开发环境下允许调试语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}