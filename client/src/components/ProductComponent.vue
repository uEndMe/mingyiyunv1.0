<template>
    <div class="the-wall product-box">
        <div>
            <van-image width="2.2rem" height="1.63rem"></van-image>
            <div class="product-info">
                <div>{{data.title}}</div>
                <div>
                    <div>{{price}}</div>
                    <div>{{original}}</div>
                    <div>{{data.buyers}}人购买</div>
                    <van-button size="mini">购买</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Image as VanImage, Button } from 'vant';
export default {
    components: {
        [VanImage.name]: VanImage,
        [Button.name]: Button,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        currency: {
            type: String,
            default: '¥',
        },
    },
    computed: {
        price () {
            return `${this.currency}${(this.data.price / 100).toFixed(0)}`;
        },
        original () {
            return `${this.currency}${(this.data.original / 100).toFixed(0)}`;
        },
    },
};
</script>
<style lang="less" scoped>
.product-box {
    font-size: 14px;
    & > div {
        display: flex;
        align-items: center;
        padding-top: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid @main_gray;
        .product-info {
            height: 1.63rem;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > div:last-child {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
