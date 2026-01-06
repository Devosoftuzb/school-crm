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
              Yangi o'quv markaz qo'shish
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
            @submit.prevent="createProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-2 gap-4 mb-4 font-medium">
               <div>
                <label
                  for="image"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Rasm
                </label>
                <input
                  type="file"
                  id="image"
                  @change="handleFileChange"
                  accept="image/*"
                  class="block w-full text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Nomi</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Devosoft"
                  required
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Oylik to'lov</label
                >
                <input
                  v-model="form.price"
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="300000"
                  required
                />
              </div>
              <div class="">
                <label
                  for="address"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Manzil</label
                >
                <input
                  v-model="form.address"
                  type="text"
                  name="address"
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Toshkent sh. Yakkasaroy tumani"
                  required
                />
              </div>
              <div class="w-[206%]">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Ega tanlang</label
                >
                <select
                  v-model="form.owner_id"
                  id="subject"
                  class="z-10 block w-full p-2 border border-gray-300 rounded-xl bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Ega tanlang</option>
                  <option
                    v-for="i in store.user"
                    :key="i.id"
                    :value="i.id"
                  >
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
              O'quv markazni o'zgartirish
            </h3>
            <button
              @click="edit.toggle = !edit.toggle"
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
            @submit.prevent="editProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-2 gap-4 mb-4 font-medium">
              <div>
                <label
                  for="image"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Rasm
                </label>
                <input
                  type="file"
                  id="image"
                  @change="handleFileChange"
                  accept="image/*"
                  class="block w-full text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Nomi</label
                >
                <input
                  v-model="edit.name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Devosoft"
                  required
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Oylik to'lov</label
                >
                <input
                  v-model="edit.price"
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="300000"
                  required
                />
              </div>
              <div class="">
                <label
                  for="address"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Manzil</label
                >
                <input
                  v-model="edit.address"
                  type="text"
                  name="address"
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Toshkent sh. Yakkasaroy tumani"
                  required
                />
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
              O'quv markazni o'chirib tashlash
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
                  Siz o'quv markazni o'chirishni xohlaysizmi?
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
      <div v-if="!store.PageProduct && !store.allProducts">
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
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">O'quv markazlar</h1>
            <div
              class="flex flex-row items-center justify-end space-x-3 lg:w-auto"
            >
              <button
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                <span>O'quv markaz qo'shish</span>
              </button>
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
                  placeholder="Qidirish..."
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
          class="relative overflow-hidden shadow-md rounded-xl mb-28"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center"></th>
                  <th scope="col" class="py-3 text-center">Nomi</th>
                  <th scope="col" class="py-3 text-center">Egasi F.I.O</th>
                  <th scope="col" class="py-3 text-center">Oylik to'lov</th>
                  <th scope="col" class="py-3 text-center">Manzil</th>
                  <th scope="col" class="py-3 text-center">
                    Qo'shilgan sanasi
                  </th>
                  <!-- <th scope="col" class="py-3 text-center">To'liq</th> -->
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
                    class="flex items-center justify-center py-4 pl-8 font-medium whitespace-nowrap"
                  >
                    <img
                      :src="API + '/' + i.image"
                      alt=""
                      class="rounded-full h-14 w-14"
                    />
                  </td>
                  <td
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.owner.full_name }}
                    </p>
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
                      {{ i.address }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ formatDate(i.createdAt) }}
                    </p>
                  </td>
                  <!-- <td class="px-8 py-4 font-medium text-center">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td> -->
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneProduct(i.id)"
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
                  v-show="store.searchList.length"
                  v-for="i in store.searchList"
                  :key="i.id"
                >
                  <td
                    scope="row"
                    class="flex items-center justify-center py-4 pl-8 font-medium whitespace-nowrap"
                  >
                    <img
                      :src="API + '/' + i.image"
                      alt=""
                      class="rounded-full h-14 w-14"
                    />
                  </td>
                  <td
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    {{ i.name }}
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ i.owner.full_name }}
                    </p>
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
                      {{ i.address }}
                    </p>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <p class="bg-blue-100 rounded-[5px] p-1">
                      {{ formatDate(i.createdAt) }}
                    </p>
                  </td>
                  <!-- <td class="px-8 py-4 font-medium text-center">
                    <button
                      @click="enterSlug(i.id, i.name.toLowerCase())"
                      class="btnKirish bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                    >
                      Kirish
                    </button>
                  </td> -->
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneProduct(i.id)"
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
              v-if="isEmpty(store.PageProduct) && isEmpty(store.allProducts)"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Guruhlar ro'yhati bo'sh</h1>
            </div>
            <div v-show="store.error" class="flex justify-center w-full">
              <h1 class="p-20 text-2xl font-medium">{{ store.allProducts }}</h1>
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
                    getSchoolPage(store.pagination);
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
                    getSchoolPage(store.pagination);
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
import { onMounted, ref, reactive, watch } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const API = import.meta.env.VITE_API;
const notification = useNotificationStore();
const navbar = useNavStore();
const modal = ref(false);
const store = reactive({
  PageProduct: null,
  page: [],
  pagination: 1,
  allProducts: null,
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  group: [],
  user: [],
});

const form = reactive({
  image: "",
  name: "",
  price: "",
  address: "",
  owner_id: "",
});

const edit = reactive({
  image: "",
  name: "",
  price: "",
  address: "",
  id: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

const formatDate = (d) => {
  const date = new Date(d);
  return date.toISOString().slice(0, 10);
};

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  edit.image = file;
  form.image = file;
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

// function enterSlug(id, name) {
//   router.push(`./groups/${id}/${name}`);
// }

const toggleModal = () => {
  modal.value = !modal.value;
  Object.assign(form, {
    image: "",
    name: "",
    price: "",
    address: "",
    owner_id: "",
  });
};

const cancelFunc = () => {
  Object.assign(form, {
    image: "",
    name: "",
    price: "",
    address: "",
    owner_id: "",
  });
  modal.value = false;
};

const cancelFunc1 = () => {
  Object.assign(edit, {
    image: "",
    name: "",
    price: "",
    address: "",
    toggle: false,
  });
};

const deleteFunc = (id) => {
  remove.id = id;
  remove.toggle = true;
};

// ----------------------------------- axios --------------------------------

const getAllSchool = async () => {
  try {
    const res = await axios.get(`/school`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    store.allProducts = res.data.sort((a, b) => b.id - a.id);
    store.error = false;
  } catch (error) {
    store.allProducts = error.response.data.message;
    store.error = true;
  }
};

const getSchoolPage = async (page) => {
  try {
    const res = await axios.get(`/school/page?page=${page}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
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
};

const getOneProduct = async (id) => {
  try {
    const res = await axios.get(`/school/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    Object.assign(edit, {
      name: res.data.name,
      price: res.data.price,
      address: res.data.address,
      id: id,
      toggle: true,
    });
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("price", form.price);
    formData.append("owner_id", Number(form.owner_id));

    if (form.image) {
      formData.append("image", form.image); 
    }

    const res = await axios.post("/school", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data", // ❗ muhim
      },
    });

    notification.success("School yaratildi");
    await getSchoolPage(store.pagination);
    cancelFunc();
  } catch (error) {
    console.log(error);
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const editProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", edit.name);
    formData.append("address", edit.address);
    formData.append("price", edit.price);

    if (edit.image) {
      formData.append("image", edit.image);
    }

    await axios.put(`/school/${edit.id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    notification.success("School tahrirlandi");
    await getSchoolPage(store.pagination);
    cancelFunc1();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
    console.log(error);
  }
};

const deleteProduct = async () => {
  try {
    await axios.delete(`/school/${remove.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("School o'chirildi");
    await getSchoolPage(store.pagination);
    remove.toggle = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getOwner = async () => {
  try {
    const res = await axios.get(`/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    store.user = res.data
    store.error = false;
  } catch (error) {
    store.user = error.response.data.message;
    store.error = true;
  }
};

onMounted(() => {
  getSchoolPage(store.pagination);
  getAllSchool();
  getOwner();
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
