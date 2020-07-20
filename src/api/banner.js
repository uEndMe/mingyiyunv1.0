import request from '../utils/request';

const Banner = {}

// 精选推送列表
Banner.list = (query) => {
    return request({
        url: '/boss/common/promote/list',
        data: (query || {})
    })
}

Banner.create = (query) => {
    return request({
        url: '/boss/common/promote/create',
        data: (query || {})
    })
}
Banner.update = (query) => {
    return request({
        url: '/boss/common/promote/update',
        data: (query || {})
    })
}
Banner.status = (query) => {
    return request({
        url: '/boss/common/promote/status',
        data: (query || {})
    })
}
Banner.delete = (query) => {
    return request({
        url: '/boss/common/promote/delete',
        data: (query || {})
    })
}

export default Banner

