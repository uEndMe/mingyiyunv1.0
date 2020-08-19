<template>
  <!-- 搜索栏 -->
  <van-search class="search"
              shape="round"
              show-action
              placeholder="搜索"
              @focus="expSearch(true)"
              @cancel="expSearch(false)">
    <van-icon slot="left-icon"
              name="search"
              color="#c2c2c2"></van-icon>
    <svg-icon v-if="showClassify"
              @click.native="$router.push('/classify')"
              slot="action"
              icon-name="分类"
              class-name="icon-size"> </svg-icon>
  </van-search>
</template>

<script>
import { Search, Icon } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "ComSearch",
  mixins: [],
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    showClassify: Boolean, // 显示按钮： ‘分类频道’ 
    expSearch: Function, // 展开搜索面板
  },

  // ---- ---- ---- ---- ---- 数据
  data () {
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
.search {
  background-color: @bg;
  padding: 12px 12px 12px 20px;
}
.search > .van-search__content {
  border: 1px solid @grey;
  background-color: white;
}
.icon-size {
  font-size: 28px;
  color: @main_gray;
}
.van-search__action {
  font-size: 14px;
  color: #888;
}
</style>
