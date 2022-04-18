import { boot } from 'quasar/wrappers';
import * as echarts from 'echarts';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$echarts = echarts;
})
