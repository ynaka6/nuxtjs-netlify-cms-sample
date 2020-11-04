<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row">
      <div class="w-full flex flex-wrap py-4 md:w-9/12 md:px-4">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="w-full md:pb-2 md:px-2"
        >
          <plan-card :plan="plan" class="border-b">
            <template v-slot:header>
              <nuxt-link
                :to="`/user/${plan.author.slug}`"
                class="flex items-center mb-2"
              >
                <profile-icon
                  :src="plan.author.profilePicture"
                  :alt="plan.author.title"
                  class="h-6 w-6"
                />
                <p
                  class="ml-2 font-semibold text-xs text-gray-800"
                  v-text="plan.author.title"
                />
              </nuxt-link>
            </template>
          </plan-card>
        </div>
      </div>
      <div class="w-full md:w-3/12 py-4">
        <div class="bg-gray-100 p-4">
          <p class="font-bold text-xl">Tags</p>
          <div class="border-b my-2" />
          <ul>
            <li
              v-for="(hashtag, index) in hashtags"
              :key="index"
              class="font-bold text-gray-800 my-1"
            >
              <hashtag
                tag-name="nuxt-link"
                :to="`/tag/${hashtag.value}`"
                class="mr-2"
              >
                <div class="flex items-center justify-center mr-2">
                  <img v-if="hashtag.icon" :src="hashtag.icon" class="h-3" />
                  <font-awesome-icon v-else :icon="['fas', 'tag']" />
                </div>
                {{ hashtag.label }}
              </hashtag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import Hashtag from '../elements/Hashtag.vue'
import PlanCard from '../components/PlanCard.vue'
import ProfileIcon from '../components/ProfileIcon.vue'
import { Hashtag as HashtagData } from '../../core/entities/Hashtag'
import { Plan } from '../../core/entities/Plan'

export default Vue.extend({
  components: {
    Hashtag,
    PlanCard,
    ProfileIcon,
  },
  asyncData(context: Context): { plans: Plan[] } {
    context.store.dispatch('setPageInfo', {
      title: 'The best Programming Supporter.',
      description:
        'あなたのプログラミングの課題や問題を解決し成長というゴールに導くメンターを探しましょう',
    })
    return {
      plans: context.store.getters['plan/plans'],
    }
  },
  data(): { plans: Plan[] } {
    return {
      plans: [],
    }
  },
  computed: {
    hashtags(): HashtagData[] {
      return this.$store.getters['hashtag/hashtags']
    },
  },
})
</script>

<style></style>
