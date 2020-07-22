import { addressList, addressInfo } from '../api/request';

export default {
    namespaced: true,
    state: {
        page: 1,
        limit: 8,
        loading: false,
        finished: false,
        addressList: [],
        replace: [], // 用来替换被删除项所在page数
        addressInfo: {},
        isEdit: false, // 是编辑还是新增的状态，true表示是编辑，false表示是新增
    },
    getters: {
        listParams (state) {
            return {
                page: state.page,
                limit: state.limit,
            };
        },
        list (state) {
            return state.addressList.filter((item) => {
                item.is_default = Boolean(item.is_default);
                return item;
            });
        },
        editInfo (state) {
            return {
                address_id: state.addressInfo.address_id,
                name: state.addressInfo.name,
                contact: state.addressInfo.contact,
                province: state.addressInfo.province,
                city: state.addressInfo.city,
                address: state.addressInfo.address,
                zip: state.addressInfo.zip,
            };
        },
    },
    mutations: {
        setAddressList (state, array) {
            state.addressList = state.addressList.concat(array);
        },
        setAddressNoConcat (state, array) {
            state.addressList = array;
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
        setAddressInfo (state, obj) {
            state.addressInfo = obj;
        },
        setIsEdit (state, bool) {
            state.isEdit = bool;
        },
    },
    actions: {
        handleGetAddressList ({commit, state, getters}, loadingType) {
            addressList(getters.listParams)
                .then((res) => {
                    if (res) {
                        let data = res.data;
                        commit('setPage');
                        commit('setLoading', false);
                        if (loadingType) {
                            commit('setReplace', data.list);
                            commit('setStatus', null, {root: true});
                        } else {
                            commit('setAddressList', data.list);
                        }
                        if (state.addressList.length >= data.count) {
                            commit('setFinished', true);
                        }
                    }
                });
        },
        handleGetAddressInfo ({commit}, addressId) {
            addressInfo({address_id: addressId})
                .then((res) => {
                    commit('setAddressInfo', res.data);
                    commit('setIsEdit', true);
                });
        },
    },
};
