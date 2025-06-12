<template>
  <router-view id="free-app" class="free-app" />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  watch: {
    '$i18n.locale': {
      // set html attribute for lang
      handler(val) {
        document.documentElement.setAttribute('lang', val);
      },
    },
  },
})
</script>
