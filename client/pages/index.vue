<template>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <div class="relative flex justify-end items-center mb-4">
          <input v-model="q" type="text" class="form-input p-2 pl-4 pr-6 block border rounded-full" @input="searchPlan">
          <span class="absolute mr-3">
            <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
          </span>
        </div>
        <plan-card 
          v-for="(plan, index) in planPosts"
          :key="index"
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
      <div class="w-full md:w-5/12 py-4">
        <div class="bg-gray-100 p-4">
          <p class="font-bold text-xl">Hashtag</p>
          <ul>
            <li
              v-for="(hashtag, index) in hashtags"
              :key="index"
              class="text-gray-900"
            >
              <font-awesome-icon :icon="['fas', 'tag']" class="mr-2" />
              {{ hashtag.label }}
            </li>
          </ul>
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
      q: null,
      planPosts: []
    }
  },
  async asyncData(context: Context) {
    context.store.dispatch('setPageInfo', {
      title: "The best Programming Supporter.",
      description: "あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう"
    })
    return {
      q: null,
      planPosts: context.store.getters['planPosts']
    }
  },
  computed: {
    ...mapGetters({
        hashtags: "hashtags"
    })
  },
  methods: {
    searchPlan(): void {
      this.$store.dispatch('search', this.q)
        .then(res => this.planPosts = res)
    },
    onClickHashtag(hashtag: string): void {
      alert(hashtag);
    }
  }
})
</script>

<style>
</style>
