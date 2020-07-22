import request from '../utils/request';

// 角色列表
export const roleList = (query) => {
    return request({
        url: '/boss/boss/role/list',
        data: (query || {})
    })
}
// 角色新增
export const roleAdd = (query) => {
    return request({
        url: '/boss/boss/role/create',
        data: (query || {})
    })
}
// 角色修改
export const roleUpdate = (query) => {
    return request({
        url: '/boss/boss/role/update',
        data: (query || {})
    })
}
// 角色删除
export const roleDel = (query) => {
    return request({
        url: '/boss/boss/role/delete',
        data: (query || {})
    })
}
// 角色启用状态
export const roleStatus = (query) => {
    return request({
        url: '/boss/boss/role/status',
        data: (query || {})
    })
}
