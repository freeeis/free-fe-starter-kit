import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';
import store from '../store';

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

const getLocale = () => {
  let locale = store.getters['app/getLocale'] || config.defaultLocale;

  if (!locale) {
    const sysLocale = Quasar.lang.getLocale().toLowerCase();
    if (config.locales[sysLocale]) {
      locale = sysLocale;
    }
  }

  return locale || 'zh-cn';
};

const DEFAULT_LANGUAGE = getLocale();

export { DEFAULT_LANGUAGE, getLocale };

const i18n = createI18n({
  // legacy: false,
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.config.globalProperties.i18n = i18n;
  app.use(i18n);

  if (ctx.store && ctx.store.i18nMessages) {
    Object.keys(ctx.store.i18nMessages).forEach((ik) => {
      i18n.global.setLocaleMessage(ik, { ...ctx.store.i18nMessages[ik], ...(messages[ik] || {}) });
    });
  }
})

export { i18n }
