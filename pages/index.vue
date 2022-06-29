<template>
  <main class="max-w-lg mx-auto px-8">
    <add-task @newTask="getTasks" />
    <transition>
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
              :id="todo.id"
              type="text"
              :class="[
                'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input',
              ]"
              :name="todo.title"
              placeholder="Edit The Task"
              v-model.trim="editTitle"
              v-show="!todos[index].editing"
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
              v-show="!todos[index].editing"
              @click="updateTask(index, todo.id)"
            >
              Done
            </button>
          </div>

          <div :class="['todo-task text-gray-600']">
            {{ todo.title }}
          </div>
          <span class="">

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
              v-show="!todos[index].editing"
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
                hover:bg-red-500 
                hover:text-white
                border border-red-500
                hover:border-transparent
                rounded
                px-2
                py-2
              "
              id="styd"
              v-show="!todos[index].editing"
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
    middleware: 'auth',
  components: { addTask },
  data() {
    return {
      hello: 'hello world!',
      todos: [],
      todoText:"",
      editTitle:"",
      loading: false,
    }
  },
  mounted() {
    this.getTasks(),
    this.getname()
  },
  methods: {
    async getTasks() {
        this.loading = true;
        const headers={
        Authorization: 'Token ' + this.$store.getters.token
      }
      this.$axios.get('todo/',{headers})
        .then((response) => 
        {
        console.log("data");
        console.log(response.data);
        this.todos=response.data;
        this.loading = false;
   response.data.forEach((value)=>{
        value.editing=false
          })        })
          .catch((err) => {
          this.$toast.error("Error!..")
        })
    },

      getname(){
        console.log("check getname")
        const headers={
        Authorization: 'Token ' + this.$store.getters.token
      }
      this.$axios.get('https://todo-app-csoc.herokuapp.com/auth/profile/',{headers})
        .then((response) => {
          console.log("inside getname")
          console.log(response.data)

          this.$store.commit('setName', response.data.name)
        })
        .catch((err) => {
          console.log(err)
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
    async updateTask(_index, _id) {         
      console.log("updatingg")
      console.log("data67");
      const data={title: this.editTitle,}
      const headers={Authorization: 'Token ' + this.$store.getters.token}

      if(this.todos[_index].title!= ''){
       await this.$axios.patch(`https://todo-app-csoc.herokuapp.com/todo/${_id}/`,data,{headers})
        .then((response) => 
        {
        console.log("data66");
        console.log(response);
        console.log(this.todos[_index].editing)
        console.log("data77");
        this.todos[_index].title=this.editTitle
        this.editTitle=''
        this.$toast.success('Task Updated')
        this.todos[_index].editing = !this.todos[_index].editing;
        })
          .catch((err) => {
          this.$toast.error("Error!..")
        })
      }
        this.todos[_index].editing = !this.todos[_index].editing;
        console.log("errrr")
},
    /**
     * toggle visibility of input and buttons for a single todo
     * @argument {number} index - index of element to toggle
     * @todo add in bindings in dom so that 'hideme' class is dynamic or use conditional rendering
     * @hint read about class bindings in vue
     */
    editTask(index,id) {
      console.log("editngg")
      console.log(this.todos[index].editing);
      this.todos[index].editing = !this.todos[index].editing;
      console.log(this.todos[index].editing);
    },

    deleteTask(_index, _id) {
      console.log("inside del")
      this.$toast.info('Please wait...')
      const headers={
      Authorization: 'Token ' + this.$store.getters.token
      }
      this.$axios.delete(`https://todo-app-csoc.herokuapp.com/todo/${_id}/`,{headers})
         .then((response) => {
          this.todos.splice(_index,1)
          this.$toast.success('Task deleted!')
        })
        .catch((err) => {
          this.$toast.error('Unable to delete the task!..')
        })
    },
  },
})
</script>

<style>
#styd{
  background-color: red;
}
#edbtn{
  background:rgb(77, 77, 219);
}
</style>
