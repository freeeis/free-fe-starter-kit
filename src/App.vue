<template>
  <router-view id="free-app" :class="`free-app theme-${store.theme || 'default'}`"/>
</template>
<script>
import { defineComponent } from 'vue';
import useAppStore from '@/stores/app';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useAppStore();

    return {
      store,
    }
  },
})
</script>
