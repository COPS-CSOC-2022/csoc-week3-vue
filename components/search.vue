<template>
      <input
        @input="searched"
        type="text"
        name="add task"
        v-model="searchTerm"
        class="
          todo-search-input
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
      />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  emits: ['query'],
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    searched() {
      this.$emit('query', this.searchTerm.toLowerCase())
    },
  },
})
</script>


<style>
  .todo-search-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width: min(464px, 100vw - 48px);
    margin-top: 40px;
}
</style>