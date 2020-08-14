<template>
  <section class="bgxx">
    <!-- 我的 -->
    <!-- 底部 -->
    <!-- <ComFooter :active="+4" /> -->

    <header style="backgro">头部</header>
    <section class="box">
      <div class="main">
        <div v-for="i in 100"
             :key="i">{{i}}</div>
      </div>
    </section>
    <footer>底部</footer>
  </section>
</template>

<script>
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'VMe',
  mixins: [],
  components: {},

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () { return {} },

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
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {}
}
</script>

<style lang="less" scoped>
.bgxx {
  display: flex;
  flex-direction: column;
  height: 100%;
}
header,
footer {
  border: 1px solid #ccc;
  background-color: #eef;
  height: 40px;
}
.box {
  height: 100%;
  border: 1px solid #ccc;
  // overflow-y: scroll;
  overflow: hidden;
}
.main {
  border: 1px solid #ccc;
  height: 2000px;
  background-color: #fee;
}
</style>