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
              Yangi o'quvchi qo'shish
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
            <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="parents_fullname" class="block mb-2 text-sm"
                  >Ota-ona ism familiyasi</label
                >
                <input
                  v-model="form.parents_full_name"
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
                  v-model="form.parents_phone_number"
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
                  v-model="form.full_name"
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
                  v-model="form.phone_number"
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
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                    placeholder="Guruhni tanlang yoki qidirish..."
                  />
                  <ul
                    v-show="
                      groupSearch.filter_show &&
                      groupSearch.searchList.length > 0
                    "
                    class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                  >
                    <li
                      class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
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
                    class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                  >
                    <li
                      class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
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
              v-for="i in form.group"
              :key="i.id"
              @click="
                remove.name = i.group.name;
                removeGroups(i.id);
              "
              class="bg-gray-300 rounded px-3 py-1"
              >{{ i.group.name }}
              <i
                class="bx bx-x cursor-pointer hover:bg-gray-500 rounded font-bold p-1"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addGroups"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    groupSearch.filter_show && groupSearch.searchList.length > 0
                  "
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
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
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
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

    <!-- ----------------------------------------- Edit MODAL ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
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
              O'quvchi ma'lumotlarini o'zgartirish
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
              O'quvchini o'chirib tashlash
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
                  Siz o'quvchini o'chirishni xohlaysizmi?
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
              O'quvchini arxivlash
            </h3>
            <button
              @click="archive.toggle = false"
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
                  Siz o'quvchini arxivlashni xohlaysizmi?
                </h1>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="archive.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  @click="archiveProduct"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex flex-col sm:flex-row sm:items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">O'quvchilar</h1>
            <div
              class="lg:w-auto flex md:space-y-0 items-center justify-end space-x-3"
            >
              <button
                @click="toggleModal"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 sm:py-2"
              >
                <span class="sm:block hidden">O'quvchi qo'shish</span>
                <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
              </button>
              <router-link class="w-full" to="/students/archive">
                <button
                  id=""
                  type="button"
                  class="btnAdd2 flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  <span class="">Arxiv o'quchilar</span>
                </button>
              </router-link>
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
          class="relative shadow-md rounded-lg overflow-hidden mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th scope="col" class="text-center py-3 whitespace-nowrap">
                    Guruhi
                  </th>
                  <th scope="col" class="text-center py-3">Telefon Raqami</th>
                  <th scope="col" class="text-center py-3">Holati</th>
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
                  :key="i"
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium text-blue-800 px-5 py-2">
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
                  <td class="text-center font-medium text-red-800 px-8 py-4">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-show="!i.status"
                    class="text-center font-medium text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">Faol emas</p>
                  </td>
                  <td
                    v-show="i.status"
                    class="text-center font-medium text-green-700 px-8 py-4"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">Faol</p>
                  </td>
                  <td class="text-center font-medium px-8 py-4">
                    <button
                      @click="
                        enterSlug(
                          i.id,
                          i.full_name.split(' ').join('_').toLowerCase()
                        )
                      "
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="archiveFunc(i.id)"
                      class="bx bx-archive-in bg-orange-300 cursor-pointer text-orange-600 rounded-lg p-2 mr-3 focus:ring-2"
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
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium text-blue-800 px-5 py-2">
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
                        class="bx bx-plus cursor-pointer bg-blue-800 ml-2 font-extrabold text-white p-1 rounded-md"
                      ></i>
                    </div>
                  </td>
                  <td class="text-center font-medium text-red-800 px-8 py-4">
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ i.phone_number }}
                    </p>
                  </td>
                  <td
                    v-show="!i.status"
                    class="text-center font-medium text-red-800 px-8 py-4"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">Faol emas</p>
                  </td>
                  <td
                    v-show="i.status"
                    class="text-center font-medium text-green-700 px-8 py-4"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">Faol</p>
                  </td>
                  <td class="text-center font-medium px-8 py-4">
                    <button
                      @click="
                        enterSlug(
                          i.id,
                          i.full_name.split(' ').join('_').toLowerCase()
                        )
                      "
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="archiveFunc(i.id)"
                      class="bx bx-archive-in bg-orange-300 cursor-pointer text-orange-600 rounded-lg p-2 mr-3 focus:ring-2"
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
              <h1>O'quvchilar ro'yhati bo'sh</h1>
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
  resetForm();
};

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: [],
  error: false,
  group: [{ name: "Guruh yaratilmagan" }],
  groupModal: false,
  filter: "",
  searchList: [],
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
});

const edit = reactive({
  parents_full_name: "",
  parents_phone_number: "",
  full_name: "",
  phone_number: "",
  group: "",
  id: "",
  toggle: false,
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
  try {
    const data = await fetchData(
      `/student/${localStorage.getItem("school_id")}/find`
    );

    store.allProducts = data.map((record) => {
      if (record.group) {
        record.group.forEach((group) => {
          group.group_name = group.Group?.name || "Noma'lum";
        });
      }
      return record;
    });
  } catch {
    store.allProducts = [];
    store.error = true;
  }
};

const getProduct = async (page) => {
  try {
    const data = await fetchData(
      `/student/${localStorage.getItem("school_id")}/page?page=${page}`
    );

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
  try {
    const data = await fetchData(`/group/${localStorage.getItem("school_id")}`);

    store.group = data;
  } catch {
    store.group = [{ name: "Guruh yaratilmagan" }];
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
