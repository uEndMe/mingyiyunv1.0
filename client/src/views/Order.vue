<template>
    <div class="bg-gray">
        <div ref="nav" class="order-nav">
            <van-row type="flex" justify="space-between" class="row-style the-white the-wall">
                <van-col v-for="(item, i) of nav" :key="i"
                    :class="item.active ? 'active' : ''"
                    @click="handleNavClick(item)">
                    {{item.name}}
                </van-col>
            </van-row>
        </div>
        <div v-if="isDone" ref="list" class="order-list">
            <no-data v-if="!orderList.length"></no-data>
            <van-list v-else v-model="$store.state.order.loading"
                :finished="$store.state.order.finished"
                finished-text="No More"
                :immediate-check="false"
                @load="onLoad">
                <template v-for="(item, i) of orderList">
                    <order-item :key="i" :item="item"></order-item>
                </template>
            </van-list>
        </div>
    </div>
</template>

<script>
import { Row, Col, List } from 'vant';
import orderItem from '../components/OrderComponent';
import noData from '../components/NoDataComponent';
export default {
    components: {
        noData,
        orderItem,
        [Row.name]: Row,
        [Col.name]: Col,
        [List.name]: List,
    },
    computed: {
        status () {
            return this.$store.state.order.status;
        },
        orderList () {
            return this.$store.state.order.orderList;
        },
        isDone () {
            return this.$store.state.order.isDone;
        },
    },
    watch: {
        'status' () {
            this.$store.commit('order/setIsDone', false);
        },
        'isDone' () {
            if (this.isDone) {
                this.$nextTick(() => {
                    this.$refs.list.style.height = `${document.body.clientHeight - this.$refs.nav.offsetHeight}px`;
                });
            }
        },
    },
    created () {
        this.nav.forEach((item) => {
            item.active = 0;
            if (item.status === this.status) {
                item.active = 1;
            }
        });
        this.$store.commit('order/setPage', 1);
        this.$store.commit('order/setFinished', false);
        this.$store.commit('order/setOrderListNoConcat', []);
        this.$store.dispatch('order/handleGetOrderList');
    },
    data () {
        return {
            nav: [
                { name: 'All', active: 1, status: 'all' },
                { name: 'Applied', active: 0, status: '0' },
                { name: 'Checked', active: 0, status: '1' },
                { name: 'Upload', active: 0, status: '3' },
                { name: 'Completed', active: 0, status: '7' },
                { name: 'Failed', active: 0, status: '8' },
            ],
        };
    },
    methods: {
        handleNavClick (obj) {
            this.nav.forEach((item) => {
                item.active = 0;
                if (item.name === obj.name) {
                    item.active = 1;
                    this.$store.commit('order/setStatus', obj.status);
                    this.$store.commit('order/setPage', 1);
                    this.$store.commit('order/setOrderListNoConcat', []);
                    this.$store.commit('order/setLoading', true);
                    this.$store.commit('order/setFinished', false);
                    this.$store.dispatch('order/handleGetOrderList');
                }
            });
        },
        onLoad () {
            // this.$store.commit('order/setPage');
            this.$store.dispatch('order/handleGetOrderList');
        },
    },
};
</script>

<style lang="less" scoped>
.order-nav {
    font-size: 16px;
    color: #999999;
    padding-bottom: 10px;
    .row-style {
        padding-top: 10px;
        padding-bottom: 10px;
        .active {
            color: @main_blue;
            position: relative;
            &::after {
                content: '';
                display: block;
                height: 3px;
                width: 100%;
                border-radius: 10px;
                background-color: @main_blue;
                position: absolute;
                bottom: -10px;
            }
        }
    }
}
.order-list {
    overflow-y: scroll;
}
</style>
