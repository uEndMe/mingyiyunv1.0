<template>
    <div class="input-field">
        <van-field v-model="field"
            center
            size="large">
            <van-icon slot="left-icon" name="comment-o" size="0.53333rem" color="#969799"></van-icon>
            <div slot="right-icon" class="right-icon">
                <svg-icon icon-name="发送"></svg-icon>
                <van-icon name="after-sale" size="0.53333rem"></van-icon>
            </div>
        </van-field>
    </div>
</template>
<script>
import { Field, Icon } from 'vant';
export default {
    components: {
        [Field.name]: Field,
        [Icon.name]: Icon,
    },
    data () {
        return {
            field: '',
        };
    },
};
</script>
<style lang="less" scoped>
.input-field {
    width: 100%;
    position: absolute;
    border-top: 1px solid @main_gray;
    /deep/ .van-field__control {
        border: 1px solid @main_gray;
        border-radius: 16px;
        box-sizing: border-box;
        padding-left: 5px;
        width: 70vw;
        height: 32px;
    }
    /deep/ .van-cell--large {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .right-icon {
        height: inherit;
        display: flex;
        font-size: 20px;
        /deep/ .clss {
            margin-right: 10px;
        }
    }
}
</style>
