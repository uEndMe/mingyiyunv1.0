<template>
    <div class="nav-bar">
        <van-nav-bar :title="title" border @click-left="$router.go(-1)">
            <van-icon v-if="leftArrow" slot="left" name="arrow-left" color="#666666"></van-icon>
        </van-nav-bar>
    </div>
</template>

<script>
import { NavBar, Icon } from 'vant';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        leftArrow: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
};
</script>

<style lang="less" scoped>
.nav-bar {
    background-color: #fff;
}
</style>
