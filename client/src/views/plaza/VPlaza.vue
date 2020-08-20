<template>
  <section class="bg plaza">
    <!-- 头部 -->
    <ComHeader class="plazaHeader" leftIcon="" title="广场" rightIcon="description" />
    <!-- 滚动视口 -->
    <section class="plazaMain">
      <PlazaSearch class="plazaSearch" />
      <PlazaNotice class="plazaNotice" />
    </section>

    <!-- 底部 -->
    <ComFooter class="plazaFooter" />
  </section>
</template>

<script>
import ComFooter from "@/components/common/ComFooter";
import ComHeader from "@/components/common/ComHeader";

import PlazaNotice from "./notice/PlazaNotice";
import PlazaSearch from "./search/PlazaSearch";

export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "VPlaza",
  mixins: [],
  components: {
    ComFooter,
    ComHeader,

    PlazaNotice,
    PlazaSearch
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
.plaza {
  display: flex;
  flex-direction: column;
}
.plazaHeader,
.plazaFooter {
  flex: none;
}
.plazaMain {
  flex: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: @bg;
}
</style>
