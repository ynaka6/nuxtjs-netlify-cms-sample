<template>
  <header class="header">
    <nav class="nav">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <nuxt-link
          to="/"
          class="text-center p-3 pb-1 lg:pb-3 lg:text-left hover:opacity-75"
        >
          <h1 class="text-2xl font-leckerli-one">
            <span class="text-bland-500">Logo</span>
          </h1>
        </nuxt-link>
        <div class="block text-bland-500">
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply w-full bg-white z-10 shadow-xl;

  & > .nav {
    @apply w-full items-center justify-between flex-wrap;
  }
}
</style>
