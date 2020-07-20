import request from '../utils/request';

const Question = {}

// 精选推送列表
Question.list = (query) => {
    return request({
        url: '/boss/h/question/list',
        data: (query || {})
    })
}

// 创建精选推送
Question.create = (query) => {
    return request({
        url: '/boss/h/question/create',
        data: (query || {})
    })
}

// 编辑精选推送
Question.update = (query) => {
    return request({
        url: '/boss/h/question/update',
        data: (query || {})
    })
}

// 精选推送删除
Question.delete = (query) => {
    return request({
        url: '/boss/h/question/delete',
        data: (query || {})
    })
}

// 精选推送显示状态更新
Question.status = (query) => {
    return request({
        url: '/boss/h/question/status',
        data: (query || {})
    })
}

// 精选推送详细信息
Question.info = (query) => {
    return request({
        url: '/boss/h/question/info',
        data: (query || {})
    })
}

export default Question

