import { boot } from 'quasar/wrappers'
import core from 'free-fe-core';
import config from '../config';

import builder from '../free/builder';

export default boot((ctx) => {
  config.builder = builder;
  const { routes } = core.init({ ...ctx, config });

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
