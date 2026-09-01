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
            Guruh profili
          </p>
          <h1
            class="text-xl font-bold"
            :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
          >
            {{ router.currentRoute.value.params.name.toUpperCase() }}
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

      <!-- INFO TAB -->
      <div v-show="store.modalInfo">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <div
            class="flex flex-col items-start justify-between gap-4 mb-5 sm:flex-row sm:items-center"
          >
            <p
              class="text-xs font-semibold tracking-widest uppercase"
              :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
            >
              Guruh ma'lumotlari
            </p>
            <span
              class="px-4 py-1.5 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 text-white"
            >
              {{ store.groupData.level || "No'malum" }}
            </span>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Xonasi
              </p>
              <p
                class="font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.groupData.room?.name || "—" }}
              </p>
            </div>
            <div>
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Boshlangan sana
              </p>
              <p
                class="font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.groupData.start_date?.slice(0, 10) || "—" }}
              </p>
            </div>
            <div>
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Dars vaqti
              </p>
              <p
                class="font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.groupData.start_time }} -
                {{ store.groupData.end_time }}
              </p>
            </div>
            <div>
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                O'quvchilar soni
              </p>
              <p
                class="font-medium"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.studentCount }} ta
              </p>
            </div>
          </div>

          <div
            class="pt-5 mt-5 border-t"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <p
              class="mb-2 text-xs"
              :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
            >
              Kurs narxi
            </p>
            <p
              class="inline-block px-4 py-1.5 text-lg font-bold rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-green-950 text-green-400 border border-green-900'
                  : 'bg-green-50 text-green-700 border border-green-100'
              "
            >
              {{ Number(store.groupData.price).toLocaleString("uz-UZ") }} so'm
            </p>
          </div>
        </div>
      </div>

      <!-- STAFF TAB -->
      <div
        v-show="store.modalStaff"
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
                <th scope="col" class="py-3 text-center">I . F . O</th>
                <th scope="col" class="py-3 text-center">Lavozim</th>
                <th scope="col" class="py-3 text-center">Telefon raqami</th>
                <th scope="col" class="py-3 text-center">Qo'shilgan sana</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                "
                v-for="i in store.groupData.employee"
                :key="i.id"
              >
                <td
                  scope="row"
                  class="px-8 py-4 font-medium text-center whitespace-nowrap"
                >
                  {{ i.employee.full_name }}
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-green-800 whitespace-nowrap"
                >
                  <p class="bg-green-100 rounded-[5px] p-1">
                    {{ i.employee.role }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ i.employee.phone_number }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ i.createdAt.split("T")[0] }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="
              !store.groupData.employee || store.groupData.employee.length === 0
            "
            class="p-20 text-center text-slate-400"
          >
            Xodimlar ro'yxati bo'sh
          </div>
        </div>
      </div>

      <!-- STUDENTS TAB -->
      <div
        v-show="store.modalStudent"
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
                <th scope="col" class="py-3 text-center">I . F . O</th>
                <th scope="col" class="py-3 text-center">Telefon raqami</th>
                <th scope="col" class="py-3 text-center">Qo'shilgan sana</th>
                <th scope="col" class="py-3 text-center">To'liq</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                "
                v-for="i in store.groupData.student"
                :key="i.id"
              >
                <td
                  scope="row"
                  class="px-8 py-4 font-medium text-center whitespace-nowrap"
                >
                  {{ i.student.full_name }}
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ i.student.phone_number }}
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
                    @click="
                      enterSlug(
                        i.student.id,
                        i.student.full_name.split(' ').join('_').toLowerCase(),
                      )
                    "
                    class="px-5 py-2 text-white bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl focus:ring-2"
                  >
                    Kirish
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="
              !store.groupData.student || store.groupData.student.length === 0
            "
            class="p-20 text-center text-slate-400"
          >
            O'quvchilar ro'yxati bo'sh
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import { useRouter } from "vue-router";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";

const navbar = useNavStore();
const router = useRouter();

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const groupId = computed(() => router.currentRoute.value.params.id);
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const tabs = [
  { key: "info", label: "Ma'lumot" },
  { key: "staff", label: "Xodimlar" },
  { key: "student", label: "O'quvchilar" },
];

const activeTab = computed(() => {
  if (store.modalInfo) return "info";
  if (store.modalStaff) return "staff";
  if (store.modalStudent) return "student";
  return "info";
});

const store = reactive({
  groupData: [],
  studentCount: 0,
  loading: false,
  modalInfo: true,
  modalStaff: false,
  modalStudent: false,
});

const setActiveModal = (modalType) => {
  store.modalInfo = modalType === "info";
  store.modalStaff = modalType === "staff";
  store.modalStudent = modalType === "student";
};

function enterSlug(id, name) {
  router.push(`/students/${id}/${name}`);
}

const getGroup = async () => {
  try {
    const res = await axios.get(
      `/v1/group/one-all/${schoolId.value}/${groupId.value}`,
      { headers: authHeaders.value },
    );

    store.groupData = res.data;
    store.studentCount = res.data.student?.length || 0;
    store.loading = true;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

onMounted(() => {
  getGroup();
});
</script>
