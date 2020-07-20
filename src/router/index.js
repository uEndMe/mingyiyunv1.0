import Vue from 'vue';
import Router from 'vue-router';
import c from '../core/config';
import Home from '../components/common/Home.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: Home,
        meta: { title: '自述文件' },
        children:[
            {
                path: 'dashboard',
                component: () => import('../components/page/Home.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/system/admin',
                component: () => import('../components/page/Admin.vue'),
                meta: { title: '管理员' }
            },
            {
                path: '/member/list',
                component: () => import('../components/page/MemberList.vue'),
                meta: { title: '会员列表' }
            },
        ]    
    },
    {
        path: '/login',
        component: () => import('../components/page/Login.vue')
    },
    {
        path: '/404',
        component: () => import('../components/page/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem(c.tokenKey);
    if (!token && to.path !== '/login') {
        next('/login');
        // next();
    } else {
        next();
    }
});

export default router;
