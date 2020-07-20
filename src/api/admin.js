import request from '../utils/request';

const Admin = {}

// 管理员列表
Admin.list = (query) => {
    return request({
        url: '/boss/boss/admin/list',
        data: (query || {})
    })
}

// 角色下拉列表
Admin.role_select = (query) => {
    return request({
        url: '/boss/boss/role/select',
        data: (query || {})
    })
}

// 管理员更新
Admin.update = (query) => {
    return request({
        url: '/boss/boss/admin/update',
        data: (query || {})
    })
}

// 创建管理员
Admin.create = (query) => {
    return request({
        url: '/boss/boss/admin/create',
        data: (query || {})
    })
}

// 删除管理员
Admin.del = (query) => {
    return request({
        url: '/boss/boss/admin/delete',
        data: (query || {})
    })
}

// 管理员启用状态更新
Admin.status = (query) => {
    return request({
        url: '/boss/boss/admin/status',
        data: (query || {})
    })
}

export default Admin

