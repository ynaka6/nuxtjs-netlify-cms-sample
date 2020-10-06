<template>
  <header class="header">
    <nav class="nav">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <nuxt-link
          to="/"
          class="w-64 text-center p-3 pb-1 lg:pb-3 lg:text-left hover:opacity-75"
        >
          <h1 class="text-2xl font-leckerli-one">
            <span class="text-bland-500">Logo</span>
          </h1>
        </nuxt-link>
        <div class="w-full block text-bland-500 p-3">
          <div class="relative">
            <input id="docsearch" class="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input" type="text" placeholder="Search the docs (Press &quot;/&quot; to focus)" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-label="search input" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;">
            <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
              <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
            </div>
          </div>
        </div>
        <div class="w-64 text-right">
          
          <client-only placeholder="Loading...">
            <template v-if="user">
              <a
                href="#"
                class="inline-block"
                @click.prevent="$emit('logout')"
              >
                Logout
              </a>
            </template>
            <template v-else>
              <a
                href="#"
                class="inline-block mr-2"
                @click.prevent="$emit('login')"
              >
                Login
              </a>
              <a
                href="#"
                class="inline-block"
                @click.prevent="$emit('signup')"
              >
                Sign up
              </a>
            </template>
          </client-only>


        </div>
      </div>
    </nav>
  </header>
</template>


<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from 'netlify-identity-widget'
export default Vue.extend({
  props: {
    user: { type: Object } as PropOptions<User>
  }
})
</script>

<style lang="postcss" scoped>
.header {
  @apply w-full bg-white z-10 shadow-xl;

  & > .nav {
    @apply max-w-6xl mx-auto items-center justify-between flex-wrap;
  }
}
</style>
