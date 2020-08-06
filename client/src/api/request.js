import request from '../config/request';

// 文件上传
export const upload = (query) => request({
    url: '/system/common/file/upload',
    method: 'post',
    data: (query || {}),
    timeout: 30000,
});
// 邮件验证码发送接口
export const sendCode = (query) => request({
    url: '/system/webservice/verify_code/send_email',
    method: 'post',
    data: (query || {}),
});
// 商品详情
export const goodsInfo = (query) => request({
    url: '/client/shop/goods/info',
    method: 'post',
    data: (query || {}),
});
// 联系客服-发送邮件
export const sendEmail = (query) => request({
    url: '/client/h/cs/send',
    method: 'post',
    data: (query || {}),
});
// 取消测评申请
export const cancelOrder = (query) => request({
    url: '/client/h/order/cancel',
    method: 'post',
    data: (query || {}),
});
// 测评申请
export const applyOrder = (query) => request({
    url: '/client/h/order/apply',
    method: 'post',
    data: (query || {}),
});
// 提交订单号
export const submitOrderSn = (query) => request({
    url: '/client/h/order/sn',
    method: 'post',
    data: (query || {}),
});
// 提交评论截图
export const submitOrderShot = (query) => request({
    url: '/client/h/order/screenshots',
    method: 'post',
    data: (query || {}),
});
// 删除订单
export const deleteOrder = (query) => request({
    url: '/client/h/order/delete',
    method: 'post',
    data: (query || {}),
});
// 测评订单列表
export const orderList = (query) => request({
    url: '/client/h/order/list',
    method: 'post',
    data: (query || {}),
});

// 收藏商品
export const collectionGoods = (query) => request({
    url: '/client/shop/collection/create',
    method: 'post',
    data: (query || {}),
});
// 收藏列表
export const collectionList = (query) => request({
    url: '/client/shop/collection/list',
    method: 'post',
    data: (query || {}),
});
// 取消收藏
export const collectionDel = (query) => request({
    url: '/client/shop/collection/delete',
    method: 'post',
    data: (query || {}),
});


// 修改登录密码
export const modifyPass = (query) => request({
    url: '/client/member/update/password',
    method: 'post',
    data: (query || {}),
});
// 校验登录密码
export const checkPass = (query) => request({
    url: '/client/member/check/password',
    method: 'post',
    data: (query || {}),
});
// 修改支付密码
export const modifyPay = (query) => request({
    url: '/client/member/update/pay_password',
    method: 'post',
    data: (query || {}),
});
// 获取校验账号的验证码 修改支付密码那用到
export const getCode = (query) => request({
    url: '/client/member/info/verify_code',
    method: 'post',
    data: (query || {}),
});
// 授权登录
export const login = (query) => request({
    url: '/client/member/auth/login',
    method: 'post',
    data: (query || {}),
});
// 注册并登录
export const register = (query) => request({
    url: '/client/member/auth/register',
    method: 'post',
    data: (query || {}),
});
// 商家入驻申请
export const merchantApply = (query) => request({
    url: '/client/h/merchant/apply',
    method: 'post',
    data: (query || {}),
});
// 找回密码时验证码校验接口
export const getResetPasswordCode = (query) => request({
    url: '/client/member/auth/check',
    method: 'post',
    data: (query || {}),
});
// 找回密码
export const resetPassword = (query) => request({
    url: '/client/member/auth/reset',
    method: 'post',
    data: (query || {}),
});
// 提交修改亚马逊链接
export const profileLink = (query) => request({
    url: '/client/member/update/profile_link',
    method: 'post',
    data: (query || {}),
});
// 获取个人信息
export const userInfo = (query) => request({
    url: '/client/member/info/data',
    method: 'post',
    data: (query || {}),
});
// 新增收货地址
export const addressAdd = (query) => request({
    url: '/client/member/address/create',
    method: 'post',
    data: (query || {}),
});
// 收货地址列表
export const addressList = (query) => request({
    url: '/client/member/address/list',
    method: 'post',
    data: (query || {}),
});
// 收货地址详情
export const addressInfo = (query) => request({
    url: '/client/member/address/info',
    method: 'post',
    data: (query || {}),
});
// 收货地址编辑
export const addressEdit = (query) => request({
    url: '/client/member/address/update',
    method: 'post',
    data: (query || {}),
});
// 设置默认地址
export const addressDefault = (query) => request({
    url: '/client/member/address/default',
    method: 'post',
    data: (query || {}),
});
// 删除收货地址
export const addressDelete = (query) => request({
    url: '/client/member/address/delete',
    method: 'post',
    data: (query || {}),
});
// 我的钱包
export const accountInfo = (query) => request({
    url: '/client/h/account/info',
    method: 'post',
    data: (query || {}),
});
// 申请提现
export const accountWithdrawal = (query) => request({
    url: '/client/h/account/withdrawal',
    method: 'post',
    data: (query || {}),
});
// 提现记录
export const accountLogRecord = (query) => request({
    url: '/client/h/account/withdrawal_log',
    method: 'post',
    data: (query || {}),
});
// 收支明细
export const accountLogInOut = (query) => request({
    url: '/client/member/account/log',
    method: 'post',
    data: (query || {}),
});
// 帮助中心-提交反馈信息
export const feedbackCreate = (query) => request({
    url: '/client/article/feedback/create',
    method: 'post',
    data: (query || {}),
});
// 常见问题列表
export const questionList = (query) => request({
    url: '/client/h/question/list',
    method: 'post',
    data: (query || {}),
});
// 常见问题详情浏览
export const questionInfo = (query) => request({
    url: '/client/h/question/info',
    method: 'post',
    data: (query || {}),
});
// 精选推送列表
export const pushList = (query) => request({
    url: '/client/h/push/list',
    method: 'post',
    data: (query || {}),
});
// 精选推送详情
export const pushInfo = (query) => request({
    url: '/client/h/push/info',
    method: 'post',
    data: (query || {}),
});
// 分享记录列表
export const shareList = (query) => request({
    url: '/client/h/share/list',
    method: 'post',
    data: (query || {}),
});
// 分享数据统计
export const shareInfo = (query) => request({
    url: '/client/h/share/info',
    method: 'post',
    data: (query || {}),
});
// 通知列表
export const noticeList = (query) => request({
    url: '/client/article/message/list',
    method: 'post',
    data: (query || {}),
});
