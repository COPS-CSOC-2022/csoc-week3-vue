import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  let path = context.route.fullPath;
  let token = context.store.getters.token;

  if (token === null && path === '/') context.redirect('login/');
  else if (token != null && path != '/') context.redirect('/'); 
})
