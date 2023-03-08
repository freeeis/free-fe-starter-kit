<template>
  <div v-if="false"></div>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';
import { Dark } from 'quasar';

export default defineComponent({
  name: 'themeDefault',
  setup() {
    onBeforeMount(() => {
      Dark.set(true);
    })
  },
});
</script>

<style lang="scss">
@import '../styles/dark.scss';
</style>
