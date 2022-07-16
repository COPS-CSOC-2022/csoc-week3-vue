import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  /***
   * @todo Redirect the user to login page if token is not present in store.
   * @todo Redirect the user to main page if token is present in store
   * @hints check what propeties context has
   */

  const location = context.route.fullPath
  const token = context.store.getters.token
  if (token === null && location !== '/login') {
    context.redirect('/login')
  } else if (token !== null && location !== '/') {
    context.redirect('/')
  }
})
