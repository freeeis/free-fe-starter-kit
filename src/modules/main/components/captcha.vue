<template>
  <svg
    class="captcha cursor-pointer"
    @click="refresh"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0,0,${width * viewBoxRatio},${height * viewBoxRatio}`"
  >
    <path
      v-for="(cap, idx) in captchaPathes || []"
      :key="idx"
      :d="cap"
      :stroke="stroke"
      :fill="fill"
    />
  </svg>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CaptchaComponent',
  props: {
    height: { type: [String, Number], default: 40 },
    width: { type: [String, Number], default: 100 },
    fill: { type: String, default: 'none' },
    stroke: { type: String, default: '#555' },
    viewBoxRatio: { type: Number, default: 1.5 },
  },
  data() {
    return {
      captchaPathes: [],
      captchaId: '',
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.postRequest('/captcha').then((d) => {
        if (d && d.msg === 'OK') {
          this.captchaPathes = (d.data && d.data.captcha) || [];
          const cid = (d.data && d.data.id) || '';

          if (cid) {
            this.captchaId = cid;

            this.$emit('change', this.captchaId);
          }
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.captcha {
  border: 1px solid rgba(191,191,191,1);
  height: 40px;
  border-radius: 4px;
}
</style>
