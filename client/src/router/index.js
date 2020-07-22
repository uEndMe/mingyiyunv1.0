import Vue from 'vue';
import VueRouter from 'vue-router';
import c from '../config/config';

Vue.use(VueRouter);
const routes = [
    // {
    //     path: '/',
    //     redirect: '/shareing',
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
    },
    {
        path: '/forgotpass',
        name: 'forgotpass',
        component: () => import('../views/ForgotPassword.vue'),
    },
    {
        path: '/addressedit',
        name: 'addressedit',
        component: () => import('../views/AddressEdit.vue'),
    },
    {
        path: '/addresslist',
        name: 'addresslist',
        component: () => import('../views/AddressList.vue'),
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/Help.vue'),
    },
    {
        path: '/questions',
        name: 'questions',
        component: () => import('../views/HelpQuestions.vue'),
    },
    {
        path: '/question-detail',
        name: 'question-detail',
        component: () => import('../views/HelpQuestionInfo.vue'),
    },
    {
        path: '/push',
        name: 'push',
        component: () => import('../views/Push.vue'),
    },
    {
        path: '/push-detail',
        name: 'push-detail',
        component: () => import('../views/PushDetail.vue'),
    },
    {
        path: '/systemnotice',
        name: 'systemnotice',
        component: () => import('../views/SystemNotice.vue'),
    },
    {
        path: '/shareing',
        name: 'shareing',
        component: () => import('../views/Shareing.vue'),
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: () => import('../views/Wallet.vue'),
    },
    {
        path: '/record',
        name: 'record',
        component: () => import('../views/WalletRecord.vue'),
    },
    {
        path: '/expense',
        name: 'expense',
        component: () => import('../views/WalletExpense.vue'),
    },
    {
        path: '/withdrawal',
        name: 'withdrawal',
        component: () => import('../views/Withdrawal.vue'),
    },
    {
        path: '/goodsdetail',
        name: 'goodsdetail',
        component: () => import('../views/GoodsDetail.vue'),
    },
    {
        path: '/goodsdetail1',
        name: 'goodsdetail1',
        component: () => import('../views/GoodsDetailIos.vue'),
    },
    {
        path: '/cs',
        name: 'cs',
        component: () => import('../views/CustomerService.vue'),
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue'),
    },
    {
        path: '/collection',
        name: 'collection',
        component: () => import('../views/Collection.vue'),
    },
    {
        path: '/modifypass',
        name: 'modifypass',
        component: () => import('../views/ModifyPass.vue'),
    },
    {
        path: '/modifypay',
        name: 'modifypay',
        component: () => import('../views/ModifyPay.vue'),
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () => import('../views/Agreement.vue'),
    },
    {
        path: '/merchant',
        name: 'merchant',
        component: () => import('../views/MerchantApply.vue'),
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('../views/DownloadApp.vue'),
    },
    {
        path: '/amazon-profile',
        name: 'amazon-profile',
        component: () => import('../views/AmazonProfile.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    let queryToken = to.query.token;
    let oldToken = sessionStorage.getItem(c.tokenKey);

    if (oldToken === null) {sessionStorage.setItem(c.tokenKey, '');}
    if (!sessionStorage.getItem(c.reqSourceKey)) {
        sessionStorage.setItem(c.reqSourceKey, 'web');
    }

    if (queryToken) {
        if (oldToken !== queryToken) {sessionStorage.setItem(c.tokenKey, queryToken || '');}
    }
    if (to.query.req_source) {
        if (sessionStorage.getItem(c.reqSourceKey) !== to.query.req_source) {
            sessionStorage.setItem(c.reqSourceKey, to.query.req_source || '');
        }
    }
    // console.log(sessionStorage.getItem(c.tokenKey));
    // else {
    //     sessionStorage.removeItem(c.tokenKey);
    // }
    // if (to.path === '/goodsdetail' && to.query.req_source === 'ios') {
    //     next({
    //         path: '/goodsdetail1',
    //         query: {
    //             token: to.query.token,
    //             req_source: to.query.req_source,
    //             goods_id: to.query.goods_id,
    //         },
    //     });
    // } else {
    //     next();
    // }
    next();
});

export default router;
