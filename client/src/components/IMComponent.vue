<template>
    <div>
        <div class="im-top">
            <template v-for="item of 5">
                <div :key="item" class="im-top-admin">
                    <van-image round
                        width="1.17333rem"
                        height="1.17333rem">
                    </van-image>
                    <div class="admin-name">嘉宾</div>
                </div>
            </template>
        </div>
        <div class="talk-box the-wall">
            <div class="talk-item">
                <div>
                    <van-image round
                        width="1.12rem"
                        height="1.12rem">
                    </van-image>
                </div>
                <div>
                    <div class="talk-who">xxx教授 主持人</div>
                    <div class="talk-about">xx教授首先通过示意图、小视频等生动形象地和大家介绍了新一代的高通量测序技术</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { image as VanImage } from 'vant';
export default {
    components: {
        [VanImage.name]: VanImage,
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
.talk-box {
    .talk-item {
        display: flex;
        & > div:first-child {
            margin-right: 5px;
        }
        & > div:last-child {
            width: 190px;
        }
        .talk-who {
            font-size: 14px;
        }
        .talk-about {
            box-sizing: border-box;
            font-size: 12px;
            padding: 10px;
        }
    }
}
</style>
