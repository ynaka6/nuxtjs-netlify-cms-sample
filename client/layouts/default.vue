<template>
  <div class="flex flex-col">
    <div class="wrap-parent min-h-screen flex flex-col">
      <default-header />
      <div class="flex flex-grow">
        <div class="w-full">
          <div class="w-full bg-gray-900 px-4 py-10 text-white text-center">
            <h1 class="text-3xl mb-4">
              The best Programming Supporter.
            </h1>
            <p class="text-xs">
              あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう
            </p>
          </div>
          <nuxt />
        </div>
      </div>
      <default-footer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DefaultHeader from './DefaultLayout/DefaultHeader.vue'
import DefaultFooter from './DefaultLayout/DefaultFooter.vue'

export default Vue.extend({
  components: {
    DefaultHeader,
    DefaultFooter
  }
})
</script>

<style>
</style>
