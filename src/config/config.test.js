/*
 * @Description: 测试环境的全局配置，这里的配置可覆盖config.default.js中的配置。
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-21 15:22:03
 * @LastEditTime: 2023-03-07 09:18:56
 * @LastEditors: zhiquan
 */

export default {
  modules: [
    'main',
  ],

  countIcon: `img:${import.meta.env.BASE_URL}images/count.svg`,
  failIcon: `img:${import.meta.env.BASE_URL}images/fail.svg`,
  successIcon: `img:${import.meta.env.BASE_URL}images/success.svg`,
  ongoingIcon: `img:${import.meta.env.BASE_URL}images/ongoing.svg`,
};
