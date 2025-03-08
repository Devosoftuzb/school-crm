<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- Student modal ----------------------------------------------- -->

    <div
      :class="
        edit.modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-3xl h-auto">
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
              Mijozni o'quvchi qilish
            </h3>
            <button
              @click="edit.modal = false"
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
          <!-- Modal body -->
          <form
            @submit.prevent="createStudent"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="parents_fullname" class="block mb-2 text-sm"
                  >Ota-ona ism familiyasi</label
                >
                <input
                  v-model="edit.parents_full_name"
                  type="text"
                  name="parents_fullname"
                  id="parents_fullname"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona ism familiyasi kiriting"
                  required
                />
              </div>
              <div>
                <label for="parents_phone" class="block mb-2 text-sm"
                  >Ota-ona raqami</label
                >
                <input
                  v-model="edit.parents_phone_number"
                  type="text"
                  name="parents_phone"
                  id="parents_phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona raqamini kiriting"
                  required
                />
              </div>
              <div class="">
                <label for="name" class="block mb-2 text-sm">F . I . O</label>
                <input
                  v-model="edit.full_name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="F . I . O"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm"
                  >Telefon raqami</label
                >
                <input
                  v-model="edit.phone_number"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div class="sm:w-[205%]">
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruhni tanlang</label
                >
                <select
                  v-model="edit.group_id"
                  id="name"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Guruh tanlang</option>
                  <option v-for="i in store.groups" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="edit.modal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- Student modal end ------------------------------------------- -->

    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      v-show="modal"
      :class="
        modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-xl h-auto">
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
              Yangi mijoz qo'shish
            </h3>
            <button
              @click="toggleModal"
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
          <!-- Modal body -->
          <form
            @submit.prevent="createProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div class="">
                <label for="name" class="block mb-2 text-sm">F . I . O</label>
                <input
                  v-model="form.full_name"
                  type="phone_number"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="F . I . O"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm"
                  >Telefon raqami</label
                >
                <input
                  v-model="form.phone_number"
                  type="phone_number"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm">Fani</label>
                <select
                  v-model="form.subject_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Fani tanlang</option>
                  <option v-for="i in store.subject" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="description" class="block mb-2 text-sm"
                  >Mijoz haqida</label
                >
                <textarea
                  v-model="form.description"
                  name="description"
                  id="description"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Mijoz haqida ma'lumot"
                ></textarea>
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm"
                  >Mijoz oqimi</label
                >
                <select
                  v-model="form.social_media_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>
                    Mijoz oqimini tanlang
                  </option>
                  <option
                    v-for="i in store.social_link"
                    :key="i.id"
                    :value="i.id"
                  >
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="toggleModal"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Edit MODAL ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-xl h-auto">
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
              Mijoz ma'lumotlarini o'zgartirish
            </h3>
            <button
              @click="edit.toggle = false"
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
          <!-- Modal body -->
          <form
            @submit.prevent="editProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div class="">
                <label for="name" class="block mb-2 text-sm">F . I . O</label>
                <input
                  v-model="edit.full_name"
                  type="name"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="F . I . O"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm"
                  >Telefon raqami</label
                >
                <input
                  v-model="edit.phone_number"
                  type="phone_number"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm">Fani</label>
                <select
                  v-model="edit.subject_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Fani tanlang</option>
                  <option v-for="i in store.subject" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="description" class="block mb-2 text-sm"
                  >Mijoz haqida</label
                >
                <textarea
                  v-model="edit.description"
                  name="description"
                  id="description"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Mijoz haqida ma'lumot"
                ></textarea>
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm"
                  >Mijoz oqimi</label
                >
                <select
                  v-model="edit.social_media_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>
                    Mijoz oqilimini tanlang
                  </option>
                  <option
                    v-for="i in store.social_link"
                    :key="i.id"
                    :value="i.id"
                  >
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="edit.toggle = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- Edit MODAL END ---------------------------------------------------- -->

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
              Mijozni o'chirib tashlash
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
                  Siz mijozni o'chirishni xohlaysizmi?
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

    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen mb-28">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Mijozlar</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                v-show="!store.guard"
                @click="toggleModal"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:py-2"
              >
                <span class="sm:block hidden">Mijoz qo'shish</span>
                <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
              </button>
            </div>
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
                  placeholder="Qidirish .."
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
                      store.filter = i.full_name;
                      searchFunc();
                    "
                  >
                    {{ i.full_name }}
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="btnAdd text-xs rounded-lg uppercase text-white"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th scope="col" class="text-center py-3">Telefon Raqami</th>
                  <th scope="col" class="text-center py-3">Fani</th>
                  <th scope="col" class="text-center py-3">Mijoz haqida</th>
                  <th scope="col" class="text-center py-3">Mijoz oqimi</th>
                  <th></th>
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
                  :key="i"
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium text-red-800 px-8 py-2">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.subject == null ? "..." : i.subject.name }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-2 relative">
                    <div class="group relative w-40 inline-block">
                      <p class="truncate w-40 p-1 rounded-[5px]">
                        {{
                          i.description && i.description.split(" ").length > 3
                            ? i.description.split(" ").slice(0, 3).join(" ") +
                              "..."
                            : i.description
                        }}
                      </p>
                      <span
                        class="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden w-max max-w-xs bg-blue-100 text-blue-800 text-sm p-2 rounded-md shadow-lg group-hover:block"
                      >
                        {{ i.description }}
                      </span>
                    </div>
                  </td>

                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.social_media.name }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="getOneProduct(i.id, 'student')"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2 whitespace-nowrap"
                    >
                      O'quvchi qilish
                    </button>
                  </td>
                  <td
                    v-show="!store.guard"
                    class="text-center whitespace-nowrap font-medium pr-5"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
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
                  :key="i"
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium text-red-800 px-8 py-2">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.subject == null ? "..." : i.subject.name }}
                    </p>
                  </td>
                  <td class="text-center font-medium px-8 py-2">
                    <p
                      class="whitespace-nowrap rounded-[5px] p-1 truncate w-40 inline-flex justify-center"
                    >
                      {{ i.description === null ? "..." : i.description }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.social_media.name }}
                    </p>
                  </td>

                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="getOneProduct(i.id, 'student')"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2 whitespace-nowrap"
                    >
                      O'quvchi qilish
                    </button>
                  </td>
                  <td
                    v-show="!store.guard"
                    class="text-center whitespace-nowrap font-medium pr-5"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
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
            <div
              v-show="!store.PageProduct"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Mijozlar ro'yhati bo'sh</h1>
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

const toggleModal = () => {
  modal.value = !modal.value;
  form.full_name = "";
  form.phone_number = "+998";
  form.social_media_id = "";
  form.subject_id = "";
  form.description = "";
};

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: [],
  error: false,
  groups: [{ name: "Guruh yaratilmagan" }],
  social_link: "",
  filter: "",
  searchList: [],
  subject: "",
});

const form = reactive({
  full_name: "",
  phone_number: "+998",
  social_media_id: "",
  subject_id: "",
  description: "",
});

const edit = reactive({
  full_name: "",
  phone_number: "",
  social_media_id: "",
  subject_id: "",
  description: "",
  group_id: "",
  parents_full_name: "Hurmatli ota-ona",
  parents_phone_number: "+998",
  id: "",
  toggle: false,
  modal: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ---------------------------- qidiruv funksiyasi ------------------------------------
function searchFunc() {
  store.searchList = store.allProducts.filter((i) =>
    i.full_name.toLowerCase().includes(store.filter.toLowerCase())
  );

  if (!store.filter.length) {
    store.searchList = [];
  }
}

function cancelFunc() {
  form.full_name = "";
  form.phone_number = "+998";
  form.social_media_id = "";
  form.subject_id = "";
  form.description = "";
  modal.value = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ----------------------------------- axios so'rovlari --------------------------------
const getAllProduct = async () => {
  try {
    const res = await axios.get(
      `/customer/${localStorage.getItem("school_id")}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    store.allProducts = res.data;
    store.error = false;
  } catch (error) {
    store.allProducts = [];
    store.error = true;
  }
};

const getProduct = async (page) => {
  try {
    const res = await axios.get(
      `/customer/${localStorage.getItem("school_id")}/page?page=${page}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    store.PageProduct = res.data?.data?.records;
    const pagination = res.data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
  } catch (error) {
    store.PageProduct = [];
    store.error = true;
  }
};

const getGroups = async () => {
  try {
    const res = await axios.get(`/group/${localStorage.getItem("school_id")}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    store.groups = res.data;
  } catch (error) {
    store.groups = [{ name: "Guruh yaratilmagan" }];
  }
};

const getSubject = async () => {
  try {
    const res = await axios.get(
      `/subject/${localStorage.getItem("school_id")}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    store.subject = res.data || [{ name: "Fan yaratilmagan" }];
  } catch (error) {
    store.subject = [{ name: "Fan yaratilmagan" }];
  }
};

const getSocialLink = async () => {
  try {
    const res = await axios.get(
      `/social-media/${localStorage.getItem("school_id")}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    store.social_link = res.data;
  } catch (error) {
    store.social_link = "";
  }
};

const getOneProduct = async (id, modal) => {
  try {
    const res = await axios.get(
      `/customer/${localStorage.getItem("school_id")}/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = res.data;
    Object.assign(edit, data, {
      id,
      toggle: modal === "edit",
      modal: modal === "student",
    });
    if (modal === "student") remove.id = id;
  } catch (error) {
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createProduct = async () => {
  try {
    const data = {
      ...form,
      school_id: Number(localStorage.getItem("school_id")),
    };
    await axios.post("/customer", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Mijoz qo'shildi");
    getProduct(store.pagination);
    cancelFunc();
  } catch (error) {
    console.log(error);
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const editProduct = async () => {
  try {
    const data = {
      ...edit,
      school_id: Number(localStorage.getItem("school_id")),
    };
    await axios.put(
      `/customer/${localStorage.getItem("school_id")}/${edit.id}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    notification.success("Mijoz tahrirlandi");
    getProduct(store.pagination);
    edit.toggle = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const deleteProduct = async () => {
  try {
    await axios.delete(
      `/customer/${localStorage.getItem("school_id")}/${remove.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (remove.toggle) notification.success("Mijoz o'chirildi");
    remove.toggle = false;
    getProduct(store.pagination);
  } catch (error) {
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createStudent = async () => {
  try {
    const data = {
      school_id: Number(localStorage.getItem("school_id")),
      parents_full_name: edit.parents_full_name,
      parents_phone_number: edit.parents_phone_number,
      full_name: edit.full_name,
      phone_number: edit.phone_number,
      status: true,
    };
    const res = await axios.post("/student", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Mijoz o'quvchiga qo'shildi");
    deleteProduct();
    addGroupsModal(res.data.student.id);
    edit.parents_full_name = "Hurmatli ota-ona";
    edit.parents_phone_number = "+998";
    edit.modal = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const addGroupsModal = async (id) => {
  try {
    const groupRes = await axios.get(
      `/group/${localStorage.getItem("school_id")}/${edit.group_id}/group`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = {
      student_id: id,
      group_id: Number(edit.group_id),
      group_name: groupRes.data.name,
    };
    await axios.post("/student-group", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    edit.group_id = "";
    getProduct(store.pagination);
  } catch (error) {
    notification.warning(
      "Xatolik! Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

onMounted(() => {
  getProduct(store.pagination);
  getAllProduct();
  getGroups();
  getSubject();
  getSocialLink();
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
</style>
