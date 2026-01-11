<template>
  <div @click="store.filter_show = false" class="px-2">
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
              v-for="i in store.studentGroup"
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
                      edit.group_id = i.id;
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
                      edit.group_id = i.id;
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
            @submit.prevent="editStudent"
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
                  @click="deleteStudent"
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
              O'quvchini arxivdan chiqarish
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
                  Siz o'quvchini arxivdan chiqarishni xohlaysizmi?
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
                  @click="archiveStudent"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Arxivdan chiqarish
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
      <div v-show="store.loaderTime">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="!store.loaderTime" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Arxiv o'quvchilar</h1>
            <div
              class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <router-link to="/students">
                <button
                  id=""
                  type="button"
                  class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-xl btnAdd max-w-fit whitespace-nowrap focus:ring-4 focus:ring-blue-300"
                >
                  <span class="">Orqaga qaytish</span>
                </button>
              </router-link>
            </div>
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
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  v-for="i in store.studentData"
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
                        @click="getStudentGroup(i.group, i.id)"
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
                      @click="getOneStudent(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i
                      @click="archiveFunc(i.id)"
                      class="p-2 mr-3 text-orange-600 bg-orange-300 cursor-pointer rounded-xl bx bx-archive-in focus:ring-2"
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
              v-show="store.studentData.length === 0 || store.error"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Arxiv o'quvchilar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchLamp"
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
                    getPageStudent(store.pagination);
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
                    getPageStudent(store.pagination);
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
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const store = reactive({
  studentData: [],
  page: [],
  pagination: 1,
  error: false,
  group: [{ name: "Guruh yaratilmagan" }],
  groupModal: false,
  filter: "",
  searchList: [],
  searchTimer: null,
  searchLamp: false,
  studentGroup: [],
  loaderTime: true,
});

const groupSearch = reactive({
  filter_show: false,
  filter: "",
  searchList: [],
  selectLamp: false,
});

const edit = reactive({
  parents_full_name: "",
  parents_phone_number: "",
  full_name: "",
  phone_number: "",
  group_id: "",
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

function searchFuncGroup() {
  if (!groupSearch.filter) {
    groupSearch.searchList = [];
    return;
  }

  const filterLower = groupSearch.filter.toLowerCase();
  groupSearch.searchList = store.group.filter((i) =>
    i.name.toLowerCase().includes(filterLower)
  );
}

const handleError = (customMessage) => {
  notification.warning(
    customMessage ||
      "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!"
  );
};

const enterSlug = (id, name) => {
  router.push(`./students/${id}/${name}`);
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

const archiveFunc = (id) => {
  archive.id = id;
  archive.toggle = true;
};

const fetchData = async (url, method = "get", data = null) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: authHeaders.value,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "This group already exists") {
      notification.warning("Bu guruh allaqachon mavjud");
      throw now;
    } else {
      handleError();
      throw now;
    }
  }
};

const searchName = (name) => {
  store.searchLamp = true;
  clearTimeout(store.searchTimer);

  store.searchTimer = setTimeout(async () => {
    if (!name) {
      getPageStudent(store.pagination);
      store.searchLamp = false;
      return;
    }

    try {
      store.studentData = await fetchData(
        `/v1/student/search-archive/${schoolId.value}/${name}`
      );
    } catch {
      store.searchLamp = false;
      getPageStudent(store.pagination);
    }
  }, 350);
};

const getPageStudent = async (page) => {
  try {
    const data = await fetchData(
      `/v1/student/archive/${schoolId.value}/page?page=${page}`
    );

    store.studentData = data?.data?.records || [];

    const pagination = data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
    store.loaderTime = false;
  } catch {
    store.studentData = [];
    store.error = true;
    store.loaderTime = false;
  }
};

const getGroups = async () => {
  try {
    store.group = await fetchData(`/v1/group/add/${schoolId.value}`);
  } catch (error) {
    store.group = [{ name: "Guruh yaratilmagan" }];
    if (!store.guard) {
      console.error("Xodim va guruh ma'lumotlarini olishda xato:", error);
    }
  }
};

const getOneStudent = async (id) => {
  try {
    const data = await fetchData(`/v1/student/not/${schoolId.value}/${id}`);

    Object.assign(edit, data, { id, toggle: true });
  } catch {}
};

const getStudentGroup = async (group, id) => {
  getGroups();
  edit.id = id;
  store.studentGroup = group;
  store.groupModal = true;
};

const editStudent = async () => {
  const data = {
    parents_full_name: edit.parents_full_name,
    parents_phone_number: edit.parents_phone_number,
    full_name: edit.full_name,
    phone_number: edit.phone_number,
  };

  try {
    await fetchData(`/v1/student/${schoolId.value}/${edit.id}`, "put", data);
    notification.success("O'quvchi tahrirlandi");
    getPageStudent(store.pagination);
    edit.toggle = false;
  } catch {}
};

const archiveStudent = async () => {
  try {
    await fetchData(
      `/v1/student/archive/${schoolId.value}/${archive.id}`,
      "put",
      { status: true }
    );
    notification.success("O'quvchi arxivlandi");
    getPageStudent(store.pagination);
    archive.toggle = false;
  } catch {}
};

const deleteStudent = async () => {
  try {
    await fetchData(`/v1/student/${schoolId.value}/${remove.id}`, "delete");
    notification.success("O'quvchi o'chirildi");
    getPageStudent(store.pagination);
    remove.toggle = false;
  } catch {}
};

const addGroups = async () => {
  const data = {
    student_id: Number(edit.id),
    group_id: Number(edit.group_id),
  };

  try {
    await fetchData(`/v1/student-group`, "post", data);
    notification.success("Guruhga qo'shildi");
    edit.group_id = "";
    getPageStudent(store.pagination);
    store.groupModal = false;
  } catch {}
};

const removeGroups = async (id) => {
  try {
    await fetchData(`/v1/student-group/${id}`, "delete");
    notification.success("Guruhdan o'chirildi");
    getPageStudent(store.pagination);
    store.groupModal = false;
  } catch {}
};

onMounted(() => {
  getPageStudent(store.pagination);
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
