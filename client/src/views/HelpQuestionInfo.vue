<template>
    <div class="bg">
        <div class="the-wall">
            <h3 class="info-title">{{info.title}}</h3>
            <div v-html="info.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        info () {
            return this.$store.state.help.questionInfo;
        },
        status () {
            return this.$store.state.status;
        },
    },
    watch: {
        'status' () {
            this.$router.push({
                path: '/help',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.info-title {
    font-size: 20px;
    padding: 10px 0;
}
</style>
