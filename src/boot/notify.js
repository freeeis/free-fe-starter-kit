import { defineBoot } from '#q-app/wrappers'
import { Notify } from 'quasar'

export default defineBoot(() => {
  Notify.setDefaults({
    position: 'top',
    timeout: 1500,
    actions: [{ icon: 'close', color: 'white' }],
  })
})
