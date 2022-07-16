<template>
  <main class="max-w-lg mx-auto px-6">
    <add-task @newTask="getTasks" />
    <transition>
      <span v-if="loading"></span>
      <ul v-else class="flex-col mt-9 mx-auto">
        <li
          v-for="(todo, index) in todos"
          :key="todo.id"
          class="
            border
            flex
            border-gray-500
            rounded
            px-2
            py-2
            justify-between
            items-center
            mb-2
          "
        >
          <label :for="todo.id">
            <input
              :id="todo.id"
              v-show="todo.editing"
              v-model="todo.title"
              type="text"
              :class="[
                'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input',
              ]"
              :name="todo.title"
              placeholder="Edit The Task"
            />
          </label>
          <div class="">
            <button
              v-show="todo.editing"
              class="

                bg-transparent
                hover:bg-gray-500
                text-gray-700 text-sm
                hover:text-white
                py-2
                px-3
                border border-gray-500
                hover:border-transparent
                rounded
                todo-update-task
              "
              type="button"
              @click="updateTask(index, todo.id)"
            >
              Done
            </button>
          </div>
          <div v-show="!todo.editing" :class="['todo-task text-gray-600']">
            {{ todo.title }}
          </div>
          <span class="">
            <button
              v-show="!todo.editing"
              style="margin-right: 5px"
              type="button"
              class="
                bg-transparent
                hover:bg-yellow-500 hover:text-white
                border border-yellow-500
                hover:border-transparent
                rounded
                px-2
                py-2
              "
              @click="editTask(index)"
            >
              <img
                src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                width="18px"
                height="20px"
                alt="Edit"
              />
            </button>
            <button
              v-show="!todo.editing"
              type="button"
              class="
                bg-green
                hover:bg-red-500 hover:text-white
                border border-red-500
                hover:border-transparent
                rounded
                px-2
                py-2
              "
              @click="deleteTask(index, todo.id)"
            >
              <img
                src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                width="18px"
                height="22px"
                alt="Delete"
              />
            </button>
          </span>
        </li>
      </ul>
    </transition>
  </main>
</template>

<script lang>
import { defineComponent } from '@nuxtjs/composition-api'
import addTask from '~/components/addTask.vue'

export default defineComponent({
  components: { addTask },
  middleware: 'auth',
  data() {
    return {
      hello: 'hello world!',
      todos: [],

      loading: false,
    }
  },
  mounted() {
    this.loading= true
    this.getTasks()
    this.$toast.info('Fetching your Tasks...')
  },
  methods: {
    async getTasks() {
    this.$axios({
      headers: {
        Authorization: 'Token ' + this.$store.getters.token,
      },
      url: 'todo/',
      method: 'get',
    })
      .then(({ data }) => {
        this.loading = false
        this.todos = data.map((todo) => {
          return {
            ...todo,
            editing: false,
          }
        })
      })
      .catch(() => {
        this.$toast.error('Error in fetching the tasks')
      })
    },

    updateTask(_index, _id) {
    if (this.todos[_index].title === '') {
       this.$toast.error('Task cannot be empty!!')
     } else {
       this.$axios({
         headers: {
           Authorization: 'Token ' + this.$store.getters.token,
         },
         url: 'todo/' + _id + '/',
         method: 'patch',
         data: {
           title: this.todos[_index].title,
         },
       })
         .then(() => {
           this.todos[_index].editing = false
           this.$toast.success('Task updated successfully')
         })
         .catch(() => {
           this.$toast.error('Error in updating the tasks')
         })
     }
    },

    editTask(index) {
      this.todos[index].editing = !this.todos[index].editing
    },

    deleteTask(_index, _id) {
    this.$axios({
        headers: {
          Authorization: 'Token ' + this.$store.getters.token,
        },
        url: 'todo/' + _id + '/',
        method: 'delete',
      })
        .then(() => {
          this.$toast.success('Task deleted successfully')
          this.todos.splice(_index, 1)
        })
        .catch(() => {
          this.$toast.error('Error Occured.Please try again later')
        })
    },
  },
})
</script>
