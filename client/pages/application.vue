<template>
  <div class="flex justify-center my-10">
    <a
      :href="`https://dashboard.stripe.com/express/oauth/authorize?response_type=code&client_id=${stripeClientId}&scope=read_write`"
      class="bg-blue-600 text-white text-xl rounded-lg p-4"
    >
      Stripe Connect
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  data(context: Context) {
    context.store.dispatch('setPageInfo', { title: "サポーター申請について", description: "あなたもサポーターとして困っている方の手助けをしてみませんか？申請はStripeを利用して行います。" });
    return {
      stripeClientId: process.env.stripeClientId
    }
  },
})
</script>

<style>
</style>
