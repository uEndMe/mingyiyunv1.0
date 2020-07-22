import { collectionList } from '../api/request';

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 5,
        loading: false,
        finished: false,
        collectList: [],
        replace: [], // 用来替换被删除项所在page数
    },
    mutations: {
        setCollectList (state, array) {
            state.collectList = state.collectList.concat(array);
        },
        setCollectListNoConcat (state, array) {
            state.collectList = array;
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
    },
    actions: {
        handleGetCollectList ({commit, state, rootState}, loadingType) {
            const params = {
                page: state.page,
                limit: state.limit,
            };
            collectionList(params)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        commit('setPage');
                        commit('setLoading', false);
                        commit('setStatus', null, {root: true});
                        if (loadingType) {
                            commit('setReplace', data.list);
                        } else {
                            commit('setCollectList', data.list);
                        }
                        if (state.collectList.length >= data.count) {
                            commit('setFinished', true);
                        }
                    }
                });
        },
    },
};
