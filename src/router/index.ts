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
    path: "/aaa",
    name: "",
    component: () => import("../views/aaa.vue"),
  },
  {
    path: "/RegisterAdmin",
    name: "",
    component: () => import("../views/RegisterAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
