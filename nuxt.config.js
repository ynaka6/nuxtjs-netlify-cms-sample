export default {
  env: {
    baseUrl: process.env.BASE_URL || `http://localhost:3000`,
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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/disqus'],
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
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  markdownit: {
    injected: true,
  },


  generate: {
    routes: function() {
      const fs = require('fs');
      const path = require('path');

      const categories = require(`./client/assets/content/category.json`).categories;
      const hashtags = require(`./client/assets/content/hashtag.json`).hashtags;
      const authors = fs.readdirSync('./client/assets/content/author').map(file => {
        const author = require(`./client/assets/content/author/${file}`);
        author.categories = author.categories.map((str) => categories.find((c) => c.value === str))
        return author;
      });
      const plans = fs.readdirSync('./client/assets/content/plan').map(file => {
        const plan = require(`./client/assets/content/plan/${file}`);
        plan.author = authors.find(a => a.username === plan.author)
        plan.hashtags = plan.hashtags.map(str => hashtags.find((h) => h.value === str))
        return plan;
      });

      return [
        ...authors.map(author => {
          return { route: `/users/${author.username}`, payload: { author }};
        }),
        ...plans.map(plan => {
          return { route: `/plans/${plan.sku}`, payload: { plan }};
        })
      ];
    },
  },
}
