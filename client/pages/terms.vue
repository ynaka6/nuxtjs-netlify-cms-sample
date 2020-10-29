<template>
  <div class="max-w-4xl mx-auto py-4">
    <div class="bg-white rounded-xl p-6 text-sm text-gray-800">
      <document :html="term"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Breadcrumb } from '../types/entities'
import Document from '../elements/Document.vue'

export default Vue.extend({
  components: {
    Document
  },
  asyncData(context: Context): { term: string } {
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
    const term = context.store.getters['terms/document']
    return { term }
  },
})
</script>

