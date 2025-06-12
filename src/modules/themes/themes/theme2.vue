<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'EISThemeDefault2',
  setup() {
    import('../styles/theme2.scss');
    const $q = useQuasar();
    $q.dark.set(false);
  },
});
</script>
