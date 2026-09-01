<template>
  <div @click="store.filter_show = false" class="px-2">
    <section class="pt-4 pb-20">
      <div v-show="!store.loaded">
        <Placeholder2 />
      </div>

      <div v-show="store.loaded" class="w-full max-w-screen">
        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <h1 class="w-full text-lg font-bold text-blue-700">
            Xabar jo'natish (reklama post)
          </h1>
        </div>
      </div>

      <div v-show="store.loaded" class="w-full max-w-screen">
        <div
          class="flex flex-col justify-between gap-3 p-4 py-10 mb-4 shadow rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <form
            @submit.prevent="sendBroadcast()"
            :class="{ darkForm: navbar.userNav }"
            class="flex flex-col w-full gap-5"
          >
            <!-- Target tanlash -->
            <div class="flex flex-wrap gap-4">
              <label
                class="flex items-center gap-2 px-4 py-2 transition-all border-2 cursor-pointer rounded-xl"
                :class="
                  form.target === 'parents'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : navbar.userNav
                      ? 'border-slate-600 text-white'
                      : 'border-gray-200 text-gray-600'
                "
              >
                <input
                  type="radio"
                  v-model="form.target"
                  value="parents"
                  class="hidden"
                />
                <span class="text-xl">👨‍👩‍👧</span>
                <span class="text-sm font-medium">Ota-onalar</span>
              </label>

              <label
                class="flex items-center gap-2 px-4 py-2 transition-all border-2 cursor-pointer rounded-xl"
                :class="
                  form.target === 'students'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : navbar.userNav
                      ? 'border-slate-600 text-white'
                      : 'border-gray-200 text-gray-600'
                "
              >
                <input
                  type="radio"
                  v-model="form.target"
                  value="students"
                  class="hidden"
                />
                <span class="text-xl">🎓</span>
                <span class="text-sm font-medium">O'quvchilar</span>
              </label>

              <label
                class="flex items-center gap-2 px-4 py-2 transition-all border-2 cursor-pointer rounded-xl"
                :class="
                  form.target === 'all'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : navbar.userNav
                      ? 'border-slate-600 text-white'
                      : 'border-gray-200 text-gray-600'
                "
              >
                <input
                  type="radio"
                  v-model="form.target"
                  value="all"
                  class="hidden"
                />
                <span class="text-xl">📢</span>
                <span class="text-sm font-medium">Hammaga</span>
              </label>
            </div>

            <!-- Matn -->
            <div class="w-full">
              <label
                class="block mb-1 text-sm font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-gray-700'"
              >
                Xabar matni
              </label>
              <textarea
                v-model="form.text"
                rows="5"
                class="block w-full p-3 text-sm border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                :class="
                  navbar.userNav
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-gray-50 border-gray-300 text-black'
                "
                placeholder="Xabar matnini kiriting..."
              ></textarea>
            </div>

            <!-- Rasm yuklash -->
            <div class="w-full">
              <label
                class="block mb-1 text-sm font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-gray-700'"
              >
                Rasm (ixtiyoriy)
              </label>

              <div v-if="!store.photoPreview">
                <label
                  class="flex flex-col items-center justify-center w-full max-w-xs p-6 border-2 border-dashed cursor-pointer rounded-xl"
                  :class="
                    navbar.userNav
                      ? 'border-slate-600 hover:bg-slate-800'
                      : 'border-gray-300 hover:bg-gray-50'
                  "
                >
                  <span class="text-3xl">📷</span>
                  <span
                    class="mt-1 text-sm"
                    :class="navbar.userNav ? 'text-slate-400' : 'text-gray-500'"
                  >
                    Rasm tanlash uchun bosing
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onPhotoSelected"
                  />
                </label>
              </div>

              <div v-else class="relative w-full max-w-xs">
                <div
                  class="flex items-center justify-center w-full overflow-hidden rounded-xl"
                  :class="navbar.userNav ? 'bg-slate-800' : 'bg-gray-100'"
                  style="aspect-ratio: 16 / 9"
                >
                  <img
                    :src="store.photoPreview"
                    class="block w-full h-full"
                    style="object-fit: contain; border-radius: 0.75rem"
                  />
                </div>
                <button
                  type="button"
                  @click="removePhoto()"
                  class="absolute flex items-center justify-center w-6 h-6 text-white bg-red-600 rounded-full -top-2 -right-2 hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- Tugmalar (ixtiyoriy, bir nechta) -->
            <div class="w-full">
              <div class="flex items-center justify-between mb-3">
                <label
                  class="block text-sm font-medium"
                  :class="navbar.userNav ? 'text-white' : 'text-gray-700'"
                >
                  Tugmalar (ixtiyoriy)
                </label>
                <button
                  type="button"
                  @click="addButton()"
                  class="px-3 py-1 text-xs font-medium rounded-lg"
                  :class="
                    navbar.userNav
                      ? 'text-blue-300 bg-blue-950 hover:bg-blue-900'
                      : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                  "
                >
                  + Tugma qo'shish
                </button>
              </div>

              <div
                v-for="(btn, index) in form.buttons"
                :key="index"
                class="flex gap-2 mb-2"
              >
                <input
                  v-model="btn.label"
                  type="text"
                  placeholder="Tugma matni (masalan: Batafsil)"
                  class="w-1/3 p-2 text-sm border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-gray-50 border-gray-300 text-black'
                  "
                />
                <input
                  v-model="btn.url"
                  type="text"
                  placeholder="https://..."
                  class="flex-1 p-2 text-sm border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-gray-50 border-gray-300 text-black'
                  "
                />
                <button
                  type="button"
                  @click="removeButton(index)"
                  class="px-3 rounded-xl"
                  :class="
                    navbar.userNav
                      ? 'text-red-400 hover:bg-red-950'
                      : 'text-red-600 hover:bg-red-50'
                  "
                >
                  ✕
                </button>
              </div>

              <p
                v-if="!form.buttons.length"
                class="text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-gray-400'"
              >
                Hozircha tugma qo'shilmagan
              </p>
            </div>

            <div class="flex justify-end w-full">
              <button
                type="submit"
                :disabled="store.sending"
                class="btnAdd flex items-center sm:max-w-fit w-full sm:w-auto justify-center whitespace-nowrap bg-gradient-to-r from-blue-700 to-indigo-600 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5 disabled:opacity-50"
              >
                {{ store.sending ? "Yuborilmoqda..." : "Yuborish" }}
              </button>
            </div>
          </form>

          <!-- Namuna -->
          <div
            class="flex flex-col w-full gap-4 mt-6 font-bold lg:w-6/12"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <span
              >Matn, rasm va (ixtiyoriy) tugmalarni kiriting, keyin yuborish
              tugmasini bosing.</span
            >

            <div
              class="p-4 text-sm font-normal rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-gray-50 text-gray-600'
              "
            >
              <p
                class="mb-1 font-semibold"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                🤖 Bot namuna:
              </p>

              <div
                v-if="store.photoPreview"
                class="flex items-center justify-center w-full mb-2 overflow-hidden rounded-lg"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-gray-200'"
                style="aspect-ratio: 16 / 9"
              >
                <img
                  :src="store.photoPreview"
                  class="block w-full h-full"
                  style="object-fit: contain"
                />
              </div>

              <p>{{ form.text || "Xabar matni shu yerda ko'rinadi..." }}</p>

              <div
                v-if="form.buttons.some((b) => b.label)"
                class="flex flex-wrap gap-2 mt-3"
              >
                <span
                  v-for="(btn, index) in form.buttons"
                  :key="index"
                  class="px-3 py-1 text-xs border rounded-lg"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-gray-200 text-black'
                  "
                >
                  {{ btn.label || "Tugma" }}
                </span>
              </div>
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

const store = reactive({
  loaded: false,
  sending: false,
  photoFile: null,
  photoPreview: "",
});

const form = reactive({
  target: "all",
  text: "",
  buttons: [],
});

function addButton() {
  form.buttons.push({ label: "", url: "" });
}

function removeButton(index) {
  form.buttons.splice(index, 1);
}

function onPhotoSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  store.photoFile = file;
  store.photoPreview = URL.createObjectURL(file);
}

function removePhoto() {
  store.photoFile = null;
  store.photoPreview = "";
}

const sendBroadcast = () => {
  if (!form.text.trim()) {
    notification.warning("Xabar matnini kiriting!");
    return;
  }

  const buttons = form.buttons.filter((b) => b.label && b.url);

  const formData = new FormData();
  formData.append("target", form.target);
  formData.append("text", form.text);

  if (store.photoFile) {
    formData.append("photo", store.photoFile);
  }

  if (buttons.length) {
    formData.append("buttons", JSON.stringify(buttons));
  }

  store.sending = true;

  axios
    .post("/v1/bot/notify/broadcast", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { sent, failed } = res.data;
      notification.success(`Yuborildi: ${sent} ta, xato: ${failed} ta`);
      form.text = "";
      form.buttons = [];
      removePhoto();
    })
    .catch(() => {
      notification.warning("Xatolik! Qaytadan urinib ko'ring!");
    })
    .finally(() => {
      store.sending = false;
    });
};

onMounted(() => {
  store.loaded = true;
});
</script>
