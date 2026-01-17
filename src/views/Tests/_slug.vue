<template>
  <div class="px-2">
    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->
    <!-- Main modal -->
    <div
      :class="
        modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative w-full h-auto max-w-lg p-4">
        <!-- Modal content -->
        <div
          class="relative p-4 shadow rounded-xl sm:p-5 sm:mt-0 mt-[100px]"
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
              Savol qo'shish
            </h3>
            <button
              @click="cancelFunc1"
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
          <form @submit.prevent="createProduct">
            <div class="grid grid-cols-1 gap-5 mb-5">
              <div>
                <label
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  for="file_input"
                  >File</label
                >
                <input
                  class="block w-full text-sm border border-gray-300 cursor-pointer rounded-xl bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
                  id="file_input"
                  @change="(e) => setImg(e)"
                  type="file"
                />
              </div>

              <div class="">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Matn tanlang</label
                >
                <select
                  v-model="form.text_id"
                  id="subject"
                  class="z-10 block w-full p-2 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Matn tanlang</option>
                  <option
                    v-for="i in store.textData"
                    :key="i.id"
                    :value="i.id"
                    :title="i.text"
                  >
                    {{ i.title }}
                  </option>
                </select>
              </div>

              <div class="">
                <label
                  for="question"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Savol</label
                >
                <textarea
                  id="question"
                  v-model="form.question"
                  rows="5"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Savolni yozing.."
                  required
                ></textarea>
              </div>
            </div>

            <!-- Dynamic Variants -->
            <div
              :class="[
                'gap-x-5',
                form.variants.length > 1 ? 'grid grid-cols-2' : 'flex flex-col',
              ]"
            >
              <div
                v-for="(variant, index) in form.variants"
                :key="index"
                :class="[
                  'mb-3',
                  // Agar oxirgi item bo‘lsa va toq bo‘lsa => w-full
                  form.variants.length % 2 === 1 &&
                  index === form.variants.length - 1
                    ? 'w-full col-span-2'
                    : '',
                ]"
              >
                <label
                  :for="'variant-' + index"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Variant {{ String.fromCharCode(65 + index) }}
                </label>
                <input
                  v-model="form.variants[index]"
                  :id="'variant-' + index"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  :placeholder="`Variant ${String.fromCharCode(
                    65 + index,
                  )} ni kiriting`"
                  required
                />
              </div>
            </div>

            <!-- Add Variant Button -->
            <button
              type="button"
              @click="addVariant"
              class="w-full mb-5 text-blue-700 underline cursor-pointer text-end"
            >
              Variant qo‘shish
            </button>

            <!-- Correct Answer Selector -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-center text-white bg-blue-700 py-1 rounded-[5px]"
                >To‘g‘ri javobni tanlang</label
              >
              <div class="flex justify-center gap-4 pt-2">
                <span
                  v-for="(variant, index) in form.variants"
                  :key="'select-' + index"
                  @click="form.true_answer = index"
                  :class="{
                    'ring-4 ring-blue-500 bg-blue-700 text-white':
                      form.true_answer === index,
                    'bg-gray-100': form.true_answer !== index,
                  }"
                  class="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer hover:bg-blue-300"
                >
                  {{ String.fromCharCode(65 + index) }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-5 mt-5 border-t">
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
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <!-- ----------------------------------------- Text Modal --------------------------------------------------- -->

    <div
      v-show="store.textModal"
      :class="
        store.textModal
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
              Yangi matn qo'shish
            </h3>
            <button
              @click="store.textModal = false"
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
          <form
            @submit.prevent="createText"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div class="">
                <label
                  for="title"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Matn mavzusiz</label
                >
                <input
                  v-model="store.textTitle"
                  type="text"
                  name="title"
                  id="title"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Matn mavzusini kiriting.."
                  required
                />
              </div>
              <div class="">
                <label
                  for="question"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Matn</label
                >
                <textarea
                  id="question"
                  v-model="store.text"
                  rows="5"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Matnni yozing.."
                  required
                ></textarea>
              </div>
              <h2 class="text-sm text-blue-700">Qo'shilgan matnlar</h2>
              <div v-for="i in store.textData" :key="i.id">
                <div class="flex items-center justify-between gap-3">
                  <h2
                    class="bg-gray-50 border border-gray-300 text-sm w-full p-2.5 rounded-xl"
                    :title="i.text"
                  >
                    {{ i.title }}
                  </h2>
                  <i
                    @click="deleteText(i.id)"
                    class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-xl sm:p-2 p-1.5 focus:ring-2"
                  >
                  </i>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="store.textModal"
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

    <!-- ----------------------------------------- Text Modal end ----------------------------------------------- -->

    <!-- ----------------------------------------- Edit MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      :class="
        edit.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-xl min-w-[30%] h-auto">
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
              Savolni tahrirlash qo'shish
            </h3>
            <button
              @click="edit.toggle = false"
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
          <form @submit.prevent="editProduct">
            <div class="grid gap-5 mb-5">
              <div>
                <label
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  for="file_input"
                  >File</label
                >
                <input
                  class="block w-full text-sm border border-gray-300 cursor-pointer rounded-xl bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
                  id="file_input"
                  @change="(e) => setImg(e)"
                  type="file"
                />
              </div>

              <div class="">
                <label
                  for="subject"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Matn tanlang</label
                >
                <select
                  v-model="edit.text_id"
                  id="subject"
                  class="z-10 block w-full p-2 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Matn tanlang</option>
                  <option
                    v-for="i in store.textData"
                    :key="i.id"
                    :value="i.id"
                    :title="i.text"
                  >
                    {{ i.title }}
                  </option>
                </select>
              </div>

              <div class="">
                <label
                  for="question"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Savol</label
                >
                <textarea
                  id="question"
                  v-model="edit.question"
                  rows="5"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Savolni yozing.."
                  required
                ></textarea>
              </div>
            </div>

            <!-- Dynamic Variants -->
            <div
              :class="[
                'gap-x-5',
                edit.variants.length > 1 ? 'grid grid-cols-2' : 'flex flex-col',
              ]"
            >
              <div
                v-for="(variant, index) in edit.variants"
                :key="index"
                :class="[
                  'mb-3 flex items-center gap-3',
                  edit.variants.length % 2 === 1 &&
                  index === edit.variants.length - 1
                    ? 'w-full col-span-2'
                    : '',
                ]"
              >
                <div>
                  <label
                    :for="'variant-' + index"
                    class="block mb-2 text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Variant {{ String.fromCharCode(65 + index) }}
                  </label>
                  <input
                    v-model="edit.variants[index].text"
                    :id="'variant-' + index"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    :placeholder="`Variant ${String.fromCharCode(
                      65 + index,
                    )} ni kiriting`"
                    required
                  />
                </div>
                <i
                  @click="deleteOption(variant.id)"
                  class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash mt-7 focus:ring-2"
                >
                </i>
              </div>
            </div>

            <!-- Add Variant Button -->
            <button
              type="button"
              @click="addVariant2"
              class="w-full mb-5 text-blue-700 underline cursor-pointer text-end"
            >
              Variant qo‘shish
            </button>

            <!-- Correct Answer Selector -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-center text-white bg-blue-700 py-1 rounded-[5px]"
                >To‘g‘ri javobni tanlang</label
              >
              <div class="flex justify-center gap-4 pt-2">
                <span
                  v-for="(variant, index) in edit.variants"
                  :key="'select-' + index"
                  @click="edit.true_answer = index"
                  :class="{
                    'ring-4 ring-blue-500 bg-blue-700 text-white':
                      edit.true_answer === index,
                    'bg-gray-100': edit.true_answer !== index,
                  }"
                  class="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer hover:bg-blue-300"
                >
                  {{ String.fromCharCode(65 + index) }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-5 mt-5 border-t">
              <button
                @click="edit.toggle = false"
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
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- Edit Modal ------------------------------------------------- -->

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
              Savolni o'chirib tashlash
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
                  Siz savolni o'chirishni xohlaysizmi?
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

    <section class="py-4 pb-20" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.allProducts">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <!-- Start coding here -->
        <div
          class="flex flex-col items-center justify-between w-full gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex flex-col items-center justify-between w-full gap-5 sm:flex-row lg:justify-start"
          >
            <h1 class="text-lg font-bold text-blue-700">Savollar</h1>
            <button
              @click="router.back(-1)"
              class="btn sm:w-auto w-full shadow-lg rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
            >
              Orqaga qaytish
            </button>
          </div>
          <div
            class="flex flex-col items-center justify-center w-full gap-3 md:flex-row lg:w-auto"
          >
            <button
              @click="modal = true"
              id=""
              type="button"
              class="btn w-full shadow-lg rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
            >
              <span>Savol qo'shish</span>
            </button>

            <button
              @click="store.textModal = true"
              id=""
              type="button"
              class="btn w-full shadow-lg rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
            >
              <span>Matn qo'shish</span>
            </button>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative p-5 overflow-hidden shadow-md rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="overflow-x-auto"
            v-for="(i, index) in store.allProducts"
            :key="i.id"
          >
            <div>
              <div
                class="flex items-center justify-between w-full gap-2 sm:gap-5"
              >
                <div
                  @click="accordion(i.id)"
                  class="w-full mb-5"
                  id="accordion-collapse-heading-1"
                >
                  <button
                    type="button"
                    class="flex items-center justify-between w-full text-left rounded-xl bg-[rgba(213,219,242,0.5)] sm:py-[18px] sm:px-[20px] py-[14px] px-[14px]"
                  >
                    <div class="flex items-center gap-3 sm:gap-5">
                      <p
                        class="btn sm:min-w-[50px] sm:min-h-[50px] min-w-[30px] min-h-[30px] sm:h-[35px] 2xl:w-[55px] 2xl:h-[50px] flex items-center font-bold justify-center text-[14px] sm:text-[16px] 2xl:text-[20px] text-white rounded-full"
                      >
                        {{ index + 1 }}
                      </p>
                      <h2 class="w-full text-[14px] sm:text-[16px]">
                        {{ i.question }}
                      </h2>
                    </div>
                    <div>
                      <i
                        :class="
                          store.plus == i.id
                            ? 'bx bx-minus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                            : 'bx bx-plus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                        "
                      ></i>
                    </div>
                  </button>
                </div>
                <div class="flex flex-col gap-2 mb-5">
                  <i
                    @click="getOneProduct(i.id)"
                    class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-xl sm:p-2 p-1.5 cursor-pointer focus:ring-2"
                  >
                  </i>
                  <i
                    @click="deleteFunc(i.id)"
                    class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-xl sm:p-2 p-1.5 focus:ring-2"
                  >
                  </i>
                </div>
              </div>
              <!-- acardion main -->
              <div :id="'answers' + i.id" class="hidden mb-5">
                <div class="mb-5">
                  <div v-if="i.file !== 'null'" class="mb-3">
                    <div v-if="isImage(i.file)">
                      <img
                        :src="getFileUrl(i.file)"
                        alt="Image"
                        loading="lazy"
                        class="w-full max-w-[320px] h-auto object-cove"
                      />
                    </div>
                    <div v-else-if="isAudio(i.file)">
                      <audio :src="getFileUrl(i.file)" controls />
                    </div>
                    <div v-else-if="isVideo(i.file)">
                      <video
                        :src="getFileUrl(i.file)"
                        controls
                        width="320"
                        height="240"
                      />
                    </div>
                    <!-- <div v-else>
                      <a :href="getFileUrl(i.file)" target="_blank"
                        >Faylni yuklab olish</a
                      >
                    </div> -->
                  </div>
                  <div
                    v-if="i.text"
                    class="flex flex-col px-5 mb-10 text-justify"
                  >
                    <h3 class="mb-2 font-bold">{{ i.text.title }}</h3>
                    <p class="whitespace-pre-line">{{ i.text.text }}</p>
                  </div>
                  <h3 class="flex px-5 text-justify">{{ i.question }}</h3>
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
                  <div
                    v-for="(ans, ansIndex) in i.option"
                    :key="ansIndex"
                    class="w-full text-justify text-black p-2.5 sm:pl-10 pl-5 text-sm rounded-xl"
                    :class="
                      ans.is_correct
                        ? 'bg-blue-300 text-blue-600'
                        : 'bg-red-300 text-red-600'
                    "
                  >
                    <strong>{{ String.fromCharCode(65 + ansIndex) }}: </strong>
                    <span>{{ ans.option }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="store.allProducts && store.error"
            class="w-full p-20 text-2xl font-medium text-center max-w-screen"
          >
            <h1>{{ store.allProducts }}</h1>
          </div>
          <div
            v-show="store.guard == 'o\'quvchi'"
            class="w-full p-20 text-2xl font-medium text-center max-w-screen"
          >
            <h1>Siz savollarni ko'rish huququga ega emassiz!</h1>
          </div>
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

const modal = ref(false);
const getImg = ref(null);

const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));
const apiUrl = computed(() => import.meta.env.VITE_API);
const testId = computed(() => router.currentRoute?.value?.params?.name);

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
};

const getFileUrl = (file) => `${apiUrl.value}/${file}`;
const isImage = (filename) => /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogg|mov)$/i.test(filename);

const setImg = (e) => {
  getImg.value = e.target.files[0];
};

const store = reactive({
  allProducts: false,
  error: false,
  subjects: [{ title: "Fan yaratilmagan" }],
  accordion: [],
  plus: "",
  guard: "",
  trueAnswers: [],
  textModal: false,
  textData: "",
  text: "",
  textTitle: "",
});

const form = reactive({
  question: "",
  variants: [""],
  true_answer: null,
  test_id: "",
  question_id: "",
  text_id: "",
});

const edit = reactive({
  question: "",
  variants: [""],
  true_answer: "",
  test_id: "",
  question_id: "",
  id: "",
  toggle: false,
  text_id: "",
});

const remove = reactive({
  id: "",
  toggle: false,
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function accordion(id) {
  store.accordion.forEach((i) => {
    if (i !== id) {
      const el = document.querySelector(`#answers${i}`);
      el?.classList.add("hidden");
    }
  });

  const show = document.querySelector(`#answers${id}`);
  show?.classList.toggle("hidden");

  if (!store.accordion.includes(id)) {
    store.accordion.push(id);
  }

  store.plus = store.plus === id ? "" : id;
}

function addVariant() {
  form.variants.push("");
}

const addVariant2 = () => {
  edit.variants.push({
    option: "",
    is_correct: false,
  });
};

function cancelFunc1() {
  Object.assign(form, {
    question: "",
    variants: [""],
    true_answer: null,
    test_id: "",
    question_id: "",
  });
  modal.value = false;
  getImg.value = "";
}

// API Functions
const getProduct = async () => {
  try {
    const res = await axios.get(`/v1/questions/all/${testId.value}`, {
      headers: authHeaders.value,
    });

    if (!res.data.length) {
      store.allProducts = "Savollar topilmadi";
      store.error = true;
      return;
    }

    store.allProducts = res.data;
    store.error = false;
  } catch (error) {
    handleError();
    store.error = true;
    console.log("error", error);
  }
};

const getOneProduct = async (id) => {
  try {
    const res = await axios.get(`/v1/questions/${id}`, {
      headers: authHeaders.value,
    });

    Object.assign(edit, {
      id: id,
      question: res.data.question,
      variants:
        res.data.option.map((opt) => ({
          text: opt.option,
          is_correct: opt.is_correct,
          id: opt.id,
        })) || [],
      true_answer: res.data.option.findIndex((opt) => opt.is_correct),
      text_id: res.data.text_id,
      toggle: true,
    });
  } catch (error) {
    console.log("error", error);
  }
};

const getText = async () => {
  try {
    const res = await axios.get(`/v1/question-text/getTestId/${testId.value}`, {
      headers: authHeaders.value,
    });
    store.textData = res.data;
  } catch (error) {
    handleError();
  }
};

const createProduct = async () => {
  if (form.true_answer === null || form.true_answer === undefined) {
    notification.warning("To'g'ri javobni belgilang!");
    return;
  }

  const options = form.variants.map((val, idx) => ({
    option: val,
    is_correct: form.true_answer === idx,
  }));

  const formData = new FormData();
  formData.append("test_id", Number(testId.value));

  if (form.text_id !== "" && form.text_id !== null) {
    formData.append("text_id", form.text_id);
  }

  formData.append("question", form.question);

  if (getImg.value) {
    formData.append("file", getImg.value);
  }

  formData.append("options", JSON.stringify(options));

  try {
    await axios.post("/v1/questions", formData, {
      headers: {
        ...authHeaders.value,
        "Content-Type": "multipart/form-data",
      },
    });
    notification.success("Savol qo'shildi");
    getProduct();
    cancelFunc1();
  } catch (error) {
    console.error(error);
    handleError("Xatolik! Nimadir noto'g'ri. Qaytadan urinib ko'ring!");
  }
};

const createText = async () => {
  try {
    const data = {
      test_id: Number(testId.value),
      title: store.textTitle,
      text: store.text,
    };

    await axios.post("/v1/question-text", data, { headers: authHeaders.value });
    notification.success("Matn qo'shildi");
    getText();
    store.text = "";
    store.textModal = false;
  } catch (error) {
    handleError("Error creating product.");
  }
};

const editProduct = async () => {
  if (edit.true_answer === null || edit.true_answer === undefined) {
    notification.warning("To'g'ri javobni belgilang!");
    return;
  }

  const options = edit.variants.map((val, idx) => ({
    id: val.id || undefined,
    option: val.text,
    is_correct: edit.true_answer === idx,
  }));

  const formData = new FormData();
  formData.append("test_id", Number(testId.value));

  if (edit.text_id !== "" && edit.test_id !== "null" && edit.text_id !== null) {
    formData.append("text_id", edit.text_id);
  }

  formData.append("question", edit.question);

  if (getImg.value) {
    formData.append("file", getImg.value);
  }

  formData.append("options", JSON.stringify(options));

  try {
    await axios.put(`/v1/questions/${edit.id}`, formData, {
      headers: {
        ...authHeaders.value,
        "Content-Type": "multipart/form-data",
      },
    });
    notification.success("Muvaffaqiyatli o'zgartirildi");
    getProduct();
    edit.toggle = false;
  } catch (error) {
    console.error("error", error);
    handleError();
  }
};

const deleteProduct = async () => {
  try {
    await axios.delete(`/v1/questions/${remove.id}`, {
      headers: authHeaders.value,
    });
    notification.success("Savol o'chirildi");
    getProduct();
    remove.toggle = false;
  } catch (error) {
    handleError();
    console.log("error", error);
  }
};

const deleteOption = async (id) => {
  try {
    await axios.delete(`/v1/option/${id}`, { headers: authHeaders.value });
    notification.success("Variant o'chirildi");
    getOneProduct(edit.id);
    remove.toggle = false;
  } catch (error) {
    handleError();
    console.log("error", error);
  }
};

const deleteText = async (id) => {
  try {
    await axios.delete(`/v1/question-text/${id}`, {
      headers: authHeaders.value,
    });
    notification.success("Matn o'chirildi");
    getText();
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getProduct();
  getText();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
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
