import Vue from 'vue';
import Vuex from 'vuex';
import IM from './moduleIM';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        IM,
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
