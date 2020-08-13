<template>
  <div class="bg">
    <HomeSearch />
    <div>
      <slider-tab :data="nav"></slider-tab>
    </div>
  </div>
</template>
<script>
import { Search, Icon, navBar } from "vant";
import SliderTab from "@/components/SliderTabComponent.vue";
export default {
  components: {
    SliderTab,
    [Search.name]: Search,
    [Icon.name]: Icon,
    [navBar.name]: navBar
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
.icon-size {
  font-size: 28px;
  color: @main_gray;
}
</style>
