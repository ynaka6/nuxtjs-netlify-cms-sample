<template>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
          <div>
            <div v-html="$md.render(author.body)" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-5/12 py-4">
        <div class="bg-gray-100 p-4">
          <p class="font-bold text-xl">Categories</p>
          <ul>
            <li
              v-for="(category, index) in author.categories"
              :key="index"
              class="text-gray-900"
            >
              {{ category.label }}
            </li>
          </ul>
        </div>
      </div>
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
    let data = null;
    if (context.payload) {
      data = context.payload as { author: Author };
    } else {
      const username = context.params['username'];
      const authors = context.store.getters['authors'] || [];
      const author = authors.find((a: Author) => a.username === username)
      data = { author };
    }

    context.store.dispatch('setPageInfo', {
      title: data.author.title,
      description: `@${data.author.username}`
    });
    return data;
  }
})
</script>

<style>
</style>
