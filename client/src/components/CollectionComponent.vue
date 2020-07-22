<template>
    <div class="order-list-item the-white">
        <van-cell-group title="" :border="false">
            <van-card>
                <van-image slot="thumb" :src="item.img_path" @click="jumpToGoodsDetail(item.goods_id)"
                    width="100%"
                    height="100%"
                    error-icon="photo-o"
                    lazy-load>
                </van-image>
                <div slot="title" class="the-ellipsis order-item-title">{{item.goods_title}}</div>
                <div slot="desc">
                    <div class="the-ellipsis order-item-desc">{{item.abstract}}</div>
                    <div class="the-ellipsis order-item-uname">{{collectTime}}</div>
                </div>
                <div slot="price">
                    <div v-if="!(item.goods_status)" class="collect-take-off">{{$lang.collect.take_off}}</div>
                </div>
                <div slot="num" class="order-item-status">
                    <van-button v-if="item.goods_status"
                        type="info"
                        :disabled="item.apply_status ? true : false"
                        :loading="applyLoading" round
                        size="small"
                        @click="handleApply(item.goods_id)">
                        {{applyBtnText}}
                    </van-button>
                    <van-button
                        :loading="deleteLoading" round
                        size="small"
                        @click="handleDeleteCollect(item.goods_id)">
                        {{$lang.common.deleteBtn}}
                    </van-button>
                </div>
            </van-card>
        </van-cell-group>
    </div>
</template>

<script>
import { CellGroup, Card, Image as VanImage, Button, Dialog } from 'vant';
import { applyOrder, collectionDel } from '../api/request';
export default {
    components: {
        [CellGroup.name]: CellGroup,
        [VanImage.name]: VanImage,
        [Card.name]: Card,
        [Button.name]: Button,
        [Dialog.name]: Dialog,
    },
    props: {
        item: {
            type: Object,
            default: function () {return {};},
        },
    },
    computed: {
        applyBtnText () {
            return this.item.apply_status ? this.$lang.common.appliedBtn : this.$lang.common.applyBtn;
        },
        collectList () {
            return this.$store.state.collect.collectList;
        },
        limit () {
            return this.$store.state.collect.limit;
        },
        replace () {
            return this.$store.state.collect.replace;
        },
        collectTime () {
            return `${this.$lang.collect.time}: ${this.item.collection_time.slice(0, 10)}`;
        },
    },
    watch: {
        '$store.state.status' () {
            const delIndex = this.delPage * this.limit - this.limit; // 删除页数的起始位
            const arr = [...this.collectList];
            arr.splice(delIndex, this.collectList.length - delIndex, ...this.replace);
            this.$store.commit('collect/setCollectListNoConcat', arr);
        },
    },
    data () {
        return {
            applyLoading: false,
            deleteLoading: false,
            delPage: 0,
        };
    },
    methods: {
        jumpToGoodsDetail (goodsId) {
            if (this.item.goods_status) {
                this.$router.push({
                    path: '/goodsdetail',
                    query: {goods_id: goodsId},
                });
            } else {
                this.$toast(this.$lang.collect.take_off_tip);
            }
        },
        handleApply (goodsId) {
            this.applyLoading = true;
            applyOrder({goods_id: goodsId}).then(() => {
                this.applyLoading = false;
                this.$toast(this.$lang.common.apply_succ);
                this.$store.commit('order/setStatus', 'all');
                this.$router.push('/order');
            })
                .catch((err) => {
                    this.applyLoading = false;
                    if (err && err === 20002) {
                        this.$router.push('/amazon-profile');
                    }
                });
        },
        handleDeleteCollect (goodsId) {
            Dialog.confirm({
                title: this.$lang.common.isCancel,
                confirmButtonText: this.$lang.common.confirmBtn,
                cancelButtonText: this.$lang.common.cancelBtn,
            }).then(() => {
                this.deleteLoading = true;
                collectionDel({goods_id: goodsId}).then(() => {
                    this.deleteLoading = false;
                    this.$toast(this.$lang.common.delete_succ);
                    this.handleRefresh(goodsId);
                })
                    .catch(() => {
                        this.deleteLoading = false;
                    });
            });
        },
        handleRefresh (goodsId) {
            const arr = [...this.collectList];
            arr.forEach((item, index, array) => {
                if (item.goods_id === goodsId) {
                    this.delPage = Math.ceil((index + 1) / this.limit);
                    this.$store.commit('collect/setPage', this.delPage);
                    this.$store.dispatch('collect/handleGetCollectList', true);
                    return;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>

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
        & > button {
            margin-left: 10px;
        }
    }
    .collect-take-off {
        color: #ee0a24;
        font-size: 14px;
    }
}
</style>
