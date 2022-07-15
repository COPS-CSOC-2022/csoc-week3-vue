import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  const path = context.route.fullPath
  const token = context.store.getters.token
  if (token === null && path !== '/login') {
    context.redirect('/login')
  } else if (token !== null && path !== '/') {
    context.redirect('/')
  }
})
