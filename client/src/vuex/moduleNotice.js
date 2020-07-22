import { noticeList } from '../api/request';

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 3,
        type_sn: 1,
        loading: false,
        finished: false,
        list: [],
    },
    getters: {
        params (state) {
            return {
                type_sn: state.type_sn,
                page: state.page,
                limit: state.limit,
            };
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
        setTypeSn (state, num) {
            state.type_sn = num;
        },
        setLoading (state, bool) {
            state.loading = bool;
        },
        setFinished (state, bool) {
            state.finished = bool;
        },
    },
    actions: {
        handleGetNoticeList ({commit, state, getters}) {
            noticeList(getters.params)
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
    },
};
