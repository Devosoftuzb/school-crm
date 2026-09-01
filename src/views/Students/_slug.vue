<template>
  <section
    class="min-h-screen px-4 py-6"
    :class="navbar.userNav ? 'bg-slate-950' : 'bg-gray-100'"
  >
    <div v-show="!store.loading" class="mt-10">
      <Placeholder2 />
    </div>

    <div v-show="store.loading" class="mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p
            class="mb-1 text-xs font-medium tracking-widest uppercase"
            :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
          >
            O'quvchi profili
          </p>
          <h1
            class="text-xl font-bold"
            :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
          >
            {{ store.data.full_name }}
          </h1>
        </div>
        <button
          @click="router.back(-1)"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Orqaga
        </button>
      </div>

      <div class="flex justify-end w-full gap-1 mb-6">
        <div
          class="grid w-full grid-cols-3 gap-1 p-1 md:w-auto rounded-xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900'
              : 'bg-white shadow-sm border border-slate-200'
          "
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="setActiveModal(tab.key)"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <div v-show="store.modalInfo">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div
            class="flex flex-col items-center gap-4 p-6 text-center rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-sm'
            "
          >
            <div class="relative">
              <div
                class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600"
              >
                {{ store.data.full_name?.charAt(0) }}
              </div>
              <span
                class="absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full font-medium border-2"
                :class="
                  store.data.status
                    ? navbar.userNav
                      ? 'bg-green-900 text-green-400 border-slate-900'
                      : 'bg-green-50 text-green-600 border-white'
                    : navbar.userNav
                      ? 'bg-red-900 text-red-400 border-slate-900'
                      : 'bg-red-50 text-red-500 border-white'
                "
              >
                {{ store.data.status ? "Faol" : "Arxiv" }}
              </span>
            </div>
            <div>
              <h2
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.data.full_name }}
              </h2>
              <p
                class="mt-1 text-sm"
                :class="navbar.userNav ? 'text-slate-400' : 'text-slate-500'"
              >
                {{ store.data.phone_number }}
              </p>
            </div>
            <div
              class="w-full pt-4 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Ro'yxatga olingan
              </p>
              <p
                class="text-sm font-medium"
                :class="navbar.userNav ? 'text-slate-300' : 'text-slate-700'"
              >
                {{ store.studentCreatedAt }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 lg:col-span-2">
            <div
              class="p-5 rounded-2xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border border-slate-800'
                  : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <p
                class="mb-4 text-xs font-semibold tracking-widest uppercase"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Ota-ona ma'lumotlari
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p
                    class="mb-1 text-xs"
                    :class="
                      navbar.userNav ? 'text-slate-500' : 'text-slate-400'
                    "
                  >
                    Ismi
                  </p>
                  <p
                    class="font-medium"
                    :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                  >
                    {{ store.data.parents_full_name }}
                  </p>
                </div>
                <div>
                  <p
                    class="mb-1 text-xs"
                    :class="
                      navbar.userNav ? 'text-slate-500' : 'text-slate-400'
                    "
                  >
                    Telefon
                  </p>
                  <p
                    class="font-medium"
                    :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                  >
                    {{ store.data.parents_phone_number }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-5 rounded-2xl"
              :class="
                store.data.parents_chat_id
                  ? navbar.userNav
                    ? 'bg-green-950 border border-green-900'
                    : 'bg-green-50 border border-green-100'
                  : navbar.userNav
                    ? 'bg-slate-900 border border-slate-800'
                    : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl"
                  :class="
                    store.data.parents_chat_id
                      ? 'bg-green-500'
                      : navbar.userNav
                        ? 'bg-slate-800'
                        : 'bg-slate-100'
                  "
                >
                  <svg
                    v-if="store.data.parents_chat_id"
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    :class="
                      navbar.userNav ? 'text-slate-600' : 'text-slate-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-sm font-medium"
                    :class="
                      store.data.parents_chat_id
                        ? navbar.userNav
                          ? 'text-green-400'
                          : 'text-green-700'
                        : navbar.userNav
                          ? 'text-white'
                          : 'text-slate-800'
                    "
                  >
                    {{
                      store.data.parents_chat_id
                        ? "Ota-ona botga ulangan"
                        : "Ota-ona botga ulanmagan"
                    }}
                  </p>
                  <p
                    class="text-xs mt-0.5"
                    :class="
                      store.data.parents_chat_id
                        ? navbar.userNav
                          ? 'text-green-600'
                          : 'text-green-500'
                        : navbar.userNav
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    "
                  >
                    {{
                      store.data.parents_chat_id
                        ? "Ota-ona xabarnomalarni qabul qilmoqda"
                        : "Ota-ona hali botni ishlatmagan"
                    }}
                  </p>
                </div>
              </div>
              <span
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="
                  store.data.parents_chat_id
                    ? 'bg-green-500 text-white'
                    : navbar.userNav
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-slate-100 text-slate-500'
                "
              >
                {{ store.data.parents_chat_id ? "Aktiv" : "Inaktiv" }}
              </span>
            </div>

            <div
              class="flex items-center justify-between p-5 rounded-2xl"
              :class="
                store.data.student_chat_id
                  ? navbar.userNav
                    ? 'bg-green-950 border border-green-900'
                    : 'bg-green-50 border border-green-100'
                  : navbar.userNav
                    ? 'bg-slate-900 border border-slate-800'
                    : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl"
                  :class="
                    store.data.student_chat_id
                      ? 'bg-green-500'
                      : navbar.userNav
                        ? 'bg-slate-800'
                        : 'bg-slate-100'
                  "
                >
                  <svg
                    v-if="store.data.student_chat_id"
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    :class="
                      navbar.userNav ? 'text-slate-600' : 'text-slate-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-sm font-medium"
                    :class="
                      store.data.student_chat_id
                        ? navbar.userNav
                          ? 'text-green-400'
                          : 'text-green-700'
                        : navbar.userNav
                          ? 'text-white'
                          : 'text-slate-800'
                    "
                  >
                    {{
                      store.data.student_chat_id
                        ? "O'quvchi botga ulangan"
                        : "O'quvchi botga ulanmagan"
                    }}
                  </p>
                  <p
                    class="text-xs mt-0.5"
                    :class="
                      store.data.student_chat_id
                        ? navbar.userNav
                          ? 'text-green-600'
                          : 'text-green-500'
                        : navbar.userNav
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    "
                  >
                    {{
                      store.data.student_chat_id
                        ? "O'quvchi xabarnomalarni qabul qilmoqda"
                        : "O'quvchi hali botni ishlatmagan"
                    }}
                  </p>
                </div>
              </div>
              <span
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="
                  store.data.student_chat_id
                    ? 'bg-green-500 text-white'
                    : navbar.userNav
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-slate-100 text-slate-500'
                "
              >
                {{ store.data.student_chat_id ? "Aktiv" : "Inaktiv" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="store.modalGroup"
        class="overflow-hidden border rounded-2xl"
        :class="
          navbar.userNav
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-100 text-slate-900 shadow-sm'
        "
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm !border-none">
            <thead
              class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
            >
              <tr>
                <th scope="col" class="py-3 text-center">Nomi</th>
                <th scope="col" class="py-3 text-center">Fani</th>
                <th scope="col" class="py-3 text-center">Narxi</th>
                <th scope="col" class="py-3 text-center">Boshlanish sanasi</th>
                <th scope="col" class="py-3 text-center">Qo'shilgan sanasi</th>
                <th scope="col" class="py-3 text-center">To'liq</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                "
                v-for="i in store.group"
                :key="i.group.id"
              >
                <td
                  scope="row"
                  class="px-8 py-4 font-medium text-center whitespace-nowrap"
                >
                  {{ i.group.name }}
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    <span v-for="fan in i.group.subject" :key="fan.id"
                      >{{ fan.subject.name }}
                    </span>
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ Number(i.group.price).toLocaleString("uz-UZ") }} so'm
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ i.group.start_date }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ i.createdAt.split("T")[0] }}
                  </p>
                </td>
                <td class="px-8 py-4 font-medium text-center">
                  <button
                    @click="enterSlug(i.group.id, i.group.name)"
                    class="px-5 py-2 text-white bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl focus:ring-2"
                  >
                    Kirish
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="store.group.length == 0"
            class="p-20 text-center text-slate-400"
          >
            Guruhlar ro'yxati bo'sh
          </div>
        </div>
      </div>

      <div
        v-show="store.modalPayment"
        class="overflow-hidden border rounded-2xl"
        :class="
          navbar.userNav
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-100 text-slate-900 shadow-sm'
        "
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
            >
              <tr>
                <th scope="col" class="py-3 text-center">Guruh</th>
                <th scope="col" class="py-3 text-center">Kurs narxi</th>
                <th scope="col" class="py-3 text-center">To'lov turi</th>
                <th scope="col" class="py-3 text-center">To'lov</th>
                <th scope="col" class="py-3 text-center">Oy</th>
                <th scope="col" class="py-3 text-center">To'lov sanasi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="[
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
                  i.status === 'update' ? 'btnAdd3' : '',
                  i.status === 'delete' ? 'btnAdd2' : '',
                ]"
                v-for="i in store.payment"
                :key="i.id"
              >
                <td
                  scope="row"
                  class="px-8 py-4 font-medium text-center whitespace-nowrap"
                >
                  {{ i.group.name }}
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ Number(i.group.price).toLocaleString("uz-UZ") }} so'm
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ i.method }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-green-700 whitespace-nowrap"
                >
                  <p class="bg-green-100 rounded-[5px] p-1">
                    {{ i.price.toLocaleString("uz-UZ") }} so'm
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ monthNames(i.month) }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ formatDateToNumeric(new Date(i.createdAt)) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="store.payment.length == 0"
            class="p-20 text-center text-slate-400"
          >
            To'lov tarixi bo'sh
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const studentId = computed(() => router.currentRoute.value.params.id);

const tabs = [
  { key: "info", label: "Ma'lumot" },
  { key: "group", label: "Guruhlar" },
  { key: "payment", label: "To'lov tarixi" },
];

const activeTab = computed(() => {
  if (store.modalInfo) return "info";
  if (store.modalGroup) return "group";
  if (store.modalPayment) return "payment";
  return "info";
});

const store = reactive({
  data: "",
  group: [],
  payment: [],
  modalInfo: true,
  modalGroup: false,
  modalPayment: false,
  loading: false,
  studentCreatedAt: "",
  attPage: 1,
  attTotalPages: 1,
});

const setActiveModal = (modalType) => {
  store.modalInfo = modalType === "info";
  store.modalGroup = modalType === "group";
  store.modalPayment = modalType === "payment";
};

function enterSlug(id, name) {
  router.push(`/groups/${id}/${name}`);
}

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hour}:${minute}`;
};

const monthNames = (month) => {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  return months[parseInt(month) - 1] || "Noto'g'ri oy";
};

const getStudent = async () => {
  try {
    const response = await axios.get(
      `/v1/student/${schoolId.value}/${studentId.value}`,
      {
        headers: { Authorization: `Bearer ${token.value}` },
      },
    );
    const studentData = response.data;
    Object.assign(store, {
      data: studentData,
      studentCreatedAt: studentData.createdAt.split("T")[0],
      group: studentData.group,
      payment: studentData.payment,
      loading: true,
    });
  } catch (error) {
    console.error("Talaba ma'lumotlarini olishda xato:", error);
  }
};

onMounted(() => {
  getStudent();
});
</script>
