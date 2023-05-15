<template>
  <router-view id="free-app" class="free-app full-height"/>
</template>
<script>
import { defineComponent, watchEffect, getCurrentInstance } from 'vue';
import useAppStore from '@/stores/app';

export default defineComponent({
  name: 'App',
  setup() {
    const { proxy:vm } = getCurrentInstance();
    const store = useAppStore();

    watchEffect(() => {
      const theme = store.theme || vm.ctx.config.defaultTheme || 'default';
      if (!theme) return;

      if (!document.body.classList.contains(`theme-${theme}`)) {
        document.body.classList.add(`theme-${theme}`);
      }
    })

    return {
      store,
    }
  },
})
</script>
