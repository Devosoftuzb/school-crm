<template>
  <section
    class="min-h-screen px-4 py-6"
    :class="navbar.userNav ? 'bg-slate-950' : 'bg-gray-100'"
  >
    <div v-show="!store.loading" class="mt-10">
      <Placeholder2 />
    </div>

    <div v-show="store.loading" class="mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p
            class="mb-1 text-xs font-medium tracking-widest uppercase"
            :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
          >
            O'quvchi profili
          </p>
          <h1
            class="text-xl font-bold"
            :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
          >
            {{ store.data.full_name }}
          </h1>
        </div>
        <button
          @click="router.back(-1)"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Orqaga
        </button>
      </div>

      <div class="flex justify-end w-full gap-1 mb-6">
        <div
          class="grid w-full grid-cols-2 gap-1 p-1 md:w-auto md:grid-cols-4 rounded-xl"
          :class="
            navbar.userNav
              ? 'bg-slate-900'
              : 'bg-white shadow-sm border border-slate-200'
          "
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="setActiveModal(tab.key)"
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl"
            :class="
              activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-sm'
                : navbar.userNav
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            "
          >
            <span class="whitespace-nowrap">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <div v-show="store.modalInfo">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div
            class="flex flex-col items-center gap-4 p-6 text-center rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-sm'
            "
          >
            <div class="relative">
              <div
                class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600"
              >
                {{ store.data.full_name?.charAt(0) }}
              </div>
              <span
                class="absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full font-medium border-2"
                :class="
                  store.data.status
                    ? navbar.userNav
                      ? 'bg-green-900 text-green-400 border-slate-900'
                      : 'bg-green-50 text-green-600 border-white'
                    : navbar.userNav
                      ? 'bg-red-900 text-red-400 border-slate-900'
                      : 'bg-red-50 text-red-500 border-white'
                "
              >
                {{ store.data.status ? "Faol" : "Arxiv" }}
              </span>
            </div>
            <div>
              <h2
                class="text-lg font-bold"
                :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
              >
                {{ store.data.full_name }}
              </h2>
              <p
                class="mt-1 text-sm"
                :class="navbar.userNav ? 'text-slate-400' : 'text-slate-500'"
              >
                {{ store.data.phone_number }}
              </p>
            </div>
            <div
              class="w-full pt-4 border-t"
              :class="navbar.userNav ? 'border-slate-800' : 'border-slate-100'"
            >
              <p
                class="mb-1 text-xs"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Ro'yxatga olingan
              </p>
              <p
                class="text-sm font-medium"
                :class="navbar.userNav ? 'text-slate-300' : 'text-slate-700'"
              >
                {{ store.studentCreatedAt }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 lg:col-span-2">
            <div
              class="p-5 rounded-2xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border border-slate-800'
                  : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <p
                class="mb-4 text-xs font-semibold tracking-widest uppercase"
                :class="navbar.userNav ? 'text-slate-500' : 'text-slate-400'"
              >
                Ota-ona ma'lumotlari
              </p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p
                    class="mb-1 text-xs"
                    :class="
                      navbar.userNav ? 'text-slate-500' : 'text-slate-400'
                    "
                  >
                    Ismi
                  </p>
                  <p
                    class="font-medium"
                    :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                  >
                    {{ store.data.parents_full_name }}
                  </p>
                </div>
                <div>
                  <p
                    class="mb-1 text-xs"
                    :class="
                      navbar.userNav ? 'text-slate-500' : 'text-slate-400'
                    "
                  >
                    Telefon
                  </p>
                  <p
                    class="font-medium"
                    :class="navbar.userNav ? 'text-white' : 'text-slate-800'"
                  >
                    {{ store.data.parents_phone_number }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-5 rounded-2xl"
              :class="
                store.data.parent_chat_id
                  ? navbar.userNav
                    ? 'bg-green-950 border border-green-900'
                    : 'bg-green-50 border border-green-100'
                  : navbar.userNav
                    ? 'bg-slate-900 border border-slate-800'
                    : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl"
                  :class="
                    store.data.parent_chat_id
                      ? 'bg-green-500'
                      : navbar.userNav
                        ? 'bg-slate-800'
                        : 'bg-slate-100'
                  "
                >
                  <svg
                    v-if="store.data.parent_chat_id"
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    :class="
                      navbar.userNav ? 'text-slate-600' : 'text-slate-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.016 9.504c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.27l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.316z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-sm font-medium"
                    :class="
                      store.data.parent_chat_id
                        ? navbar.userNav
                          ? 'text-green-400'
                          : 'text-green-700'
                        : navbar.userNav
                          ? 'text-white'
                          : 'text-slate-800'
                    "
                  >
                    {{
                      store.data.parent_chat_id
                        ? "Botga ulangan"
                        : "Botga ulanmagan"
                    }}
                  </p>
                  <p
                    class="text-xs mt-0.5"
                    :class="
                      store.data.parent_chat_id
                        ? navbar.userNav
                          ? 'text-green-600'
                          : 'text-green-500'
                        : navbar.userNav
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    "
                  >
                    {{
                      store.data.parent_chat_id
                        ? "Ota-ona xabarnomalarni qabul qilmoqda"
                        : "Ota-ona hali botni ishlatmagan"
                    }}
                  </p>
                </div>
              </div>
              <span
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="
                  store.data.parent_chat_id
                    ? 'bg-green-500 text-white'
                    : navbar.userNav
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-slate-100 text-slate-500'
                "
              >
                {{ store.data.parent_chat_id ? "Aktiv" : "Inaktiv" }}
              </span>
            </div>

            <div
              class="p-5 rounded-2xl"
              :class="
                store.data.hikvision_code
                  ? navbar.userNav
                    ? 'bg-green-950 border border-green-900'
                    : 'bg-green-50 border border-green-100'
                  : navbar.userNav
                    ? 'bg-slate-900 border border-slate-800'
                    : 'bg-white border border-slate-100 shadow-sm'
              "
            >
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl"
                    :class="
                      store.data.hikvision_code
                        ? 'bg-green-500'
                        : navbar.userNav
                          ? 'bg-slate-800'
                          : 'bg-slate-100'
                    "
                  >
                    <svg
                      class="w-6 h-6"
                      :class="
                        store.data.hikvision_code
                          ? 'text-white'
                          : navbar.userNav
                            ? 'text-slate-600'
                            : 'text-slate-400'
                      "
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 3H4a1 1 0 0 0-1 1v3M17 3h3a1 1 0 0 1 1 1v3M7 21H4a1 1 0 0 1-1-1v-3M17 21h3a1 1 0 0 0 1-1v-3"
                      />
                      <circle
                        cx="9"
                        cy="10"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                      <circle
                        cx="15"
                        cy="10"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                      <path
                        stroke-linecap="round"
                        d="M9 15c.8 1.2 5.2 1.2 6 0"
                      />
                    </svg>
                  </div>

                  <div>
                    <p
                      class="text-sm font-medium"
                      :class="
                        store.data.hikvision_code
                          ? navbar.userNav
                            ? 'text-green-400'
                            : 'text-green-700'
                          : navbar.userNav
                            ? 'text-white'
                            : 'text-slate-800'
                      "
                    >
                      {{
                        store.data.hikvision_code
                          ? "Qurilmada bor"
                          : "Qurilmada yo'q"
                      }}
                    </p>
                    <p
                      class="text-xs mt-0.5"
                      :class="
                        store.data.hikvision_code
                          ? navbar.userNav
                            ? 'text-green-600'
                            : 'text-green-500'
                          : navbar.userNav
                            ? 'text-slate-500'
                            : 'text-slate-400'
                      "
                    >
                      {{
                        store.data.hikvision_code
                          ? "Yuz tanish faol"
                          : "Yuz qo'shilmagan"
                      }}
                    </p>
                  </div>
                </div>

                <!-- Tugmalar — mobileda to'liq kenglik -->
                <div class="flex items-center gap-2">
                  <label
                    v-if="!store.data.hikvision_code"
                    class="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white cursor-pointer sm:w-auto rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 whitespace-nowrap"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handlePhotoSelect"
                    />
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Yuz qo'shish
                  </label>

                  <button
                    v-if="store.data.hikvision_code"
                    @click="deleteFace"
                    :disabled="store.faceActionLoading"
                    class="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white sm:w-auto rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                      />
                    </svg>
                    {{
                      store.faceActionLoading ? "O'chirilmoqda..." : "O'chirish"
                    }}
                  </button>

                  <span
                    class="px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap"
                    :class="
                      store.data.hikvision_code
                        ? 'bg-green-500 text-white'
                        : navbar.userNav
                          ? 'bg-slate-700 text-slate-400'
                          : 'bg-slate-100 text-slate-500'
                    "
                  >
                    {{ store.data.hikvision_code ? "Aktiv" : "Inaktiv" }}
                  </span>
                </div>
              </div>

              <div
                v-if="store.selectedPhoto"
                class="flex items-center gap-3 pt-4 mt-4 border-t"
                :class="
                  navbar.userNav ? 'border-slate-800' : 'border-slate-100'
                "
              >
                <img
                  :src="store.selectedPhotoPreview"
                  class="flex-shrink-0 object-cover w-16 h-16 rounded-xl"
                  alt="preview"
                />
                <div class="flex flex-col flex-1 gap-2">
                  <p
                    class="text-xs"
                    :class="
                      navbar.userNav ? 'text-slate-400' : 'text-slate-500'
                    "
                  >
                    Rasm tanlandi. Saqlash uchun bosing.
                  </p>
                  <div class="flex gap-2">
                    <button
                      @click="addFace"
                      :disabled="store.faceActionLoading"
                      class="px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 disabled:opacity-50"
                    >
                      {{
                        store.faceActionLoading ? "Yuborilmoqda..." : "Saqlash"
                      }}
                    </button>
                    <button
                      @click="
                        store.selectedPhoto = null;
                        store.selectedPhotoPreview = null;
                      "
                      class="px-4 py-2 text-xs font-medium rounded-xl"
                      :class="
                        navbar.userNav
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      "
                    >
                      Bekor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="store.modalGroup"
        class="overflow-hidden border rounded-2xl"
        :class="
          navbar.userNav
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-100 text-slate-900 shadow-sm'
        "
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm !border-none">
            <thead
              class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
            >
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
                :class="
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                "
                v-for="i in store.group"
                :key="i.group.id"
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
                    @click="enterSlug(i.group.id, i.group.name)"
                    class="px-5 py-2 text-white bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl focus:ring-2"
                  >
                    Kirish
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="store.group.length == 0"
            class="p-20 text-center text-slate-400"
          >
            Guruhlar ro'yxati bo'sh
          </div>
        </div>
      </div>

      <div
        v-show="store.modalPayment"
        class="overflow-hidden border rounded-2xl"
        :class="
          navbar.userNav
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-100 text-slate-900 shadow-sm'
        "
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="text-xs text-white uppercase rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600"
            >
              <tr>
                <th scope="col" class="py-3 text-center">Guruh</th>
                <th scope="col" class="py-3 text-center">Kurs narxi</th>
                <th scope="col" class="py-3 text-center">To'lov turi</th>
                <th scope="col" class="py-3 text-center">To'lov</th>
                <th scope="col" class="py-3 text-center">Oy</th>
                <th scope="col" class="py-3 text-center">To'lov sanasi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b last:border-b-0"
                :class="[
                  navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
                  i.status === 'update' ? 'btnAdd3' : '',
                  i.status === 'delete' ? 'btnAdd2' : '',
                ]"
                v-for="i in store.payment"
                :key="i.id"
              >
                <td
                  scope="row"
                  class="px-8 py-4 font-medium text-center whitespace-nowrap"
                >
                  {{ i.group.name }}
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
                    {{ i.method }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-green-700 whitespace-nowrap"
                >
                  <p class="bg-green-100 rounded-[5px] p-1">
                    {{ i.price.toLocaleString("uz-UZ") }} so'm
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                >
                  <p class="bg-blue-100 rounded-[5px] p-1">
                    {{ monthNames(i.month) }}
                  </p>
                </td>
                <td
                  class="px-8 py-4 font-medium text-center text-red-800 whitespace-nowrap"
                >
                  <p class="bg-red-100 rounded-[5px] p-1">
                    {{ formatDateToNumeric(new Date(i.createdAt)) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-show="store.payment.length == 0"
            class="p-20 text-center text-slate-400"
          >
            To'lov tarixi bo'sh
          </div>
        </div>
      </div>

      <div v-show="store.modalAttendance">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="group in store.attendanceData"
            :key="group.date"
            class="overflow-hidden border rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-100 shadow-sm'
            "
          >
            <div
              class="flex items-center gap-3 px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-indigo-600"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span class="text-sm font-semibold">{{ group.date }}</span>
              <span
                class="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/20 text-white"
              >
                {{ group.records.length }} ta yozuv
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 p-4">
              <div
                v-for="(record, idx) in group.records"
                :key="idx"
                class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl"
                :class="
                  record.type === 'IN'
                    ? navbar.userNav
                      ? 'bg-green-950 text-green-400 border border-green-900'
                      : 'bg-green-50 text-green-700 border border-green-100'
                    : navbar.userNav
                      ? 'bg-red-950 text-red-400 border border-red-900'
                      : 'bg-red-50 text-red-600 border border-red-100'
                "
              >
                <span
                  class="flex-shrink-0 w-2 h-2 rounded-full"
                  :class="record.type === 'IN' ? 'bg-green-500' : 'bg-red-500'"
                />
                {{ record.type === "IN" ? "Kirdi" : "Chiqdi" }}
                <span class="font-normal opacity-75">{{ record.time }}</span>
              </div>
            </div>
          </div>

          <div
            v-show="!store.attendanceData.length"
            class="p-20 text-center border col-span-full text-slate-400 rounded-2xl"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-100'
            "
          >
            Kirish-chiqish tarixi bo'sh
          </div>
        </div>

        <nav
          v-if="store.attTotalPages > 1"
          class="flex flex-row items-center justify-between p-4"
        >
          <ul class="flex items-center">
            <li
              :class="[
                store.attPage === 1 ? 'pointer-events-none opacity-50' : '',
                'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
              ]"
              @click="
                if (store.attPage > 1) {
                  store.attPage--;
                  getAttendance(store.attPage);
                }
              "
            >
              <i
                class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
              ></i>
              <span class="hidden md:block">Oldingi</span>
            </li>
          </ul>

          <span
            class="text-sm font-normal text-center"
            :class="navbar.userNav ? 'text-slate-400' : 'text-slate-600'"
          >
            Sahifa
            <span class="font-semibold">{{ store.attPage }}</span>
            dan
            <span class="font-semibold">{{ store.attTotalPages }}</span>
          </span>

          <ul class="flex items-center">
            <li
              :class="[
                store.attPage >= store.attTotalPages
                  ? 'pointer-events-none opacity-50'
                  : '',
                'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-xl leading-tight cursor-pointer transition duration-200 ease-in-out',
              ]"
              @click="
                if (store.attPage < store.attTotalPages) {
                  store.attPage++;
                  getAttendance(store.attPage);
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
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";

const navbar = useNavStore();
const router = useRouter();

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const studentId = computed(() => router.currentRoute.value.params.id);

const tabs = [
  { key: "info", label: "Ma'lumot" },
  { key: "group", label: "Guruhlar" },
  { key: "payment", label: "To'lov tarixi" },
  { key: "attendance", label: "Kirish-chiqish" },
];

const activeTab = computed(() => {
  if (store.modalInfo) return "info";
  if (store.modalGroup) return "group";
  if (store.modalPayment) return "payment";
  if (store.modalAttendance) return "attendance";
  return "info";
});

const store = reactive({
  data: "",
  group: [],
  payment: [],
  modalInfo: true,
  modalGroup: false,
  modalPayment: false,
  modalAttendance: false,
  loading: false,
  studentCreatedAt: "",
  attendanceData: [],
  attPage: 1,
  attTotalPages: 1,
  faceActionLoading: false,
  selectedPhoto: null,
  selectedPhotoPreview: null,
});

const setActiveModal = (modalType) => {
  store.modalInfo = modalType === "info";
  store.modalGroup = modalType === "group";
  store.modalPayment = modalType === "payment";
  store.modalAttendance = modalType === "attendance";
  if (modalType === "attendance" && !store.attendanceData.length) {
    getAttendance(1);
  }
};

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
  return months[parseInt(month) - 1] || "Noto'g'ri oy";
};

const getStudent = async () => {
  try {
    const response = await axios.get(
      `/v1/student/${schoolId.value}/${studentId.value}`,
      {
        headers: { Authorization: `Bearer ${token.value}` },
      },
    );
    const studentData = response.data;
    Object.assign(store, {
      data: studentData,
      studentCreatedAt: studentData.createdAt.split("T")[0],
      group: studentData.group,
      payment: studentData.payment,
      loading: true,
    });
  } catch (error) {
    console.error("Talaba ma'lumotlarini olishda xato:", error);
  }
};

const getAttendance = async (page) => {
  try {
    const res = await axios.get(`/v1/student-attendance/page`, {
      headers: { Authorization: `Bearer ${token.value}` },
      params: { school_id: schoolId.value, student_id: studentId.value, page },
    });
    store.attendanceData = res.data.data.records;
    store.attPage = res.data.data.pagination.currentPage;
    store.attTotalPages = res.data.data.pagination.total_pages;
  } catch (error) {
    console.error("Attendance xato:", error);
  }
};

const handlePhotoSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  store.selectedPhoto = file;
  store.selectedPhotoPreview = URL.createObjectURL(file);
};

const addFace = async () => {
  if (!store.selectedPhoto) return;
  store.faceActionLoading = true;
  try {
    const formData = new FormData();
    formData.append("photo", store.selectedPhoto);

    await axios.post(`/v1/hikvision/face/${studentId.value}`, formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "multipart/form-data",
      },
    });
    store.faceExists = true;
    store.selectedPhoto = null;
    store.selectedPhotoPreview = null;
  } catch {
    console.error("Yuz qo'shishda xato");
  } finally {
    store.faceActionLoading = false;
  }
};

const deleteFace = async () => {
  store.faceActionLoading = true;
  try {
    await axios.delete(`/v1/hikvision/face/${studentId.value}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    store.faceExists = false;
  } catch {
    console.error("Yuz o'chirishda xato");
  } finally {
    store.faceActionLoading = false;
  }
};

onMounted(() => {
  getStudent();
});
</script>
