<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'EISThemeDark',
  setup() {
    import('../styles/dark.scss');
    const $q = useQuasar();
    $q.dark.set(true);
  },
});
</script>
