<template>
  <div @click="store.filter_show = false" class="px-2">
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
              Yangi o'quvchi qo'shish
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
            @submit.prevent="createProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium sm:grid-cols-2">
              <div>
                <label for="parents_fullname" class="block mb-2 text-sm"
                  >Ota-ona ism familiyasi</label
                >
                <input
                  v-model="form.parents_full_name"
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
                  v-model="form.parents_phone_number"
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
                  v-model="form.full_name"
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
                  v-model="form.phone_number"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Qo'shilgan sanasi</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
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
                    v-model="groupSearch.filter"
                    @focus="groupSearch.selectLamp = true"
                    @blur="
                      groupSearch.selectLamp = false;
                      groupSearch.filter_show = false;
                    "
                    @input="
                      groupSearch.filter_show = true;
                      searchFuncGroup();
                    "
                    type="search"
                    id="simple-search"
                    class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Guruhni tanlang yoki qidirish..."
                  />
                  <ul
                    v-show="
                      groupSearch.filter_show &&
                      groupSearch.searchList.length > 0
                    "
                    class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                  >
                    <li
                      class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                      v-for="(i, index) in groupSearch.searchList"
                      :key="index"
                      @mousedown.prevent="
                        edit.name = i.id;
                        groupSearch.filter_show = false;
                        groupSearch.filter = i.name;
                      "
                    >
                      {{ i.name }}
                    </li>
                  </ul>
                  <ul
                    v-show="groupSearch.selectLamp && !groupSearch.filter"
                    class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                  >
                    <li
                      class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                      v-for="(i, index) in store.group"
                      :key="index"
                      @mousedown.prevent="
                        edit.name = i.id;
                        groupSearch.selectLamp = false;
                        groupSearch.filter = i.name;
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

    <!-- ----------------------------------------- GROUP MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        store.groupModal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative w-full h-auto max-w-lg p-4">
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
              Guruh qo'shish va o'chirish
            </h3>
            <button
              @click="store.groupModal = false"
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
          <!-- Modal body -->
          <div class="flex flex-wrap gap-5 py-5">
            <span
              v-for="i in form.group"
              :key="i.id"
              @click="
                remove.name = i.group.name;
                removeGroups(i.id);
              "
              class="px-3 py-1 bg-gray-300 rounded"
              >{{ i.group.name }}
              <i
                class="p-1 font-bold rounded cursor-pointer bx bx-x hover:bg-gray-500"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addGroups"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
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
                  v-model="groupSearch.filter"
                  @focus="groupSearch.selectLamp = true"
                  @blur="
                    groupSearch.selectLamp = false;
                    groupSearch.filter_show = false;
                  "
                  @input="
                    groupSearch.filter_show = true;
                    searchFuncGroup();
                  "
                  type="search"
                  id="simple-search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    groupSearch.filter_show && groupSearch.searchList.length > 0
                  "
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in groupSearch.searchList"
                    :key="index"
                    @mousedown.prevent="
                      edit.name = i.id;
                      groupSearch.filter_show = false;
                      groupSearch.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
                <ul
                  v-show="groupSearch.selectLamp && !groupSearch.filter"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.group"
                    :key="index"
                    @mousedown.prevent="
                      edit.name = i.id;
                      groupSearch.selectLamp = false;
                      groupSearch.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="store.groupModal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- GROUP MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Edit MODAL ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
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
              O'quvchi ma'lumotlarini o'zgartirish
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
            @submit.prevent="editProduct"
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
              <div class="w-[205%]">
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Qo'shilgan sanasi</label
                >
                <input
                  v-model="edit.start_date"
                  type="date"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
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
              O'quvchini o'chirib tashlash
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
                  Siz o'quvchini o'chirishni xohlaysizmi?
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

    <!-- ----------------------------------------- Archive modal ---------------------------------------------------- -->
    <div
      :class="
        archive.toggle
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
              O'quvchini arxivlash
            </h3>
            <button
              @click="archive.toggle = false"
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
                  Siz o'quvchini arxivlashni xohlaysizmi?
                </h1>
              </div>
              <div
                class="flex items-center justify-between w-full pt-5 mt-5 border-t"
              >
                <button
                  @click="archive.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  @click="archiveProduct"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Arxivlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- archive modal end ---------------------------------------------------- -->

    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex flex-col justify-between w-full gap-5 pb-4 sm:flex-row sm:items-center lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">O'quvchilar</h1>
            <div
              class="flex items-center justify-end space-x-3 lg:w-auto md:space-y-0"
            >
              <button
                v-show="store.guard"
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:py-2"
              >
                <span class="hidden sm:block">O'quvchi qo'shish</span>
                <i class="block text-lg sm:hidden bx bxs-user-plus"></i>
              </button>
              <router-link
                v-show="store.guard"
                class="w-full"
                to="/students/archive"
              >
                <button
                  id=""
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-xl btnAdd2 sm:max-w-fit whitespace-nowrap focus:ring-4 focus:ring-orange-300"
                >
                  <span class="">Arxiv o'quchilar</span>
                </button>
              </router-link>
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
                  placeholder="Qidirish .."
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
          class="relative overflow-hidden shadow-md rounded-xl mb-28"
          :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Guruhi
                  </th>
                  <th scope="col" class="py-3 text-center">Telefon Raqami</th>
                  <th scope="col" class="py-3 text-center">Holati</th>
                  <th scope="col" class="py-3 text-center">To'liq</th>
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
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-5 py-2 font-medium text-center text-blue-800">
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
                        class="p-1 ml-2 font-extrabold text-white bg-blue-800 rounded-md cursor-pointer bx bx-plus"
                      ></i>
                    </div>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-show="!i.status"
                    class="px-8 py-4 font-medium text-center text-red-800"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">Faol emas</p>
                  </td>
                  <td
                    v-show="i.status"
                    class="px-8 py-4 font-medium text-center text-green-700"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">Faol</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center">
                    <button
                      @click="
                        enterSlug(
                          i.id,
                          i.full_name.split(' ').join('_').toLowerCase()
                        )
                      "
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i
                      @click="archiveFunc(i.id)"
                      class="p-2 mr-3 text-orange-600 bg-orange-300 cursor-pointer rounded-xl bx bx-archive-in focus:ring-2"
                    >
                    </i>
                    <i
                      v-show="store.guard"
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
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-5 py-2 font-medium text-center text-blue-800">
                    <div
                      class="flex gap-2 justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="id in i.group" :key="id.id"
                          >{{ id.group.name }},
                        </span>
                      </p>
                      <i
                        @click="getOneProduct(i.id, 'group')"
                        class="p-1 ml-2 font-extrabold text-white bg-blue-800 rounded-md cursor-pointer bx bx-plus"
                      ></i>
                    </div>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-show="!i.status"
                    class="px-8 py-4 font-medium text-center text-red-800"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">Faol emas</p>
                  </td>
                  <td
                    v-show="i.status"
                    class="px-8 py-4 font-medium text-center text-green-700"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">Faol</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center">
                    <button
                      @click="
                        enterSlug(
                          i.id,
                          i.full_name.split(' ').join('_').toLowerCase()
                        )
                      "
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i
                      @click="archiveFunc(i.id)"
                      class="p-2 mr-3 text-orange-600 bg-orange-300 cursor-pointer rounded-xl bx bx-archive-in focus:ring-2"
                    >
                    </i>
                    <i
                      v-show="store.guard"
                      @click="deleteFunc(i.id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="store.PageProduct.length == 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>O'quvchilar ro'yhati bo'sh</h1>
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
const userRole = localStorage.getItem("role");

const toggleModal = () => {
  modal.value = !modal.value;
  resetForm();
};

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: [],
  error: false,
  group: [{ name: "Guruh yaratilmagan" }],
  groupList: [],
  groupModal: false,
  filter: "",
  searchList: [],
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
});

const groupSearch = reactive({
  filter_show: false,
  filter: "",
  searchList: [],
  selectLamp: false,
});

const form = reactive({
  parents_full_name: "Hurmatli ota-ona",
  parents_phone_number: "+998",
  full_name: "",
  phone_number: "+998",
  group: "",
  start_date: "",
});

const edit = reactive({
  parents_full_name: "",
  parents_phone_number: "",
  full_name: "",
  phone_number: "",
  group: "",
  id: "",
  toggle: false,
  start_date: "",
});

const remove = reactive({
  id: "",
  toggle: false,
});

const archive = reactive({
  id: "",
  toggle: false,
});

const searchFunc = () => {
  store.searchList = store.allProducts.filter((item) =>
    item.full_name.toLowerCase().includes(store.filter.toLowerCase())
  );
  if (!store.filter.length) {
    store.searchList = [];
  }
};

function searchFuncGroup() {
  groupSearch.searchList = [];
  if (groupSearch.filter) {
    for (let i of store.group) {
      if (i.name.toLowerCase().includes(groupSearch.filter.toLowerCase())) {
        groupSearch.searchList.push(i);
      }
    }
  }
}

const enterSlug = (id, name) => {
  router.push(`./students/${id}/${name}`);
};

const cancelFunc = () => {
  resetForm();
  modal.value = false;
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

const archiveFunc = (id) => {
  archive.id = id;
  archive.toggle = true;
};

const resetForm = () => {
  form.parents_full_name = "Hurmatli ota-ona";
  form.parents_phone_number = "+998";
  form.full_name = "";
  form.phone_number = "+998";
  form.start_date = "";
  form.group = "";
};

const fetchData = async (url, method = "get", data = null) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
    throw error;
  }
};

const getAllProduct = async () => {
  const school_id = localStorage.getItem("school_id");
  const teacher_id = localStorage.getItem("id");

  try {
    const endpoint = store.guard
      ? `/student/${school_id}/find`
      : `/student/${school_id}/${teacher_id}/teacher-student`;

    const data = await fetchData(endpoint);

    store.allProducts = data.map((record) => {
      if (record.StudentGroups) {
        record.StudentGroups.forEach((group) => {
          group.group_name = group.Group?.name || "Noma'lum";
        });
      }
      return record;
    });

    store.error = false;
  } catch {
    store.allProducts = [];
    store.error = true;
  }
};

const getProduct = async (page) => {
  try {
    const endpoint = store.guard
      ? `/student/${localStorage.getItem("school_id")}/page?page=${page}`
      : `/student/${localStorage.getItem(
          "school_id"
        )}/teacher-student/${localStorage.getItem("id")}/page?page=${page}`;

    const data = await fetchData(endpoint);

    store.PageProduct = data?.data?.records.map((record) => {
      if (record.group) {
        record.group.forEach((group) => {
          group.group_name = group.group?.name || "Noma'lum";
        });
      }
      return record;
    });

    const pagination = data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
  } catch {
    store.PageProduct = [];
    store.error = true;
  }
};

const getGroups = async () => {
  if (store.guard) {
    try {
      const data = await fetchData(
        `/group/${localStorage.getItem("school_id")}`
      );

      store.group = data;
    } catch {
      store.group = [{ name: "Guruh yaratilmagan" }];
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
        store.groupList.push(groupData);
        return groupData;
      });

      await Promise.all(groupPromises);

      store.group = store.groupList;
    } catch (error) {
      console.error("Xodim va guruh ma'lumotlarini olishda xato:", error);
    }
  }
};

const getOneProduct = async (id, modalType) => {
  try {
    const data = await fetchData(
      `/student/${localStorage.getItem("school_id")}/${id}/studentGroup`
    );

    Object.assign(edit, data, { id });
    form.group = data.group;
    console.log(form.group);

    if (modalType === "edit") {
      edit.toggle = true;
    } else if (modalType === "group") {
      store.groupModal = true;
    }
  } catch {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createProduct = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    parents_full_name: form.parents_full_name,
    parents_phone_number: form.parents_phone_number,
    full_name: form.full_name,
    phone_number: form.phone_number,
    status: true,
    start_date: form.start_date,
    group: form.group || store.group[0],
  };

  try {
    const res = await fetchData("/student", "post", data);
    notification.success("O'quvchi qo'shildi");
    addGroupsModal(res.student.id);
    getProduct(store.pagination);
    cancelFunc();
  } catch {}
};

const editProduct = async () => {
  const data = {
    parents_full_name: edit.parents_full_name,
    parents_phone_number: edit.parents_phone_number,
    full_name: edit.full_name,
    phone_number: edit.phone_number,
    start_date: edit.start_date,
    group: edit.group,
  };

  try {
    await fetchData(
      `/student/${localStorage.getItem("school_id")}/${edit.id}`,
      "put",
      data
    );
    notification.success("O'quvchi tahrirlandi");
    getProduct(store.pagination);
    edit.toggle = false;
  } catch {}
};

const archiveProduct = async () => {
  const data = {
    status: false,
  };

  try {
    await fetchData(
      `/student/archive/${localStorage.getItem("school_id")}/${archive.id}`,
      "put",
      data
    );
    notification.success("O'quvchi arxivlandi");
    getProduct(store.pagination);
    archive.toggle = false;
  } catch {}
};

const deleteProduct = async () => {
  try {
    await fetchData(
      `/student/${localStorage.getItem("school_id")}/${remove.id}`,
      "delete"
    );
    notification.success("O'quvchi o'chirildi");
    getProduct(store.pagination);
    remove.toggle = false;
  } catch {}
};

const addGroups = async () => {
  const data = {
    student_id: Number(edit.id),
    group_id: Number(edit.name),
  };

  const info = await fetchData(
    `/student/${localStorage.getItem("school_id")}/${edit.id}/studentGroup`
  );
  const group = await fetchData(
    `/group/${localStorage.getItem("school_id")}/${data.group_id}/group`
  );

  data.group_name = group.name;
  if (info.group.some((g) => g.group_name === data.group_name)) {
    notification.warning("Bu guruh qo'shilgan");
    return;
  }

  try {
    await fetchData(`/student-group`, "post", data);
    notification.success("Guruhga qo'shildi");
    edit.name = "";
    getProduct(store.pagination);
    store.groupModal = false;
  } catch {}
};

const addGroupsModal = async (id) => {
  const data = {
    student_id: id,
    group_id: Number(edit.name),
  };

  const group = await fetchData(
    `/group/${localStorage.getItem("school_id")}/${data.group_id}/group`
  );
  data.group_name = group.name;

  try {
    await fetchData(`/student-group`, "post", data);
    getProduct(store.pagination);
  } catch {}
};

const removeGroups = async (id) => {
  try {
    await fetchData(`/student-group/${id}`, "delete");
    notification.success("Guruhdan o'chirildi");
    getProduct(store.pagination);
    store.groupModal = false;
  } catch {}
};

onMounted(() => {
  getProduct(store.pagination);
  getAllProduct();
  getGroups();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnAdd2 {
  background-image: linear-gradient(to right, white -450%, #ff9800);
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
