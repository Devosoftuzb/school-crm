<template>
  <section :class="{ 'text-white': navbar.userNav }">
    <!-- Cards Section -->
    <div v-show="store.loader">
      <Placeholder1 />
    </div>
    <div v-show="!store.loader" class="pt-4 rounded-xl">
      <!-- Cards -->
      <div
        v-show="store.guard"
        class="grid grid-cols-1 gap-4 px-2 mb-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:gap-6"
      >
        <div
          class="overflow-hidden transition-transform transform shadow-md card rounded-xl hover:scale-105"
          v-for="(i, index) in 4"
          :key="index"
        >
          <div
            class="relative flex flex-col min-w-0 p-5 break-words transition-colors duration-300 h-36 xl:h-40 rounded-xl bg-clip-border"
            :class="{
              'bg-slate-900 text-white': navbar.userNav,
              'bg-white text-slate-900': !navbar.userNav,
            }"
          >
            <!-- Icon va Title -->
            <div class="flex items-center gap-3 mb-4">
              <div
                class="flex items-center justify-center w-12 h-12 rounded-xl"
                :class="getIconBg(index)"
              >
                <component :is="cardIcons[index]" class="w-6 h-6" />
              </div>
              <p class="font-semibold text-md 2xl:text-lg">
                {{ getCardTitle(index) }}
              </p>
            </div>

            <div class="flex justify-end mt-auto">
              <h5
                class="flex items-center justify-center gap-1 px-3 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-xl 2xl:px-5 2xl:py-2 max-w-fit"
              >
                {{ getCardValue(index)?.toLocaleString("uz-UZ") }}
                <span v-if="index === 3">so'm</span>
                <span v-else>ta</span>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="!store.guard"
        class="grid grid-cols-1 gap-4 px-2 mb-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-6"
      >
        <div
          class="overflow-hidden transition-transform transform shadow-md card rounded-xl hover:scale-105"
          v-for="(i, index) in 3"
          :key="index"
        >
          <div
            class="relative flex flex-col min-w-0 p-5 break-words transition-colors duration-300 h-36 xl:h-40 rounded-xl bg-clip-border"
            :class="{
              'bg-slate-900 text-white': navbar.userNav,
              'bg-white text-slate-900': !navbar.userNav,
            }"
          >
            <!-- Icon va Title -->
            <div class="flex items-center gap-3 mb-4">
              <div
                class="flex items-center justify-center w-12 h-12 rounded-xl"
                :class="getIconBg(index)"
              >
                <component :is="cardIcons[index]" class="w-6 h-6" />
              </div>
              <p class="font-semibold text-md 2xl:text-lg">
                {{ getCardTitle(index) }}
              </p>
            </div>

            <div class="flex justify-end mt-auto">
              <h5
                class="flex items-center justify-center gap-1 px-3 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-xl 2xl:px-5 2xl:py-2 max-w-fit"
              >
                {{ getCardValue(index)?.toLocaleString("uz-UZ") || 0 }}
                <span v-if="index === 2">so'm</span>
                <span v-else>ta</span>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <!-- To'lov Statistikasi -->
      <div
        v-show="store.guard || userRole == '_tch_sch_'"
        class="grid w-full gap-3 px-2 lg:grid-cols-2 2xl:gap-5"
      >
        <div
          class="p-6 mt-8 shadow-md rounded-xl chart-container"
          :class="{
            'bg-slate-900 text-white': navbar.userNav,
            'bg-white text-slate-900': !navbar.userNav,
          }"
        >
          <div class="flex items-center justify-between w-full">
            <h2 class="font-semibold 2xl:text-xl text-md">
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
                  class="border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                  :class="{
                    'bg-slate-900 text-white': navbar.userNav,
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
          class="p-6 mt-8 shadow-md rounded-xl chart-container2"
          :class="{
            'bg-slate-900 text-white': navbar.userNav,
            'bg-white text-slate-900': !navbar.userNav,
          }"
        >
          <div class="flex items-center justify-between w-full">
            <h2 class="font-semibold 2xl:text-xl text-md">
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
                  class="border text-black border-gray-300 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5"
                  :class="{
                    'bg-slate-900 text-white': navbar.userNav,
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
import Chart from "chart.js/auto";
import {
  UserIcon,
  UsersIcon,
  BookOpenIcon,
  WalletIcon,
} from "@heroicons/vue/24/solid";

const userRole = localStorage.getItem("role");
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
  loader: true,
});

const cardIcons = store.guard
  ? [UserIcon, UsersIcon, BookOpenIcon, WalletIcon]
  : [UserIcon, BookOpenIcon, WalletIcon];

const getIconBg = (index) => {
  const colors = store.guard
    ? [
        "bg-blue-500/30 text-blue-500",
        "bg-emerald-500/30 text-emerald-500",
        "bg-red-500/30 text-red-500",
        "bg-amber-500/30 text-amber-500",
      ]
    : [
        "bg-blue-500/30 text-blue-500",
        "bg-red-500/30 text-red-500",
        "bg-amber-500/30 text-amber-500",
      ];
  return colors[index] || "bg-gray-500";
};

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
  try {
    const url = store.guard
      ? `/v1/statistic/school/${localStorage.getItem("school_id")}`
      : `/v1/statistic/teacher-stats/${localStorage.getItem(
          "school_id"
        )}/${localStorage.getItem("id")}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    info.students = res.data.student_number;
    info.staff = res.data.employee_number;
    info.groups = res.data.group_number;
    info.payment = res.data.payment_sum;
    store.loader = false;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

const getCurrentYearPayments = async () => {
  try {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const url = store.guard
      ? `/v1/statistic/school-payments/${schoolId}/${store.year}`
      : `/v1/statistic/teacher-salary/${schoolId}/${userId}/${store.year}`;

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    info.PaymentStats = res.data.PaymentStats;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

const getStudentPayments = async () => {
  try {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const url = store.guard
      ? `/v1/statistic/school-studentPayments/${schoolId}/${store.month}`
      : `/v1/statistic/teacher-studentPayments/${schoolId}/${userId}/${store.month}`;

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    info.StudentPayments = res.data.studentPayments;
  } catch (err) {
    console.error("Statistikani olishda xato:", err);
  }
};

const getCardTitle = (index) => {
  if (store.guard) {
    const titles = ["O'quvchilar", "Xodimlar", "Guruhlar", "To'lovlar"];
    return titles[index];
  } else {
    const titles = ["O'quvchilar", "Guruhlar", "To'lovlar"];
    return titles[index];
  }
};

const getCardValue = (index) => {
  if (store.guard) {
    const values = [info.students, info.staff, info.groups, info.payment];
    return values[index];
  } else {
    const values = [info.students, info.groups, info.payment];
    return values[index];
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

// onBeforeMount(() => {
//   setTimeout(() => {
//     store.PageProduct = true;
//   }, 500);
// });

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

.cards {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}
</style>
