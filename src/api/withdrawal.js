import request from '../utils/request';

const MemberWith = {}

MemberWith.list = (query) => {
    return request({
        url: '/boss/h/withdrawal/order',
        data: (query || {})
    })
}
MemberWith.withdrawal = (query) => {
    return request({
        url: '/boss/h/withdrawal/audit',
        data: (query || {})
    })
}

export default MemberWith

