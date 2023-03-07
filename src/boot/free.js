/*
 * @Description: FreeEIS框架入口。
 * 这里将调用frree-fe-core核心模块中的初始化方法，此方法将会加载需要的模块。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-22 10:36:53
 * @LastEditTime: 2023-03-07 09:11:29
 * @LastEditors: zhiquan
 */

import { boot } from 'quasar/wrappers'
import core from 'free-fe-core';
import config from '../config';

export default boot((ctx) => {
  const { routes } = core.init({ ...ctx, config });

  // 在所有路由的最后，添加404页面，防止无法找到所请求页面
  routes.push({
    path: '/:catchAll(.*)*',
    name: 'page404',
    component: () => import('../modules/Error404.vue') || import('../Error404.vue'),
  });

  routes.forEach((route) => {
    if(route && route.path && !route.path.startsWith('/')) {
      route.path = `/${route.path}`
    }

    ctx.router.addRoute(route)
  })
})
