<template>
  <div class="flex flex-col">
    <div class="wrap-parent min-h-screen flex flex-col">
      <default-header />
      <div class="flex flex-grow">
        <div class="w-full">
          <div class="w-full bg-gray-900 px-4 py-24 text-white text-center">
            <h1 class="text-3xl mb-4" v-text="pageTitle" />
            <p class="text-xs" v-text="pageDescription" />
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
import { mapGetters } from "vuex"
import DefaultHeader from "./DefaultLayout/DefaultHeader.vue"
import DefaultFooter from "./DefaultLayout/DefaultFooter.vue"

export default Vue.extend({
  components: {
    DefaultHeader,
    DefaultFooter
  },
  computed: {
    ...mapGetters({
        pageTitle: "pageTitle",
        pageDescription: "pageDescription"
    })
  },
})
</script>

<style>
</style>
