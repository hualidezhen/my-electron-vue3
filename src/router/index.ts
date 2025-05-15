import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";
// import Layout from '@/layout/AppMain.vue'
// import time from '@/layout/AppMain.vue'
import time from "@/components/time/index.vue";
import login from "@/components/Login.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/time",
    name: "time",
    component: time,
    meta: {
      title: "时间日历",
      hidden: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
