<template>
  <aside class="flex justify-between mt-2 px-4">
    <label for="search task" class="flex-1">
      <input
        type="text"
        name="search task"
        v-model.trim="searchTodo"
        @change="updateFilter"
        class="
          todo-search-task-input
          px-4
          py-2
          placeholder-yellowGray-300
          text-yellowGray-600
          bg-white
          rounded
          text-sm
          border border-yellowGray-300
          outline-none
          focus:outline-none focus:ring
          w-full
          pr-3
          mr-3
        "
        placeholder="Filter tasks"
      />
    </label>
    <button
      type="button"
      class="
        px-4
        py-2
        bg-transparent
        hover:bg-yellow-500
        text-yellow-600 text-sm
        hover:text-white
        border border-yellow-500
        hover:border-transparent
        rounded
      "
      @click="searchTodo = ''"
    >
      Clear Filter
    </button>
  </aside>
</template>
>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      searchTodo: '',
    }
  },
  methods : {
    async updateFilter(){
      this.$emit('updateFilter', this.searchTodo)
    }
  }
})
</script>
