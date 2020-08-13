<template>
  <div class="course">
    <h2 class="h2">课程推荐</h2>
    <!-- 行数 -->
    <div v-for="i in 2" :key="i" class="courseContent">
      <!-- 每行个数 -->
      <CourseCover class="CourseCover" v-for="j in 3" :key="j" />
    </div>
    <div class="CourseShift"><p>换一批</p></div>
  </div>
</template>

<script>
import CourseCover from "./course/CourseCover";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeCruse",
  mixins: [],
  components: { CourseCover },

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
.course {
  margin: 0 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: @bg;
}
.courseContent {
  display: flex;
  margin-bottom: 12px;
}
.CourseCover {
  flex: 1;
  &:not(:last-child) {
    margin-right: 8px;
  }
}
.CourseShift {
  text-align: right;
  & p {
    display: inline-block;
    color: #999;
    font-size: 10px;
    text-decoration-line: underline;
  }
}
</style>
