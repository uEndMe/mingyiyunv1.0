import { shareList, shareInfo } from '../api/request';
// const img = require('../assets/images/raw_1524641763.png');

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 3,
        loading: false,
        finished: false,
        list: [],
        info: {},
    },
    getters: {
        params (state) {
            return {
                page: state.page,
                limit: state.limit,
            };
        },
        info (state) {
            return {
                invite_code: state.info.invite_code,
                total: state.info.total ? (state.info.total / 100).toFixed(2) : '0.00',
                share_amount: state.info.share_amount ? state.info.share_amount : '0',
                invite_amount: state.info.invite_amount ? state.info.invite_amount : '0',
                profits: state.info.profits ? (state.info.profits / 100).toFixed(2) : '0.00',
            };
        },
        list (state) {
            return state.list.filter((item) => {
                item.add_time = item.add_time.slice(0, 10);
                item.amount = `+${(item.amount / 100).toFixed(2)}`;
                return item;
            });
        },
    },
    mutations: {
        setList (state, array) {
            state.list = state.list.concat(array);
        },
        setListNoConcat (state, array) {
            state.list = array;
        },
        setPage (state, page) {
            if (typeof page !== 'undefined') {
                state.page = page;
            } else {
                state.page++;
            }
        },
        setLimit (state, limit) {
            state.limit = limit;
        },
        setLoading (state, bool) {
            state.loading = bool;
        },
        setFinished (state, bool) {
            state.finished = bool;
        },
        setInfo (state, obj) {
            state.info = obj;
        },
    },
    actions: {
        handleGetShareList ({commit, state, getters}) {
            shareList(getters.params)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        commit('setPage');
                        commit('setList', data.list);
                        commit('setLoading', false);
                        commit('setStatus', null, {root: true});
                        if (state.list.length >= data.count) {
                            commit('setFinished', true);
                        }
                    }
                });
        },
        handleGetShareInfo ({commit}) {
            shareInfo()
                .then((res) => {
                    if (typeof res !== 'undefined') {
                        const data = res.data;
                        commit('setInfo', data);
                    }
                })
                .catch(() => {
                    commit('setStatus', null, {root: true});
                });
        },
    },
};
