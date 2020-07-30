<template>
    <div class="input-field">
        <van-field v-model="messageContent"
            center
            placeholder="说点什么吧~"
            size="large">
            <van-icon slot="left-icon" name="smile-o" size="0.7rem" color="#969799"></van-icon>
            <div slot="right-icon" class="right-icon">
                <van-icon name="chat-o" size="0.7rem" @click="sendMessage"></van-icon>
                <van-icon name="after-sale" size="0.7rem"></van-icon>
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
            messageContent: '',
        };
    },
    computed: {
        userInfo () {
            return this.$store.state.IM.userInfo;
        },
    },
    methods: {
        sendMessage () {
            window.scroll(0, 0)    //ios键盘回落
            if (this.messageContent === '' || this.messageContent.trim().length === 0) {
                this.messageContent = ''
                this.$toast('不能发送空消息哦！');
                return
            }
            let message = {
                payload:{
                    text: this.messageContent,
                },
                nick: this.userInfo.nick,
                avatar: this.userInfo.avatar,
                type: '',
                time: Date.now() / 1000,
            };

            this.$store.commit('IM/pushCurrentMessageList', message);
            this.tweblive.sendTextMessage({
                roomID: '@TGS#aIQX23TGC',
                priority: this.TWebLive.TYPES.MSG_PRIORITY_NORMAL,
                text: this.messageContent
            })
                .catch((error) => {
                    message.status = 'fail'
                    //JSON.stringify(error, ['message', 'code'])
                    if (error.code ===80001) {
                        this.$toast('文本中可能包含敏感词汇');
                    }
                })
            this.messageContent = '';
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
</style>
