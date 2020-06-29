<template>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
          <div class="w-full">
            <div v-html="$md.render(plan.body)" />
          </div>
          <div class="border-b my-4" />
          <div class="w-full">
            <disqus
              :identifier="`plan_${plan.sku}`"
              :url="`${baseUrl}/plans/${plan.sku}`"
            ></disqus>
          </div>
        </div>
      </div>
      <div class="w-full md:w-5/12 py-4">
        <div class="bg-gray-100 px-4 py-2 mb-2">
          <nuxt-link :to="`/users/${plan.author.username}`" class="flex items-center">
            <img :src="plan.author.profilePicture" :alt="plan.author.title" class="h-10 w-10 block rounded-full" />
            <div>
              <p class="ml-2 font-semibold text-xs text-gray-800" v-text="plan.author.title" />
              <p class="ml-2 font-semibold text-xs text-gray-800" v-text="`@${plan.author.username}`" />
            </div>
          </nuxt-link>
        </div>
        <div class="bg-gray-100 px-4 py-2">
          <div class="flex justify-between items-center">
            <p>Price</p>
            <p class="font-semibold text-2xl text-gray-800">
              <span class="mr-1">¥</span>
              <span v-text="plan.price" />
              <span class="text-sm">/ month</span>
            </p>
          </div>
          <div class="border-b my-4" />
          <button class="w-full bg-orange-500 rounded font-bold text-white p-4 hover:opacity-75 mb-4">購入手続きを行う</button>
          <p class="text-gray-800 text-xs">※ 購入処理はStripeを利用してクレジットカード決済となります</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Plan } from '../../types/entities'

export default Vue.extend({
  validate(context: Context): boolean {
    const sku = context.params['sku'];
    const plans = context.store.getters['planPosts'] || [];
    return plans.find((p: Plan) => p.sku === sku);
  },
  async asyncData(context: Context) {
    let data = null;
    if (context.payload) {
      data = context.payload as { plan: Plan };
    } else {
      const sku = context.params['sku'];
      const plans = context.store.getters['planPosts'] || [];
      const plan = plans.find((p: Plan) => p.sku === sku);
      data = { plan };
    }

    context.store.dispatch('setPageInfo', {
      title: data.plan.title,
      description: data.plan.description
    });
    
    return {
      baseUrl: process.env.baseUrl,
      ...data
    };
  }
})
</script>

<style>
</style>
