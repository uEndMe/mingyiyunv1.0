<template>
    <div class="bg-gray">
        <div class="goods-banner the-wall">
            <van-swipe ref="swipe" :autoplay="3000" :style="swipe_style" @change="onChange">
                <van-swipe-item v-for="(item, i) of swipeImage" :key="i">
                    <van-image :src="item" width="100%" height="100%" lazy-load>
                        <template v-slot:loading>
                            <van-icon name="photo-o" size="1rem"></van-icon>
                        </template>
                        <template v-slot:error>
                            <van-icon name="warning-o" size="1rem"></van-icon>
                        </template>
                    </van-image>
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">
                        {{show ? `${current + 1}/${swipeImage.length}` : '0/0'}}
                    </div>
                </template>
            </van-swipe>
        </div>
        <div v-show="show" class="goods-info the-white the-wall">
            <div>
                <div class="goods-price1" v-html="price"></div>
                <div class="goods-price2">
                    <div>{{$lang.goods.rebates}}</div>
                    <div>{{discount}}</div>
                </div>
            </div>
            <div>
                <van-image :src="require('../assets/images/goods_logo1.png')" lazy-load width="0.8rem"></van-image>
                <div class="gap"></div>
                <van-image :src="require('../assets/images/goods_logo2.png')" lazy-load width="0.8rem"></van-image>
            </div>
        </div>
        <div v-show="show" class="goods-descript the-wall the-white">
            <div class="goods-title">{{goodsInfo.title}}</div>
            <div class="goods-title">{{goodsInfo.abstract}}</div>
        </div>
        <div v-show="show" class="goods-process the-white">
            <my-title :title="$lang.goods.process"></my-title>
            <div class="goods-steps" @click="showSteps = !showSteps">
                {{$lang.goods.steps}}
                <van-icon :name="require('../assets/images/goods_steps_icon.png')" class="steps-icon"></van-icon>
            </div>
            <div class="goods-steps-image the-wall">
                <van-image :src="require('../assets/images/goods_steps.png')" lazy-load></van-image>
            </div>
        </div>
        <div v-show="show" class="goods-product-detail the-white">
            <my-title :title="$lang.goods.product_details"></my-title>
            <div ref="product" v-html="goodsInfo.content" class="goods-detail the-wall"></div>
        </div>
        <div v-if="!($route.query.type)" class="goods-btn the-wall">
            <div class="goods-apply the-white">
                <div>
                    <div>
                        <div @click="handleServiceClick">
                            <van-icon :name="require('../assets/images/goods_apply1.png')" size="0.53333rem"></van-icon>
                            <div>{{$lang.goods.service}}</div>
                        </div>
                        <div @click="handleCollet(goodsInfo.goods_id)">
                            <van-icon v-if="!isCollection" :name="require('../assets/images/goods_apply2.png')" size="0.53333rem"></van-icon>
                            <van-icon v-else :name="require('../assets/images/goods_apply2_fill.png')" size="0.53333rem"></van-icon>
                            <div>{{$lang.goods.wishlist}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <van-button type="info"
                        size="large"
                        :disabled="applyDisable"
                        :loading="applyLoading"
                        @click="applyBtnClick(goodsInfo.goods_id)">
                        {{applyBtnText}}
                    </van-button>
                </div>
            </div>
        </div>
        <van-popup v-model="showSteps" :lazy-render="false" round>
            <div class="steps-box">
                <h5 class="process-title">{{$lang.goods.participate}}</h5>
                <p class="process-content" v-html="$lang.goods.process_content"></p>
                <h5 class="process-title">{{$lang.goods.attention}}</h5>
                <p class="process-content" v-html="$lang.goods.attention_content"></p>
            </div>
        </van-popup>
    </div>
</template>

<script>
import myTitle from '../components/TitleComponent';
import { Swipe, SwipeItem, Image as VanImage, Icon, Button, Popup } from 'vant';
import { applyOrder, collectionGoods, collectionDel } from '../api/request';
export default {
    components: {
        myTitle,
        [SwipeItem.name]: SwipeItem,
        [Swipe.name]: Swipe,
        [Icon.name]: Icon,
        [VanImage.name]: VanImage,
        [Button.name]: Button,
        [Popup.name]: Popup,
    },
    computed: {
        goodsInfo () {
            return this.$store.state.goodsDetail.info;
        },
        applyStatus () {
            return Boolean(this.goodsInfo.apply_status);
        },
        collectStatus () {
            return Boolean(this.goodsInfo.collection_status);
        },
        price () {
            const price1 = ((this.goodsInfo.price || 0) / 100).toFixed(2);
            const arr = price1.toString().split('.');
            if (price1) {
                return `$<span style="font-size: 1.0666667rem;">${arr[0]}</span>.${arr[1]}`;
            } else {
                return '$<span style="font-size: 1.0666667rem;">0</span>.00';
            }
        },
        discount () {
            const discount = (this.goodsInfo.discount / 100).toFixed(2);
            if (discount) {
                return `$ ${discount}`;
            } else {
                return '$ 0.00';
            }
        },
        swipeImage () {
            const images = [];
            (this.goodsInfo.images || []).forEach((item) => {
                if (item !== '') {
                    images.push(item);
                }
            });
            return images;
        },
    },
    watch: {
        '$store.state.status' () {
            this.show = true;
            this.applyLoading = false;
            this.applyDisable = this.applyStatus;
            this.applyBtnText = this.applyStatus ? this.$lang.common.appliedBtn : this.$lang.common.applyBtn;
            this.isCollection = this.collectStatus;
        },
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.product.children.length !== 0) {
                // 商品详情图片大小
                this.$refs.product.getElementsByTagName('img').forEach((ele) => {
                    ele.style.width = '100%';
                });
            }
        });
    },
    mounted () {
        this.$nextTick(() => {
            this.swipe_style.height = `${this.$refs.swipe.$el.offsetWidth}px`;
        });
    },
    created () {
        this.$store.dispatch('goodsDetail/handleGetGoodsInfo', parseInt(this.$route.query.goods_id, 10));
    },
    data () {
        return {
            swipe_style: {
                width: '100%',
                height: '',
            },
            current: 0,
            show: false,
            showSteps: false,
            applyLoading: true,
            applyDisable: false,
            isCollection: false,
            applyBtnText: '',
        };
    },
    methods: {
        onChange (index) {
            this.current = index;
        },
        applyBtnClick (goodsId) {
            if (this.$route.query.code) {
                // sessionStorage.setItem('invita_code', this.$route.query.code);
                this.$router.push({
                    path: '/register',
                    query: {
                        code: this.$route.query.code,
                    },
                });
            } else if (!sessionStorage.getItem(this.$c.tokenKey)) {
                window.location.href = 'http://192.168.0.107/relogin';
            } else {
                this.applyLoading = true;
                applyOrder({goods_id: goodsId})
                    .then(() => {
                        this.$toast.success(this.$lang.common.apply_succ);
                        this.applyDisable = true;
                        this.applyBtnText = this.$lang.common.appliedBtn;
                        this.applyLoading = false;
                    })
                    .catch((err) => {
                        this.applyLoading = false;
                        if (err && err === 20002) {
                            this.$router.push({
                                path: '/amazon-profile',
                            });
                        }
                    });
            }
        },
        handleCollet (goodsId) {
            if (!sessionStorage.getItem(this.$c.tokenKey)) {
                window.location.href = 'http://192.168.0.107/relogin';
            } else if (this.isCollection) {
                collectionDel({goods_id: goodsId})
                    .then(() => {
                        this.isCollection = false;
                    });
            } else {
                collectionGoods({goods_id: goodsId})
                    .then(() => {
                        this.isCollection = true;
                    });
            }
        },
        handleServiceClick () {
            if (!sessionStorage.getItem(this.$c.tokenKey)) {
                window.location.href = 'http://192.168.0.107/relogin';
            } else {
                this.$router.push({
                    path: '/cs',
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
 .custom-indicator {
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 5px 0;
    width: 45px;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.3);
}
.goods-banner {
    & > div:first-child {
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
}
.goods-info {
    display: flex;
    margin-top: 20px;
    & > div {
        flex: 1;
    }
    & > div:first-child {
        display: flex;
        .goods-price1 {
            font-size: 20px;
            color: #e7645d;
            font-weight: 700;
            margin-right: 8px;
        }
        .goods-price2 {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            line-height: 18px;
            & > div:first-child {
                color: #999999;
            }
            & > div:last-child {
                font-size: 20px;
                font-weight: 700;
                white-space: nowrap;
            }
        }
    }
    & > div:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .gap {
            width: 10px;
        }
    }
}
.goods-descript {
    padding-top: 10px;
    padding-bottom: 10px;
    & > div:first-child {
        font-size: 18px;
        margin-bottom: 5px;
    }
    & > div:last-child {
        font-size: 14px;
        color: #999999;
    }
}
.goods-process {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 10px;
    .goods-steps {
        position: absolute;
        top: 0;
        right: 20px;
        height: 38px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999999;
        .steps-icon {
            margin-left: 5px;
        }
    }
    .goods-steps-image {
        margin-top: 20px;
    }
}
.goods-product-detail {
    padding-bottom: 60px;
    .goods-detail {
        font-size: 16px;
    }
}
.goods-btn {
    position: fixed;
    bottom: 10px;
    width: 100%;
    .goods-apply {
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        display: flex;
        overflow: hidden;
        height: 50px;
        & > div:first-child {
            width: 60%;
            & > div:first-child {
                height: 100%;
                display: flex;
                align-items: center;
                margin-left: 30px;
                & > div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #999999;
                    margin-right: 20px;
                    position: relative;
                    &:not(:last-child)::after {
                        content: '';
                        display: block;
                        width: 1px;
                        height: 100%;
                        background-color: #cccccc;
                        position: absolute;
                        right: -10px;
                        top: 0;
                    }
                    & > div:last-child {
                        margin-top: 3px;
                    }
                }
            }
        }
        & > div:last-child {
            width: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
.steps-box {
    box-sizing: border-box;
    width: 80vw;
    height: 80vh;
    padding: 15px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    .process-title {
        font-size: 16px;
        margin-bottom: 12px;
    }
    .process-content {
        font-size: 14px;
        color: #666666;
        &:not(:last-child) {
            margin-bottom: 24px;
            position: relative;
            ::after {
                content: '';
                display: block;
                width: 100%;
                height: 1px;
                background-color: #999999;
                position: absolute;
                bottom: -12px;
            }
        }
    }
}
</style>
