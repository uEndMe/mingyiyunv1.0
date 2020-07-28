<template>
    <div style="height: 100%;">
        <div class="talk-box the-wall">
            <template v-for="(item, i) of data">
                <div v-if="!item.isSelf" :key="i" class="talk-item1">
                    <div class="first-div">
                        <van-image round
                            :src="item.path"
                            width="1.12rem"
                            height="1.12rem">
                        </van-image>
                    </div>
                    <div class="second-div">
                        <div class="talk-who">{{item.name}}</div>
                        <div class="talk-about">{{item.text}}</div>
                    </div>
                </div>
                <div v-else :key="i" class="talk-item2">
                    <div class="first-div">
                        <div class="talk-who">{{item.name}}</div>
                        <div class="talk-about" style="background-color: #67C23A">{{item.text}}</div>
                    </div>
                    <div class="second-div">
                        <van-image round
                            :src="item.path"
                            width="1.12rem"
                            height="1.12rem">
                        </van-image>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { image as VanImage } from 'vant';
import TWebLive from 'tweblive';
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
.talk-box {
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    & > div {
        display: flex;
        padding: 5px 0;
    }
    .talk-item2 {
        justify-content: flex-end;
        text-align: right;
    }
    .first-div {
        margin-right: 5px;
    }
    .talk-who {
        font-size: 14px;
    }
    .talk-about {
        max-width: 190px;
        box-sizing: border-box;
        font-size: 12px;
        padding: 6px;
        border-radius: 16px;
        background-color: #ffffff;
        border: 1px solid @main_gray;
        margin-top: 5px;
        text-align: justify;
    }
}
</style>
