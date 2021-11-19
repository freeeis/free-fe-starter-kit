import { boot } from 'quasar/wrappers'
import core from 'free-fe-core';
import config from '../config';
import { i18n } from './i18n';

import builder from '../free/builder';

const messages = {
  'en-us': {
    error404: 'Sorry, nothing here...',
    goback: 'Go Back',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    REGISTER: 'Register',
    SETTINGS: 'Settings',
  },
  'zh-cn': {
    error404: '抱歉，此页面不存在...',
    goback: '返回',
    LOGIN: '登录',
    LOGOUT: '退出登录',
    REGISTER: '注册',
    SETTINGS: '设置',
  },
};

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

  // const i18n = ctx.app.config.globalProperties.i18n;
  if (ctx.store && ctx.store.i18nMessages) {
    Object.keys(ctx.store.i18nMessages).forEach((ik) => {
      i18n.global.setLocaleMessage(ik, { ...ctx.store.i18nMessages[ik], ...(messages[ik] || {}) });
    });
  }
})
