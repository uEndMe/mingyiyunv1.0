import request from '../utils/request';

// 部门列表
export const deptList = (query) => {
    return request({
        url: '/boss/boss/dept/list',
        data: (query || {})
    })
}
// 部门新增
export const deptAdd = (query) => {
    return request({
        url: '/boss/boss/dept/create',
        data: (query || {})
    })
}
// 部门修改
export const deptUpdate = (query) => {
    return request({
        url: '/boss/boss/dept/update',
        data: (query || {})
    })
}
// 部门删除
export const deptDel = (query) => {
    return request({
        url: '/boss/boss/dept/delete',
        data: (query || {})
    })
}
// 部门启用状态
export const deptStatus = (query) => {
    return request({
        url: '/boss/boss/dept/status',
        data: (query || {})
    })
}

