<template>
  <div class="flex flex-col">
    <div class="wrap-parent min-h-screen flex flex-col">
      <default-header
        :user="user"
        @signup="openSignup"
        @login="openLogin"
        @logout="onLogout"
      />
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
              <div class="flex items-center justify-center">
                <img v-if="pageImage" :src="pageImage" :alt="pageTitle" class="h-24 w-24 block rounded-full mr-10" />
                <div class="w-auto">
                  <h1 class="text-xl lg:text-3xl mb-4" v-text="pageTitle" />
                  <p class="text-xs" v-text="pageDescription" />
                </div>
              </div>
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
import { mapGetters, mapActions } from "vuex"
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
        pageImage: "pageImage",
        breadcrumbs: "breadcrumbs",
    }),
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    onLogout() {
      this.logout()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    ...mapActions({
      openLogin: 'auth/openLogin',
      openSignup: 'auth/openSignup',
      logout: 'auth/logout'
    })
  }
})
</script>

<style>
</style>
