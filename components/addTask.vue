<template>
  <aside class="mx-auto flex justify-between mt-24 px-4">
    <label for="add task" class="flex-1">
      <input
        v-model.trim="newTask"
        type="text"
        name="add task"
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
        placeholder="Enter Task"
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
        addBorder
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
  // emits: ['newTask'],
  data() {
    return { newTask: '' }
  },

  methods: {
    addTask() {
      /**
       * @todo Complete this function.
       * @todo 1. Send the request to add the task to the backend server.
       * @todo 2. Add the task in the dom.
       * @hint use emit to make a event that parent can observe
       */

      if (this.newTask === '') {
        this.$toast.error('Please fill the Add task Field....')
        return
      }

      const data = {
        title: this.newTask,
      }
      const headerForApiRequets = {
        headers: { Authorization: 'Token ' + this.$store.getters.token },
      }
      this.$toast.info('Please wait...')

      this.$axios
        .$post('todo/create/', data, headerForApiRequets)
        .then(() => {
          this.$toast.success('Task added successfully...')
          this.newTask = ''
          this.$emit('newTask')
          // this.$router.go()
        })
        .catch(() => {
          this.$toast.error('Task not Added Succesfully')
        })
    },
  },
})
</script>

<style scoped>
.addBorder {
  border-color: #7bf1a8;
}
</style>
