<template>
  <aside class="flex justify-between mt-2 px-4 pt-2">
    <button
      type="button"
      class="
        w-1/2
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
      @click="sortAsc"
    >
      Sort (A-Z)
    </button>
    <button
      type="button"
      class="
        w-1/2
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
      @click="sortDesc"
    >
      Sort (Z-A)
    </button>
  </aside>
</template>
>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {}
  },
  methods: {
    async sortAsc() {
      this.$emit('sortAsc')
    },
    async sortDesc() {
      this.$emit('sortDesc')
    },
  },
})
</script>
