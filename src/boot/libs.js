import { boot } from 'quasar/wrappers';
import * as Quasar from 'quasar';
import * as Ant from 'ant-design-vue';
import * as Vant from 'vant';

const libs = [
  {
    start: 'Q',
    pick: (n) => {
      const comp = Quasar[n];
      if(comp) {
        return comp;
      }
    }
  },
  {
    start: 'A',
    pick: (n) => {
      const nn = n.substr(1);
      const comp = Ant[nn];
      if(comp) {
        import(`ant-design-vue/lib/${nn.toLowerCase()}/style/css`);
        return comp;
      }
    }
  },
  {
    start: 'V',
    pick: (n) => {
      const nn = n.substr(1);
      const comp = Vant[nn];
      if(comp) {
        import(`vant/es/${nn.toLowerCase()}/style`);
        return comp;
      }
    }
  }
];

export default boot(({ app }) => {
  app.config.globalProperties._free_supported_component_libs = libs;
})

export { libs };
