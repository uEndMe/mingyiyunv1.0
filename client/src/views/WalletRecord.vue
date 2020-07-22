<template>
    <div v-if="done" class="bg-gray">
        <no-data v-if="!list.length"></no-data>
        <van-list v-else
            v-model="loading"
            :finished="finished"
            finished-text="No more"
            @load="onLoad">
            <van-cell v-for="(item, i) of list" :key="i" size="large">
                <div slot="title" class="item-flex">
                    <div class="item-name the-ellipsis">{{item.username}}</div>
                    <div class="item-money">{{item.money}}</div>
                </div>
                <div slot="label" class="item-flex">
                    <div>{{item.add_time}}</div>
                    <div>{{item.status_text}}</div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import noData from '../components/NoDataComponent';
import { List, Cell } from 'vant';
export default {
    components: {
        [Cell.name]: Cell,
        [List.name]: List,
        noData,
    },
    computed: {
        loading () {
            return this.$store.state.account.loading;
        },
        finished () {
            return this.$store.state.account.finished;
        },
        list () {
            return this.$store.getters['account/record'];
        },
        status () {
            return this.$store.state.status;
        },
    },
    watch: {
        'status' () {
            this.done = true;
        },
    },
    data () {
        return {
            done: false,
        };
    },
    methods: {
        onLoad () {
            this.$store.dispatch('account/handleGetRecord');
        },
    },
};
</script>

<style lang="less" scoped>
.item-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item-name {
    // flex: 1;
    max-width: 70%;
}
.item-money {
    font-size: 16px;
}
</style>
