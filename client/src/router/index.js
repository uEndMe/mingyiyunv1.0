import Vue from "vue";
import VueRouter from "vue-router";
// import c from '../config/config';

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
    component: () => import("../views/home/VHome")
  },
  {
    path: "/classify",
    name: "classify",
    component: () => import("../views/classify/VClassify")
  },
  {
    path: "/live",
    name: "live",
    component: () => import("../views/LiveClass.vue")
  },
  {
    path: "/plaza",
    name: "plaza",
    component: () => import("../views/plaza/VPlaza")
  },
  {
    path: "/publish",
    name: "publish",
    component: () => import("../views/publish/VPublish")
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/chat/VChat")
  },
  {
    path: "/me",
    name: "me",
    component: () => import("../views/me/VMe")
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
