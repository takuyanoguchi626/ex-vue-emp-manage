import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // // パスが登録されていない場合はログイン画面へ(LoginAdmin.vueを作成したらコメントを外してください)
  // {
  //   path: "*",
  //   component: () => import("../components/LoginAdmin.vue"),
  // },

  {
    path: "/registerAdmin",
    name: "",
    component: () => import("../views/RegisterAdmin.vue"),
  },
  {
    path: "/loginAdmin",
    name: "",
    component: () => import("../views/LoginAdmin.vue"),
  },
  {
    path: "/employeeList",
    name: "",
    component: () => import("../views/EmployeeList.vue"),
  },
  {
    path: "/employeeDetail/:id",
    name: "",
    component: () => import("../views/EmployeeDetail.vue"),
  },
  {
    path: "/logoutAdmin",
    name: "",
    component: () => import("../views/LogoutAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
