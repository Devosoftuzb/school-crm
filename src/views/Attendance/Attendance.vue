<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.groupAllProducts">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

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
                O'quvchini guruhdan o'chirib tashlash
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
                    Siz o'quvchini guruhdan o'chirishni xohlaysizmi?
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
                    @click="deleteStudentGroup"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

      <!-- ------------------------------------------- history modal ----------------------------------------------------- -->
      <div
        @click.self="historyModal"
        :class="
          history.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Davomat tarixini ko'rish
                  </h3>
                  <button
                    @click="historyModal"
                    type="button"
                    class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    :class="{ 'text-white': navbar.userNav }"
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
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="getHistory(1)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="history.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Oyni tanlang</option>
                      <option value="01">Yanvar</option>
                      <option value="02">Fevral</option>
                      <option value="03">Mart</option>
                      <option value="04">Aprel</option>
                      <option value="05">May</option>
                      <option value="06">Iyun</option>
                      <option value="07">Iyul</option>
                      <option value="08">Avgust</option>
                      <option value="09">Sentabr</option>
                      <option value="10">Oktabr</option>
                      <option value="11">Noyabr</option>
                      <option value="12">Dekabr</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Guruhni tanlang</label
                    >
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
                        v-model="history.filter"
                        @focus="history.selectLamp = true"
                        @blur="
                          history.selectLamp = false;
                          history.filter_show = false;
                        "
                        @input="
                          history.filter_show = true;
                          searchHistoryFunc();
                        "
                        type="search"
                        id="simple-search"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                        placeholder="Guruhni tanlang yoki qidirish..."
                      />
                      <ul
                        v-show="
                          history.filter_show && history.searchList.length > 0
                        "
                        class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full bottom-full"
                      >
                        <li
                          class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
                          v-for="(i, index) in history.searchList"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.id;
                            history.group_name = i.name;
                            history.filter_show = false;
                            history.filter = i.name;
                          "
                        >
                          {{ i.name }}
                        </li>
                      </ul>
                      <ul
                        v-show="history.selectLamp && !history.filter"
                        class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full bottom-full"
                      >
                        <li
                          class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
                          v-for="(i, index) in store.groupAllProducts"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.id;
                            history.group_name = i.name;
                            history.selectLamp = false;
                            history.filter = i.name;
                          "
                        >
                          {{ i.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="historyModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------- history modal end ------------------------------------------------- -->

      <div v-show="store.groupAllProducts" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center sm:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Davomat</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                @click="history.modal = true"
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <span class="">Davomat tarixi</span>
              </button>
            </div>
          </div>
          <div class="w-full flex items-center lg:pb-0 pb-2 gap-5 justify-end">
            <form
              @submit.prevent="getOneProduct(form.group_id)"
              :class="{ darkForm: navbar.userNav }"
              class="w-full flex sm:flex-row flex-col items-center justify-end gap-5"
            >
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
                  @focus="store.selectLamp = true"
                  @blur="
                    store.selectLamp = false;
                    store.filter_show = false;
                  "
                  @input="
                    store.filter_show = true;
                    searchFunc();
                  "
                  type="search"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="store.filter_show && store.searchList.length > 0"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      store.filter_show = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
                <ul
                  v-show="store.selectLamp && !store.filter"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
                    v-for="(i, index) in store.groupAllProducts"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      store.selectLamp = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </div>

              <div
                class="sm:max-w-fit w-full flex flex-row md:space-y-0 items-center justify-between md:justify-end md:space-x-3"
              >
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">Davomat qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div v-show="!store.PageProduct" class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th scope="col" class="text-center py-3">To'lov holati</th>
                  <th scope="col" class="text-center py-3">Davomat</th>
                  <th scope="col" class="text-center py-3"></th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.allProducts"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium px-8 py-4">
                    <p
                      :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus === 'To\'langan',
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>

                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <button
                      @click="davomatToggle(i.id, false)"
                      :class="
                        getStudentStatus(i.id)
                          ? 'bg-green-600 rounded-lg w-24 py-2.5 text-white'
                          : 'hidden'
                      "
                    >
                      Keldi
                    </button>
                    <button
                      @click="davomatToggle(i.id, true)"
                      :class="
                        getStudentStatus(i.id)
                          ? 'hidden'
                          : 'bg-red-600 rounded-lg w-24 py-2.5 text-white'
                      "
                    >
                      Kelmadi
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
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
              v-show="!store.allProducts"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Davomat ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="store.allProducts"
            class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mt-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div
              v-show="store.allProducts"
              class="w-full flex items-center lg:pb-0 pb-2 gap-5 justify-end"
            >
              <button
                id=""
                @click="addAttendance()"
                class="flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <span class="">Davomat saqlash</span>
              </button>
            </div>
          </div>

          <div
            v-show="store.PageProduct && store.PageProduct.length"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th
                    v-for="(date, index) in store.uniqueDates"
                    :key="index"
                    scope="col"
                    class="text-center py-3"
                  >
                    {{ date }}
                  </th>
                  <th scope="col" class="text-center py-3"></th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.PageProduct"
                  :key="i.student_name"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>

                  <td
                    v-for="(date, index) in store.uniqueDates"
                    :key="index"
                    class="text-center font-medium px-8 py-4"
                  >
                    <p
                      v-if="getAttendanceStatus(i.attendance, date)"
                      class="bg-green-100 text-green-800 text-lg rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      <i class="bx bx-check"></i>
                    </p>
                    <p
                      v-else
                      class="bg-red-100 text-red-800 text-lg rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      <i class="bx bx-x"></i>
                    </p>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="deleteFunc(i.student_id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.PageProduct"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Davomat ro'yhati bo'sh</h1>
            </div>
          </div>

          <nav
            v-show="store.PageProduct"
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
                    getHistory(store.pagination);
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
                    getHistory(store.pagination);
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

// Stores
const notification = useNotificationStore();
const navbar = useNavStore();

// Current Date
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = (hozirgiSana.getMonth() + 1).toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

// Store Reactive
const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  groupAllProducts: false,
  error: false,
  guard: "",
  group: "",
  filter: "",
  filter_show: false,
  searchList: [],
  student: [],
  status: false,
  attendance_id: 0,
  student_group: false,
  curentYil: [],
  uniqueDates: [],
  selectLamp: false,
});

// Form Reactive
const form = reactive({
  full_name: "",
  payment: "",
  status: [],
  group_id: "",
});

// History Reactive
const history = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  modal: false,
  filter_show: false,
  filter: "",
  selectLamp: false,
  searchList: [],
});

// Remove Reactive
const remove = reactive({
  id: "",
  toggle: false,
});

const historyModal = () => {
  history.modal = !history.modal;
  history.year = hozirgiYil;
  history.month = hozirgiOy;
  history.day = hozirgiKun;
  history.group_id = "";
};

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// Helper Functions
const davomatToggle = (id, status) => {
  const student = store.student.find((s) => s.student_id === id);
  if (student) student.status = status;
};

const getStudentStatus = (id) => {
  const student = store.student.find((s) => s.student_id === id);
  return student ? student.status : false;
};

const searchFunc = () => {
  store.searchList = [];
  if (store.filter) {
    store.searchList = store.groupAllProducts.filter((i) =>
      i.name.toLowerCase().includes(store.filter.toLowerCase())
    );
  }
};

function searchHistoryFunc() {
  history.searchList = [];
  if (history.filter) {
    for (let i of store.groupAllProducts) {
      if (i.name.toLowerCase().includes(history.filter.toLowerCase())) {
        history.searchList.push(i);
      }
    }
  }
}

const calculatePaymentStatus = (paymentHistory, groupPrice) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

  if (!paymentHistory || paymentHistory.length === 0) {
    return `(${groupPrice}) so'm to'lanmagan`;
  }

  const totalDiscount = paymentHistory[0]?.discount || 0;
  const discountedPrice = Math.round(groupPrice * (1 - totalDiscount / 100));

  let currentMonthPaid = 0;
  paymentHistory.forEach((payment) => {
    if (
      payment.year === String(currentYear) &&
      payment.month === String(currentMonth)
    ) {
      currentMonthPaid += payment.price;
    }
  });

  if (currentMonthPaid >= discountedPrice) {
    return "To'langan";
  } else {
    const amountDue = discountedPrice - currentMonthPaid;
    return `(${amountDue}) so'm to'lanmagan`;
  }
};

const getUniqueDates = (records) => {
  const dates = [];
  records.forEach((record) => {
    record.attendance.forEach((att) => {
      if (!dates.includes(att.date)) {
        dates.push(att.date);
      }
    });
  });
  return dates.sort((a, b) => new Date(a) - new Date(b));
};

const getAttendanceStatus = (attendance, date) => {
  const record = attendance.find((att) => att.date === date);
  return record ? record.status : false;
};

const checkAttendance = (attendanceData, studentID, groupID) => {
  const today = new Date().toISOString().split("T")[0];
  const attendanceRecord = attendanceData.find(
    (record) =>
      record.student_id === studentID &&
      record.group_id === groupID &&
      record.createdAt.split("T")[0] === today
  );
  if (attendanceRecord) {
    store.attendance_id = attendanceRecord.id;
    store.status = true;
  }
  return attendanceRecord ? attendanceRecord.status : true;
};

const listStudent = (allStudent, groupID) => {
  allStudent.forEach((student) => {
    store.student.push({
      school_id: Number(localStorage.getItem("school_id")),
      student_id: student.id,
      group_id: groupID,
      status: checkAttendance(student.attendance, student.id, groupID),
      attendance_id: store.attendance_id,
    });
  });
};

// API Functions
const getAllProduct = async () => {
  try {
    const res = await axios.get(`/group/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    store.groupAllProducts = res.data.sort((a, b) => b.id - a.id);
    store.error = false;
  } catch (error) {
    store.groupAllProducts = error.response.data.message;
    store.error = true;
  }
};

const getOneProduct = async (id) => {
  history.group_id = "";
  try {
    const groupResponse = await axios.get(
      `/group/${localStorage.getItem("school_id")}/${id}/student`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const groupPrice = Number(groupResponse.data.price);
    const groupStartDate = groupResponse.data.start_date;

    if (!groupStartDate || isNaN(Date.parse(groupStartDate))) {
      throw new Error("Guruh ochilgan sana noto'g'ri");
    }

    const studentList = await Promise.all(
      groupResponse.data.student.map(async (student) => {
        const studentInfo = await axios.get(
          `/student/${localStorage.getItem("school_id")}/${
            student.student_id
          }/payment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const paymentsForGroup = studentInfo.data.payment.filter(
          (payment) => payment.group_id === form.group_id
        );
        studentInfo.data.paymentStatus = calculatePaymentStatus(
          paymentsForGroup,
          groupPrice
        );
        return studentInfo.data;
      })
    );

    store.PageProduct = "";
    store.allProducts = studentList;
    listStudent(store.allProducts, form.group_id);

    if (store.status) {
      notification.warning("Bu guruhga oldin davomat qilingan");
    }
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const addAttendance = async () => {
  try {
    const data = {
      list: store.student,
    };

    const url = store.status
      ? `/attendance/${localStorage.getItem("school_id")}`
      : "/attendance";

    const method = store.status ? "put" : "post";

    await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    notification.success("Davomat saqlandi");

    setTimeout(function () {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getHistory = async (page) => {
  form.group_id = "";
  try {
    const res = await axios.get(
      `/attendance/${localStorage.getItem("school_id")}/${history.group_id}/${
        history.year
      }/${history.month}/page?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const records = res.data?.data?.records;
    if (records && records.length !== 0) {
      history.group_name = records[0].group_name;
      store.PageProduct = records;
      store.uniqueDates = getUniqueDates(records);
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      store.error = false;
    } else {
      store.PageProduct = false;
      store.uniqueDates = [];
      store.error = false;
    }
    history.modal = false;
    store.allProducts = false;
  } catch (error) {
    store.PageProduct = [];
    store.uniqueDates = [];
    store.error = true;
  }
};

const deleteStudentGroup = async () => {
  try {
    const token = localStorage.getItem("token");
    const schoolId = localStorage.getItem("school_id");

    const studentGroupResponse = await axios.get(`/student-group`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    store.student_group = studentGroupResponse.data.filter(
      (item) =>
        item.student_id === remove.id &&
        (item.group_id === form.group_id || item.group_id === history.group_id)
    );

    if (store.student_group.length > 0) {
      const studentGroupId = store.student_group[0].id;

      await axios.delete(`/student-group/${studentGroupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notification.success("O'quvchi guruhdan o'chirildi");
    }

    const IDgroup = form.group_id === "" ? history.group_id : form.group_id;

    axios.delete(`/attendance/${schoolId}/${IDgroup}/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (form.group_id !== "") {
      getOneProduct(form.group_id);
    } else {
      getHistory(store.pagination);
    }

    remove.toggle = false;
    notification.success("Davomat ma'lumotlari o'chirildi");
  } catch (error) {
    // console.error(error);
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

// Component Lifecycle
onMounted(() => {
  for (let i = 0; i < 5; i++) {
    let list = {
      id: i,
      name: String(orqaYil + i),
    };
    store.curentYil.push(list);
  }
  getAllProduct();
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
  background-image: linear-gradient(to right, white -450%, #2f73f0);
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
