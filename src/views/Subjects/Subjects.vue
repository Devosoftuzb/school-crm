<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      v-show="modal"
      :class="
        modal
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
              Yangi fan qo'shish
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
            </button>
          </div>
          <!-- Modal body -->
          <form
            @submit.prevent="createSubject"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div>
                <label for="name" class="block mb-2 text-sm">Fan nomi</label>
                <input
                  v-model="form.title"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Fan nomini kiriting"
                />
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
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Edit MODAL ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
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
              Fan nomini o'zgartirish
            </h3>
            <button
              @click="cancelEdit"
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
          <!-- Modal body -->
          <form
            @submit.prevent="editSubject"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid grid-cols-1 gap-4 mb-4 font-medium">
              <div>
                <label for="name" class="block mb-2 text-sm">Fan nomi</label>
                <input
                  v-model="edit.title"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Fan nomini kiriting"
                />
              </div>
            </div>
            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="cancelEdit"
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
    <!-- ----------------------------------------- Edit MODAL END ---------------------------------------------------- -->

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
              Fanni o'chirib tashlash
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
                  Siz fanni o'chirishni xohlaysizmi?
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
                  @click="deleteSubject"
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

    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="store.loaderTime">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="!store.loaderTime" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col items-center justify-between p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="flex items-center justify-between w-full gap-5 pb-4 lg:justify-start lg:pb-0"
          >
            <h1 class="text-lg font-bold text-blue-700">Fanlar</h1>
            <div
              class="flex flex-col items-stretch justify-end space-y-2 lg:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
            >
              <button
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl btnAdd max-w-fit whitespace-nowrap hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                <span>Fan qo'shish</span>
              </button>
            </div>
          </div>

          <div class="flex w-full">
            <form
              class="flex items-center w-full font-medium text-gray-900"
              @submit.prevent
            >
              <label class="sr-only">Qidiruv</label>

              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="store.filter"
                  @input="searchName(store.filter)"
                  type="search"
                  class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Qidirish..."
                />
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative overflow-hidden shadow-md rounded-xl mb-28"
          :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase rounded-xl btnAdd">
                <tr>
                  <th scope="col" class="py-3 text-center whitespace-nowrap">
                    Fan nomi
                  </th>
                  <th scope="col" class="py-3 text-center">Ochilgan sana</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-for="i in store.subjectData"
                  :key="i.id"
                >
                  <td
                    class="px-8 py-4 font-medium text-center whitespace-nowrap"
                  >
                    <span>{{ i.name }}</span>
                  </td>
                  <td
                    class="px-8 py-4 font-medium text-center text-blue-800 whitespace-nowrap"
                  >
                    <span class="bg-blue-100 rounded-[5px] p-1 px-14">{{
                      i.createdAt.slice(0, 10)
                    }}</span>
                  </td>
                  <td
                    class="py-4 pr-5 font-medium text-center whitespace-nowrap"
                  >
                    <i
                      @click="getOneSubject(i.id)"
                      class="p-2 mr-3 text-blue-600 bg-blue-300 cursor-pointer rounded-xl bx bxs-pencil focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="p-2 text-red-600 bg-red-300 cursor-pointer rounded-xl bx bxs-trash focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-show="!store.subjectData" class="flex justify-center w-full">
              <h1 class="p-20 text-2xl font-medium">Fanlar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchLamp"
            class="flex flex-row items-center justify-between p-4 space-y-0"
            aria-label="Table navigation"
          >
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
                    getPageSubject(store.pagination);
                  }
                "
              >
                <i
                  class="text-2xl font-bold text-black md:hidden bx bx-chevron-left"
                ></i>
                <span class="hidden md:block">Oldingi</span>
              </li>
            </ul>

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
                    getPageSubject(store.pagination);
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
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();

const modal = ref(false);

const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));

const toggleModal = () => {
  modal.value = !modal.value;
  form.title = "";
};

const store = reactive({
  subjectData: [],
  page: [],
  pagination: 1,
  error: false,
  filter: "",
  loaderTime: true,
  searchLamp: false,
  searchTimer: null,
});

function cancelFunc() {
  form.title = "";
  modal.value = false;
}

function cancelEdit() {
  edit.title = "";
  edit.start_date = "";
  edit.toggle = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

const form = reactive({ title: "" });
const edit = reactive({ title: "", id: "", toggle: false });
const remove = reactive({ id: "", toggle: false });

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!"
) => {
  notification.warning(message);
};

const fetchData = async (url, params = {}) => {
  try {
    const { data } = await axios.get(url, {
      headers: authHeaders.value,
      params: { school_id: schoolId.value, ...params },
    });
    return data;
  } catch (error) {
    handleError();
    throw error;
  }
};

const searchName = (name) => {
  store.searchLamp = true;
  clearTimeout(store.searchTimer);

  store.searchTimer = setTimeout(async () => {
    if (!name) {
      getPageSubject(store.pagination);
      store.searchLamp = false;
      return;
    }

    try {
      const data = await fetchData(
        `/v1/subject/search/${schoolId.value}/${name}`
      );
      store.subjectData = data;
    } catch {
      getPageSubject(store.pagination);
      store.searchLamp = false;
    }
  }, 350);
};

const getPageSubject = async (page) => {
  try {
    const res = await fetchData(`/v1/subject/${schoolId.value}/page`, { page });

    const pagination = res?.data?.pagination || {};
    store.subjectData = res?.data?.records || [];
    store.page = [pagination.currentPage || 1, pagination.total_count || 0];
    store.error = false;
    store.loaderTime = false;
  } catch (error) {
    store.subjectData = "Error fetching products";
    store.error = true;
    store.loaderTime = false;
  }
};

const getOneSubject = async (id) => {
  try {
    const res = await fetchData(`/v1/subject/${schoolId.value}/${id}`);

    Object.assign(edit, {
      title: res.name,
      id: id,
      toggle: true,
    });
  } catch (error) {
    handleError();
  }
};

const createSubject = async () => {
  try {
    const data = {
      school_id: Number(schoolId.value),
      name: form.title,
    };

    await axios.post("/v1/subject", data, { headers: authHeaders.value });
    notification.success("Fan qo'shildi");
    getPageSubject(store.pagination);
    cancelFunc();
  } catch (error) {
    handleError();
  }
};

const editSubject = async () => {
  try {
    const data = {
      school_id: Number(schoolId.value),
      name: edit.title,
    };

    await axios.put(`/v1/subject/${schoolId.value}/${edit.id}`, data, {
      headers: authHeaders.value,
    });
    notification.success("Fan tahrirlandi");
    getPageSubject(store.pagination);
    cancelEdit();
  } catch (error) {
    handleError();
  }
};

const deleteSubject = async () => {
  try {
    await axios.delete(`/v1/subject/${schoolId.value}/${remove.id}`, {
      headers: authHeaders.value,
    });
    notification.success("Fan o'chirildi");
    getPageSubject(store.pagination);
    remove.toggle = false;
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getPageSubject(store.pagination);
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnOrqaga {
  background-image: linear-gradient(to right, 4141eb -450%, #4141eb);
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
