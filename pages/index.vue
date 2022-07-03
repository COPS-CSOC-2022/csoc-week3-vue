<template>
  <main class="max-w-lg mx-auto px-6">
    <search @query="search"></search>
    <add-task @newTask="addTask" />
    <span v-if="loading" class="no-task">Fetching Tasks....</span>
    <span v-if="!loading && this.filteredTodos.length === 0" class="no-task">No Tasks To Show</span>
    <ul class="flex-col mt-9 mx-auto">
      <transition-group name="list" appear>
        <li
          v-for="(todo, index) in filteredTodos"
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
              v-model="filteredTodos[index].title"
              v-show="filteredTodos[index].editing"
              :id="todo.id"
              type="text"
              class="[
                'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input'
              ]"
              :name="todo.title"
              placeholder="Edit The Task"
            />
          </label>
          <div :class="{'hideme': !filteredTodos[index].editing}">
            <button
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
          <div :class="[{'hideme': filteredTodos[index].editing}, 'todo-task text-gray-600']">
            {{ todo.title }}
          </div>
          <span :class="{'hideme': filteredTodos[index].editing}" >
            <button
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
              @click="editTask(index, todo.id)"
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
      </transition-group>
    </ul>
  </main>
</template>

<script lang>
import { defineComponent } from '@nuxtjs/composition-api'
import addTask from '~/components/addTask.vue'
import axios from 'axios'
import Search from '~/components/search.vue';
const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';
let query = ''

export default defineComponent({
  components: { addTask, Search },
  data() {
    return {
      hello: 'hello world!',
      todos: [],
      loading: false,
      filteredTodos: [],
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    addTask(task) {
      this.todos.push(task);
      if (task.title.toLowerCase().indexOf(query) !== -1)
        this.filteredTodos.push(task)
    },

    search(searchTerm) {
      query = searchTerm
      this.filteredTodos = this.todos.filter(t => t.title.toLowerCase().indexOf(query) !== -1)
    },

    async getTasks() {
      this.loading = true
      let todos = await axios({
        url: API_BASE_URL + 'todo/',
        method: 'GET',
        headers: {Authorization: `token ${this.$store.getters.token}`},
      }).then(obj => obj.data)
      todos.forEach(t => t.editing = false)
      this.todos = Array.from(todos)
      this.filteredTodos = Array.from(todos)
      this.loading = false
    },

    updateTask(_index, _id) {
      this.filteredTodos[_index].title = this.filteredTodos[_index].title.trim()
      axios({
        url: API_BASE_URL + `todo/${_id}/`,
        method: 'PUT',
        headers: {Authorization: `token ${this.$store.getters.token}`},
        data: {title: this.filteredTodos[_index].title}
      }).then(() => {
        this.$toast.success('Task name changed successfully')
        const ind = (arr) => arr.findIndex(elem => elem.id === _id)
        this.todos[ind(this.todos)].editing = false
        this.filteredTodos[ind(this.filteredTodos)].editing = false
      })
    },

    editTask(index, id) {
      const ind = (arr) => arr.findIndex(elem => elem.id === id)
      this.todos[ind(this.todos)].editing = true
      this.filteredTodos[ind(this.filteredTodos)].editing = true
    },
    
    deleteTask(_index, _id) {
      axios({
        url: API_BASE_URL + `todo/${_id}/`,
        method: 'DELETE',
        headers: {Authorization: `token ${this.$store.getters.token}`},
      }).then(() => {
        this.$toast.success('Task deleted successfully')
        this.todos = this.todos.filter(({id}) => id != _id)
        this.filteredTodos = this.filteredTodos.filter(({id}) => id != _id)
      })
    },
  },
  middleware: 'auth',
})
</script>

<style>
  .no-task {
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: 30px
  }
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    /* transition-property: opacity, transform; */
    transition-property: all;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
  }

  .list-leave-active {
    /* margin: -10%; */
    width: min(100vw - 48px, 464px);
    position: absolute;
  }

  .list-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
  }
</style>