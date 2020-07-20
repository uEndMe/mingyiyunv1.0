import request from '../utils/request';

const Words = {}

// 精选推送列表
Words.list = (query) => {
    return request({
        url: '/boss/common/keywords/list',
        data: (query || {})
    })
}

Words.create = (query) => {
    return request({
        url: '/boss/common/keywords/create',
        data: (query || {})
    })
}
Words.update = (query) => {
    return request({
        url: '/boss/common/keywords/update',
        data: (query || {})
    })
}
Words.status = (query) => {
    return request({
        url: '/boss/common/keywords/status',
        data: (query || {})
    })
}
Words.delete = (query) => {
    return request({
        url: '/boss/common/keywords/delete',
        data: (query || {})
    })
}
Words.setHot = (query) => {
    return request({
        url: '/boss/common/keywords/hot',
        data: (query || {})
    })
}

export default Words

