<template>
  <div class="flex flex-col">
    <div class="wrap-parent min-h-screen flex flex-col">
      <default-header />
      <div class="flex flex-grow">
        <div class="w-full overflow-hidden py-4">
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
