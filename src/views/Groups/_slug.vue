<template>
  <section class="px-2">
    <div class="mt-8" v-show="!store.loading">
      <Placeholder2 />
    </div>
    <div v-show="store.loading" class="mt-8 mb-32 border wrapper border-red">
      <div
        :class="
          navbar.userNav
            ? 'bg-[#1e293b] text-white px-5 py-10 sm:px-10 flex flex-col gap-5 rounded-lg'
            : 'bg-white px-5 py-10 sm:px-10 flex flex-col gap-5 rounded-lg'
        "
        id="accordion-collapse"
        data-accordion="collapse"
      >
        <div
          class="flex flex-col items-start justify-between gap-5 mb-6 sm:flex-row"
        >
          <div class="flex flex-col w-full gap-2 sm:w-auto">
            <h1
              class="sm:text-[24px] text-lg font-bold border-b border-[#4141eb]"
            >
              {{ router.currentRoute.value.params.name.toUpperCase() }}
            </h1>

            <p class="flex items-center gap-3 text-sm">
              <span class="font-bold">Darajasi:</span>
              <span class="px-4 py-1 text-green-800 bg-green-100 rounded-lg">{{ store.level || "No'malum"}}</span>
            </p>
            <p class="flex items-center gap-3 text-sm">
              <span class="font-bold">Boshlangan sana:</span>
              {{ store.start_time?.slice(0, 10) }}
            </p>
            <p class="flex items-center gap-3 text-sm">
              <span class="font-bold">Dars vaqti:</span>
              {{ store.group_start_end_time }}
            </p>
            <p class="flex items-center gap-3 text-sm">
              <span class="font-bold">Kurs narxi:</span>
              {{ Number(store.group_price).toLocaleString("uz-UZ") }} so'm
            </p>
            <p class="flex items-center gap-3 text-sm">
              <span class="font-bold">O'quvchilar soni:</span>
              {{ store.student_number }} ta
            </p>
          </div>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg sm:w-auto w-full whitespace-nowrap rounded-lg px-5 py-2.5 text-white focus:ring-2"
          >
            Orqaga qaytish
          </button>
        </div>
        <h2 id="accordion-collapse-heading-1">
          <button
            @click="toggleStaff"
            type="button"
            class="flex items-center justify-between w-full text-left rounded-lg bg-[rgba(213,219,242,0.5)] sm:py-[24px] py-3 sm:px-[32px] px-5"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <div class="flex items-center gap-2 sm:gap-5">
              <i
                class="btn bx bx-user sm:text-[24px] text-sm sm:py-3 px-3 py-2 text-white rounded-full"
              ></i>
              <h2 class="sm:text-[18px] text-sm">Xodimlar</h2>
            </div>
            <i
              :class="
                store.staff
                  ? 'bx bx-minus bg-white sm:px-2 sm:py-2 px-2.5 py-1 text-[#4141eb] sm:text-[30px] text-lg rounded-full'
                  : 'bx bx-plus bg-white sm:px-2 sm:py-2 px-2.5 py-1 text-[#4141eb] sm:text-[30px] text-lg rounded-full'
              "
            ></i>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          :class="store.staff ? '' : 'hidden'"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div
            class="relative overflow-hidden rounded-lg shadow-md"
            :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase rounded-lg btn">
                  <tr class="text-white">
                    <th scope="col" class="py-3 text-center">I . F . O</th>
                    <th scope="col" class="py-3 text-center">Lavozim</th>
                    <th scope="col" class="py-3 text-center">Telefon raqami</th>
                    <th scope="col" class="py-3 text-center">
                      Qo'shilgan sana
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in store.teachers"
                    :key="i.id"
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="px-8 py-3 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.full_name }}
                    </th>
                    <td
                      class="px-8 py-2 font-medium text-center text-green-800"
                    >
                      <p class="bg-green-100 rounded-[5px] p-1">{{ i.role }}</p>
                    </td>
                    <td class="px-8 py-2 font-medium text-center text-red-800">
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.phone_number }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-2 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.teachers_date }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.teachers.length == 0"
                class="w-full p-20 text-2xl font-medium text-center max-w-screen"
              >
                <h1>Xodimlar ro'yhati bo'sh</h1>
              </div>
            </div>
          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
          <button
            @click="toggleStudent"
            type="button"
            class="flex items-center justify-between w-full text-left rounded-lg bg-[rgba(213,219,242,0.5)] sm:py-[24px] py-3 sm:px-[32px] px-5"
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded="false"
            aria-controls="accordion-collapse-body-2"
          >
            <div class="flex items-center gap-2 sm:gap-5">
              <i
                class="btn bx bxs-graduation sm:text-[24px] text-sm sm:py-3 px-3 py-2 text-white rounded-full"
              ></i>
              <h2 class="sm:text-[18px] text-sm">O'quvchilar</h2>
            </div>
            <i
              :class="
                store.student
                  ? 'bx bx-minus bg-white sm:px-2 sm:py-2 px-2.5 py-1 text-[#4141eb] sm:text-[30px] text-lg rounded-full'
                  : 'bx bx-plus bg-white sm:px-2 sm:py-2 px-2.5 py-1 text-[#4141eb] sm:text-[30px] text-lg rounded-full'
              "
            ></i>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          :class="store.student ? '' : 'hidden'"
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div
            class="relative overflow-hidden rounded-lg shadow-md"
            :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase rounded-lg btn">
                  <tr class="text-white">
                    <th scope="col" class="py-3 text-center">№</th>
                    <th scope="col" class="py-3 text-center">I . F . O</th>
                    <th scope="col" class="py-3 text-center">Telefon raqami</th>
                    <th scope="col" class="py-3 text-center">
                      Qo'shilgan sana
                    </th>
                    <th scope="col" class="py-3 text-center">To'liq</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in store.students"
                    :key="i.id"
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="px-8 py-3 font-medium text-center whitespace-nowrap"
                    >
                      {{ i.students_number }}
                    </th>
                    <td class="px-8 py-2 font-medium text-center text-green-800">
                      <p class="bg-green-100 rounded-[5px] p-1">
                        {{ i.full_name }}
                      </p>
                    </td>
                    <td class="px-8 py-2 font-medium text-center text-red-800">
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.phone_number }}
                      </p>
                    </td>
                    <td
                      class="px-8 py-2 font-medium text-center text-blue-800 whitespace-nowrap"
                    >
                      <p class="bg-blue-100 rounded-[5px] p-1">
                        {{ i.students_date }}
                      </p>
                    </td>
                    <td class="px-8 py-4 font-medium text-center">
                      <button
                        @click="
                          enterSlug(
                            i.id,
                            i.full_name.split(' ').join('_').toLowerCase()
                          )
                        "
                        class="btn bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                      >
                        Kirish
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-show="store.students.length == 0"
                class="w-full p-20 text-2xl font-medium text-center max-w-screen"
              >
                <h1>O'quvchilar ro'yhati bo'sh</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useNavStore } from "../../stores/toggle";
import { useRouter } from "vue-router";
import axios from "../../services/axios";
import { Placeholder2 } from "../../components";

const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  staff: false,
  student: false,
  teachers: [],
  students: [],
  start_time: "",
  group_price: "",
  group_start_end_time: "",
  student_number: "",
  level: "",
  loading: false,
});

function enterSlug(id, name) {
  router.push(`/students/${id}/${name}`);
}

const getGroup = async () => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const id = router.currentRoute.value.params.id;

  try {
    const res = await axios.get(`/group/${schoolId}/${id}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { start_date, price, start_time, end_time, employee, student, level } =
      res.data;

    store.start_time = start_date;
    store.group_price = price;
    store.level = level;
    store.group_start_end_time = `${start_time} dan - ${end_time} gacha`;
    store.student_number = student.length;

    // Fetch employees and students concurrently
    await Promise.all([
      ...employee.map((employee, index) =>
        fetchUserData(
          "/employee",
          employee.employee_id,
          employee.createdAt,
          "teachers",
          index + 1
        )
      ),
      ...student.map((student, index) =>
        fetchUserData(
          "/student",
          student.student_id,
          student.createdAt,
          "students",
          index + 1
        )
      ),
    ]);
    store.students.sort((a, b) => a.students_number - b.students_number);
    store.loading = true;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

const fetchUserData = async (endpoint, id, date, storeCollection, number) => {
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${endpoint}/${schoolId}/${id}/not`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Format date
    res.data[`${storeCollection}_date`] = date.split("T")[0];
    res.data[`${storeCollection}_number`] = number;
    store[storeCollection].push(res.data);
  } catch (error) {
    console.error(`Error fetching ${storeCollection} data:`, error);
  }
};

const toggleStaff = () => {
  store.staff = !store.staff;
  store.student = false;
};

const toggleStudent = () => {
  store.student = !store.student;
  store.staff = false;
};

onMounted(() => {
  getGroup();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
