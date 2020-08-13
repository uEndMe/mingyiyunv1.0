<template>
  <div class="bg">
    <HomeSearch />
    <div>
      <slider-tab :data="nav"></slider-tab>
    </div>
  </div>
</template>
<script>
import HomeSearch from "./home/HomeSearch";
import SliderTab from "@/components/SliderTabComponent.vue";
export default {
  components: {
    HomeSearch,
    SliderTab
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
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.icon-size {
  font-size: 28px;
  color: @main_gray;
}
</style>
