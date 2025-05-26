<template>
  <div class="py-8 px-2">
    <!-- Placeholder -->
    <div v-if="!store.product">
      <Placeholder2 />
    </div>

    <div
      class="rounded-lg p-8 mb-32"
      :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
    >
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-3 font-bold mb-8 sm:mb-0 w-full"
      >
        <h1 class="text-lg text-start w-full text-blue-700">
          Mijozning test natijalari
        </h1>
        <button
          @click="router.back(-1)"
          class="btn shadow-lg w-full sm:w-auto rounded-lg whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
        >
          Orqaga qaytish
        </button>
      </div>

      <div class="w-full bg-transparent rounded-lg">
        <div
          id="defaultTabContent"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="rounded-lg lg:p-8"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <div class="w-full grid lg:grid-cols-2 gap-3 sm:gap-0">
              <div
                class="w-full lg:border-l border-[#4141eb] sm:p-5 flex flex-col gap-3"
              >
                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Ism-familya :</span>
                  <span class="w-full py-0.5">{{
                    store.product.customer?.full_name
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Telefon raqam :</span>
                  <span class="w-full py-0.5">{{
                    store.product.customer?.phone_number
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Tanlagan fani :</span>
                  <span class="w-full py-0.5">{{
                    store.product.subject_name
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Tanlagan o'qituvchisi :</span>
                  <span class="w-full py-0.5">{{ store.product.teacher }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold"
                    >Maqul bo'lgan dars vaqti :</span
                  >
                  <span class="w-full py-0.5">{{ store.product.time }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-center border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Darajasi :</span>
                  <span
                    class="w-auto rounded-lg bg-blue-100 py-0.5 px-4 text-blue-800"
                    >{{ store.product.result }}</span
                  >
                </h2>
              </div>
              <div
                class="w-full lg:border-l border-[#4141eb] sm:p-5 flex flex-col gap-3"
              >
                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Testni boshlagan vaqti :</span>
                  <span
                    class="w-auto rounded-lg py-0.5 px-4 bg-blue-100 text-blue-800"
                    >{{ chekDateFormat(store.product.started_at) }}</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Testni tugatgan vaqti :</span>
                  <span
                    class="w-auto rounded-lg py-0.5 px-4 bg-red-100 text-red-800"
                    >{{ chekDateFormat(store.product.finished_at) }}</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold"
                    >Test bajarishga berilgan vaqt :</span
                  >
                  <span class="w-full py-0.5"
                    >{{ store.product.test?.time }} daqiqa</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Savolar soni :</span>
                  <span class="w-full py-0.5"
                    >{{ store.product.test?.count }} ta</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Togri javoblar :</span>
                  <span
                    class="w-auto rounded-lg py-0.5 px-4 bg-blue-100 text-blue-800"
                    >{{ store.product.correct }} ta</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Notogri javoblar :</span>
                  <span
                    class="w-auto rounded-lg py-0.5 px-4 bg-red-100 text-red-800"
                    >{{ store.product.incorrect }} ta</span
                  >
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import axios from "@/services/axios";

const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  product: "",
  subjects: [],
  error: null,
});

const chekDateFormat = (date) => {
  if (!date) return "Sana mavjud emas";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Noto‘g‘ri sana";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

const getSubject = () => {
  axios
    .get(`/subject/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.subjects = res.data;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const getProduct = async () => {
  const id = router.currentRoute.value.params.id;
  try {
    const response = await axios.get(`/customer-test/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const record = response.data;

    console.log(record);
    

    const subjectId = record.customer.subject_id;
    const subject = store.subjects.find((s) => s.id === subjectId);

    const correctAnswers = record.customer_answer.filter(
      (ans) => ans.is_correct === true
    ).length;
    const incorrectAnswers = record.customer_answer.filter(
      (ans) => ans.is_correct === false
    ).length;

    const [time, ...teacherParts] = record.customer.description.split(" ");
    const teacher = teacherParts.join(" ");

    const enrichedRecord = {
      ...record,
      subject_name: subject ? subject.name : "Noma'lum",
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      time: time ? time : "Noma'lum",
      teacher: teacher ? teacher : "Noma'lum",
    };

    store.product = enrichedRecord;
    store.error = null;
  } catch (error) {
    store.product = {};
    store.error = error.response?.data?.message || "Xatolik yuz berdi!";
  }
};

onMounted(() => {
  getSubject();
  getProduct();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
