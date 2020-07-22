<template>
    <div class="order-list-item the-white">
        <van-cell-group :title="item.add_time" :border="false">
            <van-card>
                <van-image slot="thumb" :src="item.goods_img" @click="jumpToGoodsDetail(item.goods_id)"
                    width="100%"
                    height="100%"
                    lazy-load>
                </van-image>
                <div slot="title" class="the-ellipsis order-item-title">{{item.goods_title}}</div>
                <div slot="desc">
                    <div class="the-ellipsis order-item-desc">{{item.goods_abstract}}</div>
                    <div class="the-ellipsis order-item-uname">{{$lang.order.account}}：{{item.username}}</div>
                </div>
                <div slot="price">
                    <van-button v-if="item.status === 0"
                        :loading="btnLoading" round
                        size="small"
                        @click="handleCancelOrder(item.goods_id)">
                        {{$lang.order.cancel_btn}}
                    </van-button>
                    <van-button v-if="item.status === 8 || item.status === 9"
                        :loading="btnLoading" round
                        size="small"
                        @click="handleApply(item.goods_id)">
                        {{$lang.order.reapply_btn}}
                    </van-button>
                </div>
                <div slot="num" class="order-item-status">{{item.status_text}}</div>
            </van-card>
            <div v-if="!(item.status === 0)" class="order-item-bottom the-wall the-white">
                <!-- 已核对 -->
                <div v-if="item.status === 1">
                    <div class="status1">
                        <van-button size="small"
                            :loading="btnLoading" round
                            @click="handleCancelOrder(item.goods_id)">
                            {{$lang.order.cancel_btn}}
                        </van-button>
                        <van-button type="info" size="small" round
                            @click="handleSubmitSn(item.goods_id)">
                            {{$lang.order.submit_order}}
                        </van-button>
                    </div>
                </div>
                <!-- 待传图 -->
                <div v-if="item.status === 3" class="status3">
                    <div>
                        <van-icon name="info-o" color="#1989fa" size="0.48rem"></van-icon>
                        <div class="upload-desc">{{$lang.order.upload_desc}}</div>
                    </div>
                    <div>
                        <van-uploader v-model="filelist"
                            lazy-load :max-count="2"
                            :after-read="afterRead"
                            :before-delete="beforeDelete">
                        </van-uploader>
                        <van-button type="info" size="small"
                            class="upload-btn" round
                            :disabled="!couldBeUpload"
                            :loading="btnLoading"
                            @click="handleSubmitShot(item.goods_id)">
                            {{$lang.order.upload_text}}
                        </van-button>
                    </div>
                </div>
                <!-- 已完成 -->
                <div v-if="item.status === 7" class="status7">
                    <!-- <van-button size="small"
                        :loading="btnLoading" round
                        @click="handleDeleteOrder(item.goods_id)">
                        {{$lang.order.del_order}}
                    </van-button> -->
                    <div>{{`${$lang.order.return_deposit}${rebate}`}}</div>
                </div>
                <!-- 已失败 -->
                <div v-if="item.status === 8 || item.status === 9">
                    <div class="fail-reason">
                        {{`${$lang.order.fail}: ${item.remark}`}}
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-dialog v-model="submitSnShowPop" :title="$lang.order.submitSn_tip"
            show-cancel-button
            :confirm-button-text="$lang.common.confirmBtn"
            :cancel-button-text="$lang.common.cancelBtn"
            :confirm-button-color="confirmBtnColor"
            :before-close="submitSn">
            <van-field v-model="orderSn" ref="orderSnFocus"
                size="large"
                :error="fieldError"
                :placeholder="fieldPlaceHolder">
            </van-field>
        </van-dialog>
        <div v-show="overlayShow" class="overlay" @touchmove.prevent>
            <div class="overlay-tip">
                <van-loading color="#1989fa"></van-loading>
                <div style="margin-top: 10px;">Picture uploading</div>
            </div>
        </div>
    </div>
</template>

<script>
import { CellGroup, Card, Image as VanImage, Button, Uploader, Icon, Dialog, Field, Loading } from 'vant';
import { upload, submitOrderShot, cancelOrder, applyOrder, deleteOrder, submitOrderSn } from '../api/request';
export default {
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Uploader.name]: Uploader,
        [Card.name]: Card,
        [VanImage.name]: VanImage,
        [Icon.name]: Icon,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
        [Loading.name]: Loading,
    },
    computed: {
        rebate () {
            if (this.item.rebate) {
                return (this.item.rebate / 100).toFixed(2);
            } else {
                return '0.00';
            }
        },
        orderList () {
            return this.$store.state.order.orderList;
        },
        limit () {
            return this.$store.state.order.limit;
        },
        replace () {
            return this.$store.state.order.replace;
        },
    },
    props: {
        item: {
            type: Object,
            default: function () {return {};},
        },
    },
    watch: {
        'submitSnShowPop' () {
            if (this.submitSnShowPop) {
                this.$nextTick(() => {
                    this.$refs.orderSnFocus.focus();
                });
            }
        },
        'orderSn' () {
            if (this.orderSn !== '') {
                this.confirmBtnColor = '#1989fa';
            } else {
                this.confirmBtnColor = '';
            }
        },
        '$store.state.status' () {
            const delIndex = this.delPage * this.limit - this.limit; // 删除页数的起始位
            const arr = [...this.orderList];
            arr.splice(delIndex, this.orderList.length - delIndex, ...this.replace);
            this.$store.commit('order/setOrderListNoConcat', arr);
        },
    },
    data () {
        return {
            filelist: [],
            couldBeUpload: false,
            btnLoading: false,
            submitSnShowPop: false,
            shotsId: '',
            orderSn: '',
            goodsId: 0,
            confirmBtnColor: '',
            fieldError: false,
            fieldPlaceHolder: '',
            delPage: 0,
            overlayShow: false,
        };
    },
    methods: {
        afterRead (file) {
            const uploadParams = {
                block: 'client',
                type: 'base64',
                file_content: file.content,
            };
            this.overlayShow = true;
            upload(uploadParams).then((res) => {
                this.couldBeUpload = true;
                this.overlayShow = false;
                if (this.shotsId) {
                    this.shotsId = `${this.shotsId},${res.data.file_id}`;
                } else {
                    this.shotsId = `${res.data.file_id}`;
                }
            })
                .catch(() => {
                    this.overlayShow = false;
                    this.filelist.pop();
                    if (this.shotsId === '') {this.couldBeUpload = false;}
                });
        },
        beforeDelete (file) {
            this.filelist.forEach((item, index) => {
                if (item === file) {
                    let arr = this.shotsId.split(',');
                    arr.splice(index, 1);
                    this.shotsId = arr.join(',');
                }
            });
            if (this.shotsId === '') {this.couldBeUpload = false;}
            return true;
        },
        handleSubmitShot (goodsId) {
            this.btnLoading = true;
            submitOrderShot({goods_id: goodsId, images: this.shotsId})
                .then(() => {
                    this.filelist = [];
                    this.shotsId = '';
                    this.btnLoading = false;
                    this.$toast(this.$lang.common.submit_succ);
                    this.handleRefresh(goodsId);
                })
                .catch(() => {
                    this.filelist = [];
                    this.shotsId = '';
                    this.btnLoading = false;
                });

        },
        handleDeleteOrder (goodsId) {
            Dialog.confirm({
                title: this.$lang.common.isDelete,
                confirmButtonText: this.$lang.common.confirmBtn,
                cancelButtonText: this.$lang.common.cancelBtn,
            }).then(() => {
                this.btnLoading = true;
                deleteOrder({goods_id: goodsId}).then(() => {
                    this.btnLoading = false;
                    this.$toast(this.$lang.common.delete_succ);
                    this.handleRefresh(goodsId);
                })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            });
        },
        handleCancelOrder (goodsId) {
            Dialog.confirm({
                title: this.$lang.common.isCancel,
                confirmButtonText: this.$lang.common.confirmBtn,
                cancelButtonText: this.$lang.common.cancelBtn,
            }).then(() => {
                this.btnLoading = true;
                cancelOrder({goods_id: goodsId}).then(() => {
                    this.btnLoading = false;
                    this.$toast(this.$lang.order.cancelled);
                    this.handleRefresh(goodsId);
                })
                    .catch(() => {
                        this.btnLoading = false;
                    });
            });
        },
        handleSubmitSn (goodsId) {
            this.goodsId = goodsId;
            this.submitSnShowPop = true;
        },
        submitSn (action, done) {
            if (action === 'confirm') {
                if (this.orderSn === '') {
                    this.fieldPlaceHolder = 'OrderId is Required';
                    this.fieldError = true;
                    done(false);
                } else {
                    submitOrderSn({goods_id: this.goodsId, order_sn: this.orderSn})
                        .then(() => {
                            this.$toast(this.$lang.common.submit_succ);
                            this.fieldPlaceHolder = '';
                            this.fieldError = false;
                            this.orderSn = '';
                            done();
                        })
                        .catch(() => {
                            this.fieldPlaceHolder = '';
                            this.fieldError = false;
                            this.orderSn = '';
                            done();
                        });
                }
            } else {
                done();
                this.fieldPlaceHolder = '';
                this.fieldError = false;
                this.orderSn = '';
            }
        },
        handleApply (goodsId) {
            this.btnLoading = true;
            applyOrder({goods_id: goodsId}).then(() => {
                this.btnLoading = false;
                this.$toast(this.$lang.order.reapply_succ);
                this.handleRefresh(goodsId);
            })
                .catch((err) => {
                    this.btnLoading = false;
                    if (err && err === 20002) {
                        this.$router.push('/amazon-profile');
                    }
                });
        },
        handleRefresh (goodsId) {
            const arr = [...this.orderList];
            arr.forEach((item, index, array) => {
                if (item.goods_id === goodsId) {
                    this.delPage = Math.ceil((index + 1) / this.limit);
                    this.$store.commit('order/setPage', this.delPage);
                    this.$store.dispatch('order/handleGetOrderList', true);
                    return;
                }
            });
        },
        jumpToGoodsDetail (goodsId) {
            this.$router.push({
                path: '/goodsdetail',
                query: {goods_id: goodsId},
            });
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
    margin-bottom: 0;
}
/deep/ .van-button--default {
    color: #999999;
}
/deep/ .van-button--small {
    min-width: 90px;
}
/deep/ .van-loading__text {
    color: #1989fa;
}
.order-list-item {
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    /deep/ .van-card__thumb {
        width: 110px;
        height: 110px;
        & img {
            border-radius: 0;
        }
    }
    /deep/ .van-card__bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .order-item-title {
        font-size: 18px;
    }
    .order-item-desc {
        font-size: 14px;
        color: #999999;
        margin-bottom: 10px;
    }
    .order-item-uname {
        font-size: 13px;
        color: #999999;
    }
    .order-item-status {
        font-size: 16px;
        color: @main_blue;
    }
    .order-item-bottom {
        & > div {
            box-sizing: border-box;
            padding-top: 10px;
            padding-bottom: 10px;
            border-top: 1px solid #eeeeee;
            /deep/ .van-button--small:not(:last-child) {
                margin-right: 10px;
            }
        }
        .status1 {
            display: flex;
            justify-content: flex-end;
        }
        .status3 {
            & > div:first-child {
                display: flex;
                align-items: center;
                margin-bottom: 5px;
            }
            & > div:last-child {
                height: 80px;
                position: relative;
                .upload-btn {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
            .upload-desc {
                font-size: 13px;
                color: #999999;
                margin-left: 5px;
            }
        }
        .status7 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > div {
                font-size: 13px;
            }
        }
        .fail-reason {
            font-size: 13px;
        }
    }
}
.overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    .overlay-tip {
        width: 40vw;
        height: 40vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 20px;
        font-size: 13px;
        color: #ffffff;
    }
}
</style>
