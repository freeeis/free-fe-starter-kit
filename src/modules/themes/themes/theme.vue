<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'EISThemeDefault',
  setup() {
    const $q =  useQuasar();
    import('../styles/theme.scss');
    $q.dark.set(false);
  },
});
</script>
