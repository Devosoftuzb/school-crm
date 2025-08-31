<template>
  <div class="flex items-center justify-center mt-40">
    <div
      class="w-7/12 shadow-lg overflow-hidden sm:rounded-3xl pb-8"
      :class="{
        'bg-[#1e293b] text-white shadow-white': navbar.userNav,
        'bg-white': !navbar.userNav
      }"
    >
      <div class="border-t border-gray-200 text-center py-16">
        
        <h2 class="text-6xl font-medium py-8 text-blue-700">Uzr so‘raymiz!</h2>
        <p class="text-2xl pb-8 px-12 font-medium">
          Ushbu sahifa hozircha faol emas. Texnik ishlar olib borilmoqda va tez orada qayta ishga tushadi).
        </p>
       
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
