import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import ElementUI from 'element-ui'
import _c from "../core/config"
import {makeSign} from '../utils/util'

Vue.use(ElementUI);
const message = ElementUI.Message;


const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: _c.domain,
    method: 'post',
    timeout: 5000
})

service.interceptors.request.use( config => {
    const params = Object.assign({}, config);
    const copy = Object.assign({}, config.data);
    copy.token = sessionStorage.getItem(_c.tokenKey) || '';
    copy.timestamp = parseInt(new Date().getTime() / 1000, 10);
    copy.req_source = 'boss';
    copy.sign = makeSign(copy);
    params.data = qs.stringify(copy);
    return params;
}, error => {
    console.log(error);
    return Promise.reject();
})

// ['success', 'warning', 'info', 'error']
service.interceptors.response.use(response => {
    if(response.status === 200 && response.data instanceof Object){
        if(response.data.error_code == 0) {
            if (response.data.data === null) {return true;}
            return response.data.data
        };

        message.error(response.data.error_msg)
        if(response.data.error_code == 10000){
            return router.replace({
                path: '/login'
            })
        }
    }
    return Promise.reject();
}, error => {
    console.log(error)
    if (error && error.response.status) {
        switch (err.response.status) {
            case 400:
                message({
                    message: '请求错误',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 401:
                message({
                    message: '未授权，请登录',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 403:
                message({
                    message: '拒绝访问',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 404:
                message({
                    message: `请求地址出错: ${err.response.config.url}`,
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 408:
                message({
                    message: '请求超时',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 500:
                message({
                    message: '服务器内部错误',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 501:
                message({
                    message: '服务未实现',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 502:
                message({
                    message: '网关错误',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 503:
                message({
                    message: '服务不可用',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 504:
                message({
                    message: '网关超时',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
           case 505:
                message({
                    message: 'HTTP版本不受支持',
                    duration: 1500,
                    forbidClick: true
                });
                break
      
            default:
                message({
                    message: error.response.data.message,
                    duration: 1500,
                    forbidClick: true
                });
        }
    }
    return Promise.reject();
})

export default service;