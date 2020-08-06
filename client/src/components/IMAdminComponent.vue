<template>
    <div>
        <div class="im-top">
            <template v-for="(item, i) of data">
                <div :key="i" class="im-top-admin">
                    <van-image round
                        :src="item.path"
                        width="1.17333rem"
                        height="1.17333rem">
                    </van-image>
                    <div class="admin-name">{{item.title}}</div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { image as VanImage } from 'vant';
export default {
    components: {
        [VanImage.name]: VanImage,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
<style lang="less" scoped>
.im-top {
    padding: 10px 0 20px 0;
    display: flex;
    overflow-x: scroll;
    .im-top-admin {
        position: relative;
        padding: 0 5px 0 10px;
        .admin-name {
            position: absolute;
            left: 12px;
            bottom: -8px;
            width: 40px;
            text-align: center;
            font-size: 12px;
            color: @main_blue;
            white-space: nowrap;
            background-color: @main_gray;
            padding: 1px 0;
            border-radius: 16px;
        }
    }
}
</style>
