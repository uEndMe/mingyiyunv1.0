<template>
  <ComLoading v-if="state.loading" class="bg"> </ComLoading>
  <section v-else-if="state.loaded" class="bg">
    <!-- 搜索 -->
    <van-sticky>
      <ComSearch :showClassify="showClassify" :expSearch="expSearch" />
    </van-sticky>
    <!-- 搜索展开 -->
    <keep-alive>
      <SearchMore v-if="openSearch" />
      <div v-else>
        <!-- 导航 -->
        <slider-tab :data="nav" class="van-hairline--bottom" />
        <!-- 轮播 -->
        <HomeSwipe />
        <!-- 选项 -->
        <HomeGrid />
        <!-- 课程 -->
        <HomeCourse />
        <!-- 文章 -->
        <HomeUpdate class="homeMore" :data="updataList" />
      </div>
    </keep-alive>
    <!-- 底部 -->
    <ComFooter />
  </section>
</template>
<script>
import { Sticky } from "vant";

import ComFooter from "@/components/common/ComFooter.vue";
import ComLoading from "@/components/common/ComLoading.vue";
import ComSearch from "@/components/common/ComSearch";
import SliderTab from "@/components/SliderTabComponent.vue";

import HomeSwipe from "./HomeSwipe";
import HomeGrid from "./HomeGrid";
import HomeCourse from "./HomeCourse";
import HomeUpdate from "./HomeUpdate";

import SearchMore from "./search/SearchMore";

export default {
  name: "VHome",
  components: {
    ComLoading, // 加载中...
    SliderTab, // 滑块
    ComFooter, // 尾部
    ComSearch, // 搜索

    SearchMore, // 搜索展开
    HomeSwipe, // 轮播
    HomeGrid, // 4图标
    HomeCourse, // 课程
    HomeUpdate, // 更新
    [Sticky.name]: Sticky // 头部粘性布局
  },
  data() {
    return {
      state: { init: true },
      start: 1,
      openSearch: false, // 展开：搜索面板
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
      ],
      updataList: [
        {
          id: 1,
          type: "article",
          title: "关于等多个的研究",
          poster: "https://img.yzcdn.cn/vant/sand.jpg",
          name: "张文光",
          tags: ["专科医师", "特邀嘉宾"],
          good: 3210,
          look: 29000
        },
        {
          id: 2,
          type: "mp3",
          title: "只是一段音频音频音频",
          poster: "https://img.yzcdn.cn/vant/sand.jpg",
          name: "张文光",
          tags: ["专科医师"],
          good: 2000,
          look: 3600
        },
        {
          id: 3,
          type: "mp4",
          title: "这是一段视频",
          poster: "https://img.yzcdn.cn/vant/sand.jpg",
          name: "张文光",
          tags: ["专科医师", "特邀嘉宾"],
          good: 3210,
          look: 2000
        },
        {
          id: 4,
          type: "article",
          title: "关于等多个的研究",
          poster: "https://img.yzcdn.cn/vant/sand.jpg",
          name: "张文光",
          tags: ["专科医师", "特邀嘉宾"],
          good: 3210,
          look: 29000
        }
      ]
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created() {
    // req()
    // 模拟加载
    this.state = { loaded: true };
    /* setTimeout(() => {
      this.state = { loaded: true };
      // this.state = { loaderr: true }
    }); */
  },

  // ---- ---- ---- ---- ---- 挂载
  // mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  // beforeDestroy() {}
  methods: {
    expSearch(val) {
      this.showClassify = !val;
      this.openSearch = val;
    }
  }
};
</script>
<style lang="less" scoped>
/* .homeMore {
  padding-bottom: 52px;
} */
</style>
