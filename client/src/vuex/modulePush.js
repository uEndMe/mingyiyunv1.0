import { pushList, pushInfo } from '../api/request';
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
        handleGetPushList ({commit, state, getters}) {
            pushList(getters.params)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        // data.list = [
                        //     {
                        //         push_id: 1,
                        //         add_time: '2020-04-07',
                        //         title: 'Classic Blue Tizhi Cake',
                        //         abstract: 'There are moments in life when you miss someone',
                        //         img_path: img,
                        //     },
                        // ];
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
        handleGetPushInfo ({commit}, qid) {
            pushInfo({push_id: parseInt(qid, 10)})
                .then((res) => {
                    if (typeof res !== 'undefined') {
                        // res.data = {
                        //     push_id: 1,
                        //     add_time: '2020-04-07',
                        //     title: 'Classic Blue Tizhi Cake',
                        //     abstract: 'There are moments in life when you miss someone',
                        //     img_path: img,
                        //     content: 'There are moments in life when you miss someoneThere are moments in life when you miss someone',
                        //     browse: 10,
                        // };
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
