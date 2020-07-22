import Vue from 'vue';
import Vuex from 'vuex';
import goodsDetail from './moduleGoodsDetail';
import order from './moduleOrder';
import collect from './moduleCollection';
import address from './moduleAddress';
import account from './moduleWallet';
import help from './moduleQuestion';
import push from './modulePush';
import share from './moduleShare';
import notic from './moduleNotice';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        goodsDetail,
        order,
        collect,
        address,
        account,
        help,
        push,
        share,
        notic,
    },
    state: {
        status: false,
    },
    mutations: {
        setStatus (state) {
            state.status = !state.status;
        },
    },
});
