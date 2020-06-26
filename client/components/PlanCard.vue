<template>
  <div class="bg-white shadow-md hover:shadow-2xl rounded-lg p-4 mb-6">
    <slot name="header" />
    <nuxt-link :to="`/plans/${plan.sku}`">
      <p class="text-lg font-bold mb-1" v-text="plan.title" />
      <p class="text-xs text-gray-700 mb-1" v-text="plan.description" />
    </nuxt-link>
    <div class="mb-4">
      <hashtag
        v-for="hashtag in hashtags"
        :key="hashtag.value"
        :text="`#${hashtag.label}`"
        class="mr-2"
        @click="onClickHashtag(hashtag.value)"
      />
    </div>
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold text-4xl text-gray-800">
          <span class="mr-1">¥</span>
          <span v-text="plan.price" />
        </p>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Hashtag from '../elements/Hashtag.vue'
import { Author, Hashtag as HashtagData, Plan } from '../types/entities'

export default Vue.extend({
  components: {
    Hashtag
  },
  props: {
    plan: { type: Object } as PropOptions<Plan>
  },
  computed: {
    author(): Author {
      return this.plan.author;
    },
    hashtags(): HashtagData[] {
      return this.plan.hashtags;
    }
  },
  methods: {
    onClickHashtag(hashtag: string): void {
      this.$emit("click-hashtag", hashtag);
    }
  }
})
</script>
