module.exports = {
  root: true,
  env: {
    node: true
  },
  // 插件
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码校验规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": "none",
        "requireLast": true
      }
    }]
  }
}
