<template>
  <section :class="{ 'text-white': navbar.userNav }">
    <!-- Cards Section -->
    <div v-show="!store.PageProduct">
      <Placeholder1 />
    </div>
    <div v-show="store.PageProduct" class="rounded-lg pt-4">
      <!-- Cards -->
      <div
        class="cards grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:mb-0 mb-5 2xl:gap-5 gap-3 px-2"
      >
        <div class="card" v-for="(i, index) in 4" :key="index">
          <div
            class="relative xl:mb-4 flex flex-col min-w-0 break-words shadow-soft-xl sm:h-28 rounded-xl bg-clip-border"
            :class="{
              'bg-[#1e293b]': navbar.userNav,
              'bg-white': !navbar.userNav,
            }"
          >
            <!-- <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p
                      class="mb-0 font-semibold leading-normal 2xl:text-xl text-md"
                    >
                      {{ getCardTitle(index) }}
                    </p>
                    <h5
                      class="mb-0 2xl:text-md text-sm bg-blue-100 text-blue-700 rounded-lg 2xl:px-5 px-2 max-w-fit font-bold"
                    >
                      {{ getCardValue(index) }}
                      <span v-if="index == 3">so'm</span
                      ><span v-if="index != 3">ta</span>
                    </h5>
                  </div>
                </div>
                <div class="basis-1/3">
                  <div
                    class="w-14 h-12 float-right pr-2 flex justify-center items-center rounded-lg bg-gray-1000"
                  >
                    <img
                      v-for="img in getCardImages(index)"
                      :key="img"
                      class="bg-gray-200 h-14 object-cover rounded-lg"
                      :src="img"
                      :alt="'Card image ' + index"
                    />
                  </div>
                </div>
              </div>
            </div> -->

            <div class="p-5 flex items-center justify-between">
              <p class="mb-0 font-semibold leading-normal 2xl:text-xl text-md">
                {{ getCardTitle(index) }}
              </p>
              <h5
                class="mb-0 2xl:text-[16px] sm:absolute bottom-5 right-5 bg-blue-100 text-blue-700 text-sm rounded-lg 2xl:px-5 py-2 px-3 max-w-fit font-bold"
              >
                {{ getCardValue(index) }}
                <span v-if="index == 3">so'm</span
                ><span v-if="index != 3">ta</span>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <!-- To'lov Statistikasi -->
      <div
        v-show="store.guard"
        class="w-full grid lg:grid-cols-2 2xl:gap-5 gap-3 px-2"
      >
        <div
          class="chart-container mt-8 shadow-md rounded-lg p-6"
          :class="{
            'bg-[#1e293b] text-white': navbar.userNav,
            'bg-white text-gray-700': !navbar.userNav,
          }"
        >
          <div class="w-full flex items-center justify-between">
            <h2 class="2xl:text-xl text-md font-semibold">
              To'lov Statistikasi ({{ store.year }})
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
          class="chart-container2 mt-8 shadow-md rounded-lg p-6"
          :class="{
            'bg-[#1e293b] text-white': navbar.userNav,
            'bg-white text-gray-700': !navbar.userNav,
          }"
        >
          <div class="w-full flex items-center justify-between">
            <h2 class="2xl:text-xl text-md font-semibold">
              O'quvchilar Statistikasi ({{ monthNames(store.month) }})
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
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, watch, computed } from "vue";
import { useNavStore } from "../../stores/toggle";
import axios from "../../services/axios";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

const userRole = localStorage.getItem("role");
const router = useRouter();
const navbar = useNavStore();
const hozirgiSana = new Date();
const orqaYil = hozirgiSana.getFullYear() - 2;
const store = reactive({
  PageProduct: "",
  data: false,
  cards: ["Xodimlar", "O'quvchilar", "Guruhlar", "To'lovlar"],
  curentYil: [],
  year: hozirgiSana.getFullYear(),
  month: (hozirgiSana.getMonth() + 1).toString().padStart(2, "0"),
  guard: userRole == "_ow_sch_" || userRole == "_ad_sch_",
});

const info = reactive({
  staff: 0,
  students: 0,
  groups: 0,
  payment: 0,
  PaymentStats: [],
  StudentPayments: [],
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

const getStatistics = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/statistic/school/${localStorage.getItem("school_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      info.students = res.data.student_number;
      info.staff = res.data.employee_number;
      info.groups = res.data.group_number;
      info.payment = res.data.payment_sum;
    } catch (err) {
      console.error("Statistikani olishda xato:", err);
    }
  }
};

const getCurrentYearPayments = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/statistic/school-payments/${localStorage.getItem("school_id")}/${
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
  }
};

const getStudentPayments = async () => {
  if (store.guard) {
    try {
      const res = await axios.get(
        `/statistic/school-studentPayments/${localStorage.getItem(
          "school_id"
        )}/${store.month}`,
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
  }
};

const getCardTitle = (index) => {
  const titles = ["O'quvchilar", "Xodimlar", "Guruhlar", "To'lovlar"];
  return titles[index];
};

const getCardValue = (index) => {
  const values = [info.students, info.staff, info.groups, info.payment];
  return values[index];
};

const getCardImages = (index) => {
  const images = [
    "./talaba-icon.svg",
    "./staff-icon.png",
    "./group-icon.svg",
    "./tushum-icon.svg",
  ];
  return [images[index]];
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
          label: "To'lovlar (so'm)",
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

onBeforeMount(() => {
  setTimeout(() => {
    store.PageProduct = true;
  }, 500);
});

onMounted(() => {
  setTimeout(createPaymentChart, 300);
  setTimeout(createStudentPaymentChart, 300);
  getStatistics();
  getCurrentYearPayments();
  getStudentPayments();
  createPaymentChart();
  createStudentPaymentChart();
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
  height: 450px;
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
    height: 250px; /* Mobil ekranlar uchun */
  }
}
</style>
