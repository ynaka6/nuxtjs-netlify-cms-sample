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
              <span
                class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `money-check`]" />
              </span>
              定期決済を確認する
              <sup class="text-xs">
                <font-awesome-icon :icon="[`fas`, `external-link-alt`]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="/admin/"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              target="_blank"
            >
              <span
                class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `laptop-code`]" />
              </span>
              CMSを開く
              <sup class="text-xs">
                <font-awesome-icon :icon="[`fas`, `external-link-alt`]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="goToStripeConnect"
            >
              <span
                class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `key`]" />
              </span>
              本人確認（Stripe連携）
              <sup class="text-xs">
                <font-awesome-icon :icon="[`fas`, `external-link-alt`]" />
              </sup>
            </a>
            <a
              v-if="isMentor"
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="openBackForm"
            >
              <span
                class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `university`]" />
              </span>
              銀行登録
            </a>
            <nuxt-link
              to="/contact"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
            >
              <span
                class="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `envelope`]" />
              </span>
              問い合わせ
            </nuxt-link>
            <a
              href="#"
              class="block w-full border-b text-xl font-semibold text-gray-800 p-4 hover:opacity-75"
              @click.prevent="onLogout"
            >
              <span
                class="inline-flex items-center justify-center bg-red-100 text-red-500 border border-red-500 rounded-full w-12 h-12 mr-2"
              >
                <font-awesome-icon :icon="[`fas`, `sign-out-alt`]" />
              </span>
              ログアウト
            </a>
          </nav>
        </client-only>
      </div>
    </div>
    <portal to="modal">
      <modal
        v-if="modal === `retrieveBank`"
        title="銀行情報"
        close-text="閉じる"
        :handle-close-modal="closeBankModal"
      >
        <div class="py-4 text-center max-w-lg mx-auto">
          <div class="font-bold bg-gray-300 border p-2">銀行名</div>
          <div class="border border-t-none p-2">
            {{ bank.bank_name }}
          </div>
          <div class="font-bold bg-gray-300 border border-t-none p-2">
            口座番号下４桁
          </div>
          <div class="border border-t-none p-2">
            {{ bank.last4 }}
          </div>
        </div>
      </modal>
      <modal
        v-if="modal === `createBank`"
        title="銀行情報を登録"
        action-text="登録する"
        close-text="キャンセル"
        :handle-action-modal="submitBankModal"
        :handle-close-modal="closeBankModal"
      >
        <ValidationObserver ref="observer">
          <form action="" method="post" class="pt-6 pb-8">
            <div class="flex flex-wrap mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-2">
                <label
                  class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                  for="name"
                >
                  銀行コード
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="銀行コード"
                  rules="required"
                >
                  <input
                    v-model="form.bankCode"
                    type="text"
                    placeholder="銀行コード"
                    class="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    :class="{ 'border-red': false }"
                  />
                  <p
                    v-if="errors.length > 0"
                    class="text-red-500 text-xs italic"
                    v-text="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-2">
                <label
                  class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                  for="email"
                >
                  支店コード
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="支店コード"
                  rules="required"
                >
                  <input
                    v-model="form.branchCode"
                    type="text"
                    placeholder="支店コード"
                    class="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :class="{ 'border-red': false }"
                  />
                  <p
                    v-if="errors.length > 0"
                    class="text-red-500 text-xs italic"
                    v-text="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-2">
                <label
                  class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                  for="email"
                >
                  口座番号
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="口座番号"
                  rules="required"
                >
                  <input
                    v-model="form.accountNumber"
                    type="text"
                    placeholder="口座番号"
                    class="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :class="{ 'border-red': false }"
                  />
                  <p
                    v-if="errors.length > 0"
                    class="text-red-500 text-xs italic"
                    v-text="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-2">
                <label
                  class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                  for="email"
                >
                  口座名義
                </label>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="口座名義"
                  rules="required"
                >
                  <input
                    v-model="form.accountHolderName"
                    type="text"
                    placeholder="口座名義"
                    class="block w-full bg-gray-200 text-gray-600 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :class="{ 'border-red': false }"
                  />
                  <p
                    v-if="errors.length > 0"
                    class="text-red-500 text-xs italic"
                    v-text="errors[0]"
                  />
                </ValidationProvider>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </modal>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Breadcrumb } from '../types/entities'
import Modal from '../components/Modal.vue'

export default Vue.extend({
  components: {
    Modal,
  },
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
  data() {
    return {
      modal: '',
      bank: null,
      form: {
        accountHolderName: null,
        accountNumber: null,
        bankCode: null,
        branchCode: null,
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    isMentor() {
      const user = this.$store.getters['auth/user']
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

      this.$nuxt.$loading.start()
      let url = null
      try {
        url = await this.$axios.$post('/.netlify/functions/create_manage_link')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }

      this.$nuxt.$loading.finish()
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
      this.$nuxt.$loading.start()
      try {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        url = await this.$axios.$post('/.netlify/functions/connect_sessions')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }

      this.$nuxt.$loading.finish()
      if (url) {
        location.href = url
      } else {
        alert('本人確認ページに遷移することができません')
      }
    },
    async openBackForm(): Promise<void> {
      if (!this.isMentor) {
        return
      }
      this.$nuxt.$loading.start()
      try {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        this.bank = await this.$axios.$post('/.netlify/functions/retrieve_bank')
        this.modal = this.bank ? 'retrieveBank' : 'createBank'
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async submitBankModal(): Promise<void> {
      if (!this.isMentor) {
        return
      }
      this.$nuxt.$loading.start()
      try {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        await this.$axios.$post('/.netlify/functions/create_bank', {
          account_holder_name: this.form.accountHolderName,
          account_number: this.form.accountNumber,
          routing_number: `${this.form.bankCode}${this.form.branchCode}`,
        })
        this.modal = ''
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    closeBankModal(): void {
      this.modal = ''
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
