<template>
    <div ref="field" class="input-field">
        <div v-show="showEmoji" class="emojis">
            <template v-for="item of emojiName">
                <div :key="item" style="padding: 2px;" @click.stop="chooseEmoji(item)">
                    <van-image
                        :src="`${emojiUrl}${emojiMap[item]}`"
                        width="30px" height="30px">
                    </van-image>
                </div>
            </template>
        </div>
        <van-field v-model="messageContent"
            center
            ref="input"
            placeholder="说点什么吧~"
            size="large"
            @keyup.enter="sendMessage"
            @focus="handleFocus">
            <van-icon slot="left-icon"
                name="smile-o"
                size="0.7rem"
                color="#969799"
                @click.stop="handleSelectEmoji">
            </van-icon>
            <div slot="right-icon" class="right-icon">
                <van-icon v-if="messageContent" name="chat-o" size="0.7rem" @click="sendMessage"></van-icon>
                <van-icon v-else name="add-o" size="0.7rem" @click.stop="testClick"></van-icon>
                <van-icon name="after-sale" size="0.7rem"></van-icon>
            </div>
        </van-field>
        <!-- <transition name="van-slide-up"> -->
        <div v-show="showTabs" class="select">
            <div class="select-item">
                <div>
                    <van-uploader>
                        <div class="select-item__item">
                            <van-icon name="photo-o" size="0.8rem" color="#969799"></van-icon>图片
                        </div>
                    </van-uploader>
                </div>
            </div>
        </div>
        <!-- </transition> -->
    </div>
</template>
<script>
import { Field, Image as VanImage, Icon, Uploader } from 'vant';
import { emojiMap, emojiName, emojiUrl } from '../utils/emojiMap';
export default {
    components: {
        [Field.name]: Field,
        [VanImage.name]: VanImage,
        [Icon.name]: Icon,
        [Uploader.name]: Uploader,
    },
    data () {
        return {
            messageContent: '',
            emojiMap,
            emojiName,
            emojiUrl,
            showEmoji: false,
            showTabs: false,
        };
    },
    computed: {
        userInfo () {
            return this.$store.state.IM.userInfo;
        },
    },
    mounted () {
        window.addEventListener('click', () => {
            this.showEmoji = false;
            this.showTabs = false;
        });
    },
    methods: {
        sendMessage () {
            window.scroll(0, 0); // ios键盘回落
            if (this.messageContent === '' || this.messageContent.trim().length === 0) {
                this.messageContent = '';
                this.$toast('不能发送空消息哦！');
                this.$refs.input.focus();
                console.log(this.$refs.input);
                return;
            }
            let message = {
                payload: {
                    text: this.messageContent,
                },
                nick: this.userInfo.nick,
                avatar: this.userInfo.avatar,
                time: Date.now() / 1000,
                self: true,
            };

            this.$store.commit('IM/pushCurrentMessageList', message);
            this.tweblive.sendTextMessage({
                roomID: '@TGS#aIQX23TGC',
                priority: this.TWebLive.TYPES.MSG_PRIORITY_NORMAL,
                text: this.messageContent,
            })
                .then(() => {return;})
                .catch((error) => {
                    message.status = 'fail';
                    // JSON.stringify(error, ['message', 'code'])
                    if (error.code === 80001) {
                        this.$toast('文本中可能包含敏感词汇');
                    }
                });
            this.messageContent = '';
            document.activeElement.blur();
        },
        chooseEmoji(item) {
            this.messageContent += item;
        },
        handleFocus () {
            // this.showEmoji = false;
            // let obj = Object.keys(navigator);
            // let arr = Object.keys(obj);
            // this.messageContent = document.activeElement.innerText;
        },
        handleSelectEmoji () {
            this.showTabs = false;
            this.showEmoji = !this.showEmoji;
        },
        testClick () {
            this.showTabs = !this.showTabs;
            this.showEmoji = false;
        },
    },
};
</script>
<style lang="less" scoped>
.input-field {
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid @main_gray;
    /deep/ .van-field__control {
        border: 1px solid @main_gray;
        border-radius: 16px;
        box-sizing: border-box;
        padding-left: 8px;
        padding-right: 8px;
        width: 65vw;
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
        /deep/ .van-icon:not(:last-child) {
            margin-right: 5px;
        }
    }
}
.emojis {
    position: absolute;
    left: 0;
    top: -192px;
    height: 190px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.select {
    width: 100%;
    height: 25vw;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    background-color: #ffffff;
    .select-item {
        box-sizing: border-box;
        display: inline-block;
        width: 25vw;
        height:25vw;
        & > div {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .select-item__item {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        }
    }
}
</style>
