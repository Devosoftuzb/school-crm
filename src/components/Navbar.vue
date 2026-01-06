<template>
  <nav
    class="fixed top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-md"
    :class="{
      'bg-slate-900/95 text-white border-slate-700': navbar.userNav,
      'bg-white/95 text-slate-900 border-slate-200': !navbar.userNav,
    }"
  >
    <!-- Technical Work Banner (uncomment if needed) -->
    <!-- <div class="py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600">
      <i class="mr-2 bx bx-info-circle"></i>
      Saytda texnik ishlar olib borilmoqda
    </div> -->

    <div class="flex items-center justify-between px-4 py-3 lg:px-8">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleSidebar" 
          class="p-2 transition-all duration-200 rounded-lg xl:hidden hover:bg-opacity-10"
          :class="{
            'hover:bg-white': navbar.userNav,
            'hover:bg-slate-900': !navbar.userNav,
          }"
        >
          <i class="text-2xl bx bx-menu"></i>
        </button>

        <!-- Logo & Brand -->
        <router-link 
          to="/" 
          class="flex items-center gap-3 group"
        >
          <div class="relative">
            <img
              :src="store.image ? store.link + store.image : '../favicon.ico'"
              class="object-cover transition-transform duration-300 shadow-lg w-11 h-11 rounded-xl group-hover:scale-105"
              alt="Logo"
            />
            <div 
              class="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 group-hover:opacity-100"
            ></div>
          </div>
          <span
            class="hidden text-xl font-bold tracking-tight text-transparent uppercase sm:block lg:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text"
            :class="{
              'from-blue-400 to-indigo-400': navbar.userNav,
              'from-blue-600 to-indigo-600': !navbar.userNav,
            }"
          >
            {{ store.data || "Devosoft" }}
          </span>
        </router-link>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Dark/Light Mode Toggle -->
        <div
          class="relative flex items-center cursor-pointer group"
          @click="navbar.setMode()"
        >
          <div
            class="flex items-center justify-between w-16 p-1 transition-all duration-300 border-2 rounded-full h-9"
            :class="{
              'border-slate-600 bg-slate-800': navbar.userNav,
              'border-slate-300 bg-slate-100': !navbar.userNav,
            }"
          >
            <span class="flex items-center justify-center w-6 h-6">
              <i
                class="text-xl text-yellow-400 transition-all duration-300 bx bxs-moon"
                :class="{ 'opacity-100 scale-100': navbar.userNav, 'opacity-50 scale-75': !navbar.userNav }"
              ></i>
            </span>
            <span class="flex items-center justify-center w-6 h-6">
              <i
                class="text-xl text-yellow-500 transition-all duration-300 bx bxs-sun"
                :class="{ 'opacity-100 scale-100': !navbar.userNav, 'opacity-50 scale-75': navbar.userNav }"
              ></i>
            </span>
          </div>
          <div
            class="absolute transition-all duration-500 ease-in-out rounded-full shadow-lg w-7 h-7"
            :class="{
              'left-1 bg-slate-700': navbar.userNav,
              'left-8 bg-white': !navbar.userNav,
            }"
          ></div>
        </div>

        <!-- User Profile (uncomment if needed) -->
        <div class="relative">
          <img
            @click="toggleUserInfo"
            class="w-10 h-10 transition-all duration-300 border-2 rounded-full cursor-pointer hover:scale-105 hover:border-4"
            :class="{
              'border-slate-600 hover:border-blue-500': navbar.userNav,
              'border-slate-300 hover:border-blue-600': !navbar.userNav,
            }"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            alt="user"
          />
          
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="scale-95 -translate-y-2 opacity-0"
            enter-to-class="scale-100 translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="scale-100 translate-y-0 opacity-100"
            leave-to-class="scale-95 -translate-y-2 opacity-0"
          >
            <div
              v-show="navbar.userInfo"
              @click="navbar.userInfo = false"
              class="absolute right-0 z-50 w-56 overflow-hidden border shadow-2xl top-14 rounded-xl backdrop-blur-lg"
              :class="{
                'bg-slate-800/95 border-slate-700': navbar.userNav,
                'bg-white/95 border-slate-200': !navbar.userNav,
              }"
            >
              <div class="px-4 py-4 border-b"
                :class="{
                  'border-slate-700': navbar.userNav,
                  'border-slate-200': !navbar.userNav,
                }"
              >
                <p class="text-lg font-bold capitalize">{{ store.name }}</p>
                <p class="mt-1 text-sm opacity-70">Admin Panel</p>
              </div>
              <ul class="py-2">
                <li
                  @click="Logout"
                  class="flex items-center gap-3 px-4 py-3 transition-all duration-200 cursor-pointer"
                  :class="{
                    'hover:bg-slate-700': navbar.userNav,
                    'hover:bg-slate-100': !navbar.userNav,
                  }"
                >
                  <i class="text-xl bx bx-log-out"></i>
                  <span class="font-medium">Chiqish</span>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useNavStore } from "../stores/toggle.js";
import { useSidebarStore } from "../stores/sidebar.js";
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "@/services/axios";

const router = useRouter();
const sidebar = useSidebarStore();
const navbar = useNavStore();
const role = localStorage.getItem("role");

const store = reactive({
  guard: role,
  data: "",
  image: "",
  link: import.meta.env.VITE_API + "/",
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

const Logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("school_id");
  router.push("/login");
};

const toggleSidebar = () => {
  sidebar.sidebar = !sidebar.sidebar;
};

const toggleUserInfo = () => {
  navbar.userInfo = !navbar.userInfo;
};

const getOneProduct = () => {
  if (
    localStorage.getItem("role") == "_ad_sch_" ||
    localStorage.getItem("role") == "_ow_sch_" ||
    localStorage.getItem("role") == "_tch_sch_"
  ) {
    axios
      .get(`/school/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.data = res.data.name;
        store.image = res.data.image;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
};

onMounted(() => {
  getOneProduct();
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>