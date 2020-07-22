import Vue from 'vue';
import Router from 'vue-router';
import c from '../core/config';
import Home from '../components/common/Home.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: Home,
        meta: { title: '自述文件' },
        children:[
            {
                path: 'index',
                component: () => import('../components/page/Home.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/admin',
                component: () => import('../components/page/Admin.vue'),
                meta: { title: '账号管理' }
            },
            {
                path: '/role',
                component: () => import('../components/page/Role.vue'),
                meta: { title: '角色管理' }
            },
            {
                path: '/dept',
                component: () => import('../components/page/Dept.vue'),
                meta: { title: '部门管理' }
            },
            {
                path: '/member/list',
                component: () => import('../components/page/MemberList.vue'),
                meta: { title: '会员列表' }
            },
            {
                path: '/tabs',
                component: () => import('../components/page/Tabs.vue'),
                meta: { title: '消息中心' }
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
