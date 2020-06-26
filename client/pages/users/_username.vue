<template>
  <div class="max-w-2xl mx-auto px-2">
    <div class="py-4">
      <h1 class="text-2xl">{{author.title}}</h1>
      <p>@{{author.username}}</p>
    </div>
    <div class="py-4">
      <div v-html="$md.render(author.body)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Author } from '../../types/entities'

export default Vue.extend({
  validate(context: Context): boolean {
    const username = context.params['username'];
    const authors = context.store.getters['authors'] || [];
    return authors.find((a: Author) => a.username === username);
  },
  async asyncData(context: Context) {
    if (context.payload) {
      return context.payload as { author: Author };
    }
    const username = context.params['username'];
    const authors = context.store.getters['authors'] || [];
    const author = authors.find((a: Author) => a.username === username)
    return { author };
  }
})
</script>

<style>
</style>
