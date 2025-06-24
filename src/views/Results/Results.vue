<template>
  <div @click="store.filter_show = false" class="py-4 px-2">
    <!-- Placeholder -->
    <section :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

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
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
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
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
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
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="remove.toggle = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteProduct"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen mb-20">
        <!-- Start coding here -->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Test natijalari</h1>
          </div>

          <div class="w-full lg:w-80">
            <form class="flex items-center text-gray-900 font-medium">
              <label for="simple-search" class="sr-only">Qidiruv</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="store.filter"
                  @input="
                    store.filter_show = true;
                    searchFunc();
                  "
                  type="search"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                  placeholder="Qidirish..."
                />
                <ul
                  v-show="store.filter_show"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                  :class="{ hidden: !store.searchList.length }"
                >
                  <li
                    class="hover:bg-gray-100 cursor-pointer pl-2"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @click="
                      store.filter = i.customer.full_name;
                      searchFunc();
                    "
                  >
                    {{ i.customer.full_name }}
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="btnKirish text-xs rounded-lg uppercase text-white"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Mijoz ismi
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Telefon raqami
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Fan nomi
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    O'qituvchi ismi
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Vaqti
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Mijoz natijasi
                  </th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
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
                  v-show="!store.searchList.length"
                  v-for="i in store.PageProduct"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    {{ i.customer.full_name }}
                  </th>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.customer.phone_number }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.subject_name }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.teacher_name }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.time }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.result }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td class="text-center whitespace-nowrap font-medium pr-5">
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-show="store.searchList.length"
                  v-for="i in store.searchList"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    {{ i.customer.full_name }}
                  </th>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.customer.phone_number }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.subject_name }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.teacher_name }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.time }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.result }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td class="text-center whitespace-nowrap font-medium pr-5">
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="store.PageProduct.length === 0"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Natijalar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchList.length"
            class="flex flex-row justify-between items-center space-y-0 p-4"
            aria-label="Table navigation"
          >
            <!-- Oldingi sahifa tugmasi -->
            <ul class="flex items-center">
              <li
                :class="[
                  store.pagination === 1
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.pagination > 1) {
                    store.pagination -= 1;
                    getProduct(store.pagination);
                  }
                "
              >
                <i
                  class="md:hidden font-bold text-black text-2xl bx bx-chevron-left"
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
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.page[0] * 15 < store.page[1]) {
                    store.pagination += 1;
                    getProduct(store.pagination);
                  }
                "
              >
                <span class="hidden md:block">Keyingi</span>
                <i
                  class="md:hidden font-bold text-black text-2xl bx bx-chevron-right"
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

const store = reactive({
  PageProduct: "",
  page: [1, 0],
  pagination: 1,
  allProducts: [],
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  subjects: [],
});

const remove = reactive({
  id: "",
  toggle: false,
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  for (let i of store.allProducts) {
    if (
      i.customer.full_name.toLowerCase().includes(store.filter.toLowerCase())
    ) {
      store.searchList.push(i);
    }
  }

  if (!store.filter.length) {
    store.searchList = [];
  }
}
// ---------------------------- search ------------------------------------

const chekDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

// ----------------------------------- axios --------------------------------
const getAllProduct = () => {
  axios
    .get("/customer-test", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const records = res.data;
      const localSchoolId = Number(localStorage.getItem("school_id"));

      const enrichedRecords = records
        .filter((record) => record.customer?.school_id === localSchoolId)
        .map((record) => {
          const [time, ...teacherParts] =
            record.customer.description.split(" ");
          const teacher_name = teacherParts.join(" ");

          const subjectId = record.customer?.subject_id;
          const subject = store.subjects.find((s) => s.id === subjectId);
          return {
            ...record,
            subject_name: subject ? subject.name : "Noma'lum",
            time: time ? time : "Noma'lum",
            teacher_name: teacher_name ? teacher_name : "Noma'lum",
          };
        });

      // store.PageProduct = enrichedRecords;
      store.allProducts = enrichedRecords;
      store.error = false;
    })
    .catch((error) => {
      console.error(error);
      store.error = true;
    });
};

const getSubject = () => {
  axios
    .get(`/subject/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.subjects = res.data;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const getProduct = (page) => {
  axios
    .get(`/customer-test/page?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const records = res.data?.data?.records || [];
      const localSchoolId = Number(localStorage.getItem("school_id"));

      const enrichedRecords = records
        .filter((record) => record.customer?.school_id === localSchoolId)
        .map((record) => {
          const [time, ...teacherParts] =
            record.customer.description.split(" ");
          const teacher_name = teacherParts.join(" ");

          const subjectId = record.customer?.subject_id;
          const subject = store.subjects.find((s) => s.id === subjectId);

          return {
            ...record,
            subject_name: subject ? subject.name : "Noma'lum",
            time: time || "Noma'lum",
            teacher_name: teacher_name || "Noma'lum",
          };
        });

      store.PageProduct = enrichedRecords;

      store.page = [page, enrichedRecords.length];
      store.error = false;
    })
    .catch((error) => {
      console.error(error);
      store.error = true;
    });
};

const deleteProduct = () => {
  axios
    .delete(`/customer-test/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Test natijasi o'chirildi");
      getProduct(store.pagination);
      remove.toggle = false;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

onMounted(() => {
  getSubject();
  getProduct(1);
  getAllProduct();
});

function enterSlug(id) {
  router.push(`./results/${id}`);
}

// Computed property for filtered PageProduct
const filteredPageProduct = computed(() => {
  return store.searchList.length ? store.searchList : store.PageProduct;
});
</script>

<style lang="scss" scoped>
.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
