<template>
    <div class="bg-gray">
        <div ref="player" class="player">
            <video ref="video" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                controls
                width="100%">
            </video>
            <div ref="peo" class="peoples">
                <div></div>
                <div>2119人正在看</div>
            </div>
        </div>
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
                        <im-member :data="member"></im-member>
                    </div>
                    <im-field ref="input"></im-field>
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
</template>
<script>
import product from '@/components/ProductComponent.vue';
import ImAdmin from '@/components/IMAdminComponent.vue';
import ImMember from '@/components/IMMemberComponent.vue';
import ImField from '@/components/IMInputComponent.vue';
import { Tab, Tabs, Image as VanImage, Card, Button } from 'vant';
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
            member: [
                { id: 1, path: 'https://img.yzcdn.cn/vant/cat.jpeg', name: 'xxx教授', type: '主持人', text: 'xx教授首先通过示意图、小视频等生动形象地和大家介绍了新一代的高通量测序技术', isSelf: false },
                { id: 2, path: 'https://img.yzcdn.cn/vant/cat.jpeg', name: 'xxx教授', type: '主持人', text: 'xx教授首先通过示意图、小视频等生动形象地和大家介绍了新一代的高通量测序技术', isSelf: false },
                { id: 3, path: 'https://img.yzcdn.cn/vant/cat.jpeg', name: 'xxx教授', type: '', text: '作为世界首创“头针”创始人焦顺发的传承人，继承“头针”学术精髓', isSelf: true },
                { id: 4, path: 'https://img.yzcdn.cn/vant/cat.jpeg', name: 'xxx教授', type: '', text: '作为世界首创', isSelf: false },
            ],
            test: 0,
        };
    },
    mounted () {
        window.setTimeout(() => {
            this.$refs.player.style.height = `${this.$refs.video.offsetHeight}px`;
        }, 100);
    },
    methods: {
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
</style>
