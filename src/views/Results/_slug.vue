<template>
  <div class="px-2 py-8">
    <!-- Placeholder -->
    <div v-show="!store.product && !store.questions">
      <Placeholder2 />
    </div>

    <div
      :class="
        form.modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative w-full h-auto max-w-3xl p-4">
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
              Mijozni o'quvchi qilish
            </h3>
            <button
              @click="form.modal = false"
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
            @submit.prevent="createStudent"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="grid gap-4 mb-4 font-medium sm:grid-cols-2">
              <div>
                <label
                  for="parents_fullname"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Ota-ona ism familiyasi</label
                >
                <input
                  v-model="form.parents_full_name"
                  type="text"
                  name="parents_fullname"
                  id="parents_fullname"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona ism familiyasi kiriting"
                  required
                />
              </div>
              <div>
                <label
                  for="parents_phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Ota-ona raqami</label
                >
                <input
                  v-model="form.parents_phone_number"
                  type="text"
                  name="parents_phone"
                  id="parents_phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Ota-ona raqamini kiriting"
                  required
                />
              </div>
              <div class="">
                <label
                  for="name"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >F . I . O</label
                >
                <input
                  v-model="form.full_name"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="F . I . O"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Telefon raqami</label
                >
                <input
                  v-model="form.phone_number"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div class="w-[205%]">
                <label
                  for="date"
                  class="block mb-2 text-sm"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >Qo'shilgan sanasi</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <div class="mt-10">
              <p
                class="flex flex-wrap items-center gap-1 text-sm font-semibold"
                :class="navbar.userNav ? 'text-slate-300' : 'text-slate-700'"
              >
                Tanlangan guruh:
                <span
                  class="px-3 py-1 ml-2 text-sm rounded-lg"
                  :class="
                    navbar.userNav
                      ? 'bg-slate-800 text-blue-400'
                      : 'bg-blue-100 text-blue-700'
                  "
                >
                  {{ form.group_name || "Tanlanmagan" }}
                </span>
              </p>
            </div>
            <div
              class="flex items-center justify-between w-full pt-5 mt-5 border-t"
            >
              <button
                @click="form.modal = false"
                type="button"
                class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btn text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      v-show="store.product && store.questions"
      class="p-4 mb-32 md:p-8 rounded-xl"
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
                    ['Tanlagan fani', store.product.test?.subject?.name],
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
                      [
                        'To‘g‘ri javoblar',
                        store.product.correct + ' ta',
                        'blue',
                      ],
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
                      :class="
                        navbar.userNav ? 'text-gray-300' : 'text-gray-600'
                      "
                    >
                      {{ item[0] }}
                    </div>

                    <div class="flex items-center gap-2 mt-1">
                      <span
                        class="font-semibold"
                        :class="
                          navbar.userNav ? 'text-white' : 'text-[#1e293b]'
                        "
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
                <button
                  @click="getOneProduct(group.id, group.name)"
                  class="btn text-white w-full mt-6 py-2.5 rounded-lg font-semibold transition"
                >
                  Guruhga qo'shish
                </button>
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
                    <!-- File -->
                    <div v-if="i.question.file" class="mb-3">
                      <div v-if="isImage(i.question.file)">
                        <img
                          :src="getFileUrl(i.question.file)"
                          alt="Image"
                          loading="lazy"
                          class="w-full max-w-[320px] h-auto object-cover"
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
                    </div>

                    <!-- Text -->
                    <div
                      v-if="i.question.text"
                      class="flex flex-col px-5 mb-10 text-justify"
                    >
                      <h3 class="mb-2 font-bold">
                        {{ i.question.text.title }}
                      </h3>
                      <p class="whitespace-pre-line">
                        {{ i.question.text.text }}
                      </p>
                    </div>

                    <!-- Question -->
                    <h3 class="flex px-5 text-justify">
                      {{ i.question.question }}
                    </h3>
                  </div>

                  <!-- Test Options -->
                  <div
                    v-if="i.question.type === 'test'"
                    class="grid gap-5 sm:grid-cols-2"
                  >
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
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import axios from "@/services/axios";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const resultId = computed(() => router.currentRoute.value.params.id);
const schoolId = computed(() => localStorage.getItem("school_id"));
const token = computed(() => localStorage.getItem("token"));
const authHeaders = computed(() => ({
  Authorization: `Bearer ${token.value}`,
}));
const apiUrl = computed(() => import.meta.env.VITE_API);

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

const form = reactive({
  full_name: "",
  phone_number: "",
  group_id: "",
  group_name: "",
  parents_full_name: "Hurmatli ota-ona",
  parents_phone_number: "+998",
  id: "",
  modal: false,
  is_student: false,
  start_date: "",
});

const handleError = (
  message = "Xatolik! Nimadir noto'g'ri. Internetni tekshirib qaytadan urinib ko'ring!",
) => {
  notification.warning(message);
};

const getFileUrl = (file) => `${apiUrl.value}/${file}`;
const isImage = (filename) => /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogg|mov)$/i.test(filename);

function accordion(id) {
  store.accordion.forEach((i) => {
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
    (ans) => ans.is_correct === true,
  ).length;

  const incorrectAnswers = record.customer_answer.filter(
    (ans) => ans.is_correct === false,
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

const getOneProduct = (group_id, group_name) => {
  Object.assign(form, {
    group_id: group_id,
    group_name: group_name,
    modal: true,
  });
};

// API Functions
const getSubject = async () => {
  try {
    const res = await axios.get(`/v1/subject/add/${schoolId.value}`, {
      headers: authHeaders.value,
    });
    store.subjects = res.data;
  } catch (error) {
    handleError();
  }
};

const getOneResult = async () => {
  try {
    const response = await axios.get(`/v1/customer-test/${resultId.value}`, {
      headers: authHeaders.value,
    });

    const data = response.data;

    Object.assign(form, {
      id: data.customer?.id,
      full_name: data.customer?.full_name,
      phone_number: data.customer?.phone_number,
    });

    store.questions = data.customer_answer;
    store.product = enrichRecord(data);

    getGroupLevel(data.overall_result);
    store.error = null;
  } catch (error) {
    store.product = {};
    store.error = error.response?.data?.message || "Xatolik yuz berdi!";
  }
};

const getGroupLevel = async (overall) => {
  try {
    const res = await axios.get(
      `/v1/group/level/${schoolId.value}/${overall}`,
      { headers: authHeaders.value },
    );
    store.groupLevel = res.data;
  } catch (error) {
    handleError();
  }
};

const createStudent = async () => {
  try {
    const data = {
      school_id: Number(schoolId.value),
      parents_full_name: form.parents_full_name,
      parents_phone_number: form.parents_phone_number,
      full_name: form.full_name,
      phone_number: form.phone_number,
      start_date: form.start_date,
      group_id: form.group_id,
      status: true,
    };

    const res = await axios.post("/v1/student", data, {
      headers: authHeaders.value,
    });

    notification.success("Mijoz guruhga qo'shildi");
    form.is_student = true;

    await updateStatus();
    await sendSms(res.data.student.id);

    Object.assign(form, {
      parents_full_name: "Hurmatli ota-ona",
      parents_phone_number: "+998",
      modal: false,
    });
  } catch (error) {
    handleError();
  }
};

const updateStatus = async () => {
  try {
    const data = {
      is_student: form.is_student,
    };

    await axios.put(`/v1/customer/status/${schoolId.value}/${form.id}`, data, {
      headers: authHeaders.value,
    });
  } catch (error) {
    handleError();
  }
};

const sendSms = async (id) => {
  try {
    const data = {
      student_id: id,
    };

    await axios.post("/v1/sms/group", data, { headers: authHeaders.value });
  } catch (error) {
    handleError();
  }
};

onMounted(() => {
  getSubject();
  getOneResult();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
