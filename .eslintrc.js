module.exports = {
  extends: 'airbnb',
  env: {
    browser: false,
    node: true,
  },
  rules: {
    'no-plusplus': 0, // 不允许一元运算符++和-- ==> https://eslint.org/docs/rules/no-plusplus
    'linebreak-style': ['error', 'unix'], // 换行风格 ==> http://eslint.cn/docs/rules/linebreak-style
    strict: ['off', 'global'], // 严格模式 ==> https://eslint.org/docs/rules/strict
    'jsx-a11y/no-static-element-interactions': 'off', // 无静态元素交互 ==> https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    'no-console': ['warn', { allow: ['info', 'error'] }], // 不允许使用console ==> https://eslint.org/docs/rules/no-console
    'no-lonely-if': 1,
    'no-restricted-properties': [
      'off',
      {
        Math: 'pow',
      },
    ], // 禁止某些对象属性 ==> https://eslint.org/docs/rules/no-restricted-properties
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // 限制可以包含JSX文件的扩展名 ==> https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'no-use-before-define': ['error', { variables: false }], // 不允许提前使用（未定义） ==> https://eslint.org/docs/rules/no-use-before-define
    'import/no-named-as-default': 'off', // 不命名为默认值 ==> https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    'import/no-named-as-default-member': 'off', // 不命名为默认成员 ==> https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
  },
};
