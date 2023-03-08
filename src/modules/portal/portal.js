import { defineComponent, getCurrentInstance, h } from "vue";
import { useRouter } from 'vue-router';
import { QBtn } from 'quasar';

export default defineComponent({
  name: "PortalPage",
  setup() {
    const router = useRouter();

    return () =>
      h(
        "div",
        {
          class: "fit",
        },
        [
          h('div', {
            class: 'row justify-end'
          }, [
            h(QBtn, {
              label: '去后台',
              class: 'text-primary',
              flat: true,
              onClick: () => {
                router.push('/admin')
              },
            }),
          ]),
          h(
            "div",
            {
              class:
                "absolute-center text-h4 text-bold text-center\
                q-pb-xl",
            },
            [
              h(
                "div",
                {
                },
                '这是一个门户页面'
              ),
            ]
          ),
        ]
      );
  },
});
