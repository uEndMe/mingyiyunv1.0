<template>
  <!-- 底部路由切换 -->
  <van-tabbar :route="true" v-model="active" inactive-color="#000" placeholder class="footer">
    <van-tabbar-item class="footerItem" to="/home" icon="star">首页</van-tabbar-item>
    <van-tabbar-item class="footerItem" to="/plaza" icon="star">广场</van-tabbar-item>
    <van-tabbar-item class="footerItem" to="/publish" icon="star">发布</van-tabbar-item>
    <van-tabbar-item class="footerItem" to="/chat" icon="star">社交</van-tabbar-item>
    <van-tabbar-item class="footerItem" to="/me" icon="star">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "ComFooter",
  mixins: [],
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    start: Number
  },

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      active: 0
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
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.footerItem {
  background-color: @bg8;
}
</style>
