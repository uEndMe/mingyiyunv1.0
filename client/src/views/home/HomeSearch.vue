<template>
  <van-search shape="round" show-action placeholder="搜索">
    <van-icon slot="left-icon" name="search" color="#c2c2c2"></van-icon>
    <svg-icon slot="action" icon-name="分类" class-name="icon-size"></svg-icon>
  </van-search>
</template>

<script>
import { Search, Icon } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeSearch",
  mixins: [],
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {};
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {}

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  // created() {},

  // ---- ---- ---- ---- ---- 挂载
  // mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  // beforeDestroy() {}
};
</script>

<style lang="less" scoped>
// .shell
</style>
