<template>
  <div class="px-2 py-8">
    <!-- Placeholder -->
    <div v-show="!store.product && !store.questions">
      <Placeholder2 />
    </div>

    <div
      v-show="store.product && store.questions"

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

            class="p-4 mt-5 border shadow-lg rounded-2xl sm:p-6"
            :class="
              navbar.userNav
                ? 'bg-slate-900 border-white/10'
                : 'bg-white border-blue-100'
            "

            id="about"
            role="tabpanel"
          >

            <div class="grid gap-6 lg:grid-cols-2">
              <!-- LEFT -->
              <div class="space-y-4">
                <div
                  v-for="item in [
                    ['Ism-familya', store.product.customer?.full_name],
                    ['Telefon raqam', store.product.customer?.phone_number],
                    ['Tanlagan fani', store.product.subject_name],
                    ['Tanlagan o‘qituvchisi', store.product.teacher],
                    ['Maqul bo‘lgan dars vaqti', store.product.time],
                  ]"
                  class="pb-3 border-b border-blue-500/30"

                >
                  <div
                    class="text-sm"
                    :class="navbar.userNav ? 'text-gray-300' : 'text-gray-600'"
                  >
                    {{ item[0] }}
                  </div>


                  <div
                    class="mt-1 font-semibold"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"

                  >
                    {{ item[1] || "—" }}
                  </div>
                </div>

                <!-- LEVEL RESULT -->
                <div class="pt-2">
                  <div
                    class="mb-2 text-sm font-semibold"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    Darajasi
                  </div>

                  <div
                    class="p-3 border border-blue-200 rounded-xl bg-blue-50"
                    :class="
                      navbar.userNav ? 'bg-blue-500/10 border-blue-500/30' : ''
                    "
                  >
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm text-blue-600 dark:text-blue-300"
                        >Umumiy natija</span
                      >
                      <span
                        class="px-4 py-1 text-sm font-bold text-blue-800 bg-blue-100 rounded-lg"
                      >
                        {{ store.product.overall_result }}
                      </span>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <div
                        class="p-2 border border-green-200 rounded-lg bg-green-50"
                      >
                        <div class="mb-1 text-xs text-green-700">Test</div>
                        <span
                          class="px-3 py-0.5 text-sm font-semibold bg-green-100 text-green-800 rounded-md"
                        >
                          {{ store.product.test_result }}
                        </span>
                      </div>

                      <div
                        class="p-2 border border-purple-200 rounded-lg bg-purple-50"
                      >
                        <div class="mb-1 text-xs text-purple-700">Writing</div>
                        <span
                          class="px-3 py-0.5 text-sm font-semibold bg-purple-100 text-purple-800 rounded-md"
                        >
                          {{ store.product.writing_result || "Nomalum" }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
                    >{{ chekDateFormat(store.product.started_at) }}</span
                  >
                </h2>


              <!-- RIGHT -->
              <div class="space-y-4">
                <div
                  v-for="item in [
                    [
                      'Testni boshlagan vaqti',
                      chekDateFormat(store.product.started_at),
                      'blue',
                    ],
                    [
                      'Testni tugatgan vaqti',
                      chekDateFormat(store.product.finished_at),
                      'red',
                    ],
                    ['Test vaqti', store.product.test?.time + ' daqiqa'],
                    ['Savollar soni', store.product.test?.count + ' ta'],
                    ['To‘g‘ri javoblar', store.product.correct + ' ta', 'blue'],
                    [
                      'Noto‘g‘ri javoblar',
                      store.product.incorrect + ' ta',
                      'red',
                    ],
                  ]"
                  class="pb-3 border-b border-blue-500/30"
                >

                  <div
                    class="text-sm"
                    :class="navbar.userNav ? 'text-gray-300' : 'text-gray-600'"

                  >
                    {{ item[0] }}
                  </div>


                  <div class="flex items-center gap-2 mt-1">
                    <span
                      class="font-semibold"
                      :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                    >
                      {{ item[1] || "—" }}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <h1 class="w-full py-5 text-lg font-bold text-blue-700">
            Tavsiya etiladigan guruhlar
          </h1>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(group, index) in store.groupLevel"
              :key="group.id || index"
              class="p-6 transition-all duration-300 border shadow-lg rounded-2xl hover:-translate-y-1 hover:shadow-xl"
              :class="
                navbar.userNav
                  ? 'bg-slate-900 border-white/10 text-white'
                  : 'bg-white border-blue-100 text-gray-800'
              "
            >
              <!-- Title -->
              <h2 class="mb-2 text-lg font-bold">
                {{ group.name || "Noma'lum guruh" }}
              </h2>

              <!-- Level -->
              <span
                class="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full"
                :class="
                  navbar.userNav
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                "
              >
                {{ group.level || "Noma'lum" }}
              </span>

              <!-- Info -->
              <div class="space-y-3 text-sm">
                <div
                  class="flex justify-between"
                  :class="navbar.userNav ? 'text-gray-300' : 'text-gray-500'"
                >
                  <span>O'qituvchi</span>
                  <span class="font-medium">
                    {{ group.teacher || "Noma'lum" }}
                  </span>
                </div>

                <div
                  class="flex justify-between"
                  :class="navbar.userNav ? 'text-gray-300' : 'text-gray-500'"
                >
                  <span>O'quvchilar soni</span>
                  <span class="font-medium">
                    {{ group.student_count || 0 }} ta
                  </span>
                </div>
              </div>

              <!-- Button -->
              <!-- <button
                class="btn text-white w-full mt-6 py-2.5 rounded-lg font-semibold transition"
              >
                Guruhga qo'shish
              </button> -->
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
                        {{ i.question }}
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
                  <!-- File -->
                  <div v-if="i.file" class="mb-3">
                    <div v-if="isImage(i.file)">
                      <img
                        :src="getFileUrl(i.file)"
                        alt="Image"
                        loading="lazy"
                        class="w-full max-w-[320px] h-auto object-cover"
                      />
                    </div>
                    <div v-else-if="isAudio(i.file)">
                      <audio :src="getFileUrl(i.file)" controls />
                    </div>
                    <div v-else-if="isVideo(i.file)">
                      <video
                        :src="getFileUrl(i.file)"
                        controls
                        width="320"
                        height="240"
                      />
                    </div>
                  </div>

                  <!-- Text -->
                  <div
                    v-if="i.text"
                    class="flex flex-col px-5 mb-10 text-justify"
                  >
                    <h3 class="mb-2 font-bold">{{ i.text.title }}</h3>
                    <p class="whitespace-pre-line">{{ i.text.text }}</p>
                  </div>


                  <!-- Question -->
                  <h3 class="flex px-5 text-justify">{{ i.question }}</h3>
                </div>

                <!-- Test Options -->
                <div v-if="i.type === 'test'" class="grid gap-5 sm:grid-cols-2">

                  <div
                    v-for="(ans, ansIndex) in i.option"
                    :key="ansIndex"
                    class="w-full text-justify text-black p-2.5 sm:pl-10 pl-5 text-sm rounded-xl"
                    :class="
                      ans.is_correct === true
                        ? 'bg-blue-300 text-blue-600'
                        : ans.is_correct === false
                        ? 'bg-red-300 text-red-600'
                        : 'bg-gray-200 text-gray-600'
                    "
                  >
                    <strong>{{ String.fromCharCode(65 + ansIndex) }}: </strong>
                    <span>{{ ans.option || "Noma'lum" }}</span>
                  </div>
                </div>

                <!-- Writing Answer -->
                <div
                  v-if="i.type === 'writing'"
                  class="p-2 border border-purple-200 rounded-lg bg-purple-50"
                >
                  <p
                    class="px-3 py-1 text-sm font-semibold text-purple-800 whitespace-pre-line rounded-lg sm:text-base"
                  >
                    {{ i.writing || "Noma'lum" }}
                  </p>
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
  groupLevel: [],
  error: null,
  questions: "",
  plus: "",
  accordion: [],
  overall: "",
});

const getFileUrl = (file) => import.meta.env.VITE_API + "/" + file;

const isImage = (filename) => /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogg|mov)$/i.test(filename);

function accordion(id) {
  for (let i of store.accordion) {
    if (i != id) {
      const el = document.querySelector(`#answers${i}`);
      if (el) el.classList.add("hidden");
    }
  }

  const show = document.querySelector(`#answers${id}`);
  if (show) show.classList.toggle("hidden");

  if (!store.accordion.includes(id)) {
    store.accordion.push(id);
  }

  store.plus = store.plus === id ? "" : id;
}

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
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const record = response.data;
    const customerAnswers = record.customer_answer || [];
    const questionsMap = new Map();

    for (const answer of customerAnswers) {
      const q = answer.question;
      if (!q) continue;

      if (!questionsMap.has(q.id)) {
        questionsMap.set(q.id, {
          id: q.id,
          question: q.question,
          file: q.file,
          option: [],
          text: q.text,
          writing: null,
          type: q.type,
        });
      }

      const qItem = questionsMap.get(q.id);

      if (q.type === "test") {
        qItem.option.push({
          id: answer.option?.id || null,
          option: answer.option?.option || "Noma'lum",
          is_correct: answer.is_correct,
        });
      } else if (q.type === "writing") {
        qItem.writing = answer.writing || "Noma'lum";
      }
    }

    store.questions = Array.from(questionsMap.values());

    // Correct / Incorrect
    const correctAnswers = customerAnswers.filter(
      (ans) => ans.is_correct === true
    ).length;
    const incorrectAnswers = customerAnswers.filter(
      (ans) => ans.is_correct === false
    ).length;

    const subjectId = record.customer.subject_id;
    const subject = store.subjects.find((s) => s.id === subjectId);

    // Teacher va time
    const [time, ...teacherParts] =
      record.customer.description?.split(" ") || [];
    const teacher = teacherParts.join(" ");

    store.product = {
      ...record,
      subject_name: subject?.name || "Noma'lum",
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      time: time || "Noma'lum",
      teacher: teacher || "Noma'lum",
    };
    getGroupLevel(store.product.overall_result);
    store.error = null;
  } catch (error) {
    store.product = null;
    store.error = error.response?.data?.message || "Xatolik yuz berdi!";
  }
};

const getGroupLevel = (overall) => {
  axios
    .get(`/group/level/${localStorage.getItem("school_id")}/${overall}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.groupLevel = res.data;
      console.log(res);
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
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
