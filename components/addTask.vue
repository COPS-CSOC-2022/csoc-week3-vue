<template>
  <aside class="mx-auto flex justify-between mt-24 px-4">
    <label for="add task" class="flex-1">
      <input
        type="text"
        name="add task"
        v-model.trim="newTodo"
        class="
          todo-add-task-input
          px-4
          py-2
          placeholder-blueGray-300
          text-blueGray-600
          bg-white
          rounded
          text-sm
          border border-blueGray-300
          outline-none
          focus:outline-none focus:ring
          w-full
        "
        placeholder="Enter your task here"
      />
    </label>
    <button
      type="button"
      class="
        todo-add-task
        bg-transparent
        hover:bg-green-500
        text-green-700 text-sm
        hover:text-white
        px-3
        py-2
        border border-green-500
        hover:border-transparent
        rounded
      "
      @click="addTask"
    >
      Add Task
    </button>
  </aside>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      newTodo: '',
    }
  },
  methods: {
    async addTask() {
      let newTodo = this.newTodo
      if (newTodo == '') {
        this.$toast.error('New Todo cannot be empty.')
        return
      }

      this.$toast.info('Adding Todo...')
      this.newTodo = ''

      const headerForAuthorization = {
        Authorization: 'Token ' + this.$store.getters.token,
      }
      const dataForAPIRequest = {
        title: newTodo,
      }

      this.$axios({
        headers: headerForAuthorization,
        url: 'todo/create/',
        method: 'post',
        data: dataForAPIRequest,
      })
        .then(() => {
          this.$toast.success('Todo added successfully!')
          this.$emit('newTask')
        })
        .catch(() =>
          this.$toast.error('Addition failed. Please try again later.')
        )
    },
  },
})
</script>
