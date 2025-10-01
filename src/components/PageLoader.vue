<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[9999]"
  >
    <div class="spinner w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    <span v-if="text" class="ml-3 text-white font-semibold">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  text: { type: String, default: '' },
})
</script>

<style scoped>
.spinner {
  border-radius: 50%;
}
</style>
