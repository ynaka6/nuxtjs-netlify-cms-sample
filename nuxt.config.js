const modules = []
const options = {}
if (process.env.NODE_ENV !== 'production') {
  modules.push(
    ...[
      '@nuxtjs/proxy'
    ]
  )
  options['proxy'] = {
    '/.netlify/functions': {
      target: 'http://localhost:9000'
    }
  }
}

export default {
  env: {
    baseUrl: process.env.BASE_URL || `/`,
    disqusShortname: process.env.DISQUS_SHORTNAME || ``,
    stripeClientId: process.env.STRIPE_CLIENT_ID || ``,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ``,
  },

  srcDir: 'client/',

  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s | Growrescue',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Growrescue'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/fontawesome',
    '~/plugins/disqus',
    { src: '~/plugins/netlify-identity-widget.ts', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    ...modules
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || `/`,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  markdownit: {
    injected: true,
  },

  generate: {
    routes: function () {
      const fs = require('fs')

      const categories = require(`./client/assets/content/category.json`).categories
      const hashtags = require(`./client/assets/content/hashtag.json`).hashtags
      const authors = fs.readdirSync('./client/assets/content/author')
        .map((file) => {
          const author = require(`./client/assets/content/author/${file}`)
          author.slug = author.username
          author.categories = author.categoryIds.map((str) =>
            categories.find((c) => c.value === str)
          )
          return author
        })
      const plans = fs.readdirSync('./client/assets/content/plan')
        .map((file) => {
          const plan = require(`./client/assets/content/plan/${file}`)
          plan.slug = `${plan.authorId}-${plan.uuid}`
          plan.author = authors.find((a) => a.username === plan.authorId)
          plan.hashtags = plan.hashtagIds.map((str) =>
            hashtags.find((h) => h.value === str)
          )
          return plan
        })

      return [
        ...authors.map((author) => {
          return { route: `/users/${author.slug}`, payload: { author, plans: plans.filter((plan) => plan.author.username === author.username) } }
        }),
        ...plans.map((plan) => {
          return { route: `/plans/${plan.slug}`, payload: { plan } }
        }),
      ]
    },
  },
  ...options
}
