<template>
  <div class="max-w-xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <client-only placeholder="Loading...">
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from "vuex"
import { Breadcrumb } from '../../types/entities'
import { Context } from '@nuxt/types'

export default Vue.extend({
  fetch(context: Context) {
    const breadcrumbs = [
      { to: "/", icon: ["fas", "laptop-code"], color: "text-gray-100" } as Breadcrumb,
      { name: '問い合わせ', color: "text-gray-100" } as Breadcrumb,
    ];
    context.store.dispatch('setPageInfo', {
      title: "問い合わせ",
      breadcrumbs
    })
  }
})
</script>

<style>
</style>
