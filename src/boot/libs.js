/*
 * @Description: 定义框架所支持的前端组件库，以在更高级的场景中自由使用。
 * 如果项目中不使这些组件库，可以删除本boot文件，并从quasar.conf.js中删除引用。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-09-23 12:25:09
 * @LastEditTime: 2023-03-07 09:15:55
 * @LastEditors: zhiquan
 */

import { defineBoot } from '#q-app/wrappers'

import * as Quasar from 'quasar'
// import * as Ant from 'ant-design-vue';
// import * as Vant from 'vant';

const libs = [
  {
    start: 'Q',
    pick: (n) => {
      const comp = Quasar[n]
      if (comp) {
        return comp
      }
    },
  },
  // {
  //   start: 'A',
  //   pick: (n) => {
  //     const nn = n.substr(1);
  //     const comp = Ant[nn];
  //     if(comp) {
  //       import(`ant-design-vue/lib/${nn.toLowerCase()}/style/css`);
  //       return comp;
  //     }
  //   }
  // },
  // {
  //   start: 'V',
  //   pick: (n) => {
  //     const nn = n.substr(1);
  //     const comp = Vant[nn];
  //     if(comp) {
  //       import(`vant/es/${nn.toLowerCase()}/style`);
  //       return comp;
  //     }
  //   }
  // }
]

export default defineBoot(({ app }) => {
  // 将支持的组件库绑定到全局可见
  app.config.globalProperties._free_supported_component_libs = libs
})

export { libs }
