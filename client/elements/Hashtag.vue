<template>
  <component
    :is="tagName"
    :href="href"
    :target="target"
    :rel="rel"
    class="inline-block bg-blue-100  border rounded-full px-2 py-1 font-bold text-bland-500 text-xs"
    @click.prevent="onClick"
  >
    {{ text }}
  </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tagName: {
      type: String,
      required: false,
      default: 'span'
    },
    text: {
      type: String,
      required: true,
      default: null
    },
    href: {
      type: String,
      required: false,
      default: null
    },
    target: {
      type: String,
      required: false,
      default: null
    },
    rel: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    onClick(): void {
      this.$emit("click", this.text);
    }
  }
})
</script>
