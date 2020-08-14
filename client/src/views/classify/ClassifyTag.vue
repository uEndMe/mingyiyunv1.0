<template>
  <li class="tag">
    <slot></slot>
  </li>
</template>

<script>
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ClassifyTag',
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
.tag {
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  background-color: rgb(238, 238, 238);
}
</style>