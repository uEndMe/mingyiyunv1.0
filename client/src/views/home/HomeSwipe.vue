<template>
  <van-swipe class="my-swipe"
             :autoplay="3000"
             azy-render="true"
             indicator-color="white">
    <van-swipe-item v-for="(image, index) in images"
                    class="swipeItem"
                    :key="index">
      <img v-lazy="image"
           class="swipeImg" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem, Lazyload } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeSwipe",
  mixins: [],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      images: ["https://img.yzcdn.cn/vant/tree.jpg", "https://img.yzcdn.cn/vant/cat.jpeg"]
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () { },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { }
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fafafa;
}
.swipeItem,
.swipeImg {
  width: 100%;
  height: 200px;
}
</style>
