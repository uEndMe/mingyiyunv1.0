import { goodsInfo } from '../api/request';

export default {
    namespaced: true,
    state: {
        info: {},
    },
    mutations: {
        setInfo (state, data) {
            state.info = data;
        },
    },
    actions: {
        handleGetGoodsInfo (context, id) {
            goodsInfo({goods_id: id}).then((res) => {
                if (res) {
                    context.commit('setInfo', res.data);
                    context.commit('setStatus', null, { root: true });
                    // console.log(res.data);
                }
            });
        },
    },
};
