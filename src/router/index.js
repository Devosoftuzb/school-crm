import { createRouter, createWebHistory } from "vue-router";
import {
  HomeView,
  Dashboard,
  Students,
  Teachers,
  Login,
  Error,
  Technical,
  Tests,
  Settings,
  Groups,
  Results,
  SlugStudent,
  SlugTeachers,
  SlugTests,
  SlugResults,
  SlugGroups,
  Subjects,
  Payment,
  Attendance,
  Customer,
  Sms,
  StudentsArchive,
  Finance,
} from "../views";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      roles: ["_sp_am_", "_ow_sch_", "_ad_sch_", "_tch_sch_"],
      schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
      title: "Home",
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        meta: {
          roles: ["_sp_am_", "_ow_sch_", "_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Asosiy",
        },
      },
      {
        path: "/employees",
        name: "employees",
        component: Teachers,
        meta: {
          roles: ["_ow_sch_", "_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Xodimlar",
        },
      },
      {
        path: "/employee/:school_id/:id",
        name: "slug_teachers",
        component: SlugTeachers,
        meta: {
          roles: ["_ow_sch_", "_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Xodim Sahifasi",
        },
      },
      {
        path: "/students",
        name: "students",
        component: Students,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "O'quvchilar",
        },
      },
      {
        path: "/students/archive",
        name: "studentsArchive",
        component: StudentsArchive,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Arxiv o'quvchilar",
        },
      },
      {
        path: "/students/:id/:name",
        name: "slug_students",
        component: SlugStudent,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "O'quvchi Sahifasi",
        },
      },
      {
        path: "/customer",
        name: "customers",
        component: Customer,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Mijozlar",
        },
      },
      {
        path: "/tests",
        name: "tests",
        component: Tests,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "element", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Testlar",
        },
      },
      {
        path: "/subjects",
        name: "subjects",
        component: Subjects,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Fanlar",
        },
      },
      {
        path: "/payment",
        name: "payment",
        component: Payment,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "To'lovlar",
        },
      },
      {
        path: "/attendance",
        name: "attendance",
        component: Attendance,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Davomat",
        },
      },
      {
        path: "/sms",
        name: "sms",
        component: Sms,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "SMS",
        },
      },
      {
        path: "/finance",
        name: "finance",
        component: Finance,
        meta: {
          roles: ["_ad_sch_", "_ow_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Moliya",
        },
      },
      {
        path: "/results",
        name: "results",
        component: Results,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "element", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Natijalar",
        },
      },
      {
        path: "/results/:id",
        name: "slug_results",
        component: SlugResults,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "element", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Natijalar Sahifasi",
        },
      },
      {
        path: "/groups",
        name: "groups",
        component: Groups,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Guruhlar",
        },
      },
      {
        path: "/groups/:id/:name",
        name: "slug_groups",
        component: SlugGroups,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Guruh Sahifasi",
        },
      },
      {
        path: "/tests/question/:name",
        name: "slug_questions",
        component: SlugTests,
        meta: {
          roles: ["_ad_sch_"],
          schools: ["dev_school", "camelot", "element", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Savollar Sahifasi",
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings,
        meta: {
          roles: ["_sp_am_", "_ow_sch_", "_ad_sch_"],
          schools: ["dev_school", "camelot", "it_park", "element", "sophie's", "zafar_azimov_school", "silverstudy", "sayyimov_academy"],
          title: "Sozlamalar",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: Error,
    meta: { title: "Error" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const defaultTitle = "Devosfot";
  document.title = to.meta.title
    ? `${defaultTitle} | ${to.meta.title}`
    : defaultTitle;
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const schoolName = localStorage.getItem("school_name")

  if (!token && to.name !== "login") {
    return next({ name: "login" });
  }

  if (token && to.name === "login") {
    return next({ name: "home" });
  }

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next({ name: "error" });
  }

  if (to.meta.schools && !to.meta.schools.includes(schoolName)) {
    return next({ name: "error" });
  }

  next();
});

export default router;
