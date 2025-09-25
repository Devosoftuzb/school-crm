<template>
  <section class="px-2">
    <!-- Slug start  -->

    <div>
      <div class="mt-10" v-show="!store.loading">
        <Placeholder2 />
      </div>
      <div
        v-show="store.loading"
        class="mt-10 rounded-lg p-[15px] mb-10 sm:mb-28"
        :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
      >
        <div class="flex justify-between items-center font-bold mb-5">
          <h1 class="sm:text-lg text-sm text-blue-700">
            <span v-show="store.modalInfo">Xodimning ma'lumotlari</span>
            <span v-show="store.modalGroup">Xodimning guruhlari</span>
            <span v-show="store.modalPayment">Xodimning oylik hisoboti</span>
          </h1>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg rounded-lg whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
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
            <div class="relative p-4 w-full max-w-2xl h-auto">
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
                  <div
                    class="flex w-full items-center justify-between sm:w-auto"
                    id="navbar-sticky"
                  >
                    <ul
                      class="font-medium w-full flex flex-col sm:flex-row items-center gap-5 text-white"
                    >
                      <li
                        class="cursor-pointer w-full sm:max-w-fit text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                        :class="history.dayModal ? 'btn' : 'bg-gray-600'"
                        @click="historyDayModal"
                      >
                        <span>Kun bo'yicha ko'rish</span>
                      </li>
                      <li
                        class="cursor-pointer w-full sm:max-w-fit text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                        :class="history.monthModal ? 'btn' : 'bg-gray-600'"
                        @click="historyMonthModal"
                      >
                        <span>Oy bo'yicha ko'rish</span>
                      </li>
                      <li
                        class="cursor-pointer w-full sm:max-w-fit text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                        :class="history.groupMonthModal ? 'btn' : 'bg-gray-600'"
                        @click="historyGroupMonthModal"
                      >
                        <span>Guruh bo'yicha ko'rish</span>
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
                  <div class="grid font-medium gap-4 mb-4">
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
                        class="bg-white text-black border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                        placeholder="Kuni kiriting.."
                        min="1"
                        max="31"
                        required
                      />
                    </div>
                  </div>
                  <div
                    class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                  >
                    <button
                      @click="exportToExcel"
                      type="button"
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </button>
                    <div class="w-full flex items-center justify-between">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  v-show="history.monthModal"
                  @submit.prevent="getHistory(store.pagination)"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid font-medium gap-4 mb-4">
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
                    <button
                      @click="exportToExcel"
                      type="button"
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </button>
                    <div class="w-full flex items-center justify-between">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  v-show="history.groupMonthModal"
                  @submit.prevent="getHistory(store.pagination)"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid font-medium gap-4 mb-4">
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
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                          placeholder="Guruhni tanlang yoki qidirish..."
                        />
                        <ul
                          v-show="
                            history.filter_show && history.searchList.length > 0
                          "
                          class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full bottom-full"
                        >
                          <li
                            class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
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
                          class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full bottom-full"
                        >
                          <li
                            class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
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
                    class="w-full flex flex-col gap-5 justify-center border-t pt-5 mt-5"
                  >
                    <button
                      @click="exportToExcel"
                      type="button"
                      class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Excelga yuklab olish
                    </button>
                    <div class="w-full flex items-center justify-between">
                      <button
                        @click="historyModal"
                        type="button"
                        class="border inline-flex items-center hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Ko'rish
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </transition>
        </div>

        <div class="w-full bg-transparent rounded-lg">
          <ul
            class="bg-[rgba(213,219,242,0.5)] flex flex-wrap sm:justify-end justify-center font-medium p-3 gap-2 text-center text-sm rounded-t-lg"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li>
              <button
                @click="infoModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-[#1e293b] hover:text-white'
                "
              >
                Ma'lumot
              </button>
            </li>
            <li>
              <button
                @click="groupModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-[#1e293b] hover:text-white'
                "
              >
                Guruhlar
              </button>
            </li>
            <li>
              <button
                @click="paymentModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm"
                :class="
                  navbar.userNav
                    ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                    : 'bg-white hover:bg-[#1e293b] hover:text-white'
                "
              >
                Oylik hisobot
              </button>
            </li>
          </ul>
          <div
            v-show="store.modalInfo"
            id="defaultTabContent"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div
              class="p-4 rounded-lg md:p-8"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <div class="flex flex-col lg:flex-row gap-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  class="w-56 h-56 2xl:w-80 2xl:h-80 rounded-full object-cover mx-auto"
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
                    <span class="w-full">{{ date }}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          <div
            v-show="store.modalGroup"
            class="relative shadow-md rounded-lg overflow-hidden m-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btn text-white text-xs rounded-lg uppercase">
                  <tr>
                    <th scope="col" class="text-center py-3">Nomi</th>
                    <th scope="col" class="text-center py-3">Fani</th>
                    <th scope="col" class="text-center py-3">Narxi</th>
                    <th scope="col" class="text-center py-3">
                      Boshlanish sanasi
                    </th>
                    <th scope="col" class="text-center py-3">
                      Qo'shilgan sanasi
                    </th>
                    <th scope="col" class="text-center py-3">To'liq</th>
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
                      class="text-center px-8 py-4 font-medium whitespace-nowrap"
                    >
                      {{ i.name }}
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        <span v-for="fan in i.subject" :key="fan.id"
                          >{{ fan.subject_name }}
                        </span>
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ Number(i.price).toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.start_date }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.student_date }}
                      </p>
                    </td>
                    <td class="text-center font-medium px-8 py-4">
                      <button
                        @click="enterSlug(i.id, i.name.toLowerCase())"
                        class="btn bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                      >
                        Kirish
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.group.length == 0"
                class="w-full max-w-screen text-center p-20 text-2xl font-medium"
              >
                <h1>Guruhlar ro'yhati bo'sh</h1>
              </div>
            </div>
          </div>

          <div
            v-show="store.modalPayment"
            class="w-full grid lg:grid-cols-2 2xl:gap-5 gap-3 p-5"
          >
            <div
              class="chart-container mt-8 shadow-md rounded-lg p-6 border border-blue-700"
              :class="{
                'bg-[#1e293b] text-white': navbar.userNav,
                'bg-white text-gray-700': !navbar.userNav,
              }"
            >
              <div class="w-full flex items-center justify-between">
                <h2 class="2xl:text-xl text-md font-semibold">
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
                      class="border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                      :class="{
                        'bg-[#1e293b] text-white': navbar.userNav,
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
              class="chart-container2 mt-8 shadow-md rounded-lg p-6 border border-blue-700"
              :class="{
                'bg-[#1e293b] text-white': navbar.userNav,
                'bg-white text-gray-700': !navbar.userNav,
              }"
            >
              <div class="w-full flex items-center justify-between">
                <h2 class="2xl:text-xl text-md font-semibold">
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
                      class="border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                      :class="{
                        'bg-[#1e293b] text-white': navbar.userNav,
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
            class="flex sm:flex-row flex-col justify-between sm:items-center gap-4 font-bold p-5 border-t border-blue-700"
          >
            <h2
              v-show="history.dayModal"
              class="sm:text-lg text-sm text-blue-700"
            >
              Kunlik to'lov tarixi - {{ history.year }}/{{ history.month }}/{{
                history.day
              }}
            </h2>
            <h2
              v-show="history.monthModal"
              class="sm:text-lg text-sm text-blue-700"
            >
              Oylik to'lov tarixi - {{ history.year }}/{{ history.month }}
            </h2>
            <h2
              v-show="history.groupMonthModal"
              class="sm:text-lg text-sm text-blue-700"
            >
              Guruhni oylik to'lov tarixi - {{ history.year }}/{{
                history.month
              }}/{{ history.group_name }}
            </h2>
            <button
              @click="history.modal = true"
              type="button"
              class="btn flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">To'lov tarixi</span>
            </button>
          </div>

          <div
            v-show="store.modalPayment"
            class="relative shadow-md rounded-lg overflow-hidden m-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btn text-white text-xs rounded-lg uppercase">
                  <tr>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      O'quvchi (F . I . O)
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      Guruh
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      Kurs narxi
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      To'lov turi
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      To'lov narxi
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      Oy
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      To'lov sanasi
                    </th>
                    <th scope="col" class="text-center py-3 whitespace-nowrap">
                      Izoh
                    </th>
                  </tr>
                </thead>
                <tbody v-show="!store.error">
                  <tr
                    v-for="i in store.PageProduct"
                    :key="i"
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="text-center px-8 py-4 font-medium whitespace-nowrap"
                    >
                      <span>{{ i.student_name }}</span>
                    </th>

                    <td class="text-center font-medium text-blue-800 px-8 py-4">
                      <p
                        class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ i.group_name }}
                      </p>
                    </td>
                    <td class="text-center font-medium text-red-800 px-8 py-4">
                      <p
                        class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ Number(i.group_price).toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td class="text-center font-medium text-blue-800 px-8 py-4">
                      <p
                        class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium text-green-700 px-8 py-4"
                    >
                      <p
                        class="bg-green-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ i.price.toLocaleString("uz-UZ") }} so'm
                      </p>
                    </td>
                    <td class="text-center font-medium text-blue-800 px-8 py-4">
                      <p
                        class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ monthNames(i.month) }}
                      </p>
                    </td>
                    <td class="text-center font-medium text-blue-800 px-8 py-4">
                      <p
                        class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                      >
                        {{ formatDateToNumeric(new Date(i.createdAt)) }}
                      </p>
                    </td>
                    <td class="text-center font-medium px-8 py-2 relative">
                      <div class="group relative w-40 inline-block">
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
                          class="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden w-max max-w-xs bg-blue-100 text-blue-800 text-sm p-2 rounded-md shadow-lg group-hover:block"
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
                class="w-full max-w-screen text-center p-20 text-2xl font-medium"
              >
                <h1>To'lov ro'yhati bo'sh</h1>
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
                    store.pagination === 1
                      ? 'pointer-events-none opacity-50'
                      : '',
                    'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
                  ]"
                  @click="
                    if (store.pagination > 1) {
                      store.pagination -= 1;
                      getHistory(store.pagination);
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
                      getHistory(store.pagination);
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
    </div>
    <!-- Slug END -->
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

const store = reactive({
  data: "",
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
  month: (hozirgiSana.getMonth() + 1).toString().padStart(2, "0"),
  PageProduct: "",
  page: [],
  pagination: 1,
  teacher_name: ""
});

const info = reactive({
  PaymentStats: [],
  StudentPayments: [],
});

const date = ref("");

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

const infoModal = () => {
  store.modalInfo = true;
  store.modalGroup = false;
  store.modalPayment = false;
};

const groupModal = () => {
  store.modalGroup = true;
  store.modalInfo = false;
  store.modalPayment = false;
};

const paymentModal = () => {
  store.modalPayment = true;
  store.modalInfo = false;
  store.modalGroup = false;
};

const historyDayModal = () => {
  history.dayModal = true;
  history.monthModal = false;
  history.groupMonthModal = false;
};

const historyMonthModal = () => {
  history.dayModal = false;
  history.monthModal = true;
  history.groupMonthModal = false;
};

const historyGroupMonthModal = () => {
  history.dayModal = false;
  history.monthModal = false;
  history.groupMonthModal = true;
};

const historyModal = () => {
  history.modal = !history.modal;
  history.year = hozirgiYil;
  history.month = hozirgiOy;
  history.day = hozirgiKun;
  history.group_id = "";
  historyDayModal();
  getHistory(store.pagination);
};

const history = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  modal: false,
  dayModal: true,
  monthModal: false,
  groupMonthModal: false,
  filter_show: false,
  filter: "",
  selectLamp: false,
  searchList: [],
  dayList: [],
  monthList: [],
  groupMonthList: [],
  dayPay: 0,
});

function enterSlug(id, name) {
  router.push(`/groups/${id}/${name}`);
}

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hour}:${minute}`;
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

// API chaqiruvlarini umumiy qilish uchun yordamchi funksiya
const fetchData = async (url, params = {}) => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("API xatosi:", error);
    throw error;
  }
};

const getEmployee = async () => {
  const schoolId = localStorage.getItem("school_id");
  const id = router.currentRoute.value.params.id;

  try {
    const employeeData = await fetchData(`/employee/${schoolId}/${id}`);
    store.data = employeeData;
    date.value = store.data.createdAt.split("T")[0];
    store.teacher_name = store.data.full_name

    // Use a single promise array for both groups and payments
    const promises = [
      ...employeeData.group.map((group) =>
        getGroup(group.group_id, group.createdAt)
      ),
    ];

    // Await all promises concurrently
    await Promise.all(promises);
    store.loading = true;
  } catch (error) {
    console.error("Xodim ma'lumotlarini olishda xato:", error);
  }
};

const getGroup = async (id, date) => {
  try {
    const groupData = await fetchData(
      `/group/${localStorage.getItem("school_id")}/${id}/not`
    );
    groupData.student_date = date.split("T")[0];
    store.group.push(groupData);
    return groupData;
  } catch (error) {
    console.error("Guruh ma'lumotlarini olishda xato:", error);
  }
};

const getCurrentYearPayments = async () => {
  const id = router.currentRoute.value.params.id;
  try {
    const res = await axios.get(
      `/statistic/teacher-salary/${localStorage.getItem("school_id")}/${id}/${
        store.year
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    info.PaymentStats = res.data.PaymentStats;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

const getStudentPayments = async () => {
  const id = router.currentRoute.value.params.id;
  try {
    const res = await axios.get(
      `/statistic/teacher-studentPayments/${localStorage.getItem(
        "school_id"
      )}/${id}/${store.month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    info.StudentPayments = res.data.studentPayments;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

let paymentChart = null;
const createPaymentChart = () => {
  const ctx = document.getElementById("paymentChart").getContext("2d");

  const chartBackground = navbar.userNav ? "#1e293b" : "#ffffff";
  const chartTextColor = navbar.userNav ? "#ffffff" : "#000000";
  const gridColor = navbar.userNav
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.1)";

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
          grid: { color: gridColor },
          ticks: { color: chartTextColor },
        },
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: { color: chartTextColor },
        },
      },
      plugins: {
        legend: {
          labels: { color: chartTextColor },
        },
      },
    },
  });
};

let studentPaymentChart = null;
const createStudentPaymentChart = () => {
  const ctx = document.getElementById("studentPaymentChart").getContext("2d");

  const chartBackground = navbar.userNav ? "#1e293b" : "#ffffff";
  const chartTextColor = navbar.userNav ? "#ffffff" : "#000000";
  const gridColor = navbar.userNav
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.1)";

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
          labels: { color: chartTextColor },
        },
      },
    },
  });
};

const getHistory = (page) => {
  const id = router.currentRoute.value.params.id;
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
  } else if (history.monthModal) {
    url = `/payment/employeeMonth/${schoolId}/${id}/${history.year}/${history.month}/page?page=${page}`;
  } else if (history.groupMonthModal) {
    url = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/all/page?page=${page}`;
  } else {
    return;
  }

  axios
    .get(url, config)
    .then((res) => {
      const records = res.data?.data?.records;
      if (records.length !== 0) {
        history.group_name = records[0].group_name;
      }
      // history.dayPay = res.data?.data?.total_sum
      store.PageProduct = records;
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      history.modal = false;
    })
    .catch((error) => {
      store.PageProduct = error.response?.data?.message;
    });
};

const getAllHistoryForExport = async () => {
  const id = router.currentRoute.value.params.id;
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
    // getStatistic(`${history.year}-${history.month}-${history.day}`);
  } else if (history.monthModal) {
    urlBase = `/payment/employeeMonth/${schoolId}/${id}/${history.year}/${history.month}/page`;
    // getStatistic(`${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    urlBase = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/all/page`;
    // getStatistic(`${history.year}-${history.month}`);
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
  }
};

const exportToExcel = async () => {
  await getAllHistoryForExport();

  const rawData = history.dayModal
    ? history.dayList
    : history.monthModal
    ? history.monthList
    : history.groupMonthList;

  if (!rawData || rawData.length === 0) {
    notification.warning("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  const dataToExport = rawData.map((item) => ({
    "O'quvchi (F . I . O)": item.student_name,
    // "O'qituvchi (F . I . O)": item.teacher_name,
    "Guruh nomi": item.group_name,
    "Guruh narxi": Number(item.group_price).toLocaleString("uz-UZ") + " so'm",
    "To'lov turi": item.method,
    "To'langan summa": Number(item.price).toLocaleString("uz-UZ") + " so'm",
    "Chegirma (%)": item.discount + " %",
    Oy: monthNames(item.month),
    "To'lov sanasi": formatDateToNumeric(new Date(item.createdAt)),
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

  if (false) {
    const startRow = lastRow + 4;

    ws[`A${startRow}`] = { t: "s", v: "To'lov turi" };
    ws[`B${startRow}`] = { t: "s", v: "To'lovlar soni" };
    ws[`C${startRow}`] = { t: "s", v: "Jami summa" };

    store.statistic.statistics.forEach((stat, idx) => {
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
    const maxRow = startRow + store.statistic.statistics.length;
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
    { wpx: 120 },
    { wpx: 120 },
    { wpx: 130 },
    { wpx: 110 },
    { wpx: 90 },
    { wpx: 160 },
    { wpx: 90 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "To'lov Tarixi");

  const fileName = history.dayModal
    ? `kunlik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}-${history.day}.xlsx`
    : history.monthModal
    ? `oylik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}.xlsx`
    : `guruhni_oylik_tolov_tarixi_${store.teacher_name}-${history.year}-${history.month}-${history.group_name}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
  // location.reload();
  notification.success("Excel fayl yuklab olindi!");
  history.modal = !history.modal;
};

watch(
  () => navbar.userNav,
  () => {
    setTimeout(createPaymentChart, 300);
    setTimeout(createStudentPaymentChart, 300);
  }
);

watch(
  () => info.PaymentStats,
  () => {
    setTimeout(createPaymentChart, 300);
  }
);

watch(
  () => info.StudentPayments,
  () => {
    setTimeout(createStudentPaymentChart, 300);
  }
);

onMounted(() => {
  setTimeout(createPaymentChart, 300);
  setTimeout(createStudentPaymentChart, 300);
  getCurrentYearPayments();
  getStudentPayments();
  getEmployee();
  getHistory(store.pagination);
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

.btnAdd3 {
  background-image: linear-gradient(to right, white -450%, #ff9800);
}
</style>
