<template>
  <div>
    <div class="relative">
      <a
        href="#"
        class="block h-8 w-8 rounded-full overflow-hidden text-gray-600 hover:bg-blue-100 p-1"
        @click.prevent="open = !open"
      >
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Dots_three_vertical" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
          <path d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z   M10.001,5.2C11.216,5.2,12.2,4.214,12.2,3s-0.984-2.2-2.199-2.2S7.8,1.785,7.8,3S8.786,5.2,10.001,5.2z M10.001,14.8  C8.786,14.8,7.8,15.785,7.8,17s0.986,2.2,2.201,2.2S12.2,18.215,12.2,17S11.216,14.8,10.001,14.8z"/>
        </svg>
      </a>
      <div
        class="absolute w-full h-full opacity-0"
        @click.prevent="open = false"
      />
      <div
        v-show="open"
        class="absolute right-0 border mt-2 py-2 w-48 bg-white rounded-lg shadow-full"
      >
        <nuxt-link
          to="/mypage"
          class="block px-4 py-2 text-left text-gray-800 hover:opacity-75"
        >
          マイページ
        </nuxt-link>
        <a
          href="#"
          class="block px-4 py-2 text-left text-gray-800 hover:opacity-75"
          @click.prevent="$emit('logout')"
        >
          ログアウト
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from 'netlify-identity-widget'
export default Vue.extend({
  data() {
    return {
      open: false
    }
  },
  watch: {
      $route(to, from) {
        this.open = false
      },
  },
})
</script>