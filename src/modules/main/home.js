import { defineComponent, h, ref } from "vue";

export default defineComponent({
  name: "HomePage",
  setup() {
    const greeting = ref("欢迎来到FreeEIS");

    return () =>
      h(
        "div",
        {
          class: "fit",
        },
        [
          h(
            "div",
            {
              class:
                "absolute-center text-h4 text-bold text-grey-6 cursor-pointer text-center",
            },
            greeting.value
          ),
        ]
      );
  },
});
