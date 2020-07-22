<template>
    <div v-if="done" class="bg-gray">
        <no-data v-if="!list.length"></no-data>
        <van-list v-else
            v-model="loading"
            :finished="finished"
            finished-text="No more"
            @load="onLoad">
            <van-cell v-for="(item, i) of list" :key="i" size="large">
                <div slot="title" class="the-ellipsis item-title">
                    {{item.remark}}
                </div>
                <div slot="label" class="item-flex">
                    <div>{{item.add_time}}</div>
                    <div :class="`${item.class} io-style`">{{`${item.io} ${item.amount}`}}</div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { List, Cell } from 'vant';
import noData from '../components/NoDataComponent';
export default {
    components: {
        noData,
        [Cell.name]: Cell,
        [List.name]: List,
    },
    computed: {
        loading () {
            return this.$store.state.account.loading;
        },
        finished () {
            return this.$store.state.account.finished;
        },
        list () {
            return this.$store.getters['account/expense'];
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
.item-title {
    // flex: 1;
    max-width: 70%;
}
.io-style {
    font-size: 16px;
    position: absolute;
    top: 25px;
    right: 20px;
}
.i-color {
    color: @main_blue;
}
.o-color {
    color: @main_red;
}
</style>
