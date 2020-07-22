import { questionList, questionInfo } from '../api/request';

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 15,
        loading: false,
        finished: false,
        list: [],
        questionInfo: {},
    },
    getters: {
        params (state) {
            return {
                page: state.page,
                limit: state.limit,
            };
        },
        fiveQuestion (state) {
            return state.list.slice(0, 5);
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
        setQuestionInfo (state, obj) {
            state.questionInfo = obj;
        },
    },
    actions: {
        handleGetQuestionList ({commit, state, getters}) {
            questionList(getters.params)
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
        handleGetQuestionInfo ({commit}, qid) {
            questionInfo({question_id: parseInt(qid, 10)})
                .then((res) => {
                    if (typeof res !== 'undefined') {
                        const data = res.data;
                        commit('setQuestionInfo', data);
                    }
                })
                .catch(() => {
                    commit('setStatus', null, {root: true});
                });
        },
    },
};
