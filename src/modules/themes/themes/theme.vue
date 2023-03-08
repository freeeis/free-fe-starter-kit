<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';
import { Dark } from 'quasar';

export default defineComponent({
  name: 'themeDefault1',
  setup() {
    onBeforeMount(() => {
      Dark.set(false);
    })
  },
});
</script>

<style lang="scss">
@import '../styles/theme.scss';
</style>
