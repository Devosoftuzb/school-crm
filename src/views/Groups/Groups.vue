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
              Yangi guruh qo'shish
            </h3>
            <button
              @click="toggleModal"
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
          <form
            @submit.prevent="createGroup"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-2 gap-4 mb-4 font-medium">
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh narxi"
                  required
                />
              </div>
              <div>
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Darajani tanlang</label
                >
                <select
                  v-model="form.level"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Darajani tanlang</option>
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="ELEMENTARY">ELEMENTARY</option>
                  <option value="PRE INTERMEDIATE">PRE INTERMEDIATE</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="IELTS">IELTS</option>
                </select>
              </div>
              <div>
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Tugash vaqti"
                  required
                />
              </div>
              <div>
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Xona tanlang</label
                >
                <select
                  v-model="form.room_id"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Xona tanlang</option>
                  <option v-for="i in store.room" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Fan tanlang</label
                >
                <select
                  v-model="form.subject"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Fan tanlang</option>
                  <option v-for="i in store.subject" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
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
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
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
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
              Guruhni o'zgartirish
            </h3>
            <button
              @click="
                edit.toggle = !edit.toggle;
                edit.name = '';
                edit.description = '';
              "
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
          <form
            @submit.prevent="editGroup"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-2 gap-4 mb-4 font-medium">
              <div class="w-[205%]">
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh nomi"
                  required
                />
              </div>
              <div></div>
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Guruh narxi"
                  required
                />
              </div>
              <div>
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Tugash vaqti"
                  required
                />
              </div>
              <div>
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Darajani tanlang</label
                >
                <select
                  v-model="edit.level"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Darajani tanlang</option>
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="ELEMENTARY">ELEMENTARY</option>
                  <option value="PRE INTERMEDIATE">PRE INTERMEDIATE</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="IELTS">IELTS</option>
                </select>
              </div>
              <div>
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Xona tanlang</label
                >
                <select
                  v-model="edit.room_id"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Xona tanlang</option>
                  <option v-for="i in store.room" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
              <div
                class="w-[206%] flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="cancelFunc1"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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

    <!-- ----------------------------------------- Subject MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        store.subjectModal
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
              Fan qo'shish va o'chirish
            </h3>
            <button
              @click="store.subjectModal = false"
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
              v-for="i in store.groupSubject"
              :key="i.id"
              @click="
                remove.name = i.subject.name;
                removeSubject(i.id);
              "
              class="px-3 py-1 bg-gray-300 rounded"
              >{{ i.subject.name }}
              <i
                class="p-1 font-bold rounded cursor-pointer bx bx-x hover:bg-gray-500"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addSubject"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <label
                for="name"
                class="block mb-2 text-sm"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
                >Fanini tanlang</label
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
                  v-model="subjectSearch.filter"
                  @focus="subjectSearch.selectLamp = true"
                  @blur="
                    subjectSearch.selectLamp = false;
                    subjectSearch.filter_show = false;
                  "
                  @input="
                    subjectSearch.filter_show = true;
                    searchFuncSubject();
                  "
                  type="search"
                  id="simple-search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Fani tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    subjectSearch.filter_show &&
                    subjectSearch.searchList.length > 0
                  "
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in subjectSearch.searchList"
                    :key="index"
                    @mousedown.prevent="
                      edit.subject = i.id;
                      subjectSearch.filter_show = false;
                      subjectSearch.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
                <ul
                  v-show="subjectSearch.selectLamp && !subjectSearch.filter"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.subject"
                    :key="index"
                    @mousedown.prevent="
                      edit.subject = i.id;
                      subjectSearch.selectLamp = false;
                      subjectSearch.filter = i.name;
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
                @click="store.subjectModal = false"
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

    <!-- ----------------------------------------- Subject MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Employee MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        store.employeeModal
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
              O'qituvchi qo'shish va o'chirish
            </h3>
            <button
              @click="store.employeeModal = false"
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
              v-for="i in store.groupEmployee"
              :key="i.id"
              @click="
                remove.name = i.employee.full_name;
                removeEmployee(i.id);
              "
              class="px-3 py-1 bg-gray-300 rounded"
              >{{ i.employee.full_name }}
              <i
                class="p-1 font-bold rounded cursor-pointer bx bx-x hover:bg-gray-500"
              ></i
            ></span>
          </div>
          <form
            @submit.prevent="addEmployee"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <label
                for="name"
                class="block mb-2 text-sm"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
                >O'qituvchi tanlang</label
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
                  v-model="employeeSearch.filter"
                  @focus="employeeSearch.selectLamp = true"
                  @blur="
                    employeeSearch.selectLamp = false;
                    employeeSearch.filter_show = false;
                  "
                  @input="
                    employeeSearch.filter_show = true;
                    searchFuncEmployee();
                  "
                  type="search"
                  id="simple-search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="O'qituvchi tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    employeeSearch.filter_show &&
                    employeeSearch.searchList.length > 0
                  "
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in employeeSearch.searchList"
                    :key="index"
                    @mousedown.prevent="
                      edit.employee = i.id;
                      employeeSearch.filter_show = false;
                      employeeSearch.filter = i.full_name;
                    "
                  >
                    {{ i.full_name }}
                  </li>
                </ul>
                <ul
                  v-show="employeeSearch.selectLamp && !employeeSearch.filter"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.employee"
                    :key="index"
                    @mousedown.prevent="
                      edit.employee = i.id;
                      employeeSearch.selectLamp = false;
                      employeeSearch.filter = i.full_name;
                    "
                  >
                    {{ i.full_name }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="store.employeeModal = false"
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

    <!-- ----------------------------------------- Subject MODAL END ---------------------------------------------------- -->

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
              Guruhni o'chirib tashlash
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
                  Siz guruhni o'chirishni xohlaysizmi?
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
                  @click="deleteGroup"
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

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="pt-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->

      <div v-if="store.loaderTime">
        <Placeholder2 />
      </div>

      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="!store.loaderTime" class="w-full max-w-screen">
        <!-- Start coding here -->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Guruhlar</h1>
            <div
              class="flex flex-row items-center justify-end space-x-3 lg:w-auto"
            >
              <button
                v-show="store.guard"
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                <span>Guruh qo'shish</span>
              </button>
            </div>
          </div>

          <div v-show="store.guard" class="flex w-full">
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
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">Nomi</th>
                  <th scope="col" class="py-3 text-center">Fani</th>
                  <th scope="col" class="py-3 text-center">O'qituvchilari</th>
                  <th scope="col" class="py-3 text-center">Narxi</th>
                  <th scope="col" class="py-3 text-center">Darajasi</th>
                  <th scope="col" class="py-3 text-center">
                    Boshlanish sanasi
                  </th>
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
                  v-for="i in store.groupData"
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <div
                      class="flex gap-2 justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="id in i.subject" :key="id.id"
                          >{{ id.subject.name }},
                        </span>
                      </p>
                      <i
                        v-show="store.guard"
                        @click="getGroupSubject(i.subject, i.id)"
                        class="p-1 ml-2 font-extrabold text-white bg-blue-800 rounded-md cursor-pointer bx bx-plus"
                      ></i>
                    </div>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <div
                      class="flex gap-2 justify-between bg-blue-100 min-w-fit rounded-[5px] px-2 py-1 whitespace-nowrap"
                    >
                      <p>
                        <span v-for="id in i.employee" :key="id.id"
                          >{{ id.employee.full_name }},
                        </span>
                      </p>
                      <i
                        v-show="store.guard"
                        @click="getGroupEmployee(i.employee, i.id)"
                        class="p-1 ml-2 font-extrabold text-white bg-blue-800 rounded-md cursor-pointer bx bx-plus"
                      ></i>
                    </div>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                  >
                    <p class="bg-red-100 rounded-[5px] p-1">
                      {{ Number(i.price).toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-green-800 whitespace-nowrap"
                  >
                    <p class="bg-green-100 rounded-[5px] p-1">
                      {{ i.level || "No'malum" }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.start_date }}
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td>
                  <td
                    v-show="store.guard"
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneGroup(i.id)"
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
              v-if="store.groupData.length == 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Guruhlar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchLamp"
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
                    getPageGroup(store.pagination);
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
                    getPageGroup(store.pagination);
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
import { onMounted, ref, reactive, computed } from "vue";
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

const schoolId = computed(() => localStorage.getItem("school_id"));
const userId = computed(() => localStorage.getItem("id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const store = reactive({
  groupData: [],
  page: [],
  pagination: 1,
  subject: [{ name: "Fan yaratilmagan" }],
  employee: [{ name: "O'qituvchi yaratilmagan" }],
  room: [{ name: "Xona yaratilmagan" }],
  error: false,
  filter: "",
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
  searchLamp: false,
  subjectModal: false,
  employeeModal: false,
  groupSubject: [],
  groupEmployee: [],
  searchTimer: null,
  loaderTime: true,
});

const form = reactive({
  name: "",
  start_date: "",
  price: "",
  start_time: "",
  end_time: "",
  subject: "",
  employee: "",
  level: "",
  room_id: "",
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
  level: "",
  toggle: false,
});

const subjectSearch = reactive({
  filter_show: false,
  filter: "",
  searchList: [],
  selectLamp: false,
});

const employeeSearch = reactive({
  filter_show: false,
  filter: "",
  searchList: [],
  selectLamp: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
};

const resetFormData = () => ({
  name: "",
  start_date: "",
  price: "",
  start_time: "",
  end_time: "",
  subject: "",
  employee: "",
});

function enterSlug(id, name) {
  router.push(`./groups/${id}/${name}`);
}

const toggleModal = () => {
  getSubject();
  getEmployee();
  getRoom();
  modal.value = !modal.value;
  Object.assign(form, resetFormData());
};

const cancelFunc = () => {
  Object.assign(form, resetFormData());
  modal.value = false;
};

const cancelFunc1 = () => {
  Object.assign(edit, {
    ...resetFormData(),

    toggle: false,
  });
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

const createSearchFilter = (searchObj, data, key) => {
  if (!searchObj.filter) {
    searchObj.searchList = [];
    return;
  }

  const filterLower = searchObj.filter.toLowerCase();
  searchObj.searchList = data.filter((i) =>
    i[key].toLowerCase().includes(filterLower),
  );
};

function searchFuncSubject() {
  createSearchFilter(subjectSearch, store.subject, "name");
}

function searchFuncEmployee() {
  createSearchFilter(employeeSearch, store.employee, "full_name");
}

// ----------------------------------- axios --------------------------------

const getGroupSubject = async (subject, id) => {
  getSubject();
  edit.id = id;
  store.groupSubject = subject;
  store.subjectModal = true;
};

const getGroupEmployee = async (employee, id) => {
  getEmployee();
  edit.id = id;
  store.groupEmployee = employee;
  store.employeeModal = true;
};

const searchName = (name) => {
  store.searchLamp = true;
  clearTimeout(store.searchTimer);

  store.searchTimer = setTimeout(async () => {
    if (!name) {
      getPageGroup(store.pagination);
      store.searchLamp = false;
      return;
    }

    try {
      const data = await axios.get(
        `/v1/group/search/${schoolId.value}/${name}`,
        { headers: authHeaders.value },
      );
      store.groupData = data.data;
    } catch {
      getPageGroup(store.pagination);
      store.searchLamp = false;
    }
  }, 350);
};

const getPageGroup = async (page) => {
  try {
    const endpoint = store.guard
      ? `/v1/group/${schoolId.value}/page?page=${page}`
      : `/v1/group/teacher/${schoolId.value}/${userId.value}/page?page=${page}`;

    const res = await axios.get(endpoint, { headers: authHeaders.value });

    const pagination = res.data?.data?.pagination;
    store.groupData = res.data?.data?.records || [];
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
    store.loaderTime = false;
  } catch (error) {
    store.groupData = error.response?.data?.message || [];
    store.error = true;
    store.loaderTime = false;
  }
};

const getOneGroup = async (id) => {
  try {
    const res = await axios.get(`/v1/group/${schoolId.value}/${id}`, {
      headers: authHeaders.value,
    });

    Object.assign(edit, {
      name: res.data.name,
      level: res.data.level,
      start_date: res.data.start_date,
      price: res.data.price,
      start_time: res.data.start_time,
      end_time: res.data.end_time,
      id: id,
      room_id: res.data.room_id,
      toggle: true,
    });
    getRoom();
  } catch (error) {
    console.log(error);
    handleError();
  }
};

const createGroup = async () => {
  const data = {
    school_id: Number(schoolId.value),
    name: form.name,
    level: form.level,
    start_date: form.start_date,
    price: String(form.price),
    room_id: form.room_id,
    start_time: form.start_time,
    end_time: form.end_time,
    subject_id: form.subject,
    teacher_id: form.employee,
    status: true,
  };

  try {
    await axios.post("/v1/group", data, { headers: authHeaders.value });
    notification.success("Guruh yaratildi");
    await getPageGroup(store.pagination);
    cancelFunc();
  } catch (error) {
    handleError();
  }
};

const editGroup = async () => {
  const data = {
    school_id: Number(schoolId.value),
    name: edit.name,
    level: edit.level,
    start_date: edit.start_date,
    price: String(edit.price),
    start_time: edit.start_time,
    end_time: edit.end_time,
    room_id: edit.room_id,
  };

  try {
    await axios.put(`/v1/group/${schoolId.value}/${edit.id}`, data, {
      headers: authHeaders.value,
    });
    notification.success("Guruh tahrirlandi");
    await getPageGroup(store.pagination);
    cancelFunc1();
  } catch (error) {
    handleError();
  }
};

const deleteGroup = async () => {
  try {
    await axios.delete(`/v1/group/${schoolId.value}/${remove.id}`, {
      headers: authHeaders.value,
    });
    notification.success("Guruh o'chirildi");
    await getPageGroup(store.pagination);
    remove.toggle = false;
  } catch (error) {
    handleError();
  }
};

const getRoom = async () => {
  try {
    const res = await axios.get(`/v1/room/all/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.room = res.data || [{ name: "Xona yaratilmagan" }];
  } catch (error) {
    store.room = error.response?.data?.message || [
      { name: "Xona yaratilmagan" },
    ];
  }
};

const getSubject = async () => {
  try {
    const res = await axios.get(`/v1/subject/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.subject = res.data || [{ name: "Fan yaratilmagan" }];
  } catch (error) {
    store.subject = error.response?.data?.message || [
      { name: "Fan yaratilmagan" },
    ];
  }
};

const getEmployee = async () => {
  try {
    const res = await axios.get(`/v1/employee/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.employee = res.data || [{ name: "O'qituvchi yaratilmagan" }];
  } catch (error) {
    store.employee = error.response?.data?.message || [
      { name: "O'qituvchi yaratilmagan" },
    ];
  }
};

const addSubject = async () => {
  const data = {
    group_id: Number(edit.id),
    subject_id: Number(edit.subject),
  };

  try {
    await axios.post(`/v1/group-subject`, data, { headers: authHeaders.value });
    notification.success("Guruhga qo'shildi");
    edit.subject = "";
    getPageGroup(store.pagination);
    store.subjectModal = false;
  } catch (error) {
    if (error.response?.data?.message === "This subject already exists") {
      notification.warning("Bu fan allaqachon mavjud");
    } else {
      handleError();
    }
  }
};

const removeSubject = async (id) => {
  try {
    await axios.delete(`/v1/group-subject/${id}`, {
      headers: authHeaders.value,
    });
    notification.success("Guruhdan o'chirildi");
    getPageGroup(store.pagination);
    store.subjectModal = false;
  } catch {}
};

const addEmployee = async () => {
  const data = {
    group_id: Number(edit.id),
    employee_id: Number(edit.employee),
  };

  try {
    await axios.post(`/v1/employee-group`, data, {
      headers: authHeaders.value,
    });
    notification.success("Guruhga qo'shildi");
    edit.employee = "";
    getPageGroup(store.pagination);
    store.employeeModal = false;
  } catch (error) {
    if (error.response?.data?.message === "This group already exists") {
      notification.warning("Bu o'qituvchi allaqachon mavjud");
    } else {
      handleError();
    }
  }
};

const removeEmployee = async (id) => {
  try {
    await axios.delete(`/v1/employee-group/${id}`, {
      headers: authHeaders.value,
    });
    notification.success("Guruhdan o'chirildi");
    getPageGroup(store.pagination);
    store.employeeModal = false;
  } catch {}
};

onMounted(() => {
  getPageGroup(store.pagination);
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
