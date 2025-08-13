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
        <div class="mb-4">
          <label for="password" class="block mt-3 sm:mt-9 mb-2 font-semibold"
            >Parol</label
          >
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full p-2 sm:p-[10px] border rounded-[9px]"
            placeholder="••••••••"
            required
          />
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
      localStorage.setItem("school_name", userResponse.data.school[0].name);
    } else if (role === "_ad_sch_" || role === "_tch_sch_") {
      localStorage.setItem("school_id", user.school_id);
      const schoolName = await axios.get(`/school/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.setItem("school_name", schoolName.data.name);
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
