<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.payHistoryData">
        <Placeholder2 />
      </div>

      <PageLoader :loading="loading.excel" text="Excel tayyorlanmoqda..." />
      <!------------------------------------------- Search ------------------------------------------->

      <!-- ---------------------------------------- Statistic ------------------------------------- -->

      <div
        v-show="store.payHistoryData"
        v-for="i in store.statistic"
        :key="i"
        class="flex flex-wrap items-center justify-center mb-5 cards gap-x-5 gap-y-5"
      >
        <div class="card sm:w-[295px] w-full" v-for="j in i" :key="j">
          <div
            class="relative flex flex-col min-w-0 break-words shadow-soft-xl rounded-xl bg-clip-border"
            :class="{
              'bg-slate-900': navbar.userNav,
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
                    {{ j.method }} ({{ j.count.toLocaleString("uz-UZ") }})
                  </h3>
                  <h5
                    class="p-1 px-3 text-sm font-bold text-blue-700 bg-blue-100 rounded-xl sm:text-md"
                  >
                    {{ j.sum.toLocaleString("uz-UZ") }} so'm
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------------------- Statistic ------------------------------------- -->

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
                To'lovni o'chirib tashlash
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
                    Siz to'lovni o'chirishni xohlaysizmi?
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
                    @click="deletePayment"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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

      <!-- ------------------------------------------ Edit modal --------------------------------------------------------- -->
      <div
        @click.self="cenecleEdit"
        :class="
          edit.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative w-full h-auto max-w-3xl p-4 md:max-w-5xl">
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
                  To'lov qilish
                </h3>
                <button
                  @click="cenecleEdit"
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

              <div class="flex flex-col items-center w-full gap-5 md:flex-row">
                <div
                  class="hidden max-w-xs p-3 mx-auto mb-5 bg-white shadow-lg rounded-xl sm:block"
                  id="receipt"
                >
                  <div
                    class="mb-5 mt-3 flex items-center justify-center gap-1.5"
                  >
                    <img
                      class="w-10 rounded-full"
                      :src="store.logo_link + store.school_logo"
                      alt=""
                    />
                    <h2 class="text-xl font-bold uppercase">
                      {{ store.school_name }}
                    </h2>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">To'lov turi:</span>
                    <span id="paymentType">{{ form.method }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Talaba:</span>
                    <span id="studentName">{{ store.student_name }}</span>
                  </div>
                  <div
                    class="flex justify-between gap-10 py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Guruh nomi:</span>
                    <span id="group" class="text-end">{{
                      store.group_name
                    }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Kurs narxi:</span>

                    <span class="flex flex-col items-end">
                      <span
                        v-if="
                          (form.discount !== 0 && form.discount !== '') ||
                          (form.discountSum !== 0 && form.discountSum !== '')
                        "
                        class="text-[10px] line-through"
                        id="coursePrice"
                        >{{ store.price?.toLocaleString("uz-UZ") }} so'm</span
                      >
                      <span id="coursePrice"
                        >{{
                          discountedPrice?.toLocaleString("uz-UZ")
                        }}
                        so'm</span
                      >
                    </span>
                  </div>
                  <div
                    v-if="form.discount !== 0 && form.discount !== ''"
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Chegirma:</span>
                    <span id="teacher">{{ form.discount }}%</span>
                  </div>
                  <div
                    v-if="form.discountSum !== 0 && form.discountSum !== ''"
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Chegirma:</span>
                    <span id="teacher"
                      >{{ form.discountSum.toLocaleString("uz-UZ") }} so'm</span
                    >
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Ustoz:</span>
                    <span id="teacher">{{ store.teacher_name }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Oy:</span>
                    <span id="date" class="text-xs font-bold">{{
                      monthNames(form.month)
                    }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">To'lov:</span>
                    <span id="amount" class="text-xs font-bold"
                      >{{ store.pay_price?.toLocaleString("uz-UZ") }} so'm</span
                    >
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Sana:</span>
                    <span id="date">{{ store.chekDate }}</span>
                  </div>
                  <!-- <div
                    class="flex justify-center py-1 text-sm text-center border-b border-black border-dashed item"
                  >
                    <span
                      >IT ni it deb o'qima, <br />
                      Ingliz tili va AyTi ni
                      <span class="font-bold uppercase">{{
                        store.school_name
                      }}</span>
                      da o'rgan!
                    </span>
                  </div> -->
                  <div
                    class="flex items-center justify-end gap-0.5 text-[4px] mt-5"
                  >
                    <span class="flex flex-col items-end"
                      >Devosoft Group<span class="text-[2.5px]"
                        >+998330237376</span
                      ></span
                    >
                  </div>
                </div>

                <!-- Modal body -->
                <form
                  @submit.prevent="editPayment"
                  class="md:w-[60%] w-full"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid gap-4 mb-4 font-medium sm:grid-cols-1">
                    <div class="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label for="year" class="block mb-2 text-sm"
                          >Yilni tanlang</label
                        >
                        <select
                          v-model="form.year"
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
                          v-model="form.month"
                          id="month"
                          class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          required
                        >
                          <option value="" disabled selected>
                            Oyni tanlang
                          </option>
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
                          class="block mb-2 text-sm whitespace-nowrap"
                          :class="navbar.userNav ? 'text-white' : 'text-black'"
                          >To'lov turi tanlang</label
                        >
                        <select
                          v-model="form.method"
                          id="name"
                          class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                    </div>

                    <div class="grid gap-4 sm:grid-cols-3">
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Narx</label
                        >
                        <input
                          v-model="store.pay_price"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="To'lov sumani kiriting"
                          required
                        />
                      </div>
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Chegirma (%)</label
                        >
                        <input
                          v-model="form.discount"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma % kiriting"
                          required
                        />
                      </div>
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Chegirma (sum)</label
                        >
                        <input
                          v-model="form.discountSum"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma sum kiriting"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label for="description" class="block mb-2 text-sm"
                        >To'lovga izoh qoldirish</label
                      >
                      <textarea
                        v-model="form.description"
                        name="description"
                        id="description"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block h-20 w-full py-3 p-2.5"
                        placeholder="To'lovga izoh kiriting"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                  >
                    <button
                      @click="cenecleEdit"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      O'zgartirish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------ edit modal end ----------------------------------------------------- -->

      <!-- ------------------------------------------ Add modal -------------------------------------------------------- -->
      <div
        v-show="modal"
        @click.self="toggleModal"
        :class="
          modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div
            v-show="modal"
            class="relative w-full h-auto max-w-3xl p-4 md:max-w-5xl"
          >
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
                  To'lov qilish
                </h3>
                <button
                  @click="toggleModal"
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

              <div class="flex flex-col items-center w-full gap-5 md:flex-row">
                <div
                  class="hidden max-w-xs p-3 mx-auto mb-5 bg-white shadow-lg rounded-xl sm:block"
                  id="receipt"
                >
                  <div
                    class="mb-5 mt-3 flex items-center justify-center gap-1.5"
                  >
                    <img
                      class="w-10 rounded-full"
                      :src="store.logo_link + store.school_logo"
                      alt=""
                    />
                    <h2 class="text-xl font-bold uppercase">
                      {{ store.school_name }}
                    </h2>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">To'lov turi:</span>
                    <span id="paymentType">{{ form.method }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Talaba:</span>
                    <span id="studentName">{{ store.student_name }}</span>
                  </div>
                  <div
                    class="flex justify-between gap-10 py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Guruh nomi:</span>
                    <span id="group" class="text-end">{{
                      store.group_name
                    }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Kurs narxi:</span>

                    <span class="flex flex-col items-end">
                      <span
                        v-if="
                          (form.discount !== 0 && form.discount !== '') ||
                          (form.discountSum !== 0 && form.discountSum !== '')
                        "
                        class="text-[10px] line-through"
                        id="coursePrice"
                        >{{ store.price?.toLocaleString("uz-UZ") }} so'm</span
                      >
                      <span id="coursePrice"
                        >{{
                          discountedPrice.toLocaleString("uz-UZ")
                        }}
                        so'm</span
                      >
                    </span>
                  </div>
                  <div
                    v-if="form.discount !== 0 && form.discount !== ''"
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Chegirma:</span>
                    <span id="teacher">{{ form.discount }}%</span>
                  </div>
                  <div
                    v-if="form.discountSum !== 0 && form.discountSum !== ''"
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Chegirma:</span>
                    <span id="teacher"
                      >{{ form.discountSum.toLocaleString("uz-UZ") }} so'm</span
                    >
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Ustoz:</span>
                    <span id="teacher">{{ store.teacher_name }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Oy:</span>
                    <span id="date" class="text-xs font-bold">{{
                      monthNames(form.month)
                    }}</span>
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">To'lov:</span>
                    <span id="amount" class="text-xs font-bold"
                      >{{ form.price.toLocaleString("uz-UZ") }} so'm</span
                    >
                  </div>
                  <div
                    class="flex justify-between py-1 text-sm border-b border-black border-dashed item"
                  >
                    <span class="font-semibold">Sana:</span>
                    <span id="date">{{ store.chekDate }}</span>
                  </div>
                  <!-- <div
                    class="flex justify-center py-1 text-sm text-center border-b border-black border-dashed item"
                  >
                    <span
                      >IT ni it deb o'qima, <br />
                      Ingliz tili va AyTi ni
                      <span class="font-bold uppercase">{{
                        store.school_name
                      }}</span>
                      da o'rgan!
                    </span>
                  </div> -->
                  <div
                    class="flex items-center justify-end gap-0.5 text-[4px] mt-5"
                  >
                    <span class="flex flex-col items-end"
                      >Devosoft Group<span class="text-[2.5px]"
                        >+998330237376</span
                      ></span
                    >
                  </div>
                </div>

                <!-- Modal body -->
                <form
                  @submit.prevent="addPayment"
                  class="md:w-[60%] w-full"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid gap-4 mb-4 font-medium sm:grid-cols-1">
                    <div class="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label for="year" class="block mb-2 text-sm"
                          >Yilni tanlang</label
                        >
                        <select
                          v-model="form.year"
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
                          v-model="form.month"
                          id="month"
                          class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          required
                        >
                          <option value="" disabled selected>
                            Oyni tanlang
                          </option>
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
                          class="block mb-2 text-sm whitespace-nowrap"
                          :class="navbar.userNav ? 'text-white' : 'text-black'"
                          >To'lov turi tanlang</label
                        >
                        <select
                          v-model="form.method"
                          id="name"
                          class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                    </div>

                    <div class="grid gap-4 sm:grid-cols-3">
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Narx</label
                        >
                        <input
                          v-model="form.price"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="To'lov sumani kiriting"
                          required
                        />
                      </div>
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Chegirma (%)</label
                        >
                        <input
                          v-model="form.discount"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma % kiriting"
                          required
                        />
                      </div>
                      <div class="">
                        <label for="price" class="block mb-2 text-sm"
                          >Chegirma (sum)</label
                        >
                        <input
                          v-model="form.discountSum"
                          type="number"
                          name="price"
                          id="price"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma sum kiriting"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label for="description" class="block mb-2 text-sm"
                        >To'lovga izoh qoldirish</label
                      >
                      <textarea
                        v-model="form.description"
                        name="description"
                        id="description"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block h-20 w-full py-3 p-2.5"
                        placeholder="To'lovga izoh kiriting"
                        cols="30"
                        rows="10"
                      >
                      </textarea>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                  >
                    <button
                      @click="toggleModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                      :disabled="store.isSubmitting"
                    >
                      To'lash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------- add modal end ----------------------------------------------------- -->

      <!-- ------------------------------------------- history modal ----------------------------------------------------- -->
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
                      :class="history.dayModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyDayModal"
                    >
                      <span>Kun bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                      :class="history.monthModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyMonthModal"
                    >
                      <span>Oy bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
                      :class="
                        history.groupMonthModal ? 'btnAdd' : 'bg-gray-600'
                      "
                      @click="historyGroupMonthModal"
                    >
                      <span>Guruh bo'yicha</span>
                    </li>
                    <li
                      class="cursor-pointer w-full h-[100%] whitespace-nowrap text-center bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-xl"
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
                      class="bg-white border border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
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
                    @click="exportExcelHistory"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
                    @click="exportExcelHistory"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
                          v-for="(i, index) in store.groups"
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
                    @click="exportExcelHistory"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
                  <div
                    class="flex flex-col items-center justify-between w-full gap-5 sm:flex-row"
                  >
                    <ButtonLoader
                      :loading="loading.excel"
                      @click="exportExcelHistory"
                      type="button"
                      class="btnAdd3 text-white w-full inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      {{ history.year }} - Excelga yuklab olish
                    </ButtonLoader>
                    <ButtonLoader
                      :loading="loading.excel"
                      @click="exportExcelAllHistory"
                      type="button"
                      class="btnAdd3 text-white w-full inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Barchasini Excelga yuklab olish
                    </ButtonLoader>
                  </div>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="historyModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
      <!-- ------------------------------------------- history modal end ------------------------------------------------- -->

      <!-- ------------------------------------------- debtor modal ----------------------------------------------------- -->
      <div
        @click.self="debtorModal"
        :class="
          debtor.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative w-full h-auto max-w-xl p-4">
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
                    Qarzdorlar tarixini ko'rish
                  </h3>
                  <button
                    @click="debtorModal"
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
                <div
                  class="flex items-center justify-between w-full sm:w-auto"
                  id="navbar-sticky"
                >
                  <ul
                    class="flex flex-col items-center w-full gap-5 font-medium text-white sm:flex-row"
                  >
                    <li
                      class="w-full p-2 px-5 text-sm text-center bg-gray-600 cursor-pointer rounded-xl sm:max-w-fit hover:bg-gray-500 sm:text-md"
                      :class="debtor.dayModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="debtorDayModal"
                    >
                      <span>Oy bo'yicha ko'rish</span>
                    </li>
                    <li
                      class="w-full p-2 px-5 text-sm text-center bg-gray-600 cursor-pointer rounded-xl sm:max-w-fit hover:bg-gray-500 sm:text-md"
                      :class="debtor.monthModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="debtorMonthModal"
                    >
                      <span>Guruh bo'yicha ko'rish</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Modal body -->
              <form
                v-show="debtor.dayModal"
                @submit.prevent="getDebtor(store.pagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="debtor.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                      v-model="debtor.month"
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
                    @click="exportToExcelDebtor"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="debtorModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Ko'rish
                    </ButtonLoader>
                  </div>
                </div>
              </form>
              <form
                v-show="debtor.monthModal"
                @submit.prevent="getDebtor(store.pagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid gap-4 mb-4 font-medium">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="debtor.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                      v-model="debtor.month"
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
                        v-model="debtor.filter"
                        @focus="debtor.selectLamp = true"
                        @blur="
                          debtor.selectLamp = false;
                          debtor.filter_show = false;
                        "
                        @input="
                          debtor.filter_show = true;
                          searchDebtorFunc();
                        "
                        type="search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Guruhni tanlang yoki qidirish..."
                      />
                      <ul
                        v-show="
                          debtor.filter_show && debtor.searchList.length > 0
                        "
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                          v-for="(i, index) in debtor.searchList"
                          :key="index"
                          @mousedown.prevent="
                            debtor.group_id = i.id;
                            debtor.group_name = i.name;
                            debtor.filter_show = false;
                            debtor.filter = i.name;
                          "
                        >
                          {{ i.name }}
                        </li>
                      </ul>
                      <ul
                        v-show="debtor.selectLamp && !debtor.filter"
                        class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80 bottom-full"
                      >
                        <li
                          class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                          v-for="(i, index) in store.groups"
                          :key="index"
                          @mousedown.prevent="
                            debtor.group_id = i.id;
                            debtor.group_name = i.name;
                            debtor.selectLamp = false;
                            debtor.filter = i.name;
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
                    @click="exportToExcelDebtor"
                    type="button"
                    class="btnAdd3 text-white inline-flex items-center justify-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Excelga yuklab olish
                  </ButtonLoader>
                  <div class="flex items-center justify-between w-full">
                    <button
                      @click="debtorModal"
                      type="button"
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <ButtonLoader
                      :loading="loading.view"
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
      <!-- ------------------------------------------- debtor modal end ------------------------------------------------- -->

      <div v-show="store.payHistoryData" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-3 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex flex-col justify-between w-full gap-5 pb-4 sm:flex-row sm:items-center sm:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">To'lov</h1>
            <div
              class="flex flex-row items-stretch justify-end w-full space-x-3 space-y-0 lg:w-auto md:items-center"
            >
              <button
                @click="history.modal = true"
                type="button"
                class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
              >
                <span class="">To'lov tarixi</span>
              </button>
              <button
                @click="debtor.modal = true"
                type="button"
                class="btnAdd2 flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-4 py-2.5"
              >
                <span class="">Qarzdorlar tarixi</span>
              </button>
            </div>
          </div>

          <div class="flex items-center w-full gap-5 pb-2 lg:pb-0">
            <form
              @submit.prevent="handleSubmit"
              :class="{ darkForm: navbar.userNav }"
              class="flex flex-col items-center justify-end w-full gap-5 sm:flex-row"
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
                  v-model="store.filter"
                  @focus="store.selectLamp = true"
                  @blur="
                    store.selectLamp = false;
                    store.filter_show = false;
                  "
                  @input="
                    store.filter_show = true;
                    searchFunc();
                  "
                  type="search"
                  id="simple-search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="store.filter_show && store.searchList.length > 0"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      form.id = '';
                      store.filter_show = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
                <ul
                  v-show="store.selectLamp && !store.filter"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.groups"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      form.id = '';
                      store.selectLamp = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </div>

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
                  v-model="store.filterStudent"
                  @focus="store.selectLampStudent = true"
                  @blur="
                    store.selectLampStudent = false;
                    store.filter_showStudent = false;
                  "
                  @input="
                    store.filter_showStudent = true;
                    searchFuncStudent();
                  "
                  type="search"
                  id="simple-search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="O'quvchini tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    store.filter_showStudent && store.searchList.length > 0
                  "
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @mousedown.prevent="
                      form.id = i.id;
                      form.group_id = '';
                      store.filter_showStudent = false;
                      store.filterStudent = i.full_name;
                    "
                  >
                    {{ i.full_name }}
                  </li>
                </ul>
                <ul
                  v-show="store.selectLampStudent && !store.filterStudent"
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white whitespace-nowrap"
                    v-for="(i, index) in store.students"
                    :key="index"
                    @mousedown.prevent="
                      form.id = i.id;
                      form.group_id = '';
                      store.selectLampStudent = false;
                      store.filterStudent = i.full_name;
                    "
                  >
                    {{ i.full_name }}
                  </li>
                </ul>
              </div>

              <div
                class="flex flex-row items-center justify-between w-full sm:max-w-fit md:space-y-0 md:justify-end md:space-x-3"
              >
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
                >
                  <span class="">To'lov qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          v-show="!store.payData && !debtor.isTable && !store.studentGroups"
          class="w-full mb-5 bg-transparent rounded-xl"
        >
          <ul
            class="grid w-full grid-cols-2 gap-2 text-sm font-medium text-center rounded-t-lg lg:grid-cols-4"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li
              class="w-auto rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-slate-900 hover:text-white'
              "
            >
              <button
                @click="statusPaymentAllModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusPaymentAll ? 'btnAdd text-white' : ''"
              >
                Barcha to'lovlar ({{
                  statusCount.payment +
                  statusCount.halfPayment +
                  statusCount.discount
                }})
              </button>
            </li>
            <li
              class="w-auto rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-slate-900 hover:text-white'
              "
            >
              <button
                @click="statusPaymentModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusPayment ? 'btnAdd text-white' : ''"
              >
                To'liq to'lovlar ({{ statusCount.payment }})
              </button>
            </li>
            <li
              class="w-auto rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-slate-900 hover:text-white'
              "
            >
              <button
                @click="statusHalfPaymentModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusHalfPayment ? 'btnAdd text-white' : ''"
              >
                Yarim to'lovlar ({{ statusCount.halfPayment }})
              </button>
            </li>
            <li
              class="w-auto rounded-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-slate-900 hover:text-white'
              "
            >
              <button
                @click="statusDiscountModal"
                class="shadow-lg rounded-xl px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusDiscount ? 'btnAdd text-white' : ''"
              >
                Chegirmali to'lovlar ({{ statusCount.discount }})
              </button>
            </li>
          </ul>
        </div>

        <h2
          v-show="
            history.dayModal &&
            !store.payData &&
            !debtor.isTable &&
            !store.studentGroups &&
            !history.loader
          "
          class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
        >
          Kunlik to'lov tarixi - {{ history.year }}/{{ history.month }}/{{
            history.day
          }}
        </h2>
        <h2
          v-show="
            history.monthModal &&
            !store.payData &&
            !debtor.isTable &&
            !store.studentGroups &&
            !history.loader
          "
          class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
        >
          Oylik to'lov tarixi - {{ history.year }}/{{ history.month }}
        </h2>
        <h2
          v-show="
            history.groupMonthModal &&
            !store.payData &&
            !debtor.isTable &&
            !store.studentGroups &&
            !history.loader
          "
          class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
        >
          Guruhni oylik to'lov tarixi - {{ history.year }}/{{
            history.month
          }}/{{ history.group_name }}
        </h2>
        <h2
          v-show="
            history.yearModal &&
            !store.payData &&
            !debtor.isTable &&
            !store.studentGroups &&
            !history.loader
          "
          class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
        >
          Barcha to'lov tarixi - {{ history.year }}
        </h2>

        <div
          class="relative overflow-hidden shadow-md rounded-xl mb-28"
          :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          <div v-show="history.loader">
            <Placeholder3 />
          </div>

          <div
            v-show="store.payData && !debtor.isTable"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center">Guruh nomi</th>
                  <th scope="col" class="py-3 text-center">To'lov holati</th>
                  <th scope="col" class="py-3 text-center">To'lov</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.payData"
                  :key="i.student_id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.group_name }}</span>
                  </th>
                  <td class="px-8 py-4 font-medium text-center">
                    <p
                      :class="{
                        'bg-green-100 text-green-800': i.debt === 'To\'langan',
                        'bg-red-100 text-red-800':
                          i.debt.includes('to\'lanmagan'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.debt }}
                    </p>
                  </td>

                  <td
                    v-show="store.btn_lamp"
                    class="px-8 py-4 font-medium text-center"
                  >
                    <button
                      v-show="store.btn_lamp"
                      @click="
                        toggleModalStudent(
                          i.student_id,
                          i.group_id,
                          i.student_name,
                          i.teacher_name,
                          i.group_price,
                          i.group_name,
                          i.group_start_date,
                          i.debt,
                        )
                      "
                      class="bg-green-600 rounded-xl py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.payData"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="
              !store.payData &&
              !debtor.isTable &&
              !store.studentGroups &&
              !history.loader
            "
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th
                    scope="col"
                    class="py-3 pl-8 text-center whitespace-nowrap"
                  >
                    O'quvchi (F . I . O)
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    O'qituvchi (F . I . O)
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

                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Chek
                  </th>
                  <th
                    scope="col"
                    class="py-3 text-center whitespace-nowrap"
                  ></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  v-for="i in store.payHistoryData"
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
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p
                      class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.teacher_name }}
                    </p>
                  </td>

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
                      {{ Number(i.group_price)?.toLocaleString("uz-UZ") }} so'm
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
                      {{ i.price?.toLocaleString("uz-UZ") }} so'm
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
                  <td
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <button
                      @click="printChek(i.id)"
                      class="btnAdd rounded-xl py-2.5 px-5 text-white"
                    >
                      Chek chiqarish
                    </button>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      v-show="i.status !== 'delete'"
                      @click="getOnePayment(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i v-show="i.status == 'delete'" class="pl-10"></i>
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
              v-show="
                (store.payHistoryData && store.error) ||
                store.payHistoryData.length == 0
              "
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="!store.payData && debtor.isTable"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs text-white uppercase rounded-xl btnAdd whitespace-nowrap"
              >
                <tr>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    O'quvchi (F . I . O)
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    O'qituvchi (F . I . O)
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Guruh
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Kurs narxi
                  </th>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Qarzdorlik
                  </th>
                  <th
                    scope="col"
                    class="py-3 text-center whitespace-nowrap"
                  ></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  v-for="i in store.payHistoryData"
                  :key="i"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p
                      class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.teacher_name }}
                    </p>
                  </td>

                  <td class="px-8 py-4 font-medium text-center text-blue-800">
                    <p
                      class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.group_name }}
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-green-800">
                    <p
                      class="bg-green-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.group_price?.toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td class="px-8 py-4 font-medium text-center text-red-800">
                    <p
                      class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap"
                    >
                      {{ i.debt?.toLocaleString("uz-UZ") }} so'm
                    </p>
                  </td>
                  <td
                    v-show="store.btn_lamp"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <button
                      v-show="store.btn_lamp"
                      @click="
                        paymentDebtor(
                          i.id,
                          i.student_name,
                          i.group_id,
                          i.group_price,
                          i.debt,
                          i.teacher_name,
                          i.group_name,
                          i.group_start_date,
                        )
                      "
                      class="bg-green-600 rounded-xl py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-show="
                (store.payHistoryData && store.error) ||
                store.payHistoryData.length == 0
              "
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Qarzdorlar ro'yhati bo'sh</h1>
            </div>
          </div>

          <nav
            v-show="!store.payData && debtor.isTable"
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
                    getDebtor(store.pagination);
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
                    getDebtor(store.pagination);
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

          <nav
            v-show="!store.payData && !debtor.isTable"
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
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import {
  Placeholder2,
  Placeholder3,
  ButtonLoader,
  PageLoader,
} from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();

const modal = ref(false);
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = String(hozirgiSana.getMonth() + 1).padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

// Computed properties
const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));
const apiUrl = computed(() => import.meta.env.VITE_API);

const loading = reactive({
  view: false,
  excel: false,
});

const store = reactive({
  payHistoryData: "",
  page: [],
  pagination: 1,
  payData: false,
  groups: false,
  students: false,
  error: false,
  method: "",
  filter: "",
  filterStudent: "",
  filter_show: false,
  filter_showStudent: false,
  searchList: [],
  price: 0,
  date: "",
  curentYil: [],
  chekDate: "",
  group_name: "",
  student_name: "",
  teacher_name: "",
  school_logo: "",
  logo_link: `${apiUrl.value}/`,
  school_name: "",
  btn_lamp: true,
  statistic: false,
  selectLamp: false,
  selectLampStudent: false,
  isSubmitting: false,
  pay_price: 0,
  checkOldPay: "",
});

const statusCount = reactive({
  payment: 0,
  halfPayment: 0,
  discount: 0,
});

const form = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  method: "",
  price: store.price,
  id: "",
  group_id: "",
  discount: 0,
  discountSum: 0,
  description: "",
});

const edit = reactive({
  modal: false,
  id: false,
});

const remove = reactive({
  id: "",
  toggle: false,
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
  status: "all",
  statusPaymentAll: true,
  statusPayment: false,
  statusHalfPayment: false,
  statusDiscount: false,
  loader: true,
  statistic: false,
});

const debtor = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  modal: false,
  dayModal: true,
  monthModal: false,
  filter_show: false,
  filter: "",
  selectLamp: false,
  searchList: [],
  isTable: false,
  exportList: "",
});

// Helper functions
const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
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
  return months[parseInt(month) - 1] || "Notog'ri oy";
};

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  store.chekDate = `${year}-${month}-${day}, ${hour}:${minute}`;
};

const chekDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

// Search functions
const createSearchFilter = (searchObj, data, key, filterProp = "filter") => {
  searchObj.searchList = [];
  if (!searchObj[filterProp]) return;

  const filterLower = searchObj[filterProp].toLowerCase();
  searchObj.searchList = data.filter((i) =>
    i[key].toLowerCase().includes(filterLower),
  );
};

const searchFunc = () => createSearchFilter(store, store.groups, "name");
const searchHistoryFunc = () =>
  createSearchFilter(history, store.groups, "name");
const searchDebtorFunc = () => createSearchFilter(debtor, store.groups, "name");
const searchFuncStudent = () =>
  createSearchFilter(store, store.students, "full_name", "filterStudent");

// Modal handlers
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

const setActiveStatusModal = (status) => {
  history.status = status;
  history.statusPaymentAll = status === "all";
  history.statusPayment = status === "payment";
  history.statusHalfPayment = status === "halfPayment";
  history.statusDiscount = status === "discount";
  history.loader = true;
  getHistory(1);
};

const statusPaymentAllModal = () => setActiveStatusModal("all");
const statusPaymentModal = () => setActiveStatusModal("payment");
const statusHalfPaymentModal = () => setActiveStatusModal("halfPayment");
const statusDiscountModal = () => setActiveStatusModal("discount");

const setActiveDebtorModal = (type) => {
  debtor.dayModal = type === "day";
  debtor.monthModal = type === "month";
};

const debtorDayModal = () => setActiveDebtorModal("day");
const debtorMonthModal = () => setActiveDebtorModal("month");

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

const debtorModal = () => {
  Object.assign(debtor, {
    modal: !debtor.modal,
    year: hozirgiYil,
    month: hozirgiOy,
    day: hozirgiKun,
    group_id: "",
  });
  debtorDayModal();
  getHistory(store.pagination);
};

const handleSubmit = () => {
  if (form.group_id) {
    getGroupStudents(form.group_id);
  } else if (form.id) {
    getStudentGroups(form.id);
  }
};

function toggleModal(id, name) {
  modal.value = !modal.value;
  Object.assign(form, {
    year: hozirgiYil,
    month: hozirgiOy,
    method: "",
    price: store.price,
    id: id,
    discount: 0,
    discountSum: 0,
  });
  store.student_name = name;
  formatDateToNumeric(new Date());
}

function toggleModalStudent(
  id,
  groupID,
  studentName,
  teacherName,
  groupPrice,
  groupName,
  groupStartData,
  debt,
) {
  modal.value = !modal.value;
  Object.assign(form, {
    year: hozirgiYil,
    month: hozirgiOy,
    method: "",
    price: groupPrice,
    id: id,
    group_id: groupID,
  });
  Object.assign(store, {
    student_name: studentName,
    price: groupPrice,
    teacher_name: teacherName,
    group_name: groupName,
    date: groupStartData,
    checkOldPay: debt === "To'langan",
  });
  formatDateToNumeric(new Date());
  getMethod();
}

function paymentDebtor(
  id,
  name,
  group_id,
  group_price,
  debtorPay,
  teacher_name,
  group_name,
  groupStartDate,
) {
  getSchool();
  modal.value = !modal.value;
  Object.assign(form, {
    year: hozirgiYil,
    month: hozirgiOy,
    price: Number(debtorPay),
    group_id: group_id,
    id: id,
  });
  Object.assign(store, {
    price: Number(group_price),
    teacher_name: teacher_name,
    group_name: group_name,
    student_name: name,
    date: groupStartDate,
  });
  formatDateToNumeric(new Date());
  getMethod();
}

const cenecleEdit = () => {
  edit.modal = false;
  cancelFunc();
};

function cancelFunc() {
  Object.assign(form, {
    year: "",
    month: "",
    method: "",
    price: store.price,
    discount: 0,
    discountSum: 0,
  });
  modal.value = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

const onInput = (e) => {
  let val = Number(e.target.value);
  if (val > store.price) val = store.price;
  if (val < 0) val = 0;
  form.price = val;
  store.pay_price = val;
};

const discountedPrice = computed(() => {
  let discountAmount = 0;
  if (form.discount !== 0 && form.discount !== "") {
    discountAmount = (store.price * form.discount) / 100;
    form.price = store.price - discountAmount;
  } else if (form.discountSum !== 0 && form.discountSum !== "") {
    discountAmount = form.discountSum;
    form.price = store.price - discountAmount;
  }
  return store.price - discountAmount;
});

// Export functions
const exportExcelAllHistory = async () => {
  loading.excel = true;
  const config = {
    headers: authHeaders.value,
    responseType: "blob",
  };
  try {
    const response = await axios.get(`/v2/payment/history/all/excel?school_id=${schoolId.value}`, config);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    let fileName = "payment-all";
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    loading.excel = false;
  } catch (err) {
    handleError();
  }
};

const exportExcelHistory = async () => {
  loading.excel = true;
  const config = {
    headers: authHeaders.value,
    responseType: "blob",
  };

  let urlBase = `/v1/payment/history/excel?school_id=${schoolId.value}`;
  let fileName = "payment";

  if (history.dayModal) {
    urlBase += `&year=${history.year}&month=${history.month}&day=${history.day}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}_${
      history.day
    }`;
  } else if (history.monthModal) {
    urlBase += `&year=${history.year}&month=${history.month}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}`;
  } else if (history.groupMonthModal) {
    urlBase += `&year=${history.year}&month=${history.month}&group_id=${history.group_id}`;
    fileName = `payment_${history.year}_${monthNames(history.month)}_group`;
  } else if (history.yearModal) {
    urlBase += `&year=${history.year}`;
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
    handleError();
  }
};

const exportToExcelDebtor = async () => {
   loading.excel = true;
  const config = {
    headers: authHeaders.value,
    responseType: "blob",
  };

  let urlBase = `/v1/payment/debtor/excel?school_id=${schoolId.value}`;
  let fileName = "debtor";

  if (debtor.dayModal) {
    urlBase += `&year=${debtor.year}&month=${debtor.month}`;
    fileName = `debtor_${debtor.year}_${monthNames(debtor.month)}`;
  } else if (debtor.monthModal) {
    urlBase += `&year=${debtor.year}&month=${debtor.month}&group_id=${debtor.group_id}`;
    fileName = `debtor_${debtor.year}_${monthNames(debtor.month)}_group`;
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
    handleError();
  }
};

// API Functions
const getSchool = async () => {
  try {
    const res = await axios.get(`/v1/school/navbar/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.school_name = res.data.name;
    store.school_logo = res.data.image;
  } catch (error) {}
};

const getGroups = async () => {
  try {
    const res = await axios.get(`/v1/group/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.groups = res.data.sort((a, b) => b.id - a.id);
    store.error = false;
  } catch (error) {
    store.groups = error.response?.data?.message || [];
    store.error = true;
  }
};

const getStudents = async () => {
  try {
    const res = await axios.get(`/v1/student/${schoolId.value}/search`, {
      headers: authHeaders.value,
    });
    store.students = res.data.sort((a, b) => b.id - a.id);
    store.error = false;
  } catch (error) {
    store.students = error.response?.data?.message || [];
    store.error = true;
  }
};

const getStatistic = async (date) => {
  try {
    const res = await axios.get(
      `/v1/statistic/payment-day/${schoolId.value}/${date}`,
      { headers: authHeaders.value },
    );
    if (loading.excel) {
      history.statistic = res.data;
    } else {
      store.statistic = res.data;
    }
  } catch (error) {}
};

const getStatisticGroup = async (group_id, date) => {
  try {
    const res = await axios.get(
      `/v1/statistic/payment-day/${schoolId.value}/${group_id}/${date}`,
      { headers: authHeaders.value },
    );
    if (loading.excel) {
      history.statistic = res.data;
    } else {
      store.statistic = res.data;
    }
  } catch (error) {}
};

const getGroupStudents = async (group_id) => {
  debtor.isTable = false;

  try {
    const res = await axios.get(
      `/v1/payment/group/${schoolId.value}/${group_id}`,
      { headers: authHeaders.value },
    );
    store.payData = res.data[0];
  } catch (error) {
    handleError();
  }
};

const getStudentGroups = async (student_id) => {
  debtor.isTable = false;
  try {
    const res = await axios.get(
      `/v1/payment/student/${schoolId.value}/${student_id}`,
      { headers: authHeaders.value },
    );
    store.payData = res.data;
  } catch (error) {
    handleError();
  }
};

const checkPayment = (year, month, groupStartDate) => {
  const paymentYear = parseInt(year, 10);
  const paymentMonth = parseInt(month, 10);
  const groupStart = new Date(groupStartDate);
  const groupStartYear = groupStart.getFullYear();
  const groupStartMonth = groupStart.getMonth() + 1;


  return (
    paymentYear > groupStartYear ||
    (paymentYear === groupStartYear && paymentMonth >= groupStartMonth)
  );

};

const addPayment = async () => {
  if (store.isSubmitting) return;
  store.isSubmitting = true;

  const data = {
    school_id: Number(schoolId.value),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: form.discount,
    discountSum: form.discountSum,
    price: Number(form.price),
    description: form.description,
  };

//  if (!checkPayment(form.year, form.month, store.date)) {
//    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
//    store.isSubmitting = false;
//    return;
//  }


  // if (store.checkOldPay && form.year == hozirgiYil && form.month == hozirgiOy) {
  //   notification.warning(
  //     "To'lov qilmoqchi bo'lgan sanaga oldin to'lov qilingan",
  //   );
  //   store.isSubmitting = false;
  //   return;
  // }


  try {
    await axios.post("/v1/payment", data, { headers: authHeaders.value });
    printReceipt();
    notification.success("To'lov qilindi!");

    if (debtor.isTable) {
      getDebtor(store.pagination);
    } else if (store.payData) {
      getGroupStudents(form.group_id);
    } else {
      getStudentGroups(form.id);
    }
    cancelFunc();
  } catch (error) {
    handleError();
  } finally {
    store.isSubmitting = false;
  }
};

const getHistory = async (page = 1) => {
  loading.view = true;
  debtor.isTable = false;
  store.payData = false;

  const url = `/v1/payment/history`;

  const params = {
    school_id: schoolId.value,
    page,
    status: history.status,
  };

  if (history.dayModal) {
    params.year = history.year;
    params.month = history.month;
    params.day = history.day;
    getStatistic(`${history.year}-${history.month}-${history.day}`);
  } else if (history.monthModal) {
    params.year = history.year;
    params.month = history.month;
    getStatistic(`${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    params.year = history.year;
    params.month = history.month;
    params.group_id = history.group_id;
    getStatisticGroup(history.group_id, `${history.year}-${history.month}`);
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

    store.studentGroups = false;
    const summary = res.data?.data?.summary || {};
    statusCount.payment = summary.paymentCount || 0;
    statusCount.halfPayment = summary.halfPaymentCount || 0;
    statusCount.discount = summary.discountCount || 0;

    store.payHistoryData = records;
    const pagination = res.data?.data?.pagination;
    store.page = [pagination.currentPage, pagination.total_count];
    store.error = false;
    loading.view = false;
    history.modal = false;
    history.loader = false;
  } catch (error) {
    store.payHistoryData = error.response?.data?.message || [];
    store.error = true;
    loading.view = false;
  }
};

const getDebtor = async (page = 1) => {
  store.payData = false;

  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");

  if (!schoolId) return;

  const params = {
    school_id: schoolId,
    year: debtor.year,
    month: debtor.month,
    page: page,
  };

  if (debtor.monthModal) {
    params.group_id = debtor.group_id;
  }
  if (debtor.employee_id) {
    params.employee_id = debtor.employee_id;
  }

  try {
    const res = await axios.get(`/v1/payment/history/debtor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    const records = res.data?.data?.records || [];

    if (records.length > 0) {
      debtor.group_name = records[0].group_name;
    }

    store.payHistoryData = records;

    const pagination = res.data?.data?.pagination || {
      currentPage: 1,
      total_count: 0,
    };
    store.page = [pagination.currentPage, pagination.total_count];

    store.error = false;
    debtor.isTable = true;
    debtor.modal = false;
  } catch (error) {
    store.payHistoryData = error.response?.data?.message || [];
    store.error = true;
  }
};


const getMethod = async () => {
  try {
    const res = await axios.get(`/v1/payment-method/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.method = res.data;
  } catch (error) {
    store.method = [{ name: "To'lov turi yaratilmagan" }];
  }
};

const getOnePayment = async (id) => {
  try {
    const res = await axios.get(`/v1/payment/${schoolId.value}/${id}`, {
      headers: authHeaders.value,
    });

    getMethod();
    edit.id = id;
    Object.assign(form, {
      year: res.data.year,
      month: res.data.month,
      method: res.data.method,
      discount: res.data.discount,
      discountSum: res.data.discountSum,
      id: res.data.student.id,
      group_id: res.data.group.id,
      description: res.data.description,
    });

    store.pay_price = res.data.price;
    formatDateToNumeric(new Date(res.data.createdAt));
    store.student_name = res.data.student.full_name;
    store.group_name = res.data.group.name;
    store.price = res.data.group.price;
    store.teacher_name = res.data.group.employee[0].employee.full_name;
    edit.modal = true;
  } catch (error) {
    handleError();
  }
};

const editPayment = async () => {
  const data = {
    school_id: Number(schoolId.value),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: form.discount,
    discountSum: form.discountSum,
    price: store.pay_price,
  };

  // if (!checkPayment(form.year, form.month, store.date)) {
  //   notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
  //   return;
  // }

  try {
    await axios.put(`/v1/payment/${schoolId.value}/${edit.id}`, data, {
      headers: authHeaders.value,
    });
    printReceipt();
    notification.success("To'lov tahrirlandi!");
    getHistory(store.pagination);
    cancelFunc();
    cenecleEdit();
  } catch (error) {
    handleError();
  }
};

const deletePayment = async () => {
  try {
    await axios.delete(`/v1/payment/${schoolId.value}/${remove.id}`, {
      headers: authHeaders.value,
    });
    notification.success("To'lov o'chirildi");
    getHistory(store.pagination);
    remove.toggle = false;
  } catch (error) {
    handleError();
  }
};

const printReceipt = () => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Chek</title>
        <style>
          body { background-color: #f3f4f6; font-family: Arial, sans-serif; }
          .container { max-width: 320px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; }
          .title { text-align: center; font-size: 18px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; }
          .logo { display: flex; align-items: center; justify-content: center; gap: 5px; }
          .logo img { width: 30px; border-radius: 50%; }
          .row { display: flex; justify-content: space-between; border-bottom: 1px dashed black; padding: 8px 0; font-size: 12px; }
          .bold { font-weight: bold; }
          .strike { text-decoration: line-through; font-size: 10px; }
          .card { display: flex; flex-direction: column; align-items: flex-end; }
          .brand_box { display: flex; flex-direction: column; align-items: flex-end; font-size: 8px; margin-top: 20px; }
          .brand_box h5 { font-size: 10px; font-weight: 600; margin: 0; }
          .phone_number { font-size: 7px; font-weight: 600; text-align: end; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="${apiUrl.value}/${store.school_logo}" alt="">
            <h2 class="title">${store.school_name}</h2>
          </div>
          <div class="row"><span class="bold">To'lov turi:</span><span>${
            form.method
          }</span></div>
          <div class="row"><span class="bold">Talaba:</span><span>${
            store.student_name
          }</span></div>
          <div class="row"><span class="bold">Guruh nomi:</span><span>${
            store.group_name
          }</span></div>
          <div class="row">
            <span class="bold">Kurs narxi:</span>
            <span class="card">
              ${
                form.discount !== 0 && form.discount !== ""
                  ? `<span class="strike">${store.price?.toLocaleString(
                      "uz-UZ",
                    )} so'm</span>`
                  : ""
              }
              ${discountedPrice.value?.toLocaleString("uz-UZ")} so'm
            </span>
          </div>
          ${
            form.discount !== 0 && form.discount !== ""
              ? `<div class="row"><span class="bold">Chegirma:</span><span>${form.discount}%</span></div>`
              : ""
          }
          <div class="row"><span class="bold">Ustoz:</span><span>${
            store.teacher_name
          }</span></div>
          <div class="row"><span class="bold">Oy:</span><span class="bold">${monthNames(
            form.month,
          )}</span></div>
          <div class="row"><span class="bold">To'lov:</span><span class="bold">${Number(
            form.price,
          )?.toLocaleString("uz-UZ")} so'm</span></div>
          <div class="row"><span class="bold">Sana:</span><span>${
            store.chekDate
          }</span></div>
          <div class="brand_box"><h5>Devosoft Group</h5><span class="phone_number">+998933279137</span></div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.onafterprint = () => printWindow.close();
};

const printChek = async (id) => {
  const product = store.payHistoryData.find((product) => product.id === id);
  const priceDiscounted = product.discount
    ? (
        product.group_price -
        (product.group_price * product.discount) / 100
      ).toFixed(2)
    : product.discountSum

      ? product.group_price - product.discountSum
      : product.group_price;


  formatDateToNumeric(new Date(product.createdAt));


  try {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Chek</title>
          <style>
            body { background-color: #f3f4f6; font-family: Arial, sans-serif; }
            .container { max-width: 320px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; }
            .title { text-align: center; font-size: 18px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; }
            .logo { display: flex; align-items: center; justify-content: center; gap: 5px; }
            .logo img { width: 30px; border-radius: 50%; }
            .row { display: flex; justify-content: space-between; border-bottom: 1px dashed black; padding: 8px 0; font-size: 12px; }
            .bold { font-weight: bold; }
            .strike { text-decoration: line-through; font-size: 10px; }
            .card { display: flex; flex-direction: column; align-items: flex-end; }
            .brand_box { display: flex; flex-direction: column; align-items: flex-end; font-size: 8px; margin-top: 20px; }
            .brand_box h5 { font-size: 10px; font-weight: 600; margin: 0; }
            .phone_number { font-size: 7px; font-weight: 600; text-align: end; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="${apiUrl.value}/${store.school_logo}" alt="">
              <h2 class="title">${store.school_name}</h2>
            </div>
            <div class="row"><span class="bold">To'lov turi:</span><span>${
              product.method
            }</span></div>
            <div class="row"><span class="bold">Talaba:</span><span>${
              product.student_name
            }</span></div>
            <div class="row"><span class="bold">Guruh nomi:</span><span>${
              product.group_name
            }</span></div>
            <div class="row">
              <span class="bold">Kurs narxi:</span>
              <span class="card">
                ${
                  (product.discount !== 0 && product.discount !== "") ||
                  (product.discountSum !== 0 && product.discountSum !== "")
                    ? `<span class="strike">${Number(
                        product.group_price,
                      )?.toLocaleString("uz-UZ")} so'm</span>`
                    : ""
                }
                ${Number(priceDiscounted)?.toLocaleString("uz-UZ")} so'm
              </span>
            </div>
            ${
              product.discount !== 0 && product.discount !== ""
                ? `<div class="row"><span class="bold">Chegirma:</span><span>${product.discount}%</span></div>`
                : ""
            }
            ${
              product.discountSum !== 0 && product.discountSum !== ""
                ? `<div class="row"><span class="bold">Chegirma:</span><span>${Number(
                    product.discountSum,
                  )?.toLocaleString("uz-UZ")} so'm</span></div>`
                : ""
            }
            <div class="row"><span class="bold">Ustoz:</span><span>${
              product.teacher_name
            }</span></div>
            <div class="row"><span class="bold">Oy:</span><span class="bold">${monthNames(
              product.month,
            )}</span></div>
            <div class="row"><span class="bold">To'lov:</span><span class="bold">${product.price?.toLocaleString(
              "uz-UZ",
            )} so'm</span></div>
            <div class="row"><span class="bold">Sana:</span><span>${
              store.chekDate
            }</span></div>
            <div class="brand_box"><h5>Devosoft Group</h5><span class="phone_number">+998933279137</span></div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getSchool();
  getGroups();
  getStudents();
  getHistory(store.pagination);

  store.curentYil = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: String(orqaYil + i),
  }));
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

.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnOrqaga {
  background-image: linear-gradient(to right, white -450%, #2f73f0);
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
