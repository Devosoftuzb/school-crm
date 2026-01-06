<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-700 -translate-x-full xl:translate-x-0"
    :class="sidebar.sidebar ? '-translate-x-full' : 'translate-x-0'"
  >
    <div
      class="flex flex-col h-full px-3 py-4 pb-4 overflow-y-auto border-r"
      :class="{
        'bg-slate-900 border-slate-700': navbar.userNav,
        'bg-white border-slate-200': !navbar.userNav,
      }"
    >
      <!-- Menu -->
      <ul class="space-y-2 font-medium mt-[70px]">
        <li v-for="i in header" :key="item.id" v-show="showMenu(item)">
          <router-link
            :to="i.link"
            class="flex items-center gap-2 p-2 text-lg duration-500 cursor-pointer rounded-xl"
            :class="[
              isActive(i.link)
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white'
                : navbar.userNav
                ? 'text-white hover:bg-slate-700'
                : 'text-slate-900 hover:bg-gray-300',
            ]"
          >
            <i :class="i.icon"></i>
            <span>{{ i.title }}</span>
          </router-link>
        </li>
      </ul>
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
