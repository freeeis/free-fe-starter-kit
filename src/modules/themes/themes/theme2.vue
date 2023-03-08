<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';
import { Dark, setCssVar } from 'quasar';

export default defineComponent({
  name: 'themeDefault2',
  setup() {
    onBeforeMount(() => {
      // setCssVar('primary', 'green');
      Dark.set(false);
    })
  },
});
</script>

<style lang="scss">
@import '../styles/theme2.scss';
</style>
