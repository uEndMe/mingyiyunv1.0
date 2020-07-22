<template>
    <div>
        <div class="download-content">
            <van-image :src="require('../assets/images/app_download.png')" lazy-load></van-image>
            <div class="download-btn">
                <a href="http://www.unguya.com/af6f6874577ccfd0db2a87a8410e8321.apk" download="af6f6874577ccfd0db2a87a8410e8321.apk">
                    <van-button type="info">{{$lang.download}}</van-button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { Image as VanImage, Button } from 'vant';
export default {
    components: {
        [VanImage.name]: VanImage,
        [Button.name]: Button,
    },
    data () {
        return {};
    },
};
</script>

<style lang="less" scoped>
.download-content {
    position: relative;
}
.download-btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 1.6rem;
    overflow: hidden;
    /deep/ .van-button {
        border-radius: 10px;
    }
}
</style>
