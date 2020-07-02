<template>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <plan-card 
          v-for="(plan, index) in planPosts"
          :key="index"
          :plan="plan"
          @click-hashtag="onClickHashtag"
        >
          <template v-slot:header>
            <nuxt-link :to="`/users/${plan.author.slug}`" class="flex items-center mb-2">
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
  fetch(context: Context) {
    context.store.dispatch('setPageInfo', {
      title: "The best Programming Supporter.",
      description: "あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう"
    })
  },
  computed: {
    ...mapGetters({
        planPosts: "planPosts",
        hashtags: "hashtags"
    })
  },
  methods: {
    onClickHashtag(hashtag: string): void {
      alert(hashtag);
    }
  }
})
</script>

<style>
</style>
