import request from '../utils/request';

const Goods = {}

//商品列表
Goods.list = (query) => {
    return request({
        url: '/boss/shop/goods/list',
        data: (query || {})
    })
}
//商品详情
Goods.info = (query) => {
    return request({
        url: '/boss/shop/goods/info',
        data: (query || {})
    })
}
//设置最新商品
Goods.newest = (query) => {
    return request({
        url: '/boss/shop/goods/newest',
        data: (query || {})
    })
}
//设置首页推荐
Goods.recommend = (query) => {
    return request({
        url: '/boss/shop/goods/recommend',
        data: (query || {})
    })
}
//强制下架
Goods.soldOut = (query) => {
    return request({
        url: '/boss/shop/goods/sold_out',
        data: (query || {})
    })
}
//上架申请
Goods.apply = (query) => {
    return request({
        url: '/boss/shop/goods/apply',
        data: (query || {})
    })
}
//商品上架申请
Goods.shelves = (query) => {
    return request({
        url: '/boss/shop/goods/shelves',
        data: (query || {})
    })
}
//商户下拉列表选项
Goods.merchant = (query) => {
    return request({
        url: '/boss/shop/merchant/select',
        data: (query || {})
    })
}

export default Goods