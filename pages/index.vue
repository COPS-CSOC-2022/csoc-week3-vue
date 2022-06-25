<template>
  <main class="max-w-lg mx-auto px-6">

    <add-task @newTask="getTasks" />
    <search-bar @updateFilter="updateFilter"/>
    <sort-bar @sortAsc="sortAsc" @sortDesc="sortDesc"/>

    <transition>
      <div v-if="loading">
        <br />
        <span
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
          Fetching Tasks....
        </span>
      </div>
      <div v-else-if="todos.length == 0">
        <br />
        <span
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
          No Todos Have been Added
        </span>
      </div>
      <ul v-else class="flex-col mt-9 mx-auto">
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
              type="text"
              :id="todo.id"
              :class="[
                'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input',
              ]"
              :name="todo.title"
              v-model.trim="todos[index].updatedValue"
              v-show="todos[index].editMode"
              placeholder="Enter the task here!"
            />
          </label>
          <div class="">
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
              v-show="todos[index].editMode"
              @click="updateTask(index, todo.id)"
            >
              Done
            </button>
          </div>
          <div
            :class="['todo-task text-gray-600']"
            v-show="!todos[index].editMode"
          >
            {{ todo.title }}
          </div>
          <span v-show="!todos[index].editMode">
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
import searchBar from '~/components/searchBar.vue'
import sortBar from '~/components/sortBar.vue'

export default defineComponent({
  middleware: 'auth',
  components: { addTask, searchBar, sortBar },

  data() {
    return {
      searchTodo : '',
      todos: [],
      loading: false,
    }
  },

  computed: {
    filteredTodos() {
      let filter = new RegExp(this.searchTodo, 'i')
      return this.todos.filter((el) => el.title.match(filter))
    },
  },

  mounted() {
    this.loading = true
    this.getTasks()
    this.$toast.info('Fetching your Todos...')
  },

  methods: {
    async getTasks() {
      const headersForAuthorization = {
        Authorization: 'Token ' + this.$store.getters.token,
      }

      this.$axios({
        headers: headersForAuthorization,
        url: 'todo/',
        method: 'get',
      })
        .then((res) => {
          res.data.forEach(function (todo) {
            todo.editMode = false
            todo.updatedValue = todo.title
          })
          this.todos = res.data
          this.loading = false
        })
        .catch((err) =>
          $toast.error(
            "Can't fetch data right now. Please reload to try again."
          )
        )
    },

    updateTask(_index, _id) {
      var newTodo = this.todos[_index].updatedValue

      if (newTodo === '') {
        this.$toast.error('Todo value cannot be blank. ')
        return
      }

      if (newTodo === this.todos[_index].title) {
        this.$toast.info('No change in the value of the todo.')
        this.editTask(_index)
        return
      }

      const headersForAuthorization = {
        Authorization: 'Token ' + this.$store.getters.token,
      }
      const dataForAPIRequest = {
        title: newTodo,
      }

      this.$toast.info('Updating your todo....')
      this.$axios({
        headers: headersForAuthorization,
        url: 'todo/' + _id + '/',
        method: 'patch',
        data: dataForAPIRequest,
      })
        .then(() => {
          this.$toast.success('Todo updated successfully!')
          this.todos[_index].title = newTodo
          this.editTask(_index)
        })
        .catch(() =>
          this.$toast.error('Updation failed. Please try again later.')
        )
    },

    editTask(_index) {
      this.todos[_index].editMode = !this.todos[_index].editMode
    },

    deleteTask(_index, _id) {
      const headersForAuthorization = {
        Authorization: 'Token ' + this.$store.getters.token,
      }

      this.$toast.info('Deleting your todo....')
      this.$axios({
        headers: headersForAuthorization,
        url: 'todo/' + _id + '/',
        method: 'delete',
      })
        .then(() => {
          this.$toast.success('Todo deleted successfully!')
          this.todos.splice(_index, 1)
        })
        .catch(() =>
          this.$toast.error('Deletion failed. Please try again later.')
        )
    },

    sortAsc() {
      this.todos.sort((a, b) => (a.title > b.title ? 1 : -1))
      this.$toast.success('Sorted in ascending order...')
    },
    sortDesc() {
      this.todos.sort((a, b) => (a.title < b.title ? 1 : -1))
      this.$toast.success('Sorted in descending order...')
    },

    updateFilter(e) {
      this.searchTodo = e
    }
  },
})
</script>
