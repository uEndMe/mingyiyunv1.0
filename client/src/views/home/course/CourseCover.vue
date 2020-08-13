<template>
  <div class="cover">
    <img class="coverImg" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="xx" />
    <p class="coverTxt van-ellipsis">正在直播的课程标题很长很长很长的</p>
  </div>
</template>

<script>
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "CourseCover",
  mixins: [],
  components: {},

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
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.cover {
  width: 0px; // 由剩余空间决定
}
.coverImg {
  border-radius: 2px;
  width: 100%;
}
.coverTxt {
  font-size: 10px;
  line-height: 16px;
}
</style>
