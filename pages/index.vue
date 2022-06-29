<template>
  <main class="max-w-lg mx-auto px-6">
    <add-task @newTask="getTasks" />
    <transition name="fade">
      <span v-if="loading">Fetching Tasks....</span>
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
            v-show="todo.editing"
              :id="todo.id"
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
          <div v-show=!"todo.editing":class="['todo-task text-gray-600']">
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
                bg-transparent
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
      hello: 'hello world',
      todos: [],
      loading: false,
    }
  },
  mounted() {
    this.loading = true
    this.getTasks()
  },
  methods: {
    async getTasks() {
      /***
       * @todo Fetch the tasks created by the user and display them.
       * @todo also the function to display a single new task added
       * @hints use store and set loading true
       * @caution you have to assign new value to todos for it to update
       */
    },
    await this.$axios({
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
          this.$toast.error('Error in fetching the todos')
        })
    /**
     * Function to update a single todo
     * @argument {number} _index - index of element to update in todos array
     * @argument {number} _id - id of todo obtained from API
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    updateTask(_index, _id) {},
    updateTask(_index, _id) {
      // console.log(this.todos[_index].title)
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
            this.$toast.error('Error in updating the todos')
          })
      }
    },
    /**
     * toggle visibility of input and buttons for a single todo
     * @argument {number} index - index of element to toggle
     * @todo add in bindings in dom so that 'hideme' class is dynamic or use conditional rendering
     * @hint read about class bindings in vue
     */
    editTask(index) {
      this.todos[index].editing = !this.todos[index].editing
    },
    /**
     * Function to delete a single todo
     * @argument {number} _index - index of element to update in todos array
     * @argument {number} _id - id of todo obtained from API
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    deleteTask(_index, _id) {},
    deleteTask(_index, _id) {
      this.$axios({
        headers: {
          Authorization: 'Token ' + this.$store.getters.token,
        },
        url: 'todo/' + _id + '/',
        method: 'delete',
      })
        .then(() => {
          this.$toast.success('Todo deleted successfully')
          this.todos = this.todos.filter((todo) => todo.id !== _id)
        })
        .catch(() => {
          this.$toast.error('Error in deleting the todos')
        })
    },
  },
})
</script>
