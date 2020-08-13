import Vue from "vue";
import VueRouter from "vue-router";
// import c from '../config/config';
import VHome from "@/views/home/VHome.vue";
import VSearch from "@/views/search/VSearch.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: VHome
  },
  {
    path: "/search",
    name: "search",
    component: VSearch
  },
  {
    path: "/live",
    name: "live",
    component: () => import("../views/LiveClass.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
