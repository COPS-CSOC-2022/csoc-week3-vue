import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({store, route, redirect}) => {
  /***
   * @todo Redirect the user to login page if token is not present in store.
   * @todo Redirect the user to main page if token is present in store
   * @hints check what propeties context has
   */

  // authorized
  if (store.getters.token && (route.path === '/login' || route.path === '/register')) return redirect('/')
  else if (!store.getters.token && (route.path === '/')) return redirect('/login')
})
