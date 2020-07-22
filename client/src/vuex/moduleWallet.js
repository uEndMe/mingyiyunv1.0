import { accountInfo, accountLogRecord, accountLogInOut } from '../api/request';

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 10,
        io: '',
        loading: false,
        finished: false,
        info: {},
        withdrawalRecord: [],
        inOutList: [],
    },
    getters: {
        info (state) {
            return {
                balance: (state.info.balance / 100).toFixed(2),
                freeze: (state.info.freeze / 100).toFixed(2),
                have_withdrawal: (state.info.have_withdrawal / 100).toFixed(2),
            };
        },
        record (state) {
            return state.withdrawalRecord.filter((item) => {
                item.money = (item.money / 100).toFixed(2);
                item.add_time = `${item.add_time.slice(5, 10)} ${item.add_time.slice(11, 16)}`;
                if (item.username.length > 40) {
                    item.username = item.username.slice(0, 40);
                }
                return item;
            });
        },
        expense (state) {
            return state.inOutList.filter((item) => {
                item.io = item.io === 'i' ? '+' : '-';
                if (item.io === '+') {
                    item.class = 'i-color';
                } else {
                    item.class = 'o-color';
                }
                if (item.remark.length > 40) {
                    item.remark = item.remark.slice(0, 40);
                }
                item.amount = (item.amount / 100).toFixed(2);
                item.add_time = `${item.add_time.slice(5, 10)} ${item.add_time.slice(11, 16)}`;
                return item;
            });
        },
        recordParams (state) {
            return {
                page: state.page,
                limit: state.limit,
            };
        },
        inOutParams (state) {
            return {
                page: state.page,
                limit: state.limit,
                io: state.io,
            };
        },
    },
    mutations: {
        setInfo (state, data) {
            state.info = data;
        },
        setWithdrawalRecord (state, array) {
            state.withdrawalRecord = state.withdrawalRecord.concat(array);
        },
        setWithdrawalRecordNoConcat (state, array) {
            state.withdrawalRecord = array;
        },
        setInOutList (state, array) {
            state.inOutList = state.inOutList.concat(array);
        },
        setInOutListNoConcat (state, array) {
            state.inOutList = array;
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
        setIo (state, io) {
            state.io = io;
        },
        setLoading (state, bool) {
            state.loading = bool;
        },
        setFinished (state, bool) {
            state.finished = bool;
        },
    },
    actions: {
        handleGetAccountInfo ({commit}) {
            accountInfo().then((res) => {
                if (res) {
                    commit('setInfo', res.data);
                    commit('setStatus', null, { root: true });
                    // console.log(res.data);
                }
            });
        },
        handleGetRecord ({commit, state, getters}) {
            accountLogRecord(getters.inOutParams)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        commit('setPage');
                        commit('setWithdrawalRecord', data.list);
                        commit('setLoading', false);
                        commit('setStatus', null, {root: true});
                        if (state.withdrawalRecord.length >= data.count) {
                            commit('setFinished', true);
                        }
                    }
                });
        },
        handleGetInOut ({commit, state, getters}) {
            accountLogInOut(getters.recordParams)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        commit('setPage');
                        commit('setInOutList', data.list);
                        commit('setLoading', false);
                        commit('setStatus', null, {root: true});
                        if (state.withdrawalRecord.length >= data.count) {
                            commit('setFinished', true);
                        }
                    }
                });
        },
    },
};
