<template>
  <section class="min-h-screen px-4 py-6" :class="navbar.userNav ? 'bg-slate-950' : 'bg-gray-100'">
    <div class="mt-10" v-show="!store.loading">
      <Placeholder2 />
    </div>

    <PageLoader :loading="loading.excel" text="Excel tayyorlanmoqda..." />

    <div v-show="store.loading" class="mx-auto mb-10 sm:mb-20">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="mb-1 text-xs font-medium tracking-widest uppercase" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">
            Xodim profili
          </p>
          <h1 class="text-xl font-bold" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
            <span v-show="store.modalInfo">{{ store.data.full_name }}</span>
            <span v-show="store.modalGroup">Xodimning guruhlari</span>
            <span v-show="store.modalPayment">Xodimning oylik hisoboti</span>
          </h1>
        </div>
        <button
          @click="router.back(-1)"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Orqaga
        </button>
      </div>

      <!-- HISTORY MODAL -->
      <div
        v-show="history.modal"
        @click.self="historyModal"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
      >
        <transition name="modal-fade">
          <div class="relative w-full h-auto max-w-2xl p-4">
            <div class="p-5 rounded-2xl" :class="navbar.userNav ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100 shadow-lg'">
              <div class="flex items-center justify-between pb-4 mb-4 border-b" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
                <h3 class="text-lg font-bold" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">To'lov tarixini ko'rish</h3>
                <button
                  @click="historyModal"
                  type="button"
                  class="p-1.5 rounded-xl"
                  :class="navbar.userNav ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'"
                >
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div
                class="grid w-full grid-cols-2 gap-1 p-1 mb-5 lg:grid-cols-4 rounded-xl"
                :class="navbar.userNav ? 'bg-slate-800' : 'bg-slate-100'"
              >
                <button
                  type="button"
                  @click="historyDayModal"
                  class="px-4 py-2 text-sm font-medium transition-all rounded-xl whitespace-nowrap"
                  :class="
                    history.dayModal
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                      : navbar.userNav
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-800'
                  "
                >
                  Kun bo'yicha
                </button>
                <button
                  type="button"
                  @click="historyMonthModal"
                  class="px-4 py-2 text-sm font-medium transition-all rounded-xl whitespace-nowrap"
                  :class="
                    history.monthModal
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                      : navbar.userNav
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-800'
                  "
                >
                  Oy bo'yicha
                </button>
                <button
                  type="button"
                  @click="historyGroupMonthModal"
                  class="px-4 py-2 text-sm font-medium transition-all rounded-xl whitespace-nowrap"
                  :class="
                    history.groupMonthModal
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                      : navbar.userNav
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-800'
                  "
                >
                  Guruh bo'yicha
                </button>
                <button
                  type="button"
                  @click="historyYearModal"
                  class="px-4 py-2 text-sm font-medium transition-all rounded-xl whitespace-nowrap"
                  :class="
                    history.yearModal
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                      : navbar.userNav
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-800'
                  "
                >
                  Barchasini
                </button>
              </div>

              <!-- Day form -->
              <form v-show="history.dayModal" @submit.prevent="getHistory(store.pagination)">
                <div class="grid gap-4 mb-5">
                  <div>
                    <label for="year" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Yilni tanlang</label>
                    <select
                      v-model="history.year"
                      id="year"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option v-for="i in store.curentYil" :key="i.id" :value="i.name">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Oyni tanlang</label>
                    <select
                      v-model="history.month"
                      id="month"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
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
                    <label for="day" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Kuni kiriting</label>
                    <input
                      v-model="history.day"
                      id="day"
                      type="number"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                      placeholder="Kuni kiriting.."
                      min="1"
                      max="31"
                      required
                    />
                  </div>
                </div>
                <div class="flex flex-col justify-center w-full gap-4 pt-5 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 focus:ring-2 focus:ring-orange-300"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                      :class="navbar.userNav ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>

              <!-- Month form -->
              <form v-show="history.monthModal" @submit.prevent="getHistory(store.pagination)">
                <div class="grid gap-4 mb-5">
                  <div>
                    <label for="year2" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Yilni tanlang</label>
                    <select
                      v-model="history.year"
                      id="year2"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option v-for="i in store.curentYil" :key="i.id" :value="i.name">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="month2" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Oyni tanlang</label>
                    <select
                      v-model="history.month"
                      id="month2"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
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
                <div class="flex flex-col justify-center w-full gap-4 pt-5 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 focus:ring-2 focus:ring-orange-300"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                      :class="navbar.userNav ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>

              <!-- Group-month form -->
              <form v-show="history.groupMonthModal" @submit.prevent="getHistory(store.pagination)">
                <div class="grid gap-4 mb-5">
                  <div>
                    <label for="year3" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Yilni tanlang</label>
                    <select
                      v-model="history.year"
                      id="year3"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option v-for="i in store.curentYil" :key="i.id" :value="i.name">{{ i.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="month3" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Oyni tanlang</label>
                    <select
                      v-model="history.month"
                      id="month3"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
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
                    <label for="group_search" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Guruhni tanlang</label>
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-4 h-4 text-slate-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <input
                        v-model="history.filter"
                        @focus="history.selectLamp = true"
                        @blur="history.selectLamp = false; history.filter_show = false;"
                        @input="history.filter_show = true; searchHistoryFunc();"
                        type="search"
                        id="group_search"
                        class="block w-full p-2.5 pl-10 text-sm border rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
                        :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                        placeholder="Guruhni tanlang yoki qidirish..."
                      />
                      <ul
                        v-show="history.filter_show && history.searchList.length > 0"
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto bg-white shadow-lg rounded-xl max-h-80 bottom-full text-slate-700"
                      >
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                          v-for="(i, index) in history.searchList"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.group.id;
                            history.group_name = i.group.name;
                            history.filter_show = false;
                            history.filter = i.group.name;
                          "
                        >
                          {{ i.group.name }}
                        </li>
                      </ul>
                      <ul
                        v-show="history.selectLamp && !history.filter"
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto bg-white shadow-lg rounded-xl max-h-80 bottom-full text-slate-700"
                      >
                        <li
                          class="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                          v-for="(i, index) in store.group"
                          :key="index"
                          @mousedown.prevent="
                            history.group_id = i.group.id;
                            history.group_name = i.group.name;
                            history.selectLamp = false;
                            history.filter = i.group.name;
                          "
                        >
                          {{ i.group.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col justify-center w-full gap-4 pt-5 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 focus:ring-2 focus:ring-orange-300"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                      :class="navbar.userNav ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>

              <!-- Year form -->
              <form v-show="history.yearModal" @submit.prevent="getHistory(store.pagination)">
                <div class="grid gap-4 mb-5">
                  <div>
                    <label for="year4" class="block mb-2 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Yilni tanlang</label>
                    <select
                      v-model="history.year"
                      id="year4"
                      class="text-sm rounded-xl block w-full p-2.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option v-for="i in store.curentYil" :key="i.id" :value="i.name">{{ i.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col justify-center w-full gap-4 pt-5 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
                  <ButtonLoader
                    :loading="loading.excel"
                    @click="exportToExcel"
                    type="button"
                    class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 focus:ring-2 focus:ring-orange-300"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="px-5 py-2.5 text-sm font-medium rounded-xl border"
                      :class="navbar.userNav ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 focus:ring-2 focus:ring-blue-300"
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

      <!-- TABS -->
      <div class="flex justify-end w-full gap-1 mb-6">
        <div
          class="grid w-full grid-cols-3 gap-1 p-1 md:w-auto rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white shadow-sm border border-slate-200'"
        >
          <button
            @click="infoModal"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              store.modalInfo
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Ma'lumot</span>
          </button>
          <button
            @click="groupModal"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              store.modalGroup
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Guruhlar</span>
          </button>
          <button
            @click="paymentModal"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              store.modalPayment
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">Oylik hisobot</span>
          </button>
        </div>
      </div>

      <!-- INFO TAB -->
      <div v-show="store.modalInfo">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div
            class="flex flex-col items-center gap-4 p-6 text-center rounded-2xl"
            :class="navbar.userNav ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100 shadow-sm'"
          >
            <div class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              {{ store.data.full_name?.charAt(0) }}
            </div>
            <div>
              <h2 class="text-lg font-bold" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
                {{ store.data.full_name }}
              </h2>
              <p class="mt-1 text-sm" :class="navbar.userNav ? 'text-slate-400' : 'text-slate-500'">
                {{ store.data.phone_number }}
              </p>
            </div>
            <div class="w-full pt-4 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'">
              <p class="mb-1 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Qo'shilgan sana</p>
              <p class="text-sm font-medium" :class="navbar.userNav ? 'text-slate-300' : 'text-slate-700'">
                {{ store.addDate }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 lg:col-span-2">
            <div
              class="p-5 rounded-2xl"
              :class="navbar.userNav ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100 shadow-sm'"
            >
              <p class="mb-4 text-xs font-semibold tracking-widest uppercase" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">
                Xodim ma'lumotlari
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p class="mb-1 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Lavozim</p>
                  <p class="font-medium" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">{{ store.data.role }}</p>
                </div>
                <div>
                  <p class="mb-1 text-xs" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Telefon raqami</p>
                  <p class="font-medium" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">{{ store.data.phone_number }}</p>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-5 rounded-2xl"
              :class="navbar.userNav ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100 shadow-sm'"
            >
              <div>
                <p class="text-sm font-medium" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">Maoshi</p>
                <p class="text-xs mt-0.5" :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'">Foizli ulush</p>
              </div>
              <span
                class="px-4 py-1.5 text-lg font-bold rounded-xl"
                :class="navbar.userNav ? 'bg-green-950 text-green-400 border border-green-900' : 'bg-green-50 text-green-700 border border-green-100'"
              >
                {{ store.data.salary }} %
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- GROUP TAB -->
      <div
        v-show="store.modalGroup"
        class="overflow-hidden border rounded-2xl"
        :class="navbar.userNav ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm !border-none">
            <thead class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600">
              <tr>
                <th scope="col" class="py-3 text-center">Nomi</th>
                <th scope="col" class="py-3 text-center">Fani</th>
                <th scope="col" class="py-3 text-center">Narxi</th>
                <th scope="col" class="py-3 text-center">Boshlanish sanasi</th>
                <th scope="col" class="py-3 text-center">Qo'shilgan sanasi</th>
                <th scope="col" class="py-3 text-center">To'liq</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="navbar.userNav ? 'border-slate-800 hover:bg-slate-800/50' : 'border-slate-100 hover:bg-gray-50'"
                v-for="i in store.group"
                :key="i.id"
              >
                <td scope="row" class="px-8 py-4 font-medium text-center whitespace-nowrap">
                  {{ i.group.name }}
                </td>
                <td class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap">
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    <span v-for="fan in i.group.subject" :key="fan.id">{{ fan.subject.name }} </span>
                  </p>
                </td>
                <td class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap">
                  <p class="bg-red-100 rounded-[5px] p-1">{{ Number(i.group.price).toLocaleString("uz-UZ") }} so'm</p>
                </td>
                <td class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap">
                  <p class="bg-blue-100 rounded-[5px] p-1">{{ i.group.start_date }}</p>
                </td>
                <td class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap">
                  <p class="bg-blue-100 rounded-[5px] p-1">{{ i.createdAt.split("T")[0] }}</p>
                </td>
                <td class="px-8 py-4 font-medium text-center">
                  <button
                    @click="enterSlug(i.group.id, i.group.name.toLowerCase())"
                    class="px-5 py-2 text-white bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl focus:ring-2"
                  >
                    Kirish
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-show="store.group.length == 0" class="p-20 text-center text-slate-400">
            Guruhlar ro'yxati bo'sh
          </div>
        </div>
      </div>

      <!-- PAYMENT TAB -->
      <div v-show="store.modalPayment" class="flex flex-col gap-5">
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <div
            class="p-5 rounded-2xl chart-container"
            :class="navbar.userNav ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-100 shadow-sm text-slate-700'"
          >
            <div class="flex items-center justify-between w-full mb-2">
              <h2 class="text-sm font-semibold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
                Tushum statistikasi ({{ store.year }})
              </h2>
              <form @submit.prevent="getCurrentYearPayments">
                <select
                  v-model="store.year"
                  id="year"
                  class="text-sm rounded-xl block w-full p-1.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                  required
                  @change="getCurrentYearPayments"
                >
                  <option value="" disabled selected>Yilni tanlang</option>
                  <option v-for="i in store.curentYil" :key="i.id" :value="i.name">{{ i.name }}</option>
                </select>
              </form>
            </div>
            <canvas id="paymentChart"></canvas>
          </div>

          <div
            class="p-5 rounded-2xl chart-container2"
            :class="navbar.userNav ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-100 shadow-sm text-slate-700'"
          >
            <div class="flex items-center justify-between w-full mb-2">
              <h2 class="text-sm font-semibold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
                O'quvchilar statistikasi ({{ monthNames(store.month) }})
              </h2>
              <form @submit.prevent="getStudentPayments">
                <select
                  v-model="store.month"
                  id="month"
                  class="text-sm rounded-xl block w-full p-1.5 border focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  :class="navbar.userNav ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'"
                  required
                  @change="getStudentPayments"
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
              </form>
            </div>
            <canvas id="studentPaymentChart"></canvas>
          </div>
        </div>

        <div
          class="flex flex-col justify-between gap-4 p-5 rounded-2xl sm:flex-row sm:items-center"
          :class="navbar.userNav ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100 shadow-sm'"
        >
          <h2 v-show="history.dayModal" class="text-sm font-bold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
            Kunlik to'lov tarixi &mdash; {{ history.year }}/{{ history.month }}/{{ history.day }}
          </h2>
          <h2 v-show="history.monthModal" class="text-sm font-bold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
            Oylik to'lov tarixi &mdash; {{ history.year }}/{{ history.month }}
          </h2>
          <h2 v-show="history.groupMonthModal" class="text-sm font-bold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
            Guruhni oylik to'lov tarixi &mdash; {{ history.year }}/{{ history.month }}/{{ history.group_name }}
          </h2>
          <h2 v-show="history.yearModal" class="text-sm font-bold sm:text-base" :class="navbar.userNav ? 'text-white' : 'text-slate-800'">
            Barcha to'lov tarixi &mdash; {{ history.year }}
          </h2>
          <button
            @click="history.modal = true"
            type="button"
            class="flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 sm:w-auto focus:ring-2 focus:ring-blue-300"
          >
            To'lov tarixi
          </button>
        </div>

        <div
          class="overflow-hidden border rounded-2xl"
          :class="navbar.userNav ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm !border-none">
              <thead class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600">
                <tr>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">O'quvchi (F . I . O)</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">Guruh</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">Kurs narxi</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">To'lov turi</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">To'lov narxi</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">Oy</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">To'lov sanasi</th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">Izoh</th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  v-for="i in store.PageProduct"
                  :key="i"
                  class="border-b last:border-b-0"
                  :class="navbar.userNav ? 'border-slate-800 hover:bg-slate-800/50' : 'border-slate-100 hover:bg-gray-50'"
                >
                  <th scope="row" class="px-8 py-4 font-medium text-center whitespace-nowrap">
                    {{ i.student_name }}
                  </th>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ i.group_name }}</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ Number(i.group_price).toLocaleString("uz-UZ") }} so'm</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ i.method }}</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-green-700">
                    <p class="bg-green-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ i.price.toLocaleString("uz-UZ") }} so'm</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ monthNames(i.month) }}</p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">{{ formatDateToNumeric(new Date(i.createdAt)) }}</p>
                  </td>
                  <td class="relative px-8 py-2 font-medium text-center">
                    <div class="relative inline-block w-40 group">
                      <p class="truncate w-40 p-1 rounded-[5px]">
                        {{
                          !i.description || i.description.trim() === ""
                            ? "Izoh yo'q"
                            : i.description.split(" ").length > 3
                              ? i.description.split(" ").slice(0, 3).join(" ") + "..."
                              : i.description
                        }}
                      </p>
                      <span class="absolute hidden max-w-xs p-2 mb-1 text-sm text-blue-800 -translate-x-1/2 bg-blue-100 rounded-md shadow-lg left-1/2 bottom-full w-max group-hover:block">
                        {{ !i.description ? "Izoh yo'q" : i.description }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-show="store.PageProduct && store.PageProduct.length == 0" class="p-20 text-center text-slate-400">
              To'lov ro'yxati bo'sh
            </div>
          </div>

          <nav class="flex flex-row items-center justify-between p-4 border-t" :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'" aria-label="Table navigation">
            <ul class="flex items-center">
              <li
                :class="[
                  store.pagination === 1 ? 'pointer-events-none opacity-50' : '',
                  navbar.userNav ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
                  'flex items-center justify-center text-sm font-medium sm:py-2 sm:px-6 px-3 py-2 rounded-xl cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.pagination > 1) {
                    store.pagination -= 1;
                    getHistory(store.pagination);
                  }
                "
              >
                <i class="text-xl md:hidden bx bx-chevron-left"></i>
                <span class="hidden md:block">Oldingi</span>
              </li>
            </ul>

            <span class="text-sm font-normal text-center" :class="navbar.userNav ? 'text-slate-300' : 'text-slate-600'">
              Sahifa
              <span class="font-semibold">
                <span>{{ store.page[0] * 15 - 14 }}</span> -
                <span v-if="store.page[0] * 15 < store.page[1]">{{ store.page[0] * 15 }}</span>
                <span v-else>{{ store.page[1] }}</span>
              </span>
              dan
              <span class="font-semibold">{{ store.page[1] }}</span>
            </span>

            <ul class="flex items-center">
              <li
                :class="[
                  store.page[0] * 15 >= store.page[1] ? 'pointer-events-none opacity-50' : '',
                  navbar.userNav ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
                  'flex items-center justify-center text-sm font-medium sm:py-2 sm:px-6 px-3 py-2 rounded-xl cursor-pointer transition duration-200 ease-in-out',
                ]"
                @click="
                  if (store.page[0] * 15 < store.page[1]) {
                    store.pagination += 1;
                    getHistory(store.pagination);
                  }
                "
              >
                <span class="hidden md:block">Keyingi</span>
                <i class="text-xl md:hidden bx bx-chevron-right"></i>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { Placeholder2, ButtonLoader, PageLoader } from "../../components";
import Chart from "chart.js/auto";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = String(hozirgiSana.getMonth() + 1).padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

// Computed properties
const schoolId = computed(() => localStorage.getItem("school_id"));
const employeeId = computed(() => router.currentRoute.value.params.id);
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

// Chart theme computed
const chartTheme = computed(() => ({
  background: navbar.userNav ? "#1e293b" : "#ffffff",
  textColor: navbar.userNav ? "#ffffff" : "#000000",
  gridColor: navbar.userNav ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
}));

const loading = reactive({
  view: false,
  excel: false,
});

const store = reactive({
  data: [],
  group: [],
  payment: [],
  modalInfo: true,
  modalGroup: false,
  modalPayment: false,
  chekDate: false,
  paymentGroup: false,
  loading: false,
  curentYil: [],
  year: hozirgiSana.getFullYear(),
  month: String(hozirgiSana.getMonth() + 1).padStart(2, "0"),
  PageProduct: [],
  page: [],
  pagination: 1,
  teacher_name: "",
  statistic: "",
  addDate: "",
});

const info = reactive({
  PaymentStats: [],
  StudentPayments: [],
});

const history = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  modal: false,
  dayModal: true,
  monthModal: false,
  yearModal: false,
  groupMonthModal: false,
  filter_show: false,
  filter: "",
  selectLamp: false,
  searchList: [],
  dayList: [],
  monthList: [],
  yearList: [],
  groupMonthList: [],
  dayPay: 0,
});

// Helper functions
const monthNames = (month) => {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  return months[parseInt(month) - 1] || "Notog'ri oy";
};

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hour}:${minute}`;
};

function searchHistoryFunc() {
  if (!history.filter) {
    history.searchList = [];
    return;
  }

  const filterLower = history.filter.toLowerCase();
  history.searchList = store.group.filter((i) =>
    i.group.name.toLowerCase().includes(filterLower),
  );
}

// Modal handlers
const setActiveModal = (modalType) => {
  store.modalInfo = modalType === "info";
  store.modalGroup = modalType === "group";
  store.modalPayment = modalType === "payment";
};

const infoModal = () => setActiveModal("info");
const groupModal = () => setActiveModal("group");
const paymentModal = () => setActiveModal("payment");

const setActiveHistoryModal = (type) => {
  history.dayModal = type === "day";
  history.monthModal = type === "month";
  history.groupMonthModal = type === "groupMonth";
  history.yearModal = type === "year";
};

const historyDayModal = () => setActiveHistoryModal("day");
const historyMonthModal = () => setActiveHistoryModal("month");
const historyGroupMonthModal = () => setActiveHistoryModal("groupMonth");
const historyYearModal = () => setActiveHistoryModal("year");

const historyModal = () => {
  Object.assign(history, {
    modal: !history.modal,
    year: hozirgiYil,
    month: hozirgiOy,
    day: hozirgiKun,
    group_id: "",
  });
  historyDayModal();
  getHistory(store.pagination);
};

function enterSlug(id, name) {
  router.push(`/groups/${id}/${name}`);
}

const fetchData = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {
      headers: authHeaders.value,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API xatosi:", error);
    throw error;
  }
};

// API Functions
const getEmployee = async () => {
  try {
    const data = await fetchData(
      `/v1/employee/${schoolId.value}/${employeeId.value}`,
    );

    Object.assign(store, {
      data: data,
      teacher_name: data.full_name,
      group: data.group,
      addDate: data.createdAt.split("T")[0],
      loading: true,
    });
  } catch (error) {
    console.error("Xodim ma'lumotlarini olishda xato:", error);
  }
};

const getCurrentYearPayments = async () => {
  try {
    const res = await axios.get(
      `/v1/statistic/teacher-salary/${schoolId.value}/${employeeId.value}/${store.year}`,
      { headers: authHeaders.value },
    );
    info.PaymentStats = res.data.PaymentStats;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

const getStudentPayments = async () => {
  try {
    const res = await axios.get(
      `/v1/statistic/teacher-studentPayments/${schoolId.value}/${employeeId.value}/${store.month}`,
      { headers: authHeaders.value },
    );
    info.StudentPayments = res.data.studentPayments;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

// Chart management
let paymentChart = null;
const createPaymentChart = () => {
  const ctx = document.getElementById("paymentChart")?.getContext("2d");
  if (!ctx) return;

  if (paymentChart) {
    paymentChart.destroy();
  }

  paymentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
      ],
      datasets: [
        {
          label: "Tushum (so'm)",
          data: info.PaymentStats,
          backgroundColor: "#1a56db",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: { color: chartTheme.value.gridColor },
          ticks: { color: chartTheme.value.textColor },
        },
        y: {
          beginAtZero: true,
          grid: { color: chartTheme.value.gridColor },
          ticks: { color: chartTheme.value.textColor },
        },
      },
      plugins: {
        legend: {
          labels: { color: chartTheme.value.textColor },
        },
      },
    },
  });
};

let studentPaymentChart = null;
const createStudentPaymentChart = () => {
  const ctx = document.getElementById("studentPaymentChart")?.getContext("2d");
  if (!ctx) return;

  if (studentPaymentChart) {
    studentPaymentChart.destroy();
  }

  studentPaymentChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["To'liq To'lov", "Yarim To'lov", "To'lov Qilmaganlar"],
      datasets: [
        {
          label: "O'quvchi",
          data: [
            info.StudentPayments.fullPayment,
            info.StudentPayments.halfPayment,
            info.StudentPayments.noPayment,
          ],
          backgroundColor: ["#1a56db", "#ff9800", "#e02424"],
          borderColor: "#ffffff",
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: chartTheme.value.textColor },
        },
      },
    },
  });
};

const getHistory = async (page = 1) => {
  loading.view = true;

  const url = `/v1/payment/history`;

  const params = {
    school_id: schoolId.value,
    employee_id: employeeId.value,
    page,
    status: history.status || "all",
  };

  if (history.dayModal) {
    params.year = history.year;
    params.month = history.month;
    params.day = history.day;
  } else if (history.monthModal) {
    params.year = history.year;
    params.month = history.month;
  } else if (history.groupMonthModal) {
    params.group_id = history.group_id;
    params.year = history.year;
    params.month = history.month;
  } else if (history.yearModal) {
    params.year = history.year;
  } else {
    loading.view = false;
    return;
  }

  try {
    const res = await axios.get(url, { headers: authHeaders.value, params });
    const records = res.data?.data?.records || [];

    if (records.length !== 0) {
      history.group_name = records[0].group_name;
    }

    store.PageProduct = records;

    const pagination = res.data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];

    loading.view = false;
    history.modal = false;
  } catch (error) {
    loading.view = false;
    store.PageProduct = error.response?.data?.message || [];
  }
};

const exportToExcel = async () => {
  loading.excel = true;
  const config = {
    headers: authHeaders.value,
    responseType: "blob",
  };

  let urlBase = `/v1/payment/history/teacher/excel?school_id=${schoolId.value}`;
  let fileName = "payment";

  if (history.dayModal) {
    urlBase += `&year=${history.year}&month=${history.month}&day=${history.day}&employee_id=${employeeId.value}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}_${history.day}`;
  } else if (history.monthModal) {
    urlBase += `&year=${history.year}&month=${history.month}&employee_id=${employeeId.value}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}`;
  } else if (history.groupMonthModal) {
    urlBase = `/v1/payment/history/excel?school_id=${schoolId.value}&year=${history.year}&month=${history.month}&group_id=${history.group_id}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}_group`;
  } else if (history.yearModal) {
    urlBase += `&year=${history.year}&employee_id=${employeeId.value}`;
    fileName = `payment_${history.year}`;
  } else {
    return;
  }

  try {
    const response = await axios.get(urlBase, config);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    loading.excel = false;
  } catch (err) {
    loading.excel = false;
  }
};

// Watchers
watch(
  () => navbar.userNav,
  () => {
    setTimeout(createPaymentChart, 300);
    setTimeout(createStudentPaymentChart, 300);
  },
);

watch(
  () => info.PaymentStats,
  () => {
    setTimeout(createPaymentChart, 300);
  },
);

watch(
  () => info.StudentPayments,
  () => {
    setTimeout(createStudentPaymentChart, 300);
  },
);

onMounted(() => {
  setTimeout(createPaymentChart, 300);
  setTimeout(createStudentPaymentChart, 300);
  getCurrentYearPayments();
  getStudentPayments();
  getEmployee();
  getHistory(store.pagination);

  store.curentYil = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: String(orqaYil + i),
  }));
});
</script>

<style lang="scss" scoped>
.chart-container,
.chart-container2 {
  width: 100%;
  margin: auto;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-container2 canvas {
  height: 320px !important;
  width: 320px !important;
}

@media (max-width: 1024px) {
  .chart-container,
  .chart-container2 {
    height: auto;
  }
}

@media (max-width: 768px) {
  .chart-container,
  .chart-container2 {
    height: 400px;
  }

  .chart-container2 canvas {
    height: 300px !important;
    width: 300px !important;
  }
}

@media (max-width: 480px) {
  .chart-container2 {
    height: 300px;
  }

  .chart-container2 canvas {
    height: 200px !important;
    width: 200px !important;
  }

  .chart-container {
    height: 220px;
  }
}
</style>