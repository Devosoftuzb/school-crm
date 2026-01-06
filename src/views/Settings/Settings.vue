<template>
  <div class="px-2 mt-4 mb-20">
    <div v-show="!store.PageProduct">
      <Placeholder2 />
    </div>

    <section v-show="store.PageProduct" class="">
      <div class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <h1 class="w-full text-lg font-bold text-blue-700">Sozlamalar</h1>
          <div
            class="flex flex-col items-stretch w-full space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-4"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <button
              @click="toggleGeneralSettings()"
              id=""
              type="button"
              :class="
                generalSettings
                  ? 'btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
                  : 'flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
              "
            >
              <span class="">Asosiy sozlama</span>
            </button>
            <button
              @click="togglePasswordChange()"
              id=""
              type="button"
              :class="
                passwordChange
                  ? 'btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
                  : 'flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
              "
            >
              <span class="">Parolni yangilash</span>
            </button>
            <button
              v-show="userRole == '_ad_sch_' || userRole == '_ow_sch_'"
              @click="toggleSocialLink()"
              id=""
              type="button"
              :class="
                socialLink
                  ? 'btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
                  : 'flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
              "
            >
              <span class="">Ijtimoiy tarmoqlar</span>
            </button>
            <button
              v-show="userRole == '_ad_sch_' || userRole == '_ow_sch_'"
              @click="togglePaymentMethod()"
              id=""
              type="button"
              :class="
                paymentMethod
                  ? 'btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
                  : 'flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5'
              "
            >
              <span class="">To'lov turlari</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col justify-between gap-3 p-4 mb-4 shadow rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <!----------------------------------------- User settings ------------------------------------>

          <div :class="generalSettings ? 'relative w-full h-auto' : 'hidden'">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-xl sm:p-5"
              :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
              >
                <h3
                  class="text-lg font-bold"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Foydalanuvchi sozlamalari
                </h3>
              </div>
              <!-- Modal body -->
              <form
                @submit.prevent="changeInfo(edit.id)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium sm:grid-cols-3">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'liq ismi (I . F . O)</label
                    >
                    <input
                      v-model="edit.full_name"
                      type="text"
                      name="name"
                      id="name"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="To'liq ismini kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Telefon raqami</label
                    >
                    <input
                      v-model="edit.phone_number"
                      type="tel"
                      name="phone"
                      id="phone"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="Telefon raqamini kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="login"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Login</label
                    >
                    <input
                      v-model="edit.login"
                      type="text"
                      name="login"
                      id="login"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="login"
                      required
                    />
                  </div>
                </div>
                <div
                  class="flex items-center justify-end w-full pt-5 mt-5 border-t"
                >
                  <button
                    type="submit"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    O'zgartirish
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!----------------------------------------- Password change ---------------------------------->

          <div :class="passwordChange ? 'relative w-full h-auto' : 'hidden'">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-xl sm:p-5"
              :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
              >
                <h3
                  class="text-lg font-bold"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Parolni o'zgartirish
                </h3>
              </div>
              <!-- Modal body -->
              <form
                @submit.prevent="changePassword(edit.id)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium sm:grid-cols-3">
                  <div class="relative">
                    <label
                      for="password"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Joriy parol</label
                    >
                    <input
                      v-model="edit.password"
                      :type="showOldPassword ? 'text' : 'password'"
                      name="password"
                      id="password"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="********"
                      required
                    />
                    <button
                      type="button"
                      @click="showOldPassword = !showOldPassword"
                      class="absolute top-[38px] right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      aria-label="Yangi parolni ko‘rsatish"
                    >
                      <svg
                        v-if="!showOldPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>

                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.958 9.958 0 012.223-3.607m1.923-1.92A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.683 5.12M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3l18 18"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="relative">
                    <label
                      for="new_password"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Yangi parol</label
                    >
                    <input
                      v-model="edit.newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      name="new_password"
                      id="new_password"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="********"
                      required
                    />
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute top-[38px] right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      aria-label="Yangi parolni ko‘rsatish"
                    >
                      <svg
                        v-if="!showNewPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>

                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.958 9.958 0 012.223-3.607m1.923-1.92A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.683 5.12M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3l18 18"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="relative">
                    <label
                      for="confirm_password"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Yangi parolni tasdiqlang</label
                    >
                    <input
                      v-model="edit.confirmNewPassword"
                      :type="showNew2Password ? 'text' : 'password'"
                      name="confirm_password"
                      id="confirm_password"
                      class="bg-white border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="********"
                      required
                    />
                    <button
                      type="button"
                      @click="showNew2Password = !showNew2Password"
                      class="absolute top-[38px] right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      aria-label="Yangi parolni ko‘rsatish"
                    >
                      <svg
                        v-if="!showNew2Password"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>

                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.958 9.958 0 012.223-3.607m1.923-1.92A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.683 5.12M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3l18 18"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  class="flex items-center justify-end w-full pt-5 mt-5 border-t"
                >
                  <button
                    type="submit"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    O'zgartirish
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!----------------------------------------- Social Link -------------------------------------->

          <div
            :class="
              social.modal
                ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
                : 'hidden'
            "
          >
            <div class="relative w-full h-auto max-w-lg p-4">
              <div
                class="relative p-4 shadow rounded-xl sm:p-5"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
              >
                <div
                  class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
                >
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Yangi link qo'shish
                  </h3>
                  <button
                    @click="socialModal"
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
                  </button>
                </div>

                <form
                  @submit.prevent="addSocialLink"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
                    <div>
                      <label for="socil_name" class="block mb-2 text-sm"
                        >Nomi</label
                      >
                      <input
                        v-model="social.name"
                        type="text"
                        name="socil_name"
                        id="socil_name"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="Nomini kiriting"
                      />
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                  >
                    <button
                      @click="socialModal"
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

          <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
          <div
            :class="
              remove.toggle
                ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
                : 'hidden'
            "
          >
            <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
              <div
                class="relative p-4 shadow rounded-xl sm:p-5"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
              >
                <div
                  class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
                >
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Linkni o'chirib tashlash
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

                <div :class="{ darkForm: navbar.userNav }">
                  <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
                    <div>
                      <div></div>
                      <h1
                        class="text-2xl"
                        :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >
                        Siz linkni o'chirishni xohlaysizmi?
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
                        @click="deleteSocialLink"
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

          <div :class="socialLink ? 'p-4 sm:p-5' : 'hidden'">
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                Ijtimoiy tarmoqlar
              </h3>
              <div
                class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
              >
                <button
                  @click="socialModal"
                  id=""
                  type="button"
                  class="flex items-center justify-center px-4 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:py-2"
                >
                  <span class="hidden sm:block">Link qo'shish</span>
                  <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
                </button>
              </div>
            </div>
            <div
              class="relative overflow-hidden border rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border-gray-700 text-white'
                  : 'bg-white'
              "
            >
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                  <thead class="text-xs rounded-xl uppercase bg-[#4141eb]">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 text-center text-white whitespace-nowrap"
                      >
                        Nomi
                      </th>
                      <th scope="col" class="py-3 text-center text-white">
                        O'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="i in store.social_link"
                      :key="i.id"
                      class=""
                      :class="
                        navbar.userNav
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-50'
                      "
                    >
                      <th
                        scope="row"
                        class="px-8 py-3 font-medium text-center whitespace-nowrap"
                      >
                        <span>{{ i.name }}</span>
                      </th>
                      <td class="font-medium text-center whitespace-nowrap">
                        <i
                          @click="deleteFunc(i.id)"
                          class="px-5 py-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                        >
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  v-show="store.social_link == ''"
                  class="w-full p-20 text-2xl font-medium text-center max-w-screen"
                >
                  <h1>Ijtimoiy tarmoqlar ro'yhati bo'sh</h1>
                </div>
              </div>
            </div>
          </div>

          <!-------------------------------------------- Payment Method --------------------------------------------------------->

          <div
            :class="
              pay.modal
                ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
                : 'hidden'
            "
          >
            <div class="relative w-full h-auto max-w-lg p-4">
              <div
                class="relative p-4 shadow rounded-xl sm:p-5"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
              >
                <div
                  class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
                >
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Yangi to'lov turini qo'shish
                  </h3>
                  <button
                    @click="payModal"
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
                  </button>
                </div>

                <form
                  @submit.prevent="addPaymentMethod"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
                    <div>
                      <label for="method_name" class="block mb-2 text-sm"
                        >Nomi</label
                      >
                      <input
                        v-model="pay.name"
                        type="text"
                        name="method_name"
                        id="method_name"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="Nomini kiriting"
                      />
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                  >
                    <button
                      @click="payModal"
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

          <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
          <div
            :class="
              remove.payment
                ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
                : 'hidden'
            "
          >
            <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
              <div
                class="relative p-4 shadow rounded-xl sm:p-5"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
              >
                <div
                  class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
                >
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    To'lov turini o'chirib tashlash
                  </h3>
                  <button
                    @click="remove.payment = false"
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

                <div :class="{ darkForm: navbar.userNav }">
                  <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
                    <div>
                      <div></div>
                      <h1
                        class="text-2xl"
                        :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >
                        Siz to'lov turini o'chirishni xohlaysizmi?
                      </h1>
                    </div>
                    <div
                      class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                    >
                      <button
                        @click="remove.payment = false"
                        type="button"
                        class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <button
                        @click="deletePaymentMethod"
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

          <div :class="paymentMethod ? 'p-4 sm:p-5' : 'hidden'">
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                To'lov turlari
              </h3>
              <div
                class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
              >
                <button
                  @click="payModal"
                  id=""
                  type="button"
                  class="flex items-center justify-center px-4 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:py-2"
                >
                  <span class="hidden sm:block">To'lov turi qo'shish</span>
                  <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
                </button>
              </div>
            </div>
            <div
              class="relative overflow-hidden border rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border-gray-700 text-white'
                  : 'bg-white'
              "
            >
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                  <thead class="text-xs rounded-xl uppercase bg-[#4141eb]">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 text-center text-white whitespace-nowrap"
                      >
                        Nomi
                      </th>
                      <th scope="col" class="py-3 text-center text-white">
                        O'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="i in store.payment_method"
                      :key="i.id"
                      class=""
                      :class="
                        navbar.userNav
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-50'
                      "
                    >
                      <th
                        scope="row"
                        class="px-8 py-3 font-medium text-center whitespace-nowrap"
                      >
                        <span>{{ i.name }}</span>
                      </th>
                      <td class="font-medium text-center whitespace-nowrap">
                        <i
                          @click="deleteFuncPay(i.id)"
                          class="px-5 py-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                        >
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  v-show="store.payment_method == ''"
                  class="w-full p-20 text-2xl font-medium text-center max-w-screen"
                >
                  <h1>To'lov turi ro'yhati bo'sh</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useNavStore } from "../../stores/toggle";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";
import { Placeholder2 } from "../../components";

const notification = useNotificationStore();
const navbar = useNavStore();
const userRole = localStorage.getItem("role");

const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showNew2Password = ref(false);

const generalSettings = ref(true);
const toggleGeneralSettings = () => {
  generalSettings.value = true;
  passwordChange.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
};

const passwordChange = ref(false);
const togglePasswordChange = () => {
  passwordChange.value = true;
  generalSettings.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
};

const socialLink = ref(false);
const toggleSocialLink = () => {
  socialLink.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  paymentMethod.value = false;
};

const paymentMethod = ref(false);
const togglePaymentMethod = () => {
  paymentMethod.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  socialLink.value = false;
};

const store = reactive({
  PageProduct: "",
  social_link: "",
  payment_method: "",
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function deleteFuncPay(id) {
  remove.id = id;
  remove.payment = true;
}

const socialModal = () => {
  social.modal = !social.modal;
  (social.id = ""), (social.name = "");
};

const payModal = () => {
  pay.modal = !pay.modal;
  (pay.id = ""), (pay.name = "");
};

// ----------------------------------- forms -----------------------------------

const edit = reactive({
  id: "",
  full_name: "",
  phone_number: "",
  login: "",
  role: "",
  password: "",
  newPassword: "",
  confirmNewPassword: "",
});

const remove = reactive({
  id: "",
  toggle: false,
  payment: false,
});

const social = reactive({
  id: "",
  name: "",
  modal: false,
});

const pay = reactive({
  id: "",
  name: "",
  modal: false,
});

// ----------------------------------- axios --------------------------------

const getOneProduct = () => {
  const school_id = localStorage.getItem("school_id");
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // admin va teacher — employee API dan olinadi
  const employeeRoles = ["_ad_sch_", "_tch_sch_"];

  const url = employeeRoles.includes(userRole)
    ? `/employee/${school_id}/${user_id}/not`
    : `/user/${user_id}/not`;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      store.PageProduct = res.data;

      edit.id = res.data.id;
      edit.full_name = res.data.full_name;
      edit.phone_number = res.data.phone_number;
      edit.login = res.data.login;

      // faqat employee roli bo‘lsa role qo‘shamiz
      if (employeeRoles.includes(userRole)) {
        edit.role = res.data.role;
      }
    })
    .catch(() => {});
};

const changeInfo = (id) => {
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");

  const employeeRoles = ["_ad_sch_", "_tch_sch_"];

  const data = {
    full_name: edit.full_name,
    phone_number: edit.phone_number,
    login: edit.login,
  };

  if (employeeRoles.includes(userRole)) {
    data.school_id = Number(school_id);
    data.role = edit.role;
  }

  const url = employeeRoles.includes(userRole)
    ? `/employee/${school_id}/${id}`
    : `/user/${id}`;

  axios
    .put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      notification.success("Ma'lumotlar tahrirlandi");
      getOneProduct();
    })
    .catch((error) => {
      const msg = error?.response?.data?.message || "";

      if (msg.startsWith("Login")) {
        notification.warning("Bunday login mavjud! Boshqa kiritib ko'ring");
      } else {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
        );
      }
    });
};

const changePassword = (id) => {
  if (edit.newPassword !== edit.confirmNewPassword) {
    return notification.warning("Yangi kiritilgan parol tasdiqlanmadi!");
  }

  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");

  const employeeRoles = ["_ad_sch_", "_tch_sch_"];

  const data = {
    old_password: edit.password,
    new_password: edit.newPassword,
  };

  const url = employeeRoles.includes(userRole)
    ? `/employee/change-password/${school_id}/${id}`
    : `/user/change-password/${id}`;

  axios
    .post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      notification.success("Parol yangilandi!");
      getOneProduct();
    })
    .catch((error) => {
      const message = error?.response?.data?.message || "";

      if (message === "The current password did not match!") {
        notification.warning("Joriy parol mos kelmadi!");
      } else {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
        );
      }
    });
};

const getSocialLink = () => {
  if (
    localStorage.getItem("role") == "_ad_sch_" ||
    localStorage.getItem("role") == "_ow_sch_"
  ) {
    axios
      .get(`/social-media/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.social_link = res.data;
      })
      .catch((error) => {});
  }
};

const addSocialLink = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    name: social.name,
  };
  axios
    .post(`/social-media`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Ijtimoiy tarmoq qo'shildi!");
      getSocialLink();
      socialModal();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const deleteSocialLink = () => {
  axios
    .delete(`/social-media/${localStorage.getItem("school_id")}/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Ijtimoiy tarmoq o'chirildi!");
      remove.toggle = false;
      getSocialLink();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const getPaymentMethod = () => {
  if (
    localStorage.getItem("role") == "_ad_sch_" ||
    localStorage.getItem("role") == "_ow_sch_"
  ) {
    axios
      .get(`/payment-method/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.payment_method = res.data;
      })
      .catch((error) => {});
  }
};

const addPaymentMethod = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    name: pay.name,
  };
  axios
    .post(`/payment-method`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("To'lov turi qo'shildi!");
      getPaymentMethod();
      payModal();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const deletePaymentMethod = () => {
  axios
    .delete(
      `/payment-method/${localStorage.getItem("school_id")}/${remove.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      notification.success("To'lov turi o'chirildi!");
      remove.payment = false;
      getPaymentMethod();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

onMounted(() => {
  getOneProduct();
  getSocialLink();
  getPaymentMethod();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
  color: white;
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
