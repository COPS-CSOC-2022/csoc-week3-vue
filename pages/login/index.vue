<template>
  <main class="max-w-lg mx-auto items-center justify-center px-2">
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
import { useContext } from '@nuxtjs/composition-api'
import { defineComponent,reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  middleware:'auth',
  setup() {
    const { $toast, $axios, store, redirect, route } = useContext()
    const state = reactive({
      username: '',
      password: '',
    })
    function login() {
      /***
       * @todo Complete this function.
       * @todo 1. Write code for form validation.
       * @todo 2. Fetch the auth token from backend and login the user.
       * @todo 3. Commit token to Vuex Store
       * @hints checkout register/index.vue
       */
       const data = {
        username: state.username,
        password: state.password,
      }
      $axios
        .$post('auth/login/', data)
        .then(({ token }) => {
          store.commit('setToken', token)
          // console.log(token)
          if (route.path !== '/') redirect('/')
          $toast.success('Logged In successfully')
        })
        .catch(() => {
          $toast.error('Invalid Credentials')
        })
    }

    return {
      ...toRefs(state),
      login,
    }
  },
})
</script>
