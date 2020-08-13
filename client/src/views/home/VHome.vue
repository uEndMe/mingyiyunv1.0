<template>
  <section class="bg">
    <!-- 搜索 -->
    <van-sticky>
      <ComSearch :goClassify="true" :openSearch="openSearch" />
      <SearchMore v-show="openSearch" />
    </van-sticky>
    <!-- 搜索展开 -->
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
    <ComFooter class="van-hairline--top" />
  </section>
</template>
<script>
import SliderTab from "@/components/SliderTabComponent.vue";
import ComFooter from "@/components/common/ComFooter.vue";
import ComSearch from "@/components/common/ComSearch";

import SearchMore from "./search/SearchMore";
import HomeSwipe from "./HomeSwipe";
import HomeGrid from "./HomeGrid";
import HomeCourse from "./HomeCourse";
import HomeUpdate from "./HomeUpdate";

import { Sticky } from "vant";
export default {
  name: "VHome",
  components: {
    [Sticky.name]: Sticky, // 头部粘性布局
    ComFooter, // 头部
    SliderTab, // 滑块
    ComSearch, // 搜索
    SearchMore, // 搜索展开
    HomeSwipe, // 轮播
    HomeGrid, // 4图标
    HomeCourse, // 课程
    HomeUpdate // 更新
  },
  data() {
    return {
      openSearch: false,
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
