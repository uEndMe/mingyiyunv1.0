<template>
    <div>
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading color="#fff">{{loadingText}}</van-loading>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import { Overlay, Loading } from 'vant';

export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        loadingText: {
            type: String,
            default: '',
        },
    },
    components: {
        [Overlay.name]: Overlay,
        [Loading.name]: Loading,
    },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
