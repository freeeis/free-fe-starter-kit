import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import useAppStore from '../stores/app';
import config from '../config';

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
  ctx.app.use(createPinia())
  const store = useAppStore();

  const defaultLocale = store.locale || DEFAULT_LANGUAGE || Quasar.lang.getLocale().toLowerCase() || 'zh-cn';
  i18n.locale = defaultLocale;
  i18n.fallbackLocale = defaultLocale;
  DEFAULT_LANGUAGE = defaultLocale;

  // Set i18n instance on app
  ctx.app.config.globalProperties.i18n = i18n;
  ctx.app.use(i18n);

  if (ctx.app.i18nMessages) {
    Object.keys(ctx.app.i18nMessages).forEach((ik) => {
      i18n.global.setLocaleMessage(ik, { ...ctx.app.i18nMessages[ik], ...(messages[ik] || {}) });
    });
  }
})

export { i18n }
