<template>
  <div class="max-w-2xl mx-auto px-2">
    <div class="py-4">
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
      <plan-card @click-hashtag="onClickHashtag" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlanCard from '../components/PlanCard.vue'

export default Vue.extend({
  components: {
    PlanCard
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
