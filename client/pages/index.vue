<template>
  <div class="max-w-2xl mx-auto px-2">
    <div class="py-4">
      <plan-card 
        v-for="(plan, index) in planPosts"
        :key="index"
        :plan="plan"
        @click-hashtag="onClickHashtag"
      />
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
