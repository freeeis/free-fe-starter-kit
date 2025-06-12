import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import config from '../config/index.js'
import { requests } from '../boot/axios.js'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(async function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    // scrollBehavior: () => ({ left: 0, top: 0 }),
    scrollBehavior: async (to, from, savedPosition) =>
      new Promise((resolve) => {
        if (savedPosition) {
          return setTimeout(() => resolve(savedPosition), 500)
        }
        return { x: 0, y: 0 }
      }),
    routes: [],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  })

  Router.afterEach(() => {
    if (config.toTopEveryPage) {
      window.scrollTo(0, 0)
    }

    // check version and refresh
    requests.checkVersion()
  })

  return Router
})
