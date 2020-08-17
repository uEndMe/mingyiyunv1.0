<template>
  <van-nav-bar class="navbar "
               :title="title"
               :right-text="right"
               left-arrow
               @click-left="$router.go(-1)"
               @click-right="onClickRight">
    <template #left>
      <van-icon class="navbarRes"
                name="arrow-left"
                size="20" />
    </template>

  </van-nav-bar>

</template>

<script>
import { NavBar, Icon } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ComHeader',
  mixins: [],
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    title: String, // 标题
    right: String, // 右边
  },

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
  methods: {
    onClickLeft () {
      // Toast('返回');
    },
    onClickRight () {
      // Toast('按钮');
    },
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: @bg;
  height: 44px;
}

.navbarRes {
  // border: 1px solid;
  border-radius: 50%;
  padding: 2px;
  color: @minor;
}
</style>