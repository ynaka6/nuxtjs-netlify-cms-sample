<template>
  <div>
    <div
      class="flex items-center font-semibold bg-gray-200 rounded-md py-2 px-4 cursor-pointer text-gray-900"
      @click.prevent="open = !open"
    >
      <font-awesome-icon
        :icon="['fas', open ? 'caret-down' : 'caret-right']"
        class="mr-2"
      />
      {{ title }}
    </div>
    <div v-show="open" class="p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    }
  },
})
</script>
