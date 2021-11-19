<template>
  <router-view :class="`free-app free-theme-${$store.state.app.theme || 'default'}`"/>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
})
</script>
