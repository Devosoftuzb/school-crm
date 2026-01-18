<template>
  <div class="px-2 py-8">
    <!-- Placeholder -->
    <div v-show="!store.resultData && !store.questions">
      <Placeholder2 />
    </div>

    <div
      v-show="store.resultData && store.questions"
      class="p-8 mb-32 rounded-xl"
      :class="navbar.userNav ? 'bg-slate-900 text-white' : 'bg-white'"
    >
      <div
        class="flex flex-col items-center justify-between w-full gap-3 mb-8 font-bold sm:flex-row sm:mb-0"
      >
        <h1 class="w-full text-lg text-blue-700 text-start">
          Mijozning test natijalari
        </h1>
        <button
          @click="router.back(-1)"
          class="btn shadow-lg w-full sm:w-auto rounded-xl whitespace-nowrap px-5 py-2.5 text-white focus:ring-2 text-sm"
        >
          Orqaga qaytish
        </button>
      </div>

      <div class="w-full bg-transparent rounded-xl">
        <div
          id="defaultTabContent"
          :class="navbar.userNav ? 'bg-slate-900' : 'bg-white'"
        >
          <div
            class="rounded-xl lg:p-8"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <div class="grid w-full gap-3 lg:grid-cols-2 sm:gap-0">
              <div
                class="w-full lg:border-l border-[#4141eb] sm:p-5 flex flex-col gap-3"
              >
                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Ism-familya :</span>
                  <span class="w-full py-0.5">{{
                    store.resultData.customer?.full_name
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Telefon raqam :</span>
                  <span class="w-full py-0.5">{{
                    store.resultData.customer?.phone_number
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between pb-3 border-b border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Tanlagan fani :</span>
                  <span class="w-full py-0.5">{{
                    store.resultData.test?.subject?.name
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Tanlagan o'qituvchisi :</span>
                  <span class="w-full py-0.5">{{
                    store.resultData.teacher
                  }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold"
                    >Maqul bo'lgan dars vaqti :</span
                  >
                  <span class="w-full py-0.5">{{ store.resultData.time }}</span>
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-center border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Darajasi :</span>
                  <span
                    class="w-auto rounded-xl bg-blue-100 py-0.5 px-4 text-blue-800"
                    >{{ store.resultData.result }}</span
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
                    class="w-auto rounded-xl py-0.5 px-4 bg-blue-100 text-blue-800"
                    >{{ chekDateFormat(store.resultData.started_at) }}</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Testni tugatgan vaqti :</span>
                  <span
                    class="w-auto rounded-xl py-0.5 px-4 bg-red-100 text-red-800"
                    >{{ chekDateFormat(store.resultData.finished_at) }}</span
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
                    >{{ store.resultData.test?.time }} daqiqa</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-center justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Savolar soni :</span>
                  <span class="w-full py-0.5"
                    >{{ store.resultData.test?.count }} ta</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Togri javoblar :</span>
                  <span
                    class="w-auto rounded-xl py-0.5 px-4 bg-blue-100 text-blue-800"
                    >{{ store.resultData.correct }} ta</span
                  >
                </h2>

                <h2
                  class="w-full flex flex-col items-start justify-between border-b pb-3 border-[#4141eb] sm:text-lg text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                >
                  <span class="w-full font-bold">Notogri javoblar :</span>
                  <span
                    class="w-auto rounded-xl py-0.5 px-4 bg-red-100 text-red-800"
                    >{{ store.resultData.incorrect }} ta</span
                  >
                </h2>
              </div>
            </div>
          </div>

          <h1 class="w-full py-5 text-lg font-bold text-blue-700 text-start">
            Mijozning bajargan testlari
          </h1>
          <div
            class="overflow-x-auto"
            v-for="(i, index) in store.questions"
            :key="i.id"
          >
            <div>
              <div
                class="flex items-center justify-between w-full gap-2 sm:gap-5"
              >
                <div
                  @click="accordion(i.id)"
                  class="w-full mb-5"
                  id="accordion-collapse-heading-1"
                >
                  <button
                    type="button"
                    class="flex items-center justify-between w-full text-left rounded-xl bg-[rgba(213,219,242,0.5)] sm:py-[18px] sm:px-[20px] py-[14px] px-[14px]"
                  >
                    <div class="flex items-center gap-3 sm:gap-5">
                      <p
                        class="btn sm:min-w-[50px] sm:min-h-[50px] min-w-[30px] min-h-[30px] sm:h-[35px] 2xl:w-[55px] 2xl:h-[50px] flex items-center font-bold justify-center text-[14px] sm:text-[16px] 2xl:text-[20px] text-white rounded-full"
                      >
                        {{ index + 1 }}
                      </p>
                      <h2 class="w-full text-[14px] sm:text-[16px]">
                        {{ i.question.question }}
                      </h2>
                    </div>
                    <div>
                      <i
                        :class="
                          store.plus == i.id
                            ? 'bx bx-minus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                            : 'bx bx-plus bg-white sm:p-2 p-1 text-[#4141eb] sm:text-[30px] text-[20px] rounded-full'
                        "
                      ></i>
                    </div>
                  </button>
                </div>
              </div>
              <!-- acardion main -->
              <div :id="'answers' + i.id" class="hidden mb-5">
                <div class="mb-5">
                  <div v-if="i.question.file !== 'null' || i.question.file !== ''" class="mb-3">
                    <div v-if="isImage(i.question.file)">
                      <img
                        :src="getFileUrl(i.question.file)"
                        alt="Image"
                        loading="lazy"
                        class="w-full max-w-[320px] h-auto object-cove"
                      />
                    </div>
                    <div v-else-if="isAudio(i.question.file)">
                      <audio :src="getFileUrl(i.question.file)" controls />
                    </div>
                    <div v-else-if="isVideo(i.question.file)">
                      <video
                        :src="getFileUrl(i.question.file)"
                        controls
                        width="320"
                        height="240"
                      />
                    </div>
                    <!-- <div v-else>
                      <a :href="getFileUrl(i.file)" target="_blank"
                        >Faylni yuklab olish</a
                      >
                    </div> -->
                  </div>
                  <div
                    v-if="i.question.text"
                    class="flex flex-col px-5 mb-10 text-justify"
                  >
                    <h3 class="mb-2 font-bold">{{ i.question.text.title }}</h3>
                    <p class="whitespace-pre-line">{{ i.question.text.text }}</p>
                  </div>
                  <h3 class="flex px-5 text-justify">{{ i.question.question }}</h3>
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
                  <div
                    class="w-full text-justify text-black p-2.5 sm:pl-10 pl-5 text-sm rounded-xl"
                    :class="
                      i.option.is_correct
                        ? 'bg-blue-300 text-blue-600'
                        : 'bg-red-300 text-red-600'
                    "
                  >
                    <strong>{{ String.fromCharCode(65) }}: </strong>
                    <span>{{ i.option.option }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import axios from "@/services/axios";

const navbar = useNavStore();
const router = useRouter();

const resultId = computed(() => router.currentRoute.value.params.id);
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({ 
  Authorization: `Bearer ${token.value}` 
}));
const apiUrl = computed(() => import.meta.env.VITE_API);

const store = reactive({
  resultData: "",
  error: null,
  questions: "",
  plus: "",
  accordion: [],
});


const getFileUrl = (file) => `${apiUrl.value}/${file}`;
const isImage = (filename) => /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogg|mov)$/i.test(filename);

function accordion(id) {
  store.accordion.forEach(i => {
    if (i !== id) {
      const el = document.querySelector(`#answers${i}`);
      el?.classList.add("hidden");
    }
  });

  const show = document.querySelector(`#answers${id}`);
  show?.classList.toggle("hidden");

  if (!store.accordion.includes(id)) {
    store.accordion.push(id);
  }

  store.plus = store.plus === id ? "" : id;
}

const chekDateFormat = (date) => {
  if (!date) return "Sana mavjud emas";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Noto'g'ri sana";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};

const enrichRecord = (record) => {
  const correctAnswers = record.customer_answer.filter(
    (ans) => ans.is_correct === true
  ).length;
  
  const incorrectAnswers = record.customer_answer.filter(
    (ans) => ans.is_correct === false
  ).length;

  const [time, ...teacherParts] = record.customer.description.split(" ");
  const teacher = teacherParts.join(" ");

  return {
    ...record,
    correct: correctAnswers,
    incorrect: incorrectAnswers,
    time: time || "Noma'lum",
    teacher: teacher || "Noma'lum",
  };
};

const getOneResult = async () => {
  try {
    const response = await axios.get(
      `/v1/customer-test/${resultId.value}`,
      { headers: authHeaders.value }
    );

    store.questions = response.data.customer_answer;
    store.resultData = enrichRecord(response.data);
    store.error = null;
  } catch (error) {
    store.resultData = {};
    store.error = error.response?.data?.message || "Xatolik yuz berdi!";
  }
};

onMounted(() => {
  getOneResult();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
