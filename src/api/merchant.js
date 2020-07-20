import request from '../utils/request';

const Merchant = {}

// 精选推送列表
Merchant.list = (query) => {
    return request({
        url: '/boss/shop/merchant/list',
        data: (query || {})
    })
}

Merchant.create = (query) => {
    return request({
        url: '/boss/shop/merchant/create',
        data: (query || {})
    })
}
Merchant.update = (query) => {
    return request({
        url: '/boss/shop/merchant/update',
        data: (query || {})
    })
}
Merchant.status = (query) => {
    return request({
        url: '/boss/shop/merchant/status',
        data: (query || {})
    })
}
Merchant.delete = (query) => {
    return request({
        url: '/boss/shop/merchant/delete',
        data: (query || {})
    })
}
Merchant.vip = (query) => {
    return request({
        url: '/boss/shop/merchant/vip',
        data: (query || {})
    })
}
Merchant.recharge = (query) => {
    return request({
        url: '/boss/shop/merchant/top_up',
        data: (query || {})
    })
}

//商家入驻申请
Merchant.apply = (query) => {
    return request({
        url: '/boss/shop/merchant_apply/list',
        data: (query || {})
    })
}

export default Merchant

