import defaultImg from '../assets/images/user.png';
import avatar from '../assets/images/boy.png';

export default {
    namespaced: true,
    state: {
        groupID: {},
        currentMessageList: [],
        userInfo: {
            nick: '测试test1',
            avatar,
            defaultImg
        },
    },
    mutations: {
        /**
         * 将消息插入当前会话列表
         * 调用时机：收/发消息事件触发时
         * @param {Object} state
         * @param {Message[]|Message} data
         * @returns
         */
        pushCurrentMessageList(state, data) {
            if (Array.isArray(data)) {
                state.currentMessageList = [...state.currentMessageList, ...data];
            } else  {
                state.currentMessageList = [...state.currentMessageList, data];
            }
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
