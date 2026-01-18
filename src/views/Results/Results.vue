<template>
  <div @click="store.filter_show = false" class="px-2 py-4">
    <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
    <div
      :class="
        remove.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 shadow rounded-xl sm:p-5"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
          >
            <h3
              class="text-lg"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              Test natijasini o'chirib tashlash
            </h3>
            <button
              @click="remove.toggle = false"
              type="button"
              class="bg-transparent hover:bg-gray-200 hover rounded-xl text-sm p-1.5 ml-auto inline-flex items-center"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div :class="{ darkForm: navbar.userNav }">
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div>
                <div></div>
                <h1
                  class="text-2xl"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Siz test natijasini o'chirishni xohlaysizmi?
                </h1>
              </div>
              <div
                class="flex items-center justify-between w-full pt-5 mt-5 border-t"
              >
                <button
                  @click="remove.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  @click="deleteResult"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

    <!-- -----------------------------------------  MODAL ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-xl min-w-[30%] h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 shadow rounded-xl sm:p-5"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
          >
            <h3
              class="text-lg"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              Mijoh haqida izoh
            </h3>
            <button
              @click="edit.toggle = false"
              type="button"
              class="bg-transparent hover:bg-gray-200 hover rounded-xl text-sm p-1.5 ml-auto inline-flex items-center"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <form
            @submit.prevent="editResult"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium">
              <div>
                <textarea
                  v-model="edit.description"
                  name="description"
                  id="description"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full h-[150px] p-2.5"
                  placeholder="Mijoz haqida ma'lumot"
                ></textarea>
              </div>
              <div class="flex items-center justify-between pt-5 mt-5 border-t">
                <button
                  @click="edit.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Qo'shish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->
    <!-- Placeholder -->
    <section :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.resultData">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.resultData" class="w-full mb-20 max-w-screen">
        <!-- Start coding here -->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Test natijalari</h1>
          </div>

          <div class="flex w-full">
            <form
              class="flex items-center w-full font-medium text-gray-900"
              @submit.prevent
            >
              <label class="sr-only">Qidiruv</label>

              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="store.filter"
                  @input="searchName(store.filter)"
                  type="search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Qidirish..."
                />
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative overflow-hidden shadow-md rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs text-white uppercase rounded-xl btnKirish"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Mijoz ismi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Telefon raqami
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Fan nomi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    O'qituvchi ismi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Vaqti
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Mijoz natijasi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Holati
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Mijoz haqida
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    To'liq
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-for="i in store.resultData"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="px-8 py-3 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.customer.full_name }}
                  </th>
                  <td
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.customer.phone_number }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.test.subject.name }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.teacher_name }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.time }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.result }}
                    </p>
                  </td>
                  <td
                    v-show="!i.customer.is_student"
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      O'quvchi bo'lmagan
                    </p>
                  </td>
                  <td
                    v-show="i.customer.is_student"
                    class="px-8 py-4 font-medium text-center text-green-700 whitespace-nowrap"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">
                      O'quvchi bo'lgan
                    </p>
                  </td>
                  <td class="px-5 py-2 font-medium text-center text-blue-800">
                    <div
                      @click="getOneResult(i.id)"
                      class="relative group flex gap-2 cursor-pointer justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span>
                          {{
                            i.description && i.description.split(" ").length > 3
                              ? i.description.split(" ").slice(0, 3).join(" ") +
                                "..."
                              : i.description
                          }}
                        </span>
                      </p>

                      <i
                        class="p-1 ml-2 font-extrabold text-white bg-blue-800 rounded-md cursor-pointer bx bxs-pencil"
                      ></i>
                    </div>
                  </td>

                  <td class="px-8 py-3 font-medium text-center">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td class="pr-5 font-medium text-center whitespace-nowrap">
                    <i
                      @click="deleteFunc(i.id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="store.resultData.length === 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Natijalar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchLamp"
            class="flex flex-row items-center justify-between p-4 space-y-0"
            aria-label="Table navigation"
          >
            <!-- Oldingi sahifa tugmasi -->
            <ul class="flex items-center">
              <li
                :class="[
                  store.pagination === 1
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.pagination > 1) {
                    store.pagination -= 1;
                    getPageResult(store.pagination);
                  }
                "
              >
                <i
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
                ></i>
                <span class="hidden md:block">Oldingi</span>
              </li>
            </ul>

            <!-- Sahifa raqami -->
            <span class="text-sm font-normal text-center">
              Sahifa
              <span class="font-semibold">
                <span>{{ store.page[0] * 15 - 14 }}</span> -
                <span v-if="store.page[0] * 15 < store.page[1]">{{
                  store.page[0] * 15
                }}</span
                ><span v-else>{{ store.page[1] }}</span>
              </span>
              dan
              <span class="font-semibold">{{ store.page[1] }}</span>
            </span>

            <!-- Keyingi sahifa tugmasi -->
            <ul class="flex items-center">
              <li
                :class="[
                  store.page[0] * 15 >= store.page[1]
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.page[0] * 15 < store.page[1]) {
                    store.pagination += 1;
                    getPageResult(store.pagination);
                  }
                "
              >
                <span class="hidden md:block">Keyingi</span>
                <i
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-right"
                ></i>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const store = reactive({
  resultData: "",
  page: [1, 0],
  pagination: 1,
  error: false,
  filter: "",
  filter_show: false,
  searchTimer: null,
  searchLamp: false,
});

const edit = reactive({
  toggle: false,
  id: "",
  description: "",
});

const remove = reactive({
  id: "",
  toggle: false,
});

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
};

const enrichRecords = (records) => {
  return records.map((record) => {
    const description = record.customer?.description || "";
    const [time, ...teacherParts] = description.split(" ");
    const teacher_name = teacherParts.join(" ");

    return {
      ...record,
      time: time || "Noma'lum",
      teacher_name: teacher_name || "Noma'lum",
    };
  });
};

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function enterSlug(id) {
  router.push(`./results/${id}`);
}

// ----------------------------------- axios --------------------------------

const searchName = (name) => {
  store.searchLamp = true;
  clearTimeout(store.searchTimer);

  store.searchTimer = setTimeout(async () => {
    if (!name) {
      store.resultData = [];
      getPageResult(store.pagination);
      store.searchLamp = false;
      return;
    }

    try {
      const res = await axios.get(
        `/v1/customer-test/search/${schoolId.value}/${name}`,
        { headers: authHeaders.value },
      );

      const records = res.data || [];
      store.resultData = enrichRecords(records);
    } catch {
      store.resultData = [];
      store.searchLamp = false;
      getPageResult(store.pagination);
    }
  }, 350);
};

const getOneResult = async (id) => {
  try {
    const res = await axios.get(`/v1/customer-test/note/${id}`, {
      headers: authHeaders.value,
    });

    Object.assign(edit, {
      id: id,
      description: res.data.description,
      toggle: true,
    });
  } catch (error) {
    handleError();
  }
};

const getPageResult = async (page) => {
  try {
    const res = await axios.get(
      `/v1/customer-test/${schoolId.value}/page?page=${page}`,
      { headers: authHeaders.value },
    );

    const records = res.data?.data?.records || [];
    const enrichedRecords = enrichRecords(records);

    store.resultData = enrichedRecords;
    store.page = [page, enrichedRecords.length];
    store.error = false;
  } catch (error) {
    console.error(error);
    store.error = true;
  }
};

const editResult = async () => {
  const data = {
    description: edit.description,
  };

  try {
    await axios.put(`/v1/customer-test/${edit.id}`, data, {
      headers: authHeaders.value,
    });

    edit.toggle = false;
    notification.success("Mijoz haqida izoh qo'shildi");
    getPageResult(store.pagination);
  } catch (error) {
    handleError();
  }
};

const deleteResult = async () => {
  try {
    await axios.delete(`/v1/customer-test/${remove.id}`, {
      headers: authHeaders.value,
    });

    notification.success("Test natijasi o'chirildi");
    getPageResult(store.pagination);
    remove.toggle = false;
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getPageResult(1);
});
</script>

<style lang="scss" scoped>
.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
