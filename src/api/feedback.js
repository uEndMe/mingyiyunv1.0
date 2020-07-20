import request from '../utils/request';

const Feedback = {}

// 精选推送列表
Feedback.list = (query) => {
    return request({
        url: '/boss/article/feedback/list',
        data: (query || {})
    })
}
// 更新反馈信息备注
Feedback.remark = (query) => {
    return request({
        url: '/boss/article/feedback/update',
        data: (query || {})
    })
}
// 删除反馈信息
Feedback.delete = (query) => {
    return request({
        url: '/boss/article/feedback/delete',
        data: (query || {})
    })
}

export default Feedback

