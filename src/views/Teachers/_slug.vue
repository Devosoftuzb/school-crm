<template>
  <section class="px-2">
    <!-- Slug start  -->

    <div>
      <div class="mt-10" v-show="!store.loading">
        <Placeholder2 />
      </div>

      <PageLoader :loading="loading.excel" text="Excel tayyorlanmoqda..." />
      <div
        v-show="store.loading"
        class="mt-10 rounded-xl p-[15px] mb-10 sm:mb-28"
        :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
      >
        <div class="flex items-center justify-between mb-5 font-bold">
          <h1 class="text-sm text-blue-700 sm:text-lg">
            <span v-show="store.modalInfo">Xodimning ma'lumotlari</span>
            <span v-show="store.modalGroup">Xodimning guruhlari</span>
            <span v-show="store.modalPayment">Xodimning oylik hisoboti</span>
          </h1>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
          >
            Orqaga qaytish
          </button>
        </div>

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
                class="relative p-4 shadow rounded-xl sm:p-5"
                :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
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
                  <div class="w-full rounded-xl" id="navbar-sticky">
                    <ul
                      class="grid w-full grid-cols-2 gap-3 font-medium text-white lg:grid-cols-4"
                    >
                      <li
                        class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                        :class="history.dayModal ? 'btn' : 'bg-gray-600'"
                        @click="historyDayModal"
                      >
                        <span>Kun bo'yicha</span>
                      </li>
                      <li
                        class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                        :class="history.monthModal ? 'btn' : 'bg-gray-600'"
                        @click="historyMonthModal"
                      >
                        <span>Oy bo'yicha</span>
                      </li>
                      <li
                        class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                        :class="history.groupMonthModal ? 'btn' : 'bg-gray-600'"
                        @click="historyGroupMonthModal"
                      >
                        <span>Guruh bo'yicha</span>
                      </li>
                      <li
                        class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                        :class="history.yearModal ? 'btn' : 'bg-gray-600'"
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
                  @submit.prevent="getHistory(store.pagination)"
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        required
                      >
                        <option value="" disabled selected>
                          Yilni tanlang
                        </option>
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
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
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </ButtonLoader>
                    <div class="flex items-center justify-between w-full">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <ButtonLoader
                        :loading="loading.view"
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </ButtonLoader>
                    </div>
                  </div>
                </form>
                <form
                  v-show="history.monthModal"
                  @submit.prevent="getHistory(store.pagination)"
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        required
                      >
                        <option value="" disabled selected>
                          Yilni tanlang
                        </option>
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </ButtonLoader>
                    <div class="flex items-center justify-between w-full">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <ButtonLoader
                        :loading="loading.view"
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </ButtonLoader>
                    </div>
                  </div>
                </form>
                <form
                  v-show="history.groupMonthModal"
                  @submit.prevent="getHistory(store.pagination)"
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        required
                      >
                        <option value="" disabled selected>
                          Yilni tanlang
                        </option>
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                          class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
                          class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                        >
                          <li
                            class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
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
                  <div
                    class="flex flex-col justify-center w-full gap-5 pt-5 mt-5 border-t"
                  >
                    <ButtonLoader
                      :loading="loading.excel"
                      @click="exportToExcel"
                      type="button"
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </ButtonLoader>
                    <div class="flex items-center justify-between w-full">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <ButtonLoader
                        :loading="loading.view"
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </ButtonLoader>
                    </div>
                  </div>
                </form>
                <form
                  v-show="history.yearModal"
                  @submit.prevent="getHistory(store.pagination)"
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
                        class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        required
                      >
                        <option value="" disabled selected>
                          Yilni tanlang
                        </option>
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
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </ButtonLoader>
                    <div class="flex items-center justify-between w-full">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <ButtonLoader
                        :loading="loading.view"
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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

        <div class="w-full bg-transparent rounded-xl">
          <ul
            class="bg-[rgba(213,219,242,0.5)] flex flex-wrap sm:justify-end justify-center font-medium p-3 gap-2 text-center text-sm rounded-t-lg"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li>
              <button
                @click="infoModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-slate-900 hover:text-white'
                "
              >
                Ma'lumot
              </button>
            </li>
            <li>
              <button
                @click="groupModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-slate-900 hover:text-white'
                "
              >
                Guruhlar
              </button>
            </li>
            <li>
              <button
                @click="paymentModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-slate-900 hover:text-white'
                "
              >
                Oylik hisobot
              </button>
            </li>
          </ul>
          <div
            v-show="store.modalInfo"
            id="defaultTabContent"
            :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
          >
            <div
              class="p-4 rounded-xl md:p-8"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <div class="flex flex-col gap-10 lg:flex-row">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  class="object-cover w-56 h-56 mx-auto rounded-full 2xl:w-80 2xl:h-80"
                />
                <div
                  class="w-full lg:border-l border-[#4141eb] p-5 flex flex-col gap-3"
                >
                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Ism-familya :</span>
                    <span class="w-full">{{ store.data.full_name }}</span>

                    <!-- <span
                      class="w-full text-[16px] text-red-600"
                      v-show="!store.data.status"
                      >Faol emas</span
                    >
                    <span
                      class="w-full text-[16px] text-green-400"
                      v-show="store.data.status"
                      >Faol</span
                    > -->
                  </h2>

                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Telefon raqam :</span>
                    <span class="w-full">{{ store.data.phone_number }}</span>
                  </h2>

                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Lavozim :</span>
                    <span class="w-full">{{ store.data.role }}</span>
                  </h2>

                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Maoshi % da :</span>
                    <span class="w-full">{{ store.data.salary }} %</span>
                  </h2>

                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Qo'shilgan vaqti :</span>
                    <span class="w-full">{{ store.addDate }}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div
            v-show="store.modalGroup"
            class="relative m-5 overflow-hidden shadow-md rounded-xl"
            :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-white uppercase rounded-xl btn">
                  <tr>
                    <th scope="col" class="py-3 text-center">Nomi</th>
                    <th scope="col" class="py-3 text-center">Fani</th>
                    <th scope="col" class="py-3 text-center">Narxi</th>
                    <th scope="col" class="py-3 text-center">
                      Boshlanish sanasi
                    </th>
                    <th scope="col" class="py-3 text-center">
                      Qo'shilgan sanasi
                    </th>
                    <th scope="col" class="py-3 text-center">To'liq</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                    v-for="i in store.group"
                    :key="i.id"
                  >
                    <td
                      scope="row"
                      class="px-8 py-4 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.group.name }}
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        <span v-for="fan in i.group.subject" :key="fan.id"
                          >{{ fan.subject.name }}
                        </span>
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ Number(i.group.price).toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.group.start_date }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.createdAt.split("T")[0] }}
                      </p>
                    </td>
                    <td class="px-8 py-4 font-medium text-center">
                      <button
                        @click="
                          enterSlug(i.group.id, i.group.name.toLowerCase())
                        "
                        class="btn bg-blue-600 rounded-xl px-5 py-2.5 text-white focus:ring-2"
                      >
                        Kirish
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.group.length == 0"
                class="w-full p-20 text-2xl font-medium text-center max-w-screen"
              >
                <h1>Guruhlar ro'yhati bo'sh</h1>
              </div>
            </div>
          </div>

          <div
            v-show="store.modalPayment"
            class="grid w-full gap-3 p-5 lg:grid-cols-2 2xl:gap-5"
          >
            <div
              class="p-6 mt-8 border border-blue-700 shadow-md rounded-xl chart-container"
              :class="{
                'bg-slate-900 text-white': navbar.userNav,
                'bg-white text-gray-700': !navbar.userNav,
              }"
            >
              <div class="flex items-center justify-between w-full">
                <h2 class="font-semibold 2xl:text-xl text-md">
                  Tushum Statistikasi ({{ store.year }})
                </h2>
                <form
                  @submit.prevent="getCurrentYearPayments"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div>
                    <select
                      v-model="store.year"
                      id="year"
                      class="border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                      :class="{
                        'bg-slate-900 text-white': navbar.userNav,
                        'bg-white text-black': !navbar.userNav,
                      }"
                      required
                      @change="getCurrentYearPayments"
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
                </form>
              </div>
              <canvas id="paymentChart"></canvas>
            </div>

            <!-- O'quvchilar To'lov Statistikasi -->
            <div
              class="p-6 mt-8 border border-blue-700 shadow-md rounded-xl chart-container2"
              :class="{
                'bg-slate-900 text-white': navbar.userNav,
                'bg-white text-gray-700': !navbar.userNav,
              }"
            >
              <div class="flex items-center justify-between w-full">
                <h2 class="font-semibold 2xl:text-xl text-md">
                  O'quvchilari Statistikasi ({{ monthNames(store.month) }})
                </h2>
                <form
                  @submit.prevent="getStudentPayments"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div>
                    <select
                      v-model="store.month"
                      id="month"
                      class="border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                      :class="{
                        'bg-slate-900 text-white': navbar.userNav,
                        'bg-white text-black': !navbar.userNav,
                      }"
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
                  </div>
                </form>
              </div>
              <canvas id="studentPaymentChart"></canvas>
            </div>
          </div>

          <div
            v-show="store.modalPayment"
            class="flex flex-col justify-between gap-4 p-5 font-bold border-t border-blue-700 sm:flex-row sm:items-center"
          >
            <h2
              v-show="history.dayModal"
              class="text-sm text-blue-700 sm:text-lg"
            >
              Kunlik to'lov tarixi - {{ history.year }}/{{ history.month }}/{{
                history.day
              }}
            </h2>
            <h2
              v-show="history.monthModal"
              class="text-sm text-blue-700 sm:text-lg"
            >
              Oylik to'lov tarixi - {{ history.year }}/{{ history.month }}
            </h2>
            <h2
              v-show="history.groupMonthModal"
              class="text-sm text-blue-700 sm:text-lg"
            >
              Guruhni oylik to'lov tarixi - {{ history.year }}/{{
                history.month
              }}/{{ history.group_name }}
            </h2>
            <h2
              v-show="history.yearModal"
              class="text-sm text-blue-700 sm:text-lg"
            >
              Barcha to'lov tarixi - {{ history.year }}
            </h2>
            <button
              @click="history.modal = true"
              type="button"
              class="btn flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
            >
              <span class="">To'lov tarixi</span>
            </button>
          </div>

          <div
            v-show="store.modalPayment"
            class="relative m-5 overflow-hidden shadow-md rounded-xl"
            :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-white uppercase rounded-xl btn">
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
                <tbody v-show="!store.error">
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
                    <td
                      class="px-8 py-4 font-medium text-center text-green-700"
                    >
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
                        {{ formatDateToNumeric(new Date(i.createdAt)) }}
                      </p>
                    </td>
                    <td class="relative px-8 py-2 font-medium text-center">
                      <div class="relative inline-block w-40 group">
                        <p class="truncate w-40 p-1 rounded-[5px]">
                          {{
                            !i.description || i.description.trim() === ""
                              ? "Izoh yo'q"
                              : i.description.split(" ").length > 3
                                ? i.description
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ") + "..."
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
                    store.pagination === 1
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.pagination > 1) {
                      store.pagination -= 1;
                      getHistory(store.pagination);
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
                      getHistory(store.pagination);
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
    </div>
    <!-- Slug END -->
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
    height: auto; /* O'rta o'lchamli ekranlar uchun */
  }
}

@media (max-width: 768px) {
  .chart-container,
  .chart-container2 {
    height: 400px; /* Kichik ekranlar uchun */
  }

  .chart-container2 canvas {
    height: 300px !important;
    width: 300px !important;
  }
}

@media (max-width: 480px) {
  .chart-container2 {
    height: 300px; /* Mobil ekranlar uchun */
  }

  .chart-container2 canvas {
    height: 200px !important;
    width: 200px !important;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 220px; /* Mobil ekranlar uchun */
  }
}
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnAdd2 {
  background-image: linear-gradient(to right, white -450%, red);
}

.btnAdd3 {
  background-image: linear-gradient(to right, white -450%, #ff9800);
}
</style>
