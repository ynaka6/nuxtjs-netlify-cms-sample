<template>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from "vuex"

export default Vue.extend({
  layout: "admin",
  head() {
    return {
      script: [
        {
          src: "https://identity.netlify.com/v1/netlify-identity-widget.js"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted() {
    if (!this.user || !this.user.app_metadata.roles.includes('Mentor')) {
      this.$router.push('/')
      return
    }
 
    const CMS = require('netlify-cms-app')
    const { ja } = require('netlify-cms-locales')
    const { UuidControl, UuidPreview } = require('netlify-cms-widget-uuid')
    CMS.registerLocale('ja', ja)
    CMS.registerWidget('uuid', UuidControl, UuidPreview)
    CMS.init()
  }
})
</script>
