<template>
  <main class="max-w-lg mx-auto items-center justify-center px-2 login">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 class="mb-8 text-3xl text-center">Login</h1>
      <label for="inputUsername">
        <input
          id="inputUsername"
          v-model.trim="username"
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="inputUsername"
          placeholder="Username"
        />
      </label>

      <label for="password">
        <input
          id="inputPassword"
          v-model.trim="password"
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="inputPassword"
          placeholder="Password"
        />
      </label>

      <button
        type="submit"
        class="
          w-full
          text-center
          py-3
          rounded
          bg-transparent
          text-green-500
          hover:text-white hover:bg-green-500
          border border-green-500
          hover:border-transparent
          focus:outline-none
          loginButton
          my-1
        "
        @click="login"
      >
        Login
      </button>
    </div>
  </main>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const state = reactive({
      username: '',
      password: '',
    })
    const { redirect, $axios, store, $toast } = useContext()
    function login() {
      // $toast.info('Complete Me!')
      /***
       * @todo Complete this function.
       * @todo 1. Write code for form validation.
       * @todo 2. Fetch the auth token from backend and login the user.
       * @todo 3. Commit token to Vuex Store
       * @hints checkout register/index.vue
       */
      if (state.username === '' || state.password === '') {
        $toast.error("Please don't leave Username or Password field empty ....")
        return
      }
      const data = {
        username: state.username,
        password: state.password,
      }

      $toast.info('Please wait...')

      $axios
        .$post('auth/login/', data)
        .then(({ token }) => {
          store.commit('setToken', token)
          $toast.success('Successfully Logged in...')
          redirect('/')
        })
        .catch(() => {
          $toast.error('Not able to Log in try again')
        })
    }

    return {
      ...toRefs(state),
      login,
    }
  },
})
</script>
<style scoped>
.login {
  padding-top: 250px;
  /* margin: auto; */
}
.loginButton {
  height: 45px;
}
</style>
