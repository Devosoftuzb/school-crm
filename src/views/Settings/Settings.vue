<template>
  <div
    class="min-h-screen px-4 py-6"
    :class="navbar.userNav ? 'bg-slate-950' : 'bg-gray-100'"
  >
    <div v-show="!store.PageProduct">
      <Placeholder2 />
    </div>

    <section v-show="store.PageProduct">
      <div class="mb-6">
        <p
          class="mb-1 text-xs font-medium tracking-widest uppercase"
          :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
        >
          Boshqaruv
        </p>
        <h1
          class="text-xl font-bold"
          :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
        >
          Sozlamalar
        </h1>
      </div>

      <!-- TABS -->
      <div class="mb-6">
        <div
          class="grid w-full grid-cols-2 gap-1 p-1 sm:inline-grid sm:w-auto rounded-xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900'
              : 'bg-white shadow-sm border border-slate-200'
          "
          :style="{
            gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))`,
          }"
        >
          <button
            @click="toggleGeneralSettings()"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              generalSettings
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Asosiy sozlama</span>
          </button>
          <button
            @click="togglePasswordChange()"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              passwordChange
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Parolni yangilash</span>
          </button>
          <button
            v-show="userRole == '_ad_sch_' || userRole == '_ow_sch_'"
            @click="toggleSocialLink()"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              socialLink
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Ijtimoiy tarmoqlar</span>
          </button>
          <button
            v-show="userRole == '_ad_sch_' || userRole == '_ow_sch_'"
            @click="togglePaymentMethod()"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              paymentMethod
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">To'lov turlari</span>
          </button>
          <button
            v-show="userRole == '_ad_sch_' || userRole == '_ow_sch_'"
            @click="toggleRoom()"
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              roomChange
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Xonalar</span>
          </button>
        </div>
      </div>

      <!----------------------------------------- User settings ------------------------------------>
      <div v-show="generalSettings">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <p
            class="mb-5 text-xs font-semibold tracking-widest uppercase"
            :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
          >
            Foydalanuvchi sozlamalari
          </p>
          <form @submit.prevent="changeInfo(edit.id)">
            <div class="grid gap-4 mb-5 sm:grid-cols-3">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  To'liq ismi (I . F . O)
                </label>
                <input
                  v-model="edit.full_name"
                  type="text"
                  name="name"
                  id="name"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="To'liq ismini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  Telefon raqami
                </label>
                <input
                  v-model="edit.phone_number"
                  type="tel"
                  name="phone"
                  id="phone"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="login"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  Login
                </label>
                <input
                  v-model="edit.login"
                  type="text"
                  name="login"
                  id="login"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="login"
                  required
                />
              </div>
            </div>
            <div
              class="flex items-center justify-end w-full pt-5 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <button
                type="submit"
                class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>

      <!----------------------------------------- Password change ---------------------------------->
      <div v-show="passwordChange">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <p
            class="mb-5 text-xs font-semibold tracking-widest uppercase"
            :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
          >
            Parolni o'zgartirish
          </p>
          <form @submit.prevent="changePassword(edit.id)">
            <div class="grid gap-4 mb-5 sm:grid-cols-3">
              <div class="relative">
                <label
                  for="password"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  Joriy parol
                </label>
                <input
                  v-model="edit.password"
                  :type="showOldPassword ? 'text' : 'password'"
                  name="password"
                  id="password"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  @click="showOldPassword = !showOldPassword"
                  class="absolute top-[38px] right-3"
                  :class="
                    navbar.userNav
                      ? 'text-slate-500 hover:text-white'
                      : 'text-slate-400 hover:text-slate-700'
                  "
                  aria-label="Parolni ko'rsatish"
                >
                  <svg
                    v-if="!showOldPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5"
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
                    class="w-5 h-5"
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
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  Yangi parol
                </label>
                <input
                  v-model="edit.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  name="new_password"
                  id="new_password"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute top-[38px] right-3"
                  :class="
                    navbar.userNav
                      ? 'text-slate-500 hover:text-white'
                      : 'text-slate-400 hover:text-slate-700'
                  "
                  aria-label="Yangi parolni ko'rsatish"
                >
                  <svg
                    v-if="!showNewPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5"
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
                    class="w-5 h-5"
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
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                >
                  Yangi parolni tasdiqlang
                </label>
                <input
                  v-model="edit.confirmNewPassword"
                  :type="showNew2Password ? 'text' : 'password'"
                  name="confirm_password"
                  id="confirm_password"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  @click="showNew2Password = !showNew2Password"
                  class="absolute top-[38px] right-3"
                  :class="
                    navbar.userNav
                      ? 'text-slate-500 hover:text-white'
                      : 'text-slate-400 hover:text-slate-700'
                  "
                  aria-label="Yangi parolni ko'rsatish"
                >
                  <svg
                    v-if="!showNew2Password"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5"
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
                    class="w-5 h-5"
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
              class="flex items-center justify-end w-full pt-5 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <button
                type="submit"
                class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>

      <!----------------------------------------- Social Link add modal ---------------------------->
      <div
        v-show="social.modal"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-lg p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                Yangi link qo'shish
              </h3>
              <button
                @click="socialModal"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <form @submit.prevent="addSocialLink">
              <div class="mb-5">
                <label
                  for="socil_name"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                  >Nomi</label
                >
                <input
                  v-model="social.name"
                  type="text"
                  name="socil_name"
                  id="socil_name"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="Nomini kiriting"
                />
              </div>
              <div
                class="flex items-center justify-between w-full pt-5 border-t"
                :class="
                  navbar.userNav ? 'border-slate-800' : 'border-slate-100'
                "
              >
                <button
                  @click="socialModal"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                  :class="
                    navbar.userNav
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  "
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Social link delete modal -->
      <div
        v-show="remove.toggle"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-md p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                Linkni o'chirib tashlash
              </h3>
              <button
                @click="remove.toggle = false"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <p
              class="mb-5 text-sm font-medium"
              :class="navbar.userNav ? 'text-slate-300' : 'text-slate-600'"
            >
              Siz linkni o'chirishni xohlaysizmi?
            </p>
            <div
              class="flex items-center justify-between w-full pt-5 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <button
                @click="remove.toggle = false"
                type="button"
                class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                :class="
                  navbar.userNav
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                "
              >
                Bekor qilish
              </button>
              <button
                @click="deleteSocialLink"
                class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-show="socialLink">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <h3
              class="text-lg font-bold"
              :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
            >
              Ijtimoiy tarmoqlar
            </h3>
            <button
              @click="socialModal"
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
            >
              <span class="hidden sm:block">Link qo'shish</span>
              <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
            </button>
          </div>
          <div
            class="overflow-hidden border rounded-2xl"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm !border-none">
                <thead
                  class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
                >
                  <tr>
                    <th scope="col" class="py-3 text-center">Nomi</th>
                    <th scope="col" class="py-3 text-center">O'chirish</th>
                  </tr>
                </thead>
                <tbody
                  :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                >
                  <tr
                    v-for="i in store.social_link"
                    :key="i.id"
                    class="border-b last:border-b-0"
                    :class="
                      navbar.userNav
                        ? 'border-slate-800 hover:bg-slate-800/50'
                        : 'border-slate-100 hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="px-8 py-3 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.name }}
                    </th>
                    <td class="font-medium text-center whitespace-nowrap">
                      <button
                        @click="deleteFunc(i.id)"
                        class="px-4 py-2 text-red-600 bg-red-100 cursor-pointer rounded-xl focus:ring-2"
                      >
                        <i class="bx bxs-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.social_link == ''"
                class="p-20 text-center text-slate-400"
              >
                Ijtimoiy tarmoqlar ro'yxati bo'sh
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-------------------------------------------- Payment Method modal -------------------------------------------------->
      <div
        v-show="pay.modal"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-lg p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                Yangi to'lov turini qo'shish
              </h3>
              <button
                @click="payModal"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <form @submit.prevent="addPaymentMethod">
              <div class="mb-5">
                <label
                  for="method_name"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                  >Nomi</label
                >
                <input
                  v-model="pay.name"
                  type="text"
                  name="method_name"
                  id="method_name"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="Nomini kiriting"
                />
              </div>
              <div
                class="flex items-center justify-between w-full pt-5 border-t"
                :class="
                  navbar.userNav ? 'border-slate-800' : 'border-slate-100'
                "
              >
                <button
                  @click="payModal"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                  :class="
                    navbar.userNav
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  "
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Payment delete modal -->
      <div
        v-show="remove.payment"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-md p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                To'lov turini o'chirib tashlash
              </h3>
              <button
                @click="remove.payment = false"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <p
              class="mb-5 text-sm font-medium"
              :class="navbar.userNav ? 'text-slate-300' : 'text-slate-600'"
            >
              Siz to'lov turini o'chirishni xohlaysizmi?
            </p>
            <div
              class="flex items-center justify-between w-full pt-5 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <button
                @click="remove.payment = false"
                type="button"
                class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                :class="
                  navbar.userNav
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                "
              >
                Bekor qilish
              </button>
              <button
                @click="deletePaymentMethod"
                class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-show="paymentMethod">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <h3
              class="text-lg font-bold"
              :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
            >
              To'lov turlari
            </h3>
            <button
              @click="payModal"
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
            >
              <span class="hidden sm:block">To'lov turi qo'shish</span>
              <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
            </button>
          </div>
          <div
            class="overflow-hidden border rounded-2xl"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm !border-none">
                <thead
                  class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
                >
                  <tr>
                    <th scope="col" class="py-3 text-center">Nomi</th>
                    <th scope="col" class="py-3 text-center">O'chirish</th>
                  </tr>
                </thead>
                <tbody
                  :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                >
                  <tr
                    v-for="i in store.payment_method"
                    :key="i.id"
                    class="border-b last:border-b-0"
                    :class="
                      navbar.userNav
                        ? 'border-slate-800 hover:bg-slate-800/50'
                        : 'border-slate-100 hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="px-8 py-3 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.name }}
                    </th>
                    <td class="font-medium text-center whitespace-nowrap">
                      <button
                        @click="deleteFuncPay(i.id)"
                        class="px-4 py-2 text-red-600 bg-red-100 cursor-pointer rounded-xl focus:ring-2"
                      >
                        <i class="bx bxs-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.payment_method == ''"
                class="p-20 text-center text-slate-400"
              >
                To'lov turi ro'yxati bo'sh
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-------------------------------------------- Room modal -------------------------------------------------->
      <div
        v-show="room.modal"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-lg p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                Yangi xona qo'shish
              </h3>
              <button
                @click="roomModal"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <form @submit.prevent="addRoom">
              <div class="mb-5">
                <label
                  for="room_name"
                  class="block mb-2 text-xs"
                  :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
                  >Nomi</label
                >
                <input
                  v-model="room.name"
                  type="text"
                  name="room_name"
                  id="room_name"
                  class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-white border-slate-200 text-slate-800'
                  "
                  placeholder="Nomini kiriting"
                />
              </div>
              <div
                class="flex items-center justify-between w-full pt-5 border-t"
                :class="
                  navbar.userNav ? 'border-slate-800' : 'border-slate-100'
                "
              >
                <button
                  @click="roomModal"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                  :class="
                    navbar.userNav
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  "
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Room delete modal -->
      <div
        v-show="remove.room"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <div class="relative w-full h-auto max-w-md p-4">
          <div
            class="p-5 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-lg'
            "
          >
            <div
              class="flex items-center justify-between pb-4 mb-4 border-b"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <h3
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                Xonani o'chirib tashlash
              </h3>
              <button
                @click="remove.room = false"
                type="button"
                class="p-1.5 rounded-xl"
                :class="
                  navbar.userNav
                    ? 'text-slate-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                "
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
            <p
              class="mb-5 text-sm font-medium"
              :class="navbar.userNav ? 'text-slate-300' : 'text-slate-600'"
            >
              Siz xonani o'chirishni xohlaysizmi?
            </p>
            <div
              class="flex items-center justify-between w-full pt-5 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <button
                @click="remove.room = false"
                type="button"
                class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                :class="
                  navbar.userNav
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                "
              >
                Bekor qilish
              </button>
              <button
                @click="deleteRoom"
                class="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-show="roomChange">
        <div
          class="p-6 rounded-2xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-slate-100 shadow-sm'
          "
        >
          <div
            class="flex items-center justify-between pb-4 mb-4 border-b"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <h3
              class="text-lg font-bold"
              :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
            >
              Xonalar
            </h3>
            <button
              @click="roomModal"
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
            >
              <span class="hidden sm:block">Xona qo'shish</span>
              <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
            </button>
          </div>
          <div
            class="overflow-hidden border rounded-2xl"
            :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm !border-none">
                <thead
                  class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
                >
                  <tr>
                    <th scope="col" class="py-3 text-center">Nomi</th>
                    <th scope="col" class="py-3 text-center">O'chirish</th>
                  </tr>
                </thead>
                <tbody
                  :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                >
                  <tr
                    v-for="i in store.room"
                    :key="i.id"
                    class="border-b last:border-b-0"
                    :class="
                      navbar.userNav
                        ? 'border-slate-800 hover:bg-slate-800/50'
                        : 'border-slate-100 hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="px-8 py-3 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.name }}
                    </th>
                    <td class="font-medium text-center whitespace-nowrap">
                      <button
                        @click="deleteFuncRoom(i.id)"
                        class="px-4 py-2 text-red-600 bg-red-100 cursor-pointer rounded-xl focus:ring-2"
                      >
                        <i class="bx bxs-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.room == ''"
                class="p-20 text-center text-slate-400"
              >
                Xona ro'yxati bo'sh
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";
import { Placeholder2 } from "../../components";

const notification = useNotificationStore();
const navbar = useNavStore();
const userRole = localStorage.getItem("role");

const tabCount = computed(() =>
  userRole == "_ad_sch_" || userRole == "_ow_sch_" ? 5 : 2,
);

const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showNew2Password = ref(false);

const generalSettings = ref(true);
const toggleGeneralSettings = () => {
  generalSettings.value = true;
  passwordChange.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
  roomChange.value = false;
};

const passwordChange = ref(false);
const togglePasswordChange = () => {
  passwordChange.value = true;
  generalSettings.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
  roomChange.value = false;
};

const socialLink = ref(false);
const toggleSocialLink = () => {
  socialLink.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  paymentMethod.value = false;
  roomChange.value = false;
};

const paymentMethod = ref(false);
const togglePaymentMethod = () => {
  paymentMethod.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  socialLink.value = false;
  roomChange.value = false;
};

const roomChange = ref(false);
const toggleRoom = () => {
  roomChange.value = true;
  paymentMethod.value = false;
  generalSettings.value = false;
  passwordChange.value = false;
  socialLink.value = false;
};

const store = reactive({
  PageProduct: "",
  social_link: "",
  payment_method: "",
  room: "",
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function deleteFuncPay(id) {
  remove.id = id;
  remove.payment = true;
}

function deleteFuncRoom(id) {
  remove.id = id;
  remove.room = true;
}

const socialModal = () => {
  social.modal = !social.modal;
  ((social.id = ""), (social.name = ""));
};

const payModal = () => {
  pay.modal = !pay.modal;
  ((pay.id = ""), (pay.name = ""));
};

const roomModal = () => {
  room.modal = !room.modal;
  ((room.id = ""), (room.name = ""));
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
  room: false,
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

const room = reactive({
  id: "",
  name: "",
  modal: false,
});

// ----------------------------------- axios --------------------------------

const getOneUser = () => {
  const school_id = localStorage.getItem("school_id");
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const employeeRoles = ["_ad_sch_", "_tch_sch_"];

  const url = employeeRoles.includes(userRole)
    ? `/v1/employee/${school_id}/${user_id}/not`
    : `/v1/user/${user_id}`;

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
    ? `/v1/employee/${school_id}/${id}`
    : `/v1/user/${id}`;

  axios
    .put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      notification.success("Ma'lumotlar tahrirlandi");
      getOneUser();
    })
    .catch((error) => {
      const msg = error?.response?.data?.message || "";

      if (msg.startsWith("Login")) {
        notification.warning("Bunday login mavjud! Boshqa kiritib ko'ring");
      } else {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
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
    ? `/v1/employee/change-password/${school_id}/${id}`
    : `/v1/user/change-password/${id}`;

  axios
    .post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      notification.success("Parol yangilandi!");
      getOneUser();
    })
    .catch((error) => {
      const message = error?.response?.data?.message || "";

      if (message === "The current password did not match!") {
        notification.warning("Joriy parol mos kelmadi!");
      } else {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
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
      .get(`/v1/social-media/add/${localStorage.getItem("school_id")}`, {
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
    .post(`/v1/social-media`, data, {
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
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

const deleteSocialLink = () => {
  axios
    .delete(
      `/v1/social-media/${localStorage.getItem("school_id")}/${remove.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .then((res) => {
      notification.success("Ijtimoiy tarmoq o'chirildi!");
      remove.toggle = false;
      getSocialLink();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

const getPaymentMethod = () => {
  if (
    localStorage.getItem("role") == "_ad_sch_" ||
    localStorage.getItem("role") == "_ow_sch_"
  ) {
    axios
      .get(`/v1/payment-method/${localStorage.getItem("school_id")}`, {
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
    .post(`/v1/payment-method`, data, {
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
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

const deletePaymentMethod = () => {
  axios
    .delete(
      `/v1/payment-method/${localStorage.getItem("school_id")}/${remove.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .then((res) => {
      notification.success("To'lov turi o'chirildi!");
      remove.payment = false;
      getPaymentMethod();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

const getRoom = () => {
  if (
    localStorage.getItem("role") == "_ad_sch_" ||
    localStorage.getItem("role") == "_ow_sch_"
  ) {
    axios
      .get(`/v1/room/all/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.room = res.data;
      })
      .catch((error) => {});
  }
};

const addRoom = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    name: room.name,
    status: "success",
  };
  axios
    .post(`/v1/room`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Xona qo'shildi!");
      getRoom();
      roomModal();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

const deleteRoom = () => {
  axios
    .delete(`/v1/room/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("Xona o'chirildi!");
      remove.room = false;
      getRoom();
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!",
      );
    });
};

onMounted(() => {
  getOneUser();
  getSocialLink();
  getPaymentMethod();
  getRoom();
});
</script>
