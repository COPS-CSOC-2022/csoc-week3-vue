<template>
  <main class="max-w-lg mx-auto items-center justify-center px-1" >
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
          class="block border border-grey-light w-full p-3 rounded mb-10"
          name="inputPassword"
          placeholder="Password"

        />
      </label>

      <button
        type="submit"
        class=
        "w-full
        text-center
        py-3
        rounded
        bg-transparent
        text-green-500
        hover:text-white hover:bg-green-500
        border border-green-500
        hover:border-transparent
        focus:outline-none
        my-1"

        @click="login"
      >
        Submit
      </button>
    </div>
  </main>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
  const state = reactive({
      username: '',
      password: '',
    })
    const { $toast,redirect, $axios, store } = useContext()
    const CheckFields = () => {
      if( state.username === '' || state.password === '' ){
        $toast.error("Username or password can't be blank.");
        return false;
      }
      return true;
    }

    function login() {
    if (!CheckFields()) return;
    const data = {
      username: state.username,
      password: state.password,
    }
    $axios
      .$post('auth/login/', data)
      .then(({ token }) => {
        store.commit('setToken', token)

        redirect('/')
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
