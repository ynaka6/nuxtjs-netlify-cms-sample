<template>
  <div class="max-w-xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <client-only placeholder="Loading..."> </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Breadcrumb } from '../types/entities'

export default Vue.extend({
  fetch(context: Context) {
    const breadcrumbs = [
      {
        to: '/',
        icon: ['fas', 'laptop-code'],
        color: 'text-gray-100',
      } as Breadcrumb,
      { name: '利用規約', color: 'text-gray-100' } as Breadcrumb,
    ]
    context.store.dispatch('setPageInfo', {
      title: '利用規約',
      breadcrumbs,
    })
  },
})
</script>

<style></style>
