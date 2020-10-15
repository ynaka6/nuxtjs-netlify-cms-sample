<template>
  <div class="max-w-6xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-400 bg-white': openTab !== 1, 'text-white bg-blue-400': openTab === 1}"
              @click="toggleTabs(1)"
            >
              Profile
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              :class="{'text-blue-400 bg-white': openTab !== 2, 'text-white bg-blue-400': openTab === 2}"
              @click="toggleTabs(2)"
            >
              Plan
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              @click="toggleTabs(3)"
              :class="{'text-blue-400 bg-white': openTab !== 3, 'text-white bg-blue-400': openTab === 3}"
            >
              Blog
            </a>
          </li>
        </ul>
        <div class="w-full mb-6">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <div class="bg-white shadow-md rounded-lg p-4 mb-6">
                <div>
                  <div v-html="$md.render(author.body)" class="app-markdown" />
                </div>
              </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <plan-card 
                v-for="(plan, index) in plans"
                :key="index"
                :plan="plan"
              />
            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-5/12 py-4">
        <div class="bg-gray-100 p-4 mb-4">
          <p class="font-bold text-xl mb-2">Share</p>
          <div class="flex">
            <a
              :href="`https://twitter.com/intent/tweet?url=${url}&text=${shareText}`"
              class="inline-block w-1/2 p-2 bg-twitter rounded text-white text-center mr-1 hover:opacity-75"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a
              :href="`https://www.facebook.com/share.php?u=${url}`"
              class="inline-block w-1/2 p-2 bg-facebook rounded text-white text-center ml-1 hover:opacity-75"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="author.email"
      class="fixed right-0 bottom-0 mr-6 mb-32 lg:mr-10 lg:mb-10"
    >
      <a :href="`mailto:${author.email}`" class="rounded-full bg-black text-white px-6 py-4 hover:opacity-75">
        <span class="mr-2">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
        CONTACT
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Author, Breadcrumb } from '../../types/entities'
import PlanCard from '../../components/PlanCard.vue'

export type DataType = {
  openTab: number;
  url: string;
  shareText: string;
}

export default Vue.extend({
  components: {
    PlanCard
  },
  validate(context: Context): boolean {
    const slug = context.params['slug'];
    const authors = context.store.getters['authors'] || [];
    return authors.find((a: Author) => a.slug === slug);
  },
  data(): DataType {
    return {
      openTab: 1,
      url: `${process.env.baseUrl}${this.$nuxt.$route.path}`,
      shareText: ""
    };
  },
  async asyncData(context: Context) {
    let data = null;
    if (context.payload) {
      data = context.payload as { author: Author };
    } else {
      const slug = context.params['slug'];
      const authors = context.store.getters['authors'] || [];
      const author = authors.find((a: Author) => a.slug === slug)
      const plans = context.store.getters['authorPlanPosts'](author) || [];
      data = { author, plans };
    }
    const breadcrumbs = [
      { to: "/", icon: ["fas", "laptop-code"], color: "text-gray-100" } as Breadcrumb,
      { name: data.author.title, color: "text-gray-100" } as Breadcrumb,
    ];
    context.store.dispatch('setPageInfo', {
      title: data.author.title,
      description: `@${data.author.username}`,
      image: data.author.profilePicture,
      breadcrumbs
    });
    return data;
  },
  methods: {
    toggleTabs(tab: number): void {
      this.openTab = tab
    }
  }
})
</script>

<style>
</style>
