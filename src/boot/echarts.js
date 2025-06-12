/*
 * @Description: 对echarts的封装。
 * 如项目中不需要echarts，可删除本boot文件，并从quasar.conf.js中删除引用。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2022-04-18 19:29:18
 * @LastEditTime: 2023-03-07 09:16:10
 * @LastEditors: zhiquan
 */
import { defineBoot } from '#q-app/wrappers'

import * as echarts from 'echarts'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default defineBoot(async ({ app }) => {
  app.config.globalProperties.$echarts = echarts
})
