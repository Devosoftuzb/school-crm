<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-700 -translate-x-full bg-gray-200 border-r xl:translate-x-0"
    :class="sidebar.sidebar ? '-translate-x-full' : 'translate-x-0'"
    @mousedown="sidebar.sidebar = true"
  >
    <div
      class="h-full px-3 py-4 pb-4 overflow-y-auto flex flex-col justify-between gap-10"
      :class="{ 'bg-[#1e293b]': navbar.userNav, 'bg-white': !navbar.userNav }"
    >
      <ul class="space-y-2 font-medium mt-[70px]">
        <li v-for="i in header" v-show="checkRole(i.role)" :key="i.id">
          <router-link
            class="flex items-center text-lg p-2 cursor-pointer duration-500 hover:bg-gray-400 rounded-lg gap-2"
            :class="{ 'text-white': navbar.userNav }"
            :to="i.link"
          >
            <i :class="i.icon"></i><span>{{ i.title }}</span>
          </router-link>
        </li>
      </ul>
      <button @click="Logout" title="Chiqish"
        class="bottom-5 w-full sm:mb-0 mb-20 flex items-center justify-between border-b border-blue-700 p-2 rounded-lg text-blue-700"
      >
        <div class="flex items-center gap-3">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            alt=""
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 cursor-pointer border-2 border-blue-700"
          />
          <span class="text-md font-bold">{{ store.name }}</span>
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

const sidebar = useSidebarStore();
const navbar = useNavStore();

const store = reactive({
  guard: localStorage.getItem("role"),
  name: localStorage.getItem("role") == "owner" ? "owner" : "administrator"
});

const Logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("school_id");
  location.reload()
  router.push("/login");
};

const checkRole = (roles) => {
  const roleArray = roles.split(", ");
  return roleArray.includes(store.guard);
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: transparent;
}

.router-link-exact-active {
  background: #4141eb;
  color: white;
}
</style>
