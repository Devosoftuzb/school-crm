<template>
  <div class="px-2">
    <section class="pt-4" :class="{ 'text-white': navbar.userNav }">
      <div v-show="!store.CostPageProduct && !store.SalaryPageProduct">
        <Placeholder2 />
      </div>

      <!-- ---------------------------------------------- cost category create modal -------------------------------------------------- -->
      <div
        @click.self="costCategoryModal"
        :class="
          costCategory.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Kategoriya kiritish
                  </h3>
                  <button
                    @click="costCategoryModal"
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
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="createCostCategory"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="name" class="block mb-2 text-sm"
                      >Nomini kiriting</label
                    >
                    <input
                      v-model="costCategory.categoryName"
                      id="name"
                      type="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="Suv uchun"
                      required
                    />
                  </div>
                  <h2 class="text-sm text-blue-700">
                    Qo'shilgan kategoriyalar
                  </h2>
                  <div v-for="i in store.costCategory" :key="i.id">
                    <div class="flex items-center justify-between gap-3">
                      <h2
                        class="bg-gray-50 border text-black border-gray-300 text-sm w-full p-2.5 rounded-lg"
                      >
                        {{ i.name }}
                      </h2>
                      <i
                        @click="deleteCostCategoryFunc(i.id)"
                        class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg sm:p-2 p-1.5 focus:ring-2"
                      >
                      </i>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                >
                  <div class="w-full flex items-center justify-between">
                    <button
                      @click="costCategoryModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ---------------------------------------------- cost category create modal end ---------------------------------------------- -->

      <!-- ----------------------------------------- cost category delete modal ---------------------------------------------------- -->
      <div
        :class="
          costCategory.remove
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
                Kategoriyani o'chirib tashlash
              </h3>
              <button
                @click="costCategory.remove = false"
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
                    Siz kategoriyani o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="costCategory.remove = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteCostCategory"
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
      <!-- ----------------------------------------- cost category delete modal end ---------------------------------------------------- -->

      <!-- ---------------------------------------------- cost create modal -------------------------------------------------- -->
      <div
        @click.self="costModal"
        :class="
          cost.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Chiqimni kiritish
                  </h3>
                  <button
                    @click="costModal"
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
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="createCost"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="price" class="block mb-2 text-sm"
                      >Sumani kiriting</label
                    >
                    <input
                      v-model="cost.price"
                      id="price"
                      type="number"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="100000 so'm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Kategoriyani tanlang</label
                    >
                    <select
                      v-model="cost.category_id"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        Kategoriyani tanlang
                      </option>
                      <option
                        v-for="i in store.costCategory"
                        :key="i.id"
                        :value="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="cost.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="cost.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
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
                  <div>
                    <label for="description" class="block mb-2 text-sm"
                      >Izoh kiriting</label
                    >

                    <textarea
                      v-model="cost.description"
                      name="description"
                      id="description"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3 h-32"
                      placeholder="Izoh.."
                    ></textarea>
                  </div>
                </div>
                <div
                  class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                >
                  <div class="w-full flex items-center justify-between">
                    <button
                      @click="costModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ---------------------------------------------- cost create modal end ---------------------------------------------- -->

      <!-- ----------------------------------------------- cost update modal ----------------------------------------- -->
      <div
        @click.self="costUpdateModal"
        :class="
          cost.updateModal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Chiqimni o'zgartirish
                  </h3>
                  <button
                    @click="costUpdateModal"
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
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="updateCost"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="price" class="block mb-2 text-sm"
                      >Sumani kiriting</label
                    >
                    <input
                      v-model="cost.price"
                      id="price"
                      type="number"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="100000 so'm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Kategoriyani tanlang</label
                    >
                    <select
                      v-model="cost.category_id"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        Kategoriyani tanlang
                      </option>
                      <option
                        v-for="i in store.costCategory"
                        :key="i.id"
                        :value="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="cost.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="cost.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
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
                  <div>
                    <label for="description" class="block mb-2 text-sm"
                      >Izoh kiriting</label
                    >

                    <textarea
                      v-model="cost.description"
                      name="description"
                      id="description"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3 h-32"
                      placeholder="Izoh.."
                      required
                    ></textarea>
                  </div>
                </div>
                <div
                  class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                >
                  <div class="w-full flex items-center justify-between">
                    <button
                      @click="costUpdateModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      O'zgartirish
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ----------------------------------------------- cost update modal end ------------------------------------- -->

      <!-- ----------------------------------------- cost delete modal ---------------------------------------------------- -->
      <div
        :class="
          cost.remove
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
                Chiqimni o'chirib tashlash
              </h3>
              <button
                @click="cost.remove = false"
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
                    Siz chiqimni o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="cost.remove = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteCost"
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
      <!-- ----------------------------------------- cost delete modal end ---------------------------------------------------- -->

      <!-- ---------------------------------------------- salary create modal -------------------------------------------------- -->
      <div
        @click.self="salaryModal"
        :class="
          salary.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Maoshni berish
                  </h3>
                  <button
                    @click="salaryModal"
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
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="createSalary"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label
                      for="teacher"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >O'qituvchini tanlang</label
                    >
                    <select
                      v-model="salary.teacher_id"
                      id="teacher"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        O'qituvchini tanlang
                      </option>
                      <option
                        v-for="i in store.employee"
                        :key="i.id"
                        :value="i.id"
                        class="mb-20"
                      >
                        {{ i.full_name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="price" class="block mb-2 text-sm"
                      >Sumani kiriting</label
                    >
                    <input
                      v-model="salary.price"
                      id="price"
                      type="number"
                      class="bg-white border border-gray-300 text-black rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="100000 so'm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="salary.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="salary.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
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
                </div>
                <div
                  class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                >
                  <div class="w-full flex items-center justify-between">
                    <button
                      @click="salaryModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ---------------------------------------------- salary create modal end ---------------------------------------------- -->

      <!-- ----------------------------------------------- salary update modal ----------------------------------------- -->
      <div
        @click.self="salaryUpdateModal"
        :class="
          salary.updateModal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Berilgan maoshni o'zgartirish
                  </h3>
                  <button
                    @click="salaryUpdateModal"
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
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="updateSalary"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label
                      for="teacher"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >O'qituvchini tanlang</label
                    >
                    <select
                      v-model="salary.teacher_id"
                      id="teacher"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        O'qituvchini tanlang
                      </option>
                      <option
                        v-for="i in store.employee"
                        :key="i.id"
                        :value="i.id"
                        class="mb-20"
                      >
                        {{ i.full_name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="price" class="block mb-2 text-sm"
                      >Sumani kiriting</label
                    >
                    <input
                      v-model="salary.price"
                      id="price"
                      type="number"
                      class="bg-white border border-gray-300 text-black rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="100000 so'm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="salary.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="salary.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
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
                </div>
                <div
                  class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                >
                  <div class="w-full flex items-center justify-between">
                    <button
                      @click="salaryUpdateModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      O'zgartirish
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ----------------------------------------------- salary update modal end ------------------------------------- -->

      <!-- ----------------------------------------- salary delete modal ---------------------------------------------------- -->
      <div
        :class="
          salary.remove
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
                Berilgan maoshni o'chirib tashlash
              </h3>
              <button
                @click="salary.remove = false"
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
                    Siz berilgan maoshni o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="salary.remove = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteSalary"
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
      <!-- ----------------------------------------- salary delete modal end ---------------------------------------------------- -->

      <div
        v-show="store.CostPageProduct && store.SalaryPageProduct"
        class="w-full max-w-screen"
      >
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="flex items-center gap-5">
            <h1 class="text-blue-700 font-bold text-lg w-full">
              Moliyaviy hisobot
            </h1>

            <button
              @click="costCategory.modal = true"
              type="button"
              class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Kategoriya qo'shish</span>
            </button>
          </div>

          <div
            class="w-full lg:w-auto flex flex-row space-y-0 items-stretch md:items-center justify-end space-x-3"
          >
            <button
              @click="cost.modal = true"
              type="button"
              class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Chiqim kiritish</span>
            </button>
            <button
              @click="salary.modal = true"
              type="button"
              class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Maosh berish</span>
            </button>
          </div>
        </div>

        <div
          class="rounded-lg p-5 mb-10"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="font-bold text-lg w-full mb-3">
            Chiqimlar ro'yxati (<span class="text-blue-700">{{
              monthNames(hozirgiOy)
            }}</span
            >)
          </h1>
          <div
            class="relative shadow-md rounded-lg overflow-hidden"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                  <tr>
                    <th scope="col" class="text-center px-8 py-3">
                      Kategoriya
                    </th>
                    <th scope="col" class="text-center px-8 py-3">Suma</th>
                    <th scope="col" class="text-center px-8 py-3">
                      To'lov turi
                    </th>
                    <th scope="col" class="text-center px-8 py-3">Oy</th>
                    <th scope="col" class="text-center px-8 py-3">Izoh</th>
                    <th scope="col" class="text-center px-8 py-3">
                      To'lov sanasi
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-show="!store.error">
                  <tr
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                    v-for="i in store.CostPageProduct"
                    :key="i.id"
                  >
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.costCategory.name }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.price.toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ monthNames(i.month) }}
                      </p>
                    </td>

                    <td class="text-center font-medium px-8 py-2 relative">
                      <div class="group relative w-40 inline-block">
                        <p class="truncate w-40 p-1 rounded-[5px]">
                          {{
                            i.description && i.description.split(" ").length > 3
                              ? i.description.split(" ").slice(0, 3).join(" ") +
                                "..."
                              : i.description
                          }}
                        </p>
                        <span
                          class="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden w-max max-w-xs bg-blue-100 text-blue-800 text-sm p-2 rounded-md shadow-lg group-hover:block"
                        >
                          {{ i.description }}
                        </span>
                      </div>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ chekDateFormat(new Date(i.createdAt)) }}
                      </p>
                    </td>
                    <td
                      class="text-center whitespace-nowrap font-medium pr-5 py-4"
                    >
                      <i
                        @click="getOneCost(i.id)"
                        class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                      >
                      </i>
                      <i
                        @click="deleteCostFunc(i.id)"
                        class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                      >
                      </i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-show="store.error" class="flex w-full justify-center">
                <h1 class="p-20 text-2xl font-medium">
                  {{ store.CostPageProduct }}
                </h1>
              </div>
              <div
                v-show="store.CostPageProduct.length == 0"
                class="flex w-full justify-center"
              >
                <h1 class="p-20 text-2xl font-medium">
                  Chiqimlar ro'yhati bo'sh
                </h1>
              </div>
            </div>
            <nav
              class="flex flex-row justify-between items-center space-y-0 p-4"
              aria-label="Table navigation"
            >
              <!-- Oldingi sahifa tugmasi -->
              <ul class="flex items-center">
                <li
                  :class="[
                    store.costPagination === 1
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.costPagination > 1) {
                      store.costPagination -= 1;
                      getCost(store.costPagination);
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
                  <span>{{ store.costPage[0] * 15 - 14 }}</span> -
                  <span v-if="store.costPage[0] * 15 < store.costPage[1]">{{
                    store.costPage[0] * 15
                  }}</span
                  ><span v-else>{{ store.costPage[1] }}</span>
                </span>
                dan
                <span class="font-semibold">{{ store.costPage[1] }}</span>
              </span>

              <!-- Keyingi sahifa tugmasi -->
              <ul class="flex items-center">
                <li
                  :class="[
                    store.costPage[0] * 15 >= store.costPage[1]
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.costPage[0] * 15 < store.costPage[1]) {
                      store.costPagination += 1;
                      getCost(store.costPagination);
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

        <div
          class="rounded-lg p-5 mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="font-bold text-lg w-full mb-3">
            Berilgan maoshlar ro'yxati (<span class="text-blue-700">{{
              monthNames(hozirgiOy)
            }}</span
            >)
          </h1>
          <div
            class="relative shadow-md rounded-lg overflow-hidden"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btnAdd text-white text-xs rounded-lg uppercase">
                  <tr>
                    <th scope="col" class="text-center px-8 py-3">
                      O'qituvchi (F . I . O)
                    </th>
                    <th scope="col" class="text-center px-8 py-3">Suma</th>
                    <th scope="col" class="text-center px-8 py-3">
                      To'lov turi
                    </th>
                    <th scope="col" class="text-center px-8 py-3">Oy</th>
                    <th scope="col" class="text-center px-8 py-3">
                      To'lov sanasi
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-show="!store.error">
                  <tr
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                    v-for="i in store.SalaryPageProduct"
                    :key="i.id"
                  >
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.teacher.full_name }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.price.toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ monthNames(i.month) }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ chekDateFormat(new Date(i.createdAt)) }}
                      </p>
                    </td>
                    <td
                      class="text-center whitespace-nowrap font-medium pr-5 py-4"
                    >
                      <i
                        @click="getOneSalary(i.id)"
                        class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                      >
                      </i>
                      <i
                        @click="deleteSalaryFunc(i.id)"
                        class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                      >
                      </i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-show="store.error" class="flex w-full justify-center">
                <h1 class="p-20 text-2xl font-medium">
                  {{ store.SalaryPageProduct }}
                </h1>
              </div>
              <div
                v-show="store.SalaryPageProduct.length == 0"
                class="flex w-full justify-center"
              >
                <h1 class="p-20 text-2xl font-medium">
                  Maoshlar ro'yhati bo'sh
                </h1>
              </div>
            </div>
            <nav
              class="flex flex-row justify-between items-center space-y-0 p-4"
              aria-label="Table navigation"
            >
              <!-- Oldingi sahifa tugmasi -->
              <ul class="flex items-center">
                <li
                  :class="[
                    store.salaryPagination === 1
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.salaryPagination > 1) {
                      store.salaryPagination -= 1;
                      getSalary(store.salaryPagination);
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
                  <span>{{ store.salaryPage[0] * 15 - 14 }}</span> -
                  <span v-if="store.salaryPage[0] * 15 < store.salaryPage[1]">{{
                    store.salaryPage[0] * 15
                  }}</span
                  ><span v-else>{{ store.salaryPage[1] }}</span>
                </span>
                dan
                <span class="font-semibold">{{ store.salaryPage[1] }}</span>
              </span>

              <!-- Keyingi sahifa tugmasi -->
              <ul class="flex items-center">
                <li
                  :class="[
                    store.salaryPage[0] * 15 >= store.salaryPage[1]
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.salaryPage[0] * 15 < store.salaryPage[1]) {
                      store.salaryPagination += 1;
                      getSalary(store.salaryPagination);
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
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import axios from "@/services/axios";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const hozirgiSana = new Date();
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");

const store = reactive({
  allProducts: true,
  CostPageProduct: "",
  SalaryPageProduct: "",
  costCategory: "",
  method: "",
  employee: "",
  salaryPage: [],
  salaryPagination: 1,
  costPage: [],
  costPagination: 1,
  error: false,
});

const cost = reactive({
  modal: false,
  id: "",
  category_id: "",
  price: "",
  method: "",
  month: hozirgiOy,
  description: "",
  updateModal: false,
  remove: false,
});

const costCategory = reactive({
  modal: false,
  id: "",
  categoryName: "",
  remove: false,
});

const salary = reactive({
  modal: false,
  id: "",
  teacher_id: "",
  price: "",
  method: "",
  month: hozirgiOy,
});

const costCategoryModal = () => {
  costCategory.modal = !costCategory.modal;
  costCategory.categoryNmae = "";
};

const costModal = () => {
  cost.modal = !cost.modal;
  cost.month = hozirgiOy;
  cost.category_id = "";
  cost.price = "";
  cost.method = "";
  cost.description = "";
};

const costUpdateModal = () => {
  cost.updateModal = !cost.updateModal;
  cost.id = "";
  cost.category_id = "";
  cost.month = hozirgiOy;
  cost.price = "";
  cost.method = "";
  cost.description = "";
};

const deleteCostCategoryFunc = (id) => {
  costCategory.id = id;
  costCategory.remove = true;
};

const deleteCostFunc = (id) => {
  cost.id = id;
  cost.remove = true;
};

const salaryModal = () => {
  salary.modal = !salary.modal;
  salary.month = hozirgiOy;
  salary.teacher_id = "";
  salary.price = "";
  salary.method = "";
};

const salaryUpdateModal = () => {
  salary.updateModal = !salary.updateModal;
  salary.id = "";
  salary.month = hozirgiOy;
  salary.price = "";
  salary.method = "";
  salary.description = "";
};

const deleteSalaryFunc = (id) => {
  salary.id = id;
  salary.remove = true;
};

const monthNames = (month) => {
  switch (month) {
    case "01":
      return "Yanvar";
    case "02":
      return "Fevral";
    case "03":
      return "Mart";
    case "04":
      return "Aprel";
    case "05":
      return "May";
    case "06":
      return "Iyun";
    case "07":
      return "Iyul";
    case "08":
      return "Avgust";
    case "09":
      return "Sentabr";
    case "10":
      return "Oktabr";
    case "11":
      return "Noyabr";
    case "12":
      return "Dekabr";
    default:
      return "Notog'ri oy";
  }
};

const chekDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

// ------------ axios get ------------- //

const getCostCategory = async () => {
  await axios
    .get(`/cost-category/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.costCategory = res.data;
    })
    .catch((error) => {
      store.costCategory = [{ name: "Kategoriya yaratilmagan" }];
    });
};

const getCost = async (page) => {
  try {
    const res = await axios.get(
      `/cost/${localStorage.getItem("school_id")}/page?page=${page}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    store.CostPageProduct = res.data?.data?.records;
    store.costPage = [
      res.data?.data?.pagination.currentPage,
      res.data?.data?.pagination.total_count,
    ];

    store.error = false;
  } catch (error) {
    store.CostPageProduct = error.response.data.message;
    store.error = true;
  }
};

const getSalary = async (page) => {
  try {
    const res = await axios.get(
      `/salary/${localStorage.getItem("school_id")}/page?page=${page}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    store.SalaryPageProduct = res.data?.data?.records;
    store.salaryPage = [
      res.data?.data?.pagination.currentPage,
      res.data?.data?.pagination.total_count,
    ];
    store.error = false;
  } catch (error) {
    store.SalaryPageProduct = error.response.data.message;
    store.error = true;
  }
};

const getMethod = async () => {
  await axios
    .get(`/payment-method/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.method = res.data;
    })
    .catch((error) => {
      store.method = [{ name: "To'lov turi yaratilmagan" }];
    });
};

const getEmployee = async () => {
  await axios
    .get(`/employee/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.employee = res.data.filter(
        (record) => record.role == "teacher"
      ) || [{ name: "O'qituvchi yaratilmagan" }];
    })
    .catch((error) => {
      store.employee = error.response.data.message;
    });
};

const getOneCost = async (id) => {
  try {
    const res = await axios.get(
      `/cost/${localStorage.getItem("school_id")}/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    cost.id = res.data.id;
    cost.category_id = res.data.category_id;
    cost.price = res.data.price;
    cost.method = res.data.method;
    cost.month = res.data.month;
    cost.description = res.data.description;
    cost.updateModal = true;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getOneSalary = async (id) => {
  try {
    const res = await axios.get(
      `/salary/${localStorage.getItem("school_id")}/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    salary.id = res.data.id;
    salary.teacher_id = res.data.teacher_id;
    salary.price = res.data.price;
    salary.method = res.data.method;
    salary.month = res.data.month;
    salary.updateModal = true;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

// ------------ axios post ------------- //

const createCostCategory = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    name: costCategory.categoryName,
  };
  try {
    await axios.post("/cost-category", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Kategoriya kiritildi");
    getCostCategory();
    costCategoryModal();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createCost = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    category_id: cost.category_id,
    price: cost.price,
    method: cost.method,
    month: cost.month,
    description: cost.description,
  };
  try {
    await axios.post("/cost", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Chiqim kiritildi");

    await getCost(store.costPagination);
    costModal();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const createSalary = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    teacher_id: salary.teacher_id,
    price: salary.price,
    method: salary.method,
    month: salary.month,
    description: salary.description,
  };
  try {
    await axios.post("/salary", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    notification.success("Chiqim kiritildi");

    await getSalary(store.salaryPagination);
    salaryModal();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

// ------------ axios update ------------ //

const updateCost = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    category_id: cost.category_id,
    price: cost.price,
    method: cost.method,
    month: cost.month,
    description: cost.description,
  };
  try {
    await axios.put(
      `/cost/${localStorage.getItem("school_id")}/${cost.id}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    notification.success("Chiqim o'zgartirildi");

    await getCost(store.costPagination);
    costUpdateModal();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const updateSalary = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    teacher_id: salary.teacher_id,
    price: salary.price,
    method: salary.method,
    month: salary.month,
  };
  try {
    await axios.put(
      `/salary/${localStorage.getItem("school_id")}/${salary.id}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    notification.success("Berilgan maosh o'zgartirildi");

    await getSalary(store.costPagination);
    salaryUpdateModal();
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

// ------------ axios delete ------------ //

const deleteCostCategory = async () => {
  try {
    await axios.delete(
      `/cost-category/${localStorage.getItem("school_id")}/${costCategory.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    costCategory.remove = false;
    getCostCategory();
    notification.success("Kategoriya o'chirildi");
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const deleteCost = async () => {
  try {
    await axios.delete(
      `/cost/${localStorage.getItem("school_id")}/${cost.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    cost.remove = false;
    getCost(store.costPagination);
    notification.success("Chiqim o'chirildi");
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const deleteSalary = async () => {
  try {
    await axios.delete(
      `/salary/${localStorage.getItem("school_id")}/${salary.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    salary.remove = false;
    getSalary(store.salaryPagination);
    notification.success("Berilgan maosh o'chirildi");
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

onMounted(() => {
  getCostCategory();
  getCost(store.costPagination);
  getSalary(store.salaryPagination);
  getMethod();
  getEmployee();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnAdd2 {
  background-image: linear-gradient(to right, white -450%, red);
}

.darkForm {
  label {
    color: white;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 1s ease;
}
.modal-fade-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.modal-fade-leave-from {
  opacity: 0;
  transform: translateY(50px);
}
</style>
