<template>
  <div>
    <header>
      <Navbar />
    </header>
    <Sidebar @mousedown="navbar.userInfo = false" />
    <main
      @mousedown="
        sidebar.sidebar = true;
        navbar.userInfo = false;
      "
      :class="[
        'pt-[70px] px-2 xl:ml-64 sm:pb-4 pb-28 min-h-screen transition-colors duration-300',
        navbar.userNav
          ? 'bg-slate-950'
          : 'bg-gray-200',
      ]"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { Sidebar, Navbar } from "../components";
import { useNavStore } from "../stores/toggle";
import { useSidebarStore } from "../stores/sidebar.js";

const sidebar = useSidebarStore();
const navbar = useNavStore();
</script>

<style lang="scss">
body {
  font-family: "Poppins", sans-serif !important;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #e5e7eb;
  box-shadow: inset 0 0 5px e5e7eb;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, white -450%, #4141eb);
  border-radius: 15px;
}
</style>
