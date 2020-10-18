<template>
  <div class="max-w-xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <client-only placeholder="Loading...">
          <a
            href="#"
            class="block w-full bg-blue-100 border border-blue-500 text-xl text-blue-500 text-center p-3 rounded-full mb-4 hover:opacity-75"
            @click.prevent="goToBillingPortal"
          >
            定期決済を確認する
          </a>
          <nuxt-link
            v-if="user && user.app_metadata.roles.includes('Mentor')"
            to="/admin"
            class="block w-full bg-blue-100 border border-blue-500 text-xl text-blue-500 text-center p-3 rounded-full mb-4 hover:opacity-75"
          >
            CMSを開く
          </nuxt-link>
          <nuxt-link
            to="/contact"
            class="block w-full bg-blue-100 border border-blue-500 text-xl text-blue-500 text-center p-3 rounded-full mb-4 hover:opacity-75"
          >
            問い合わせ
          </nuxt-link>
          <a
            href="#"
            class="block w-full bg-red-100 border border-red-500 text-xl text-red-500 text-center p-3 rounded-full hover:opacity-75"
            @click.prevent="onLogout"
          >
            ログアウト
          </a>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Context } from '@nuxt/types'
import { Breadcrumb } from '../types/entities'

export default Vue.extend({
  fetch(context: Context) {
    const breadcrumbs = [
      {
        to: '/',
        icon: ['fas', 'laptop-code'],
        color: 'text-gray-100',
      } as Breadcrumb,
      { name: 'マイページ', color: 'text-gray-100' } as Breadcrumb,
    ]
    context.store.dispatch('setPageInfo', {
      title: 'マイページ',
      breadcrumbs,
    })
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  mounted() {
    if (!this.user) {
      this.$router.push('/')
    }
  },
  methods: {
    async goToBillingPortal(): Promise<void> {
      if (this.$store.getters['auth/user']) {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
      }

      let url = null
      try {
        url = await this.$axios.$post('/.netlify/functions/create_manage_link')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }

      if (url) {
        location.href = url
      } else {
        alert('定期決済の購入がない為、画面を表示することができませんでした')
      }
    },
    onLogout() {
      this.logout()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
})
</script>
