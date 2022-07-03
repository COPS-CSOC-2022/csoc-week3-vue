<template>
  <aside class="mx-auto flex justify-between mt-24 px-4">
    <label for="add task" class="flex-1">
      <input
        type="text"
        name="add task"
        v-model="task"
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
        hover:bg-green-500
        text-green-700 text-sm
        hover:text-white
        px-3
        py-2
        border border-green-500
        hover:border-transparent
        rounded
      "
      :class="isAddingTask ? 'bg-green-500' :'bg-transparent'"
      @click="addTask"
    >
      <span v-show="!isAddingTask">Add Task</span>
      <img
        src="https://cdn-icons.flaticon.com/png/512/1357/premium/1357612.png?token=exp=1656848148~hmac=9ef72006d0c0302b371e5e78aed23551"
        width="18px"
        height="20px"
        alt="Adding..."
        v-show="isAddingTask"
      />
    </button>
  </aside>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import axios from 'axios'
const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

export default defineComponent({
  emits: ['newTask'],
  data() {
    return {
      task: '',
      isAddingTask: false
    }
  },
  methods: {
    async addTask() {

      if (this.isAddingTask) return
      this.isAddingTask = true

      if (this.task.trim() === '') {
        this.$toast.error('Task name can not be empty')
        return
      }

      await axios({
        url: API_BASE_URL + 'todo/create/',
        method: 'POST',
        headers: {Authorization: `token ${this.$store.getters.token}`},
        data: {title: this.task.trim()}
      })

      const newTodo = await axios({
        url: API_BASE_URL + 'todo/',
        method: 'GET',
        headers: {Authorization: `token ${this.$store.getters.token}`},
      }).then(obj => obj.data.pop())
      newTodo.editing = false
      this.$emit('newTask', newTodo)
      this.task = ''
      this.$toast.success('Task created successfully')
      this.isAddingTask = false
    },
  },
})
</script>
