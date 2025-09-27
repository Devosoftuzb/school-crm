<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        modal
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
              Yangi guruh qo'shish
            </h3>
            <button
              @click="toggleModal"
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
          <form
            @submit.prevent="createProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-2 font-medium gap-4 mb-4">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh nomi</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh nomi"
                  required
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh narxi</label
                >
                <input
                  v-model="form.price"
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh narxi"
                  required
                />
              </div>
              <div class="w-[206%]">
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh boshlanish sanasi</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div></div>
              <div>
                <label
                  for="start_time"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Boshlanish vaqti</label
                >
                <input
                  v-model="form.start_time"
                  type="time"
                  name="start_time"
                  id="start_time"
                  step="60"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Boshlanish vaqti"
                  required
                />
              </div>
              <div>
                <label
                  for="end_time"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Tugash vaqti</label
                >
                <input
                  v-model="form.end_time"
                  type="time"
                  name="end_time"
                  id="end_time"
                  step="60"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Tugash vaqti"
                  required
                />
              </div>
              <div class="w-[206%]">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fan tanlang</label
                >
                <select
                  v-model="form.subject"
                  id="subject"
                  class="bg-gray-50 border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  required
                >
                  <option value="" disabled selected>Fan tanlang</option>
                  <option
                    v-for="i in store.subject"
                    :key="i.id"
                    :value="i.name"
                  >
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div></div>
              <div class="w-[206%]">
                <label
                  for="teacher"
                  class="w-[206%] block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >O'qituvchi tanlang</label
                >
                <select
                  v-model="form.employee"
                  id="teacher"
                  class="bg-gray-50 border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  required
                >
                  <option value="" disabled selected>O'qituvchi tanlang</option>
                  <option v-for="i in store.employee" :key="i.id" :value="i.id">
                    {{ i.full_name }}
                  </option>
                </select>
              </div>
              <div></div>
              <div
                class="w-[206%] flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="cancelFunc"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

    <!-- ----------------------------------------- Edit modal ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
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
              Guruhni o'zgartirish
            </h3>
            <button
              @click="
                edit.toggle = !edit.toggle;
                edit.name = '';
                edit.description = '';
              "
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
          <form
            @submit.prevent="editProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh nomi</label
                >
                <input
                  v-model="edit.name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh nomi"
                  required
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh narxi</label
                >
                <input
                  v-model="edit.price"
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh narxi"
                  required
                />
              </div>
              <div class="w-[206%]">
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruh boshlanish sanasi</label
                >
                <input
                  v-model="edit.start_date"
                  type="date"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div></div>
              <div>
                <label
                  for="start_time"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Boshlanish vaqti</label
                >
                <input
                  v-model="edit.start_time"
                  type="time"
                  name="start_time"
                  id="start_time"
                  step="60"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Boshlanish vaqti"
                  required
                />
              </div>
              <div>
                <label
                  for="end_time"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Tugash vaqti</label
                >
                <input
                  v-model="edit.end_time"
                  type="time"
                  name="end_time"
                  id="end_time"
                  step="60"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Tugash vaqti"
                  required
                />
              </div>
              <div class="w-[206%]">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fan tanlang</label
                >
                <select
                  v-model="edit.subject"
                  id="subject"
                  class="bg-gray-50 border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  required
                >
                  <option value="" disabled selected>Fan tanlang</option>
                  <option
                    v-for="i in store.subject"
                    :key="i.id"
                    :value="i.name"
                  >
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div></div>
              <div class="w-[206%]">
                <label
                  for="teacher"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >O'qituvchi tanlang</label
                >
                <select
                  v-model="edit.employee"
                  id="teacher"
                  class="bg-gray-50 border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  required
                >
                  <option value="" disabled selected>O'qituvchi tanlang</option>
                  <option v-for="i in store.employee" :key="i.id" :value="i.id">
                    {{ i.full_name }}
                  </option>
                </select>
              </div>
              <div></div>
              <div
                class="w-[206%] flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="cancelFunc1"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  O'zgartirish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- Edit END ---------------------------------------------------- -->

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
              Guruhni o'chirib tashlash
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
                  Siz guruhni o'chirishni xohlaysizmi?
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

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="pt-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div
        v-if="!store.PageProduct && !store.allProducts"
      >
        <Placeholder2 />
      </div>

      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div
        v-show="store.PageProduct || store.allProducts"
        class="w-full max-w-screen"
      >
        <!-- Start coding here -->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Guruhlar</h1>
            <div
              class="lg:w-auto flex flex-row items-center justify-end space-x-3"
            >
              <button
                v-show="store.guard"
                @click="toggleModal"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                <span>Guruh qo'shish</span>
              </button>
            </div>
          </div>

          <div v-show="store.guard" class="w-full lg:w-80">
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
                      store.filter = i.name;
                      searchFunc();
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table v-show="store.guard" class="w-full text-sm text-left">
              <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                <tr>
                  <th scope="col" class="text-center py-3">Nomi</th>
                  <th scope="col" class="text-center py-3">Fani</th>
                  <th scope="col" class="text-center py-3">Narxi</th>
                  <th scope="col" class="text-center py-3">
                    Boshlanish sanasi
                  </th>
                  <th scope="col" class="text-center py-3">To'liq</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-show="!store.searchList.length"
                  v-for="i in store.PageProduct"
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      <span v-for="fan in i.subject" :key="fan.id"
                        >{{ fan.subject_name }}
                      </span>
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ Number(i.price).toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.start_date }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-4">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="getOneProduct(i.id)"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
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
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      <span v-for="fan in i.subject" :key="fan.id"
                        >{{ fan.subject_name }}
                      </span>
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.price }} so'm
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.start_date }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-4">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="getOneProduct(i.id)"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-show="!store.guard" class="w-full text-sm text-left">
              <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                <tr>
                  <th scope="col" class="text-center py-3">Nomi</th>
                  <th scope="col" class="text-center py-3">Fani</th>
                  <th scope="col" class="text-center py-3">Narxi</th>
                  <th scope="col" class="text-center py-3">
                    Boshlanish sanasi
                  </th>
                  <th scope="col" class="text-center py-3">
                    Qo'shilgan sanasi
                  </th>
                  <th scope="col" class="text-center py-3">To'liq</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-for="i in store.allProducts"
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      <span v-for="fan in i.subject" :key="fan.id"
                        >{{ fan.subject_name }}
                      </span>
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ Number(i.price).toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.start_date }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.student_date }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-4">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnAdd bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="isEmpty(store.PageProduct) || isEmpty(store.allProducts)"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Guruhlar ro'yhati bo'sh</h1>
            </div>
            <div v-show="store.error" class="flex w-full justify-center">
              <h1 class="p-20 text-2xl font-medium">{{ store.allProducts }}</h1>
            </div>
          </div>
          <nav
            v-show="store.guard"
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

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();
const userRole = localStorage.getItem("role");
const modal = ref(false);
const store = reactive({
  PageProduct: null,
  page: [],
  pagination: 1,
  allProducts: null,
  subject: [{ name: "Fan yaratilmagan" }],
  employee: [{ name: "O'qituvchi yaratilmagan" }],
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
  group: [],
});

const form = reactive({
  name: "",
  start_date: "",
  price: "",
  start_time: "",
  end_time: "",
  subject: "",
  employee: "",
});

const edit = reactive({
  name: "",
  start_date: "",
  price: "",
  start_time: "",
  end_time: "",
  id: "",
  room_id: "",
  subject: "",
  employee: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
};

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = store.filter
    ? store.allProducts.filter((product) =>
        product.name.toLowerCase().includes(store.filter.toLowerCase())
      )
    : [];
}
// ---------------------------- search end ------------------------------------

function enterSlug(id, name) {
  router.push(`./groups/${id}/${name}`);
}

const toggleModal = () => {
  modal.value = !modal.value;
  Object.assign(form, {
    name: "",
    start_date: "",
    price: "",
    start_time: "",
    end_time: "",
    subject: "",
    employee: "",
  });
};

const cancelFunc = () => {
  Object.assign(form, {
    name: "",
    start_date: "",
    price: "",
    start_time: "",
    end_time: "",
    subject: "",
    employee: "",
  });
  modal.value = false;
};

const cancelFunc1 = () => {
  Object.assign(edit, {
    name: "",
    start_date: "",
    price: "",
    start_time: "",
    end_time: "",
    subject: "",
    employee: "",
    toggle: false,
  });
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

// ----------------------------------- axios --------------------------------

const getAllProduct = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/group/${localStorage.getItem("school_id")}/find`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      store.allProducts = res.data.sort((a, b) => b.id - a.id);
      store.error = false;
    } catch (error) {
      store.allProducts = error.response.data.message;
      store.error = true;
    }
  } else {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    try {
      const employeeRes = await axios.get(`/employee/${schoolId}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const employeeData = employeeRes.data;

      const groupPromises = employeeData.group.map(async (group) => {
        const groupRes = await axios.get(
          `/group/${schoolId}/${group.group_id}/not`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const groupData = groupRes.data;
        groupData.student_date = group.createdAt.split("T")[0];
        store.group.push(groupData);
        return groupData;
      });

      await Promise.all(groupPromises);

      store.allProducts = store.group;
    } catch (error) {
      console.error("Xodim va guruh ma'lumotlarini olishda xato:", error);
    }
  }
};

const getProduct = async (page) => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/group/${localStorage.getItem("school_id")}/page?page=${page}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      store.PageProduct = res.data?.data?.records;
      store.page = [
        res.data?.data?.pagination.currentPage,
        res.data?.data?.pagination.total_count,
      ];
      store.error = false;
    } catch (error) {
      store.PageProduct = error.response.data.message;
      store.error = true;
    }
  }
};

const getOneProduct = async (id) => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/group/${localStorage.getItem("school_id")}/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res);
      Object.assign(edit, {
        name: res.data.name,
        start_date: res.data.start_date,
        price: res.data.price,
        start_time: res.data.start_time,
        end_time: res.data.end_time,
        id: id,
        subject: res.data.subject[0].subject_name,
        employee: Number(res.data.employee[0].employee_id),
        room_id: res.data.room_id,
        toggle: true,
      });
    } catch (error) {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    }
  }
};

const createProduct = async () => {
  if (store.guard) {
    const data = {
      school_id: Number(localStorage.getItem("school_id")),
      name: form.name,
      start_date: form.start_date,
      price: String(form.price),
      room_id: 1,
      start_time: form.start_time,
      end_time: form.end_time,
      status: true,
    };
    try {
      const res = await axios.post("/group", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      notification.success("Guruh yaratildi");

      const subjectData = {
        group_id: res.data.group.id,
        subject_name: form.subject,
      };
      await axios.post(`/group-subject`, subjectData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const employeeData = {
        employee_id: form.employee,
        group_id: res.data.group.id,
        group_name: res.data.group.name,
      };
      await axios.post(`/employee-group`, employeeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      await getProduct(store.pagination);
      cancelFunc();
    } catch (error) {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    }
  }
};

const editProduct = async () => {
  if (store.guard) {
    const data = {
      school_id: Number(localStorage.getItem("school_id")),
      name: edit.name,
      start_date: edit.start_date,
      price: String(edit.price),
      start_time: edit.start_time,
      end_time: edit.end_time,
      room_id: edit.room_id,
    };
    try {
      await axios.put(
        `/group/${localStorage.getItem("school_id")}/${edit.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      notification.success("Guruh tahrirlandi");
      await getProduct(store.pagination);
      cancelFunc1();
    } catch (error) {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    }
  }
};

const deleteProduct = async () => {
  if (store.guard) {
    try {
      await axios.delete(
        `/group/${localStorage.getItem("school_id")}/${remove.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      notification.success("Guruh o'chirildi");
      await getProduct(store.pagination);
      remove.toggle = false;
    } catch (error) {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    }
  }
};

const getSubject = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/subject/${localStorage.getItem("school_id")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      store.subject = res.data || [{ name: "Fan yaratilmagan" }];
    } catch (error) {
      store.subject = error.response.data.message;
    }
  }
};

const getEmployee = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/employee/${localStorage.getItem("school_id")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      store.employee = res.data.filter(
        (record) => record.role == "teacher"
      ) || [{ name: "O'qituvchi yaratilmagan" }];
    } catch (error) {
      store.employee = error.response.data.message;
    }
  }
};

// Fetch all initial data on component mount
onMounted(() => {
  getProduct(store.pagination);
  getAllProduct();
  getSubject();
  getEmployee();
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
