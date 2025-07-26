<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4 pb-20">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.allProducts">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="text-blue-700 font-bold text-lg w-full">
            Xabar jo'natish
          </h1>
        </div>
      </div>

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col justify-between p-4 py-10 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="2xl:w-5/12 sm:w-4/6 w-full flex lg:pb-0 pb-2 gap-5">
            <form
              @submit.prevent="sendSMS(form.group_id)"
              :class="{ darkForm: navbar.userNav }"
              class="w-full flex sm:flex-row flex-col items-center justify-end gap-5"
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
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                  placeholder="Guruhni tanlang yoki qidirish..."
                />
                <ul
                  v-show="store.filter_show && store.searchList.length > 0"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white cursor-pointer pl-2"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      store.filter_show = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
                <ul
                  v-show="store.selectLamp && !store.filter"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                >
                  <li
                    class="hover:bg-blue-600 hover:text-white whitespace-nowrap cursor-pointer pl-2"
                    v-for="(i, index) in store.allProducts"
                    :key="index"
                    @mousedown.prevent="
                      form.group_id = i.id;
                      store.selectLamp = false;
                      store.filter = i.name;
                    "
                  >
                    {{ i.name }}
                  </li>
                </ul>
              </div>

              <div
                class="sm:max-w-fit w-full flex flex-row md:space-y-0 items-center justify-between md:justify-end md:space-x-3"
              >
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">Yuborish</span>
                </button>
              </div>
            </form>
          </div>
          <div
            class="font-bold lg:w-6/12 w-full flex flex-col gap-7 mt-10"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <span>
              Guruhni tanlang va yuborish tugmasini bosing va SMS xabarnoma
              guruhdagi to'lov qilmagan talabalar uchun avtomatik tarzda
              yuboriladi.
            </span>
            <span>
              SMS Namuna <br />
              Assalomu alaykum {studentName} ning ota-onasi! Farzandingiz {studentName} ning JORIY
              OY uchun TO'LOV larini amalga oshirishingiz kerak! Unutmang,
              FARZANDINGIZNING O'QITUVCHISI o'z vaqtida MAOSH olishi sizning o'z
              vaqtida to'lov qilishingizga bog'liq! Hurmat bilan {{store.schoolName}} o'quv
              markazi.
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";


const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);

const store = reactive({
  allProducts: false,
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  schoolName: ""
});

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  if (store.filter) {
    for (let i of store.allProducts) {
      if (i.name.toLowerCase().includes(store.filter.toLowerCase())) {
        store.searchList.push(i);
      }
    }
  }
}
// ---------------------------- search end ------------------------------------

// ----------------------------------- forms -----------------------------------
const form = reactive({
  group_id: "",
});

// ----------------------------------- axios --------------------------------
const getOneProduct = () => {
  axios
    .get(`/school/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.schoolName = res.data.name;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const getAllProduct = () => {
  axios
    .get(`/group/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.allProducts = res.data.sort((a, b) => b.id - a.id);
      store.error = false;
    })
    .catch((error) => {
      store.allProducts = error.response.data.message;
      store.error = true;
    });
};

const sendSMS = () => {
  const data = {
    group_id: form.group_id
  };
  axios
    .post("/sms/payment", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("SMS yuborildi!");
      form.group_id = ""
    })
    .catch((error) => {
      notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
    });
};

onMounted(() => {
  getOneProduct()
  getAllProduct();
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
  background-image: linear-gradient(to right, white -450%, #2f73f0);
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
