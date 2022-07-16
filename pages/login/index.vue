<template>
  <main class="max-w-lg mx-auto items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 class="mb-8 text-3xl text-center">Login</h1>
      <label for="inputUsername">
        <input
          id="inputUsername"
          v-model="username"
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="inputUsername"
          placeholder="Username"
        />
      </label>

      <label for="password">
        <input
          id="inputPassword"
          v-model="password"
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
import { useContext, reactive } from '@nuxtjs/composition-api'
import { defineComponent, toRefs } from '@vue/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { redirect, $toast, $axios, store } = useContext()

    const state = reactive({
      username: '',
      password: ''
    })

    const validateField = () => {
      if (
        state.username === '' ||
        state.password === ''
      ) {
        if (state.username === '' ){
          $toast.error('Empty username is not valid.')
        }
        else if (state.password === '' ){
          $toast.error('Empty passwords is not valid.')
        }
        return false
      }
      return true
    }

    function login() {

      if (!validateField()) return

      const data = {
        username: state.username,
        password: state.password
      }

      $toast.info('Please wait...')

      $axios
        .$post('auth/login/', data)
        .then(({ token }) => {
          store.commit('setToken', token)
          redirect('/')
          $toast.success("Logged in successfully")
        })
        .catch(() => {
          $toast.error('Please enter correct login credentials.')
        })
    }

    return {
      ...toRefs(state),
      login,
    }
  },
})
</script>
