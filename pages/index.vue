<template>
  <main class="max-w-lg mx-auto px-6">
    <add-task @newTask="getTasks" />
    <transition name="slide-fade">
      <span v-if="loading">Fetching Tasks....</span>
      <TransitionGroup name="list" tag="ul" v-else class="flex-col mt-9 mx-auto">
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
              v-model="altTitle"
              type="text"
              :class="[
                { hideme: !(hideitem === todo.id) }, 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input',
              ]"
              :name="todo.title"
              placeholder="Edit The Task"
            />
          </label>
          <div :class="[{ hideme: !(hideitem === todo.id) }]">
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
          <div :class="[{ hideme: hideitem === todo.id }, 'todo-task text-gray-600']">
            {{ todo.title }}
          </div>
          <span :class="[{ hideme: hideitem === todo.id }]">
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
      </TransitionGroup>
    </transition>
  </main>
</template>

<script lang>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import addTask from '~/components/addTask.vue'

export default defineComponent({
  middleware: 'auth',
  components: { addTask },
  data() {
    return {
      hideitem: null,
      altTitle: "",
      hello: 'hello world!',
      todos: [],
      loading: false,
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    async getTasks() {

      this.loading = true
      try {
        const res = await this.$axios.get('todo/', {headers: { Authorization: 'Token ' + this.$store.getters.token}})
        this.todos = res.data
        console.log(res)
        this.todos.forEach((index) => {
          index.editing = false
        })
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },

    updateTask(_index, _id) {

      this.todos[_index].editing = !this.todos[_index].editing
      //Checking if the updated value already exists within the todo list
      var check = false
      this.todos.forEach((todo) => {
          if( todo.title === this.altTitle ){
            check = true
            return
          }
      })

      if( this.altTitle === "" ){
        this.$toast.error("Todo not edited.")
      }
      else if (check){
        this.$toast.error("The entered todo alreay exists in the list.")
      }
      else{
        const dataforAPI ={
          id: _id,
          title: this.altTitle
        }
        this.$axios.patch('todo/'+ _id +'/', dataforAPI , {headers: { Authorization: 'Token ' + this.$store.getters.token}})
          .then(() => {
            this.$toast.success("Todo edited successfully")
          })
        this.todos[_index].title = dataforAPI.title
      }
      this.hideitem = null
    },

    editTask(index) {
      this.todos[index].editing = !this.todos[index].editing
      console.log(this.todos[index].editing)
      this.hideitem = this.todos[index].id
      this.altTitle = this.todos[index].title
    },

    deleteTask(_index, _id) {
      const dataforAPI = {
        id: _id
      }
      console.log(dataforAPI.id)
      this.$axios.delete('todo/'+ _id +'/', {headers: { Authorization: 'Token ' + this.$store.getters.token}})
        .then((response) =>{
          this.todos = this.todos.filter((todo) => todo.id !== _id)
        }).catch((err) => {
          console.log(err)
        })
      this.$toast.info("Todo deleted successfully.")
    },
  },
})
</script>
