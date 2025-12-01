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
  School,
  Owner,
} from "../views";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      roles: ["_sp_am_", "_ow_sch_", "_ad_sch_", "_tch_sch_"],
      title: "Home",
    },
    children: [
      {
        path: "",
        name: "root-redirect",
        beforeEnter: (to, from, next) => {
          const role = localStorage.getItem("role");

          if (role === "_sp_am_") {
            return next({ name: "owner" });
          }

          return next({ name: "dashboard" });
        },
      },
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        meta: {
          title: "Asosiy",
        },
      },
      {
        path: "/employees",
        name: "employees",
        component: Teachers,
        meta: {
          roles: ["_ow_sch_", "_ad_sch_"],
          title: "Xodimlar",
        },
      },
      {
        path: "/employee/:school_id/:id",
        name: "slug_teachers",
        component: SlugTeachers,
        meta: {
          roles: ["_ow_sch_", "_ad_sch_"],
          title: "Xodim Sahifasi",
        },
      },
      {
        path: "/students",
        name: "students",
        component: Students,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "O'quvchilar",
        },
      },
      {
        path: "/students/archive",
        name: "studentsArchive",
        component: StudentsArchive,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "Arxiv o'quvchilar",
        },
      },
      {
        path: "/students/:id/:name",
        name: "slug_students",
        component: SlugStudent,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "O'quvchi Sahifasi",
        },
      },
      {
        path: "/customer",
        name: "customers",
        component: Customer,
        meta: {
          roles: ["_ad_sch_"],
          title: "Mijozlar",
        },
      },
      {
        path: "/tests",
        name: "tests",
        component: Tests,
        meta: {
          roles: ["_ad_sch_"],
          title: "Testlar",
        },
      },
      {
        path: "/subjects",
        name: "subjects",
        component: Subjects,
        meta: {
          roles: ["_ad_sch_"],
          title: "Fanlar",
        },
      },
      {
        path: "/payment",
        name: "payment",
        component: Payment,
        meta: {
          roles: ["_ad_sch_"],
          title: "To'lovlar",
        },
      },
      {
        path: "/attendance",
        name: "attendance",
        component: Attendance,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "Davomat",
        },
      },
      {
        path: "/sms",
        name: "sms",
        component: Sms,
        meta: {
          roles: ["_ad_sch_"],
          title: "SMS",
        },
      },
      {
        path: "/finance",
        name: "finance",
        component: Finance,
        meta: {
          roles: ["_ad_sch_", "_ow_sch_", "_tch_sch_"],
          title: "Moliya",
        },
      },
      {
        path: "/results",
        name: "results",
        component: Results,
        meta: {
          roles: ["_ad_sch_"],
          title: "Natijalar",
        },
      },
      {
        path: "/results/:id",
        name: "slug_results",
        component: SlugResults,
        meta: {
          roles: ["_ad_sch_"],
          title: "Natijalar Sahifasi",
        },
      },
      {
        path: "/groups",
        name: "groups",
        component: Groups,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "Guruhlar",
        },
      },
      {
        path: "/groups/:id/:name",
        name: "slug_groups",
        component: SlugGroups,
        meta: {
          roles: ["_ad_sch_", "_tch_sch_"],
          title: "Guruh Sahifasi",
        },
      },
      {
        path: "/tests/question/:name",
        name: "slug_questions",
        component: SlugTests,
        meta: {
          roles: ["_ad_sch_"],
          title: "Savollar Sahifasi",
        },
      },
      {
        path: "/owner",
        name: "owner",
        component: Owner,
        meta: {
          roles: ["_sp_am_"],
          title: "Mijozlar",
        },
      },
      {
        path: "/school",
        name: "school",
        component: School,
        meta: {
          roles: ["_sp_am_"],
          title: "O'quv markazlar",
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings,
        meta: {
          roles: ["_sp_am_", "_ow_sch_", "_ad_sch_", "_tch_sch_"],
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

// Title update
router.afterEach((to) => {
  const defaultTitle = "Devosfot";
  document.title = to.meta.title
    ? `${defaultTitle} | ${to.meta.title}`
    : defaultTitle;
});

// Role based navigation
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token && to.name !== "login") return next({ name: "login" });
  if (token && to.name === "login") return next({ name: "dashboard" });

  const isRoot = to.matched.length === 1 && to.matched[0].name === "home";
  if (isRoot) {
    if (role === "_sp_am_") {
      return next({ name: "owner" });
    }
    return next({ name: "dashboard" });
  }

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next({ name: "error" });
  }

  next();
});

export default router;
