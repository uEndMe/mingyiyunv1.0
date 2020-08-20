<template>
  <section class="search">
    <van-search class="searchInput" v-model="value" placeholder="搜索" shape="round" />
    <ul class="searchMore">
      <li class="searchLink">
        <p class="searchLinkLeft">
          <i class=" van-icon van-icon-fire"></i>
          <span>搞科研</span>
        </p>
        <i class=" van-icon van-icon-arrow"></i>
      </li>
      <li class="searchLink">
        <p class="searchLinkLeft">
          <i class=" van-icon van-icon-gold-coin"></i>
          <span>投融资</span>
        </p>
        <i class=" van-icon van-icon-arrow"></i>
      </li>
      <li class="searchLink">
        <p class="searchLinkLeft">
          <i class=" van-icon van-icon-manager"></i>
          <span>服务</span>
        </p>
        <i class=" van-icon van-icon-arrow"></i>
      </li>
    </ul>
  </section>
</template>

<script>
import { Search } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "",
  mixins: [],
  components: {
    [Search.name]: Search
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      value: ""
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created() {},

  // ---- ---- ---- ---- ---- 挂载
  mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy() {},

  // ---- ---- ---- ---- ---- 方法
  methods: {}
};
</script>

<style lang="less" scoped>
.search {
  padding: 20px;

  background: white;
}
.searchInput {
  margin-bottom: 20px;
  padding: 0;
  & > .van-search__content {
    border: 1px solid @grey;
    background-color: white;
  }
}

.searchLink {
  height: 48px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  color: @minor;
  border-radius: 8px;
  background-color: #f0f0f0;
  > i {
    font-size: 16px;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.searchLinkLeft {
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchLinkLeft > i {
  font-size: 24px;
}
.searchLinkLeft > span {
  margin-left: 8px;
  font-size: 14x;
}
</style>
