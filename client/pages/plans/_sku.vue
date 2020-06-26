<template>
  <div class="max-w-2xl mx-auto px-2">
    <div class="py-4">
      <h1 class="text-2xl">{{plan.title}}</h1>
      <p class="text-base">{{plan.description}}</p>
    </div>
    <div class="py-4">
      <div v-html="$md.render(plan.body)" />
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
    if (context.payload) {
      return context.payload as { plan: Plan };
    }
    const sku = context.params['sku'];
    const plans = context.store.getters['planPosts'] || [];
    const plan = plans.find((p: Plan) => p.sku === sku);
    return { plan };
  }
})
</script>

<style>
</style>
