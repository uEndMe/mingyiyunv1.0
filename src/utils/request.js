import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import ElementUI from 'element-ui'
import _c from "../core/config"
import {makeSign} from '../utils/util'


Vue.use(ElementUI);


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
    config.data.token = sessionStorage.getItem(_c.tokenKey) || '';
    config.data.timestamp = parseInt((new Date()).getTime()/1000);
    config.data.req_source = 'boss';
    config.data.sign = makeSign(config.data);

    config.data = qs.stringify(config.data);

    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

// ['success', 'warning', 'info', 'error']
service.interceptors.response.use(response => {
    if(response.status === 200){
        if(response.data.error_code == 0)   return response.data.data;

        ElementUI.Message.error(response.data.error_msg)
        // if(response.data.error_code == 10000){
        //     router.push({
        //         path: '/login'
        //     })
        // }

        return false;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;