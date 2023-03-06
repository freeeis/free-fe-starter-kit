<template>
  <router-view :class="`free-app free-theme-${store.theme || 'default'}`"/>
</template>
<script>
import { defineComponent } from 'vue';
import useAppStore from './stores/app'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useAppStore();

    return {
      store,
    }
  }
})
</script>
