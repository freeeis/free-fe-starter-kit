import { defineBoot } from '#q-app/wrappers'
import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineBoot(({app}) => {
  app.use(VueDOMPurifyHTML);
});
