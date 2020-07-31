<template>
    <div class="bg-gray">
        <div id="player" ref="player" class="player">
            <!-- <div ref="peo" class="peoples">
                <div></div>
                <div>2119人正在看</div>
            </div> -->
        </div>
        <div ref="chat">
            <div ref="liveTitle" class="live-title">
                <div>直播</div>
                <div>深圳市南山xx医院xxx教授临床学术讲座</div>
            </div>
            <div>
                <van-tabs v-model="tabActive"
                    @rendered="handleRendered"
                    :border="false">
                    <van-tab title="课程介绍">
                        <div ref="ditch" style="height: 0.26667rem;"></div>
                        <div ref="info" class="the-wall">
                            <van-card ref="follow">
                                <van-image slot="thumb" width="1.1rem" height="1.1rem" round
                                    src="https://img.yzcdn.cn/vant/cat.jpeg">
                                </van-image>
                                <div slot="title" class="live-info-title">xxx教授</div>
                                <div slot="desc" class="live-info-desc">深圳市宝安xxx机构医师</div>
                                <div slot="footer">
                                    <van-button round size="small">关注</van-button>
                                </div>
                            </van-card>
                            <div ref="introduce" class="scroll-region"></div>
                        </div>
                    </van-tab>
                    <van-tab title="听课聊天室">
                        <div ref="admin">
                            <im-Admin :data="admin"></im-Admin>
                        </div>
                        <div ref="member">
                            <im-member :data="currentMessageList"></im-member>
                        </div>
                        <im-field ref="input" :send-message="onSendMessage"></im-field>
                    </van-tab>
                    <van-tab title="产品橱窗">
                        <div ref="ditch" style="height: 0.26667rem;"></div>
                        <div ref="product" class="scroll-region">
                            <template v-for="(item, i) of products">
                                <product :key="i" :data="item"></product>
                            </template>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!-- <im-field ref="input" :send-message="onSendMessage"></im-field> -->
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex'
import product from '@/components/ProductComponent.vue';
import ImAdmin from '@/components/IMAdminComponent.vue';
import ImMember from '@/components/IMMemberComponent.vue';
import ImField from '@/components/IMInputComponent.vue';
import { Tab, Tabs, Image as VanImage, Card, Button } from 'vant';
import { getUrlKey,isValidFlv } from '@/utils/common';
import TWebLive from 'tweblive';
export default {
    components: {
        product,
        ImAdmin,
        ImMember,
        ImField,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [VanImage.name]: VanImage,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    computed: {
        ...mapState({
            currentMessageList: (state) => state.IM.currentMessageList,
            userInfo: (state) => state.IM.userInfo,
        }),
    },
    data () {
        return {
            tabActive: 0,
            products: [
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒速效救心丸40mg*60丸*3瓶/盒速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
            ],
            admin: [
                { id: 1, path: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '主讲' },
                { id: 2, path: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '主持人' },
                { id: 3, path: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '场控' },
                { id: 4, path: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '嘉宾' },
                { id: 5, path: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '嘉宾' },
            ],
            options: {
                flv: 'https://3891.liveplay.myqcloud.com/live/yqtest.flv',
                m3u8: 'https://3891.liveplay.myqcloud.com/live/yqtest.m3u8',
                autoplay: true,
                x5_type:'h5',
                width: '100%',
                height: '200',
                poster: {style:'cover', src:require('@/assets/images/video-bg.png')},
                pausePosterEnabled: false,
                wording: {
                    1:'主播不在，先在直播间聊聊天吧~ ',
                    2:'主播不在，先在直播间聊聊天吧~ ',
                    4:'主播不在，先在直播间聊聊天吧~ ',
                    13:'您观看的直播已结束',
                    2032: '请求视频失败，请检查网络',
                    2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
                },
            },
            tweblive: null,
            showInput: false,
        };
    },
    created() {
        // console.log(this.currentMessageList);
        let url = window.location.href
        let roomId  = getUrlKey('roomid',url);
        if(roomId) {
            this.$store.commit('setGroupId',roomId);
        }
        let flv = getUrlKey('flv',url)
        if(flv && isValidFlv(flv)) {
            let m3u8 = flv.replace('flv','m3u8')
            this.options.flv = flv
            this.options.m3u8 = m3u8
        }
    },
    mounted () {
        // 初始化监听器
        this.$nextTick(() => {
            const videoHeight = document.getElementById('player').clientHeight;
            let height = document.documentElement.clientHeight || document.body.clientHeight;
            if(videoHeight < height / 2) { //超过一半高度
                this.$refs.chat.style.height = height - videoHeight  + 'px';
            } else {
                this.$refs.chat.style.height = height - videoHeight  + 'px';
            }
        });
        this.initListener();
    },
    methods: {
        initListener () {
            const tweblive = new TWebLive({
                SDKAppID: 1400406517,
                domID: 'player',
                ...this.options
            });
            this.tweblive = tweblive;
            Vue.prototype.tweblive = tweblive;
            Vue.prototype.TWebLive = TWebLive;
            this.enterRoom()

            // // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
            this.tweblive.on(this.TWebLive.EVENT.IM_READY, () => {
                // console.log(this.TWebLive.EVENT.IM_READY);
            });
            // // 被踢出
            // this.tweblive.on(this.TWebLive.EVENT.KICKED_OUT, this.onKickedOut)
            // // SDK内部出错
            // this.tweblive.on(this.TWebLive.EVENT.ERROR, this.onError)
            // // 收到自定义新消息
            // this.tweblive.on(this.TWebLive.EVENT.CUSTOM_MESSAGE_RECEIVED, this.onCustomMessageReceived)
            // // 收到文本新消息
            this.tweblive.on(this.TWebLive.EVENT.TEXT_MESSAGE_RECEIVED, ({data: messageList}) => {
                messageList.forEach((item) => {
                    const userName = item.nick || item.from;
                    const avatar = item.avatar || this.userInfo.defaultImg;
                    item.nick = userName;
                    item.avatar = avatar;
                });
                this.$store.commit('IM/pushCurrentMessageList', messageList);
                console.log(messageList);
            });
            // // 加入直播间
            // this.tweblive.on(this.TWebLive.EVENT.REMOTE_USER_JOIN, this.onRemoteUserJoin)
            // // 离开直播间
            // this.tweblive.on(this.TWebLive.EVENT.REMOTE_USER_LEAVE, this.onRemoteUserLeave)
            // // 网络监测enterRoom
            // this.tweblive.on(this.TWebLive.EVENT.NET_STATE_CHANGE, this.onNetStateChange)
            // // 推流结束
            // this.tweblive.on(this.TWebLive.EVENT.ENDED, this.onLiveEnd);

            // 调用TIM SDK 登录接口
            this.tweblive.login({
                userID: 'demo01',
                userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwimpufkGhlCZ4pTsxIKCzBQlK0MTAwMTAzNTQ3OITGpFQWZRKlDc1NTUyMDAACJakpkLFrM0MzA0Nbc0hpqSmQ402MXROKw42NjAOzHAtdCosDIyykM7Ksgl0DwtN9LIxTvNOcktpdArwivVO9JWqRYAGNEwtA__',
            })
                .then(() => {
                    console.log('登录成功');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 加入直播间
        enterRoom() {
            this.tweblive.enterRoom('@TGS#aIQX23TGC').then(() => {
            this.isJoined = true
            })
            .catch((imError) => {
                console.log(imError);
                if(imError.code === 10007 || imError.code === 10015) {
                    this.$toast.fail('你加入的直播间不存在哦~')
                }
            });
        },
        onSendMessage () {
            console.log(123);
        },
        countHeihgt1 () {
            let part1 = this.$refs.player.offsetHeight;
            let part2 = this.$refs.liveTitle.offsetHeight;
            let part3 = document.getElementsByClassName('van-tabs__wrap')[0].offsetHeight;
            let part4 = this.$refs.ditch.offsetHeight;
            let part5 = this.$refs.follow.offsetHeight;
            let clientHeight = document.body.clientHeight;
            this.$refs.introduce.style.boxSizing = 'border-box';
            this.$refs.introduce.style.height = `${clientHeight - part1 - part2 - part3 - part4 - part5}px`;
        },
        countHeihgt2 () {
            let part1 = this.$refs.player.offsetHeight;
            let part2 = this.$refs.liveTitle.offsetHeight;
            let part3 = document.getElementsByClassName('van-tabs__wrap')[0].offsetHeight;
            let part4 = this.$refs.ditch.offsetHeight;
            let clientHeight = document.body.clientHeight;
            this.$refs.product.style.boxSizing = 'border-box';
            this.$refs.product.style.height = `${clientHeight - part1 - part2 - part3 - part4}px`;
        },
        countHeihgt3 () {
            let part1 = this.$refs.player.offsetHeight;
            let part2 = this.$refs.liveTitle.offsetHeight;
            let part3 = document.getElementsByClassName('van-tabs__wrap')[0].offsetHeight;
            let part4 = this.$refs.admin.offsetHeight;
            let part5 = this.$refs.input.$el.offsetHeight;
            let clientHeight = document.body.clientHeight;
            this.$refs.member.style.height = `${clientHeight - part1 - part2 - part3 - part4 - part5}px`;
        },
        handleRendered (name, title) {
            // 由于此时dom的渲染并未真正完成，元素高度值不准确，因此加个定时器等dom渲染完成后再执行高度赋值
            window.setTimeout(() => {
                if (title === '产品橱窗') {
                    this.countHeihgt2();
                } else if (title === '课程介绍') {
                    this.countHeihgt1();
                } else {
                    this.countHeihgt3();
                }
            }, 100);
        },
    },
};
</script>
<style lang="less" scoped>
/deep/ .van-card {
    padding-left: 0!important;
    padding-right: 0!important;
    padding-bottom: 15px;
    border-bottom: 1px solid @main_gray;
    .van-card__content {
        min-height: auto;
        // justify-content: center;
    }
    .van-card__thumb {
        width: auto;
        height: auto;
    }
    .van-card__footer {
        position: absolute;
        right: 0;
        top: 14px;
    }
    .live-info-title {
        font-size: 14px;
    }
    .live-info-desc {
        font-size: 11px;
        color: #999999;
    }
}
/deep/ .vcp-error-tips {
    font-size: 15px;
    color: #fff;
    margin-top: -4.25em;
}
/deep/ .van-tabs {
    position: static;
}

.player {
    position: relative;
    height: auto;
}
.peoples {
    padding-left: 10px;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 30px;
    background-color: rgba(0,0,0,.5);
    font-size: 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: #ffffff;
    & > div:first-child {
        width: 2.6vw;
        height: 2.6vw;
        margin-right: 8px;
        border-radius: 50%;
        background-color: @main_red;
    }
}
.live-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 15px 15px 0;
    padding-top: 15px;
    & > div:first-child {
        width: 35px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: rgba(223, 223, 223, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 11px;
        font-family: Arial;
        border: 1px solid rgba(187, 187, 187, 1);
        margin-right: 7px;
    }
}
.scroll-region {
    overflow-y: scroll;
    padding: 10px 0;
    -webkit-overflow-scrolling: touch; //解决ios手机页面滑动卡顿
    &::-webkit-scrollbar {
        display: none;
    }
}
.input-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
