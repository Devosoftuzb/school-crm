<template>
  <section class="px-2">
    <!-- Slug start  -->

    <div>
      <div class="mt-10" v-show="!store.loading">
        <Placeholder2 />
      </div>
      <div
        v-show="store.loading"
        class="mt-10 rounded-lg p-[15px] mb-32"
        :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
      >
        <div class="flex justify-between items-center font-bold mb-5">
          <h1 class="sm:text-lg text-sm text-blue-700">
            <span v-show="store.modalInfo">O'quvchining ma'lumotlari</span>
            <span v-show="store.modalGroup">O'quvchining guruhlari</span>
            <span v-show="store.modalPayment">O'quvchining to'lov tarixi</span>
          </h1>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg rounded-lg px-5 py-2.5 text-white focus:ring-2 text-sm"
          >
            Orqaga qaytish
          </button>
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
                To'lov tarixi
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
                    <span class="w-full font-bold">Ota-ona ismi :</span>
                    <span class="w-full">{{
                      store.data.parents_full_name
                    }}</span>
                  </h2>

                  <h2
                    class="w-full flex sm:flex-row flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Ota-ona raqami :</span>
                    <span class="w-full">{{
                      store.data.parents_phone_number
                    }}</span>
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
                        {{ i.price }} so'm
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
            class="relative shadow-md rounded-lg overflow-hidden m-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btn text-white text-xs rounded-lg uppercase">
                  <tr>
                    <th scope="col" class="text-center py-3">Guruh</th>
                    <th scope="col" class="text-center py-3">Kurs narxi</th>
                    <th scope="col" class="text-center py-3">To'lov turi</th>
                    <th scope="col" class="text-center py-3">To'lov</th>
                    <th scope="col" class="text-center py-3">Oy</th>
                    <th scope="col" class="text-center py-3">To'lov sanasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                    v-for="i in store.payment"
                    :key="i.id"
                  >
                    <td
                      scope="row"
                      class="text-center px-8 py-4 font-medium whitespace-nowrap"
                    >
                      {{ i.group_name }}
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.group_price }} so'm
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.method }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-green-700 px-8 py-4"
                    >
                      <p class="bg-green-100 rounded-[5px] p-1">
                        {{ i.price }} so'm
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-blue-800 px-8 py-4"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ monthNames(i.month) }}
                      </p>
                    </td>
                    <td
                      class="text-center font-medium whitespace-nowrap text-red-800 px-8 py-4"
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
                class="w-full max-w-screen text-center p-20 text-2xl font-medium"
              >
                <h1>To'lov tarixi ro'yhati bo'sh</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Slug END -->
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";

const navbar = useNavStore();
const router = useRouter();

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
});

const date = ref("");

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
  return months[parseInt(month) - 1] || "Notog'ri oy";
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

const getStudent = async () => {
  const schoolId = localStorage.getItem("school_id");
  const id = router.currentRoute.value.params.id;

  try {
    const studentData = await fetchData(`/student/${schoolId}/${id}/group`);
    store.data = studentData;
    date.value = store.data.createdAt.split("T")[0];

    // Use a single promise array for both groups and payments
    const promises = [
      ...studentData.group.map((group) =>
        getGroup(group.group_id, group.createdAt)
      ),
      ...studentData.payment.map((payment) =>
        getPaymentGroup(payment.group_id, payment)
      ),
    ];

    // Await all promises concurrently
    await Promise.all(promises);
    store.loading = true;
  } catch (error) {
    console.error("Talaba ma'lumotlarini olishda xato:", error);
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

const getPaymentGroup = async (id, payment) => {
  try {
    const groupData = await fetchData(
      `/group/${localStorage.getItem("school_id")}/${id}/group`
    );
    payment.group_name = groupData.name;
    payment.group_price = groupData.price;
    store.payment.push(payment);
  } catch (error) {
    console.error("To'lov guruhi ma'lumotlarini olishda xato:", error);
  }
};

onMounted(() => {
  getStudent();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
