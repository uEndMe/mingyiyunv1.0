import request from '../utils/request';

const Member = {}

// 精选推送列表
Member.list = (query) => {
    return request({
        url: '/boss/member/member/list',
        data: (query || {})
    })
}

Member.status = (query) => {
    return request({
        url: '/boss/member/member/status',
        data: (query || {})
    })
}
Member.delete = (query) => {
    return request({
        url: '/boss/member/member/delete',
        data: (query || {})
    })
}

export default Member

