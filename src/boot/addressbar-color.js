import { defineBoot } from '#q-app/wrappers'
import { AddressbarColor } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ router}) => {
    const getColorByRoute = (route) => {
      if (route.path.startsWith('/login')) return '#FFFFFF'
      return '#069287'
    }

    router.afterEach((to) => {
      AddressbarColor.set(getColorByRoute(to))
    })
})
