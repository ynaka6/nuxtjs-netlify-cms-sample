<template>
  <div
    class="z-20 fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      @click.prevent="close"
    />
    <div
      class="absolute cursor-pointer top-0 right-0 mr-4 mt-4 z-50 hover:opacity-75"
      @click.prevent="close"
    >
      <div
        class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-800 text-white"
      >
        <font-awesome-icon :icon="['fas', 'times']" size="lg" />
      </div>
    </div>
    <div
      class="bg-white w-full mx-auto rounded shadow-lg z-40"
      :class="[modalSize]"
    >
      <div
        class="min-h-screen lg:min-h-0 max-h-screen flex flex-col px-2 py-12 text-left lg:px-6 lg:py-8"
      >
        <div
          v-show="title"
          class="flex justify-center items-center border-b-2 pb-3"
        >
          <p class="text-2xl font-bold">{{ title }}</p>
        </div>

        <div class="flex flex-grow overflow-y-auto">
          <div class="w-full">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 right-0 mr-4 mb-4 flex justify-end pt-2 z-50">
      <button
        v-if="actionText"
        class="inline-flex items-center bg-orange-500 rounded font-bold text-white text-md px-8 py-2 mr-2 hover:shadow-xl lg:mr-4 lg:text-xl lg:px-10 lg:py-2"
        @click="action"
      >
        {{ actionText }}
      </button>
      <button
        class="inline-flex items-center bg-black rounded font-bold text-white text-md px-8 py-2 mr-2 hover:shadow-xl lg:text-xl lg:px-10 lg:py-2"
        @click="close"
      >
        {{ closeText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    } as PropOptions<String>,
    size: {
      type: String,
      required: true,
      default: 'md',
    } as PropOptions<String>,
    actionText: {
      type: String,
      required: true,
      default: '',
    } as PropOptions<String>,
    closeText: {
      type: String,
      required: true,
      default: 'Close',
    } as PropOptions<String>,
    handleActionModal: {
      type: Function,
      required: false,
      default: () => {},
    } as PropOptions<Function>,
    handleCloseModal: {
      type: Function,
      required: false,
      default: () => {},
    } as PropOptions<Function>,
  },
  computed: {
    modalSize(): String {
      return this.size === 'md' ? 'lg:max-w-3xl' : 'lg:max-w-3xl'
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden')
  },
  methods: {
    action() {
      this.handleActionModal()
    },
    close() {
      this.handleCloseModal()
      document.body.classList.remove('overflow-hidden')
    },
  },
})
</script>
