<template>
    <div class="bg">
        <div ref="player" class="player">
            <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)"
                @canplaythrough="onPlayerCanplaythrough($event)"
                @statechanged="playerStateChanged($event)"
                @ready="playerReadied">
            </video-player>
            <div class="peoples">
                <div></div>
                <div>2119人正在看</div>
            </div>
        </div>
        <div ref="liveTitle" class="live-title">
            <div>直播</div>
            <div>深圳市南山xx医院xxx教授临床学术讲座</div>
        </div>
        <div>
            <van-tabs v-model="tabActive" :border="false">
                <van-tab title="课程介绍">
                    <div ref="ditch" style="height: 0.53333rem;"></div>
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
                        <div ref="introduce" class="introduce"></div>
                    </div>
                </van-tab>
                <van-tab title="听课聊天室"></van-tab>
                <van-tab title="产品橱窗">
                    <div ref="product">
                        <template v-for="(item, i) of products">
                            <product :key="i" :data="item"></product>
                        </template>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player';
import product from '@/components/ProductComponent.vue';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { Tab, Tabs, Image as VanImage, Card, Button } from 'vant';
export default {
    components: {
        videoPlayer,
        product,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [VanImage.name]: VanImage,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    mounted () {
        this.$nextTick(() => {
            this.countHeihgt1();
            this.countHeihgt2();
        })
    },
    data () {
        return {
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: true, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto',
                // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。
                // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9',
                // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。
                // 值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true,
                // 当fluid为true时，Video.js player将拥有流体大小。
                // 换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: 'video/mp4',
                    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                // 你的视频地址（必填）
                }],
                poster: '', // 你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true, // 全屏按钮
                },
            },
            tabActive: 0,
            products: [
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
                { title: '【松柏】速效救心丸40mg*60丸*3瓶/盒', price: 4900, original: 6900, buyers: 322 },
            ],
        };
    },
    methods: {
        // 播放事件
        onPlayerPlay () { },
        // 暂停事件
        onPlayerPause () { },
        // 播放结束事件
        onPlayerEnded () {},
        onPlayerWaiting () {},
        onPlayerPlaying () {},
        onPlayerLoadeddata () {},
        onPlayerTimeupdate () {},
        onPlayerTimeupdate () {},
        onPlayerCanplay () {},
        onPlayerCanplaythrough () {},
        playerStateChanged () {},
        playerReadied (player) {
            console.log('the player is readied', player);
        // you can use it to do something...
        // player.[methods]
        },
        countHeihgt1 () {
            let part1 = this.$refs.player.offsetHeight;
            let part2 = this.$refs.liveTitle.offsetHeight;
            let part3 = document.getElementsByClassName('van-tabs__wrap')[0].offsetHeight;
            let part4 = this.$refs.ditch.offsetHeight;
            let part5 = this.$refs.follow.offsetHeight;
            let clientHeight = document.body.clientHeight;
            this.$refs.introduce.style.boxSizing = 'border-box';
            this.$refs.introduce.style.padding = '0.26667rem 0 0';
            this.$refs.introduce.style.height = `${clientHeight - part1 - part2 - part3 - part4 - part5}px`;
        },
        countHeihgt2 () {
            let part1 = this.$refs.player.offsetHeight;
            let part2 = this.$refs.liveTitle.offsetHeight;
            let part3 = document.getElementsByClassName('van-tabs__wrap')[0].offsetHeight;
            let clientHeight = document.body.clientHeight;
            this.$refs.product.style.boxSizing = 'border-box';
            this.$refs.product.style.paddingBottom = '0.26667rem';
            this.$refs.product.style.overflowY = 'scroll';
            this.$refs.product.style.height = `${clientHeight - part1 - part2 - part3}px`;
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

.player {
    position: relative;
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
.introduce {
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
