<!-- 使用拦截器，跳转对应错误页面 -->
<!-- 这应该是一个页面，而不是公共组件 -->
<template>
  <div class="bg loaderr">
    <ComHeader title="加载失败" />
    <div class="loaderrContent">
      <van-empty image="error"
                 class="loaderrImg"
                 description="点击重新加载" />
    </div>

  </div>
</template>

<script>
import ComHeader from '@/components/common/ComHeader'

import { Empty } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ComLoaderr',
  mixins: [],
  components: {
    ComHeader,
    [Empty.name]: Empty,
  },

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
.loaderr {
  display: flex;
  flex-direction: column;
}
.loaderrContent {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loaderrImg {
  padding-bottom: 200px;
}
</style>