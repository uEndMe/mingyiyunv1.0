import _c from '../config/config';
import defaultImg from '../assets/images/user.png';
import avatar from '../assets/images/boy.png';
import { decodeText } from '../utils/decodeText';

export default {
    namespaced: true,
    state: {
        groupID: {},
        currentMessageList: [],
        userInfo: {
            nick: 'demo01',
            avatar,
            defaultImg,
        },
    },
    getters: {
        currentMessageList (state) {
            return state.currentMessageList.filter((item) => {
                item.payloadText = decodeText(item.payload.text);
                if (window.sessionStorage.getItem(_c.userIdKey) === item.nick) {
                    item.self = true;
                } else {
                    item.self = false;
                }
                return item;
            });
        },
    },
    mutations: {
        pushCurrentMessageList (state, data) {
            if (Array.isArray(data)) {
                state.currentMessageList = [...state.currentMessageList, ...data];
            } else {
                state.currentMessageList = [...state.currentMessageList, data];
            }
        },
        setCurrentMessageList (state, obj) {
            if (state.currentMessageList.length) {
                state.currentMessageList.forEach((item, i) => {
                    if (obj._length === i) {
                        item.payload.loading = obj.loading;
                        item.payload.isDone = obj.isDone;
                    }
                });
            }
        },
    },
    actions: {},
};
