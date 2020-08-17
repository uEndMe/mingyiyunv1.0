<template>
  <div class="update">
    <h2 class="h2">最近更新</h2>
    <UpdateArticle v-for="i in 10"
                   :key="i"
                   @click.native="$router.push('/article/' + i)" />
    <p class="updateNew"><i class="inner van-icon van-icon-replay" /> 刷新最近更新内容...</p>
  </div>
</template>

<script>
import UpdateArticle from "./update/UpdateArticle";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeUpdate",
  mixins: [],
  components: { UpdateArticle },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {};
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () { },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { }
};
</script>

<style lang="less" scoped>
.update {
  padding: 20px;
}
.updateNew {
  font-size: 14px;
  line-height: 42px;
  color: #888;
  text-align: center;
}
</style>
