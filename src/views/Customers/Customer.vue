<template>
  <div @click="store.filter_show = false" class="px-2 pt-4">
    <!-- ---------------------------------------- Statistic ------------------------------------- -->

    <div
      v-show="store.pageData"
      v-for="i in store.statistic"
      :key="i"
      class="flex flex-wrap items-center justify-center cards gap-x-5 gap-y-5"
    >
      <div class="card sm:w-[295px] w-full" v-for="j in i" :key="j">
        <div
          class="relative flex flex-col min-w-0 break-words shadow-soft-xl rounded-xl bg-clip-border"
          :class="{
            'bg-slate-900': navbar.userNav,
            'bg-white': !navbar.userNav,
          }"
        >
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div
                class="flex items-center justify-between w-full px-3"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                <h3 class="text-sm font-semibold leading-normal sm:text-md">
                  {{ j.social }}
                </h3>
                <h5
                  class="p-1 px-3 text-sm font-bold text-blue-700 bg-blue-100 rounded-xl sm:text-md"
                >
                  {{ j.count.toLocaleString("uz-UZ") }} ta
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------- Statistic ------------------------------------- -->

    <!-- ----------------------------------------- Student modal ----------------------------------------------- -->

    <div
      :class="
        edit.modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative w-full h-auto max-w-3xl p-4">
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
              Mijozni o'quvchi qilish
            </h3>
            <button
              @click="edit.modal = false"
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
          <!-- Modal body -->
          <form
            @submit.prevent="createStudent"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium sm:grid-cols-2">
              <div>
                <label for="parents_fullname" class="block mb-2 text-sm"
                  >Ota-ona ism familiyasi</label
                >
                <input
                  v-model="edit.parents_full_name"
                  type="text"
                  name="parents_fullname"
                  id="parents_fullname"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="edit.modal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
      <div class="relative w-full h-auto max-w-xl p-4">
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
              Yangi mijoz qo'shish
            </h3>
            <button
              @click="toggleModal"
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
          <!-- Modal body -->
          <form
            @submit.prevent="createCustomer"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div class="">
                <label for="name" class="block mb-2 text-sm">F . I . O</label>
                <input
                  v-model="form.full_name"
                  type="phone_number"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm">Fani</label>
                <select
                  v-model="form.subject_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="toggleModal"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
      <div class="relative w-full h-auto max-w-xl p-4">
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
              Mijoz ma'lumotlarini o'zgartirish
            </h3>
            <button
              @click="edit.toggle = false"
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
          <!-- Modal body -->
          <form
            @submit.prevent="editCustomer"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div class="">
                <label for="name" class="block mb-2 text-sm">F . I . O</label>
                <input
                  v-model="edit.full_name"
                  type="name"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label for="select" class="block mb-2 text-sm">Fani</label>
                <select
                  v-model="edit.subject_id"
                  id="select"
                  class="bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="edit.toggle = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
              Mijozni o'chirib tashlash
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
                  Siz mijozni o'chirishni xohlaysizmi?
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
                  @click="deleteCustomer"
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

    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.pageData">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.pageData" class="w-full max-w-screen mb-28">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Mijozlar</h1>
            <div
              class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <button
                v-show="!store.guard"
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center px-4 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:py-2"
              >
                <span class="hidden sm:block">Mijoz qo'shish</span>
                <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
              </button>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-between w-full gap-5 sm:flex-row"
          >
            <div class="w-full">
              <select
                v-model="history.year"
                id="name"
                class="bg-white text-black rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
                required
                @change="getPageCustomer(store.pagination)"
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
            <div class="w-full">
              <select
                v-model="history.month"
                id="month"
                class="bg-white text-black rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
                @change="getPageCustomer(store.pagination)"
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
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
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
                    @input="searchName(store.filter)"
                    type="search"
                    class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Qidirish..."
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative overflow-hidden shadow-md rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs text-white uppercase rounded-xl btnAdd"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center">Telefon Raqami</th>
                  <th scope="col" class="py-3 text-center">Fani</th>
                  <th scope="col" class="py-3 text-center">Mijoz haqida</th>
                  <th scope="col" class="py-3 text-center">Mijoz oqimi</th>
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
                  v-show="!store.searchData.length"
                  v-for="i in store.pageData"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="px-8 py-3 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-8 py-2 font-medium text-center text-red-800">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td class="px-8 py-2 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.subject == null ? "..." : i.subject.name }}
                    </p>
                  </td>
                  <td class="relative px-8 py-2 font-medium text-center">
                    <div class="relative inline-block w-40 group">
                      <p class="truncate w-40 p-1 rounded-[5px]">
                        {{
                          i.description && i.description.split(" ").length > 3
                            ? i.description.split(" ").slice(0, 3).join(" ") +
                              "..."
                            : i.description
                        }}
                      </p>
                      <span
                        class="absolute hidden max-w-xs p-2 mb-1 text-sm text-blue-800 -translate-x-1/2 bg-blue-100 rounded-md shadow-lg left-1/2 bottom-full w-max group-hover:block"
                      >
                        {{ i.description }}
                      </span>
                    </div>
                  </td>

                  <td class="px-8 py-2 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.social_media.name }}
                    </p>
                  </td>
                  <td class="px-8 py-3 font-medium text-center">
                    <button
                      @click="getOneCustomer(i.id, 'student')"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2 whitespace-nowrap"
                    >
                      O'quvchi qilish
                    </button>
                  </td>
                  <td
                    v-show="!store.guard"
                    class="pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneCustomer(i.id, 'edit')"
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
                  v-show="store.searchData.length"
                  v-for="i in store.searchData"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="px-8 py-3 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-8 py-2 font-medium text-center text-red-800">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td class="px-8 py-2 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.subject == null ? "..." : i.subject.name }}
                    </p>
                  </td>
                  <td class="px-8 py-2 font-medium text-center">
                    <p
                      class="whitespace-nowrap rounded-[5px] p-1 truncate w-40 inline-flex justify-center"
                    >
                      {{ i.description === null ? "..." : i.description }}
                    </p>
                  </td>
                  <td class="px-8 py-2 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.social_media.name }}
                    </p>
                  </td>

                  <td class="px-8 py-3 font-medium text-center">
                    <button
                      @click="getOneCustomer(i.id, 'student')"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2 whitespace-nowrap"
                    >
                      O'quvchi qilish
                    </button>
                  </td>
                  <td
                    v-show="!store.guard"
                    class="pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneCustomer(i.id, 'edit')"
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
              v-show="!store.pageData || store.pageData.length === 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Mijozlar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchData.length"
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
                  store.pagination = store.page.current - 1;
                  getPageCustomer(store.pagination);
                "
              >
                <i
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
                ></i>
                <span class="hidden md:block">Oldingi</span>
              </li>
            </ul>

            <span class="text-sm text-center">
              Sahifa
              <span class="font-semibold">
                {{ (store.page.current - 1) * 15 + 1 }} -
                {{ Math.min(store.page.current * 15, store.page.total) }}
              </span>
              dan
              <span class="font-semibold">{{ store.page.total }}</span>
            </span>

            <ul class="flex items-center">
              <li
                :class="[
                  store.page.current * 15 >= store.page.total
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  store.pagination = store.page.current + 1;
                  getPageCustomer(store.pagination);
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
import { onMounted, ref, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();

const modal = ref(false);

const now = new Date();
const year = now.getFullYear();
const orqaYil = now.getFullYear() - 2;

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const toggleModal = () => {
  modal.value = !modal.value;

  Object.assign(form, {
    full_name: "",
    phone_number: "+998",
    social_media_id: "",
    subject_id: "",
    description: "",
  });

  if (!store.subject.length) getSubjects();
  if (!store.social_link.length) getSocialLink();
};

const store = reactive({
  pageData: [],
  page: { current: 1, total: 1 },
  pagination: 1,
  searchData: [],
  error: false,
  groups: [{ name: "Guruh yaratilmagan" }],
  social_link: [],
  filter: "",
  searchList: [],
  subject: [],
  statistic: false,
  curentYil: [],
  searchTimer: null,
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
  is_student: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

const history = reactive({
  year: year,
  month: "",
});


const handleError = (
  message = "Xatolik! Internetni tekshirib qaytadan urinib ko'ring!"
) => {
  notification.warning(message);
};

function cancelFunc() {
  Object.assign(form, {
    full_name: "",
    phone_number: "+998",
    social_media_id: "",
    subject_id: "",
    description: "",
  });
  modal.value = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ----------------------------------- axios so'rovlari --------------------------------
const getStatistic = async (date) => {
  try {
    const res = await axios.get(
      `/v1/statistic/customer/${schoolId.value}/${date}`,
      { headers: authHeaders.value }
    );
    store.statistic = res.data;
  } catch {}
};

const searchName = (name) => {
  clearTimeout(store.searchTimer);

  store.searchTimer = setTimeout(async () => {
    if (!name) {
      store.searchData = [];
      return;
    }

    try {
      const res = await axios.get(
        `/v1/customer/search/${schoolId.value}/${name}`,
        { headers: authHeaders.value }
      );
      store.searchData = res.data;
    } catch {
      store.searchData = [];
    }
  }, 350);
};

const getPageCustomer = async (page) => {
  try {
    const url = history.month
      ? `/v1/customer/month/${schoolId.value}/${history.year}/${history.month}/page?page=${page}`
      : `/v1/customer/year/${schoolId.value}/${history.year}/page?page=${page}`;

    const res = await axios.get(url, { headers: authHeaders.value });

    const pagination = res.data.data.pagination;
    store.pageData = res.data.data.records;
    store.page = {
      current: pagination.currentPage,
      total: pagination.total_count,
    };

    getStatistic(
      history.month ? `${history.year}-${history.month}` : history.year
    );

    store.error = false;
  } catch {
    store.pageData = [];
    store.error = true;
  }
};

const getGroups = async () => {
  try {
    const res = await axios.get(`/v1/group/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.groups = res.data;
  } catch (error) {
    store.groups = [{ name: "Guruh yaratilmagan" }];
  }
};

const getSubjects = async () => {
  try {
    const res = await axios.get(`/v1/subject/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.subject = res.data || [{ name: "Fan yaratilmagan" }];
  } catch (error) {
    store.subject = [{ name: "Fan yaratilmagan" }];
  }
};

const getSocialLink = async () => {
  try {
    const res = await axios.get(`/v1/social-media/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.social_link = res.data;
  } catch (error) {
    store.social_link = "";
  }
};

const getOneCustomer = async (id, modal) => {
  try {
    const res = await axios.get(`/v1/customer/${schoolId.value}/${id}`, {
      headers: authHeaders.value,
    });

    Object.assign(edit, res.data, {
      id,
      toggle: modal === "edit",
      modal: modal === "student",
    });

    if (modal === "student") {
      getGroups();
      remove.id = id;
    } else {
      getSubjects();
      getSocialLink();
    }
  } catch (error) {
    handleError();
  }
};

const createCustomer = async () => {
  try {
    const data = {
      ...form,
      school_id: Number(schoolId.value),
    };

    await axios.post("/v1/customer", data, { headers: authHeaders.value });

    notification.success("Mijoz qo'shildi");
    getPageCustomer(store.pagination);
    cancelFunc();
  } catch {
    handleError();
  }
};

const editCustomer = async () => {
  try {
    const data = {
      full_name: edit.full_name,
      phone_number: edit.phone_number,
      social_media_id: edit.social_media_id,
      subject_id: edit.subject_id,
      description: edit.description,
      school_id: Number(schoolId.value),
    };

    await axios.put(`/v1/customer/${schoolId.value}/${edit.id}`, data, {
      headers: authHeaders.value,
    });

    notification.success("Mijoz tahrirlandi");
    getPageCustomer(store.pagination);
    edit.toggle = false;
  } catch {
    handleError();
  }
};

const deleteCustomer = async () => {
  try {
    await axios.delete(`/v1/customer/${schoolId.value}/${remove.id}`, {
      headers: authHeaders.value,
    });

    if (remove.toggle) notification.success("Mijoz o'chirildi");
    remove.toggle = false;
    getPageCustomer(store.pagination);
  } catch (error) {
    handleError();
  }
};

const createStudent = async () => {
  try {
    const data = {
      school_id: Number(schoolId.value),
      parents_full_name: edit.parents_full_name,
      parents_phone_number: edit.parents_phone_number,
      full_name: edit.full_name,
      phone_number: edit.phone_number,
      status: true,
      group_id: edit.group_id,
    };

    await axios.post("/student", data, { headers: authHeaders.value });

    notification.success("Mijoz o'quvchiga qo'shildi");
    edit.is_student = true;
    updateStatus();

    edit.parents_full_name = "Hurmatli ota-ona";
    edit.parents_phone_number = "+998";
    edit.modal = false;
  } catch (error) {
    handleError();
  }
};

const updateStatus = async () => {
  try {
    const data = {
      is_student: edit.is_student,
    };

    await axios.put(`/v1/customer/status/${schoolId.value}/${edit.id}`, data, {
      headers: authHeaders.value,
    });

    getPageCustomer(store.pagination);
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getPageCustomer(store.pagination);

  store.curentYil = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: String(orqaYil + i),
  }));
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
