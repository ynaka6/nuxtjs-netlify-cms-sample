<template>
  <div class="max-w-xl mx-auto px-2">
    <div class="flex flex-col md:flex-row">
      <div class="w-full py-4 md:px-4">
        <client-only placeholder="Loading...">
          <nav class="bg-white border">
            <a
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="goToBillingPortal"
            >
              <span class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `money-check` ]" />
              </span>
              定期決済を確認する
              <sup class="text-xs">
                <font-awesome-icon :icon="[ `fas`, `external-link-alt` ]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="/admin/"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              target="_blank"
            >
              <span class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `laptop-code` ]" />
              </span>
              CMSを開く
              <sup class="text-xs">
                <font-awesome-icon :icon="[ `fas`, `external-link-alt` ]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="goToStripeConnect"
            >
              <span class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `key` ]" />
              </span>
              本人確認（Stripe連携）
              <sup class="text-xs">
                <font-awesome-icon :icon="[ `fas`, `external-link-alt` ]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="openBackForm"
            >
              <span class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `university` ]" />
              </span>
              銀行登録
            </a>
            <nuxt-link
              to="/contact"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
            >
              <span class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `envelope` ]" />
              </span>
              問い合わせ
            </nuxt-link>
            <a
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="onLogout"
            >
              <span class="inline-flex items-center justify-center bg-red-100 text-red-500 border border-red-500 rounded-full w-12 h-12 mr-2">
                <font-awesome-icon :icon="[ `fas`, `sign-out-alt` ]" />
              </span>
              ログアウト
            </a>
          </nav>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
    user() {
      return this.$store.getters['auth/user'];
    },
    isMentor() {
      const user = this.$store.getters['auth/user'];
      return user && user.app_metadata.roles.includes('Mentor')
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push('/')
    }
  },
  methods: {
    async goToBillingPortal(): Promise<void> {
      if (this.user) {
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
    async goToStripeConnect(): Promise<void> {
      if (!this.isMentor) {
        return
      }
      let url = null
      try {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        url = await this.$axios.$post('/.netlify/functions/connect_sessions')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }

      if (url) {
        location.href = url
      } else {
        alert('本人確認ページに遷移することができません')
      }
    },
    openBackForm(): void {
      alert('銀行設定')
    },
    onLogout(): void {
      this.$store.dispatch('auth/logout')
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
  },
})
</script>
