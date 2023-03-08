export default {
  routers: [
    {
      path: '/',
      name: 'portal',
      components: {
        default: () => import('./portal.js')
      },
      props: {
        default: (route) => {
          return {
            id: route.query.id
          }
        }
      }
    }
  ],
}
