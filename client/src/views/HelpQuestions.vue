<template>
    <div class="bg-gray">
        <div class="problem-group">
            <van-cell size="large" :border="false"
                :title="$lang.help.problem">
            </van-cell>
            <div class="problem-items">
                <van-list v-model="$store.state.help.loading"
                    :finished="$store.state.help.finished"
                    finished-text="No more"
                    :immediate-check="false"
                    @load="onLoad">
                    <van-cell v-for="(item, i) in questions" :key="i"
                        :title="item.title"
                        title-class="the-ellipsis"
                        size="large"
                        is-link
                        @click="handleLookDetail(item.question_id)">
                    </van-cell>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import { Cell, List } from 'vant';

export default {
    components: {
        [Cell.name]: Cell,
        [List.name]: List,
    },
    computed: {
        questions () {
            return this.$store.state.help.list;
        },
    },
    methods: {
        onLoad () {
            this.$store.dispatch('help/handleGetQuestionList');
        },
        handleLookDetail (qid) {
            this.$router.push({
                path: '/question-detail',
            });
            this.$store.dispatch('help/handleGetQuestionInfo', qid);
        },
    },
};
</script>

<style lang="less" scoped>
/deep/.van-cell__title {
    font-weight: 600;
}
.problem-group {
    margin-top: 10px;
}
.problem-items {
    /deep/.van-cell__title {
        color: #666;
        font-weight: normal;
    }
}
</style>
