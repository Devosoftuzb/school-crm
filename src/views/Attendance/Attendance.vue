<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.groupData">
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
                O'quvchini guruhdan o'chirib tashlash
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
                    Siz o'quvchini guruhdan o'chirishni xohlaysizmi?
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
                    @click="deleteStudentGroup"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 shadow rounded-xl sm:p-5"
              :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                    class="bg-transparent hover:bg-gray-200 hover rounded-xl text-sm p-1.5 ml-auto inline-flex items-center"
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
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                      class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                        class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Guruhni tanlang yoki qidirish..."
                      />
                      <ul
                        v-show="
                          history.filter_show && history.searchList.length > 0
                        "
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
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
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                          v-for="(i, index) in store.groupData"
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="historyModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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

      <div v-show="store.groupData" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 sm:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Davomat</h1>
            <div
              class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <button
                @click="history.modal = true"
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
              >
                <span class="">Davomat tarixi</span>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-end w-full gap-5 pb-2 lg:pb-0">
            <form
              @submit.prevent="getOneProduct(form.group_id)"
              :class="{ darkForm: navbar.userNav }"
              class="flex flex-col items-center justify-end w-full gap-5 sm:flex-row"
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
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="store.filter_show && store.searchList.length > 0"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
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
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.groupData"
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
                class="flex flex-row items-center justify-between w-full sm:max-w-fit md:space-y-0 md:justify-end md:space-x-3"
              >
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
                >
                  <span class="">Davomat qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative overflow-hidden shadow-md rounded-xl mb-28"
          :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          <div v-show="store.atData" class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center">To'lov holati</th>
                  <th scope="col" class="py-3 text-center">Davomat</th>
                  <th scope="col" class="py-3 text-center"></th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.atData"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-8 py-4 font-medium text-center">
                    <p
                      :class="{
                        'bg-green-100 text-green-800': i.debt === 'To\'langan',
                        'bg-red-100 text-red-800':
                          i.debt.includes('to\'lanmagan'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.debt }}
                    </p>
                  </td>

                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <button
                      @click="davomatToggle(i.id, false)"
                      :class="
                        getStudentStatus(i.id)
                          ? 'bg-green-600 rounded-xl w-24 py-2.5 text-white'
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
                          : 'bg-red-600 rounded-xl w-24 py-2.5 text-white'
                      "
                    >
                      Kelmadi
                    </button>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      v-show="store.guard"
                      @click="deleteFunc(i.student_group_id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.atData.length && !store.atPageData.length"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Davomat ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="store.atData.length > 0"
            class="flex flex-col items-center justify-between gap-3 p-4 mt-5 shadow rounded-xl lg:flex-row lg:space-x-4"
            :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
          >
            <div
              v-show="store.atData"
              class="flex items-center justify-end w-full gap-5 pb-2 lg:pb-0"
            >
              <button
                id=""
                @click="addAttendance()"
                class="flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-4 py-2.5"
              >
                <span class="">Davomat saqlash</span>
              </button>
            </div>
          </div>

          <div
            v-show="store.atPageData && store.atPageData.length > 0"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th
                    v-for="(date, index) in store.uniqueDates"
                    :key="index"
                    scope="col"
                    class="py-3 text-center"
                  >
                    {{ date }}
                  </th>
                  <th scope="col" class="py-3 text-center"></th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.atPageData"
                  :key="i.student_name"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>

                  <td
                    v-for="(date, index) in store.uniqueDates"
                    :key="index"
                    class="px-8 py-4 font-medium text-center"
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
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      v-show="store.guard"
                      @click="deleteFunc(i.student_group_id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.atPageData"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Davomat ro'yhati bo'sh</h1>
            </div>
          </div>

          <nav
            v-show="store.atPageData.length > 0"
            class="flex flex-row items-center justify-between p-4 space-y-0"
            aria-label="Table navigation"
          >
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
                    getHistory(store.pagination);
                  }
                "
              >
                <i
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
                ></i>
                <span class="hidden md:block">Oldingi</span>
              </li>
            </ul>

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
                    getHistory(store.pagination);
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
import { onMounted, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const userRole = localStorage.getItem("role");

const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = (hozirgiSana.getMonth() + 1).toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

const schoolId = computed(() => localStorage.getItem("school_id"));
const userId = computed(() => localStorage.getItem("id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const store = reactive({
  atPageData: [],
  page: [],
  pagination: 1,
  atData: [],
  groupData: false,
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  curentYil: [],
  uniqueDates: [],
  selectLamp: false,
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
});

const form = reactive({
  full_name: "",
  payment: "",
  status: [],
  group_id: "",
});

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

const remove = reactive({
  id: "",
  toggle: false,
});

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!"
) => {
  notification.warning(message);
};

const historyModal = () => {
  Object.assign(history, {
    modal: !history.modal,
    year: hozirgiYil,
    month: hozirgiOy,
    day: hozirgiKun,
    group_id: "",
  });
};

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

const davomatToggle = (id, status) => {
  const student = store.atData.find((s) => s.id === id);
  if (student) student.attendance = status;
};

const getStudentStatus = (id) => {
  const student = store.atData.find((s) => s.id === id);
  return student ? student.attendance : false;
};

const createSearchFilter = (searchObj, data, key, filterProp = "filter") => {
  searchObj.searchList = [];
  if (!searchObj[filterProp]) return;

  const filterLower = searchObj[filterProp].toLowerCase();
  searchObj.searchList = data.filter((i) =>
    i[key].toLowerCase().includes(filterLower)
  );
};

const searchFunc = () => createSearchFilter(store, store.groupData, "name");
const searchHistoryFunc = () =>
  createSearchFilter(history, store.groupData, "name");

const getUniqueDates = (records) => {
  const datesSet = new Set();
  records.forEach((record) => {
    record.attendance.forEach((att) => {
      datesSet.add(att.date);
    });
  });
  return Array.from(datesSet).sort((a, b) => new Date(a) - new Date(b));
};

const getAttendanceStatus = (attendance, date) => {
  const record = attendance.find((att) => att.date === date);
  return record ? record.status : false;
};

// API Functions
const getGroups = async () => {
  try {
    const endpoint = store.guard
      ? `/v1/group/add/${schoolId.value}`
      : `/v1/group/teacher/${schoolId.value}/${userId.value}`;

    const res = await axios.get(endpoint, { headers: authHeaders.value });
    store.groupData = res.data;
    store.error = false;
  } catch (error) {
    store.groupData = error.response?.data?.message || [];
    store.error = true;
  }
};

const getOneProduct = async (id) => {
  history.group_id = "";
  try {
    const res = await axios.get(
      `/v1/attendance/group/${schoolId.value}/${id}`,
      { headers: authHeaders.value }
    );

    store.atData = res.data[0];
    store.atPageData = [];

    if (res.data[1]?.method === "put") {
      notification.warning("Bu guruhga oldin davomat qilingan");
    }
  } catch (error) {
    handleError();
  }
};

const addAttendance = async () => {
  try {
    const data = {
      list: store.atData.map((student) => ({
        attendance_id: student?.attendance_id,
        school_id: Number(schoolId.value),
        student_id: student.id,
        group_id: student.group_id,
        status: student.attendance,
      })),
    };

    await axios.post("/v1/attendance", data, { headers: authHeaders.value });

    notification.success("Davomat saqlandi");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    handleError();
  }
};

const getHistory = async (page) => {
  form.group_id = "";
  try {
    const res = await axios.get(
      `/v1/attendance/${schoolId.value}/${history.group_id}/${history.year}/${history.month}/page?page=${page}`,
      { headers: authHeaders.value }
    );

    const records = res.data?.data?.records;
    if (records?.length) {
      store.atPageData = records;
      store.uniqueDates = getUniqueDates(records);
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      store.error = false;
    } else {
      store.atPageData = false;
      store.uniqueDates = [];
      store.error = false;
    }
    history.modal = false;
    store.atData = false;
  } catch (error) {
    store.atPageData = [];
    store.uniqueDates = [];
    store.error = true;
  }
};

const deleteStudentGroup = async () => {
  try {
    await axios.delete(`/v1/student-group/${remove.id}`, {
      headers: authHeaders.value,
    });

    notification.success("O'quvchi guruhdan o'chirildi");

    if (form.group_id !== "") {
      getOneProduct(form.group_id);
    } else {
      getHistory(store.pagination);
    }

    remove.toggle = false;
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  store.curentYil = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: String(orqaYil + i),
  }));

  getGroups();
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
