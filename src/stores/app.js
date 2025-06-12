import { acceptHMRUpdate } from 'pinia'
import useAppStore from './module-app/index.js'

export default useAppStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
