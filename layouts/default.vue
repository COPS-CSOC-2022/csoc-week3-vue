<template>
  <main class="bg-grey-lighter">
    <header>
      <navbar />
    </header>
    <Nuxt />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Navbar from '@/components/navbar.vue'

export default defineComponent({
  components: {
    Navbar,
  },
})
</script>

<style>
.hideme {
  display: none !important;
}

.todo-edit-task-input,
.todo-add-task-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  max-width: 300px;
}

.todo-update-task,
.todo-add-task {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.todo-task {
  max-width: 260px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter-from, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


</style>
