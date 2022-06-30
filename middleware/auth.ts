import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  /***
   * @todo Redirect the user to login page if token is not present in store.
   * @todo Redirect the user to main page if token is present in store
   * @hints check what propeties context has ssd
   */

  const path = context.route.fullPath
  const token = context.store.getters.token

  const newLocal = token != null && path !== '/'
  if (token === null && path === '/') {
    context.redirect('login/')
  } else if (newLocal) {
    context.redirect('/')
  }
})
