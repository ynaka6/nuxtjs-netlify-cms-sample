<template>
  <footer class="bg-gray-800">
    <div class="max-w-6xl mx-auto flex justify-between text-white px-2 py-3">
      <div>
        <div class="flex justify-center text-xs">
          <p class="text-2xl font-leckerli-one">
            <logo>Logo</logo>
          </p>
        </div>
        <div class="mt-1 flex justify-center text-xs"></div>
      </div>
      <div>
        <p class="font-bold text-gray-400 mb-2">Links</p>
        <ul>
          <li>
            <nuxt-link to="/contact" class="hover:opacity-75">
              問い合わせ
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/terms" class="hover:opacity-75">
              利用規約
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/privacy/policy" class="hover:opacity-75">
              プライバシーポリシー
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '../../elements/Logo.vue'
export default Vue.extend({
  components: {
    Logo,
  },
})
</script>
