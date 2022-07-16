<template>
  <aside class="mx-auto flex justify-between mt-24 px-4">
    <label for="add task" class="flex-1">
      <input
        @input="search"
        type="text"
        name="searchText"
        id='search-bar'
        class="
          
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
        placeholder="Search"
        v-model='searchText'
      />
    </label>
  </aside>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import axios from 'axios'

const BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

export default defineComponent({
  emits: ['searchQuery'],
  data(){
    return {
      searchText: ''
    }
  },
  methods: {
    search(){
        if(this.searchText != '')
            this.$emit('searchQuery', this.searchText)
        else 
            this.$emit('searchQuery', false)
    }
  }
    
})
</script>
<style scoped>
#search-bar{
    position: absolute;
    top: 15%;
    width: auto;
    transform: translate(50%, 0);
}
</style>