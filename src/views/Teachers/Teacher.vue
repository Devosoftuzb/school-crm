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
      <div class="relative p-4 max-w-5xl min-w-[40%] h-auto">
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
              Yangi xodim qo'shish
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
            <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="login"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Login</label
                >
                <input
                  v-model="form.login"
                  type="text"
                  name="login"
                  id="login"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="login"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Parol</label
                >
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  id="password"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="*********"
                  required
                />
              </div>
              <div class="sm:w-[205%]">
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >To'liq ismi (I . F . O)</label
                >
                <input
                  v-model="form.full_name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="To'liq ismini kiriting"
                  required
                />
              </div>
              <div></div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Telefon raqami</label
                >
                <input
                  v-model="form.phone_number"
                  type="tel"
                  name="phone"
                  id="phone"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Lavozimi</label
                >
                <select
                  v-model="form.role"
                  id="category"
                  class="bg-white border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Lavozim tanlang</option>
                  <option v-show="store.owner" value="administrator">
                    administrator
                  </option>
                  <option v-show="!store.owner" value="teacher">teacher</option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
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
                class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- SUBJECT MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      v-show="store.subjectModal"
      :class="
        store.subjectModal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-lg h-auto">
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
              Fan qo'shish va o'chirish
            </h3>
            <button
              @click="store.subjectModal = false"
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
            </button>
          </div>
          <!-- Modal body -->
          <div class="py-5 flex flex-wrap gap-5">
            <span
              v-for="i in edit.subject"
              :key="i.id"
              @click="
                remove.title = i.subject_name;
                removeSubjects(i.id);
              "
              class="bg-gray-300 rounded px-3 py-1 text-black"
              >{{ i.subject_name }}
              <i
                class="bx bx-x cursor-pointer hover:bg-white0 rounded font-bold p-1"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addSubjects"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div>
                <label
                  for="subject_name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fanni tanlang</label
                >
                <select
                  v-model="edit.subjectName"
                  id="subject_name"
                  class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="store.subjectModal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- SUBJECT MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- GROUP MODAL -------------------------------------------------------- -->
    <!-- Main modal -->
    <div
      :class="
        store.groupModal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-lg h-auto">
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
              Guruh qo'shish va o'chirish
            </h3>
            <button
              @click="store.groupModal = false"
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
            </button>
          </div>
          <!-- Modal body -->
          <div class="flex flex-wrap gap-5 py-5">
            <span
              v-for="i in edit.group"
              :key="i.id"
              @click="
                remove.name = i.group.name;
                removeGroups(i.id);
              "
              class="bg-gray-300 rounded px-3 py-1"
              >{{ i.group.name }}
              <i
                class="bx bx-x cursor-pointer hover:bg-white0 rounded font-bold p-1"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addGroups"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div>
                <label
                  for="group_name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Guruhni tanlang</label
                >
                <select
                  v-model="edit.groupName"
                  id="group_name"
                  class="bg-white border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Guruh tanlang</option>
                  <option v-for="i in store.group" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="store.groupModal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- GROUP MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Edit modal ---------------------------------------------------- -->
    <div
      :class="
        store.editModal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-5xl min-w-[40%] h-auto">
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
              Xodim ma'lumotlarini o'zgartirish
            </h3>
            <button
              @click="cancelFunc1"
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
            <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="edit_login"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Login</label
                >
                <input
                  v-model="edit.login"
                  type="text"
                  name="login"
                  id="edit_login"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="login"
                  required
                />
              </div>
              <!-- <div>
                <label
                  for="edit_password"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Parol</label
                >
                <input
                  v-model="edit.password"
                  type="password"
                  name="password"
                  id="edit_password"
                  class="bg-white placeholder-black border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="*********"
                />
              </div> -->
              <div class="">
                <label
                  for="edit_name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >To'liq ismi (I . F . O)</label
                >
                <input
                  v-model="edit.full_name"
                  type="text"
                  name="name"
                  id="edit_name"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="To'liq ismini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="edit_phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Telefon raqami</label
                >
                <input
                  v-model="edit.phone_number"
                  type="tel"
                  name="phone"
                  id="edit_phone"
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="edit_category"
                  class="block mb-2 text-sm font-medium"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Lavozimi</label
                >
                <select
                  v-model="edit.role"
                  id="edit_category"
                  class="bg-white border border-gray-300 text-md z-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  edit_
                  <option value="" disabled selected>Lavozim tanlang</option>
                  <option v-show="store.owner" value="administrator">
                    administrator
                  </option>
                  <option v-show="!store.owner" value="teacher">teacher</option>
                </select>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
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
                class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                O'zgartirish
              </button>
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
              Xodimni o'chirib tashlash
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
                  Siz xodimni o'chirishni xohlaysizmi?
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

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="pt-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full">
        <!-- Start coding here -->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Xodimlar</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                @click="toggleModal"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 sm:py-2"
              >
                <span class="sm:block hidden">Xodim qo'shish</span>
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
                  class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
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
          class="relative shadow-md rounded-lg overflow-hidden mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="btnAdd text-xs rounded-lg uppercase text-white">
                <tr>
                  <th scope="col" class="text-center py-3">F. I. O.</th>
                  <th scope="col" class="text-center py-3">Lavozim</th>
                  <th scope="col" class="text-center py-3">Telefon raqam</th>
                  <th scope="col" class="text-center py-3">Fanlar</th>
                  <th scope="col" class="text-center py-3">Guruhlar</th>
                  <th scope="col" class="text-center py-3">To'liq</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-white'
                  "
                  v-show="!store.searchList.length"
                  v-for="i in store.PageProduct"
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    {{ i.full_name }}
                  </td>
                  <td class="text-center font-medium text-blue-800 px-5 py-4">
                    <p
                      class="bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      {{ i.role }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-red-800 px-5 py-4">
                    <p class="bg-red-100 rounded-[5px] p-1 whitespace-nowrap">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-if="i.role == 'teacher'"
                    class="text-center font-medium text-blue-800 px-5 py-4"
                  >
                    <div
                      class="flex gap-1 justify-between text-center bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="fan in i.subject" :key="fan.id"
                          >{{ fan.subject_name }},
                        </span>
                      </p>
                      <i
                        @click="getOneProduct(i.id, 'subject')"
                        class="bx bx-plus cursor-pointer bg-blue-800 ml-2 font-extrabold text-white p-1 rounded-md"
                      ></i>
                    </div>
                  </td>
                  <td
                    v-if="i.role != 'teacher'"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    ...
                  </td>
                  <td
                    v-if="i.role == 'teacher'"
                    class="text-center font-medium text-blue-800 px-5 py-4"
                  >
                    <div
                      class="flex gap-2 justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="id in i.group" :key="id.id"
                          >{{ id.group_name }},
                        </span>
                      </p>
                      <i
                        @click="getOneProduct(i.id, 'group')"
                        class="bx bx-plus cursor-pointer bg-blue-800 ml-2 font-extrabold text-white p-1 rounded-md"
                      ></i>
                    </div>
                  </td>
                  <td
                    v-if="i.role != 'teacher'"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    ...
                  </td>
                  <td class="text-center font-medium px-5 py-4">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    v-if="i.role != 'superadmin'"
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
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
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-white'
                  "
                  v-show="store.searchList.length"
                  v-for="i in store.searchList"
                  :key="i.id"
                >
                  <th
                    scope="row"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    {{ i.full_name }}
                  </th>
                  <td class="text-center font-medium text-blue-800 px-5 py-4">
                    <p
                      class="bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      {{ i.role }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-red-800 px-5 py-4">
                    <p class="bg-red-100 rounded-[5px] p-1 whitespace-nowrap">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-if="i.role == 'teacher'"
                    class="text-center font-medium text-blue-800 px-5 py-4"
                  >
                    <div
                      class="flex gap-1 justify-between text-center bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="fan in i.subject" :key="fan.id"
                          >{{ fan.subject_name }},
                        </span>
                      </p>
                      <i
                        @click="getOneProduct(i.id, 'subject')"
                        class="bx bx-plus cursor-pointer bg-blue-800 ml-2 font-extrabold text-white p-1 rounded-md"
                      ></i>
                    </div>
                  </td>
                  <td
                    v-if="i.role != 'teacher'"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    ...
                  </td>
                  <td
                    v-if="i.role == 'teacher'"
                    class="text-center font-medium text-blue-800 px-5 py-4"
                  >
                    <div
                      class="flex gap-2 justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="id in i.group" :key="id.id"
                          >{{ id.group_name }},
                        </span>
                      </p>
                      <i
                        @click="getOneProduct(i.id, 'group')"
                        class="bx bx-plus cursor-pointer bg-blue-800 ml-2 font-extrabold text-white p-1 rounded-md"
                      ></i>
                    </div>
                  </td>
                  <td
                    v-if="i.role != 'teacher'"
                    class="text-center px-5 py-4 font-medium whitespace-nowrap"
                  >
                    ...
                  </td>
                  <td class="text-center font-medium px-5 py-4">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-4 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    v-if="i.role != 'superadmin'"
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
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
              v-show="store.PageProduct && store.error"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Ro'yhat bo'sh</h1>
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
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);
const toggleModal = () => (modal.value = !modal.value);

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: [],
  group: [{ name: "Guruh yaratilmagan" }],
  subject: [{ name: "Fan yaratilmagan" }],
  roles: "",
  error: false,
  subjectModal: false,
  groupModal: false,
  editModal: false,
  addSubject: "",
  hashed_password: "",
  guard: true,
  owner: localStorage.getItem("role") == "owner" ? true : false,
  filter: "",
  filter_show: false,
  searchList: [],
});

const form = reactive({
  full_name: "",
  phone_number: "+998",
  login: "",
  password: "",
  role: "",
  subject: "",
  group: "",
});

const edit = reactive({
  full_name: "",
  phone_number: "",
  login: "",
  password: "",
  role: "",
  subject: "",
  group: "",
  id: "",
  subjectName: "",
  groupName: "",
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ---------------------------- search ------------------------------------
const searchFunc = () => {
  store.searchList = store.allProducts.filter((product) =>
    product.full_name.toLowerCase().includes(store.filter.toLowerCase())
  );
};
// ---------------------------- search end --------------------------------

const enterSlug = (id) => {
  router.push(`./employee/${localStorage.getItem("school_id")}/${id}`);
};

const cancelFunc = () => {
  Object.keys(form).forEach((key) => (form[key] = ""));
  form.phone_number = "+998";
  modal.value = false;
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

const cancelFunc1 = () => {
  Object.keys(edit).forEach((key) => (edit[key] = ""));
  store.editModal = false;
};

// toggle
const toggle = reactive({
  subjects: [],
  groups: [],
});

// ----------------------------------- axios functions --------------------------------

const createProduct = async () => {
  const data = {
    ...form,
    school_id: Number(localStorage.getItem("school_id")),
  };
  try {
    await axios.post("/employee", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    modal.value = false;
    notification.success("Xodim yaratildi");
    await getProduct(store.pagination);
    cancelFunc();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getAllProduct = async () => {
  try {
    const res = await axios.get(
      `/employee/${localStorage.getItem("school_id")}/find`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const groupIds = res.data.flatMap(
      (record) => record.group?.map((group) => group.group_id) || []
    );
    const uniqueGroupIds = [...new Set(groupIds)];

    const groupPromises = uniqueGroupIds.map((groupId) =>
      axios.get(
        `/group/${localStorage.getItem("school_id")}/${groupId}/group`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
    const groupResponses = await Promise.all(groupPromises);
    const groups = groupResponses.reduce((acc, response) => {
      const groupData = response.data;

      if (groupData) {
        acc[groupData.id] = groupData.name;
      }
      return acc;
    }, {});

    store.allProducts = res.data
      .filter(
        (record) =>
          localStorage.getItem("role") === "_ow_sch_" ||
          record.role !== "administrator"
      )
      .map((record) => {
        if (record.group) {
          record.group.forEach((group) => {
            if (groups[group.group_id]) {
              group.group_name = groups[group.group_id];
            }
          });
        }
        return record;
      })
      .sort((a, b) => b.id - a.id);

    store.error = false;
  } catch (error) {
    store.error = true;
    store.allProducts = error.response.data.message;
  }
};

const getOneProduct = async (id, modalType) => {
  try {
    const res = await axios.get(
      `/employee/${localStorage.getItem("school_id")}/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    edit.id = res.data.id;
    if (modalType === "edit") {
      edit.full_name = res.data.full_name;
      edit.phone_number = res.data.phone_number;
      edit.login = res.data.login;
      edit.role = res.data.role;
      store.editModal = true;
    } else if (modalType === "group") {
      edit.group = res.data.group;
      store.groupModal = true;
    } else if (modalType === "subject") {
      edit.subject = res.data.subject;
      store.subjectModal = true;
    }
  } catch {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getProduct = async (page) => {
  try {
    const res = await axios.get(
      `/employee/${localStorage.getItem("school_id")}/page?page=${page}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    // Ma'lumotlar
    const records = res.data?.data?.records || [];

    // Guruh nomini to'g'ridan-to'g'ri olish
    const processedRecords = records
      .filter(
        (record) =>
          localStorage.getItem("role") === "_ow_sch_" ||
          record.role !== "administrator"
      )
      .map((record) => {
        if (record.group && Array.isArray(record.group)) {
          record.group.forEach((group) => {
            group.group_name = group.group?.name || "Noma'lum guruh";
          });
        }

        return record;
      })
      .sort((a, b) => b.id - a.id);

    store.PageProduct = processedRecords;

    const pagination = res.data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
  } catch (error) {
    store.PageProduct = error.response?.data?.message || "Xatolik yuz berdi";
    store.error = true;
  }
};

const editProduct = async () => {
  const data = { ...edit, password: edit.password || store.hashed_password };
  try {
    await axios.put(
      `/employee/${localStorage.getItem("school_id")}/${edit.id}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    notification.success("Xodim tahrirlandi");
    await getProduct(store.pagination);
    cancelFunc1();
  } catch (error) {
    console.log(error);
    
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const addSubjects = async () => {
  const data = { employee_id: edit.id, subject_name: edit.name };
  try {
    const info = await axios.get(
      `/employee/${localStorage.getItem("school_id")}/${edit.id}/subject`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    if (info.data.subject.some((i) => i.subject_name === data.subject_name)) {
      notification.warning("Bu fan qo'shilgan");
      return;
    }

    await axios.post(`/employee-subject`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Fan qo'shildi");
    await getProduct(store.pagination);
    store.subjectModal = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const addGroups = async () => {
  const data = { employee_id: edit.id, group_id: Number(edit.name) };
  try {
    const info = await axios.get(
      `/employee/${localStorage.getItem("school_id")}/${edit.id}/group`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    const group = await axios.get(
      `/group/${localStorage.getItem("school_id")}/${data.group_id}/group`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    data.group_name = group.data.name;

    if (info.data.group.some((i) => i.group_name === data.group_name)) {
      notification.warning("Bu guruh qo'shilgan");
      return;
    }

    await axios.post(`/employee-group`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Guruh qo'shildi");
    await getProduct(store.pagination);
    store.groupModal = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const removeSubjects = async (id) => {
  try {
    await axios.delete(`/employee-subject/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Fan o'shirildi");
    await getProduct(store.pagination);
    store.subjectModal = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const removeGroups = async (id) => {
  try {
    await axios.delete(`/employee-group/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Guruh o'shirildi");
    await getProduct(store.pagination);
    store.groupModal = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
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
    store.subject = res.data.length ? res.data : [{ name: "Fan yaratilmagan" }];
  } catch (error) {
    store.subject = [{ name: "Fan yaratilmagan" }];
  }
};

const getGroup = async () => {
  try {
    const res = await axios.get(`/group/${localStorage.getItem("school_id")}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    store.group = res.data.length ? res.data : [{ name: "Guruh yaratilmagan" }];
  } catch (error) {
    store.group = [{ name: "Guruh yaratilmagan" }];
  }
};

const deleteProduct = async () => {
  try {
    await axios.delete(
      `/employee/${localStorage.getItem("school_id")}/${remove.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    notification.success("Xodim o'chirildi");
    await getProduct(store.pagination);
    remove.toggle = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

onMounted(() => {
  getProduct(store.pagination);
  getAllProduct();
  getSubject();
  getGroup();
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
