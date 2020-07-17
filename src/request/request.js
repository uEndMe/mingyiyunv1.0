import Vue from "vue";
import axios from "axios";
import qs from "qs";
import router from "../router";
import ElementUI from "element-ui";
import { _c } from "../config/config";
import { makeSign } from "./util";

Vue.use(ElementUI);

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    baseURL: _c.domain,
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        const params = Object.assign({}, config);
        const copy = Object.assign({}, config.data);
        copy.token = sessionStorage.getItem(_c.tokenKey) || "";
        copy.timestamp = parseInt(new Date().getTime() / 1000);
        copy.req_source = "boss";
        copy.sign = makeSign(copy);
        params.data = qs.stringify(copy);
        return params;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// ['success', 'warning', 'info', 'error']
service.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data instanceof Object) {
            if (response.data.code === 0) return response.data;

            ElementUI.Message.error(response.data.msg);
            if (response.data.code == 10000) {
                return router.push({
                    path: "/login"
                });
            }
        }
        return Promise.reject();
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
            case 400:
                console.log('错误请求')
                break;
            case 401:
                console.log('未授权，请重新登录')
                break;
            case 403:
                console.log('拒绝访问')
                break;
            case 404:
                console.log('请求错误,未找到该资源')
                break;
            case 405:
                console.log('请求方法未允许')
                break;
            case 408:
                console.log('请求超时')
                break;
            case 500:
                console.log('服务器端出错')
                break;
            case 501:
                console.log('网络未实现')
                break;
            case 502:
                console.log('网络错误')
                break;
            case 503:
                console.log('服务不可用')
                break;
            case 504:
                console.log('网络超时')
                break;
            case 505:
                console.log('http版本不支持该请求')
                break;
            default:
                console.log(`连接错误${err.response.status}`)
            }
        } else {
            console.log('连接到服务器失败')
        }
        return Promise.reject();
    }
);

export default service;
