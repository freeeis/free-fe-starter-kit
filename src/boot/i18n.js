/*
 * @Description: i18n的封装。包括加载各模块中定义的字典数据。
 * 这里要注意，此boot文件的加载应该在free boot文件之后。设置在quasar.conf.js中。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-21 15:14:42
 * @LastEditTime: 2023-03-28 17:41:04
 * @LastEditors: zhiquan
 */


import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';
import useAppStore from '../stores/app';
import config from '../config';

// 默认的一些字典数据
const messages = {
  'en-us': {
    error404: 'Sorry, nothing here...',
    goback: 'Go Back',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    REGISTER: 'Register',
    SETTINGS: 'Settings',
    首页: 'Home',
  },
  'zh-cn': {
    error404: '抱歉，此页面不存在...',
    goback: '返回',
    LOGIN: '登录',
    LOGOUT: '退出登录',
    REGISTER: '注册',
    SETTINGS: '设置',
    首页: '首页',
  },
};

let DEFAULT_LANGUAGE = '';

const getLocale = () => {
  let locale = DEFAULT_LANGUAGE || config.defaultLocale || 'zh-cn';

  if (!locale) {
    const sysLocale = Quasar.lang.getLocale().toLowerCase();
    if (config.locales[sysLocale]) {
      locale = sysLocale;
    }
  }

  return locale || 'zh-cn';
};

DEFAULT_LANGUAGE = getLocale();

export { DEFAULT_LANGUAGE, getLocale };

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
})

export default boot((ctx) => {
  const store = useAppStore();

  const defaultLocale =
    store.locale ||
    DEFAULT_LANGUAGE ||
    Quasar.lang.getLocale().toLowerCase() ||
    "zh-cn";
  i18n.locale = defaultLocale;
  i18n.fallbackLocale = defaultLocale;
  DEFAULT_LANGUAGE = defaultLocale;

  // Set i18n instance on app
  ctx.app.config.globalProperties.i18n = i18n;
  ctx.app.use(i18n);

  // 加载各模块中的字典数据。
  if (ctx.app.i18nMessages) {
    Object.keys(ctx.app.i18nMessages).forEach((ik) => {
      i18n.global.setLocaleMessage(ik, {
        ...ctx.app.i18nMessages[ik],
        ...(messages[ik] || {}),
      });

      // if not exists in config, add to the list
      if (config.locales.findIndex((l) => l.locale === ik) < 0) {
        config.locales.push({
          name: ik,
          locale: ik,
        });
      }
    });
  }
})

export { i18n }
