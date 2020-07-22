<template>
    <div v-if="isDone" class="bg-gray">
        <no-data v-if="!list.length"></no-data>
        <van-list v-else
            v-model="$store.state.notic.loading"
            :finished="$store.state.notic.finished"
            :immediate-check="false"
            finished-text="No more"
            @load="onLoad">
            <template v-for="(item, i) of list">
                <div :key="i" class="push-item">
                    <div v-if="i === 0 || list[i].add_time !== list[i-1].add_time" class="item-add-time">{{item.add_time}}</div>
                    <div class="item-info">
                        <div class="item-info-text">
                            <div class="item-info-title">{{item.title}}</div>
                            <div class="item-info-desc">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant';
import noData from '../components/NoDataComponent';
export default {
    components: {
        noData,
        [List.name]: List,
    },
    computed: {
        list () {
            return this.$store.state.notic.list;
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
        const typeSn = parseInt(this.$route.query.type_sn, 10);
        this.$store.commit('notic/setPage', 1);
        this.$store.commit('notic/setTypeSn', typeSn || 1);
        this.$store.commit('notic/setFinished', false);
        this.$store.commit('notic/setListNoConcat', []);
        this.$store.dispatch('notic/handleGetNoticeList');
    },
    data () {
        return {
            isDone: false,
        };
    },
    methods: {
        onLoad () {
            this.$store.dispatch('notic/handleGetNoticeList');
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
        padding: 5px 3px;
        background-color: #ffffff;
        overflow: hidden;
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
            line-height: 16px;
        }
    }
}
</style>
