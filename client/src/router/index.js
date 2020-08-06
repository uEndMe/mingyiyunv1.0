import Vue from 'vue';
import VueRouter from 'vue-router';
// import c from '../config/config';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/live',
        name: 'live',
        component: () => import('../views/LiveClass.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
