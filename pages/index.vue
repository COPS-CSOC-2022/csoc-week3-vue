<template>
  <main class="max-w-lg mx-auto px-6">
    <add-task @newTask="getTasks" />
    <transition>
      <span
        v-if="loading"
        class="
          border
          flex
          border-gray-500
          rounded
          px-2
          py-2
          items-center
          mb-2
          todoHeader
        "
        >Fetching Tasks....</span
      >
      <ul v-else class="flex-col mt-9 mx-auto">
        <div
          v-if="todos.length == 0"
          class="
            border
            flex
            border-gray-500
            rounded
            px-2
            py-2
            items-center
            mb-2
            todoHeader
          "
        >
          <h1>Todo List is Empty</h1>
        </div>
        <div v-else>
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
                v-show="todo.edited"
                :id="todo.id"
                v-model.trim="todos[index].title"
                type="text"
                :class="[
                  ' appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input',
                ]"
                :name="todo.title"
                placeholder="Edit The Task"
              />
            </label>
            <div class="">
              <button
                v-show="todo.edited"
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
            <div v-show="!todo.edited" :class="['todo-task text-gray-600']">
              {{ todo.title }}
            </div>
            <span v-show="!todo.edited" class="">
              <button
                style="margin-right: 5px"
                type="button"
                class="
                  bg-transparent
                  hover:bg-yellow-500 hover:text-white
                  border border-yellow-500
                  hover:border-transparent
                  rounded
                  editBorder
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
                type="button"
                class="
                  bg-transparent
                  hover:bg-red-500 hover:text-white
                  border border-red-500
                  hover:border-transparent
                  rounded
                  deleteBorder
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
        </div>
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
      updatetask: '',
      hello: 'hello world!',
      todos: [],
      tasks: [],
      loading: false,
    }
  },
  mounted() {
    this.loading = true
    this.getTasks()
    this.$toast.info('Getting your tasks of Todolist...')
  },
  methods: {
    async getTasks() {
      /***
       * @todo Fetch the tasks created by the user and display them.
       * @todo also the function to display a single new task added
       * @hints use store and set loading true
       * @caution you have to assign new value to todos for it to update
       */
      const headersForApiRequest = {
        headers: { Authorization: 'Token ' + this.$store.getters.token },
      }
      await this.$axios
        .$get('todo/', headersForApiRequest)
        .then((data) => {
          this.tasks = data
          this.tasks = this.tasks.map((todo) => {
            return {
              ...todo,
              edited: false,
            }
          })
          this.todos = this.tasks
          this.loading = false
        })
        .catch(() => {
          this.$toast.error('Unable to get tasks Please try again...')
        })
    },
    /**
     * Function to update a single todo
     * @argument {number} _index - index of element to update in todos array
     * @argument {number} _id - id of todo obtained from API
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    updateTask(_index, _id) {
      if (this.todos[_index].title === '') {
        this.$toast.error('Enter a Task in the Edit part...')
        return
      }
      const dataForApiRequest = {
        title: this.todos[_index].title,
      }

      const headersForApiRequest = {
        headers: { Authorization: 'Token ' + this.$store.getters.token },
      }
      this.$axios
        .$patch('todo/' + _id + '/', dataForApiRequest, headersForApiRequest)
        .then(() => {
          this.$toast.success('Item in todo list Updated ✅ successfully...  ')
          this.todos[_index].edited = false
        })
        .catch(() => {
          this.$toast.error(
            'Unable to Update ❌ the item in todo. Please try again...'
          )
        })
    },
    /**
     * toggle visibility of input and buttons for a single todo
     * @argument {number} index - index of element to toggle
     * @todo add in bindings in dom so that 'hideme' class is dynamic or use conditional rendering
     * @hint read about class bindings in vue
     */
    editTask(index) {
      this.todos[index].edited = !this.todos[index].edited
    },
    /**
     * Function to delete a single todo
     * @argument {number} _index - index of element to update in todos array
     * @argument {number} _id - id of todo obtained from API
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    deleteTask(_index, _id) {
      const headerForApiRequets = {
        headers: { Authorization: 'Token ' + this.$store.getters.token },
      }
      this.$toast.info('Please wait...')

      this.$axios
        .$delete('todo/' + _id + '/', headerForApiRequets)
        .then(() => {
          this.$toast.success('Task Deleted ⛔ from the todo successfully...')
          this.todos = this.todos.filter((todo) => todo.id !== _id)
        })
        .catch(() => {
          this.$toast.error(
            'Unable to Delete ⛔ the given task. Please try again...'
          )
        })
    },
  },
})
</script>
<style scoped>
.todoHeader {
  justify-content: center;
}

.deleteBorder {
  border-color: red;
}

.editBorder {
  border-color: #ffd60a;
}
</style>
