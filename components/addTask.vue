<template>
  <aside class="mx-auto flex justify-between mt-24 px-4">
    <label for="add task" class="flex-1">
      <input
        type="text"
        v-model="taskAdded"
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
    return{
      taskAdded: ""
    }
  },
  emits: ['newTask'],
  methods: {
    addTask() {
      if (this.taskAdded == "" ){
        this.$toast.error("Empty tasks can't be added")
      }
      else if (this.taskAdded.length > 255 ){
        this.$toast.error("Maximum length of task should be 255")
      }
      else{
        const task = {
          title: this.taskAdded
        }
        this.$axios.post('todo/create/', task , {headers: { Authorization: 'Token ' + this.$store.getters.token}})
        this.$toast.success("Task added successfully.")
        this.$emit('newTask')
      }
      this.taskAdded = ""
    },
  },
})
</script>
