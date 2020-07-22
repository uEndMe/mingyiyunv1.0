import { orderList } from '../api/request';

export default {
    namespaced: true,
    state: {
        status: 'all',
        page: 1,
        limit: 4,
        loading: false,
        finished: false,
        orderList: [],
        replace: [],
        isDone: false,
    },
    mutations: {
        setOrderList (state, array) {
            state.orderList = state.orderList.concat(array);
        },
        setOrderListNoConcat (state, array) {
            state.orderList = array;
        },
        setStatus (state, status) {
            state.status = status;
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
        setReplace (state, array) {
            state.replace = array;
        },
        setIsDone (state, bool) {
            state.isDone = bool;
        },
    },
    actions: {
        handleGetOrderList ({commit, state}, loadingType) {
            const params = {
                status: state.status,
                page: state.page,
                limit: state.limit,
            };
            orderList(params).then((res) => {
                if (res) {
                    let data = res.data;
                    commit('setPage');
                    commit('setLoading', false);
                    if (loadingType) {
                        commit('setReplace', data.list);
                        commit('setStatus', null, {root: true});
                    } else {
                        commit('setIsDone', true);
                        commit('setOrderList', data.list);
                    }
                    if (state.orderList.length >= data.count) {
                        commit('setFinished', true);
                    }
                }
            });
        },
    },
};
