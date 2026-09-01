<template>
  <div @click="store.filter_show = false" class="px-2">
    <section class="pt-4 pb-20">
      <div v-show="!store.allProducts">
        <Placeholder2 />
      </div>

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <h1 class="w-full text-lg font-bold text-blue-700">
            Xabar jo'natish
          </h1>
        </div>
      </div>

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <div
          class="flex flex-col justify-between gap-3 p-4 py-10 mb-4 shadow rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div class="flex w-full gap-5 pb-2 2xl:w-5/12 sm:w-4/6 lg:pb-0">
            <form
              @submit.prevent="sendMessage()"
              :class="{ darkForm: navbar.userNav }"
              class="flex flex-col items-center justify-end w-full gap-5 sm:flex-row"
            >
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  v-model="store.filter"
                  @focus="store.selectLamp = true"
                  @blur="store.selectLamp = false; store.filter_show = false;"
                  @input="store.filter_show = true; searchFunc();"
                  type="search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul v-show="store.filter_show && store.searchList.length > 0" class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80">
                  <li class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white" v-for="(i, index) in store.searchList" :key="index" @mousedown.prevent="form.group_id = i.id; store.filter_show = false; store.filter = i.name;">
                    {{ i.name }}
                  </li>
                </ul>
                <ul v-show="store.selectLamp && !store.filter" class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80">
                  <li class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap" v-for="(i, index) in store.allProducts" :key="index" @mousedown.prevent="form.group_id = i.id; store.selectLamp = false; store.filter = i.name;">
                    {{ i.name }}
                  </li>
                </ul>
              </div>

              <div class="flex flex-row items-center justify-between w-full sm:max-w-fit md:space-y-0 md:justify-end md:space-x-3">
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap bg-gradient-to-r from-blue-700 to-indigo-600 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
                >
                  Yuborish
                </button>
              </div>
            </form>
          </div>

          <div class="flex gap-4 mt-2">
            <label
              class="flex items-center gap-2 px-4 py-2 transition-all border-2 cursor-pointer rounded-xl"
              :class="form.type === 'sms'
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : navbar.userNav ? 'border-slate-600 text-white' : 'border-gray-200 text-gray-600'"
            >
              <input type="radio" v-model="form.type" value="sms" class="hidden" />
              <span class="text-xl">📱</span>
              <span class="text-sm font-medium">SMS</span>
            </label>

            <label
              class="flex items-center gap-2 px-4 py-2 transition-all border-2 cursor-pointer rounded-xl"
              :class="form.type === 'bot'
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : navbar.userNav ? 'border-slate-600 text-white' : 'border-gray-200 text-gray-600'"
            >
              <input type="radio" v-model="form.type" value="bot" class="hidden" />
              <span class="text-xl">🤖</span>
              <span class="text-sm font-medium">Telegram bot</span>
            </label>
          </div>

          <div
            class="flex flex-col w-full gap-4 mt-6 font-bold lg:w-6/12"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <span>
              Guruhni tanlang, yuborish turini belgilang va yuborish tugmasini bosing.
            </span>

            <div
              class="p-4 text-sm font-normal rounded-xl"
              :class="navbar.userNav ? 'bg-slate-800 text-slate-300' : 'bg-gray-50 text-gray-600'"
            >
              <p class="mb-1 font-semibold" :class="navbar.userNav ? 'text-white' : 'text-black'">
                {{ form.type === 'sms' ? '📱 SMS namuna:' : '🤖 Bot namuna:' }}
              </p>
              <p v-if="form.type === 'sms'">
                Hurmatli ota-ona, Davlat Jo'rayev uchun joriy oy to'lovi kutilmoqda.
                Iltimos, o'z vaqtida amalga oshiring. {{ store.schoolName }}
              </p>
              <p v-else>
                ⚠️ <b>To'lov eslatmasi</b><br/>
                Hurmatli ota-ona, Davlat Jo'rayev uchun joriy oy to'lovi kutilmoqda.
                Iltimos, o'z vaqtida amalga oshiring.<br/>
                🏫 <b>{{ store.schoolName }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();

const formatSchoolName = (name) => {
  if (!name) return "";
  return name.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const store = reactive({
  allProducts: false,
  error: false,
  filter: "",
  filter_show: false,
  selectLamp: false,
  searchList: [],
  schoolName: formatSchoolName(localStorage.getItem("school_name")),
});

const form = reactive({
  group_id: "",
  type: "sms", 
});

function searchFunc() {
  store.searchList = [];
  if (store.filter) {
    for (let i of store.allProducts) {
      if (i.name.toLowerCase().includes(store.filter.toLowerCase())) {
        store.searchList.push(i);
      }
    }
  }
}

const getGroups = () => {
  axios
    .get(`/v1/group/add/${localStorage.getItem("school_id")}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      store.allProducts = res.data.sort((a, b) => b.id - a.id);
    })
    .catch((error) => {
      store.allProducts = error.response.data.message;
      store.error = true;
    });
};

const sendMessage = () => {
  if (!form.group_id) {
    notification.warning("Guruhni tanlang!");
    return;
  }

  const endpoint = form.type === "sms" ? "/v1/sms/payment" : "/v1/bot/notify/payment-reminder";

  axios
    .post(endpoint, { group_id: form.group_id }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => {
      notification.success(
        form.type === "sms" ? "SMS yuborildi!" : "Telegram bot xabari yuborildi!"
      );
      form.group_id = "";
      store.filter = "";
    })
    .catch(() => {
      notification.warning("Xatolik! Qaytadan urinib ko'ring!");
    });
};

onMounted(() => {
  getGroups();
});
</script>