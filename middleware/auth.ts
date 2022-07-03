import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({store, route, redirect}) => {
  if (store.getters.auth && (route.path === '/login' || route.path === '/register')) return redirect('/')
  else if (!store.getters.auth && (route.path === '/')) return redirect('/login')
})
