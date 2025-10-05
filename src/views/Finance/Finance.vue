<template>
  <div class="px-2">
    <section class="pt-4" :class="{ 'text-white': navbar.userNav }">
      <div
        v-show="
          !store.PageProduct &&
          !store.CostPageProduct &&
          !store.SalaryPageProduct
        "
      >
        <Placeholder2 />
      </div>

      <PageLoader :loading="loading.excel" text="Excel tayyorlanmoqda..." />

      <!-- ---------------------------------------- Statistic ------------------------------------- -->

      <div
        v-for="i in store.statistic"
        :key="i"
        class="flex flex-wrap items-center justify-center mb-5 cards gap-x-5 gap-y-5"
      >
        <div class="card sm:w-[295px] w-full" v-for="j in i" :key="j">
          <div
            class="relative flex flex-col min-w-0 break-words shadow-soft-xl rounded-xl bg-clip-border"
            :class="{
              'bg-[#1e293b]': navbar.userNav,
              'bg-white': !navbar.userNav,
            }"
          >
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div
                  class="flex items-center justify-between w-full px-3"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  <h3 class="text-sm font-semibold leading-normal sm:text-md">
                    {{ store.guard ? j.name : j.method }} ({{ j.count || 0 }})
                  </h3>
                  <h5
                    class="p-1 px-3 text-sm font-bold text-blue-700 bg-blue-100 rounded-lg sm:text-md"
                  >
                    {{ Number(j.sum)?.toLocaleString("uz-UZ") }} so'm
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------------------- Statistic ------------------------------------- -->

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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                <div class="grid gap-4 mb-4 font-medium">
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
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="costCategoryModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Qo'shish
                    </ButtonLoader>
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
              class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
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
              <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="costCategory.remove = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <ButtonLoader
                    :loading="loading.view"
                    @click="deleteCostCategory"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'chirish
                  </ButtonLoader>
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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                <div class="grid gap-4 mb-4 font-medium">
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
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="costModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Qo'shish
                    </ButtonLoader>
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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                <div class="grid gap-4 mb-4 font-medium">
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
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="costUpdateModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      O'zgartirish
                    </ButtonLoader>
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
              class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
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
              <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="cost.remove = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <ButtonLoader
                    :loading="loading.view"
                    @click="deleteCost"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'chirish
                  </ButtonLoader>
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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                <div class="grid gap-4 mb-4 font-medium">
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
                  <div>
                    <label for="description" class="block mb-2 text-sm"
                      >Izoh kiriting</label
                    >

                    <textarea
                      v-model="salary.description"
                      name="description"
                      id="description"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3 h-32"
                      placeholder="Izoh.."
                    ></textarea>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="salaryModal"
                      type="button"
                      class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Qo'shish
                    </ButtonLoader>
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
          <div class="relative w-full h-auto max-w-xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
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
                <div class="grid gap-4 mb-4 font-medium">
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
                  <div>
                    <label for="description" class="block mb-2 text-sm"
                      >Izoh kiriting</label
                    >

                    <textarea
                      v-model="salary.description"
                      name="description"
                      id="description"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3 h-32"
                      placeholder="Izoh.."
                    ></textarea>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <div class="flex items-center justify-between w-full">
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
              class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5"
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
              <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
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

      <!-- ----------------------------------------- teacher payment history modal -------------------------------------------- -->
      <div
        @click.self="historyModal"
        :class="
          history.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative w-full h-auto max-w-2xl p-4">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 border-b rounded-t sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    To'lov tarixini ko'rish
                  </h3>
                  <button
                    @click="historyModal"
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
                <div class="w-full rounded-lg" id="navbar-sticky">
                  <ul
                    class="grid w-full grid-cols-2 gap-3 font-medium text-white lg:grid-cols-4"
                  >
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="history.dayModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyDayModal"
                    >
                      <span>Kun bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="history.monthModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyMonthModal"
                    >
                      <span>Oy bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="
                        history.groupMonthModal ? 'btnAdd' : 'bg-gray-600'
                      "
                      @click="historyGroupMonthModal"
                    >
                      <span>Guruh bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="history.yearModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyYearModal"
                    >
                      <span>Barchasini</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Modal body -->
              <form
                v-show="history.dayModal"
                @submit.prevent="getHistory(store.teacherPagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
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
                      v-model="history.month"
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
                    <label for="day" class="block mb-2 text-sm"
                      >Kuni kiriting</label
                    >
                    <input
                      v-model="history.day"
                      id="day"
                      type="number"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="Kuni kiriting.."
                      min="1"
                      max="31"
                      required
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>
              <form
                v-show="history.monthModal"
                @submit.prevent="getHistory(store.teacherPagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
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
                      v-model="history.month"
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
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>
              <form
                v-show="history.groupMonthModal"
                @submit.prevent="getHistory(store.teacherPagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
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
                      v-model="history.month"
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
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Guruhni tanlang</label
                    >
                    <div class="relative w-full text-black">
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
                        v-model="history.filter"
                        @focus="history.selectLamp = true"
                        @blur="
                          history.selectLamp = false;
                          history.filter_show = false;
                        "
                        @input="
                          history.filter_show = true;
                          searchHistoryFunc();
                        "
                        type="search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Guruhni tanlang yoki qidirish..."
                      />
                      <ul
                        v-show="
                          history.filter_show && history.searchList.length > 0
                        "
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                          v-for="(i, index) in history.searchList"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.id;
                            history.group_name = i.name;
                            history.filter_show = false;
                            history.filter = i.name;
                          "
                        >
                          {{ i.name }}
                        </li>
                      </ul>
                      <ul
                        v-show="history.selectLamp && !history.filter"
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                          v-for="(i, index) in store.group"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.id;
                            history.group_name = i.name;
                            history.selectLamp = false;
                            history.filter = i.name;
                          "
                        >
                          {{ i.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>
              <form
                v-show="history.yearModal"
                @submit.prevent="getHistory(store.teacherPagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                >
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ----------------------------------------- teacher payment hsitory modal end ---------------------------------------- -->
      <div
        v-show="
          (store.CostPageProduct && store.SalaryPageProduct) ||
          store.PageProduct
        "
        class="w-full max-w-screen"
      >
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="flex flex-col items-center justify-between w-full gap-3 lg:w-auto sm:flex-row"
          >
            <h1 class="w-full text-lg font-bold text-blue-700">
              Moliyaviy hisobot
            </h1>

            <button
              v-show="store.guard"
              @click="costCategory.modal = true"
              type="button"
              class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Kategoriya qo'shish</span>
            </button>
          </div>

          <div
            class="flex flex-row items-stretch justify-end w-full space-x-3 space-y-0 lg:w-auto md:items-center"
          >
            <button
              v-show="store.guard"
              @click="cost.modal = true"
              type="button"
              class="btnAdd flex items-center w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Chiqim kiritish</span>
            </button>
            <button
              v-show="store.guard"
              @click="salary.modal = true"
              type="button"
              class="btnAdd flex items-center w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Maosh berish</span>
            </button>

            <button
              v-show="!store.guard"
              @click="history.modal = true"
              type="button"
              class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">To'lov tarixi</span>
            </button>
          </div>
        </div>

        <div v-show="store.guard" class="mb-10 rounded-lg">
          <div
            class="flex flex-col justify-between w-full lg:flex-row lg:items-center gap-x-20"
          >
            <h1
              class="mb-3 font-bold text-blue-700 2xl:text-lg lg:text-xl sm:text-xl text-md whitespace-nowrap"
            >
              Chiqimlar ro'yxati
            </h1>

            <form
              @submit.prevent="getCost(store.costPagination)"
              classs="w-full"
              :class="{ darkForm: navbar.userNav }"
            >
              <div
                class="flex flex-col items-center justify-end w-full gap-3 mb-4 font-medium sm:flex-row"
              >
                <div class="flex items-center justify-between w-full gap-3">
                  <div class="w-full">
                    <select
                      v-model="costHistory.year"
                      id="name"
                      class="bg-white border text-black border-blue-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div class="w-full">
                    <select
                      v-model="costHistory.month"
                      id="month"
                      class="bg-white border text-black border-blue-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
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
                <div class="w-full">
                  <div class="relative w-full text-black">
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
                      v-model="history.filter_cost"
                      @focus="history.selectLamp_cost = true"
                      @blur="
                        history.selectLamp_cost = false;
                        history.filter_show_cost = false;
                      "
                      @input="
                        history.filter_show_cost = true;
                        searchHistoryCostFunc();
                      "
                      type="search"
                      id="simple-search"
                      class="bg-gray-50 border border-blue-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-[9px]"
                      placeholder="Kategoriyani tanlang yoki qidirish..."
                    />
                    <ul
                      v-show="
                        history.filter_show_cost &&
                        history.searchList_cost.length > 0
                      "
                      class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                    >
                      <li
                        class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                        v-for="(i, index) in history.searchList_cost"
                        :key="index"
                        @mousedown.prevent="
                          history.category_id = i.id;
                          history.category_name = i.name;
                          history.filter_show_cost = false;
                          history.filter_cost = i.name;
                        "
                      >
                        {{ i.name }}
                      </li>
                    </ul>
                    <ul
                      v-show="history.selectLamp_cost && !history.filter_cost"
                      class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                    >
                      <li
                        class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                        v-for="(i, index) in store.costCategory"
                        :key="index"
                        @mousedown.prevent="
                          history.category_id = i.id;
                          history.category_name = i.name;
                          history.selectLamp_cost = false;
                          history.filter_cost = i.name;
                        "
                      >
                        {{ i.name }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="flex items-center w-full gap-3">
                  <button
                    type="submit"
                    class="btnAdd w-full sm:max-w-fit text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                  <button
                    @click="exportToExcelCost"
                    type="button"
                    class="btnAdd3 w-full text-white inline-flex whitespace-nowrap items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklash
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            class="relative overflow-hidden rounded-lg shadow-md"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-white uppercase rounded-lg btnAdd">
                  <tr>
                    <th scope="col" class="px-8 py-3 text-center">
                      Kategoriya
                    </th>
                    <th scope="col" class="px-8 py-3 text-center">Suma</th>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
                      To'lov turi
                    </th>
                    <th scope="col" class="px-8 py-3 text-center">Oy</th>
                    <th scope="col" class="px-8 py-3 text-center">Izoh</th>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
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
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.costCategory.name }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.price.toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ monthNames(i.month) }}
                      </p>
                    </td>

                    <td class="relative px-8 py-2 font-medium text-center">
                      <div class="relative inline-block w-40 group">
                        <p class="truncate w-40 p-1 rounded-[5px]">
                          {{
                            i.description && i.description.split(" ").length > 3
                              ? i.description.split(" ").slice(0, 3).join(" ") +
                                "..."
                              : i.description
                          }}
                        </p>
                        <span
                          class="absolute hidden max-w-xs p-2 mb-1 text-sm text-blue-800 -translate-x-1/2 bg-blue-100 rounded-md shadow-lg left-1/2 bottom-full w-max group-hover:block"
                        >
                          {{ i.description }}
                        </span>
                      </div>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ chekDateFormat(new Date(i.createdAt)) }}
                      </p>
                    </td>
                    <td
                      class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                    >
                      <i
                        @click="getOneCost(i.id)"
                        class="p-2 mr-3 text-blue-600 bg-blue-300 rounded-lg cursor-pointer bx bxs-pencil focus:ring-2"
                      >
                      </i>
                      <i
                        @click="deleteCostFunc(i.id)"
                        class="p-2 text-red-600 bg-red-300 rounded-lg cursor-pointer bx bxs-trash focus:ring-2"
                      >
                      </i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-show="store.error" class="flex justify-center w-full">
                <h1 class="p-20 text-2xl font-medium">
                  {{ store.CostPageProduct }}
                </h1>
              </div>
              <div
                v-show="store.CostPageProduct.length == 0"
                class="flex justify-center w-full"
              >
                <h1 class="p-20 text-2xl font-medium">
                  Chiqimlar ro'yhati bo'sh
                </h1>
              </div>
            </div>
            <nav
              class="flex flex-row items-center justify-between p-4 space-y-0"
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
                    class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
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
                    class="text-2xl font-bold text-black md:hidden bx bx-chevron-right"
                  ></i>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          v-show="!store.guard"
          class="flex flex-col justify-between gap-4 font-bold sm:flex-row sm:items-center"
        >
          <h2
            v-show="history.dayModal"
            class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
          >
            Kunlik to'lov tarixi - {{ history.year }}/{{ history.month }}/{{
              history.day
            }}
          </h2>
          <h2
            v-show="history.monthModal"
            class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
          >
            Oylik to'lov tarixi - {{ history.year }}/{{ history.month }}
          </h2>
          <h2
            v-show="history.groupMonthModal"
            class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
          >
            Guruhni oylik to'lov tarixi - {{ history.year }}/{{
              history.month
            }}/{{ history.group_name }}
          </h2>
        </div>

        <div
          v-show="!store.guard"
          class="relative mb-10 overflow-hidden rounded-lg shadow-md"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-lg btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    O'quvchi (F . I . O)
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Guruh
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Kurs narxi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    To'lov turi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    To'lov narxi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Oy
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    To'lov sanasi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Izoh
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="i in store.PageProduct"
                  :key="i"
                  class="border-b"
                  :class="[
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
                    i.status === 'update' ? 'btnAdd3' : '',
                    i.status === 'delete' ? 'btnAdd2' : '',
                  ]"
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>

                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p
                      class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.group_name }}
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p
                      class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ Number(i.group_price).toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p
                      class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.method }}
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-green-700">
                    <p
                      class="bg-green-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.price.toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p
                      class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ monthNames(i.month) }}
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p
                      class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ chekDateFormat(new Date(i.createdAt)) }}
                    </p>
                  </td>
                  <td class="relative px-8 py-2 font-medium text-center">
                    <div class="relative inline-block w-40 group">
                      <p class="truncate w-40 p-1 rounded-[5px]">
                        {{
                          !i.description || i.description.trim() === ""
                            ? "Izoh yo'q"
                            : i.description.split(" ").length > 3
                            ? i.description.split(" ").slice(0, 3).join(" ") +
                              "..."
                            : i.description
                        }}
                      </p>
                      <span
                        class="absolute hidden max-w-xs p-2 mb-1 text-sm text-blue-800 -translate-x-1/2 bg-blue-100 rounded-md shadow-lg left-1/2 bottom-full w-max group-hover:block"
                      >
                        {{ !i.description ? "Izoh yo'q" : i.description }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-show="store.PageProduct && store.PageProduct.length == 0"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            class="flex flex-row items-center justify-between p-4 space-y-0"
            aria-label="Table navigation"
          >
            <!-- Oldingi sahifa tugmasi -->
            <ul class="flex items-center">
              <li
                :class="[
                  store.teacherPagination === 1
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.teacherPagination > 1) {
                    store.teacherPagination -= 1;
                    getHistory(store.teacherPagination);
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
                <span>{{ store.teacherPage[0] * 15 - 14 }}</span> -
                <span v-if="store.teacherPage[0] * 15 < store.teacherPage[1]">{{
                  store.teacherPage[0] * 15
                }}</span
                ><span v-else>{{ store.teacherPage[1] }}</span>
              </span>
              dan
              <span class="font-semibold">{{ store.teacherPage[1] }}</span>
            </span>

            <!-- Keyingi sahifa tugmasi -->
            <ul class="flex items-center">
              <li
                :class="[
                  store.teacherPage[0] * 15 >= store.teacherPage[1]
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.teacherPage[0] * 15 < store.teacherPage[1]) {
                    store.teacherPagination += 1;
                    getHistory(store.teacherPagination);
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

        <div class="rounded-lg mb-28">
          <div
            class="flex flex-col justify-between w-full lg:flex-row lg:items-center gap-x-20"
          >
            <h1
              class="mb-3 font-bold text-blue-700 2xl:text-lg lg:text-xl sm:text-xl text-md whitespace-nowrap"
            >
              Berilgan maoshlar ro'yxati
            </h1>

            <form
              @submit.prevent="getSalary(store.teacherPagination)"
              classs="w-full"
              :class="{ darkForm: navbar.userNav }"
            >
              <div
                class="flex flex-col items-center justify-end w-full gap-3 mb-4 font-medium sm:flex-row"
              >
                <div class="flex items-center justify-between w-full gap-3">
                  <div class="w-full">
                    <select
                      v-model="salaryHistory.year"
                      id="name"
                      class="bg-white border text-black border-blue-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div class="w-full">
                    <select
                      v-model="salaryHistory.month"
                      id="month"
                      class="bg-white border text-black border-blue-600 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-[7px]"
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
                <div v-show="store.guard" class="w-full">
                  <div class="relative w-full text-black">
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
                      v-model="history.filter_teacher"
                      @focus="history.selectLamp_teacher = true"
                      @blur="
                        history.selectLamp_teacher = false;
                        history.filter_show_teacher = false;
                      "
                      @input="
                        history.filter_show_teacher = true;
                        searchHistoryTeacherFunc();
                      "
                      type="search"
                      id="simple-search"
                      class="bg-gray-50 border border-blue-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-[9px]"
                      placeholder="O'qituvchini tanlang yoki qidirish..."
                    />
                    <ul
                      v-show="
                        history.filter_show_teacher &&
                        history.searchList_teacher.length > 0
                      "
                      class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                    >
                      <li
                        class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                        v-for="(i, index) in history.searchList_teacher"
                        :key="index"
                        @mousedown.prevent="
                          history.teacher_id = i.id;
                          history.teacher_name = i.full_name;
                          history.filter_show_teacher = false;
                          history.filter_teacher = i.full_name;
                        "
                      >
                        {{ i.full_name }}
                      </li>
                    </ul>
                    <ul
                      v-show="
                        history.selectLamp_teacher && !history.filter_teacher
                      "
                      class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                    >
                      <li
                        class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                        v-for="(i, index) in store.employee"
                        :key="index"
                        @mousedown.prevent="
                          history.teacher_id = i.id;
                          history.teacher_name = i.full_name;
                          history.selectLamp_teacher = false;
                          history.filter_teacher = i.full_name;
                        "
                      >
                        {{ i.full_name }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="flex items-center w-full gap-3">
                  <button
                    type="submit"
                    class="btnAdd w-full sm:max-w-fit text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                  <button
                    @click="exportToExcelSalary"
                    type="button"
                    class="btnAdd3 w-full text-white inline-flex whitespace-nowrap items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklash
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            class="relative overflow-hidden rounded-lg shadow-md"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-white uppercase rounded-lg btnAdd">
                  <tr>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
                      O'qituvchi (F . I . O)
                    </th>
                    <th scope="col" class="px-8 py-3 text-center">Suma</th>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
                      To'lov turi
                    </th>
                    <th scope="col" class="px-8 py-3 text-center">Oy</th>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
                      Izoh
                    </th>
                    <th
                      scope="col"
                      class="px-8 py-3 text-center whitespace-nowrap"
                    >
                      To'lov sanasi
                    </th>
                    <th v-show="store.guard"></th>
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
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.teacher.full_name }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.price.toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ monthNames(i.month) }}
                      </p>
                    </td>
                    <td class="relative px-8 py-2 font-medium text-center">
                      <div class="relative inline-block w-40 group">
                        <p class="truncate w-40 p-1 rounded-[5px]">
                          {{
                            !i.description || i.description.trim() === ""
                              ? "Izoh yo'q"
                              : i.description.split(" ").length > 3
                              ? i.description.split(" ").slice(0, 3).join(" ") +
                                "..."
                              : i.description
                          }}
                        </p>
                        <span
                          class="absolute hidden max-w-xs p-2 mb-1 text-sm text-blue-800 -translate-x-1/2 bg-blue-100 rounded-md shadow-lg left-1/2 bottom-full w-max group-hover:block"
                        >
                          {{ !i.description ? "Izoh yo'q" : i.description }}
                        </span>
                      </div>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ chekDateFormat(new Date(i.createdAt)) }}
                      </p>
                    </td>

                    <td
                      v-show="store.guard"
                      class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                    >
                      <i
                        @click="getOneSalary(i.id)"
                        class="p-2 mr-3 text-blue-600 bg-blue-300 rounded-lg cursor-pointer bx bxs-pencil focus:ring-2"
                      >
                      </i>
                      <i
                        @click="deleteSalaryFunc(i.id)"
                        class="p-2 text-red-600 bg-red-300 rounded-lg cursor-pointer bx bxs-trash focus:ring-2"
                      >
                      </i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-show="store.error" class="flex justify-center w-full">
                <h1 class="p-20 text-2xl font-medium">
                  {{ store.SalaryPageProduct }}
                </h1>
              </div>
              <div
                v-show="store.SalaryPageProduct.length == 0"
                class="flex justify-center w-full"
              >
                <h1 class="p-20 text-2xl font-medium">
                  Maoshlar ro'yhati bo'sh
                </h1>
              </div>
            </div>
            <nav
              class="flex flex-row items-center justify-between p-4 space-y-0"
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
                    class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
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
                    class="text-2xl font-bold text-black md:hidden bx bx-chevron-right"
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ButtonLoader } from "../../components";
import { PageLoader } from "../../components";

const notification = useNotificationStore();
const navbar = useNavStore();
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

const userRole = localStorage.getItem("role");

const loading = reactive({
  view: false,
  excel: false,
});

const store = reactive({
  PageProduct: "",
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
  teacherPage: [],
  teacherPagination: 1,
  error: false,
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
  group: "",
  groupList: [],
  curentYil: [],
  statistic: "",
  teacher_name: "",
  statisticTeacher: "",
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
  description: "",
});

const salaryHistory = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  teacher_name: "",
  salaryList: "",
});

const costHistory = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  category_name: "",
  costList: "",
});

const costCategoryModal = () => {
  costCategory.modal = !costCategory.modal;
  costCategory.categoryName = "";
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

const historyDayModal = () => {
  history.dayModal = true;
  history.monthModal = false;
  history.groupMonthModal = false;
  history.yearModal = false;
};

const historyMonthModal = () => {
  history.dayModal = false;
  history.monthModal = true;
  history.groupMonthModal = false;
  history.yearModal = false;
};

const historyGroupMonthModal = () => {
  history.groupMonthModal = true;
  history.dayModal = false;
  history.monthModal = false;
  history.yearModal = false;
};

const historyYearModal = () => {
  history.yearModal = true;
  history.dayModal = false;
  history.monthModal = false;
  history.groupMonthModal = false;
};

const historyModal = () => {
  history.modal = !history.modal;
  history.year = hozirgiYil;
  history.month = hozirgiOy;
  history.day = hozirgiKun;
  history.group_id = "";
  historyDayModal();
  getHistory(store.teacherPagination);
};

const history = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  teacher_id: "",
  teacher_name: "",
  category_id: "",
  category_name: "",
  modal: false,
  dayModal: true,
  monthModal: false,
  yearModal: false,
  groupMonthModal: false,
  filter_show: false,
  filter: "",
  selectLamp: false,
  searchList: [],
  filter_show_teacher: false,
  filter_teacher: "",
  selectLamp_teacher: false,
  searchList_teacher: [],
  filter_show_cost: false,
  filter_cost: "",
  selectLamp_cost: false,
  searchList_cost: [],
  dayList: [],
  monthList: [],
  yearList: [],
  groupMonthList: [],
  dayPay: 0,
});

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

function searchHistoryFunc() {
  history.searchList = [];
  if (history.filter) {
    for (let i of store.group) {
      if (i.name.toLowerCase().includes(history.filter.toLowerCase())) {
        history.searchList.push(i);
      }
    }
  }
}

function searchHistoryTeacherFunc() {
  history.searchList_teacher = [];
  if (history.filter_teacher) {
    for (let i of store.employee) {
      if (
        i.full_name.toLowerCase().includes(history.filter_teacher.toLowerCase())
      ) {
        history.searchList_teacher.push(i);
      }
    }
  }
}

function searchHistoryCostFunc() {
  history.searchList_cost = [];
  if (history.filter_cost) {
    for (let i of store.costCategory) {
      if (i.name.toLowerCase().includes(history.filter_cost.toLowerCase())) {
        history.searchList_cost.push(i);
      }
    }
  }
}

const chekDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

// ------------ axios get ------------- //

const getStatistic = async () => {
  await axios
    .get(`/statistic/finance/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.statistic = res.data;
    })
    .catch((error) => {});
};

const getStatisticTeacher = async (teacher_id, date) => {
  await axios
    .get(
      `/statistic/payment-day-employee/${localStorage.getItem(
        "school_id"
      )}/${teacher_id}/${date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      store.statisticTeacher = res.data;
      store.statistic = res.data;
    })
    .catch((error) => {});
};

const getStatisticGroup = async (group_id, date) => {
  await axios
    .get(
      `/statistic/payment-day/${localStorage.getItem(
        "school_id"
      )}/${group_id}/${date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      store.statisticTeacher = res.data;
      store.statistic = res.data;
    })
    .catch((error) => {});
};

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
    let url;
    if (history.category_id && history.category_id !== "") {
      url = `/cost/${localStorage.getItem("school_id")}/${costHistory.year}/${
        costHistory.month
      }/${history.category_id}/page?page=${page}`;
    } else {
      url = `/cost/${localStorage.getItem("school_id")}/${costHistory.year}/${
        costHistory.month
      }/page?page=${page}`;
    }

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    store.CostPageProduct = res.data?.data?.records;
    store.costPage = [
      res.data?.data?.pagination.currentPage,
      res.data?.data?.pagination.total_count,
    ];

    store.error = false;
  } catch (error) {
    console.log(error);
    store.CostPageProduct = error.response.data.message;
    store.error = true;
  }
};

const getSalary = async (page) => {
  try {
    let url;
    if (history.teacher_id && history.teacher_id !== "") {
      url = `/salary/teacherSalary/${localStorage.getItem("school_id")}/${
        history.teacher_id
      }/${salaryHistory.year}/${salaryHistory.month}/page?page=${page}`;
    } else {
      url = `/salary/${localStorage.getItem("school_id")}/${
        salaryHistory.year
      }/${salaryHistory.month}/page?page=${page}`;
    }

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    store.SalaryPageProduct = res.data?.data?.records;
    store.salaryPage = [
      res.data?.data?.pagination.currentPage,
      res.data?.data?.pagination.total_count,
    ];
    store.error = false;
  } catch (error) {
    store.SalaryPageProduct = error.response?.data?.message || error.message;
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
    salary.description = res.data.description;
    salary.updateModal = true;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getHistory = async (page) => {
  loading.view = true;
  const id = localStorage.getItem("id");
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url;
  if (history.dayModal) {
    url = `/payment/employeeDay/${schoolId}/${id}/${history.year}/${history.month}/${history.day}/page?page=${page}`;
    await getStatisticTeacher(
      id,
      `${history.year}-${history.month}-${history.day}`
    );
  } else if (history.monthModal) {
    url = `/payment/employeeMonth/${schoolId}/${id}/${history.year}/${history.month}/page?page=${page}`;
    await getStatisticTeacher(id, `${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    url = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/all/page?page=${page}`;
    await getStatisticGroup(
      history.group_id,
      `${history.year}-${history.month}`
    );
  } else if (history.yearModal) {
    url = `/payment/employeeYear/${schoolId}/${id}/${history.year}/page?page=${page}`;
  } else {
    return;
  }

  await axios
    .get(url, config)
    .then((res) => {
      const records = res.data.data.records;
      if (records.length !== 0) {
        history.group_name = records[0].group_name;
      }
      history.dayPay = res.data?.data?.total_sum;
      store.PageProduct = records;
      const pagination = res.data?.data?.pagination;
      store.teacherPage = [pagination.currentPage, pagination.total_count];
      loading.view = false;
      history.modal = false;
    })
    .catch((error) => {
      loading.view = false;
      store.PageProduct = error.response?.data?.message;
    });
};

const getGroups = async () => {
  if (store.guard) {
    // try {
    //   const res = await axios.get(
    //     `/group/${localStorage.getItem("school_id")}/find`,
    //     {
    //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     }
    //   );
    //   store.allProducts = res.data.sort((a, b) => b.id - a.id);
    //   store.error = false;
    // } catch (error) {
    //   store.allProducts = error.response.data.message;
    //   store.error = true;
    // }
  } else {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    try {
      const employeeRes = await axios.get(`/employee/${schoolId}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const employeeData = employeeRes.data;

      store.teacher_name = employeeData.full_name;

      const groupPromises = employeeData.group.map(async (group) => {
        const groupRes = await axios.get(
          `/group/${schoolId}/${group.group_id}/not`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const groupData = groupRes.data;
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

const getTeacherSalary = async (page) => {
  try {
    const res = await axios.get(
      `/salary/teacherSalary/${localStorage.getItem(
        "school_id"
      )}/${localStorage.getItem("id")}/${salaryHistory.year}/${
        salaryHistory.month
      }/page?page=${page}`,
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

const getAllHistoryForExport = async () => {
  const id = localStorage.getItem("id");
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let urlBase;
  if (history.dayModal) {
    urlBase = `/payment/employeeDay/${schoolId}/${id}/${history.year}/${history.month}/${history.day}/page`;
    await getStatisticTeacher(
      id,
      `${history.year}-${history.month}-${history.day}`
    );
  } else if (history.monthModal) {
    urlBase = `/payment/employeeMonth/${schoolId}/${id}/${history.year}/${history.month}/page`;
    await getStatisticTeacher(id, `${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    urlBase = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/all/page`;
    await getStatisticGroup(
      history.group_id,
      `${history.year}-${history.month}`
    );
  } else if (history.yearModal) {
    urlBase = `/payment/employeeYear/${schoolId}/${id}/${history.year}/page`;
  } else {
    return;
  }

  let allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await axios.get(`${urlBase}?page=${page}`, config);
      const records = res.data?.data?.records || [];
      if (records.length > 0) {
        allData = allData.concat(records);
        page++;
        hasMore = records.length === 15;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Export uchun malumotlarni olishda xatolik:", err);
      hasMore = false;
    }
  }

  if (history.dayModal) {
    history.dayList = allData;
  } else if (history.monthModal) {
    history.monthList = allData;
  } else if (history.groupMonthModal) {
    history.groupMonthList = allData;
  } else if (history.yearModal) {
    history.yearList = allData;
  }
};

const exportToExcel = async () => {
  loading.excel = true;
  await getAllHistoryForExport();

  const rawData = history.dayModal
    ? history.dayList
    : history.monthModal
    ? history.monthList
    : history.groupMonthModal
    ? history.groupMonthList
    : history.yearList;

  if (!rawData || rawData.length === 0) {
    loading.excel = false;
    notification.warning("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  const dataToExport = rawData.map((item) => ({
    "O'quvchi (F . I . O)": item.student_name,
    "Guruh nomi": item.group_name,
    "Guruh narxi": Number(item.group_price).toLocaleString("uz-UZ") + " so'm",
    "To'lov turi": item.method,
    "To'langan summa": Number(item.price),
    "Chegirma (%)": item.discount + " %",
    Oy: monthNames(item.month),
    "To'lov sanasi (Oy)": monthNames(
      String(new Date(item.createdAt).getMonth() + 1).padStart(2, "0")
    ),
    "To'lov sanasi": chekDateFormat(new Date(item.createdAt)),
    Izoh: item.description,
    Holati:
      item.status === "delete"
        ? "O'chirilgan"
        : item.status === "update"
        ? "O'zgartirilgan"
        : "Tasdiqlangan",
  }));

  const ws = XLSX.utils.json_to_sheet(dataToExport, { origin: "A1" });

  const lastRow = dataToExport.length + 1;

  if (
    !history.yearModal &&
    store.statisticTeacher.statistics &&
    store.statisticTeacher.statistics.length > 0
  ) {
    const startRow = lastRow + 4;

    ws[`A${startRow}`] = { t: "s", v: "To'lov turi" };
    ws[`B${startRow}`] = { t: "s", v: "To'lovlar soni" };
    ws[`C${startRow}`] = { t: "s", v: "Jami summa" };

    store.statisticTeacher.statistics.forEach((stat, idx) => {
      const row = startRow + idx + 1;
      ws[`A${row}`] = { t: "s", v: stat.method };
      ws[`B${row}`] = {
        t: "s",
        v: Number(stat.count).toLocaleString("uz-UZ") + " ta",
      };
      ws[`C${row}`] = {
        t: "s",
        v: Number(stat.sum).toLocaleString("uz-UZ") + " so'm",
      };
    });

    const numColumns = Object.keys(dataToExport[0]).length;
    const maxRow = startRow + store.statisticTeacher.statistics.length;
    ws["!ref"] = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: numColumns - 1, r: maxRow - 1 },
    });
  } else {
    const numColumns = Object.keys(dataToExport[0]).length;
    ws["!ref"] = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: numColumns - 1, r: dataToExport.length },
    });
  }

  ws["!cols"] = [
    { wpx: 180 },
    { wpx: 180 },
    { wpx: 200 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 120 },
    { wpx: 160 },
    { wpx: 100 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "To'lov Tarixi");

  const fileName = history.dayModal
    ? `kunlik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}-${history.day}.xlsx`
    : history.monthModal
    ? `oylik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}.xlsx`
    : history.groupMonthModal
    ? `guruhni_oylik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}-${history.group_name}.xlsx`
    : `barcha_tolov_tarixi_${store.teacher_name}-${history.year}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
  loading.excel = false;
  history.modal = !history.modal;
  notification.success("Excel fayl yuklab olindi!");
};

const getAllHistoryForExportCost = async () => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let urlBase;
  if (history.category_id && history.category_id !== "") {
    urlBase = `/cost/${schoolId}/${costHistory.year}/${costHistory.month}/${history.category_id}/page`;
  } else {
    urlBase = `/cost/${schoolId}/${costHistory.year}/${costHistory.month}/page`;
  }

  let allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await axios.get(`${urlBase}?page=${page}`, config);
      const records = res.data?.data?.records || [];
      if (records.length > 0) {
        allData = allData.concat(records);
        page++;
        hasMore = records.length === 15;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Export uchun malumotlarni olishda xatolik:", err);
      hasMore = false;
    }
  }

  costHistory.costList = allData;
};

const exportToExcelCost = async () => {
  await getAllHistoryForExportCost();

  const rawData = costHistory.costList;

  if (!rawData || rawData.length === 0) {
    notification.warning("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  const dataToExport = rawData.map((item) => ({
    Kategoriya: item.costCategory.name,
    Suma: item.price,
    "To'lov turi": item.method,
    Oy: monthNames(item.month),
    Izoh: item.description,
    "To'lov sanasi": chekDateFormat(new Date(item.createdAt)),
  }));

  const ws = XLSX.utils.json_to_sheet(dataToExport, { origin: "A1" });

  // const lastRow = dataToExport.length + 1;

  // if (
  //   store.statisticTeacher.statistics &&
  //   store.statisticTeacher.statistics.length > 0
  // ) {
  //   const startRow = lastRow + 4;

  //   ws[`A${startRow}`] = { t: "s", v: "To'lov turi" };
  //   ws[`B${startRow}`] = { t: "s", v: "To'lovlar soni" };
  //   ws[`C${startRow}`] = { t: "s", v: "Jami summa" };

  //   store.statisticTeacher.statistics.forEach((stat, idx) => {
  //     const row = startRow + idx + 1;
  //     ws[`A${row}`] = { t: "s", v: stat.method };
  //     ws[`B${row}`] = {
  //       t: "s",
  //       v: Number(stat.count).toLocaleString("uz-UZ") + " ta",
  //     };
  //     ws[`C${row}`] = {
  //       t: "s",
  //       v: Number(stat.sum).toLocaleString("uz-UZ") + " so'm",
  //     };
  //   });

  //   const numColumns = Object.keys(dataToExport[0]).length;
  //   const maxRow = startRow + store.statisticTeacher.statistics.length;
  //   ws["!ref"] = XLSX.utils.encode_range({
  //     s: { c: 0, r: 0 },
  //     e: { c: numColumns - 1, r: maxRow - 1 },
  //   });
  // } else {
  //   const numColumns = Object.keys(dataToExport[0]).length;
  //   ws["!ref"] = XLSX.utils.encode_range({
  //     s: { c: 0, r: 0 },
  //     e: { c: numColumns - 1, r: dataToExport.length },
  //   });
  // }

  const numColumns = Object.keys(dataToExport[0]).length;
  ws["!ref"] = XLSX.utils.encode_range({
    s: { c: 0, r: 0 },
    e: { c: numColumns - 1, r: dataToExport.length },
  });

  ws["!cols"] = [
    { wpx: 180 },
    { wpx: 180 },
    { wpx: 200 },
    { wpx: 120 },
    { wpx: 120 },
    { wpx: 130 },
    { wpx: 110 },
    { wpx: 90 },
    { wpx: 160 },
    { wpx: 90 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Chiqim Tarixi");

  const fileName =
    history.category_id && history.category_id !== ""
      ? `kategoriya_oylik_chiqim_tarixi_${costHistory.year}-${costHistory.month}-${history.category_name}.xlsx`
      : `oylik_chiqim_tarixi_${costHistory.year}-${costHistory.month}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
  // location.reload();
  notification.success("Excel fayl yuklab olindi!");
};

const getAllHistoryForExportSalary = async () => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let urlBase;
  if (history.teacher_id && history.teacher_id !== "") {
    urlBase = `/salary/teacherSalary/${schoolId}/${history.teacher_id}/${salaryHistory.year}/${salaryHistory.month}/page`;
  } else {
    if (store.guard) {
      urlBase = `/salary/${schoolId}/${salaryHistory.year}/${salaryHistory.month}/page`;
    } else {
      urlBase = `/salary/teacherSalary/${schoolId}/${localStorage.getItem(
        "id"
      )}/${salaryHistory.year}/${salaryHistory.month}/page`;
    }
  }

  let allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await axios.get(`${urlBase}?page=${page}`, config);
      const records = res.data?.data?.records || [];
      if (records.length > 0) {
        allData = allData.concat(records);
        page++;
        hasMore = records.length === 15;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Export uchun malumotlarni olishda xatolik:", err);
      hasMore = false;
    }
  }

  salaryHistory.salaryList = allData;
};

const exportToExcelSalary = async () => {
  await getAllHistoryForExportSalary();

  const rawData = salaryHistory.salaryList;

  if (!rawData || rawData.length === 0) {
    notification.warning("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  const dataToExport = rawData.map((item) => ({
    "O'qituvchi (F . I . O)": item.teacher.full_name,
    Suma: item.price,
    "To'lov turi": item.method,
    Oy: monthNames(item.month),
    // Izoh: item.description,
    "To'lov sanasi": chekDateFormat(new Date(item.createdAt)),
  }));

  const ws = XLSX.utils.json_to_sheet(dataToExport, { origin: "A1" });

  // const lastRow = dataToExport.length + 1;

  // if (
  //   store.statisticTeacher.statistics &&
  //   store.statisticTeacher.statistics.length > 0
  // ) {
  //   const startRow = lastRow + 4;

  //   ws[`A${startRow}`] = { t: "s", v: "To'lov turi" };
  //   ws[`B${startRow}`] = { t: "s", v: "To'lovlar soni" };
  //   ws[`C${startRow}`] = { t: "s", v: "Jami summa" };

  //   store.statisticTeacher.statistics.forEach((stat, idx) => {
  //     const row = startRow + idx + 1;
  //     ws[`A${row}`] = { t: "s", v: stat.method };
  //     ws[`B${row}`] = {
  //       t: "s",
  //       v: Number(stat.count).toLocaleString("uz-UZ") + " ta",
  //     };
  //     ws[`C${row}`] = {
  //       t: "s",
  //       v: Number(stat.sum).toLocaleString("uz-UZ") + " so'm",
  //     };
  //   });

  //   const numColumns = Object.keys(dataToExport[0]).length;
  //   const maxRow = startRow + store.statisticTeacher.statistics.length;
  //   ws["!ref"] = XLSX.utils.encode_range({
  //     s: { c: 0, r: 0 },
  //     e: { c: numColumns - 1, r: maxRow - 1 },
  //   });
  // } else {
  //   const numColumns = Object.keys(dataToExport[0]).length;
  //   ws["!ref"] = XLSX.utils.encode_range({
  //     s: { c: 0, r: 0 },
  //     e: { c: numColumns - 1, r: dataToExport.length },
  //   });
  // }

  const numColumns = Object.keys(dataToExport[0]).length;
  ws["!ref"] = XLSX.utils.encode_range({
    s: { c: 0, r: 0 },
    e: { c: numColumns - 1, r: dataToExport.length },
  });

  ws["!cols"] = [
    { wpx: 180 },
    { wpx: 180 },
    { wpx: 200 },
    { wpx: 120 },
    { wpx: 120 },
    { wpx: 130 },
    { wpx: 110 },
    { wpx: 90 },
    { wpx: 160 },
    { wpx: 90 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Maoshlar Tarixi");

  const fileName =
    history.teacher_id && history.teacher_id !== ""
      ? `xodimning_oylik_maosh_tarixi_${salaryHistory.year}-${salaryHistory.month}-${history.teacher_name}.xlsx`
      : `oylik_maosh_tarixi_${salaryHistory.year}-${salaryHistory.month}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
  // location.reload();
  notification.success("Excel fayl yuklab olindi!");
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
    getStatistic();
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
    getStatistic();
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
    notification.success("Maosh kiritildi");

    await getSalary(store.salaryPagination);
    getStatistic();
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
    getStatistic();
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
    description: salary.description,
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
    getStatistic();
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
    getStatistic();
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
    getStatistic();
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
    getStatistic();
    notification.success("Berilgan maosh o'chirildi");
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

onMounted(() => {
  if (store.guard) {
    getStatistic();
    getCostCategory();
    getCost(store.costPagination);
    getSalary(store.salaryPagination);
    getMethod();
    getEmployee();
  } else {
    getHistory(store.teacherPagination);
    getGroups();
    getTeacherSalary(store.salaryPagination);
  }
  for (let i = 0; i < 5; i++) {
    let list = {
      id: i,
      name: String(orqaYil + i),
    };
    store.curentYil.push(list);
  }
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnAdd2 {
  background-image: linear-gradient(to right, white -450%, red);
}

.btnAdd3 {
  background-image: linear-gradient(to right, white -450%, #ff9800);
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
