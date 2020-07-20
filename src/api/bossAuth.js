import request from '../utils/request';

// 登录系统
export const login = (query) => {
    return request({
        url: '/boss/boss/auth/login',
        data: (query || {})
    })
}

// 退出登录
export const logout = (query) => {
    return request({
        url: '/boss/boss/auth/logout',
        data: (query || {})
    })
}

// 修改密码
export const password = (query) => {
    return request({
        url: '/boss/boss/auth/password',
        data: (query || {})
    })
}

// 获取菜单数据
export const menu = (query) => {
    return request({
        url: '/boss/boss/menu/list',
        data: (query || {})
    })
}
