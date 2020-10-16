<template>
  <div class="h-full bg-white">
    <div class="max-w-6xl mx-auto px-2 pt-16 pb-6">
      <div class="w-full relative flex justify-end items-center mb-4">
        <input
          v-model="q"
          type="text"
          class="w-full text-3xl border-b form-input p-3 pl-4 pr-6"
          placeholder="Seach"
          @input="search"
        >
        <span class="absolute mr-3">
          <svg class="fill-current pointer-events-none text-gray-600 w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
        </span>
      </div>
      <div v-if="planPosts.length > 0" class="">
        <h3 class="font-bold text-2xl text-gray-800 mb-4">
          <span class="mr-2">
            <font-awesome-icon :icon="[ 'fas', 'rocket' ]" />
          </span>
          Plans
        </h3>
        <div
          v-for="(plan, index) in planPosts"
          :key="index"
          class="mb-2"
        >
          <plan-card 
            :plan="plan"
            @click-hashtag="onClickHashtag"
          >
            <template v-slot:header>
              <nuxt-link :to="`/user/${plan.author.slug}`" class="flex items-center mb-2">
                <img :src="plan.author.profilePicture" :alt="plan.author.title" class="h-10 w-10 block rounded-full" />
                <p class="ml-2 font-semibold text-xs text-gray-800" v-text="plan.author.title" />
              </nuxt-link>
            </template>
          </plan-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from "vuex"
import { Context } from '@nuxt/types'
import PlanCard from '../components/PlanCard.vue'

export default Vue.extend({
  components: {
    PlanCard
  },
  data() {
    return {
      q: '',
      planPosts: [],
    }
  },
  async asyncData(context: Context) {
    context.store.dispatch('setPageInfo', {
      title: "The best Programming Supporter.",
      description: "あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう"
    })
    return {
      q: '',
    }
  },
  methods: {
    search(): void {
      this.$store.dispatch('search', this.q)
        .then(res => {
          this.planPosts = this.q.length > 0 ? res : []
        })
    }
  }
})
</script>

<style>
</style>
