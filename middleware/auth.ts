import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  /***
   * @todo Redirect the user to login page if token is not present in store.
   * @todo Redirect the user to main page if token is present in store
   * @hints check what propeties context has
   */
  // hh
  let y = context.store.getters.token;
  let x = context.route.fullPath;
  console.log("hola")
  console.log(y)
  console.log(x)
  console.log("hola2")

  if (y === null && x === '/') 
  {
    context.redirect('login/');
  }
  else if (y != null && x != '/')
  {
    context.redirect('/');
  }

})
