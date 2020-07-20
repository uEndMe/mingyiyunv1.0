import request from '../utils/request';

const Push = {}

// 精选推送列表
Push.list = (query) => {
    return request({
        url: '/boss/h/push/list',
        data: (query || {})
    })
}

// 创建精选推送
Push.create = (query) => {
    return request({
        url: '/boss/h/push/create',
        data: (query || {})
    })
}

// 编辑精选推送
Push.update = (query) => {
    return request({
        url: '/boss/h/push/update',
        data: (query || {})
    })
}

// 精选推送删除
Push.delete = (query) => {
    return request({
        url: '/boss/h/push/delete',
        data: (query || {})
    })
}

// 精选推送显示状态更新
Push.status = (query) => {
    return request({
        url: '/boss/h/push/status',
        data: (query || {})
    })
}

// 精选推送详细信息
Push.info = (query) => {
    return request({
        url: '/boss/h/push/info',
        data: (query || {})
    })
}

export default Push

