<template>
  <!-- 过渡页，加载中... -->
  <div class="loading">
    <van-loading color="#1989fa" size="24px">加载中...</van-loading>
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "ComLoading",
  mixins: [],
  components: {
    [Loading.name]: Loading
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
.loading {
  display: flex;
  padding: 40px;
  justify-content: center;
  align-items: center;
}
</style>
