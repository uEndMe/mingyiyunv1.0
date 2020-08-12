import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import c from './config';
// import Router from '../router';
import { makeSign } from './util';

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 10000,
    baseURL: 'http://ms.yidaiyun.com.cn/api/v1.0',
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    const params = Object.assign({}, config);
    const copy = Object.assign({}, config.data);
    copy.token = sessionStorage.getItem(c.tokenKey) || '';
    copy.timestamp = parseInt(new Date().getTime() / 1000, 10);
    copy.req_source = sessionStorage.getItem(c.reqSourceKey) || 'boss';
    copy.sign = makeSign(copy);
    params.data = qs.stringify(copy);
    return params;
},
(error) => {
    Toast('请求服务器异常！');
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((res) => {
    if (res.status === 200) {
        if (res.data.error_code === 0) {
            // if (res.data === null) {return true;}
            return res.data;
        }
        if (res.status === 10000) {
            window.location.href = 'http://192.168.0.107/relogin';
        }
        Toast(res.data.error_msg);
        if (res.data.error_code === 20002) {
            return Promise.reject(20002);
        } else {
            return Promise.reject();
        }
    }
    // if(res.status === 10000){
    //     Toast('您还没有登录，请先登录');
    //     Router.replace('/login');
    // }
}, (error) => {
    if (error.code === 'ECONNABORTED') {
        Toast('Request timeout!');
    } else {
        // console.log(error);
        Toast(error.message);
    }
    return Promise.reject();
});

export default instance;
