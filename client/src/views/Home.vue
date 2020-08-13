<template>
  <section class="bg">
    <!-- 搜索 -->
    <van-sticky>
      <HomeSearch />
    </van-sticky>
    <!-- 导航 -->
    <slider-tab :data="nav" class="van-hairline--bottom" />
    <!-- 轮播 -->
    <HomeSwipe />
    <!-- 选项 -->
    <HomeGrid />
    <!-- 课程 -->
    <HomeCourse />
    <!-- 文章 -->
    <HomeUpdate class="homeMore" />
    <!-- 底部 -->
    <VFooter class="van-hairline--top" />
  </section>
</template>
<script>
import SliderTab from "@/components/SliderTabComponent.vue";
import VFooter from "@/components/common/VFooter.vue";

import HomeSearch from "./home/HomeSearch";
import HomeSwipe from "./home/HomeSwipe";
import HomeGrid from "./home/HomeGrid";
import HomeCourse from "./home/HomeCourse";
import HomeUpdate from "./home/HomeUpdate";

import { Sticky } from "vant";
export default {
  components: {
    [Sticky.name]: Sticky, // 头部粘性布局
    VFooter,
    SliderTab,
    HomeSearch,
    HomeSwipe,
    HomeGrid,
    HomeCourse,
    HomeUpdate
  },
  data() {
    return {
      nav: [
        { name: "推荐", path: "" },
        { name: "新知", path: "" },
        { name: "直播", path: "" },
        { name: "VOD", path: "" },
        { name: "LOL", path: "" },
        { name: "联盟", path: "" },
        { name: "聪明", path: "" },
        { name: "中国", path: "" },
        { name: "推荐", path: "" },
        { name: "新知", path: "" },
        { name: "直播", path: "" },
        { name: "VOD", path: "" }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.homeMore {
  padding-bottom: 68px;
}
</style>
