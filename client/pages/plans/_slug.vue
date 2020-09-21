<template>
<div>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="w-full">
            <div v-html="$md.render(plan.body)" class="app-markdown" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-5/12 py-4">
        <div class="bg-gray-100 px-4 py-2 mb-2">
          <nuxt-link :to="`/users/${plan.author.slug}`" class="flex items-center">
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
              <span v-text="plan.product.price.toLocaleString()" />
              <span class="text-sm">/ month</span>
            </p>
          </div>
          <div class="border-b my-4" />
          <button
            class="w-full bg-orange-500 rounded font-bold text-white p-4 hover:opacity-75 mb-4"
            @click.prevent="goToCheckout"
          >
            購入手続きを行う
          </button>
          <p class="text-gray-800 text-xs">※ 購入処理はStripeを利用してクレジットカード決済となります</p>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full bg-white">
    <div class="max-w-4xl mx-auto px-2 py-10">
      <disqus
        :identifier="`plan_${plan.slug}`"
        :url="`${baseUrl}/plans/${plan.slug}`"
      ></disqus>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Breadcrumb, Plan } from '../../types/entities'
import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js';

export type DataType = {
  baseUrl: string;
  stripePublishableKey: string;
  plan: Plan;
}

export default Vue.extend({
  validate(context: Context): boolean {
    const slug = context.params['slug'];
    const plans = context.store.getters['planPosts'] || [];
    return plans.find((p: Plan) => p.slug === slug);
  },
  data(): DataType {
    return {
      baseUrl: "",
      stripePublishableKey: process.env.baseUrl || "",
      plan: {} as Plan,
    };
  },
  async asyncData(context: Context): Promise<DataType> {
    let data = null;
    if (context.payload) {
      data = context.payload as { plan: Plan };
    } else {
      const slug = context.params['slug'];
      const plans = context.store.getters['planPosts'] || [];
      const plan = plans.find((p: Plan) => p.slug === slug);
      data = { plan };
    }    
    context.store.dispatch('setPageInfo', {
      title: data.plan.title,
      description: data.plan.description,
      breadcrumbs: [
        { to: "/", icon: ["fas", "laptop-code"], color: "text-gray-100" } as Breadcrumb,
        { to: `/users/${data.plan.author.slug}`, name: data.plan.author.title, color: "text-gray-100" } as Breadcrumb,
        { name: data.plan.title, color: "text-gray-100" } as Breadcrumb,
      ]
    });
    
    return {
      baseUrl: process.env.baseUrl || "",
      stripePublishableKey: process.env.stripePublishableKey || "",
      ...data
    };
  },
  methods: {
    async goToCheckout(): Promise<void> {
      const stripe = await loadStripe(this.stripePublishableKey);
      if (stripe) {
        const session = await this.$axios.$post('/.netlify/functions/checkout_sessions', {
          amount: this.plan.product.price,
          success_url: `${this.baseUrl}/plans/${this.plan.slug}`,
        })

        stripe.redirectToCheckout({
          sessionId: session.id
          // successUrl: `${this.baseUrl}/plans/${this.plan.slug}`,
          // cancelUrl: `${this.baseUrl}/plans/${this.plan.slug}`,
          // items: [
          //   { sku: this.plan.product.value, quantity: 1 }
          // ]
        } as RedirectToCheckoutOptions);
      }
    }
  }
})
</script>

<style>
</style>
