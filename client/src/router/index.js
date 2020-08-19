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
  },

  // home
  {
    path: "/classify",
    name: "classify",
    component: () => import("../views/classify/VClassify")
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("../views/article/VArticle")
  },
  {
    path: "/mp3/:id",
    name: "mp3",
    component: () => import("../views/article/VMp3")
  },
  {
    path: "/mp4/:id",
    name: "mp4",
    component: () => import("../views/article/VMp4")
  },

  // plaza
  // publish
  // chat
  {
    path: "/friend",
    name: "friend",
    component: () => import("../views/friend/VFriend")
  },

  // me
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
