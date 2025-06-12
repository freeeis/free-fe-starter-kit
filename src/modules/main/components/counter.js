import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CounterButton',
  props: {
    counts: { type: Number, default: 60 },
    interval: { type: Number, default: 1000 },
  },
  data() {
    return {
      timer: undefined,
      left: 0,
    };
  },
  render() {
    return undefined;
  },
  methods: {
    start() {
      this.left = this.counts;
      this.$emit('change', this.left);

      this.timer = setInterval(() => {
        if (this.left <= 1) {
          this.clear();
          this.$emit('clear');
          return;
        }

        this.left -= 1;
        this.$emit('change', this.left);
      }, this.interval);
    },
    clear() {
      clearInterval(this.timer);
      this.left = 0;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
});
