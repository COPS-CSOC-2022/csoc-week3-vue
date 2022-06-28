<template>
  <nav class="bg-yellow-600">
    <ul class="flex p-5 items-center justify-between">
      <transition>
        <ul v-if="auth" class="flex space-x-4 items-center justify-between">
          <li>
            <h1 class="font-bold text-white text-xl">Todo</h1>
          </li>
          <li class=" text-black">
            <nuxt-link to="/"><h1 class="rounded-b
            bg-white
            py-2
            px-4
            block
            whitespace-no-wrap
            hover:bg-gray-400">Tasks</h1></nuxt-link>
          </li>
        </ul>
        <ul v-else class="flex">
          <li class="text-black mr-10">
            <nuxt-link to="/login"><h1 class="rounded-b
            bg-white
            py-2
            px-4
            block
            whitespace-no-wrap
            hover:bg-gray-400">Login</h1></nuxt-link>
          </li>
          <li class="text-black">
            <nuxt-link to="/register"><h1 class="rounded-b
            bg-white
            py-2
            px-4
            block
            whitespace-no-wrap
            hover:bg-gray-400">Register</h1></nuxt-link>
          </li>
        </ul>
      </transition>
      <div v-if="auth" class="w-28 inline-block relative">
        <div class="group inline-block relative">
          <a
            class="
              rounded-b
              bg-white
              py-2
              px-4
              block
              whitespace-no-wrap
              hover:bg-gray-400
            "
            href="#"
            @click="logout"
          >
            Logout
          </a>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  computed: {
    auth() {
      return this.$store.getters.auth
    },
  },
  methods: {
    logout() {
      this.$store.commit('setToken', null)
      this.$router.replace('/login')
      this.$toast.info('Logged out successfully!')
    },
  },
})
</script>
