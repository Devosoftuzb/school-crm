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
          class="flex flex-col items-center justify-between gap-3 p-4 mb-4 shadow rounded-xl lg:flex-row lg:space-x-4"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <h1 class="w-full text-lg font-bold text-blue-700">
            Xabar jo'natish
          </h1>
        </div>
      </div>

      <div v-show="store.allProducts" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="flex flex-col justify-between gap-3 p-4 py-10 mb-4 shadow rounded-xl"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div class="flex w-full gap-5 pb-2 2xl:w-5/12 sm:w-4/6 lg:pb-0">
            <form
              @submit.prevent="sendSMS(form.group_id)"
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
                class="flex flex-row items-center justify-between w-full sm:max-w-fit md:space-y-0 md:justify-end md:space-x-3"
              >
                <button
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2.5"
                >
                  <span class="">Yuborish</span>
                </button>
              </div>
            </form>
          </div>
          <div
            class="flex flex-col w-full mt-10 font-bold lg:w-6/12 gap-7"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <span>
              Guruhni tanlang va yuborish tugmasini bosing va SMS xabarnoma
              guruhdagi to'lov qilmagan talabalar uchun avtomatik tarzda
              yuboriladi.
            </span>
            <span>
              SMS Namuna <br />
              Hurmatli ota-ona, Davlat Jo'rayev uchun joriy oy to'lovi
              kutilmoqda. Iltimos, o'z vaqtida amalga oshiring.
              {{ store.schoolName }}
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

const formatSchoolName = (name) => {
  if (!name) return "";
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const store = reactive({
  allProducts: false,
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
  schoolName: formatSchoolName(localStorage.getItem("school_name")),
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

const getGroups = () => {
  axios
    .get(`/v1/group/add/${localStorage.getItem("school_id")}`, {
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
    group_id: form.group_id,
  };
  axios
    .post("/v1/sms/payment", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("SMS yuborildi!");
      form.group_id = "";
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

onMounted(() => {
  getGroups();
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
