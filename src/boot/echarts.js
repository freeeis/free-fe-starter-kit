import { boot } from 'quasar/wrappers';
import echarts from 'echarts';

export default boot(({ app }) => {
  app.config.globalProperties.$echarts = echarts;
})
