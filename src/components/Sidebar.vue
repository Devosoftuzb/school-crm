<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-500 -translate-x-full bg-gray-200 border-r xl:translate-x-0"
    :class="sidebar.sidebar ? '-translate-x-full' : 'translate-x-0'"
  >
    <div
      class="flex flex-col justify-between h-full gap-10 px-3 py-4 pb-4 overflow-y-auto"
      :class="{ 'bg-[#1e293b]': navbar.userNav, 'bg-white': !navbar.userNav }"
    >
      <!-- Menu -->
      <ul class="space-y-2 font-medium mt-[70px]">
        <li v-for="item in header" :key="item.id" v-show="showMenu(item)">
          <router-link
            :to="item.link"
            class="flex items-center gap-2 p-2 text-lg duration-300 rounded-lg cursor-pointer hover:bg-gray-400"
            :class="[
              { 'text-white': navbar.userNav },
              { 'bg-blue-600 text-white': isActive(item.link) },
            ]"
          >
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>

      <!-- Logout / User info -->
      <button
        @click="Logout"
        title="Chiqish"
        class="flex items-center justify-between w-full p-2 mb-20 text-blue-700 border-b border-blue-700 rounded-lg sm:mb-0"
      >
        <div class="flex items-center gap-3">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            alt=""
            class="w-8 h-8 bg-gray-800 border-2 border-blue-700 rounded-full cursor-pointer sm:w-10 sm:h-10"
          />
          <span class="font-bold text-md">{{ store.name }}</span>
        </div>
        <i class="bx bx-log-in text-[30px] mr-1 font-medium"></i>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { header } from "../constants/sidebar";
import { useNavStore } from "../stores/toggle";
import { useSidebarStore } from "../stores/sidebar.js";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const sidebar = useSidebarStore();
const navbar = useNavStore();
const router = useRouter();
const route = useRoute();

// User info
const role = localStorage.getItem("role");
const school_name = localStorage.getItem("school_name");
const store = reactive({
  school: school_name,
  guard: role,
  name:
    role === "_ow_sch_"
      ? "Owner"
      : role === "_ad_sch_"
      ? "Administrator"
      : role === "_sp_am_"
      ? "Superadmin"
      : role === "_tch_sch_"
      ? "Teacher"
      : "Admin",
});

// Logout
const Logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("school_id");
  router.push("/login");
};

// Show menu based on role
const showMenu = (item) => {
  const roleArray = item.role.split(",").map((r) => r.trim());
  return roleArray.includes(store.guard);
};

// Check active route
const isActive = (link) => {
  if (link === "/") return route.path === "/";
  return route.path === link || route.path.startsWith(link + "/");
};
</script>

<style scoped>
.bg-blue-600 {
  background: #4141eb;
}
</style>
