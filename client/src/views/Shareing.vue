<template>
    <div v-if="isDone" class="bg-gray">
        <div ref="sp1" class="share-header">
            <div>{{$lang.share.income}}</div>
            <div>{{info.total}}</div>
        </div>
        <div ref="sp2" class="share-info">
            <div>
                <div>{{info.share_amount}}</div>
                <div>{{$lang.share.share_times}}</div>
            </div>
            <div>
                <div>{{info.invite_amount}}</div>
                <div>{{$lang.share.invitations}}</div>
            </div>
            <div>
                <div>{{info.profits}}</div>
                <div>{{$lang.share.commission}}</div>
            </div>
        </div>
        <div ref="sp3" class="gap"></div>
        <div class="share-group">
            <div ref="sp4" class="share-group-header">
                <van-row type="flex" justify="space-between">
                    <van-col span="6">{{$lang.share.user}}</van-col>
                    <van-col span="6">{{$lang.share.type}}</van-col>
                    <van-col span="6">{{$lang.share.time}}</van-col>
                    <van-col span="6">{{$lang.share.reward}}</van-col>
                </van-row>
            </div>
            <div ref="sp5" class="share-item-group">
                <no-data v-if="!list.length"></no-data>
                <van-list v-else
                    v-model="$store.state.share.loading"
                    :finished="$store.state.share.finished"
                    finished-text="No more"
                    :immediate-check="false"
                    @load="onLoad">
                    <template v-for="(item, i) of list">
                        <van-row :key="i" type="flex" justify="space-between" class="share-item">
                            <van-col class="the-ellipsis" span="6">{{item.username}}</van-col>
                            <van-col class="the-ellipsis" span="6">{{item.remark}}</van-col>
                            <van-col class="no-wrap" span="6">{{item.add_time}}</van-col>
                            <van-col class="light-red" span="6">{{item.amount}}</van-col>
                        </van-row>
                    </template>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import { Row, Col, List } from 'vant';
import noData from '../components/NoDataComponent';
export default {
    components: {
        noData,
        [Row.name]: Row,
        [Col.name]: Col,
        [List.name]: List,
    },
    computed: {
        info () {
            return this.$store.getters['share/info'];
        },
        list () {
            return this.$store.getters['share/list'];
        },
        status () {
            return this.$store.state.status;
        },
    },
    mounted () {
        // this.$nextTick(() => {
        //     const sp1 = this.$refs.sp1.offsetHeight;
        //     const sp2 = this.$refs.sp2.offsetHeight;
        //     const sp3 = this.$refs.sp3.offsetHeight;
        //     const sp4 = this.$refs.sp4.offsetHeight;
        //     this.$refs.sp5.style.height = `${document.body.clientHeight - sp1 - sp2 - sp3 - sp4}px`;
        // });
    },
    created () {
        this.$store.commit('share/setPage', 1);
        this.$store.commit('share/setFinished', false);
        this.$store.commit('share/setListNoConcat', []);
        this.$store.dispatch('share/handleGetShareList');
        this.$store.dispatch('share/handleGetShareInfo');
    },
    watch: {
        'status' () {
            this.isDone = true;
            this.$nextTick(() => {
                const sp1 = this.$refs.sp1.offsetHeight;
                const sp2 = this.$refs.sp2.offsetHeight;
                const sp3 = this.$refs.sp3.offsetHeight;
                const sp4 = this.$refs.sp4.offsetHeight;
                this.$refs.sp5.style.height = `${document.body.clientHeight - sp1 - sp2 - sp3 - sp4}px`;
            });
        },
    },
    data () {
        return {
            isDone: false,
        };
    },
    methods: {
        onLoad () {
            this.$store.dispatch('share/handleGetShareList');
        },
    },
};
</script>

<style lang="less" scoped>
.bg-gray {
    // overflow-y: hidden;
}
.share-group {
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 10px;
    .share-group-header {
        padding: @global_padding;
        padding-top: 10px;
        padding-bottom: 10px;
        // background-color: rgba(25, 137, 250, .3);
        background-color: #eeeeee;
        color: #666666;
        font-size: 16px;
    }
    .share-item-group {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch; //解决ios手机页面滑动卡顿
    }
    .share-item {
        padding: @global_padding;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #cccccc;
        position: relative;
        font-size: 14px;
        &:not(:last-child)::after {
            content: '';
            display: block;
            height: 1px;
            box-sizing: border-box;
            background-color: #cccccc;
            position: absolute;
            right: 20px;
            left: 20px;
            bottom: 0;
            transform: scaleY(.5);
        }
    }
}
.share-header {
    box-sizing: border-box;
    text-align: center;
    height: 100px;
    padding-top: 20px;
    background-color: @main_blue;
    font-size: 36px;
    color: #ffffff;
    & > div:first-child {
        font-size: 12px;
    }
}
.share-info {
    display: flex;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    background-color: #ffffff;
    & > div {
        width: 33.3333333333%;
    }
    & > div:not(:last-child) {
        &::after {
            content: '';
            width: 1px;
            // height: 100%;
            display: block;
            background-color: #999999;
            position: absolute;
            top: 10px;
            bottom: 10px;
        }
    }
    & > div:first-child::after {
        left: 33.3333333333%;
    }
    & > div:nth-child(2)::after {
        left: 66.6666666667%;
    }
    & > div > div:first-child {
        font-size: 20px;
    }
    & > div > div:last-child {
        font-size: 12px;
        color: #999999;
    }
}
.gap {
    height: 10px;
}
.no-wrap {
    white-space: nowrap;
}
.light-red {
    color: @main_red;
}
</style>
