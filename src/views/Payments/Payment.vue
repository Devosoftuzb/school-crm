<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>

      <PageLoader :loading="loading.excel" text="Excel tayyorlanmoqda..." />
      <!------------------------------------------- Search ------------------------------------------->

      <!-- ---------------------------------------- Statistic ------------------------------------- -->

      <div
        v-show="store.PageProduct"
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
                    {{ j.method }} ({{ j.count.toLocaleString("uz-UZ") }})
                  </h3>
                  <h5
                    class="p-1 px-3 text-sm font-bold text-blue-700 bg-blue-100 rounded-lg sm:text-md"
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
                To'lovni o'chirib tashlash
              </h3>
              <button
                @click="remove.toggle = false"
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
                    Siz to'lovni o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="remove.toggle = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteProduct"
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
                  To'lov qilish
                </h3>
                <button
                  @click="cenecleEdit"
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

              <div class="flex flex-col items-center w-full gap-5 md:flex-row">
                <div
                  class="hidden max-w-xs p-3 mx-auto mb-5 bg-white rounded-lg shadow-lg sm:block"
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
                        v-if="form.discount !== 0 && form.discount !== ''"
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
                  <div
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
                  </div>
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
                  @submit.prevent="editProduct"
                  class="md:w-[60%] w-full"
                  :class="{ darkForm: navbar.userNav }"
                >
                  <div class="grid gap-4 mb-4 font-medium sm:grid-cols-1">
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label for="year" class="block mb-2 text-sm"
                          >Yilni tanlang</label
                        >
                        <select
                          v-model="form.year"
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
                          v-model="form.month"
                          id="month"
                          class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="To'lov sumani kiriting"
                          required
                          @input="onInput"
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
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma % kiriting"
                          required
                        />
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
                    </div>
                    <div>
                      <label for="description" class="block mb-2 text-sm"
                        >To'lovga izoh qoldirish</label
                      >
                      <textarea
                        v-model="form.description"
                        name="description"
                        id="description"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block h-20 w-full py-3 p-2.5"
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
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                  To'lov qilish
                </h3>
                <button
                  @click="toggleModal"
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

              <div class="flex flex-col items-center w-full gap-5 md:flex-row">
                <div
                  class="hidden max-w-xs p-3 mx-auto mb-5 bg-white rounded-lg shadow-lg sm:block"
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
                        v-if="form.discount !== 0 && form.discount !== ''"
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
                  <div
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
                  </div>
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
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label for="year" class="block mb-2 text-sm"
                          >Yilni tanlang</label
                        >
                        <select
                          v-model="form.year"
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
                          v-model="form.month"
                          id="month"
                          class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
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
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                          placeholder="Chegirma % kiriting"
                          required
                        />
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
                    </div>
                    <div>
                      <label for="description" class="block mb-2 text-sm"
                        >To'lovga izoh qoldirish</label
                      >
                      <textarea
                        v-model="form.description"
                        name="description"
                        id="description"
                        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block h-20 w-full py-3 p-2.5"
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
                      class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                      class="bg-white border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
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
                          v-for="(i, index) in store.groupAllProducts"
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
                    Qarzdorlar tarixini ko'rish
                  </h3>
                  <button
                    @click="debtorModal"
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
                  class="flex items-center justify-between w-full sm:w-auto"
                  id="navbar-sticky"
                >
                  <ul
                    class="flex flex-col items-center w-full gap-5 font-medium text-white sm:flex-row"
                  >
                    <li
                      class="w-full p-2 px-5 text-sm text-center bg-gray-600 rounded-lg cursor-pointer sm:max-w-fit hover:bg-gray-500 sm:text-md"
                      :class="debtor.dayModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="debtorDayModal"
                    >
                      <span>Oy bo'yicha ko'rish</span>
                    </li>
                    <li
                      class="w-full p-2 px-5 text-sm text-center bg-gray-600 rounded-lg cursor-pointer sm:max-w-fit hover:bg-gray-500 sm:text-md"
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
                      v-model="debtor.month"
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="debtorModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
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
                      v-model="debtor.month"
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
                        class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
                          v-for="(i, index) in store.groupAllProducts"
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
                  class="flex items-center justify-between w-full pt-5 mt-5 border-t"
                >
                  <button
                    @click="debtorModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------- debtor modal end ------------------------------------------------- -->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="flex flex-col items-center justify-between gap-3 p-4 mb-3 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
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
                class="btnAdd flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <span class="">To'lov tarixi</span>
              </button>
              <button
                @click="debtor.modal = true"
                type="button"
                class="btnAdd2 flex items-center w-full sm:max-w-fit justify-center whitespace-nowrap text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <span class="">Qarzdorlar tarixi</span>
              </button>
            </div>
          </div>

          <div class="flex items-center w-full gap-5 pb-2 lg:pb-0">
            <form
              @submit.prevent="getOneProduct(form.group_id)"
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
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
                    v-for="(i, index) in store.groupAllProducts"
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
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="O'quvchini tanlang yoki qidirish..."
                />
                <ul
                  v-show="
                    store.filter_showStudent &&
                    store.searchListStudent.length > 0
                  "
                  class="absolute z-10 w-full py-1 overflow-hidden overflow-y-auto text-gray-600 bg-white rounded max-h-80"
                >
                  <li
                    class="pl-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                    v-for="(i, index) in store.searchListStudent"
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
                    v-for="(i, index) in store.studentAllProducts"
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
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">To'lov qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          v-show="!store.allProducts && !debtor.isTable && !store.studentGroups"
          class="w-full mb-5 bg-transparent rounded-lg"
        >
          <ul
            class="bg-[rgba(213,219,242,0.5)] w-full grid lg:grid-cols-4 grid-cols-2 font-medium gap-2 text-center text-sm rounded-t-lg"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li
              class="w-auto rounded-lg"
              :class="
                navbar.userNav
                  ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-[#1e293b] hover:text-white'
              "
            >
              <button
                @click="statusPaymentAllModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
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
              class="w-auto rounded-lg"
              :class="
                navbar.userNav
                  ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-[#1e293b] hover:text-white'
              "
            >
              <button
                @click="statusPaymentModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusPayment ? 'btnAdd text-white' : ''"
              >
                To'liq to'lovlar ({{ statusCount.payment }})
              </button>
            </li>
            <li
              class="w-auto rounded-lg"
              :class="
                navbar.userNav
                  ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-[#1e293b] hover:text-white'
              "
            >
              <button
                @click="statusHalfPaymentModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
                :class="history.statusHalfPayment ? 'btnAdd text-white' : ''"
              >
                Yarim to'lovlar ({{ statusCount.halfPayment }})
              </button>
            </li>
            <li
              class="w-auto rounded-lg"
              :class="
                navbar.userNav
                  ? 'bg-[#1e293b] text-white hover:bg-white hover:text-black'
                  : 'bg-white hover:bg-[#1e293b] hover:text-white'
              "
            >
              <button
                @click="statusDiscountModal"
                class="shadow-lg rounded-lg px-5 py-2.5 focus:ring-2 text-sm w-full h-[100%]"
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
            !store.allProducts &&
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
            !store.allProducts &&
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
            !store.allProducts &&
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
            !store.allProducts &&
            !debtor.isTable &&
            !store.studentGroups &&
            !history.loader
          "
          class="pb-2 pl-4 text-sm font-bold text-gray-600 sm:text-md"
        >
          Barcha to'lov tarixi - {{ history.year }}
        </h2>

        <div
          class="relative overflow-hidden rounded-lg shadow-md mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div v-show="history.loader">
            <Placeholder3 />
          </div>

          <div
            v-show="store.allProducts && !store.studentGroups"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-lg btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center">To'lov holati</th>
                  <th scope="col" class="py-3 text-center">To'lov</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.allProducts"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="px-8 py-4 font-medium text-center">
                    <p
                      :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus === 'To\'langan',
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>

                  <td
                    v-show="store.btn_lamp"
                    class="px-8 py-4 font-medium text-center"
                  >
                    <button
                      v-show="store.btn_lamp"
                      @click="toggleModal(i.id, i.full_name)"
                      class="bg-green-600 rounded-lg py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.allProducts"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="
              store.studentGroups && !store.allProducts && !debtor.isTable
            "
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-lg btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center">F . I . O</th>
                  <th scope="col" class="py-3 text-center">Guruh nomi</th>
                  <th scope="col" class="py-3 text-center">To'lov holati</th>
                  <th scope="col" class="py-3 text-center">To'lov</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.studentGroups"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.studentFullName }}</span>
                  </th>
                  <th
                    scope="row"
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.groupName }}</span>
                  </th>
                  <td class="px-8 py-4 font-medium text-center">
                    <p
                      :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus === 'To\'langan',
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
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
                          i.studentId,
                          i.groupId,
                          i.studentFullName,
                          i.teacherName,
                          i.groupPrice,
                          i.groupName
                        )
                      "
                      class="bg-green-600 rounded-lg py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.studentGroups"
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="
              !store.allProducts &&
              !debtor.isTable &&
              !store.studentGroups &&
              !history.loader
            "
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-lg btnAdd">
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
                      class="btnAdd rounded-lg py-2.5 px-5 text-white"
                    >
                      Chek chiqarish
                    </button>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      v-show="i.status !== 'delete'"
                      @click="getEditProduct(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 rounded-lg cursor-pointer bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i v-show="i.status == 'delete'" class="pl-10"></i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="p-2 text-red-600 bg-red-300 rounded-lg cursor-pointer bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-show="
                (store.PageProduct && store.error) ||
                store.PageProduct.length == 0
              "
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div
            v-show="!store.allProducts && debtor.isTable"
            class="overflow-x-auto"
          >
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs text-white uppercase rounded-lg btnAdd whitespace-nowrap"
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
                  v-for="i in store.PageProduct"
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
                          i.remaining_debt,
                          i.teacher_name,
                          i.group_name
                        )
                      "
                      class="bg-green-600 rounded-lg py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-show="
                (store.PageProduct && store.error) ||
                store.PageProduct.length == 0
              "
              class="w-full p-20 text-2xl font-medium text-center max-w-screen"
            >
              <h1>Qarzdorlar ro'yhati bo'sh</h1>
            </div>
          </div>

          <nav
            v-show="
              !store.allProducts &&
              !debtor.isTable &&
              !history.loader &&
              !store.studentGroups
            "
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
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-right"
                ></i>
              </li>
            </ul>
          </nav>

          <nav
            v-show="!store.allProducts && debtor.isTable"
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
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
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
                  'flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm sm:py-2 sm:px-6 px-3 rounded-lg leading-tight cursor-pointer transition duration-200 ease-in-out',
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
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { Placeholder3 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ButtonLoader } from "../../components";
import { PageLoader } from "../../components";

const notification = useNotificationStore();
const navbar = useNavStore();

const modal = ref(false);
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

const loading = reactive({
  view: false,
  excel: false,
});

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  groupAllProducts: false,
  studentAllProducts: false,
  error: false,
  guard: "",
  method: "",
  filter: "",
  filterStudent: "",
  filter_show: false,
  filter_showStudent: false,
  searchList: [],
  searchListStudent: [],
  price: 0,
  date: "",
  curentYil: [],
  chekDate: "",
  group_name: "",
  student_name: "",
  teacher_name: "",
  school_logo: "",
  logo_link: import.meta.env.VITE_API + "/",
  school_name: "",
  btn_lamp: true,
  statistic: false,
  selectLamp: false,
  selectLampStudent: false,
  isSubmitting: false,
  pay_price: 0,
  studentGroups: false,
});

const statusCount = reactive({
  payment: 0,
  halfPayment: 0,
  discount: 0,
});

function toggleModal(id, name) {
  modal.value = !modal.value;
  form.year = hozirgiYil;
  form.month = hozirgiOy;
  form.method = "";
  form.price = store.price;
  form.id = id;
  form.discount = 0;
  store.student_name = name;
  formatDateToNumeric(new Date());
}

function toggleModalStudent(
  id,
  groupID,
  studentName,
  teacherName,
  groupPrice,
  groupName
) {
  modal.value = !modal.value;
  form.year = hozirgiYil;
  form.month = hozirgiOy;
  form.method = "";
  form.price = groupPrice;
  form.id = id;
  form.group_id = groupID;
  store.student_name = studentName;
  store.price = groupPrice;
  store.teacher_name = teacherName;
  store.group_name = groupName;
  formatDateToNumeric(new Date());
}

function paymentDebtor(
  id,
  name,
  group_id,
  group_price,
  debtorPay,
  teacher_name,
  group_name
) {
  getSchool();
  modal.value = !modal.value;
  form.year = hozirgiYil;
  form.month = hozirgiOy;
  form.price = debtorPay;
  store.price = group_price;
  store.teacher_name = teacher_name;
  store.group_name = group_name;
  form.group_id = group_id;
  form.id = id;
  store.student_name = name;
}

const cenecleEdit = () => {
  edit.modal = false;
  cancelFunc();
};

function cancelFunc() {
  form.year = "";
  form.month = "";
  form.method = "";
  form.price = store.price;
  form.discount = 0;
  modal.value = false;
}

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  if (store.filter) {
    for (let i of store.groupAllProducts) {
      if (i.name.toLowerCase().includes(store.filter.toLowerCase())) {
        store.searchList.push(i);
      }
    }
  }
}

function searchHistoryFunc() {
  history.searchList = [];
  if (history.filter) {
    for (let i of store.groupAllProducts) {
      if (i.name.toLowerCase().includes(history.filter.toLowerCase())) {
        history.searchList.push(i);
      }
    }
  }
}

function searchDebtorFunc() {
  debtor.searchList = [];
  if (debtor.filter) {
    for (let i of store.groupAllProducts) {
      if (i.name.toLowerCase().includes(debtor.filter.toLowerCase())) {
        debtor.searchList.push(i);
      }
    }
  }
}

function searchFuncStudent() {
  store.searchListStudent = [];
  if (store.filterStudent) {
    for (let i of store.studentAllProducts) {
      if (
        i.full_name.toLowerCase().includes(store.filterStudent.toLowerCase())
      ) {
        store.searchListStudent.push(i);
      }
    }
  }
}
// ---------------------------- search end ------------------------------------

// ----------------------------------- forms -----------------------------------

const form = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  method: "",
  price: store.price,
  id: "",
  group_id: "",
  discount: 0,
  description: "",
});

const edit = reactive({
  modal: false,
  id: false,
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

const remove = reactive({
  id: "",
  toggle: false,
});

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
  getHistory(store.pagination);
};

const statusPaymentAllModal = () => {
  history.status = "all";
  history.statusPaymentAll = true;
  history.statusPayment = false;
  history.statusHalfPayment = false;
  history.statusDiscount = false;
  history.loader = true;
  getHistory(1);
};

const statusPaymentModal = () => {
  history.status = "payment";
  history.statusPayment = true;
  history.statusPaymentAll = false;
  history.statusHalfPayment = false;
  history.statusDiscount = false;
  history.loader = true;
  getHistory(1);
};

const statusHalfPaymentModal = () => {
  history.status = "halfPayment";
  history.statusHalfPayment = true;
  history.statusPaymentAll = false;
  history.statusPayment = false;
  history.statusDiscount = false;
  history.loader = true;
  getHistory(1);
};

const statusDiscountModal = () => {
  history.status = "discount";
  history.statusDiscount = true;
  history.statusPaymentAll = false;
  history.statusPayment = false;
  history.statusHalfPayment = false;
  history.loader = true;
  getHistory(1);
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

const debtorDayModal = () => {
  debtor.dayModal = true;
  debtor.monthModal = false;
};

const debtorMonthModal = () => {
  debtor.dayModal = false;
  debtor.monthModal = true;
};

const debtorModal = () => {
  debtor.modal = !debtor.modal;
  debtor.year = hozirgiYil;
  debtor.month = hozirgiOy;
  debtor.day = hozirgiKun;
  debtor.group_id = "";
  debtorDayModal();
  getHistory(store.pagination);
};

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

// ----------------------------------- axios --------------------------------

const discountedPrice = computed(() => {
  const discountAmount = (store.price * form.discount) / 100;
  form.price = store.price - discountAmount;
  return store.price - discountAmount;
});

const chekDateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

const getAllHistoryForExport = async () => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let urlBase;
  if (history.dayModal) {
    urlBase = `/payment/day/${schoolId}/${history.year}/${history.month}/${history.day}/all/page`;
    await getStatistic(`${history.year}-${history.month}-${history.day}`);
  } else if (history.monthModal) {
    urlBase = `/payment/month/${schoolId}/${history.year}/${history.month}/all/page`;
    await getStatistic(`${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    urlBase = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/all/page`;
    await getStatisticGroup(
      history.group_id,
      `${history.year}-${history.month}`
    );
  } else if (history.yearModal) {
    urlBase = `/payment/year/${schoolId}/${history.year}/all/page`;
    // await getStatistic(`${history.year}-${history.month}`);
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

  const list = history.dayModal
    ? history.dayList
    : history.monthModal
    ? history.monthList
    : history.groupMonthModal
    ? history.groupMonthList
    : history.yearList;

  if (!list || list.length === 0) {
    loading.excel = false;
    notification.warning("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  const rawData = list.filter(item => item.status !== 'delete');

  const dataToExport = rawData.map((item) => ({
    "O'quvchi (F . I . O)": item.student_name,
    "O'qituvchi (F . I . O)": item.teacher_name,
    "Guruh nomi": item.group_name,
    "Guruh narxi": Number(item.group_price).toLocaleString("uz-UZ") + " so'm",
    "To'lov turi": item.method,
    "To'langan summa": item.price,
    "Chegirma (%)": item.discount + " %",
    Oy: monthNames(item.month),
    "To'lov sanasi (Oy)": monthNames(String(new Date(item.createdAt).getMonth() + 1).padStart(2, "0")),
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
    history.statistic.statistics &&
    history.statistic.statistics.length > 0
  ) {
    const startRow = lastRow + 4;

    ws[`A${startRow}`] = { t: "s", v: "To'lov turi" };
    ws[`B${startRow}`] = { t: "s", v: "To'lovlar soni" };
    ws[`C${startRow}`] = { t: "s", v: "Jami summa" };

    history.statistic.statistics.forEach((stat, idx) => {
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
    const maxRow = startRow + history.statistic.statistics.length;
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
    ? `kunlik_tolov_tarixi_${history.year}-${history.month}-${history.day}.xlsx`
    : history.monthModal
    ? `oylik_tolov_tarixi_${history.year}-${history.month}.xlsx`
    : history.groupMonthModal
    ? `guruhni_oylik_tolov_tarixi_${history.year}-${history.month}-${history.group_name}.xlsx`
    : `barcha_tolov_tarixi_${history.year}.xlsx`;

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
  loading.excel = false;
  notification.success("Excel fayl yuklab olindi!");
  history.modal = !history.modal;
};

const getSchool = () => {
  axios
    .get(`/school/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.school_name = res.data.name;
      store.school_logo = res.data.image;
    })
    .catch((error) => {});
};

const getAllProduct = () => {
  axios
    .get(`/group/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.groupAllProducts = res.data.sort((a, b) => b.id - a.id);
      store.error = false;
    })
    .catch((error) => {
      store.groupAllProducts = error.response.data.message;
      store.error = true;
    });
};

const getAllStudent = () => {
  axios
    .get(`/student/${localStorage.getItem("school_id")}/findNot`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.studentAllProducts = res.data.sort((a, b) => b.id - a.id);
      store.error = false;
    })
    .catch((error) => {
      store.studentAllProducts = error.response.data.message;
      store.error = true;
    });
};

const getStatistic = async (date) => {
  await axios
    .get(
      `/statistic/payment-day/${localStorage.getItem("school_id")}/${date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      if (loading.excel) {
        history.statistic = res.data;
      } else {
        store.statistic = res.data;
      }
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
      if (loading.excel) {
        history.statistic = res.data;
      } else {
        store.statistic = res.data;
      }
    })
    .catch((error) => {});
};

const calculatePaymentStatus = (paymentHistory, groupPrice) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

  if (!paymentHistory || paymentHistory.length === 0) {
    return `(${groupPrice}) so'm to'lanmagan`;
  }

  const totalDiscount = paymentHistory[0]?.discount || 0;
  const discountedPrice = Math.round(groupPrice * (1 - totalDiscount / 100));

  let currentMonthPaid = 0;
  paymentHistory.forEach((payment) => {
    if (
      payment.year === String(currentYear) &&
      payment.month === String(currentMonth)
    ) {
      currentMonthPaid += payment.price;
    }
  });

  if (currentMonthPaid >= discountedPrice) {
    return "To'langan";
  } else {
    const amountDue = discountedPrice - currentMonthPaid;
    return `(${amountDue.toLocaleString("uz-UZ")}) so'm to'lanmagan`;
  }
};

const getOneProduct = async (id) => {
  debtor.isTable = false;
  if (form.group_id == "" && form.id) {
    getStudentGroups(form.id);
    form.group_id = "";
    form.filter = "";
  } else {
    form.id = "";
    form.filterStudent = "";
    try {
      const schoolId = localStorage.getItem("school_id");
      const token = localStorage.getItem("token");
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const groupResponse = await axios.get(
        `/group/${schoolId}/${id}/payment`,
        headers
      );
      const {
        price: groupPrice,
        start_date: groupStartDate,
        name: groupName,
        school,
      } = groupResponse.data;

      store.price = Number(groupPrice);
      store.date = groupStartDate;
      store.group_name = groupName;
      form.group_id = id;
      store.school_name = school.name;
      store.school_logo = school.image;

      const employeeResponse = await axios.get(
        `/employee/${schoolId}/${groupResponse.data.employee[0].employee_id}/fullname`,
        headers
      );
      store.teacher_name = employeeResponse.data.full_name;

      if (!groupStartDate || isNaN(Date.parse(groupStartDate))) {
        throw new Error("Guruh ochilgan sana noto'g'ri");
      }

      const studentPromises = groupResponse.data.student.map(
        async (student) => {
          const studentInfo = await axios.get(
            `/student/${schoolId}/${student.student_id}/payment`,
            headers
          );
          const payments = studentInfo.data.payment;
          const paymentsForGroup = payments.filter(
            (payment) =>
              payment.group_id === form.group_id && payment.status !== "delete"
          );

          studentInfo.data.paymentStatus = calculatePaymentStatus(
            paymentsForGroup,
            groupPrice
          );
          return studentInfo.data;
        }
      );

      store.allProducts = await Promise.all(studentPromises);
      store.studentGroups = false;
    } catch (error) {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    }
  }
};

const getStudentGroups = async (student_id) => {
  debtor.isTable = false;
  try {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const studentResponse = await axios.get(
      `/student/${schoolId}/${student_id}/not`,
      headers
    );
    const studentFullName = studentResponse.data.full_name;

    const groupsResponse = await axios.get(
      `/student/${schoolId}/${student_id}/studentGroup`,
      headers
    );
    const groups = groupsResponse.data.group;

    const groupDetailsPromises = groups.map(async (group) => {
      const groupId = group.group_id;

      const groupPaymentResponse = await axios.get(
        `/group/${schoolId}/${groupId}/payment`,
        headers
      );
      const groupData = groupPaymentResponse.data;
      const groupPrice = Number(groupData.price);
      const groupName = groupData.name;
      const groupStartDate = groupData.start_date;

      const employeeId = groupData.employee[0].employee_id;
      const employeeResponse = await axios.get(
        `/employee/${schoolId}/${employeeId}/fullname`,
        headers
      );
      const teacherName = employeeResponse.data.full_name;

      const studentInfoResponse = await axios.get(
        `/student/${schoolId}/${student_id}/payment`,
        headers
      );
      const payments = studentInfoResponse.data.payment;

      const paymentsForGroup = payments.filter(
        (payment) => payment.group_id === groupId && payment.status !== "delete"
      );

      const paymentStatus = calculatePaymentStatus(
        paymentsForGroup,
        groupPrice
      );

      return {
        studentId: student_id,
        studentFullName,
        groupId,
        groupName,
        groupPrice,
        teacherName,
        groupStartDate,
        paymentStatus,
      };
    });

    const detailedGroups = await Promise.all(groupDetailsPromises);

    store.studentGroups = detailedGroups;
    store.allProducts = false;
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const checkPayment = (year, month, groupStartDate) => {
  const paymentYear = parseInt(year, 10);
  const paymentMonth = parseInt(month, 10);

  const groupStart = new Date(groupStartDate);
  const groupStartYear = groupStart.getFullYear();
  const groupStartMonth = groupStart.getMonth() + 1;

  if (
    paymentYear < groupStartYear ||
    (paymentYear === groupStartYear && paymentMonth < groupStartMonth)
  ) {
    return false;
  } else {
    return true;
  }
};

const checkOldPayment = async (
  school_id,
  student_id,
  group_id,
  year,
  month
) => {
  try {
    const res = await axios.get(`/payment/${school_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const payments = res.data;
    const studentPayments = payments.filter(
      (payment) =>
        payment.student_id === student_id &&
        payment.group_id === group_id &&
        payment.year === year &&
        payment.month === month &&
        payment.status !== "delete"
    );

    // Agar chegirma mavjud bo'lsa, uni hisoblash
    const discount =
      studentPayments.length > 0 ? studentPayments[0].discount || 0 : 0;
    const discountedPrice = Math.round(store.price * (1 - discount / 100));

    // To'langan umumiy summani hisoblash
    const totalPaid = studentPayments.reduce(
      (sum, payment) => sum + payment.price,
      0
    );

    // To'langan summa chegirma qo'llangan narxdan kam bo'lsa, eski to'lov yo'q deb qaytarish
    return totalPaid < discountedPrice;
  } catch (error) {
    return false;
  }
};

const addPayment = async () => {
  if (store.isSubmitting) return;
  store.isSubmitting = true;

  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: form.discount,
    price: form.price,
    description: form.description,
  };

  const check = checkPayment(form.year, form.month, store.date);

  const checkOldPay = await checkOldPayment(
    Number(localStorage.getItem("school_id")),
    form.id,
    Number(form.group_id),
    form.year,
    form.month
  );

  if (!check) {
    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
    return;
  }

  // if (!checkOldPay) {
  //   notification.warning(
  //     "To'lov qilmoqchi bo'lgan sanaga oldin to'lov qilingan"
  //   );
  //   return;
  // }

  try {
    const res = await axios.post("/payment", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    printReceipt();
    cancelFunc();
    notification.success("To'lov qilindi!");
    store.isSubmitting = false;
    if (debtor.isTable) {
      getDebtor(store.pagination);
    } else if (store.allProducts) {
      getOneProduct(form.group_id);
    } else {
      getStudentGroups(form.id);
    }
  } catch (error) {
    console.log(error);
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getHistory = (page) => {
  loading.view = true;
  debtor.isTable = false;
  store.allProducts = false;
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url;
  if (history.dayModal) {
    url = `/payment/day/${schoolId}/${history.year}/${history.month}/${history.day}/${history.status}/page?page=${page}`;
    getStatistic(`${history.year}-${history.month}-${history.day}`);
  } else if (history.monthModal) {
    url = `/payment/month/${schoolId}/${history.year}/${history.month}/${history.status}/page?page=${page}`;
    getStatistic(`${history.year}-${history.month}`);
  } else if (history.groupMonthModal) {
    url = `/payment/groupMonth/${schoolId}/${history.group_id}/${history.year}/${history.month}/${history.status}/page?page=${page}`;
    getStatisticGroup(history.group_id, `${history.year}-${history.month}`);
  } else if (history.yearModal) {
    url = `/payment/year/${schoolId}/${history.year}/${history.status}/page?page=${page}`;
    // getStatistic(`${history.year}-${history.month}`);
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
      store.studentGroups = false;
      statusCount.payment = res.data?.data?.summary.paymentCount;
      statusCount.halfPayment = res.data?.data?.summary.halfPaymentCount;
      statusCount.discount = res.data?.data?.summary.discountCount;
      store.PageProduct = records;
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      store.error = false;
      loading.view = false;
      history.modal = false;
      history.loader = false;
    })
    .catch((error) => {
      store.PageProduct = error.response?.data?.message;
      store.error = true;
    });
};

const getDebtor = (page) => {
  store.allProducts = false;
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url;
  if (debtor.dayModal) {
    url = `/payment/debtor/${schoolId}/${debtor.year}/${debtor.month}/page?page=${page}`;
  } else if (debtor.monthModal) {
    url = `/payment/debtor-group/${schoolId}/${debtor.group_id}/${debtor.year}/${debtor.month}/page?page=${page}`;
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
      store.PageProduct = records;
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      store.error = false;
      debtor.isTable = true;
      debtor.modal = false;
    })
    .catch((error) => {
      store.PageProduct = error.response?.data?.message;
      store.error = true;
    });
};

const getMethod = () => {
  axios
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

const getEditProduct = (id) => {
  axios
    .get(`/payment/${localStorage.getItem("school_id")}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      edit.id = id;
      form.year = res.data.year;
      form.month = res.data.month;
      store.pay_price = res.data.price;
      form.discount = res.data.discount;
      form.method = res.data.method;
      form.description = res.data.description;
      form.id = res.data.student.id;
      form.group_id = res.data.group.id;
      formatDateToNumeric(new Date(res.data.createdAt));
      store.school_logo = res.data.school.image;
      store.school_name = res.data.school.name;
      store.student_name = res.data.student.full_name;
      store.group_name = res.data.group.name;
      store.price = res.data.group.price;
      const teacher = store.PageProduct.find((teacher) => teacher.id === id);
      store.teacher_name = teacher.teacher_name;
      edit.modal = true;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const editProduct = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: form.discount,
    price: store.pay_price,
  };

  const check = checkPayment(form.year, form.month, store.date);

  if (!check) {
    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
  } else {
    axios
      .put(`/payment/${localStorage.getItem("school_id")}/${edit.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        printReceipt();
        cancelFunc();
        cenecleEdit();
        notification.success("To'lov tahrirlandi!");
        getProduct(store.pagination);
      })
      .catch((error) => {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
        );
      });
  }
};

const deleteProduct = () => {
  axios
    .delete(`/payment/${localStorage.getItem("school_id")}/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("To'lov o'chirildi");
      getHistory(store.pagination);
      remove.toggle = false;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  store.chekDate = `${year}-${month}-${day}, ${hour}:${minute}`;
};

const printReceipt = () => {
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>Chek</title>
        <style>
          body {
            background-color: #f3f4f6;
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 320px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 20px;
          }
          .title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
          .logo img {
            width: 30px;
            border-radius: 50%;
          }
          .row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed black;
            padding: 8px 0;
            font-size: 12px;
          }
          .bold {
            font-weight: bold;
          }
          .strike {
            text-decoration: line-through;
            font-size: 10px;
          }
          .card {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }  
          .footer {
            text-align: center;
            font-size: 10px;
            margin-top: 15px;
          }
          .brand_box {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-size: 8px;
            margin-top: 20px;
          }
          .brand_box h5 {
            font-size: 10px;
            font-weight: 600;
            margin: 0;
          }
          .phone_number {
            font-size: 7px;
            font-weight: 600;
            text-align: end;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="${import.meta.env.VITE_API}/${store.school_logo}" alt="">
            <h2 class="title">${store.school_name}</h2>
          </div>
          <div class="row">
            <span class="bold">To'lov turi:</span>
            <span>${form.method}</span>
          </div>
          <div class="row">
            <span class="bold">Talaba:</span>
            <span>${store.student_name}</span>
          </div>
          <div class="row">
            <span class="bold">Guruh nomi:</span>
            <span>${store.group_name}</span>
          </div>
          <div class="row">
            <span class="bold">Kurs narxi:</span>
            <span class="card">
              ${
                form.discount !== 0 && form.discount !== ""
                  ? `<span class="strike">${store.price?.toLocaleString(
                      "uz-UZ"
                    )} so'm</span>`
                  : ""
              }
              ${discountedPrice.value?.toLocaleString("uz-UZ")} so'm
            </span>
          </div>
          ${
            form.discount !== 0 && form.discount !== ""
              ? `
          <div class="row">
            <span class="bold">Chegirma:</span>
            <span>${form.discount}%</span>
          </div>
          `
              : ""
          }
          <div class="row">
            <span class="bold">Ustoz:</span>
            <span>${store.teacher_name}</span>
          </div>
          <div class="row">
            <span class="bold">Oy:</span>
            <span class="bold">${monthNames(form.month)}</span>
          </div>
          <div class="row">
            <span class="bold">To'lov:</span>
            <span class="bold">${Number(form.price)?.toLocaleString(
              "uz-UZ"
            )} so'm</span>
          </div>
          <div class="row">
            <span class="bold">Sana:</span>
            <span>${store.chekDate}</span>
          </div>
          <div class="footer">
            <span>IT ni it deb o'qima, <br> Ingliz tili va AyTi ni <strong>${
              store.school_name
            }</strong> da o'rgan!</span>
          </div>
          <div class="brand_box">
            <h5>Devosoft Group</h5>
            <span class="phone_number">+998933279137</span>
          </div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();

  printWindow.onafterprint = () => {
    printWindow.close();
  };
};

const printChek = (id) => {
  const product = store.PageProduct.find((product) => product.id === id);
  const priceDiscounted = product.discount
    ? (
        product.group_price -
        (product.group_price * product.discount) / 100
      ).toFixed(2)
    : product.group_price;

  formatDateToNumeric(new Date(product.createdAt));
  axios
    .get(`/school/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
    <html>
      <head>
        <title>Chek</title>
        <style>
          body {
            background-color: #f3f4f6;
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 320px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 20px;
          }
          .title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
          .logo img {
            width: 30px;
            border-radius: 50%;
          }
          .row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed black;
            padding: 8px 0;
            font-size: 12px;
          }
          .bold {
            font-weight: bold;
          }
          .strike {
            text-decoration: line-through;
            font-size: 10px;
          }
          .card {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }  
          .footer {
            text-align: center;
            font-size: 10px;
            margin-top: 15px;
          }
          .brand_box {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-size: 8px;
            margin-top: 20px;
          }
          .brand_box h5 {
            font-size: 10px;
            font-weight: 600;
            margin: 0;
          }
          .phone_number {
            font-size: 7px;
            font-weight: 600;
            text-align: end;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="${import.meta.env.VITE_API}/${res.data.image}" alt="">
            <h2 class="title">${res.data.name}</h2>
          </div>
          <div class="row">
            <span class="bold">To'lov turi:</span>
            <span>${product.method}</span>
          </div>
          <div class="row">
            <span class="bold">Talaba:</span>
            <span>${product.student_name}</span>
          </div>
          <div class="row">
            <span class="bold">Guruh nomi:</span>
            <span>${product.group_name}</span>
          </div>
          <div class="row">
            <span class="bold">Kurs narxi:</span>
            <span class="card">
              ${
                product.discount !== 0 && product.discount !== ""
                  ? `<span class="strike">${Number(
                      product.group_price
                    )?.toLocaleString("uz-UZ")} so'm</span>`
                  : ""
              }
              ${Number(priceDiscounted)?.toLocaleString("uz-UZ")} so'm
            </span>
          </div>
          ${
            product.discount !== 0 && product.discount !== ""
              ? `
          <div class="row">
            <span class="bold">Chegirma:</span>
            <span>${product.discount}%</span>
          </div>
          `
              : ""
          }
          <div class="row">
            <span class="bold">Ustoz:</span>
            <span>${product.teacher_name}</span>
          </div>
          <div class="row">
            <span class="bold">Oy:</span>
            <span class="bold">${monthNames(product.month)}</span>
          </div>
          <div class="row">
            <span class="bold">To'lov:</span>
            <span class="bold">${product.price?.toLocaleString(
              "uz-UZ"
            )} so'm</span>
          </div>
          <div class="row">
            <span class="bold">Sana:</span>
            <span>${store.chekDate}</span>
          </div>
          <div class="footer">
            <span>IT ni it deb o'qima, <br> Ingliz tili va AyTi ni <strong>${
              res.data.name
            }</strong> da o'rgan!</span>
          </div>
          <div class="brand_box">
            <h5>Devosoft Group</h5>
            <span class="phone_number">+998933279137</span>
          </div>
        </div>
      </body>
    </html>
  `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();

      printWindow.onafterprint = () => {
        printWindow.close();
      };
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

onMounted(() => {
  getSchool();
  getAllProduct();
  getAllStudent();
  getHistory(store.pagination);
  getMethod();
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
