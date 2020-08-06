<template>
    <div style="height: 100%;">
        <div class="talk-box the-wall" ref="message-list" @scroll="this.onScroll">
            <template v-for="(item, i) of data">
                <div v-if="!item.self" :key="i">
                    <div class="first-div">
                        <van-image round
                            :src="item.avatar"
                            width="1.12rem"
                            height="1.12rem">
                        </van-image>
                    </div>
                    <div class="second-div">
                        <div class="talk-who">{{item.nick}}</div>
                        <div class="talk-about">
                            <template v-for="(msg, index) of item.payloadText">
                                <span :key="index" v-if="msg.name === 'text'">{{msg.text}}</span>
                                <img v-else-if="msg.name === 'img'"
                                    :key="index"
                                    :src="msg.src"
                                    width="20px" height="20px" alt="" />
                                <van-image v-else-if="msg.name === 'photo'"
                                    :key="index"
                                    :src="msg.src"
                                    width="50%"
                                    @click="previewImage(msg.src)">
                                </van-image>
                            </template>
                        </div>
                    </div>
                </div>
                <div v-else :key="i" class="talk-item2">
                    <div class="first-div">
                        <div class="talk-who">{{item.nick}}</div>
                        <div class="talk-about" style="background-color: #67C23A">
                            <template v-for="(msg, index) of item.payloadText">
                                <span :key="index" v-if="msg.name === 'text'">{{msg.text}}</span>
                                <img v-else-if="msg.name === 'img'"
                                    :key="index"
                                    :src="msg.src"
                                    width="20px" height="20px" alt="" />
                                <van-image v-else-if="msg.name === 'photo'"
                                    lazy-load
                                    :key="index"
                                    :src="msg.src"
                                    width="50%"
                                    @click="previewImage(msg.src)">
                                    <van-loading v-if="item.payload.loading" slot="default" class="img-loading"></van-loading>
                                    <van-icon v-if="item.payload.isDone" name="fail" color="#ee0a24"></van-icon>
                                </van-image>
                            </template>
                        </div>
                    </div>
                    <div class="second-div">
                        <van-image round
                            :src="item.avatar"
                            width="1.12rem"
                            height="1.12rem">
                        </van-image>
                    </div>
                </div>
            </template>
            <div v-show="isShowScrollButtomTips" class="more-msg" @click="scrollBottom">
                <div>
                    <van-icon name="down" size="16px"></van-icon>
                    有更多的消息
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Image as VanImage, Icon, ImagePreview, Loading } from 'vant';
export default {
    components: {
        [VanImage.name]: VanImage,
        [Icon.name]: Icon,
        [Loading.name]: Loading,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        userInfo () {
            return this.$store.state.IM.userInfo;
        },
    },
    data () {
        return {
            preScrollHeight: 0,
            isShowScrollButtomTips: false,
        };
    },
    mounted () {
        this.$nextTick(() => {
            this.setTalkAboutStyle();
        });
    },
    updated () {
        this.keepMessageListOnButtom();
        this.$nextTick(() => {
            this.setTalkAboutStyle();
        });
    },
    methods: {
        onScroll ({ target: { scrollTop } }) {
            let messageListNode = this.$refs['message-list'];
            if (!messageListNode) {return;}
            if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                this.isShowScrollButtomTips = false;
            }
        },
        // 如果滚到底部就保持在底部，否则提示是否要滚到底部
        keepMessageListOnButtom () {
            let messageListNode = this.$refs['message-list'];
            if (!messageListNode) {
                return;
            }
            // 距离底部20px内强制滚到底部,否则提示有新消息
            if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
                this.$nextTick(() => {
                    messageListNode.scrollTop = messageListNode.scrollHeight + 20;
                });
                this.isShowScrollButtomTips = false;
            } else {
                this.isShowScrollButtomTips = true;
            }
            this.preScrollHeight = messageListNode.scrollHeight;
            // messageListNode.scroll(0, this.preScrollHeight);
        },
        scrollBottom () {
            let messageListNode = this.$refs['message-list'];
            messageListNode.scroll(0, this.preScrollHeight);
            this.isShowScrollButtomTips = false;
        },
        setTalkAboutStyle () {
            let talks = document.getElementsByClassName('talk-about');
            talks.forEach((item, index) => {
                if (item.offsetWidth < 190) {
                    item.style.textAlign = 'center';
                }
                let isPhoto = item.getElementsByClassName('van-image')[0];
                if (isPhoto) {
                    item.style.backgroundColor = 'unset';
                    item.style.border = 'none';
                    if (this.data[index].self) {
                        item.style.textAlign = 'right';
                    } else {
                        item.style.textAlign = 'left';
                    }
                }
            });
        },
        previewImage (img) {
            ImagePreview([img]);
        },
    },
};
</script>
<style lang="less" scoped>
.talk-box {
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    & > div {
        display: flex;
        padding: 5px 0;
    }
    .more-msg {
        box-sizing: border-box;
        width: 100%;
        justify-content: center;
        color: #ffffff;
        font-size: 12px;
        position: fixed;
        left: 0;
        bottom: 55px;
        & > div {
            background-color: rgba(255, 151, 106, .7);
            border-radius: 16px;
            padding: 5px 8px;
            display: flex;
            align-items: center;
        }
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
        max-width: 190Px;
        box-sizing: border-box;
        font-size: 12px;
        padding: 5px;
        border-radius: 16px;
        background-color: #ffffff;
        border: 1px solid @main_gray;
        margin-top: 5px;
        text-align: justify;
    }
}
/deep/ .img-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
/deep/ .van-icon-fail {
    position: absolute;
    top: 40%;
    left: -10px;
}
</style>
