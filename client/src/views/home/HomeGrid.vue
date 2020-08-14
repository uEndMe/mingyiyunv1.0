<template>
  <ul class="grid">
    <li class="gridCell">
      <img class="gridIcon"
           src="https://img.yzcdn.cn/vant/leaf.jpg"
           alt="" />
      <span>新药品</span>
    </li>
    <li class="gridCell">
      <img class="gridIcon"
           src="https://img.yzcdn.cn/vant/leaf.jpg"
           alt="" />
      <span>新治疗</span>
    </li>
    <li class="gridCell">
      <img class="gridIcon"
           src="https://img.yzcdn.cn/vant/leaf.jpg"
           alt="" />
      <span>新器械</span>
    </li>
    <li class="gridCell">
      <img class="gridIcon"
           src="https://img.yzcdn.cn/vant/leaf.jpg"
           alt="" />
      <span>听讲座</span>
    </li>
  </ul>
</template>

<script>
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeGrid",
  mixins: [],
  components: {},

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
.grid {
  display: flex;
  margin: 20px 16px;
}
.gridCell {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.gridIcon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
