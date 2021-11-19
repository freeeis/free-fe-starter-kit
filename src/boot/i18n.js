import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';
import store from '../store';

const DEFAULT_LANGUAGE = store().getters['app/getLocale'] || Quasar.lang.getLocale().toLowerCase() || 'zh-cn';

const i18n = createI18n({
  // legacy: false,
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.config.globalProperties.i18n = i18n;
  app.use(i18n);
})

export { i18n }
