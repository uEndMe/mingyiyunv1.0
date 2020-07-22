<template>
    <div v-if="isDone" class="bg-gray collect">
        <no-data v-if="!collectList.length"></no-data>
        <van-list v-model="$store.state.collect.loading"
            :finished="$store.state.collect.finished"
            finished-text="No More"
            :immediate-check="false"
            @load="onLoad">
            <template v-for="(item, i) of collectList">
                <collect-item :key="i" :item="item"></collect-item>
            </template>
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant';
import collectItem from '../components/CollectionComponent';
import noData from '../components/NoDataComponent';
export default {
    components: {
        noData,
        collectItem,
        [List.name]: List,
    },
    computed: {
        collectList () {
            return this.$store.state.collect.collectList;
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
        this.$store.commit('collect/setPage', 1);
        this.$store.commit('collect/setFinished', false);
        this.$store.commit('collect/setCollectListNoConcat', []);
        this.$store.dispatch('collect/handleGetCollectList');
        // console.log(sessionStorage.getItem(this.$c.tokenKey));
    },
    data () {
        return {
            isDone: false,
        };
    },
    methods: {
        onLoad () {
            // console.log(1);
            // this.$store.commit('collect/setPage');
            this.$store.dispatch('collect/handleGetCollectList');
        },
    },
};
</script>

<style lang="less" scoped>
.collect {
    padding-top: 10px;
}
</style>
