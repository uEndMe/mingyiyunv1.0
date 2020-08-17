<template>
  <section class="bg">
    <!-- 搜索 -->
    <van-sticky>
      <ComSearch :showClassify="showClassify"
                 :expSearch="expSearch" />
    </van-sticky>
    <!-- 搜索展开 -->
    <keep-alive>
      <SearchMore v-if="openSearch" />
      <div v-else>
        <!-- 导航 -->
        <slider-tab :data="nav"
                    class="van-hairline--bottom" />
        <!-- 轮播 -->
        <HomeSwipe />
        <!-- 选项 -->
        <HomeGrid />
        <!-- 课程 -->
        <HomeCourse />
        <!-- 文章 -->
        <HomeUpdate class="homeMore" />
      </div>
    </keep-alive>
    <!-- 底部 -->
    <ComFooter />
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
    SliderTab, // 滑块
    ComFooter, // 尾部
    ComSearch, // 搜索

    SearchMore, // 搜索展开
    HomeSwipe, // 轮播
    HomeGrid, // 4图标
    HomeCourse, // 课程
    HomeUpdate, // 更新
    [Sticky.name]: Sticky, // 头部粘性布局
  },
  data () {
    return {
      start: 1,
      openSearch: false,  // 展开：搜索面板
      showClassify: true, // 显示：更多频道按钮
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
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  // created() {},

  // ---- ---- ---- ---- ---- 挂载
  // mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  // beforeDestroy() {}
  methods: {
    expSearch (val) {
      this.showClassify = !val;
      this.openSearch = val;
    }
  }
};
</script>
<style lang="less" scoped>
.homeMore {
  padding-bottom: 52px;
}
</style>
