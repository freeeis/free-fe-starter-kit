<template>
  <div
    class="layout-wrapper absolute-full"
    :style="{
      'background-image': `url(${bg})`,
      'background-size': 'cover',
    }">
    <router-view class="" style=""/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutWrapper',
  props: {
    bg: { type: String, default: '' },
  },
  setup() {
    return {};
  },
});
</script>
