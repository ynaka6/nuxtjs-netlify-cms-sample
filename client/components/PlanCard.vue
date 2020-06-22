<template>
  <div class="bg-white shadow-md hover:shadow-2xl rounded-lg p-4 mb-6">
    <div class="flex items-center mb-2">
      <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="" class="h-10 w-10 block rounded-full" />
      <p class="ml-2 font-semibold text-xs text-gray-800">名前です名前です名前です名前です</p>
    </div>
    <p class="text-lg font-bold mb-1">気軽にチャットで相談コース</p>
    <p class="text-xs text-gray-700 mb-1">SlackのDMを利用してマンツーマンでサポートします。</p>
    <div class="mb-4">
      <hashtag text="#Laravel" class="mr-2" @click="onClickHashtag(`Laravel`)" />
      <hashtag text="#設計" class="mr-2" @click="onClickHashtag(`設計`)" />
    </div>
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold text-4xl text-gray-800"><span class="mr-1">¥</span>
          3,000
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hashtag from '../elements/Hashtag.vue'

export default Vue.extend({
  components: {
    Hashtag
  },
  methods: {
    onClickHashtag(hashtag: string): void {
      this.$emit("click-hashtag", hashtag);
    }
  }
})
</script>
