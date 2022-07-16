<template>
  <main class="max-w-lg mx-auto items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 class="mb-8 text-3xl text-center">Login</h1>
      <label for="inputUsername">
        <input
          id="inputUsername"
          
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="inputUsername"
          placeholder="Username"
          v-model="username"
        />
      </label>

      <label for="password">
        <input
          id="inputPassword"
          
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="inputPassword"
          placeholder="Password"
          v-model="password"
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
import { reactive, useContext } from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  

  setup() {
    const { $toast } = useContext()
    const { redirect, $axios, store } = useContext()
    
    

    const validateField = () => {
      if (
        this.username.trim() === '' ||
        this.password.trim() === ''
      ) {
        $toast.error('Please fill all the fields correctly.')
        return false
      }
      return true
    }
    function login() {
      //$toast.info('Complete Me!')
      /***
       * @todo Complete this function.
       * @todo 1. Write code for form validation.
       * @todo 2. Fetch the auth token from backend and login the user.
       * @todo 3. Commit token to Vuex Store
       * @hints checkout register/index.vue
       */
      console.log(this.username, this.password)
      //validation
      if(this.username.trim() == '' || this.password.trim()==''){
        $toast.error('Fields are empty!')
        return
      }

      const data = {
        username: this.username,
        password: this.password,
      }

      $axios
        .$post('auth/login/', data)
        .then(({ token }) => {
          store.commit('setToken', token)
          console.log(store.getters)
          $toast.success('successfully logged in!')
          redirect('/')
        })
        .catch(() => {
          $toast.error(
            'Invalid Credentials'
          )
        })      
    }
    return {
        login,
    }
  },
  data(){
    return {
      username: '',
      password: ''

    }
  },
  middleware: 'auth'
})
</script>
