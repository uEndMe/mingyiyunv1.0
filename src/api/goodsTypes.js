import request from '../utils/request';

const Types = {}

//以下是商品分类页的接口
Types.create = (query) => {
    return request({
        url: '/boss/shop/goods_type/create',
        data: (query || {})
    })
}
Types.list = (query) => {
    return request({
        url: '/boss/shop/goods_type/list',
        data: (query || {})
    })
}
Types.update = (query) => {
    return request({
        url: '/boss/shop/goods_type/update',
        data: (query || {})
    })
}
Types.status = (query) => {
    return request({
        url: '/boss/shop/goods_type/status',
        data: (query || {})
    })
}
Types.delete = (query) => {
    return request({
        url: '/boss/shop/goods_type/delete',
        data: (query || {})
    })
}
Types.show = (query) => {
    return request({
        url: '/client/shop/goods_type/list',
        data: (query || {})
    })
}

export default Types

