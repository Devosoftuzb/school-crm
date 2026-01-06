<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- Main modal -->
    <div
      :class="
        modal
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
              Test qo'shish
            </h3>
            <button
              @click="cancelFunc2"
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
            @submit.prevent="createProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium">
              <div class="">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fan tanlang</label
                >
                <select
                  v-model="form.subject_id"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Fan tanlang</option>
                  <option v-for="i in store.subjects" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="count"
                    class="block mb-2 text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                    >Savollar soni</label
                  >
                  <input
                    v-model="form.count"
                    type="number"
                    name="count"
                    id="count"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="10"
                    required
                  />
                </div>
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <label
                      for="time"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Test topshirish vaqti</label
                    >
                    <input
                      v-model="form.time"
                      type="number"
                      name="time"
                      id="time"
                      class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="60"
                      required
                    />
                  </div>
                  <span
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                    class="mt-5 text-xl text-bold"
                    >daqiqa</span
                  >
                </div>
              </div>
              <div class="flex items-center justify-between pt-5 mt-5 border-t">
                <button
                  @click="cancelFunc2"
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

    <!-- ----------------------------------------- EDIT MODAL END ---------------------------------------------------- -->
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
              Testni tahrirlash
            </h3>
            <button
              @click="cancelFunc1"
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
            @submit.prevent="editProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium">
              <div class="">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fan tanlang</label
                >
                <select
                  v-model="edit.subject_id"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Fan tanlang</option>
                  <option v-for="i in store.subjects" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="count"
                    class="block mb-2 text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                    >Savollar soni</label
                  >
                  <input
                    v-model="edit.count"
                    type="number"
                    name="count"
                    id="count"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="10"
                    required
                  />
                </div>
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <label
                      for="time"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Test topshirish vaqti</label
                    >
                    <input
                      v-model="edit.time"
                      type="number"
                      name="time"
                      id="time"
                      class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="60"
                      required
                    />
                  </div>
                  <span
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                    class="mt-5 text-xl text-bold"
                    >daqiqa</span
                  >
                </div>
              </div>
              <div class="flex items-center justify-between pt-5 mt-5 border-t">
                <button
                  @click="cancelFunc1"
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

    <!-- ----------------------------------------- EDIT MODAL END ---------------------------------------------------- -->

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
              Testni o'chirib tashlash
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
                  Siz testni o'chirishni xohlaysizmi?
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
                  @click="deleteProduct"
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

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="py-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Testlar</h1>
            <div
              class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <button
                @click="modal = true"
                id=""
                type="button"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                <span>Test qo'shish</span>
              </button>
            </div>
          </div>

          <div class="w-full lg:w-80">
            <form class="flex items-center font-medium text-gray-900">
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
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Qidirish..."
                />
                <ul
                  v-show="store.filter_show"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                  :class="{ hidden: !store.searchList.length }"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-gray-100"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @click="
                      store.filter = i.subject?.name;
                      searchFunc();
                    "
                  >
                    {{ i.subject?.name }}
                  </li>
                </ul>
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
                class="text-xs text-white uppercase rounded-xl btnAdd"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th
                    scope="col"
                    class="py-3 pl-8 text-center whitespace-nowrap"
                  >
                    Fan nomi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Savollar soni
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Test vaqti
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Savollar
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
                    class="px-8 py-3 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.subject?.name }}
                  </th>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.count }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.time }} daqiqa
                    </p>
                  </td>
                  <td class="px-8 py-3 font-medium text-center">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Qo'shish
                    </button>
                  </td>
                  <td class="pr-5 font-medium text-center whitespace-nowrap">
                    <i
                      @click="getOneProduct(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
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
                    class="px-8 py-3 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.subject?.name }}
                  </th>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.count }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.time }} daqiqa
                    </p>
                  </td>
                  <td class="px-8 py-3 font-medium text-center">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Qo'shish
                    </button>
                  </td>
                  <td class="pr-5 font-medium text-center whitespace-nowrap">
                    <i
                      @click="getOneProduct(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
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
              v-show="store.PageProduct.length === 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Testlar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchList.length"
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
                    getProduct(store.pagination);
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
                    getProduct(store.pagination);
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

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  subjects: [{ title: "Fan yaratilmagan" }],
  guard: false,
  filter: "",
  filter_show: false,
  searchList: [],
});

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  for (let i of store.allProducts) {
    if (i.subject?.name.toLowerCase().includes(store.filter.toLowerCase())) {
      store.searchList.push(i);
    }
  }

  if (!store.filter.length) {
    store.searchList = [];
  }
}
// ---------------------------- search ------------------------------------

function enterSlug(id) {
  router.push(`./tests/question/${id}`);
}

function cancelFunc1() {
  edit.toggle = false;
  edit.subject_id = "";
  edit.count = "";
  edit.time = "";
  edit.id = "";
}

function cancelFunc2() {
  modal.value = false;
  form.subject_id = "";
  form.count = "";
  form.time = "";
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ----------------------------------- forms -----------------------------------
const form = reactive({
  count: "",
  time: "",
  subject_id: "",
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  true_answer: "",
  test_group_id: "",
  question_id: "",
});

const edit = reactive({
  subject_id: "",
  count: "",
  time: "",
  id: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ----------------------------------- axios --------------------------------
const getAllProduct = () => {
  axios
    .get(`/test/getSchoolId/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.allProducts = res.data;
      store.error = false;
    })
    .catch((error) => {
      store.error = true;
      store.allProducts = error.response.data.message;
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const getProduct = (page) => {
  axios
    .get(`/test/${localStorage.getItem("school_id")}/page?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.PageProduct = res.data?.data.records;
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];

      store.error = false;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

function createProduct() {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    subject_id: form.subject_id,
    count: form.count,
    time: form.time,
  };

  axios
    .post("/test", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Test yaratildi");
      form.test_group_id = res.data.id;
      cancelFunc2();
      getProduct(1);
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
}

const getOneProduct = (id) => {
  axios
    .get(`/test/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      edit.count = res.data.count;
      edit.time = res.data.time;
      edit.subject_id = res.data.subject_id;
      edit.id = id;
      edit.toggle = true;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
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
      store.subjects = res.data || [{ title: "Fan yaratilmagan" }];
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const editProduct = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    count: edit.count,
    time: edit.time,
    subject_id: edit.subject_id,
  };
  axios
    .put(`/test/${edit.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Test tahrirlandi");
      getProduct(store.pagination);
      cancelFunc1();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const deleteProduct = () => {
  axios
    .delete(`/test/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Test o'chirildi");
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
  getProduct(1);
  getAllProduct();
  getSubject();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnOrqaga {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
