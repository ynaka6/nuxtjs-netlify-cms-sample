<template>
  <footer class="bg-black">
    <div class="max-w-6xl mx-auto flex justify-between text-white px-2 py-3">
      <div>
        <div class="flex justify-center text-xs">
          <p class="text-2xl font-leckerli-one">
            <span class="text-bland-500">Logo</span>
          </p>
        </div>
        <div class="mt-1 flex justify-center text-xs">
        </div>
      </div>
      <div>
        <p class="font-bold text-gray-400 mb-2">Support</p>
        <ul>
          <li>
            Q＆A
          </li>
          <li>
            <nuxt-link
              to="/contact"
              class="hover:opacity-75"
            >
              問い合わせ
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
