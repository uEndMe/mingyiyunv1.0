<template>
    <div class="bg-gray">
        <div class="push-detail-info the-wall the-white">
            <div class="push-detail-title">{{info.title}}</div>
            <div class="push-detail-time">
                <div>{{info.add_time}}</div>
                <div>{{browse}}</div>
            </div>
            <div class="push-detail-detail">
                <img :src="info.img_path" width="100%" alt="">
            </div>
            <div v-html="info.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        info () {
            return this.$store.state.push.info;
        },
        status () {
            return this.$store.state.status;
        },
        browse () {
            return this.info.browse ? `Read: ${this.info.browse}` : '';
        },
    },
    watch: {
        'status' () {
            this.$router.push({
                path: '/push',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.push-detail-info {
    margin-top: 10px;
    padding-top: 10px;
    .push-detail-title {
        font-size: 20px;
        margin-bottom: 3px;
    }
    .push-detail-time {
        font-size: 12px;
        color: #999999;
        display: flex;
        & > div {
            margin-right: 10px;
        }
    }
    .push-detail-detail {
        margin: 12px 0;
    }
}
</style>
