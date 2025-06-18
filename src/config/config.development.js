/*
 * @Description: 开发环境的全局配置，这里的配置可覆盖config.default.js中的配置。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-21 15:22:03
 * @LastEditTime: 2025-06-11 16:39:25
 * @LastEditors: zhiquan
 */

export default {
  modules: [
    'main',
  ],

  countIcon: 'img:/images/count.svg',
  failIcon: 'img:/images/fail.svg',
  successIcon: 'img:/images/success.svg',
  ongoingIcon: 'img:/images/ongoing.svg',

  'core-modules': {
    defaultInputFieldPlaceholder: '请输入',

    inputControlSettings: {
      filled: true,
      outlined: false,
      borderless: false,
      standout: false,
      rounded: false,
      square: false,
      dense: false,
    },
  },
};
