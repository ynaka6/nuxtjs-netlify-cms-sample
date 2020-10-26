<template>
  <div>
    <div class="max-w-6xl mx-auto px-2">
      <div class="flex flex-col md:flex-row">
        <div class="w-full py-4 md:px-4">
          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="w-full">
              <div class="app-markdown" v-html="$md.render(plan.body)" />
            </div>
          </div>
        </div>
        <div class="w-full md:w-5/12 py-4">
          <div class="bg-gray-100 px-4 py-2 mb-2">
            <nuxt-link
              :to="`/user/${plan.author.slug}`"
              class="flex items-center"
            >
              <img
                :src="plan.author.profilePicture"
                :alt="plan.author.title"
                class="h-10 w-10 block rounded-full"
              />
              <div>
                <p
                  class="ml-2 font-semibold text-xs text-gray-800"
                  v-text="plan.author.title"
                />
                <p
                  class="ml-2 font-semibold text-xs text-gray-800"
                  v-text="`@${plan.author.username}`"
                />
              </div>
            </nuxt-link>
          </div>
          <div class="bg-gray-100 px-4 py-2">
            <div class="flex justify-between items-center">
              <p>金額</p>
              <p class="font-semibold text-2xl text-gray-800">
                <span class="mr-1">¥</span>
                <span v-text="plan.price.toLocaleString()" />
                <span v-show="isMonthly" class="text-sm">/ 月</span>
              </p>
            </div>
            <div class="border-b my-4" />
            <button
              class="w-full bg-orange-500 rounded font-bold text-white p-4 hover:opacity-75 mb-4"
              @click.prevent="showModal"
            >
              購入手続きを行う
            </button>
            <p class="text-gray-800 text-xs">
              ※ 購入処理はStripeを利用してクレジットカード決済となります
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white">
      <div class="max-w-4xl mx-auto px-2 py-10">
        <disqus
          :identifier="`plan_${plan.slug}`"
          :url="`${baseUrl}/plans/${plan.slug}`"
        ></disqus>
      </div>
    </div>
    <portal to="modal">
      <modal
        ref="authModal"
        title="ログインが必要になります。"
        close-text="閉じる"
      >
        <div class="p-4">
          <p class="max-w-lg mx-auto text-center text-gray-600 text-xs">
            購入手続きを進めるにはログインが必要になります。
          </p>
          <div class="w-full mt-6 lg:w-1/2 lg:mx-auto">
            <button
              class="w-full bg-indigo-700 rounded font-bold text-white p-4 hover:opacity-75"
              @click.prevent="goToLogin"
            >
              ログイン
            </button>
          </div>
        </div>
      </modal>
      <modal
        ref="checkoutConfirmModal"
        title="Stripeの購入画面に遷移します"
        close-text="閉じる"
      >
        <div class="p-4">
          <p class="max-w-xl mx-auto text-center text-gray-700 text-xs">
            本サービスでは
            <a href="https://stripe.com/ja-hk/payments/checkout" target="_blank" class="text-blue-500 underline">
              Stripe Checkout
              <sup>
                <font-awesome-icon :icon="[`fas`, `external-link-alt`]" />
              </sup>
            </a>
            を利用して購入手続きを行います。
            決済データや個人情報はStripeにて安全に管理され、運営が確認できるデータも制限されます。
            詳細は、Stripeの
            <a href="https://stripe.com/jp/privacy" target="_blank" class="text-blue-500 underline">
              プライバシーポリシー
              <sup>
                <font-awesome-icon :icon="[`fas`, `external-link-alt`]" />
              </sup>
            </a>
            をご確認ください。
          </p>
          <div class="flex flex-col justify-center items-center my-4">
            <p class="font-semibold text-4xl text-gray-800">
              <span class="mr-1">¥</span>
              <span v-text="plan.price.toLocaleString()" />
              <span v-show="isMonthly" class="text-sm">/ 月</span>
            </p>
            <p v-show="isMonthly" class="text-red-500 text-xs">
              ※ 定期契約（サブスクリプション）のプランになります。毎月自動で課金されるのにご注意ください。
            </p>
          </div>
          <div class="w-full mt-6 lg:w-1/2 lg:mx-auto">
            <button
              class="w-full bg-indigo-700 rounded font-bold text-white p-4 hover:opacity-75"
              @click.prevent="goToCheckout"
            >
              購入手続きを行う
            </button>
          </div>
        </div>
      </modal>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js'
import { Breadcrumb, Plan } from '../../types/entities'
import Modal from '../../components/Modal.vue'

export type DataType = {
  baseUrl: string
  stripePublishableKey: string
  plan: Plan
}

export default Vue.extend({
  components: {
    Modal,
  },
  validate(context: Context): boolean {
    const slug = context.params.slug
    const plans = context.store.getters.planPosts || []
    return plans.find((p: Plan) => p.slug === slug)
  },
  asyncData(context: Context): DataType {
    let data = null
    if (context.payload) {
      data = context.payload as { plan: Plan }
    } else {
      const slug = context.params.slug
      const plans = context.store.getters.planPosts || []
      const plan = plans.find((p: Plan) => p.slug === slug)
      data = { plan }
    }
    context.store.dispatch('setPageInfo', {
      title: data.plan.title,
      description: data.plan.description,
      breadcrumbs: [
        {
          to: '/',
          icon: ['fas', 'laptop-code'],
          color: 'text-gray-100',
        } as Breadcrumb,
        {
          to: `/user/${data.plan.author.slug}`,
          name: data.plan.author.title,
          color: 'text-gray-100',
        } as Breadcrumb,
        { name: data.plan.title, color: 'text-gray-100' } as Breadcrumb,
      ],
    })

    return {
      baseUrl: process.env.baseUrl || '',
      stripePublishableKey: process.env.stripePublishableKey || '',
      ...data,
    }
  },
  data(): DataType {
    return {
      baseUrl: '',
      stripePublishableKey: process.env.baseUrl || '',
      plan: {} as Plan,
    }
  },
  computed: {
    isMonthly(): Boolean {
      return this.plan.interval === 'monthly'
    },
  },
  methods: {
    showModal(): void {
      this.$store.getters['auth/user']
        ? (this.$refs as any).checkoutConfirmModal.show()
        : (this.$refs as any).authModal.show()
    },
    goToLogin(): void {
      (this.$refs as any).authModal.hide()
      this.$store.dispatch('auth/openLogin')
    },
    async goToCheckout(): Promise<void> {
      const stripe = await loadStripe(this.stripePublishableKey)
      if (stripe) {
        const token = await this.$store.dispatch('auth/refresh')
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        const session = await this.$axios.$post(
          '/.netlify/functions/checkout_sessions',
          {
            uuid: this.plan.uuid,
            success_url: `${this.baseUrl}/plans/${this.plan.slug}`,
          }
        )
        stripe.redirectToCheckout({
          sessionId: session.id,
        } as RedirectToCheckoutOptions)
      }
    }
  },
})
</script>
