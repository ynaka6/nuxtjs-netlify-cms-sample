<template>
  <div class="max-w-2xl mx-auto px-2">
    <div class="py-4">
      <plan-card 
        v-for="(plan, index) in planPosts"
        :key="index"
        :plan="plan"
        @click-hashtag="onClickHashtag"
      >
        <template v-slot:header>
          <nuxt-link :to="`/users/${plan.author.username}`" class="flex items-center mb-2">
            <img :src="plan.author.profilePicture" :alt="plan.author.title" class="h-10 w-10 block rounded-full" />
            <p class="ml-2 font-semibold text-xs text-gray-800" v-text="plan.author.title" />
          </nuxt-link>
        </template>
      </plan-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from "vuex"
import PlanCard from '../components/PlanCard.vue'

export default Vue.extend({
  components: {
    PlanCard
  },
  computed: {
    ...mapGetters({
        planPosts: "planPosts"
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
