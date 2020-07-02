<template>
  <div class="flex flex-col">
    <div class="wrap-parent min-h-screen flex flex-col">
      <default-header />
      <div class="flex flex-grow">
        <div class="w-full">
          <div class="w-full bg-gray-900 text-white text-center">
            <div class="relative max-w-6xl mx-auto px-4 py-24">
              <div
                v-if="breadcrumbs.length > 0"
                class="absolute inset-0 mt-4"
              >
                <breadcrumb :breadcrumbs="breadcrumbs" />
              </div>
              <h1 class="text-3xl mb-4" v-text="pageTitle" />
              <p class="text-xs" v-text="pageDescription" />
            </div>
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
import Breadcrumb from '../components/Breadcrumb.vue'

export default Vue.extend({
  components: {
    DefaultHeader,
    DefaultFooter,
    Breadcrumb
  },
  computed: {
    ...mapGetters({
        pageTitle: "pageTitle",
        pageDescription: "pageDescription",
        breadcrumbs: "breadcrumbs",
    })
  },
})
</script>

<style>
</style>
