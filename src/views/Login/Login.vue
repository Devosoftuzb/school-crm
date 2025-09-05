<template>
  <div
    class="bg-[#1e293b] flex justify-center items-center min-h-screen bg-cover bg-center px-5"
  >
    <div class="w-[400px] md:w-[500px] p-10 bg-white rounded-xl bg-opacity-60">
      <img
        class="w-24 sm:w-[120px] mx-auto"
        src="../../assets/img/devo.png"
        alt="Logo"
      />
      <h1 class="text-2xl sm:text-[28px] font-bold text-center py-5">
        Tizimga kirish
      </h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="login" class="block mb-2 font-semibold">Login</label>
          <input
            type="text"
            id="login"
            v-model="form.login"
            class="w-full p-2 sm:p-[10px] border rounded-[9px]"
            placeholder="login"
            required
          />
        </div>
        <div class="mb-4 relative">
          <label for="password" class="block mt-3 sm:mt-9 mb-2 font-semibold"
            >Parol</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            class="w-full p-2 sm:p-[10px] border rounded-[9px]"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute top-[42px] right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Yangi parolni ko‘rsatish"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.958 9.958 0 012.223-3.607m1.923-1.92A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.683 5.12M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3l18 18"
              />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          class="w-full bg-[#4141eb] text-white hover:bg-white hover:text-[#4141eb] hover:border-[#4141eb] py-2 sm:py-[10px] rounded-md"
        >
          Kirish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "@/services/axios";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/stores/notification";

const notification = useNotificationStore();
const router = useRouter();

const school = ref([]);
const showPassword = ref(false);

const form = reactive({
  password: "",
  login: "",
});

const handleSubmit = async () => {
  const data = {
    login: form.login,
    password: form.password,
  };

  try {
    const loginResponse = await axios.post("/auth/login", data);
    const { tokens, user } = loginResponse.data;

    form.login = "";
    form.password = "";

    const roleMapping = {
      superadmin: "_sp_am_",
      admin: "_ad_am_",
      administrator: "_ad_sch_",
      owner: "_ow_sch_",
      teacher: "_tch_sch_",
    };

    const roleValue = roleMapping[user.role];
    if (roleValue) {
      localStorage.setItem("role", roleValue);
    }
    localStorage.setItem("token", tokens.access_token);
    localStorage.setItem("id", user.id);

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role === "_ow_sch_") {
      const userId = localStorage.getItem("id");
      const userResponse = await axios.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userResponse.data);

      localStorage.setItem("school_id", userResponse.data.school[0].id);
      localStorage.setItem(
        "school_name",
        userResponse.data.school[0].name
          .trim()
          .replace(/\s+/g, "_")
          .toLowerCase()
      );
    } else if (role === "_ad_sch_" || role === "_tch_sch_") {
      localStorage.setItem("school_id", user.school_id);
      const schoolName = await axios.get(
        `/school/${localStorage.getItem("school_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.setItem(
        "school_name",
        schoolName.data.name.trim().replace(/\s+/g, "_").toLowerCase()
      );
    }

    
    router.push("/");
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};
</script>

<style lang="scss" scoped></style>
