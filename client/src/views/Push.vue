<template>
    <div v-if="isDone" class="bg-gray">
        <van-list
            v-model="$store.state.push.loading"
            :finished="$store.state.push.finished"
            finished-text="No more"
            :immediate-check="false"
            @load="onLoad">
            <template v-for="(item, i) of list">
                <div :key="i" class="push-item" @click="handleToPushDetail(item.push_id)">
                    <div class="item-add-time">{{item.add_time}}</div>
                    <div class="item-info">
                        <div class="item-info-image" v-lazy:background-image="item.img_path"></div>
                        <div class="item-info-text">
                            <div class="item-info-title">{{item.title}}</div>
                            <div class="item-info-desc">{{item.abstract}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant';
export default {
    components: {
        [List.name]: List,
    },
    computed: {
        list () {
            return this.$store.state.push.list;
        },
        status () {
            return this.$store.state.status;
        },
    },
    watch: {
        'status' () {
            this.isDone = true;
        },
    },
    created () {
        this.$store.commit('push/setPage', 1);
        this.$store.commit('push/setFinished', false);
        this.$store.commit('push/setListNoConcat', []);
        this.$store.dispatch('push/handleGetPushList');
    },
    data () {
        return {
            isDone: false,
        };
    },
    methods: {
        onLoad () {
            this.$store.dispatch('push/handleGetPushList');
        },
        handleToPushDetail (pid) {
            this.$store.dispatch('push/handleGetPushInfo', pid);
            this.$router.push({
                path: '/push-detail',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.push-item {
    margin-top: 10px;
    padding: @global_padding;
    .item-add-time {
        font-size: 14px;
        color: #ffffff;
        width: 100px;
        height: 25px;
        line-height: 25px;
        border-radius: 25px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 10px;
        background-color: #666666;
        opacity: 0.35;
    }
    .item-info {
        border-radius: 16px;
        height: 271px;
        background-color: #ffffff;
        overflow: hidden;
    }
    .item-info-image {
        height: 170px;
        background-size: cover;
    }
    .item-info-text {
        padding: 10px 8px;
        overflow: hidden;
        .item-info-title {
            font-size: 20px;
            color: #666666;
            margin-bottom: 3px;
            white-space: nowrap;
            overflow-x: scroll;
        }
        .item-info-desc {
            font-size: 16px;
            color: #999999;
        }
    }
}
</style>
