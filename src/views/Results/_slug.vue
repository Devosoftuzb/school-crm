<template>
  <div class="px-2 py-8">
    <!-- Placeholder -->
    <div v-show="!store.product && !store.questions">
      <Placeholder2 />
    </div>

    <!-- Modal -->
    <div
      :class="
        form.modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative w-full h-auto max-w-3xl p-4">
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
              Mijozni o'quvchi qilish
            </h3>
            <button
              @click="form.modal = false"
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
            @submit.prevent="createStudent"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium sm:grid-cols-2">
              <div>
                <label
                  for="parents_fullname"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Ota-ona ism familiyasi
                </label>
                <input
                  v-model="form.parents_full_name"
                  type="text"
                  id="parents_fullname"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona ism familiyasi kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="parents_phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Ota-ona raqami
                </label>
                <input
                  v-model="form.parents_phone_number"
                  type="text"
                  id="parents_phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  F . I . O
                </label>
                <input
                  v-model="form.full_name"
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="F . I . O"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Telefon raqami
                </label>
                <input
                  v-model="form.phone_number"
                  type="text"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Qo'shilgan sanasi
                </label>
                <input
                  v-model="form.start_date"
                  type="date"
                  id="date"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div class="mt-6">
              <p
                class="flex flex-wrap items-center gap-1 text-sm font-semibold"
                :class="navbar.userNav ? 'text-slate-300' : 'text-slate-700'"
              >
                Tanlangan guruh:
                <span
                  class="px-3 py-1 ml-2 text-sm rounded-lg"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 text-blue-400'
                      : 'bg-blue-100 text-blue-700'
                  "
                >
                  {{ form.group_name || "Tanlanmagan" }}
                </span>
              </p>
            </div>

            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="form.modal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      v-show="store.product && store.questions"
      class="p-4 mb-32 md:p-8 rounded-xl"
      :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
    >
      <!-- Header -->
      <div
        class="flex flex-col items-center justify-between w-full gap-3 mb-8 font-bold sm:flex-row sm:mb-0"
      >
        <h1 class="w-full text-lg text-blue-700 text-start">
          Mijozning test natijalari
        </h1>
        <button
          @click="router.back()"
          class="btn shadow-lg w-full sm:w-auto rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
        >
          Orqaga qaytish
        </button>
      </div>

      
      <div class="w-full bg-transparent rounded-xl">
        <div
          id="defaultTabContent"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="p-4 mt-5 border shadow-lg rounded-2xl sm:p-6"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border-white/10'
                : 'bg-white border-blue-100'
            "
          >
            <div class="grid gap-6 lg:grid-cols-2">
              <!-- LEFT -->
              <div class="space-y-3">
                <div
                  v-for="item in [
                    ['Ism-familya', store.product?.customer?.full_name],
                    ['Telefon raqam', store.product?.customer?.phone_number],
                    ['Tanlagan fani', store.product?.test?.subject?.name],
                    ['Tanlangan o`qituvchisi', store.product?.teacher],
                    ['Maqul bo`lgan dars vaqti', store.product?.time],
                  ]"
                  :key="item[0]"
                  class="pb-2.5 border-b"
                  :class="
                    navbar.userNav ? 'border-white/10' : 'border-gray-200'
                  "
                >
                  <div
                    class="mb-1 text-xs"
                    :class="navbar.userNav ? 'text-gray-400' : 'text-gray-600'"
                  >
                    {{ item[0] }}
                  </div>
                  <div
                    class="font-semibold"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    {{ item[1] || "—" }}
                  </div>
                </div>
              </div>

              <!-- RIGHT -->
              <div
                class="flex flex-col w-full gap-3 lg:pl-5"
                :class="
                  navbar.userNav
                    ? 'lg:border-l border-white/10'
                    : 'lg:border-l border-gray-200'
                "
              >
                <div class="space-y-3">
                  <div
                    v-for="item in [
                      [
                        'Testni boshlagan vaqti',
                        chekDateFormat(store.product?.started_at),
                      ],
                      [
                        'Testni tugatgan vaqti',
                        chekDateFormat(store.product?.finished_at),
                      ],
                      [
                        'Test vaqti',
                        (store.product?.test?.time || 0) + ' daqiqa',
                      ],
                      [
                        'Savollar soni',
                        (store.product?.test?.count || 0) + ' ta',
                      ],
                    ]"
                    :key="item[0]"
                    class="pb-2.5 border-b"
                    :class="
                      navbar.userNav ? 'border-white/10' : 'border-gray-200'
                    "
                  >
                    <div
                      class="mb-1 text-xs"
                      :class="
                        navbar.userNav ? 'text-gray-400' : 'text-gray-600'
                      "
                    >
                      {{ item[0] }}
                    </div>
                    <div
                      class="font-semibold"
                      :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                    >
                      {{ item[1] || "—" }}
                    </div>
                  </div>

                  <!-- Correct/Incorrect Answers -->
                  <div class="grid grid-cols-2 gap-3 pt-1">
                    <div
                      class="p-2 border rounded-lg"
                      :class="
                        navbar.userNav
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-green-50 border-green-200'
                      "
                    >
                      <div
                        class="mb-1 text-xs"
                        :class="
                          navbar.userNav ? 'text-green-400' : 'text-green-700'
                        "
                      >
                        To'g'ri javoblar
                      </div>
                      <div
                        class="text-base font-bold"
                        :class="
                          navbar.userNav ? 'text-green-300' : 'text-green-800'
                        "
                      >
                        {{ store.product?.correct || 0 }} ta
                      </div>
                    </div>

                    <div
                      class="p-2.5 border rounded-lg"
                      :class="
                        navbar.userNav
                          ? 'bg-red-500/10 border-red-500/30'
                          : 'bg-red-50 border-red-200'
                      "
                    >
                      <div
                        class="mb-1 text-xs"
                        :class="
                          navbar.userNav ? 'text-red-400' : 'text-red-700'
                        "
                      >
                        Noto'g'ri javoblar
                      </div>
                      <div
                        class="text-base font-bold"
                        :class="
                          navbar.userNav ? 'text-red-300' : 'text-red-800'
                        "
                      >
                        {{ store.product?.incorrect || 0 }} ta
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scores Section -->
            <div
              class="pt-3 mt-4 border-t"
              :class="navbar.userNav ? 'border-white/10' : 'border-gray-200'"
            >
              <div
                class="mb-3 text-sm font-bold tracking-wide"
                :class="navbar.userNav ? 'text-white/70' : 'text-gray-500'"
              >
                DARAJASI
              </div>

              <div class="grid gap-3 md:grid-cols-3">
                <!-- Umumiy natija -->
                <div
                  class="relative p-4 transition-all duration-200 border rounded-xl"
                  :class="
                    navbar.userNav
                      ? 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10'
                      : 'bg-blue-50/50 border-blue-200/50 hover:bg-blue-50'
                  "
                >
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-4 h-4"
                      :class="
                        navbar.userNav ? 'text-blue-400' : 'text-blue-600'
                      "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div
                      class="text-xs font-semibold"
                      :class="
                        navbar.userNav ? 'text-blue-400' : 'text-blue-600'
                      "
                    >
                      Umumiy natija
                    </div>
                  </div>
                  <div
                    class="text-[22px] font-bold text-center"
                    :class="navbar.userNav ? 'text-white' : 'text-gray-900'"
                  >
                    {{ store.product?.overall_result || "—" }}
                  </div>
                </div>

                <!-- Test -->
                <div
                  class="relative p-4 transition-all duration-200 border rounded-xl"
                  :class="
                    navbar.userNav
                      ? 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10'
                      : 'bg-green-50/50 border-green-200/50 hover:bg-green-50'
                  "
                >
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-4 h-4"
                      :class="
                        navbar.userNav ? 'text-green-400' : 'text-green-600'
                      "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <div
                      class="text-xs font-semibold"
                      :class="
                        navbar.userNav ? 'text-green-400' : 'text-green-600'
                      "
                    >
                      Test
                    </div>
                  </div>
                  <div
                    class="text-[22px] font-bold text-center"
                    :class="navbar.userNav ? 'text-white' : 'text-gray-900'"
                  >
                    {{ store.product?.test_result || "—" }}
                  </div>
                </div>

                <!-- Writing -->
                <div
                  class="relative p-4 transition-all duration-200 border rounded-xl"
                  :class="
                    navbar.userNav
                      ? 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10'
                      : 'bg-purple-50/50 border-purple-200/50 hover:bg-purple-50'
                  "
                >
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-4 h-4"
                      :class="
                        navbar.userNav ? 'text-purple-400' : 'text-purple-600'
                      "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <div
                      class="text-xs font-semibold"
                      :class="
                        navbar.userNav ? 'text-purple-400' : 'text-purple-600'
                      "
                    >
                      Writing
                    </div>
                  </div>
                  <div
                    class="text-[22px] font-bold text-center"
                    :class="navbar.userNav ? 'text-white' : 'text-gray-900'"
                  >
                    {{ store.product?.writing_result || "Nomalum" }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <h1 class="w-full py-5 text-lg font-bold text-blue-700">
            Tavsiya etiladigan guruhlar
          </h1>

         
          <div class="mb-6 space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <!-- Level Filter -->
              <div>
                <label
                  for="level-filter"
                  class="block mb-2 text-sm font-medium"
                  :class="navbar.userNav ? 'text-white' : 'text-gray-700'"
                >
                  Daraja bo'yicha filterlash
                </label>
                <select
                  id="level-filter"
                  v-model="store.selectedLevel"
                  @change="handleFilterChange"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  :class="navbar.userNav ? 'bg-slate-800 text-white' : ''"
                >
                  <option value="all">Hammasi</option>
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="ELEMENTARY">ELEMENTARY</option>
                  <option value="PRE INTERMEDIATE">PRE INTERMEDIATE</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="IELTS">IELTS</option>
                </select>
              </div>

              <!-- Search -->
              <div>
                <label
                  for="search-input"
                  class="block mb-2 text-sm font-medium"
                  :class="navbar.userNav ? 'text-white' : 'text-gray-700'"
                >
                  Qidirish
                </label>
                <div class="relative">
                  <input
                    id="search-input"
                    v-model="store.searchQuery"
                    @input="handleSearchChange"
                    type="text"
                    placeholder="Guruh nomi bo'yicha qidirish..."
                    class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                    :class="navbar.userNav ? 'bg-slate-800 text-white' : ''"
                  />
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Active Filters -->
            <div
              v-if="store.selectedLevel !== 'all' || store.searchQuery"
              class="flex flex-wrap gap-2"
            >
              <span
                v-if="store.selectedLevel !== 'all'"
                class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg"
                :class="
                  navbar.userNav
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                "
              >
                Daraja: {{ store.selectedLevel }}
                <button
                  @click="
                    store.selectedLevel = 'all';
                    handleFilterChange();
                  "
                  class="ml-1 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
              <span
                v-if="store.searchQuery"
                class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg"
                :class="
                  navbar.userNav
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                "
              >
                Qidiruv: "{{ store.searchQuery }}"
                <button
                  @click="
                    store.searchQuery = '';
                    handleSearchChange();
                  "
                  class="ml-1 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            </div>
          </div>

          
          <div
            v-if="store.groupLevel.length > 0"
            class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="(group, index) in store.groupLevel"
              :key="group.id || index"
              class="p-6 transition-all duration-300 border shadow-lg rounded-2xl hover:-translate-y-1 hover:shadow-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border-white/10 text-white'
                  : 'bg-white border-blue-100 text-gray-800'
              "
            >
              <h2 class="mb-2 text-lg font-bold">
                {{ group.name || "Noma'lum guruh" }}
              </h2>

              <span
                class="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full"
                :class="
                  navbar.userNav
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                "
              >
                {{ group.level || "Noma'lum" }}
              </span>

              <div class="space-y-3 text-sm">
                <div
                  class="flex justify-between"
                  :class="navbar.userNav ? 'text-gray-300' : 'text-gray-500'"
                >
                  <span>O'qituvchi</span>
                  <span class="font-medium">
                    {{ group.teacher || "Noma'lum" }}
                  </span>
                </div>

                <div
                  class="flex justify-between"
                  :class="navbar.userNav ? 'text-gray-300' : 'text-gray-500'"
                >
                  <span>O'quvchilar soni</span>
                  <span class="font-medium">
                    {{ group.student_count || 0 }} ta
                  </span>
                </div>
              </div>

              <button
                @click="getOneProduct(group.id, group.name)"
                class="btn text-white w-full mt-6 py-2.5 rounded-lg font-semibold transition"
              >
                Guruhga qo'shish
              </button>
            </div>
          </div>

          
          <div
            v-else
            class="p-8 text-center border rounded-xl"
            :class="
              navbar.userNav
                ? 'bg-slate-800 border-white/10 text-gray-300'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            "
          >
            <svg
              class="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p class="text-lg font-medium">Guruh topilmadi</p>
            <p class="mt-2 text-sm">
              Filter yoki qidiruv so'rovingizga mos guruh mavjud emas
            </p>
          </div>

         
          <nav
            v-if="store.totalCount > store.limit"
            class="flex flex-row items-center justify-between p-4 mt-6 border-b"
            :class="navbar.userNav ? 'border-white/10' : 'border-gray-200'"
            aria-label="Table navigation"
          >
            <button
              :disabled="store.currentPage === 1"
              :class="[
                'flex font-bold border-2 bg-white items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight transition duration-200 ease-in-out',
                store.currentPage === 1
                  ? 'pointer-events-none opacity-50 text-gray-400 border-gray-200'
                  : 'text-black border-gray-300 hover:bg-gray-100 cursor-pointer',
              ]"
              @click="handlePreviousPage"
            >
              <i class="text-2xl font-bold md:hidden bx bx-chevron-left"></i>
              <span class="hidden md:block">Oldingi</span>
            </button>

            <span
              class="px-5 py-2 text-sm font-normal text-center rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-blue-100 text-blue-700'
              "
            >
              <span class="font-semibold">
                {{ (store.currentPage - 1) * store.limit + 1 }} -
                {{
                  Math.min(store.currentPage * store.limit, store.totalCount)
                }}
              </span>
              dan
              <span class="font-semibold">{{ store.totalCount }}</span>
            </span>

            <button
              :disabled="store.currentPage >= store.totalPages"
              :class="[
                'flex font-bold border-2 bg-white items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight transition duration-200 ease-in-out',
                store.currentPage >= store.totalPages
                  ? 'pointer-events-none opacity-50 text-gray-400 border-gray-200'
                  : 'text-black border-gray-300 hover:bg-gray-100 cursor-pointer',
              ]"
              @click="handleNextPage"
            >
              <span class="hidden md:block">Keyingi</span>
              <i class="text-2xl font-bold md:hidden bx bx-chevron-right"></i>
            </button>
          </nav>

          
          <h1 class="w-full py-5 text-lg font-bold text-blue-700 text-start">
            Mijozning bajargan testlari
          </h1>

          <div
            class="overflow-x-auto"
            v-for="(question, index) in store.questions"
            :key="question.id"
          >
            <div>
              <div
                class="flex items-center justify-between w-full gap-2 sm:gap-5"
              >
                <div
                  @click="accordion(question.id)"
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
                        {{ question.question.question }}
                      </h2>
                    </div>
                    <div>
                      <i
                        :class="
                          store.plus == question.id
                            ? 'bx bx-minus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                            : 'bx bx-plus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                        "
                      ></i>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Accordion content -->
              <div :id="'answers' + question.id" class="hidden mb-5">
                <div class="mb-5">
                  <!-- File -->
                  <div v-if="question.question.file" class="mb-3">
                    <div v-if="isImage(question.question.file)">
                      <img
                        :src="getFileUrl(question.question.file)"
                        alt="Image"
                        loading="lazy"
                        class="w-full max-w-[320px] h-auto object-cover"
                      />
                    </div>
                    <div v-else-if="isAudio(question.question.file)">
                      <audio
                        :src="getFileUrl(question.question.file)"
                        controls
                      />
                    </div>
                    <div v-else-if="isVideo(question.question.file)">
                      <video
                        :src="getFileUrl(question.question.file)"
                        controls
                        width="320"
                        height="240"
                      />
                    </div>
                  </div>

                  <!-- Text -->
                  <div
                    v-if="question.question.text"
                    class="flex flex-col px-5 mb-10 text-justify"
                  >
                    <h3 class="mb-2 font-bold">
                      {{ question.question.text.title }}
                    </h3>
                    <p class="whitespace-pre-line">
                      {{ question.question.text.text }}
                    </p>
                  </div>

                  <!-- Question -->
                  <h3 class="flex px-5 text-justify">
                    {{ question.question.question }}
                  </h3>
                </div>

                <!-- Test Options -->
                <div
                  v-if="question.question.type === 'test'"
                  class="grid gap-5 sm:grid-cols-2"
                >
                  <div
                    class="w-full text-justify text-black p-2.5 sm:pl-10 pl-5 text-sm rounded-xl"
                    :class="
                      question.option.is_correct
                        ? 'bg-blue-300 text-blue-600'
                        : 'bg-red-300 text-red-600'
                    "
                  >
                    <strong>{{ String.fromCharCode(65) }}: </strong>
                    <span>{{ question.option.option }}</span>
                  </div>
                </div>

                <!-- Writing Answer -->
                <div
                  v-if="question.question.type === 'writing'"
                  class="p-2 border border-purple-200 rounded-lg bg-purple-50"
                >
                  <p
                    class="px-3 py-1 text-sm font-semibold text-purple-800 whitespace-pre-line rounded-lg sm:text-base"
                  >
                    {{ question.writing || "Noma'lum" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import axios from "@/services/axios";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const resultId = computed(() => router.currentRoute.value.params.id);
const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));
const apiUrl = computed(() => import.meta.env.VITE_API);

const store = reactive({
  product: null,
  subjects: [],
  groupLevel: [],
  error: null,
  questions: null,
  plus: "",
  accordion: [],
  overall: "",
  selectedLevel: "all",
  searchQuery: "",
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  limit: 15,
});

const form = reactive({
  full_name: "",
  phone_number: "",
  group_id: "",
  group_name: "",
  parents_full_name: "Hurmatli ota-ona",
  parents_phone_number: "+998",
  id: "",
  modal: false,
  is_student: false,
  start_date: "",
});

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
};

const getFileUrl = (file) => `${apiUrl.value}/${file}`;
const isImage = (filename) => /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogg|mov)$/i.test(filename);

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

const chekDateFormat = (date) => {
  if (!date) return "Sana mavjud emas";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Noto'g'ri sana";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

const enrichRecord = (record) => {
  const correctAnswers = record.customer_answer.filter(
    (ans) => ans.is_correct === true,
  ).length;

  const incorrectAnswers = record.customer_answer.filter(
    (ans) => ans.is_correct === false,
  ).length;

  const [time, ...teacherParts] = record.customer.description.split(" ");
  const teacher = teacherParts.join(" ");

  return {
    ...record,
    correct: correctAnswers,
    incorrect: incorrectAnswers,
    time: time || "Noma'lum",
    teacher: teacher || "Noma'lum",
  };
};

const getOneProduct = (group_id, group_name) => {
  Object.assign(form, {
    group_id: group_id,
    group_name: group_name,
    modal: true,
  });
};

let searchTimeout = null;
const handleSearchChange = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    store.currentPage = 1;
    getGroupLevel();
  }, 500);
};

const handleFilterChange = () => {
  store.currentPage = 1;
  getGroupLevel();
};

const handlePreviousPage = () => {
  if (store.currentPage > 1) {
    store.currentPage -= 1;
    getGroupLevel();
  }
};

const handleNextPage = () => {
  if (store.currentPage < store.totalPages) {
    store.currentPage += 1;
    getGroupLevel();
  }
};

const getSubject = async () => {
  try {
    const res = await axios.get(`/v1/subject/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.subjects = res.data;
  } catch (error) {
    handleError();
  }
};

const getOneResult = async () => {
  try {
    const response = await axios.get(`/v1/customer-test/${resultId.value}`, {
      headers: authHeaders.value,
    });

    const data = response.data;

    Object.assign(form, {
      id: data.customer?.id,
      full_name: data.customer?.full_name,
      phone_number: data.customer?.phone_number,
    });

    store.questions = data.customer_answer;
    store.product = enrichRecord(data);
    store.overall = data.overall_result;

    await getGroupLevel();
    store.error = null;
  } catch (error) {
    store.product = null;
    store.error = error.response?.data?.message || "Xatolik yuz berdi!";
  }
};

const getGroupLevel = async () => {
  try {
    const params = new URLSearchParams({
      page: String(store.currentPage),
      limit: String(store.limit),
    });

    if (store.searchQuery?.trim()) {
      params.append("search", store.searchQuery.trim());
    }

    const levelParam =
      store.selectedLevel === "all" ? "all" : store.selectedLevel;

    const res = await axios.get(
      `/v1/group/level/${schoolId.value}/${levelParam}?${params.toString()}`,
      { headers: authHeaders.value },
    );

    const data = res.data.data;

    store.groupLevel = data || [];

    store.currentPage = res.data.page || 1;
    store.totalPages = res.data.totalPages || 0;
    store.totalCount = res.data.total || 0;
  } catch (error) {
    console.error("Error fetching group level:", error);
    store.groupLevel = [];
    store.totalPages = 0;
    store.totalCount = 0;
  }
};

const createStudent = async () => {
  try {
    const data = {
      school_id: Number(schoolId.value),
      parents_full_name: form.parents_full_name,
      parents_phone_number: form.parents_phone_number,
      full_name: form.full_name,
      phone_number: form.phone_number,
      start_date: form.start_date,
      group_id: form.group_id,
      status: true,
    };

    const res = await axios.post("/v1/student", data, {
      headers: authHeaders.value,
    });

    notification.success("Mijoz guruhga qo'shildi");
    form.is_student = true;

    await updateStatus();
    await sendSms(res.data.student.id);

    Object.assign(form, {
      parents_full_name: "Hurmatli ota-ona",
      parents_phone_number: "+998",
      modal: false,
    });
  } catch (error) {
    handleError();
  }
};

const updateStatus = async () => {
  try {
    const data = {
      is_student: form.is_student,
    };

    await axios.put(`/v1/customer/status/${schoolId.value}/${form.id}`, data, {
      headers: authHeaders.value,
    });
  } catch (error) {
    handleError();
  }
};

const sendSms = async (id) => {
  try {
    const data = {
      student_id: id,
    };

    await axios.post("/v1/sms/group", data, { headers: authHeaders.value });
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getSubject();
  getOneResult();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
