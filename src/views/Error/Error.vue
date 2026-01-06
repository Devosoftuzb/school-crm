<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-200">
    <div
      class="w-7/12 pb-8 overflow-hidden shadow-lg sm:rounded-3xl"
      :class="{
        'bg-slate-900 text-white shadow-white': navbar.userNav,
        'bg-white': !navbar.userNav
      }"
    >
      <div class="py-16 text-center border-t border-gray-200">
        <h1 class="font-bold text-purple-400 text-9xl">404</h1>
        <h2 class="py-8 text-6xl font-medium">Sahifa topilmadi!</h2>
        <p class="px-12 pb-8 text-2xl font-medium">
          Siz qidirayotgan sahifa mavjud emas.
        </p>
        <router-link to="/">
          <button class="px-6 py-3 font-semibold text-white rounded-md bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-400 hover:to-blue-400">
            HOME
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from '../../stores/toggle';
const navbar = useNavStore();
</script>

<style scoped>
/* Min-height for full screen */
.min-h-screen {
  min-height: 100vh;
}
</style>
